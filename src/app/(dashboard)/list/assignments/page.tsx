import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"

import Image from "next/image"
import Link from "next/link"

type Assignment ={
  id:number;
  subject:string;
  teacher:string;
  class:string;
  dueDate:string


}
const columns =[
  {
    header:"Subject Name",
     accessor:"name"

  },
  {
    header:"Class", 
    accessor:"class", 
    // className:"hidden md:table-cell"

  },
  {
    header:"Teacher", 
    accessor:"teacher", 
    className:"hidden md:table-cell"

  },
  {
    header:"Due Date", 
    accessor:"dueDate", 
    className:"hidden md:table-cell"

  },

  {
    header:"Actions",
    accessor:"actions"
  }
]

const renderRow = (item:Assignment)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  
  <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.subject}</h3>
     </td>
    <td >{item.class}</td>
    <td className="hidden md:table-cell">{item.teacher}</td>
    <td className="hidden md:table-cell">{item.dueDate}</td>
   


 
  <td>
    <div className="flex items-center gap-2">
      <Link href={`list/teachers/${item.id}`}>
      <button className="w-7 h-7 flex justify-center items-center gap-2 bg-lamaSky rounded-full ">
        <Image src="/edit.png" alt="" width={16} height={16}/>
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

function  SubjectsList() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
      <Table columns={columns} renderRow={renderRow} data={assignmentsData}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations />
    </div>
    </div>
  )
}

export default SubjectsList