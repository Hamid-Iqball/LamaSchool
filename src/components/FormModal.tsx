"use client"

import Image from "next/image";


function FormModal({table , type , data , id}:
  {
  table:"teacher" | "subject" | "parent" | "student" | "class" | "lesson" | "exam" | "assignment"|"result" | "attendence" | "event" | "announcement";
  type:"create" | "update" | "delete";
  data?:any;
  id?:number
  }) {
      
    const size= type==="create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type ==="create" ? "bg-lamaYellow": type==="update" ? "bg-lamaSky" : "bg-lamaPurple";
    return (
      <>
      <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}> 

        <Image src={`/${type}.png`} alt="" width={16} height={16}/>
      </button> 
      </>
    )
  }

export default FormModal