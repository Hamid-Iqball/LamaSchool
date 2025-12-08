import Announcement from "@/components/Announcement"
import BigCalenderContainer from "@/components/BigCalenderContainer"
import Performance from "@/components/Performance"
import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { checkRole } from "../../../../../../utils/roles"
import { Class, Lesson, Student } from "@prisma/client"
import { Suspense } from "react"
import StudentsAttendanceCard from "@/components/StudentsAttendanceCard"
import FormContainer from "@/components/FormContainer"


async function SignleStudentPage({params}: {params: {id: string}}) {

    const isAdmin = await checkRole("admin");
    if(!isAdmin){
        console.log("not admin")
    }else{
        console.log("User is admin")
    }

    const singleStudent:(Student &{ class:Class & {_count:{lessons:number}}}) | null = await prisma.student.findUnique({
        where:{
            id:params.id
        },
        include:{
           class:{
            include:{
               _count:{
             select:{
                lessons:true,
            
             }
           
               }
             
            }
           }
        }
    })


  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className=" flex flex-col lg:flex-row gap-4 ">
            {/* User Info Card */}
            <div className=" bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                <Image alt="" src={singleStudent?.img || "/avatar.png"} height={80} width={100} className="w-36  rounded-full object-cover"/> </div>

                <div className="w-2/3 flex flex-col justify-between gap-4 ">
                <span className="flex justify-start gap-4 items-center">

                <h1 className="text-3xl font-semibold">{singleStudent?.name}</h1>
                {isAdmin && (
                    <FormContainer table="student" type="update" data={singleStudent} />
                )}
                </span>
                <p className="text-sm text-black text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <div className="grid  grid-cols-1 md:grid-cols-2 text-xs gap-2 ">
                    <div className=" flex items-center gap-2 ">
                        <Image src='/blood.png' alt="" width={14} height={14}/>
                        <span>{singleStudent?.bloodType}</span>
                    </div>
                    <div className=" flex items-center gap-2 ">
                        <Image src='/date.png' alt="" width={14} height={14}/>
                        <span>{new Intl.DateTimeFormat("en-GB").format(singleStudent?.birthday)}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                        <Image src='/mail.png' alt="" width={14} height={14}/>
                        <span>{singleStudent?.email || "-"}</span>
                    </div>
                    <div className=" flex items-center gap-2 ">
                        <Image src='/phone.png' alt="" width={14} height={14}/>
                        <span>{singleStudent?.phone || "-"}</span>
                    </div>
                </div>
                </div>
            </div>
            {/* Small cards */}
            <div className="flex-1 flex gap-2 justify-between flex-wrap">
                {/* CARD */}
                <div className="bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  " >
                    <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                      <Suspense fallback="loading...">
                        <StudentsAttendanceCard id={singleStudent?.id}/>
                      </Suspense>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  " >
                    <Image alt="" src="/singleBranch.png" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{singleStudent?.class.gradeId}th</h1>
                        <span className="text-sm text-gray-400">Grade</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{singleStudent?.class._count.lessons}</h1>
                        <span className="text-sm text-gray-400">Lessons</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{singleStudent?.class.gradeId}A</h1>
                        <span className="text-sm text-gray-400">Class</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md h-[800px]">
            <h1>Students&apos;s Schedule</h1>
            <BigCalenderContainer type="classId" id={Number(singleStudent?.class.id)}  />
        </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shorcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                <Link href={`/list/results?studentId=${"student2"}`} className="p-3 rounded-md bg-lamaSky">Students&apos;s Results</Link>
                <Link href={`/list/lessons?classId=${2}`} className="p-3 rounded-md bg-lamaPurpleLight">Students&apos;s Lessons</Link>
                <Link href={`/list/lessons?classId=${2}`} className="p-3 rounded-md bg-lamaYellowLight">Students&apos;s Teachers</Link>
                <Link href={`/list/lessons?classId=${2}`} className="p-3 rounded-md bg-pink-50">Students&apos;s Exams</Link>
                <Link href={`/list/assignments?classId=${2}`} className="p-3 rounded-md bg-lamaSkyLight">Students&apos;s Assignments</Link>
            </div>
        </div>
        <Performance/>
       <Announcement/>
        </div>
    </div>
  )
}

export default SignleStudentPage