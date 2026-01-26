import { DollarSign, Home, Target, Users } from 'lucide-react';
import React from 'react'

const stats = [
    { value: '50K+', label: 'Properties Managed', icon: Home },
    { value: '12K+', label: 'Active Users', icon: Users },
    { value: '$2.5B+', label: 'Transaction Volume', icon: DollarSign },
    { value: '99.9%', label: 'Uptime SLA', icon: Target }
  ];

const Stats = () => {
  return (
    <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default Stats