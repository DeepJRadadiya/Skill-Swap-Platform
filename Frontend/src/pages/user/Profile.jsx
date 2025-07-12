import React, { useState } from 'react';
import { User, Camera, MapPin, Clock, Eye, EyeOff, Save } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';

function Profile({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    location: currentUser.location,
    skillsOffered: currentUser.skillsOffered.join(', '),
    skillsWanted: currentUser.skillsWanted.join(', '),
    availability: currentUser.availability,
    isPublic: currentUser.isPublic,
    bio: currentUser.bio || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      email: formData.email,
      location: formData.location,
      skillsOffered: formData.skillsOffered.split(',').map(s => s.trim()).filter(Boolean),
      skillsWanted: formData.skillsWanted.split(',').map(s => s.trim()).filter(Boolean),
      availability: formData.availability,
      isPublic: formData.isPublic,
      bio: formData.bio
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      location: currentUser.location,
      skillsOffered: currentUser.skillsOffered.join(', '),
      skillsWanted: currentUser.skillsWanted.join(', '),
      availability: currentUser.availability,
      isPublic: currentUser.isPublic,
      bio: currentUser.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-gray-600">
            Manage your profile information and skill preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Content className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto">
                    {currentUser.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
                <p className="text-gray-600 mb-4">{currentUser.email}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{currentUser.location}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Available: {currentUser.availability}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {currentUser.isPublic ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2" />
                    )}
                    <span>{currentUser.isPublic ? 'Public Profile' : 'Private Profile'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{currentUser.skillsOffered.length}</div>
                      <div className="text-xs text-gray-600">Skills Offered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">{currentUser.skillsWanted.length}</div>
                      <div className="text-xs text-gray-600">Skills Wanted</div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Content className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Full Name" required>
                      <FormField.Input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </FormField>

                    <FormField label="Email Address" required>
                      <FormField.Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </FormField>
                  </div>

                  <FormField label="Location">
                    <FormField.Input
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Your city or area"
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Bio">
                    <FormField.Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell others about yourself, your experience, and what you're passionate about..."
                      rows={4}
                      disabled={!isEditing}
                    />
                  </FormField>

                  <FormField label="Skills You Offer">
                    <FormField.Textarea
                      name="skillsOffered"
                      value={formData.skillsOffered}
                      onChange={handleChange}
                      placeholder="Enter skills separated by commas (e.g., Web Development, Photography, Cooking)"
                      rows={3}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate multiple skills with commas
                    </p>
                  </FormField>

                  <FormField label="Skills You Want to Learn">
                    <FormField.Textarea
                      name="skillsWanted"
                      value={formData.skillsWanted}
                      onChange={handleChange}
                      placeholder="Enter skills you want to learn separated by commas"
                      rows={3}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separate multiple skills with commas
                    </p>
                  </FormField>

                  <FormField label="Availability">
                    <FormField.Select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      disabled={!isEditing}
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
                      disabled={!isEditing}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
                      Make my profile public (others can find and connect with me)
                    </label>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Account Settings */}
            <Card className="mt-6">
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
              </Card.Header>
              <Card.Content className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Manage your notification preferences</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-red-900">Delete Account</h3>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;