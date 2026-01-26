import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';

const testimonials = [
    {
        name: 'Sarah Martinez',
        role: 'CEO, Premium Realty Group',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        content: 'This platform transformed how we manage our portfolio. The analytics alone increased our efficiency by 40%.',
        rating: 5
    },
    {
        name: 'Michael Chen',
        role: 'Managing Director, Urban Properties',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        content: 'Best real estate management system we\'ve used. The client tracking features are game-changing.',
        rating: 5
    },
    {
        name: 'Emily Rodriguez',
        role: 'VP Operations, Skyline Estates',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        content: 'Intuitive, powerful, and reliable. Our team adopted it in days and we saw immediate ROI.',
        rating: 5
    }
];

const TestimonialsSection = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  });

    return (
        <section id="testimonials" className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Loved by Real Estate Professionals
                    </h2>
                    <p className="text-xl text-gray-600">
                        Join thousands of agents and brokers who trust RealtyPro
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 shadow-xl">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-500 ${index === activeTestimonial ? 'block' : 'hidden'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-2xl text-gray-800 mb-8 leading-relaxed italic">
                                    {testimonial.content}
                                </p>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                        width={100} height={100}
                                    />
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                                        <div className="text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex gap-2 justify-center mt-8">
                            {testimonials.map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === activeTestimonial ? 'w-8 bg-blue-600' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection