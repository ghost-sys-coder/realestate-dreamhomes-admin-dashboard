"use client"; // Enable client-side rendering for interactive components like charts and tabs

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"; // Assuming shadcn/ui is set up
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"; // Install with: npm install recharts
import { DollarSign, Home, Users, TrendingUp } from "lucide-react"; // Icons from lucide-react (install if needed: npm install lucide-react)

// Mock data for Property Reports
const mockProperties = [
  {
    id: 1,
    type: "Apartment",
    status: "Available",
    price: 250000,
    location: "Kampala",
    listings: 120,
  },
  {
    id: 2,
    type: "House",
    status: "Sold",
    price: 450000,
    location: "Entebbe",
    listings: 80,
  },
  {
    id: 3,
    type: "Land",
    status: "Pending",
    price: 150000,
    location: "Jinja",
    listings: 200,
  },
  {
    id: 4,
    type: "Commercial",
    status: "Available",
    price: 800000,
    location: "Kampala",
    listings: 50,
  },
  // Add more as needed for production
];

// Mock data for Sales Reports (monthly sales)
const mockSalesData = [
  { month: "Jan", sales: 12, revenue: 1500000 },
  { month: "Feb", sales: 19, revenue: 2200000 },
  { month: "Mar", sales: 15, revenue: 1800000 },
  { month: "Apr", sales: 25, revenue: 3000000 },
  { month: "May", sales: 18, revenue: 2100000 },
  { month: "Jun", sales: 22, revenue: 2600000 },
  // Extend for full year in production
];

// Mock data for Client Reports (lead sources pie chart)
const mockClientData = [
  { name: "Website", value: 400 },
  { name: "Referrals", value: 300 },
  { name: "Social Media", value: 300 },
  { name: "Walk-ins", value: 200 },
];

// Mock data for Financial Reports
const mockFinancials = [
  {
    category: "Revenue",
    amount: 5000000,
    change: "+15%",
    description: "Total sales revenue",
  },
  {
    category: "Expenses",
    amount: 2000000,
    change: "-5%",
    description: "Operational costs",
  },
  {
    category: "Net Profit",
    amount: 3000000,
    change: "+20%",
    description: "Profit after expenses",
  },
  {
    category: "Commissions",
    amount: 500000,
    change: "+10%",
    description: "Agent commissions paid",
  },
];

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ReportsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Vaal Properties Reports</h1>
      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="properties">
            <Home className="mr-2 h-4 w-4" />
            Property Reports
          </TabsTrigger>
          <TabsTrigger value="sales">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sales Reports
          </TabsTrigger>
          <TabsTrigger value="clients">
            <Users className="mr-2 h-4 w-4" />
            Client Reports
          </TabsTrigger>
          <TabsTrigger value="financials">
            <DollarSign className="mr-2 h-4 w-4" />
            Financial Reports
          </TabsTrigger>
        </TabsList>

        {/* Property Reports */}
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Inventory Overview</CardTitle>
              <CardDescription>
                Summary of current properties, statuses, and listings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price (UGX)</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Views/Listings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProperties.map((prop) => (
                    <TableRow key={prop.id}>
                      <TableCell>{prop.id}</TableCell>
                      <TableCell>{prop.type}</TableCell>
                      <TableCell>{prop.status}</TableCell>
                      <TableCell>{prop.price.toLocaleString()}</TableCell>
                      <TableCell>{prop.location}</TableCell>
                      <TableCell>{prop.listings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Add more charts/tables as needed, e.g., property type distribution pie */}
        </TabsContent>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>
                Monthly sales count and revenue trends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales Count" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue (UGX)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Add table for detailed sales if needed */}
        </TabsContent>

        {/* Client Reports */}
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Lead Sources</CardTitle>
              <CardDescription>
                Distribution of leads by source.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockClientData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockClientData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/* Add table for client details if needed */}
        </TabsContent>

        {/* Financial Reports */}
        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>
                Key financial metrics and changes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount (UGX)</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFinancials.map((fin, index) => (
                    <TableRow key={index}>
                      <TableCell>{fin.category}</TableCell>
                      <TableCell>{fin.amount.toLocaleString()}</TableCell>
                      <TableCell
                        className={
                          fin.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }
                      >
                        {fin.change}
                      </TableCell>
                      <TableCell>{fin.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Add chart for revenue vs expenses over time if needed */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;