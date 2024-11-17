import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const salesData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 2000 },
    { month: 'Apr', amount: 2780 },
    { month: 'May', amount: 1890 },
    { month: 'Jun', amount: 2390 },
  ];

  const leadSourceData = [
    { name: 'Website', value: 400 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 300 },
    { name: 'Direct', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const stats = [
    { 
      title: 'Total Clients', 
      value: '1,234', 
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500' 
    },
    { 
      title: 'Active Leads', 
      value: '567', 
      change: '+23%',
      icon: Target,
      color: 'bg-green-500'
    },
    { 
      title: 'Revenue', 
      value: '$89,234', 
      change: '+8%',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    { 
      title: 'Conversion Rate', 
      value: '23%', 
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              <span className="text-gray-600 text-sm ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <BarChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4F46E5" />
          </BarChart>
        </div>

        {/* Lead Sources Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Lead Sources</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={leadSourceData}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {leadSourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Add your recent activity items here */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">New lead created</p>
              <p className="text-sm text-gray-600">John Doe from ABC Company</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="font-medium">Deal won</p>
              <p className="text-sm text-gray-600">$50,000 - XYZ Project</p>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">Meeting scheduled</p>
              <p className="text-sm text-gray-600">Product demo with Smith Corp</p>
            </div>
            <span className="text-sm text-gray-500">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;