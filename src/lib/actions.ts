"use server";


import prisma from "./prisma";
import { SubjectSchema } from "./fornValidationScehmas";


type CurrentState ={
    success:boolean,
    error:boolean
}


//Create Subject
export async function createSubject(currentState:CurrentState, data: SubjectSchema) {
  try {
    await prisma.subject.create({
        data:{
            name:data.name
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
  try {
    await prisma.subject.update({
        where:{
            id:data.id
        },
        data:{
            name:data.name
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