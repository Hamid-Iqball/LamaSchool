"use client"

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from 'react'
const localizer = momentLocalizer(moment)

function BigCalander() {
  const [view , setView] = useState<View>(Views.WORK_WEEK)
  function handleView(selected:View){
    setView(selected)
  }
  return (
    <Calendar
    localizer={localizer}
    events={calendarEvents}
    startAccessor="start"
    endAccessor="end"
    views={["work_week","day"]}
    view={view}
    onView={handleView}
    style={{ height: 500 }}
  />
  )
}

export default BigCalander