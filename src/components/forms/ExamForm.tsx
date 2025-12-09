"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { examSchema, ExamSchema, SubjectSchema, subjectSchema } from "@/lib/fornValidationScehmas";
import { createExam, createSubject, updateExam, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom"; // or useActionState depending on your React version
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function ExamForm({type, data, setOpen, relatedData}: {type: "create" | "update", data?: any , setOpen:Dispatch<SetStateAction<boolean>> , relatedData?:any}) {

  const {register, handleSubmit, formState: { errors }} = useForm<ExamSchema>({
      resolver: zodResolver(examSchema),
  });


  const { lessons } = relatedData 


  const initialState = {
      success: false,
      error: false
  }


  //from React19 onward the name if this hook wil be useActionState
  const [state, formAction, pending] = useFormState(
    type === "create" ? createExam : updateExam,
    initialState
  )
  const router= useRouter()
  
  const onSubmit = handleSubmit((formData: ExamSchema) => {
        formAction(type === "update" && data?.id ? { ...formData, id: data.id } : formData)
  })


  useEffect(()=>{
  if(state.success){
    toast(`EXAM has been ${type==="create"? "Created":"Updated"} Successfully`)
    setOpen(false)
    router.refresh()
  }
  },[type,state, router,setOpen])


  
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
       <h1 className="text-xl font-semibold ">{type === "create" ? "Create a new Subject" : "Update the Subject"}</h1>     
      <div className="flex flex-col gap-6">
        <InputField 
          label="Title"
          name="title" 
          defaultValue={data?.title}
          register={register} 
          error={errors?.title}
        />




        <InputField 
        label="Start Time"
        name="startTime"
        type="datetime-local"
        defaultValue={data?.startTime ? new Date(data.startTime).toISOString().slice(0,16) : undefined}
        register={register}
        error={errors?.startTime}
        />
        <InputField 
        label="End Time"
        name="endTime"
        type="datetime-local"
        defaultValue={data?.endTime ? new Date(data.endTime).toISOString().slice(0,16) : undefined}
        register={register}
        error={errors?.endTime}
        />
        

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Lesson</label>
          <select
  
            className="ring-[1.5px] ring-gray-300 p-2 rounded-lg text-sm w-full  focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all bg-white"
            {...register("lessonId")}
          >
            {lessons.map((lesson:{id:number,name:string}) => (
              <option 
                key={lesson.id} 
                value={lesson.id}
                className="py-2 px-1 hover:bg-blue-50 cursor-pointer"
              >
                {lesson.name} 
              </option>
            ))}
          </select>
  
          {errors.lessonId?.message && (
            <p className="text-xs text-red-500 font-medium">{errors.lessonId.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && <span className="text-red-400 text-center">Something went wrong...</span>}
      
      <button className="bg-blue-400 text-white p-2 rounded-md" disabled={pending}>
        {pending ? "Loading..." : (type === "create" ? "Create" : "Update")}
      </button>
    </form>
  )
}

export default ExamForm