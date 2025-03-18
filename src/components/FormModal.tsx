"use client"

import Image from "next/image";
import { useState } from "react";


function FormModal({table , type , data , id}:{
  table:"teacher" | "subject" | "parent" | "student" | "class" | "lesson" | "exam" | "assignment"|"result" | "attendence" | "event" | "announcement";
  type:"create" | "update" | "delete";
  data?:any;
  id?:number
  }) {
      
   const [open, setOpen] = useState(false)
    const size= type==="create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type ==="create" ? "bg-lamaYellow": type==="update" ? "bg-lamaSky" : "bg-lamaPurple";
    return (
      <>
      <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={()=>setOpen(true)}> 

        <Image src={`/${type}.png`} alt="" width={16} height={16}/>
      </button> 
      {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">

      <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-%[60%] xl:w-[50%] 2xl:w-[40%]">

        <div className="absolute top-4 right-4 cursor-pointer p-4 bg-black" onClick={()=>setOpen(false)}> 
        <Image src="/close.png" width={14} height={14} alt="image" />
        </div>
        </div>
      </div>
        }
      </>
    )
  }

export default FormModal