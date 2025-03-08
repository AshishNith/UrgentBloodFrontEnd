import React from 'react'
import { LampDemo } from '@/components/Hero'
import {WorldMapDemo} from '@/components/Map'
import { TimelineDemo } from '@/components/Timeline'
import {FloatingNavDemo} from '@/components/Header_Hero'
import { Donors } from '@/components/Donors'
import ChatBot from '@/components/ChatBot'
import Map from '@/components/MapComponent'

export default function page() {
  return (

    <div>
      
      <FloatingNavDemo/>
      <LampDemo />
      <Donors/>
      <Map/>
      <WorldMapDemo/>
      <TimelineDemo/>
      <ChatBot /> 
      
    </div>
  )
}

