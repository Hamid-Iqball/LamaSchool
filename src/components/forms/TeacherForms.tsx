"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    username: z.string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20,{message:"Username must be at most 20 characters long!"}),
    email:z.string().email({message:"Invalid email address!"}),
    password:z.string().min(8, {message:"Password must be at least 8 characters long !"}),
    firstName:z.string().min(1, {message:"First Name is required!"}),
    lastName:z.string().min(1, {message:"Last Name is required!"}),
    phonenumber:z.number().min(1, {message:"phone number is required!"}),
    address:z.string().min(1, {message:"Address is required!"}),
    birthday:z.date({message:"Birthday is required!"}),
    sex:z.enum(["male", "female"], {message:"Sex in required"}),
    img:z.instanceof(File, {message:"Image is required!"})
   
  });

function TeacherForms({type ,data}:{type:"create" | "update", data?:any}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
      });

  return (
    <form className="flex flex-col gap-8">
       <h1 className="text-xl font-semibold ">Create a new teacher</h1>
       <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
       <input type="text" {...register("username")}className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"/>
       {errors.username?.message && <p>{errors.username?.message.toString()}</p>}
       <span className="text-xs text-gray-400 font-medium">Personal Information </span>
       
       <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ?"Create" : "Update"}</button>
    </form>
  )
}

export default TeacherForms