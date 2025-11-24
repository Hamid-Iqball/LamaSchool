import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import { auth } from "@clerk/nextjs/server"

type lessonList = Lesson & {teacher:Teacher} &{subject:Subject} & {class:Class}


const renderRow = (item:lessonList, role:string)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.subject.name}</h3>
  </td>
      <td > {item.class.name}</td>
    <td className="hidden md:table-cell">{item.teacher.name}</td>

   
  
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="lesson" data={item}  />
       
      <FormModal type="delete"  table="lesson" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function ClassList({searchParams}:{
  searchParams: {[key:string]: string | undefined}
}) {

  const {sessionClaims} =  await auth()
  const role =  (sessionClaims?.metadata as {role:string} )?.role


  const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1
  
  const query: Prisma.LessonWhereInput = {}
  //this logic is for the query
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
              case "teacherId":
               query.teacherId =value
              break;

              case "classId":
                query.classId =  parseInt(value) 
              break;
          

           case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            
            ]
            break;

            
            default:
                break;
              }
            }
          }
        }
    
          // const lesson ={}
    // This is prisma interaction function
    const [data,count] = await prisma.$transaction([
      
      //remmeber prisma doesnot fetch relations automatically we have to mention it in the query
      prisma.lesson.findMany({
        where:query,
        include:{
        teacher:{select:{name:true, surname:true}},
        class:{select:{name:true}},
        subject:{select:{name:true,}}
        },
        take:ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE*(p-1),
        
        
      }),
      
      prisma.lesson.count({where:query})
      
    ])


 const columns =[
  {
    header:"Subject Name", accessor:"name"

  },
  {
    header:"Class Name", 
    accessor:"class", 
  
 

  },
  {
    header:"Teacher", 
    accessor:"teaacher", 
    className:"hidden md:table-cell"

  },
  
 ...(role==="admin"?[ 
  {
    header:"Actions",
    accessor:"actions"
  }]:[])
]


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && <FormModal table="lesson" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table columns={columns} renderRow={(item)=>renderRow(item,role)} data={data}/>
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={count} />
    </div>
    </div>
  )
}

export default ClassList