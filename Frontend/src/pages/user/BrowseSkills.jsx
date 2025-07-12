import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Star } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import SkillCard from '../../components/common/SkillCard';
import Modal from '../../components/ui/Modal';
import axios from 'axios';

function BrowseSkills({ currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/auth/usersDetails');
        const formattedUsers = res.data.users.map((user, index) => ({
          id: index + 1,
          name: user.name,
          location: user.location,
          rating: user.rating || 0,
          availability: user.availability?.toLowerCase() || 'not specified',
          skillsOffered: user.offered_skills || [],
          skillsWanted: user.wanted_skills || [],
        }));
        setUsers(formattedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);
  

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.skillsOffered.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.skillsWanted.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = filterAvailability === 'all' || 
      user.availability === filterAvailability;
    
    return matchesSearch && matchesAvailability && user.id !== currentUser.id;
  });

  const handleConnect = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSendRequest = () => {
    // In a real app, this would send a request to the backend
    console.log('Sending swap request to:', selectedUser.name);
    console.log('Message:', swapMessage);
    
    setIsModalOpen(false);
    setSelectedUser(null);
    setSwapMessage('');
    
    // Show success message (in a real app, you'd use a toast notification)
    alert(`Swap request sent to ${selectedUser.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Skills</h1>
          <p className="text-gray-600">
            Discover talented people in our community and connect for skill exchanges.
          </p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <Card.Content className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField label="Search Skills or Names">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <FormField.Input
                      type="text"
                      placeholder="Search for skills, names, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </FormField>
              </div>
              
              <FormField label="Filter by Availability">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <FormField.Select
                    value={filterAvailability}
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="pl-10"
                  >
                    <option value="all">All Availability</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="flexible">Flexible</option>
                  </FormField.Select>
                </div>
              </FormField>
            </div>
          </Card.Content>
        </Card>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'Person' : 'People'} Found
          </h2>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <SkillCard
              key={user.id}
              user={user}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <Card.Content className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find more people.
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Swap Request Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Send Swap Request to ${selectedUser?.name}`}
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedUser.location}
                      <Clock className="w-3 h-3 mr-1 ml-3" />
                      {selectedUser.availability}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">They Offer:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.skillsOffered.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">They Want:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedUser.skillsWanted.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <FormField label="Message (Optional)">
                <FormField.Textarea
                  value={swapMessage}
                  onChange={(e) => setSwapMessage(e.target.value)}
                  placeholder="Introduce yourself and explain what you'd like to learn or teach..."
                  rows={4}
                />
              </FormField>

              <div className="flex space-x-3">
                <Button onClick={handleSendRequest} className="flex-1">
                  Send Request
                </Button>
                <Button 
                  onClick={() => setIsModalOpen(false)} 
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default BrowseSkills;