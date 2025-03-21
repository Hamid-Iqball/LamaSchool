import Announcement from "@/components/Announcement"
import BigCalander from "@/components/BigCalander"
import FormModal from "@/components/FormModal"
import Performance from "@/components/Performance"
import Image from "next/image"
import Link from "next/link"


function SignleStudentPage() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className=" flex flex-col lg:flex-row gap-4 ">
            {/* User Info Card */}
            <div className=" bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
                <div className="w-1/3">
                <Image alt="" src="" width={144} height={144} className="w-36 h-36 rounded-full object-cover"/> </div>

                <div className="flex items-center gap-4">
                     <FormModal table="student" type="create" data={{
                        id: 1,
                        username: "jrodriguez",
                        email: "jrodriguez@school.edu",
                        password: "securepassword123",
                        firstName: "Julia",
                        lastName: "Rodriguez",
                        img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
                        phone: "5551234567",
                        address: "289 Cedar Avenue, Oakwood Heights, NY 10301",
                        bloodtype: "O+",
                        birthday: "1985-06-12",
                        sex: "female"
                    }}/>
                </div>
                <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold">Hamid Iqbal</h1>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/blood.png' alt="" width={14} height={14}/>
                        <span>A+</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/date.png' alt="" width={14} height={14}/>
                        <span> Jnuary 2025</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                        <Image src='/mail.png' alt="" width={14} height={14}/>
                        <span>user@gmail.com</span>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2 ">
                        <Image src='/phone.png' alt="" width={14} height={14}/>
                        <span>+1 234 567</span>
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
                        <h1 className="text-xl font-semibold">6th</h1>
                        <span className="text-sm text-gray-400">Grade</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">18</h1>
                        <span className="text-sm text-gray-400">Lessons</span>
                    </div>
                </div>
                {/* CARD */}
                <div className=" bg-white p-4 rounded-md w-full flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]  ">
                    <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6"  />
                    <div className="">
                        <h1 className="text-xl font-semibold">6A</h1>
                        <span className="text-sm text-gray-400">Class</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Bottom */}
        <div className="mt-4 bg-white rounded-md h-[800px]">
            <h1>Students&apos;s Schedule</h1>
            <BigCalander />
        </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shorcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
                <Link href="/" className="p-3 rounded-md bg-lamaSky">Students&apos;s Results</Link>
                <Link href="/" className="p-3 rounded-md bg-lamaPurpleLight">Students&apos;s Lessons</Link>
                <Link href="/" className="p-3 rounded-md bg-lamaYellowLight">Students&apos;s Teachers</Link>
                <Link href="/" className="p-3 rounded-md bg-pink-50">Students&apos;s Exams</Link>
                <Link href="/" className="p-3 rounded-md bg-lamaSkyLight">Students&apos;s Assignments</Link>
            </div>
        </div>
        <Performance/>
       <Announcement/>
        </div>
    </div>
  )
}

export default SignleStudentPage