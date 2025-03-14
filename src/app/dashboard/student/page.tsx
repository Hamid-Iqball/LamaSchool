import Announcement from "@/components/Announcement"
import BigCalander from "@/components/BigCalander"
import EventCalender from "@/components/EventCalender"


function StudentPage() {
  return (
    <div className="p-4 flex gap-4 fex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-md  ">
        <h1 className="text-xl font-semibold ">Schedule(4A)</h1>
        <BigCalander />
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
      <EventCalender/>
      
      <Announcement />
      </div>
    </div>
  )
}

export default StudentPage