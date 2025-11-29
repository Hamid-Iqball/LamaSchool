import prisma from "@/lib/prisma"
import BigCalander from "./BigCalander"


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


console.log(data)
  return (
    <div>
     <BigCalander data={data}/>
    </div>
  )
}

export default BigCalenderContainer