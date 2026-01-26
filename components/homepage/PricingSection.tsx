import { CheckCircle2 } from 'lucide-react';
import React from 'react'

  const pricingPlans = [
    {
      name: 'Starter',
      price: '49',
      description: 'Perfect for independent agents',
      features: [
        'Up to 100 properties',
        'Basic analytics',
        'Client management',
        'Email support',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '149',
      description: 'For growing agencies',
      features: [
        'Unlimited properties',
        'Advanced analytics',
        'Team collaboration',
        'Priority support',
        'API access',
        'Custom branding'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Training & onboarding',
        'White-label options'
      ],
      popular: false
    }
  ];

const PricingSection = () => {
  return (
          <section id="pricing" className="py-20 px-6 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 ${plan.popular ? 'border-blue-600 scale-105 relative' : 'border-gray-100'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default PricingSection