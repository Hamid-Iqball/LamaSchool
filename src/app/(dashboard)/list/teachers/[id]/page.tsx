import Announcement from "@/components/Announcement"
import BigCalander from "@/components/BigCalander"
import FormContainer from "@/components/FormContainer"
import FormModal from "@/components/FormModal"
import Performance from "@/components/Performance"
import { role } from "@/lib/data"
import prisma from "@/lib/prisma"
import { Teacher } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { checkRole } from "../../../../../../utils/roles"
import BigCalenderContainer from "@/components/BigCalenderContainer"


async function SignleTeacherPage({params}: {params: {id: string}}) {
    
    const isAdmin = await checkRole("admin");   
            if(!isAdmin){
                console.log("not admin")
            }else{
                console.log("User is admin")
            }


        const teacher:((Teacher & {_count:{subjects:number, lessons:number, classes:number}})|null) = await prisma.teacher.findUnique({  
        
        where: {
                id: params.id,
            },    
            include: {
                _count:{
                    select: {   
                        subjects: true,
                        classes: true,
                        lessons: true,  
                }}        
        }})          


    if(!teacher) {
        return notFound()
    }    




  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className=" flex flex-col lg:flex-row gap-4 ">
            {/* User Info Card */}
            <div className=" bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                <Image alt="" src={teacher.img || "/avatar.png"} width={144} height={144} className="w-36  rounded-full object-cover"/> </div>
                <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                   { isAdmin && <FormContainer table="teacher" type="update" data={teacher}/>}
                </div>


                <h1 className="text-xl font-semibold">{teacher.name + " " +teacher.surname}</h1>


                <p className="text-sm text-gray-500">{teacher.address} </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/blood.png' alt="" width={14} height={14}/>
                        <span>{teacher.bloodType}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/date.png' alt="" width={14} height={14}/>
                        <span>{new Intl.DateTimeFormat("en-GB").format(teacher.birthday)}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                        <Image src='/mail.png' alt="" width={14} height={14}/>
                        <span>{teacher.email}</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/phone.png' alt="" width={14} height={14}/>
                        <span>{teacher.phone || "-"}</span>
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
                        <h1 className="text-xl font-semibold">90%</h1>
                        <span className="text-sm text-gray-400">Attendence</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  " >
                    <Image alt="" src="/singleBranch.png" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{teacher._count.subjects}</h1>
                        <span className="text-sm text-gray-400">Subjects</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{teacher._count.lessons}</h1>
                        <span className="text-sm text-gray-400">Lessons</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">{teacher._count.classes}</h1>
                        <span className="text-sm text-gray-400">Classes</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md h-[800px]">
            <h1>Teacher&apos;s Schedule</h1>
            <BigCalenderContainer type="teacherId" id={teacher.id}/>
        </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                <Link href={`/list/classes?supervisorId=${"teacher12"}`} className="p-3 rounded-md bg-lamaSky">Teacher&apos;s Classes</Link>
                <Link href={`/list/students?teacherId=${"teacher2"}`} className="p-3 rounded-md bg-lamaPurpleLight" >Teacher&apos;s Students</Link>
                <Link href={`/list/lessons?teacherId=${"teacher2"}`} className="p-3 rounded-md bg-lamaYellowLight">Teacher&apos;s Lessons</Link>
                <Link href={`/list/exams?teacherId=${"teacher3"}`} className="p-3 rounded-md bg-pink-50">Teacher&apos;s Exam</Link>
                <Link href={`/list/assignments?teacherId=${"teacher3"}`} className="p-3 rounded-md bg-lamaSkyLight">Teacher&apos;s Assignments</Link>
            </div>
        </div>
        <Performance/>
       <Announcement/>
        </div>
    </div>
  )
}

export default SignleTeacherPage