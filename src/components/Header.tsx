import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Settings className="w-6 h-6" />
          </button>
          
          <div className="relative">
            <button className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-700">{user?.firstName} {user?.lastName}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;