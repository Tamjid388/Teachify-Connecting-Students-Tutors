import Booking from '@/components/modules/tutor-dashboard/tutor-bookings/Booking'
import React from 'react'

export default function page() {
  return (
    <div>
      <h1 className="text-4xl font-bold
      text-custom-primary
      ">Welcome To Tutor Dashboard</h1>
      <main>
        <Booking/>
      </main>
      </div>
  )
}
