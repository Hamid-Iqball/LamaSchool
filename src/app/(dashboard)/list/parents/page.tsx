import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { Parent, Prisma, Student } from "@prisma/client"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { auth } from "@clerk/nextjs/server"

type parentList = Parent & {students : Student[]}


const renderRow = (item:parentList,  role:string)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
    

    <div className="flex flex-col">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-xs text-gray-500">{item?.email}</p>
    </div>
  </td>
    <td className="hidden md:table-cell">{item.students.map(s=>s.name).join(", ")}</td>

    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="parent" data={item}  />
       
      <FormModal type="delete"  table="parent" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function ParentsList({searchParams}:{
  searchParams:{[key:string] : string | undefined}
}) {



  const {sessionClaims} =  await auth()
  const role =  (sessionClaims?.metadata as {role:string} )?.role


  const {page, ...queryParams} = searchParams
  const p = page? parseInt(page) :1
  const query:Prisma.ParentWhereInput = {}


  if(queryParams){
  for(const [key,value] of Object.entries(queryParams)){
    if(value !==undefined){
      switch (key) {
        case "search":
          query.name ={contains:value,mode:"insensitive"}
          
          break;
      
        default:
          break;
      }
    }
  }
 }


//TO run multiple queries together
const [data,count] = await prisma.$transaction([
 
  prisma.parent.findMany({
    where:query,
    include:{
      students:true
    },
    take:ITEMS_PER_PAGE,
    skip:ITEMS_PER_PAGE*(p-1)
  }),

  prisma.parent.count({where:query})
])


 const columns =[
  {
    header:"Info", accessor:"Info"

  },
  {
    header:"Student Name", 
    accessor:"studentName", 
    className:"hidden md:table-cell"

  },
  {
    header:"Phone", 
    accessor:"phone", 
    className:"hidden md:table-cell"

  },
  
  {
    header:"Address", 
    accessor:"address", 
    className:"hidden lg:table-cell"

  },
  ...(role==="admin"?[
   { header:"Actions",
    accessor:"actions"}
 ]:[])
]

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
       { role === "admin" && <FormModal table="parent" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={(item)=>renderRow(item , role)} data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={count}/>
    </div>
    </div>
  )
}

export default ParentsList