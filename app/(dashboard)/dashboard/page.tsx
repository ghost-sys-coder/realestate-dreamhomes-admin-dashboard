"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Home, DollarSign, Users, MapPin, Bed, Bath, Square } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  // Mock data for statistics
  const stats = [
    { 
      id: 1, 
      label: 'Total Properties', 
      value: '4860', 
      change: '+3.5%', 
      trend: 'up',
      icon: Home,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: 2, 
      label: 'Total Revenue', 
      value: '$2B', 
      change: '+10%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600'
    },
    { 
      id: 3, 
      label: 'Active Clients', 
      value: '1037', 
      change: '-2%', 
      trend: 'down',
      icon: Users,
      color: 'bg-amber-50 text-amber-600'
    },
    { 
      id: 4, 
      label: 'Properties Sold', 
      value: '895', 
      change: '+15%', 
      trend: 'up',
      icon: MapPin,
      color: 'bg-purple-50 text-purple-600'
    },
  ];

  // Mock data for pie chart (Status Analysis)
  const statusData = [
    { name: 'For Sale', value: 35, color: '#3B82F6' },
    { name: 'Sold', value: 25, color: '#8B5CF6' },
    { name: 'For Rent', value: 20, color: '#F59E0B' },
    { name: 'Pending', value: 20, color: '#EC4899' },
  ];

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 45 },
    { month: 'Feb', revenue: 52 },
    { month: 'Mar', revenue: 48 },
    { month: 'Apr', revenue: 65 },
    { month: 'May', revenue: 58 },
    { month: 'Jun', revenue: 70 },
    { month: 'Jul', revenue: 75 },
    { month: 'Aug', revenue: 68 },
    { month: 'Sep', revenue: 82 },
    { month: 'Oct', revenue: 78 },
    { month: 'Nov', revenue: 85 },
    { month: 'Dec', revenue: 90 },
  ];

  // Mock properties data
  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      title: 'Sunset House Villa',
      location: 'Beverly Hills, CA',
      price: '$2,950,000',
      beds: 4,
      baths: 3,
      sqft: '3,200',
      status: 'For Sale'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      title: 'Oceanside Retreat',
      location: 'Miami Beach, FL',
      price: '$1,845,000',
      beds: 3,
      baths: 2,
      sqft: '2,400',
      status: 'For Sale'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      title: 'Mountain View Estate',
      location: 'Aspen, CO',
      price: '$3,200,000',
      beds: 5,
      baths: 4,
      sqft: '4,100',
      status: 'Sold'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop',
      title: 'Urban Luxury Condo',
      location: 'Manhattan, NY',
      price: '$4,650,000',
      beds: 3,
      baths: 3,
      sqft: '2,800',
      status: 'For Sale'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your properties today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Status Analysis Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Status Analysis</h3>
              <button className="text-sm text-gray-600 hover:text-gray-900">View All</button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Generation</h3>
              <select 
                title='select'
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Explore Your Properties</h3>
            <div className="flex gap-2">
              <Button variant={"ghost"} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                Filters
              </Button>
              <Button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Add Property
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <Image 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={100}
                    height={100}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      property.status === 'Sold' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                      {property.title}
                    </h4>
                    <span className="text-lg font-bold text-blue-600">{property.price}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.location}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;