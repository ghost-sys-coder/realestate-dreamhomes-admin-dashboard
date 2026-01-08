"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Eye, MessageCircle, TrendingUp, DollarSign } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface PerformanceMetrics {
  totalListings: number;
  activeListings: number;
  totalViews: number;
  totalInquiries: number;
  totalFavorites: number;
  monthlyData: { month: string; listings: number }[];
}

interface AgentPerformanceProps {
  metrics: PerformanceMetrics;
  agentName: string;
}

const AgentPerformance: React.FC<AgentPerformanceProps> = ({ metrics, agentName }) => {
  const statCards = [
    { title: "Total Listings", value: metrics.totalListings, icon: Home, color: "text-blue-600" },
    { title: "Active Listings", value: metrics.activeListings, icon: TrendingUp, color: "text-green-600" },
    { title: "Total Views", value: metrics.totalViews.toLocaleString(), icon: Eye, color: "text-purple-600" },
    { title: "Inquiries", value: metrics.totalInquiries, icon: MessageCircle, color: "text-orange-600" },
    { title: "Favorites", value: metrics.totalFavorites, icon: DollarSign, color: "text-pink-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <CardTitle className="text-2xl">Performance Overview</CardTitle>
        <CardDescription>
          Key metrics and activity for {agentName} at Vaal Properties (Mock Data)
        </CardDescription>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All time performance
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Listings Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Listings Trend (Last 12 Months)</CardTitle>
          <CardDescription>
            Number of new properties listed by month (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={metrics.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="listings"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ fill: '#8884d8' }}
                name="New Listings"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock data export for easy use in pages
export const mockAgentPerformance: PerformanceMetrics = {
  totalListings: 42,        // Total properties created
  activeListings: 28,       // Active status
  totalViews: 5_678,        // Sum of views across all listings
  totalInquiries: 156,      // Sum of inquiries
  totalFavorites: 89,       // Sum of favorites
  monthlyData: [            // 12 months from Feb 2025 to Jan 2026
    { month: "Jan 2026", listings: 8 },
    { month: "Dec 2025", listings: 3 },
    { month: "Nov 2025", listings: 2 },
    { month: "Oct 2025", listings: 5 },
    { month: "Sep 2025", listings: 3 },
    { month: "Aug 2025", listings: 8 },
    { month: "Jul 2025", listings: 4 },
    { month: "Jun 2025", listings: 4 },
    { month: "May 2025", listings: 6 },
    { month: "Apr 2025", listings: 7 },
    { month: "Mar 2025", listings: 6 },
    { month: "Feb 2025", listings: 4 },
  ],
};

export default AgentPerformance;