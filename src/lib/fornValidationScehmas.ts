import { Suranna } from "next/font/google";
import { z } from "zod";

export const subjectSchema = z.object({
    id:z.coerce.number().optional(),
    name: z.string()
    .min(1, { message: "Subject name is required" }),
    teachers:z.array(z.string()) //teacher id
   
    
  });

  export type SubjectSchema =  z.infer<typeof subjectSchema>


  export const classSchema = z.object({
    id:z.coerce.number().optional(),
    name: z.string().min(1, { message: "Class name is required" }),
    capacity:z.coerce.number().min(1,{message:"Class capacity is required"}),
    gradeId:z.coerce.number().max(5,{message:"Grade is required"}),
    supervisorId:z.string().optional() //teacher id
  });

  export type ClassSchema = z.infer<typeof classSchema> 


 export  const teacherSchema = z.object({
      id:z.string().optional(),
      username: z.string()
      .min(4, { message: "Username must be at least 4 characters long!" })
      .max(64,{message:"Username must be at most 64 characters long!"}),
      name:z.string().min(1, {message:"First Name is required!"}),
      surname:z.string().min(1, {message:"Surname is required!"}),
      email:z.string().email({message:"Invalid email address!"}).optional().or(z.literal("")),
      phone:z.string().optional(),
      address:z.string().min(1, {message:"Address is required!"}),
      img:z.string().optional(),
      bloodType:z.string().min(1, {message:"bloodtype is required!"}),
      sex:z.enum(["MALE", "FEMALE"], {message:"Sex in required"}),
      subjects:z.array(z.string()).optional(),
      classes:z.string().optional(),
      birthday:z.coerce.date({message:"Birthday is required!"}),
      password:z.string().min(8, {message:"Password must be at least 8 characters long!"}).optional().or(z.literal("")),
     
    });
  
  
  export type TeacherSchema = z.infer<typeof teacherSchema>



  export  const studentSchema = z.object({
      id:z.string().optional(),
      username: z.string()
      .min(4, { message: "Username must be at least 4 characters long!" })
      .max(64,{message:"Username must be at most 64 characters long!"}),
      name:z.string().min(1, {message:"First Name is required!"}),
      surname:z.string().min(1, {message:"Surname is required!"}),
      email:z.string().email({message:"Invalid email address!"}).optional().or(z.literal("")),
      phone:z.string().optional(),
      address:z.string().min(1, {message:"Address is required!"}),
      img:z.string().optional(),
      bloodType:z.string().min(1, {message:"bloodtype is required!"}),
      sex:z.enum(["MALE", "FEMALE"], {message:"Sex in required"}),
      gradeId:z.coerce.number().min(1,{message:"Grade is required"}),
      classId:z.coerce.number().min(1,{message:"Class is required"}),
      classes:z.string().optional(),
      parentId:z.string().min(1,{message:"ParentId is required"}),
      birthday:z.coerce.date({message:"Birthday is required!"}),
      password:z.string().min(8, {message:"Password must be at least 8 characters long!"}).optional().or(z.literal("")),
     
    });


  export type StudentSchema = z.infer<typeof studentSchema>