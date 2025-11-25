"use client"


import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



function AttendenceChart({data}:{data:{name:string , present:number, absent:number}[]}) {
  return (
   
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
    
  )
}

export default AttendenceChart