import React from 'react'
import {
  BarChart3,
  Users,
  TrendingUp,
  Building2,
  Smartphone,
  Lock,
  ChevronRight
} from 'lucide-react';

const FeaturesSection = () => {
    const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights into your property portfolio with comprehensive data visualization and predictive analytics.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Manage relationships, track interactions, and automate communications with your entire client base.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Building2,
      title: 'Property Portfolio',
      description: 'Centralized hub for all your listings with advanced filtering, tagging, and organization tools.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Tracking',
      description: 'Monitor sales performance, commissions, and financial metrics with automated reporting.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Access your dashboard anywhere with our responsive design optimized for all devices.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, role-based access control, and comprehensive audit logs.',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for real estate professionals who want to scale their business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 bg-linear-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <button className="mt-6 text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection