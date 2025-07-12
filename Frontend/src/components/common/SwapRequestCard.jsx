import React from 'react';
import { Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

function SwapRequestCard({ request, onAccept, onReject, onCancel, currentUser }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'accepted':
        return 'text-green-700 bg-green-100';
      case 'rejected':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const isReceived = request.to.id === currentUser.id;
  const otherUser = isReceived ? request.from : request.to;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Card.Content className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {otherUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{otherUser.name}</h3>
              <p className="text-sm text-gray-500">
                {isReceived ? 'Wants to connect with you' : 'You requested to connect'}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
            {getStatusIcon(request.status)}
            <span className="ml-2 capitalize">{request.status}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">They Offer:</p>
            <div className="flex flex-wrap gap-1">
              {request.skillsOffered.map((skill, index) => (
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
            <p className="text-sm font-medium text-gray-700 mb-2">They Want:</p>
            <div className="flex flex-wrap gap-1">
              {request.skillsWanted.map((skill, index) => (
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
        
        {request.message && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{request.message}</p>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Requested on {new Date(request.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex space-x-3">
          {isReceived && request.status === 'pending' && (
            <>
              <Button 
                onClick={() => onAccept(request.id)}
                size="sm"
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button 
                onClick={() => onReject(request.id)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </>
          )}
          
          {!isReceived && request.status === 'pending' && onCancel && (
            <Button 
              onClick={() => onCancel(request.id)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Request
            </Button>
          )}
          
          {request.status === 'accepted' && (
            <Button size="sm" className="flex-1">
              <User className="w-4 h-4 mr-2" />
              Contact {otherUser.name}
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

export default SwapRequestCard;