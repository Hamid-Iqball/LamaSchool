import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { Class, Exam, Lesson, Prisma, Subject, Teacher } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { auth } from "@clerk/nextjs/server"
import FormContainer from "@/components/FormContainer"

type examList = Exam & {lesson:{
  subject:Subject,
  class:Class,
  teacher:Teacher
}}

const renderRow = (item:examList, role:string)=>(


<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  

  <td>
    <h3>{item.title}</h3>
  </td>
  <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.lesson.subject.name}</h3>
     </td>
    <td >{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
  
  <td>
    <div className="flex items-center gap-2">
    
      {  role==="admin" && <>
     <FormContainer type="update"  table="exam" data={item}  />
       
      <FormContainer type="delete"  table="exam" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function  examList({searchParams}:{
  searchParams: {[key:string]: string | undefined}
}) {
  

   const { userId, sessionClaims } = await auth()
   const role = (sessionClaims?.metadata as {role:string})?.role 
   
   
   const {page ,...queryParams} = searchParams
   const p = page? parseInt(page) : 1
   
   const query: Prisma.ExamWhereInput = {}
   
   query.lesson={}
  //this logic is for the query
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
              case "classId":{
               query.lesson.classId = parseInt(value)
              }
              break;
              case "teacherId":
             query.lesson.teacherId= value
              break;

         
           case "search":
            query.lesson.subject= {
              name:{contains:value,  mode:"insensitive"}
            }
            ,
            {lesson:

              {teacher:{name:{
                contains:value, mode:"insensitive"
              }}},
            },
            {lesson:

              {class:{name:{
                contains:value, mode:"insensitive"
              }}},
            }
            
            break;

            
            default:
                break;
              }
            }
          }
        }
    

      // Role Condition
    switch (role) {
      case "admin":
          break;
      case "teacher":
        query.lesson.teacherId = userId!
        break;
      case "student":
        query.lesson.class ={
         students:{
          some:{
            id:userId!
          }
         }
        }
        break;

        case "parent":
          query.lesson.class={
            students:{
              some:{
                parentId:userId!
              }
            }
          }
          break;

        default:
          break;
      }

        // This is prisma interaction function
    const [data,count] = await prisma.$transaction([
      
      //remmeber prisma doesnot fetch relations automatically we have to mention it in the query
      prisma.exam.findMany({
        where:query,
        include:{
          lesson:{
            include:{
              teacher:{select:{name:true, surname:true}},
              class:{select:{name:true}},
              subject:{select:{name:true,}}
              
            }
          }
        },
        take:ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE*(p-1),   
      }),
      
      prisma.exam.count({where:query})
      
    ])
    const columns=[

      {
    header:"Exam Title", 
    accessor:"title"
      },
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
    header:"Date", 
    accessor:"date", 
    className:"hidden md:table-cell"
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
    <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { (role === "admin" || role==="teacher") && <FormContainer table="exam" type="create"/>}
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

export default examList