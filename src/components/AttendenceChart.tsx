"use client"

import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: 'Mon',
      present: 60,
      absent: 40,
      
    },
    {
      name: 'Tue',
      present: 70,
      absent: 60,
      
    },
    {
      name: 'Wed',
      present: 27,
      absent: 75,
      
    },
    {
      name: 'Thu',
      present: 80,
      absent: 65,
      
    },
    {
      name: 'Fri',
      present: 55,
      absent: 65,
      
    },
    
  ];
function AttendenceChart() {
  return (
    <div className="w-full bg-white rounded-lg p-4 h-full">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Attendece</h1>
            <Image src="/moreDark.png" width={20} height={20} alt=""/>
        </div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis  axisLine={false} tickLine={false}/>
          <Tooltip contentStyle={{borderRadius:'10px', borderColor:'lightgray'}} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{padding:"20px",paddingBottom:"40px"}}/>

          <Bar dataKey="present" fill="#FAE27C"  legendType="circle" radius={[10,10,0,0]}/>

          <Bar dataKey="absent" fill="#C3EBFA"  legendType="circle" radius={[10,10,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendenceChart