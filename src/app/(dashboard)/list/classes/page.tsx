import FormContainer from "@/components/FormContainer"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Class, Prisma, Teacher } from "@prisma/client"

import Image from "next/image"

type Classes = Class & {supervisor:Teacher | null} //types of model and the value from another models as well



const renderRow = (item:Classes, role:string)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
    
      <h3 className="font-semibold">{item.name}</h3>
  
  </td>
      <td className="hidden md:table-cell"> {item.capacity}</td>
    <td className="hidden md:table-cell">{item.gradeId}</td>

    <td className="hidden md:table-cell">{item.supervisor?.name}</td>
  
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormContainer type="update"  table="class" data={item}  />
       
      <FormContainer type="delete"  table="class" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function ClassList({searchParams}:{
  searchParams:{[key:string] : string | undefined}
}) {
 const user = await currentUser()
const role = user?.publicMetadata.role as string

  const {page,...queryParams} = searchParams
  const p = page? parseInt(page) : 1
  const query:Prisma.ClassWhereInput ={}


  if(searchParams){
    for(const [key,value] of Object.entries(queryParams)){
      if(value !== undefined){

        switch (key) {
          case "supervisorId":
            query.supervisorId = value
            break

          case "search":
            query.name={contains:value, mode:"insensitive"}
            
            break;
        
          default:
            break;
        }
      }
    }
  }





   const [data,count] = await prisma.$transaction([

    prisma.class.findMany({
      where:query,
      include:{
       supervisor:true
      },
      take:ITEMS_PER_PAGE,
      skip:ITEMS_PER_PAGE*(p-1)
    }
    ),
    prisma.class.count({where:query})
   ])


  const columns =[
  {
    header:"Class Name", accessor:"name"

  },
  {
    header:"Capacity", 
    accessor:"capacity", 
    className:"hidden md:table-cell"
 

  },
  {
    header:"Grade", 
    accessor:"grade", 
    className:"hidden md:table-cell"

  },
  
  {
    header:"Supervisor", 
    accessor:"superbisor", 
    className:"hidden md:table-cell"
  },
  ...(role==="admin"?[{
    header:"Actions",
    accessor:"actions"
  }]:[])
]

//ROLE CONDITION



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && <FormContainer table="class" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={
        (item)=> renderRow(item,role)
      } data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={count}/>
    </div>
    </div>
  )
}

export default ClassList