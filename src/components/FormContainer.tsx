import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { teachersData } from "@/lib/data";

export type formContainerProps={

  table:"teacher" | "subject" | "parent" | "student" | "class" | "lesson" | "exam" | "assignment"|"result" | "attendence" | "event" | "announcement";
  type:"create" | "update" | "delete";
  data?:any;
  id?:number | string
  }


async function FormContainer({table , type , data , id}:formContainerProps) {
let relatedData = {}


if(type!=="delete"){
    switch (table) {

    case "subject":
        const subjectteachers = await prisma.teacher.findMany({
            select:{id:true, name:true , surname:true  }
        })  
        relatedData={teachers:subjectteachers}
        break;

    case "class":
      const classteachers = await prisma.teacher.findMany({
        select:{
          id:true, 
          name:true,
          surname:true
        }
      })
      const classGrades = await prisma.grade.findMany({
        select:{
          id:true, level:true
        }
      }) 

      relatedData={
        teachers: classteachers,
        grades:classGrades,
      }
      break;



      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select:{
            id:true,
            name:true,
          }
        })

        relatedData={subjects:teacherSubjects}
        break;

        case "student": 
          const studentGrades = await prisma.grade.findMany({
            select:{
              id:true,
              level:true
            }
          })

          const studentClasses = await prisma.class.findMany({
          include:{
            _count:{
              select:{
                students:true 
              }
            }}
          })

          relatedData={
            grades:studentGrades,
            classes:studentClasses
          }
          break



            default:
                break;
            }
        }







  return (
    <div>
        <FormModal type={type} table={table} id={id} data={data} relatedData={relatedData}/>
    </div>
  )
}

export default FormContainer