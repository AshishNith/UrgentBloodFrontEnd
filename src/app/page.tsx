import React from 'react'
import { LampDemo } from '@/components/Hero'
import {WorldMapDemo} from '@/components/Map'
import { TimelineDemo } from '@/components/Timeline'
import {FloatingNavDemo} from '@/components/Header_Hero'
import { Donors } from '@/components/Donors'
import ChatBot from '@/components/ChatBot'

export default function page() {
  return (

    <div>
      
      <FloatingNavDemo/>
      <LampDemo />
      <Donors/>
      <WorldMapDemo/>
      <TimelineDemo/>
      <ChatBot /> 
      
    </div>
  )
}

