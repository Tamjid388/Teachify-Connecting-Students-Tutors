import React from 'react'
import { Award, Calendar, Video, TrendingUp } from 'lucide-react'

export default function WhyChoose() {
  const features = [
    {
      icon: Award,
      title: "Expert Tutors",
      description: "Access verified tutors with proven track records in their subjects.",
      detail: "Every tutor is background-checked"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule. Morning, evening, or weekend — learn at your pace.",
      detail: null
    },
    {
      icon: Video,
      title: "Interactive Sessions",
      description: "Engage in real-time video calls with screen sharing, whiteboards, and collaborative tools.",
      detail: null
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics, goal tracking, and achievement badges.",
      detail: null
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
           Everything you need to succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We have built the tools and community to make learning effective, engaging, and enjoyable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon Container */}
                <div className="mb-6 inline-block">
                  <div className="w-16 h-16 bg-custom-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-custom-secondary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {feature.description}
                </p>
           
              </div>
            )
          })}
        </div>

  
      </div>
    </section>
  )
}