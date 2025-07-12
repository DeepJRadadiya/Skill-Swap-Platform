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

const getRequestsByOfferedUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    var requests = await RequestSkill.find({ offered_user_id: user_id })
      .populate("offered_skill_id", "name") // Get offered skill name
      .populate("wanted_skill_id", "name")  // Get wanted skill name
      .populate("offered_user_id", "name email") // Request sender info
      .populate("wanted_user_id", "name email"); // Receiver info

    requests = requests.filter(req =>
      req.offered_user_id &&
      req.wanted_user_id &&
      req.offered_skill_id &&
      req.wanted_skill_id
    );

    if (!requests.length) {
      return res.status(404).json({ message: "No valid requests found for this user." });
    }

    res.status(200).json({
      message: "Requests fetched successfully",
      count: requests.length,
      requests
    });

  } catch (error) {
    console.error("Error fetching requests:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createRequest,
  getRequestsByOfferedUser
};
