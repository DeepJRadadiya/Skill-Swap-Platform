import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Star, Clock, Plus, Users, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

function Dashboard({ currentUser }) {
  const [recentSwaps] = useState([
    {
      id: 1,
      partner: 'Sarah Johnson',
      skill: 'Photography',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 2,
      partner: 'Mike Chen',
      skill: 'Web Development',
      status: 'in-progress',
      date: '2024-01-10'
    }
  ]);

  const [pendingRequests] = useState([
    {
      id: 1,
      from: 'Emma Wilson',
      skill: 'Graphic Design',
      type: 'received'
    },
    {
      id: 2,
      to: 'David Brown',
      skill: 'Marketing',
      type: 'sent'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100';
      case 'in-progress':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-blue-100">
                  Ready to learn something new or share your skills?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <Card.Content className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentUser.skillsOffered.length}</h3>
              <p className="text-gray-600">Skills Offered</p>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentUser.skillsWanted.length}</h3>
              <p className="text-gray-600">Skills Wanted</p>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{recentSwaps.length}</h3>
              <p className="text-gray-600">Active Swaps</p>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentUser.rating}</h3>
              <p className="text-gray-600">Rating</p>
            </Card.Content>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Section */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Your Skills</h2>
                  <Button as={Link} to="/profile" variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Skills You Offer:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skillsOffered.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Skills You Want:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skillsWanted.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Pending Requests */}
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Pending Requests</h2>
                  <Button as={Link} to="/swaps" variant="outline" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-3">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {request.type === 'received' ? request.from : request.to}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.type === 'received' ? 'Wants to learn' : 'You requested'}: {request.skill}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          request.type === 'received' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {request.type === 'received' ? 'Received' : 'Sent'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No pending requests</p>
                )}
              </Card.Content>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Swaps</h2>
                  <Button as={Link} to="/browse" variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Find More
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                {recentSwaps.length > 0 ? (
                  <div className="space-y-3">
                    {recentSwaps.map((swap) => (
                      <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {swap.partner.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{swap.partner}</p>
                            <p className="text-sm text-gray-600">{swap.skill}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(swap.status)}`}>
                            {swap.status.replace('-', ' ')}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(swap.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent swaps</p>
                )}
              </Card.Content>
            </Card>

            {/* Quick Actions */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 gap-3">
                  <Button as={Link} to="/browse" className="justify-start">
                    <Users className="w-4 h-4 mr-3" />
                    Browse Skills
                  </Button>
                  <Button as={Link} to="/profile" variant="outline" className="justify-start">
                    <User className="w-4 h-4 mr-3" />
                    Edit Profile
                  </Button>
                  <Button as={Link} to="/feedback" variant="outline" className="justify-start">
                    <Star className="w-4 h-4 mr-3" />
                    Leave Feedback
                  </Button>
                </div>
              </Card.Content>
            </Card>

            {/* Profile Info */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900">Profile Info</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Available: {currentUser.availability}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile: {currentUser.isPublic ? 'Public' : 'Private'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    <span>Rating: {currentUser.rating}/5.0</span>
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

export default Dashboard;