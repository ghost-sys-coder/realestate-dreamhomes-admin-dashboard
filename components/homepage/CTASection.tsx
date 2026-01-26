import React from 'react'

const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful real estate professionals using RealtyPro to scale their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent text-white rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-100 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
  )
}

export default CTASection