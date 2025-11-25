import Image from "next/image"
import AttendenceChart from "./AttendenceChart"
import prisma from "@/lib/prisma"

async function AttendanceChartContainer() {
  // Find out the last Monday
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daySinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const lastMonday = new Date(today)
  lastMonday.setDate(today.getDate() - daySinceMonday)

  // fetch data
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday
      }
    },
    select: {
      date: true,
      present: true
    }
  })

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  const attendceMap: { [key: string]: { present: number; absent: number } } = {
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 }
  }

  resData.forEach(item => {
    const itemDate = new Date(item.date)
    const itemDay = itemDate.getDay()

    if (itemDay >= 1 && itemDay <= 5) {
      const dayName = daysOfWeek[itemDay - 1]

      if (item.present) {
        attendceMap[dayName].present += 1
      } else {
        attendceMap[dayName].absent += 1
      }
    }
  })

  const data = daysOfWeek.map(day => ({
    name: day,
    present: attendceMap[day].present,
    absent: attendceMap[day].absent
  }))

  return (
    <div className="w-full bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      <AttendenceChart data={data} />
    </div>
  )
}

export default AttendanceChartContainer
