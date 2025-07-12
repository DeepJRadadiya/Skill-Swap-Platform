import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';

function AdminLogin({ setCurrentUser, setIsAdmin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock admin authentication
      const adminUser = {
        id: 'admin_1',
        name: 'Admin User',
        email: formData.email,
        role: 'admin'
      };

      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      localStorage.setItem('isAdmin', 'true');
      setCurrentUser(adminUser);
      setIsAdmin(true);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Access the administrative dashboard</p>
        </div>

        <Card>
          <Card.Content className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label="Admin Email" required error={errors.email}>
                <FormField.Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  error={errors.email}
                />
              </FormField>

              <FormField label="Password" required error={errors.password}>
                <div className="relative">
                  <FormField.Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </FormField>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <Shield className="w-4 h-4 mr-2" />
                Admin Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo: Use any email and password to access admin panel
              </p>
            </div>
          </Card.Content>
        </Card>

        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to User Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;