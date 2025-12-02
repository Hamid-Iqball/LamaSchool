"use server";


import prisma from "./prisma";
import { ClassSchema, SubjectSchema } from "./fornValidationScehmas";



type CurrentState ={
    success:boolean,
    error:boolean
}


//Create Subject
export async function createSubject(currentState:CurrentState, data: SubjectSchema) {
  try {
    await prisma.subject.create({
        data:{
            name:data.name,
            teachers:{
              connect:data.teachers.map((teacherId)=>({id:teacherId})) //Not creating new teacher but linking teachers with the subject
           }
       }
    })
    // revalidatePath("/list/subjects"); this create a bug so we have to refresh the page manuallly  
    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}


//Update Subject
export async function updateSubject(currentState:CurrentState, data: SubjectSchema) {
  console.log(data)
  try {
    await prisma.subject.update({
        where:{
            id:data.id
        },
        data:{
            name:data.name,
            teachers:{
              set:data.teachers.map((teachId)=>({id:teachId}))
            }
        }
    })

    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}



//Delete Subject
export async function deleteSubject(currentState:CurrentState, data: FormData) {
  try {

    const id = data.get("id") as string  //type assertions
    await prisma.subject.delete({
        where:{
            id:parseInt(id) 
        },
    })

    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}


///#########  Class Actions ##############

export async function createClass(currentState:CurrentState, data: ClassSchema) {
  try {
    await prisma.class.create({
        data
    })

    // revalidatePath("/list/subjects"); this create a bug so we have to refresh the page manuallly
   
    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}



export async function updateClass(currentState:CurrentState, data: ClassSchema) {
  console.log(data)
  try {
    await prisma.class.update({
        where:{
            id:data.id
        },
        data:{
            name:data.name,
            capacity:data.capacity,
            supervisorId:data.supervisorId,
            gradeId:data.gradeId
           
        }
    })

    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}


export async function deleteClass(currentState:CurrentState, data: FormData) {
  try {

    const id = data.get("id") as string  //type assertions
    await prisma.class.delete({
        where:{
            id:parseInt(id) 
        },
    })

    return { success: true, error:false };
  } catch (error) {
    console.log(error);
    return { error: true,  success:false };
  }
}