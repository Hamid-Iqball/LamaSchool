"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { teacherSchema, TeacherSchema } from "@/lib/fornValidationScehmas";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Subject } from "@prisma/client";
import { CldUploadWidget } from 'next-cloudinary';

function TeacherForms({type, data, setOpen, relatedData}: {
  type: "create" | "update", 
  data?: any, 
  setOpen: Dispatch<SetStateAction<boolean>>, 
  relatedData?: any
}) {
  const [img, setImg] = useState<any>()
  
  const {register, handleSubmit, formState: { errors }} = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const {subjects} = relatedData || {subjects: []}
  
  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
      message: ""
    }
  )
  
  const router = useRouter()
  
  const onSubmit = handleSubmit((formData: TeacherSchema) => {
    const formDataObj = new FormData();
    Object.entries({...formData, img: img?.secure_url}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataObj.append(key, String(item)));
      } else if (value !== undefined && value !== null) {
        formDataObj.append(key, String(value));
      }
    });
    formAction(formDataObj)
  })
    
  useEffect(() => {
    if(state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"} successfully`)
      setOpen(false)
      router.refresh()
    }
  }, [type, state, router, setOpen])


  console.log(data)
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create" : "Update"} a teacher
      </h1>
      
      <div className="flex flex-wrap justify-between gap-4">
        <InputField 
          label="Username"
          name="username" 
          defaultValue={data?.username} 
          register={register} 
          error={errors?.username}
        />

      {type === "update" && (
  <InputField 
    label="id"
    name="id"
    defaultValue={data?.id}
    register={register}
    error={errors?.id}
    hidden
  />
)}


        <InputField 
          label="Name"
          name="name" 
          defaultValue={data?.name} 
          register={register} 
          error={errors?.name}
        />

        <InputField 
          label="SurName"
          name="surname" 
          defaultValue={data?.surname} 
          register={register} 
          error={errors?.surname}
        />
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField 
          label="Email"
          name="email" 
          type="email" 
          defaultValue={data?.email} 
          register={register} 
          error={errors?.email}
        />
  
        <InputField 
          label="Phone"
          name="phone" 
          defaultValue={data?.phone} 
          register={register} 
          error={errors?.phone}
        />

        <InputField 
          label="Address"
          name="address" 
          defaultValue={data?.address} 
          register={register} 
          error={errors?.address}
        />

        <InputField 
          label="Blood Type"
          name="bloodType" 
          defaultValue={data?.bloodType} 
          register={register} 
          error={errors?.bloodType}
        />

        <InputField 
          label="Password"
          name="password" 
          defaultValue={data?.password} 
          register={register} 
          error={errors?.password}
        />

        <InputField 
          label="Birthday"
          name="birthday" 
          type="date" 
          defaultValue={data?.birthday.toISOString().split("T")[0]} 
          register={register} 
          error={errors?.birthday}
        />

       { /*The toISOString() method converts a JavaScript Date object to a string in the ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ). This is useful because it standardizes the format of the date. */}

        <div className="flex flex-col gap-2 w-full sm:w-1/4">
          <label className="text-xs text-gray-400">Sex</label>
          <select 
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" 
            {...register("sex")} 
            defaultValue={data?.sex}
          > 
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-1/4">
          <label className="text-xs text-gray-400">Subjects</label>
          <select 
            multiple  
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" 
            {...register("subjects")} 
            defaultValue={data?.subject}
          > 
            {subjects.map((subject: Subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            Hold ctrl/CMD to select multiple subjects
          </p>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects?.message.toString()}
            </p>
          )}
        </div>

        {/* Upload Widget - Properly closed */}
        <CldUploadWidget 
          uploadPreset="school" 
          onSuccess={(result, {widget}) => {        
            setImg(result.info)
            widget.close()
          }}
        >
          {({ open }) => (
            <div 
              className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image 
                alt="upload icon"
                src="/upload.png"
                width={28} 
                height={28}
              />
              <span>Upload a photo</span>
            </div>
          )}
        </CldUploadWidget>
      </div>

      {/* Display all form errors */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside text-sm text-red-500">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                <span className="font-medium">{field}:</span> {error?.message?.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display server-side error */}
      {/* {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{state.message}</p>
        </div>
      )} */}

      {/* Submit button - Now properly outside the upload widget and flex container */}
      <button 
        className="bg-blue-400 text-white p-2 rounded-md" 
        type="submit"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  )
}

export default TeacherForms