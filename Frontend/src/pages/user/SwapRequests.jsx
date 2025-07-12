import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Send, Inbox } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SwapRequestCard from '../../components/common/SwapRequestCard';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function SwapRequests({ currentUser }) {

  const token = localStorage.getItem("");
  console.log("curruser", currentUser);
  const tokendeocd = jwtDecode(currentUser);

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  console.log(tokendeocd.id)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/request/requests/user/${tokendeocd.id}`);
        const allRequests = [...response.data.data.receivedRequests, ...response.data.data.sentRequests];

      // Separate by showActions flag
      const received = allRequests.filter(r => r.showActions !== false);
      const sent = allRequests.filter(r => r.showActions === false);

      setReceivedRequests(received);
      setSentRequests(sent);
      } catch (error) {
        console.error("Error fetching skill swap requests:", error.message);
      }
    };

    fetchRequests();
  }, [tokendeocd.id]);

  console.log(sentRequests);
  console.log(receivedRequests);


  const [activeTab, setActiveTab] = useState('received');
  
  const [requests, setRequests] = useState([
    {
      id: 1,
      from: {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com'
      },
      to: {
        id: tokendeocd.id,
        name: currentUser.name,
        email: currentUser.email
      },
      skillsOffered: ['Photography', 'Photo Editing'],
      skillsWanted: ['Web Development', 'React'],
      message: 'Hi! I noticed you offer web development skills. I\'d love to learn React in exchange for photography lessons. I have 5 years of professional photography experience.',
      status: 'pending',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      from: {
        id: 3,
        name: 'Mike Chen',
        email: 'mike@example.com'
      },
      to: {
        id: tokendeocd.id,
        name: currentUser.name,
        email: currentUser.email
      },
      skillsOffered: ['Python', 'Data Science'],
      skillsWanted: ['JavaScript', 'Node.js'],
      message: 'Hello! I saw your JavaScript skills and would love to exchange knowledge. I can teach Python and data science fundamentals.',
      status: 'pending',
      createdAt: '2024-01-14T14:30:00Z'
    },
    {
      id: 3,
      from: {
        id: tokendeocd.id,
        name: currentUser.name,
        email: currentUser.email
      },
      to: {
        id: 4,
        name: 'Emma Wilson',
        email: 'emma@example.com'
      },
      skillsOffered: ['React', 'JavaScript'],
      skillsWanted: ['Graphic Design', 'Branding'],
      message: 'Hi Emma! I\'m interested in learning graphic design and branding. I can help you with React and JavaScript development.',
      status: 'pending',
      createdAt: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      from: {
        id: 5,
        name: 'David Brown',
        email: 'david@example.com'
      },
      to: {
        id: tokendeocd.id,
        name: currentUser.name,
        email: currentUser.email
      },
      skillsOffered: ['Digital Marketing', 'SEO'],
      skillsWanted: ['Node.js', 'Backend Development'],
      status: 'accepted',
      createdAt: '2024-01-12T16:45:00Z'
    },
    {
      id: 5,
      from: {
        id: tokendeocd.id,
        name: currentUser.name,
        email: currentUser.email
      },
      to: {
        id: 6,
        name: 'Lisa Garcia',
        email: 'lisa@example.com'
      },
      skillsOffered: ['JavaScript', 'React'],
      skillsWanted: ['Spanish', 'Language Learning'],
      status: 'rejected',
      createdAt: '2024-01-11T11:20:00Z'
    }
  ]);

  // const receivedRequests = requests.filter(request => request.to.id === tokendeocd.id);
  // const sentRequests = requests.filter(request => request.from.id === tokendeocd.id);

 const handleAccept = async (requestId) => {
  try {
    await axios.put(`http://localhost:5001/api/request/update-status/${requestId}`, { status: "accepted" });
    setReceivedRequests(prev =>
      prev.map(req =>
        req.request_id === requestId ? { ...req, status: "Accepted", showActions: false } : req
      )
    );
  } catch (err) {
    console.error("Failed to accept:", err.message);
  }
};

const handleReject = async (requestId) => {
  try {
    await axios.put(`http://localhost:5001/api/request/update-status/${requestId}`, { status: "rejected" });
    setReceivedRequests(prev =>
      prev.map(req =>
        req.request_id === requestId ? { ...req, status: "Rejected", showActions: false } : req
      )
    );
  } catch (err) {
    console.error("Failed to reject:", err.message);
  }
};

  const handleCancel = (requestId) => {
    setRequests(prev => prev.filter(request => request.showActions !== requestId));
  };

  const getTabCount = (tab) => {
    if (tab === 'received') {
      return receivedRequests.length;
    }
    return sentRequests.length;
  };

  const currentRequests = activeTab === 'received' ? receivedRequests : sentRequests;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Swap Requests</h1>
          <p className="text-gray-600">
            Manage your skill swap requests and connect with other learners.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'received'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Inbox className="w-4 h-4 mr-2" />
                  Received
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {getTabCount('received')}
                  </span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('sent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Sent
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {getTabCount('sent')}
                  </span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {currentRequests.length > 0 ? (
            currentRequests.map(request => (
              <SwapRequestCard
  key={request.request_id}
  request={request}
  currentUser={currentUser}
  onAccept={handleAccept}
  onReject={handleReject}
  onCancel={activeTab === 'sent' ? handleCancel : undefined}
/>
            ))
          ) : (
            <Card>
              <Card.Content className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'received' ? (
                    <Inbox className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Send className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} requests
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'received' 
                    ? "You haven't received any swap requests yet. Make sure your profile is public to get discovered!"
                    : "You haven't sent any swap requests yet. Browse skills to find people to connect with."
                  }
                </p>
                <Button 
                  as="a" 
                  href={activeTab === 'received' ? '/profile' : '/browse'}
                  variant="outline"
                >
                  {activeTab === 'received' ? 'Update Profile' : 'Browse Skills'}
                </Button>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        {currentRequests.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <Card.Content className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {currentRequests.filter(r => r.status === 'Pending').length}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Pending</p>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Content className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {currentRequests.filter(r => r.status === 'Accepted').length}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Accepted</p>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Content className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">
                    {currentRequests.filter(r => r.status === 'rejected').length}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Declined</p>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwapRequests;