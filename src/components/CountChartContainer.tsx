import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";


async function CountChartContainer() {

    const data =  await prisma.student.groupBy({
        by:["sex"],
        _count:true
    })

    const boys = data.find(item=>item.sex==='MALE')?._count || 0
    const girls = data.find(item=>item.sex==="FEMALE")?._count || 0

    const totalCount = boys+girls
    const boysPercentage = Math.round( (boys*totalCount)%100)
    const girlsPercentage = Math.round((girls*totalCount)%100)


  return (
       <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'> Students </h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>  </div>


            <CountChart boys={boys} girls={girls}/>
                <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-lamaSky rounded-full '/>
                    <h1 className='font-bold '>{boys}</h1>
                    <h2 className='text-xs text-gray-500'>Boys({boysPercentage}%)</h2>
                </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-lamaYellow rounded-full '/>
                    <h1 className='font-bold '>{girls}</h1>
                    <h2 className='text-xs text-gray-500'>Boys({girlsPercentage}%)</h2>
                </div>
           
            </div>
            </div>
  )
}

export default CountChartContainer