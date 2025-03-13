"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

//TEMPORARY
const events =[
  {
    id:1,
    title:"Lorem ispm dolor",
    time:"12:00  pm - 2:00 PM",
    description:"Lorem ispm dolor sit ament , dirt ainitdngn"
  },
  {
    id:2,
    title:"Lorem ispm dolor",
    time:"12:00  pm - 2:00 PM",
    description:"Lorem ispm dolor sit ament , dirt ainitdngn"
  },
  {
    id:3,
    title:"Lorem ispm dolor",
    time:"12:00  pm - 2:00 PM",
    description:"Lorem ispm dolor sit ament , dirt ainitdngn"
  },
]
function EventCalender() {

    const  [value,onChange]  = useState<Value>(new Date())
  return (
    <div className="bg-white p-4 rounded-md"> 
    <Calendar onChange={onChange} value={value} />
    {/* EVENTs */}
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold my-4">Events</h1>
      <Image alt="" src="/moreDark.png" width={12} height={12} />
    </div>
    <div className="flex flex-col gap-4">

    {events.map(event=>(
      <div key={event.id} className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">{event.title}</h1>
          <span className="text-gray-300 text-xs"> {event.time}</span>
          </div>
          <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
           </div>
    ))}
    </div>
    </div>
  )
}

export default EventCalender