import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, Upload } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import FormField from "../../components/ui/FormField";
import { registerUser } from "../../utils/api";
import Select from 'react-select';
import useSignUp from "../../hooks/useSignup"
import useSkill from "../../hooks/useSkill"

function Signup({ setCurrentUser }) {
  const navigate = useNavigate();
  const { isPending, error, signupMutation } = useSignUp();
  const { getSkill } = useSkill();

  console.log(getSkill)


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    isPublic: true,
    skillsOffered: [],
    skillsWanted: [],
    availability: "weekends",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      signupMutation({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        profile_photo: "https://example.com/profile.jpg",
        availability: formData.availability,
        is_public: formData.isPublic,
        userType: "user",
        offered_skills: formData.skillsOffered,
        wanted_skills: formData.skillsWanted
      });
    }
  };

  const skillOptions = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Photography', label: 'Photography' },
  { value: 'Cooking', label: 'Cooking' },
  { value: 'Guitar', label: 'Guitar' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Marketing', label: 'Marketing' },
  // Add more options as needed
];

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
                  name="skillsOffered"
                  options={skillOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.skillsOffered}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      skillsOffered: selectedOptions,
                    })
                  }
                />
              </FormField>

              <FormField label="Skills You Want to Learn">
                <Select
                  isMulti
                  name="skillsWanted"
                  options={skillOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={formData.skillsWanted}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      skillsWanted: selectedOptions,
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
                  id="isPublic"
                  name="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isPublic"
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
