import prisma from "@/lib/prisma"
import BigCalander from "./BigCalander"
import { adjustScehduleTOCurrentWeek } from "../../utils/dates"


async function BigCalenderContainer({type, id}:{type:"teacherId"|"classId", id:string | number}) {

const resData = await prisma.lesson.findMany({
    where:{
    ...(type==="teacherId"?
        {teacherId:id as string} :{classId:id as number}
    )
    }
})


const data = resData.map((lesson) => {
  return {
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }
})


const schedule = adjustScehduleTOCurrentWeek(data)

console.log(data)
  return (
    <div>
     <BigCalander data={schedule}/>
    </div>
  )
}

export default BigCalenderContainer