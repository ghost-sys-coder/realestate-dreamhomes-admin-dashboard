"use client";
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Home, DollarSign, Users, MapPin, Bed, Bath, Square } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';


const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [results, setResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProperties() {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/properties/create");
        setResults(res.data.results);
        console.log(res.data.results);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProperties();
  }, []);



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
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
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
            {isLoading && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    {/* Image skeleton */}
                    <div className="relative rounded-xl overflow-hidden mb-4 bg-gray-200 h-48">
                      <div className="absolute top-3 right-3">
                        <div className="h-5 w-16 bg-gray-300 rounded-full" />
                      </div>
                    </div>

                    {/* Content skeleton */}
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-4 w-3/4 bg-gray-300 rounded" />
                        <div className="h-4 w-14 bg-gray-300 rounded" />
                      </div>

                      <div className="h-3 w-1/2 bg-gray-200 rounded mb-3" />

                      <div className="flex items-center justify-between gap-4">
                        <div className="h-3 w-12 bg-gray-200 rounded" />
                        <div className="h-3 w-12 bg-gray-200 rounded" />
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            {results.map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={100}
                    height={100}
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${property.status === "active"
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
                    <span className="text-sm font-bold text-blue-600">${property.salePrice}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.region}
                  </p>

                  <div className="flex items-center justify-between gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.amenities.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.amenities.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{property.amenities.area} sqft</span>
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