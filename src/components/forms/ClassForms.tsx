"use client"

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, useForm } from "react-hook-form";
import { Schema, z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ClassSchema, classSchema } from "@/lib/fornValidationScehmas";
import { createClass, updateClass } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";





function ClassForm({type ,data, setOpen , relatedData}:{type:"create" | "update", data?:any, setOpen: Dispatch<SetStateAction<boolean>> , relatedData?:any}) {

        const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema),
        defaultValues: data ? {
            name: data.name,
            capacity: data.capacity,
            supervisorId: data.supervisorId,
            gradeId: data.gradeId
        } : {}
        });



      
    const {teachers,  grades} = relatedData
  
            
    const initialState = {
            success: false,
            error: false
        }


  //from React19 onward the name if this hook wil be useActionState
    const [state, formAction ] = useFormState(
            type === "create" ? createClass : updateClass,
            initialState
        )
    const router= useRouter()
 
    const onSubmit = handleSubmit((formData: ClassSchema) => {
                formAction(type === "update" && data?.id ? { ...formData, id: data.id } : formData)
        })


     useEffect(()=>{
        if(state.success){
            toast(`Class has been ${type==="create"? "Created":"Updated"} Successfully`)
            setOpen(false)
            router.refresh()
        }
        },[type,state, router,setOpen])

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
       <h1 className="text-xl font-semibold ">{type==="create"? "Create Class" : "Update Class"}</h1>

      
      <div className="flex flex-wrap justify-normal gap-4">
        
       <InputField 
        label="Class name"
        name="name" 
        defaultValue={data?.name} 
        register={register} 
        error={errors?.name}/>

       <InputField 
        label="Capacity"
        name="capacity" 
        type="number" 
        defaultValue={data?.capacity} 
        register={register} 
        error={errors?.capacity}/>
  
        <div className="flex flex-col gap-2 w-full sm:w-1/4 ">
        <label className="text-xs text-gray-400">Supervisor</label>
        <select   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm  w-full" {...register("supervisorId")} defaultValue={data?.supervisorId}> 
          {teachers.map((teacher:{id:string, name:string , surname:string})=>(
            <option value={teacher.id} key={teacher.id}
            selected={data && teacher.id===data.supervisorId}
            >{teacher.name + " " + teacher.surname}</option>
          ))}
        </select>
        {errors.supervisorId?.message && <p className="text-xs text-red-400">{errors.supervisorId?.message.toString()}</p>}

        </div>



        <div className="flex flex-col gap-2 w-full sm:w-1/4 ">
        <label className="text-xs text-gray-400">Grade</label>
        <select   className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm  w-full" {...register("gradeId")} defaultValue={data?.gradeId}> 

        {grades.map((grade:{id:number,level:number})=>(
            <option value={grade.level} key={grade.id}
            selected={data && grade.id===data.gradeId}
            >{grade.level}</option>
        ))}
        </select>
        {errors.gradeId?.message && <p className="text-xs text-red-400">{errors.gradeId?.message.toString()}</p>}

        </div>

        </div>



       <div className="flex justify-start flex-wrap gap-4">


        </div>



       <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ?"Create" : "Update"}</button>
    </form>
  )
}

export default ClassForm