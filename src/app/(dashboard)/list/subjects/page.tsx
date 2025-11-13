import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { subjectColumns as columns } from "@/lib/contants"
import { parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { Prisma, Subject, Teacher } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

type Subjects = Subject  & {teachers:Teacher[]}


const renderRow = (item:Subjects)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.name}</h3>    
  </td>
    <td className="hidden md:table-cell">{item.teachers.map(s=>s.name).join(", ")}</td>

  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="subject" data={item}  />
       
      <FormModal type="delete"  table="subject" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function SubjectsList({searchParams}:{
  searchParams:{[key:string]:string | undefined}
}) {
  const {page, ...queryParams} = searchParams
  const p = page ? parseInt(page) : 1

  const query:Prisma.SubjectWhereInput={}

  if(queryParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value!== undefined){
        switch (key) {
          case "search":
            query.name = {contains:value, mode:"insensitive"}
            break;
        
          default:
            break;
        }
      }
    }
  }


  const [data, count] = await prisma.$transaction([

    prisma.subject.findMany({
      where:query,
      include:{
        teachers:true,
      },
      take:ITEMS_PER_PAGE,
      skip:ITEMS_PER_PAGE*(p-1)
    }),


    prisma.subject.count({where:query}) 


  ])
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && <FormModal table="subject" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={renderRow} data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={count} />
    </div>
    </div>
  )
}

export default SubjectsList