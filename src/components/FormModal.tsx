"use client"

import { deleteClass, deleteSubject, deleteTeacher } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { formContainerProps } from "./FormContainer";
import ClassForms from "./forms/ClassForms";


// Fix the misspellings + match all union keys exactly
const deleteActionMap= {
  subject: deleteSubject,
  teacher: deleteTeacher,
  parent: deleteSubject,
  student: deleteSubject,

  class: deleteClass,
  lesson: deleteSubject,
  exam: deleteSubject,
  assignment: deleteSubject,

  result: deleteSubject,
  attendence: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};



//This is how we import dynamically for better performance
const TeacherForms = dynamic(()=>import("./forms/TeacherForms"),{
  loading:()=><h1>Loading...</h1>
})

const StudentForm = dynamic(()=>import( "./forms/StudentForm"),{
  loading:()=><h1>Loading...</h1>
})


const SubjectForm =dynamic(()=>import("./forms/SubjectForm"),{
  loading:()=><h1>Loading...</h1>
})


const classForm = dynamic(()=>import("./forms/ClassForms"),{
  loading:()=><h1 className="flex h-full justify-center items-center text-xl text-green-950">Loading...</h1>
})

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any,
    relatedData?:any
  ) => JSX.Element;
} = {
  teacher: (type, setOpen, data, relatedData) => (
    <TeacherForms type={type} data={data} setOpen={setOpen} relatedData={relatedData}  />
  ),
  student: (type, setOpen, data, relatedData) => (
    <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  subject: (type, setOpen, data , relatedData) => (
    <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),

  class:(type, setOpen, data , relatedData)=>(
    <ClassForms type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  )


};


function FormModal({table , type , data , id,  relatedData}:formContainerProps & {relatedData?:any}) {
      
   const [open, setOpen] = useState(false)


    const [state, formAction] = useFormState(
       deleteActionMap[table],{
        success:false,
        error:false
       }
     )

  const router = useRouter()

   useEffect(()=>{
       if(state.success){
         toast(`Subject has been ${type==="create"? "Created":"Updated"} Successfully`)
         router.refresh()
         setOpen(false)
       }
       },[type,state, router,setOpen])


    const size= type==="create" ? "w-8 h-8" : "w-7 h-7"
    const bgColor = type ==="create" ? "bg-lamaYellow": type==="update" ? "bg-lamaSky" : "bg-lamaPurple";

    const Form =()=>{
      return type === "delete" && id?

       <form action={formAction} className="flex flex-col p-4 gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium ">All data will be lost. Are you sure you want to delete this {table} ?</span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center" >
        Delete
        </button>

      </form> : type==="create" || type=== "update"?( forms[table](type,setOpen,data,relatedData)): "Form Not Found!"
    }



    return (
      <div className="p-4">
      <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={()=>setOpen(true)}> 

        <Image src={`/${type}.png`} alt="create" width={16} height={16}/>
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