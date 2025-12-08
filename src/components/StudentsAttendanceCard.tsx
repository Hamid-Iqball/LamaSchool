import prisma from "@/lib/prisma"


async function StudentsAttendanceCard({id}:{id?:string}) {
const attendance = await prisma.attendance.findMany({
    where:{
        studentId:id,
        date:{
            gte:new Date(new Date().getFullYear(), 0, 1) 
        }
    }
})

const toalDays = attendance.length
const presentDays= attendance.filter(day=>day.present).length
const percentage = toalDays === 0 ? 0 : Math.round((presentDays / toalDays) * 100)
  return (
    <div className="">
        <h1 className="text-xl font-semibold">
           {percentage || "-"}%
        </h1>
        <span className="text-sm text-gray-400">Attendance</span>
    </div>
  )
}

export default StudentsAttendanceCard