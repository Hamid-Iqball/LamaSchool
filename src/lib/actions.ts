"use server";


import prisma from "./prisma";
import { ClassSchema, SubjectSchema, TeacherSchema, teacherSchema } from "./fornValidationScehmas";
import { clerkClient } from "@clerk/nextjs/server";



type CurrentState ={
    success:boolean,
    error:boolean,
    message?:string
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



// ############## Teacher Actions ######################

export async function createTeacher(currentState: CurrentState, formData: FormData) {
  try {
    // Parse FormData into an object
    const formDataObj: any = {};
    formData.forEach((value, key) => {
      if (formDataObj[key]) {
        // If key already exists, convert to array
        if (Array.isArray(formDataObj[key])) {
          formDataObj[key].push(value);
        } else {
          formDataObj[key] = [formDataObj[key], value];
        }
      } else {
        formDataObj[key] = value;
      }
    });

    // Validate with Zod schema
    const data = teacherSchema.parse(formDataObj);

    // 1. Create Clerk user
    const client = await clerkClient();

    const user = await client.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" }
    });

    if (!user) {
      return {
        success: false,
        error: true,
        message: "Failed to create user in auth system."
      };
    }

    // 2. Insert into database
    await prisma.teacher.create({
      data: {
    
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.img,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: (data.subjects ?? []).map((subjectId: string) => ({
            id: parseInt(subjectId)
          }))
        }
      }
    });

    return { success: true, error: false };

  } catch (error: any) {
    console.log("🔥 Server Action Error:", error);

    // ==========================
    // CLERK VALIDATION ERROR
    // ==========================
    if (error?.errors?.length) {
      return {
        success: false,
        error: true,
        message: error.errors[0].message,
        field: error.errors[0].meta?.param || undefined
      };
    }

    // ==========================
    // PRISMA UNIQUE CONSTRAINT
    // ==========================
    if (error.code === "P2002") {
      return {
        success: false,
        error: true,
        message: `The ${error.meta?.target?.join(", ")} must be unique.`,
        field: error.meta?.target?.[0] // helps you attach error to form field
      };
    }

    // ==========================
    // ANY OTHER DB ERROR
    // ==========================
    if (error.code?.startsWith("P2")) {
      return {
        success: false,
        error: true,
        message: "A database error occurred."
      };
    }

    // ==========================
    // FALLBACK: RANDOM EXPLOSION
    // ==========================
    return {
      success: false,
      error: true,
      message: "Something unexpected happened."
    };
  }
}



export async function updateTeacher(currentState: CurrentState, data: FormData) {
  try {
    // Parse FormData into an object
    const formDataObj: any = {};
    data.forEach((value, key) => {
      if (formDataObj[key]) {
        // If key already exists, convert to array
        if (Array.isArray(formDataObj[key])) {
          formDataObj[key].push(value);
        } else {
          formDataObj[key] = [formDataObj[key], value];
        }
      } else {
        formDataObj[key] = value;
      }
    });

    // Validate with Zod schema
    const validatedData = teacherSchema.parse(formDataObj);

    // Check if ID exists
    if (!validatedData.id) throw new Error("Teacher ID is required for update.");
    
    // Ensure subjects is always an array (even if empty)
    const subjects = Array.isArray(validatedData.subjects) ? validatedData.subjects : [];

    // Convert birthday to proper Date object for Prisma
    const birthday = new Date(validatedData.birthday);
    
    // If the image is not uploaded, set it to null or handle accordingly
    const img = validatedData.img === 'undefined' ? null : validatedData.img;

    // Update the user in the auth system
    const client = await clerkClient();
    const user = await client.users.updateUser(validatedData.id, { 
      username: validatedData.username,
      firstName: validatedData.name,
      lastName: validatedData.surname,
      password: validatedData.password || undefined, // Only update password if provided
    });

    if (!user) {
      return {
        success: false,
        error: true,
        message: "Failed to update user in auth system.",
      };
    }

    // Update the teacher in the database
    await prisma.teacher.update({
      where: { id: validatedData.id },
      data: {
        ...(validatedData.password && { password: validatedData.password }), // Only include password if it's provided
        id: user.id,
        username: validatedData.username,
        name: validatedData.name,
        surname: validatedData.surname,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        img: img,
        bloodType: validatedData.bloodType,
        sex: validatedData.sex,
        birthday: birthday,
        subjects: {
          set: subjects.map((subjectId: string) => ({
            id: parseInt(subjectId)
          }))
        }
      }
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true, message: "An error occurred while updating the teacher." };
  }
}



export async function deleteTeacher(currentState:CurrentState, data: FormData) {
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

