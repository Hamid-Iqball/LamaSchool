"use client"


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { date } from "zod";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalender() {

   const [value, onChange] =  useState<Value>(new Date())
   const router =  useRouter()

   useEffect(()=>{

    if(value instanceof Date){

      router.push(`?date=${value}`)
    }


   },[value, router])

  return (
    <div className="bg-white p-4 rounded-md">  
   <Calendar value={value} onChange={onChange}/>
    </div>
    
  )
}

export default EventCalender