import React from 'react';
import { Star, MapPin, Clock, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

function SkillCard({ user, onConnect }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Card.Content className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user.name.charAt(0)}
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{user.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.location}</span>
              <Clock className="w-4 h-4 mr-1 ml-4" />
              <span>{user.availability}</span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Skills Offered:</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Skills Wanted:</p>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => onConnect(user)}
              className="w-full"
              size="sm"
            >
              <User className="w-4 h-4 mr-2" />
              Connect for Skill Swap
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

export default SkillCard;