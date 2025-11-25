import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { Class, Prisma, Subject, Teacher } from "@prisma/client"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"


type TeachersList = Teacher & {subjects:Subject[]} & {classes:Class[]}


const renderRow = (item:TeachersList, role:string)=>(
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
    <td className="hidden md:table-cell">{item?.subjects?.map(subject=>subject.name).join(",")}</td>
    <td className="hidden md:table-cell">{item?.classes?.map(c=>c.name).join(", ")}</td>
   

    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
    <Link href={`/list/teachers/${item.id}`}>
       <Image src="/view.png" alt=""  width={30} height={30} className="p-1 rounded-xl hover:cursor-pointer"  />
    </Link>
       
      <FormModal type="delete"  table="teacher" id={item.id}  />
      
       </>}
        
    </div>
  </td>
</tr>
)

async function TeachersList({searchParams}:{
  searchParams:{[key:string]: | string |undefined} // index signature
}) {


  const {userId, sessionClaims} = await auth()
  const role =  (sessionClaims?.metadata as {role:string}).role

  
  const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1

  const query: Prisma.TeacherWhereInput = {}
  
 if(queryParams){
  for(const [key,value] of Object.entries(queryParams)){
    if(value !== undefined){
      switch (key) {
        case "classId":
          {query.lessons={
            some:
            {classId:
              parseInt(value)
            }}}        
          break;


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

   prisma.teacher.findMany({
        where:query,
          include:{
            subjects:true,
            classes:true
          },
          take:ITEMS_PER_PAGE,
          skip: ITEMS_PER_PAGE*(p-1),

          
        }),

     prisma.teacher.count({where:query})
        
      ])


       const columns =[
  {
    header:"Info", accessor:"Info"

  },
  {
    header:"Teacher ID", 
    accessor:"teacherid", 
    className:"hidden md:table-cell"

  },
  {
    header:"Subjects", 
    accessor:"subjects", 
    className:"hidden md:table-cell"

  },
  {
    header:"classes", 
    accessor:"classes", 
    className:"hidden md:table-cell"

  },
  {
    header:"Phone", 
    accessor:"phone", 
    className:"hidden lg:table-cell"

  },
  {
    header:"Address", 
    accessor:"address", 
    className:"hidden lg:table-cell"

  },
  ...(role==="admin"?[{
    header:"Actions",
    accessor:"actions"
  }]:[])
]

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       {role ==="admin" && 
      //  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
      //     <Image src="/plus.png" alt="" width={14} height={14} />
      //   </button>
        <FormModal table="teacher" type="create" id={1}/>
        }
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={(item)=>renderRow(item,role)} data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations count={count} page={p} />
    </div>
    </div>
  )
}

export default TeachersList