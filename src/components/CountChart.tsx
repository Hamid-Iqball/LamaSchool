"use client"
import { count } from 'console';
import Image from 'next/image';
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';





function CountChart({boys,girls}:{boys:number, girls:number}) {
    const data = [
      {
        name: 'Total',
        count:boys+girls,
        fill: '#fff',
      },
      {
        name: 'Boys',
        count:boys,
        fill: '#FAE27C',
      },
      {
        name: 'Girls',
        count:girls,
        fill: '#c3ebfa',
      },
     
    ];
  return (
 
        <div className='relative w-full h-[75%]'>
        <ResponsiveContainer >
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar background dataKey="count"/>
       
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src="/maleFemale.png"  width={50} height={50} alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '/>
        </div>


  )
}

export default CountChart
