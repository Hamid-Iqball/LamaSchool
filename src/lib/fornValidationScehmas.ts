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