"use client";

import React from 'react'
import { LampDemo } from '@/components/Hero'
import {WorldMapDemo} from '@/components/Map'
import { TimelineDemo } from '@/components/Timeline'
import {FloatingNavDemo} from '@/components/Header_Hero'
import ChatBot from '@/components/ChatBot'
import Map from '@/components/MapComponent'
import CallDonor from '@/components/CallDonor'
import CurrentLocation from '@/components/CurrentLocation'

export default function page() {
  return (

    <div>
      
      <FloatingNavDemo/>
      <LampDemo />
      <CallDonor />
      <Donors/>
      <CurrentLocation />
      <WorldMapDemo/>
      <Map/>
      <TimelineDemo/>
      <ChatBot /> 
      
    </div>
  )
}

