"use client"

import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import TeacherForms from "./forms/TeacherForms";


function FormModal({table , type , data , id}:{
  table:"teacher" | "subject" | "parent" | "student" | "class" | "lesson" | "exam" | "assignment"|"result" | "attendence" | "event" | "announcement";
  type:"create" | "update" | "delete";
  data?:any;
  id?:number
  }) {
      
   const [open, setOpen] = useState(false)
    const size= type==="create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type ==="create" ? "bg-lamaYellow": type==="update" ? "bg-lamaSky" : "bg-lamaPurple";



    const Form =()=>{
      return type === "delete" && id? <form action="" className="flex flex-col p-4 gap-4">
        <span className="text-center font-medium ">All data will be lost. Are you sure you want to delete this {table} ?</span>

        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center" >
        Delete
        </button>

      </form> : <TeacherForms type="create"/>
    }



    return (
      <div className="p-4">
      <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={()=>setOpen(true)}> 

        <Image src={`/${type}.png`} alt="" width={16} height={16}/>
      </button> 
      {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">

      <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-%[60%] xl:w-[50%] 2xl:w-[40%]">
        <Form/>
        <div className="absolute top-4 right-4 cursor-pointer p-2  rounded-md bg-slate-200" onClick={()=>setOpen(false)}> 
        <span><MdClose size={24} color="black" /></span>
        </div>
        </div>
      </div>
        }
      </div>
    )
  }

export default FormModal