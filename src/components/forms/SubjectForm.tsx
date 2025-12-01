"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { SubjectSchema, subjectSchema } from "@/lib/fornValidationScehmas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom"; // or useActionState depending on your React version
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SubjectForm({type, data, setOpen}: {type: "create" | "update", data?: any , setOpen:Dispatch<SetStateAction<boolean>> }) {

  const {register, handleSubmit, formState: { errors }} = useForm<SubjectSchema>({
      resolver: zodResolver(subjectSchema),
  });

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
      <div className="flex flex-wrap justify-between gap-4">
        <InputField 
          label="Subject Name"
          name="name" 
          defaultValue={data?.name} 
          register={register} 
          error={errors?.name}
        />
      </div>

      {state.error && <span className="text-red-400 text-center">Something went wrong...</span>}
      
      <button className="bg-blue-400 text-white p-2 rounded-md" disabled={pending}>
        {pending ? "Loading..." : (type === "create" ? "Create" : "Update")}
      </button>
    </form>
  )
}

export default SubjectForm