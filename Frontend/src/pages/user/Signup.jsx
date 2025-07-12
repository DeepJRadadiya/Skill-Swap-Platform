import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, Upload } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import Select from "react-select";
import axios from "axios";
import { axiosInstance } from "../../utils/axios";

function Signup({ setCurrentUser }) {
  const navigate = useNavigate();
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/skill/getskill")
      .then((res) => {
        setSkillData(res.data);
      })
      .catch((err) => {
        console.log(error);
      });
  }, []);
  console.log(skillData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    is_public: true,
    offered_skills: [],
    wanted_skills: [],
    availability: "weekends",
    profile_photo: "https://example.com/avatar.jpg",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register", formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      if (setCurrentUser) setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Failed to register. Please try again.");
    }
  };

  const skillOptions = skillData.map((skill) => ({
    value: skill._id,
    label: skill.name,
  }));
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Join SkillSwap</h2>
          <p className="text-gray-600 mt-2">
            Create your account and start learning
          </p>
        </div>

        <Card>
          <Card.Content className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Full Name" required error={errors.name}>
                <FormField.Input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                />
              </FormField>

              <FormField label="Email Address" required error={errors.email}>
                <FormField.Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />
              </FormField>

              <FormField label="Password" required error={errors.password}>
                <div className="relative">
                  <FormField.Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormField>

              <FormField
                label="Confirm Password"
                required
                error={errors.confirmPassword}
              >
                <div className="relative">
                  <FormField.Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormField>

              <FormField label="Location (Optional)">
                <FormField.Input
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your city or area"
                />
              </FormField>

              <FormField label="Skills You Can Offer">
                <Select
                  isMulti
                  name="offered_skills"
                  options={skillOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={skillOptions.filter(
                    (option) => formData.offered_skills.includes(option.value) // show names by matching ids
                  )}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      offered_skills: selectedOptions.map(
                        (option) => option.value
                      ),
                    })
                  }
                />
              </FormField>

              <FormField label="Skills You Want to Learn">
                <Select
                  isMulti
                  name="wanted_skills"
                  options={skillOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={skillOptions.filter(
                    (option) => formData.wanted_skills.includes(option.value) // show names by matching ids
                  )}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      wanted_skills: selectedOptions.map(
                        (option) => option.value
                      ),
                    })
                  }
                />
              </FormField>

              <FormField label="Availability">
                <FormField.Select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="flexible">Flexible</option>
                </FormField.Select>
              </FormField>

              <div className="flex items-center">
                <input
                  id="is_public"
                  name="is_public"
                  type="checkbox"
                  checked={formData.is_public}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="is_public"
                  className="ml-2 text-sm text-gray-700"
                >
                  Make my profile public (others can find and connect with me)
                </label>
              </div>

              <Button type="submit" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </Button>
            </form>
          </Card.Content>
        </Card>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
