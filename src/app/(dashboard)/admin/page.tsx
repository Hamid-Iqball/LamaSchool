import CountChart from "@/components/CountChart"
import UserCart from "@/components/UserCard"
import AttendenceChart from "@/components/AttendenceChart"
import FinanceChart from "@/components/FinanceChart"
import EventCalender from "@/components/EventCalender"
import Announcement from "@/components/Announcement"
import CountChartContainer from "@/components/CountChartContainer"
import AttendanceChartContainer from "@/components/AttendanceChartContainer"
import EventClanderContainer from "@/components/EventClanderContainer"

async function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">

      <div className=" flex gap-4 justify-between flex-wrap ">
      <UserCart type="admin"/>
      <UserCart type="student"/>
      <UserCart type="teacher"/>
      <UserCart type="parent"/>
      </div>
      {/* MIDDLE CHARTS */}
      <div className="flex gap-4 flex-col lg:flex-row">
      {/* Count Chart */}
      <div className="w-full lg:w-1/3 h-[450px]" >
      <CountChartContainer/>

      </div>
      {/* Attendence chart */}
      <div className="w-full lg:w-2/3 h-[450px]">
      <AttendanceChartContainer/>
      </div>
      </div>
      {/* BottomChart */}
      <div className="w-full h-[500px]">
      <FinanceChart />
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
      <EventClanderContainer searchParams={searchParams}/>
      
      <Announcement />
      </div>
          </div>
  )
}

export default AdminPage