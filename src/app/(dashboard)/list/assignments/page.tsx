import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { assignmentsData, examsData, parentsData, role, studentsData, subjectsData, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client"
import { assignmentColumns as columns } from "@/lib/contants"
import Image from "next/image"
import Link from "next/link"

type assignmentList = Assignment & {lesson:{
  subject:Subject,
  class:Class,
  teacher:Teacher
}}


const renderRow = (item:assignmentList)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  
  <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.lesson.subject.name} </h3>
     </td>
    <td >{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format( item.dueDate)}</td>
   


 
  <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="assignment" data={item}  />
       
      <FormModal type="delete"  table="assignment" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function  assigment({searchParams}:{
  searchParams: {[key:string]: string | undefined}
}) {



  const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1
  
  const query: Prisma.AssignmentWhereInput = {}
  //this logic is for the query
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
              case "teacherId":
               query.lesson ={
                teacherId:value
               }
              break;

              case "studentId":{
               query.lesson = {classId:parseInt(value)}
              }

         
           case "search":
            query.OR = [
             {lesson:
              {subject:{name:{
                contains:value, mode:"insensitive"
              }}},
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
            ]
            break;

            
            default:
                break;
              }
            }
          }
        }
    

        // This is prisma interaction function
    const [data,count] = await prisma.$transaction([
      
      //remmeber prisma doesnot fetch relations automatically we have to mention it in the query
      prisma.assignment.findMany({
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
      
      prisma.assignment.count({where:query})
      
    ])

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
       { role === "admin" && <FormModal table="assignment" type="create"/>}
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

export default assigment