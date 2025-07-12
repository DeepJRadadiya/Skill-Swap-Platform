import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  BarChart3, 
  Search, 
  Filter, 
  Eye, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Clock,
  Send,
  UserCheck,
  UserX,
  Star,
  Activity
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import Modal from '../../components/ui/Modal';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      location: 'San Francisco, CA',
      status: 'active',
      joinedDate: '2024-01-15',
      skillsOffered: ['React', 'JavaScript', 'Node.js'],
      skillsWanted: ['Python', 'Data Science'],
      swapsCompleted: 5,
      rating: 4.8,
      isPublic: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      location: 'New York, NY',
      status: 'active',
      joinedDate: '2024-01-10',
      skillsOffered: ['Photography', 'Photo Editing'],
      skillsWanted: ['Web Development', 'React'],
      swapsCompleted: 8,
      rating: 4.9,
      isPublic: true
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@example.com',
      location: 'San Francisco, CA',
      status: 'banned',
      joinedDate: '2024-01-05',
      skillsOffered: ['Python', 'Data Science'],
      skillsWanted: ['UI/UX Design'],
      swapsCompleted: 2,
      rating: 3.5,
      isPublic: false
    }
  ]);

  const [swaps] = useState([
    {
      id: 1,
      user1: 'John Doe',
      user2: 'Sarah Johnson',
      skill1: 'React',
      skill2: 'Photography',
      status: 'completed',
      date: '2024-01-20'
    },
    {
      id: 2,
      user1: 'Mike Chen',
      user2: 'John Doe',
      skill1: 'Python',
      skill2: 'JavaScript',
      status: 'pending',
      date: '2024-01-18'
    },
    {
      id: 3,
      user1: 'Sarah Johnson',
      user2: 'Mike Chen',
      skill1: 'Photography',
      skill2: 'Data Science',
      status: 'rejected',
      date: '2024-01-16'
    }
  ]);

  const [feedback] = useState([
    {
      id: 1,
      from: 'John Doe',
      to: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent photography teacher!',
      date: '2024-01-21'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      to: 'John Doe',
      rating: 5,
      comment: 'Great React instructor, very patient.',
      date: '2024-01-21'
    }
  ]);

  // Stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    bannedUsers: users.filter(u => u.status === 'banned').length,
    totalSwaps: swaps.length,
    pendingSwaps: swaps.filter(s => s.status === 'pending').length,
    completedSwaps: swaps.filter(s => s.status === 'completed').length,
    avgRating: feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : 0
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleBanUser = (userId) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
          : user
      )
    );
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleSendBroadcast = () => {
    console.log('Broadcasting message:', broadcastMessage);
    alert('Message broadcasted to all users!');
    setBroadcastMessage('');
    setIsMessageModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100';
      case 'banned':
        return 'text-red-700 bg-red-100';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'completed':
        return 'text-blue-700 bg-blue-100';
      case 'rejected':
        return 'text-gray-700 bg-gray-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            <p className="text-gray-600">Total Users</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeUsers}</h3>
            <p className="text-gray-600">Active Users</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalSwaps}</h3>
            <p className="text-gray-600">Total Swaps</p>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.avgRating}</h3>
            <p className="text-gray-600">Avg Rating</p>
          </Card.Content>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold text-gray-900">Recent Swaps</h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {swaps.slice(0, 5).map(swap => (
                <div key={swap.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{swap.user1} ↔ {swap.user2}</p>
                    <p className="text-sm text-gray-600">{swap.skill1} for {swap.skill2}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(swap.status)}`}>
                    {swap.status}
                  </span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold text-gray-900">Recent Feedback</h2>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              {feedback.slice(0, 5).map(item => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{item.from} → {item.to}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{item.comment}</p>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormField label="Search Users">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <FormField.Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </FormField>
            </div>
            
            <FormField label="Filter by Status">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <FormField.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                </FormField.Select>
              </div>
            </FormField>
          </div>
        </Card.Content>
      </Card>

      {/* Users Table */}
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-gray-900">All Users ({filteredUsers.length})</h2>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Swaps</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{user.swapsCompleted}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-700">{user.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleViewUser(user)}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleBanUser(user.id)}
                          variant={user.status === 'banned' ? 'default' : 'destructive'}
                          size="sm"
                        >
                          {user.status === 'banned' ? (
                            <UserCheck className="w-3 h-3" />
                          ) : (
                            <Ban className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  const renderSwaps = () => (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold text-gray-900">All Swap Requests</h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {swaps.map(swap => (
              <div key={swap.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{swap.user1}</p>
                      <p className="text-sm text-blue-600">{swap.skill1}</p>
                    </div>
                    <div className="text-gray-400">↔</div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{swap.user2}</p>
                      <p className="text-sm text-emerald-600">{swap.skill2}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(swap.status)}`}>
                    {swap.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Created: {new Date(swap.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Platform Messages</h2>
            <Button onClick={() => setIsMessageModalOpen(true)}>
              <Send className="w-4 h-4 mr-2" />
              Send Broadcast
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages sent yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Use the broadcast feature to send messages to all users
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, monitor activities, and oversee the skill swap platform.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'swaps', label: 'Swaps', icon: Activity },
                { id: 'messages', label: 'Messages', icon: MessageSquare }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'swaps' && renderSwaps()}
        {activeTab === 'messages' && renderMessages()}

        {/* User Details Modal */}
        <Modal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          title={`User Details: ${selectedUser?.name}`}
          size="lg"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-900">{selectedUser.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile</label>
                  <p className="text-gray-900">{selectedUser.isPublic ? 'Public' : 'Private'}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Offered</label>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.skillsOffered.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Wanted</label>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.skillsWanted.map((skill, index) => (
                    <span key={index} className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => handleBanUser(selectedUser.id)}
                  variant={selectedUser.status === 'banned' ? 'default' : 'destructive'}
                  className="flex-1"
                >
                  {selectedUser.status === 'banned' ? 'Unban User' : 'Ban User'}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsUserModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Broadcast Message Modal */}
        <Modal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          title="Send Broadcast Message"
        >
          <div className="space-y-4">
            <FormField label="Message" required>
              <FormField.Textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter your message to all users..."
                rows={4}
              />
            </FormField>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleSendBroadcast}
                disabled={!broadcastMessage.trim()}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Send to All Users
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AdminDashboard;