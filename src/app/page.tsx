import React from 'react'
import { LampDemo } from '@/components/Hero'
import {WorldMapDemo} from '@/components/Map'
import { TimelineDemo } from '@/components/Timeline'
import {FloatingNavDemo} from '@/components/Header_Hero'
import ChatBot from '@/components/ChatBot'
import Map from '@/components/MapComponent'
import CurrentLocation from '@/components/CurrentLocation'

export default function page() {
  return (

    <div>
      
      <FloatingNavDemo/>
      <LampDemo />
      <CurrentLocation />
      <Map/>
      <WorldMapDemo/>
      <TimelineDemo/>
      <ChatBot /> 
      
    </div>
  )
}

