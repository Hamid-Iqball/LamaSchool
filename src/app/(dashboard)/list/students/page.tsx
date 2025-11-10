import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { studnetColumns as columns} from "@/lib/contants"
import { role, studentsData, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { Class, Prisma, Student } from "@prisma/client"
import { headers } from "next/headers"

import Image from "next/image"
import Link from "next/link"

type studendList = Student & {class:Class}

const renderRow = (item:studendList)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
    <Image src={item.img || "/avatar.png"} alt="" width={40} height={40} 
    className="md:hidden w-10 h-10 xl:block rounded-full object-cover"/>
    <div className="flex flex-col">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-xs text-gray-500">{item?.email}</p>
    </div>
  </td>
    <td className="hidden md:table-cell">{item.username}</td>
    <td className="hidden md:table-cell">{item.class.name[0]}</td>
    <td className="hidden md:table-cell">{item.address}</td>
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="student" data={item}  />
       
      <FormModal type="delete"  table="student" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function StudentsList({searchParams}:{
  searchParams:{[key:string]: | string |undefined} // index signature { page: "2",search: "ali"} the searchparams is an object

}) {


 const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1

  const query: Prisma.StudentWhereInput = {}
  
if(queryParams){
  for(const [key,value] of Object.entries(queryParams)){
    if(value !== undefined){
      switch (key) {
           case "teacherId":
            query.class={
              lessons:{
                some:{
                  teacherId :value
                }
              }
            }

          case "search":
            query.name = {contains:value, mode:"insensitive"}
            break;
          
          default:
            break;
          }
        }
  }
}

 const [data,count] = await prisma.$transaction([

  prisma.student.findMany({
     where:query,
      include:{
    
        class:true
      },
      take:ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE*(p-1),

      
    }),

     prisma.student.count({where:query})
    
  ])

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
       { role === "admin" && <FormModal table="student" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={renderRow} data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={
    count
      }/>
    </div>
    </div>
  )
}

export default StudentsList