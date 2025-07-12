const RequestSkill = require('../models/Request');

const createRequest = async (req, res) => {
  try {
    const {
      offered_skill_id,
      wanted_skill_id,
      offered_user_id,
      wanted_user_id,
      message
    } = req.body;

    // Basic validation
    if (!offered_skill_id || !wanted_skill_id || !offered_user_id || !wanted_user_id || message === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create request with default flags
    const newRequest = new RequestSkill({
      offered_skill_id,
      wanted_skill_id,
      offered_user_id,
      wanted_user_id,
      message,
      accept: 0,
      pending: 1,
      reject: 0
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request created successfully",
      request: newRequest
    });

  } catch (error) {
    console.error("Error in createRequest:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const User = require('../models/User');
const Skill = require('../models/Skills');


const getRequestsByOfferedUserFormatted = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const requests = await RequestSkill.find({ offered_user_id: user_id });

    if (!requests.length) {
      return res.status(404).json({ message: "No requests found for this user." });
    }

    const formattedRequests = await Promise.all(
      requests.map(async (req) => {
        // console.log(User.findById(req.offered_skill_id));
        let status = "Pending";
        if (req.accept === 1) status = "Accepted";
        else if (req.reject === 1) status = "Rejected";

        // 🔥 FIXED HERE: using correct IDs
       const offeredUser = await User.findById(req.offered_user_id);
       console.log(offeredUser);
const wantedUser = await User.findById(req.wanted_user_id);
const offeredSkill = await Skill.findById(req.offered_skill_id);
const wantedSkill = await Skill.findById(req.wanted_skill_id);


        return {
          request_id: req._id,
          status,
          offered_user: offeredUser ? {
            id: offeredUser._id,
            name: offeredUser.name,
            email: offeredUser.email,
            profile_photo: offeredUser.profile_photo,
            rating: offeredUser.rating,
          } : {},
          wanted_user: wantedUser ? {
            id: wantedUser._id,
            name: wantedUser.name,
            email: wantedUser.email,
            profile_photo: wantedUser.profile_photo,
            rating: wantedUser.rating,
          } : {},
          offered_skill: offeredSkill ? {
            id: offeredSkill._id,
            name: offeredSkill.name
          } : {},
          wanted_skill: wantedSkill ? {
            id: wantedSkill._id,
            name: wantedSkill.name
          } : {}
        };
      })
    );

    res.status(200).json({
      message: "Full request details fetched successfully",
      count: formattedRequests.length,
      data: formattedRequests
    });

  } catch (error) {
    console.error("Error in full request fetch:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getRequestsForLoggedInUser = async (req, res) => {
  try {
    const loggedInUserId = req.params.user_id;

    if (!loggedInUserId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // 1️⃣ Requests received by Arpit
    const receivedRequests = await RequestSkill.find({ offered_user_id: loggedInUserId });
    
    const formattedReceived = await Promise.all(receivedRequests.map(async (req) => {
      let status = "Pending";
      if (req.accept === 1) status = "Accepted";
      else if (req.reject === 1) status = "Rejected";

      const wantedUser = await User.findById(req.wanted_user_id);
      const offeredSkill = await Skill.findById(req.offered_skill_id);
      const wantedSkill = await Skill.findById(req.wanted_skill_id);

      return {
        request_id: req._id,
        status,
        showActions: status === "Pending",
        offered_skill: offeredSkill?.name || "",
        wanted_skill: wantedSkill?.name || "",
        from_user: {
          name: wantedUser?.name,
          email: wantedUser?.email,
          profile_photo: wantedUser?.profile_photo,
          rating: wantedUser?.rating,
        }
      };
    }));

    // 2️⃣ Requests sent by Arpit
    const sentRequests = await RequestSkill.find({ wanted_user_id: loggedInUserId });

    const formattedSent = await Promise.all(sentRequests.map(async (req) => {
      let status = "Pending";
      if (req.accept === 1) status = "Accepted";
      else if (req.reject === 1) status = "Rejected";

      const offeredUser = await User.findById(req.offered_user_id);
      const offeredSkill = await Skill.findById(req.offered_skill_id);
      const wantedSkill = await Skill.findById(req.wanted_skill_id);

      return {
        request_id: req._id,
        status,
        showActions: false,
        offered_skill: offeredSkill?.name || "",
        wanted_skill: wantedSkill?.name || "",
        to_user: {
          name: offeredUser?.name,
          email: offeredUser?.email,
          profile_photo: offeredUser?.profile_photo,
          rating: offeredUser?.rating,
        }
      };
    }));

    res.status(200).json({
      message: "Requests for user fetched successfully",
      data: {
        receivedRequests: formattedReceived,
        sentRequests: formattedSent
      }
    });

  } catch (error) {
    console.error("Error fetching requests:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateRequestStatus = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status } = req.body; // Expected: "accept" or "reject"

    if (!["accept", "reject"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Use 'accept' or 'reject'." });
    }

    const request = await RequestSkill.findById(request_id);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Only update if still pending
    if (request.accept === 1 || request.reject === 1) {
      return res.status(400).json({ message: "Request is already handled." });
    }

    // Update flags
    request.accept = status === "accept" ? 1 : 0;
    request.reject = status === "reject" ? 1 : 0;
    request.pending = 0;

    await request.save();

    res.status(200).json({
      message: `Request ${status}ed successfully.`,
      updatedRequest: request
    });
  } catch (error) {
    console.error("Error updating request:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = {
  createRequest,
  getRequestsByOfferedUserFormatted,
  getRequestsForLoggedInUser,
  updateRequestStatus
};
