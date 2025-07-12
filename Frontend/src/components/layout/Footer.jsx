import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">SkillSwap</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connect with others to exchange knowledge and skills. Learn something new while teaching what you know best.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>hello@skillswap.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Join Community
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SkillSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
