"use client"
import { count } from 'console';
import Image from 'next/image';
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count:156,
    fill: '#fff',
  },
  {
    name: 'Boys',
    count:53,
    fill: '#FAE27C',
  },
  {
    name: 'Girls',
    count:53,
    fill: '#c3ebfa',
  },
 
];




function CountChart() {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>
                Students
                </h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
                </div>
        {/* CHART */}
        <div className='relative w-full h-[75%]'>
        <ResponsiveContainer >
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            
           
            background
      
            dataKey="count"
          />
          {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle"  /> */}
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src="/maleFemale.png"  width={50} height={50} alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '/>
        </div>
        {/* BUTTONS */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-lamaSky rounded-full '/>
                    <h1 className='font-bold '>1,234</h1>
                    <h2 className='text-xs text-gray-500'>Boys(55%)</h2>
                </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-lamaYellow rounded-full '/>
                    <h1 className='font-bold '>1,234</h1>
                    <h2 className='text-xs text-gray-500'>Boys(45%)</h2>
                </div>
           
            </div>
        </div>

  )
}

export default CountChart
