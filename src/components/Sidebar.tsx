import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Target, 
  UserCheck, 
  Calendar, 
  Users as Team, 
  DollarSign, 
  FileText, 
  BarChart2, 
  MessageSquare, 
  Mail, 
  FolderOpen 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = [
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Target, label: 'Leads', path: '/leads' },
    { icon: UserCheck, label: 'Opportunities', path: '/opportunities' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Team, label: 'Team', path: '/team' },
    { icon: DollarSign, label: 'Sales', path: '/sales' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: BarChart2, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Mail, label: 'Email', path: '/email' },
    { icon: FolderOpen, label: 'Documents', path: '/documents' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">CRM Pro</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;