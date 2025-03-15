import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, studentsData, teachersData } from "@/lib/data"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

type Student ={
  id:number;
  studentId:string;
  name:string;
  email?:string;
  photo:string;
  grade:number;
  address:string;


}
const columns =[
  {
    header:"Info", accessor:"Info"

  },
  {
    header:"Student ID", 
    accessor:"studentId", 
    className:"hidden md:table-cell"

  },
  {
    header:"Grade", 
    accessor:"grade", 
    className:"hidden md:table-cell"

  },
  
  {
    header:"Address", 
    accessor:"address", 
    className:"hidden lg:table-cell"

  },
  {
    header:"Actions",
    accessor:"actions"
  }
]

const renderRow = (item:Student)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
    <Image src={item.photo} alt="" width={40} height={40} 
    className="md:hidden w-10 h-10 xl:block rounded-full object-cover"/>
    <div className="flex flex-col">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-xs text-gray-500">{item?.email}</p>
    </div>
  </td>
    <td className="hidden md:table-cell">{item.studentId}</td>
    <td className="hidden md:table-cell">{item.grade}</td>
    <td className="hidden md:table-cell">{item.address}</td>
  <td>
    <div className="flex items-center gap-2">
      <Link href={`list/teachers/${item.id}`}>
      <button className="w-7 h-7 flex justify-center items-center gap-2 bg-lamaSky rounded-full ">
        <Image src="/view.png" alt="" width={16} height={16}/>
        </button>
        </Link>
        <Link href="">
      { role==="admin" && <button className="w-7 h-7 flex justify-center items-center gap-2 bg-lamaPurple rounded-full ">
        <Image src="/delete.png" alt="" width={16} height={16}/>
        </button>}
        </Link>
        
    </div>
  </td>
</tr>
)

function StudentsList() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/plus.png" alt="" width={14} height={14} />
        </button> )}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={renderRow} data={studentsData}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations />
    </div>
    </div>
  )
}

export default StudentsList