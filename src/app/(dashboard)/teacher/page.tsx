

import Announcement from "@/components/Announcement"
import BigCalander from "@/components/BigCalander"
import BigCalenderContainer from "@/components/BigCalenderContainer"
import { auth } from "@clerk/nextjs/server"



async function TeacherPage({}) {

  const {userId} = await auth()
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row flex-1">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
      <div className="h-full bg-white p-4 rounded-md  ">
        <h1 className="text-xl font-semibold ">Schedule</h1>
        <BigCalenderContainer type="teacherId" id={userId!}/>
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8 ">

      
      <Announcement />
      </div>
    </div>
  )
}

export default TeacherPage