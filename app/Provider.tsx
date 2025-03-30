"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { log } from 'node:console'
import { UserLocationProvider } from '@/context/UserLocationContext'

const Provider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const path = usePathname()
  const headerShown = path == '/sign-in' || path == '/sign-up' ? false : true


  
  return (
    <UserLocationProvider>
    <div>
      {headerShown && <Header />}
      {children}
    </div>
    </UserLocationProvider>
  )
}

export default Provider