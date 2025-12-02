"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/fornValidationScehmas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom"; // or useActionState depending on your React version
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SubjectForm({type, data, setOpen, relatedData}: {type: "create" | "update", data?: any , setOpen:Dispatch<SetStateAction<boolean>> , relatedData?:any}) {

  const {register, handleSubmit, formState: { errors }} = useForm<SubjectSchema>({
      resolver: zodResolver(subjectSchema),
      defaultValues: {
        name: data?.name || "",
        teachers: data?.teachers?.map((t: any) => t.id) || []
      }
  });


  const { teachers } = relatedData || { teachers: [] };


  const initialState = {
      success: false,
      error: false
  }


  //from React19 onward the name if this hook wil be useActionState
  const [state, formAction, pending] = useFormState(
    type === "create" ? createSubject : updateSubject,
    initialState
  )
  const router= useRouter()
  
  const onSubmit = handleSubmit((formData: SubjectSchema) => {
        formAction(type === "update" && data?.id ? { ...formData, id: data.id } : formData)
  })


  useEffect(()=>{
  if(state.success){
    toast(`Subject has been ${type==="create"? "Created":"Updated"} Successfully`)
    setOpen(false)
    router.refresh()
  }
  },[type,state, router,setOpen])


  
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
       <h1 className="text-xl font-semibold ">{type === "create" ? "Create a new Subject" : "Update the Subject"}</h1>     
      <div className="flex flex-col gap-6">
        <InputField 
          label="Subject Name"
          name="name" 
          register={register} 
          error={errors?.name}
        />
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Teachers</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-3 rounded-lg text-sm w-full min-h-[120px] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all bg-white"
            {...register("teachers")}
          >
            {teachers.map((teacher: { id: string; name: string; surname: string }) => (
              <option 
                key={teacher.id} 
                value={teacher.id}
                className="py-2 px-1 hover:bg-blue-50 cursor-pointer"
              >
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 italic">Hold Ctrl (Cmd on Mac) to select multiple teachers</p>
          {errors.teachers?.message && (
            <p className="text-xs text-red-500 font-medium">{errors.teachers.message.toString()}</p>
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

export default SubjectForm