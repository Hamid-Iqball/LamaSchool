import Image from "next/image"
import Calendar from "react-calendar"
import EventList from "./EventList"
import EventCalender from "./EventCalender"


async function EventClanderContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { date } =  searchParams
  return (
    <div> 
  <div className="bg-white p-4 rounded-md">  
    <EventCalender/>
    {/* EVENTs */}
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold my-4">Events</h1>
      <Image alt="" src="/moreDark.png" width={12} height={12} />
    </div>
    <div className="flex flex-col gap-4">
        <EventList dateParams={date}/>
    </div>
    </div>
    </div>
  )
}

export default EventClanderContainer