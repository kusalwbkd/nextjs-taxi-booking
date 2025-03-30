"use client"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
//import { useUserLocation } from '@/context/UserLocationContext'
import React from 'react'
import CheckOutForm from '../_components/Payments/CheckOutForm'
import { useUserLocation } from '@/context/UserLocationContext'

const Payment = () => {
    const{
      routesDirections,
      carAmount,
      setCarAmount
    }=useUserLocation()
    console.log("car amount from payment",carAmount);
  
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
  const options: any = {
    mode: 'payment',
    amount: Math.round(Number(carAmount)*100),
    currency: 'usd'
  }

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-xl font-semibold mb-4">Checkout</h1>
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm amount={options.amount} />
      </Elements>
    </div>
  )
}

export default Payment