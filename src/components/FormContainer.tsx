import prisma from "@/lib/prisma";
import FormModal from "./FormModal";

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