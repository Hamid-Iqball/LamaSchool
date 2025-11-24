import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { Class, Prisma, Result, Subject, Teacher } from "@prisma/client"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { auth } from "@clerk/nextjs/server"

type resultList = {
        id:number,
        title:string;
        studentName:string;
        studentSurname:string;
        teacherName:string;
        teacherSurname:string;
        score:number;
        className:string;
        startTime: Date;
}


const renderRow = (item:resultList, role:string)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  
  <td className="flex items-center gap-4 p-4">
{item.title}
     </td>
    <td >{item.studentName}</td>
    <td className="hidden md:table-cell">   {item.teacherName}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td  className="hidden md:table-cell">   {item.className}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
   

  <td>
    <div className="flex items-center gap-2">
    {  (role==="admin" || role==="teacher") && <>
     <FormModal type="update"  table="result" data={item}  />
      <FormModal type="delete"  table="result" id={item.id}  /> </>}
        
    </div>
  </td>
</tr>
)

async function SubjectsList({searchParams}:{
  searchParams: {[key:string]: string | undefined}
}) {

  const {userId,sessionClaims} = await auth()
  const role =  (sessionClaims?.metadata as {role:string})?.role

  console.log("role", role)

  const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1
  
  const query: Prisma.ResultWhereInput = {}
  //this logic is for the query
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
         switch (key) {
          case "studentId":
          query.studentId = value
              break;

          case "search":
            query.OR = [
             {exam:
              {title:{
                contains:value, mode:"insensitive"
              }},
            }
            ,
            {assignment:
              {title:{
                contains:value, mode:"insensitive"
              }},
            },
            {student:
              {name:{
                contains:value, mode:"insensitive"
              }},
            },
          {
            exam:{
              lesson:{
                teacher:{name:{
                  contains:value, mode:"insensitive"
                }}
              }
            }
          }
            ]
            break;

            
            default:
                break;
              }
            }
          }
        }


        switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR= [
          {exam:{lesson:{teacherId:userId!}}},
          {assignment:{ lesson:{teacherId:userId!}}}
        ]
        break;

        case "student":
          query.studentId = userId!
          break;


        case "parent":
          query.student ={ parentId:userId!}
          break;

      default:
        break;
    }

    // This is prisma interaction function
    const [dataResponse,count] = await prisma.$transaction([
      
      //Prisma doesnot fetch relations automatically we have to mention it in the query
      prisma.result.findMany({
        where:query,
        include:{
        student:{select:{name:true, surname:true}},
        exam:{
            include:{
              lesson:{
                select:{
                  teacher:{select:{name:true, surname:true}},
                  class:{select:{name:true}},
                }
              }
            }
          },

        assignment:{
          include:{
            lesson:{
              select:{
                teacher:{select:{name:true, surname:true}},
                class:{select:{name:true}},
              }
            }
          }
          }
        },
        take:ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE*(p-1),
        
        
      }),
      
      prisma.result.count({where:query})
      
    ])



    //role based condition

    

    const data =  dataResponse.map(item=>{
      const assisment = item.exam || item.assignment
      if(!assisment) return null

      const isExam = "startTime" in assisment
      
      return{
        id:item.id,
        title:assisment.title,
        studentName:item.student.name,
        studentSurname:item.student.surname,
        teacherName:assisment.lesson.teacher.name,
        teacherSurname:assisment.lesson.teacher.surname,
        score:item.score,
        className:assisment.lesson.class.name,
        startTime: isExam?assisment.startTime:assisment.startDate,
      }
    }
    )


 const columns =[
  {
    header:"Title",
     accessor:"title"

  },
  {
    header:"Student", 
    accessor:"student", 
    // className:"hidden md:table-cell"

  },
  {
      header:"Teacher", 
      accessor:"teacher", 
      className:"hidden md:table-cell"
      
    },
    {
        header:"Score", 
        accessor:"score", 
        className:"hidden md:table-cell"
        
    },
    {
      header:"Class",
      accessor:"class",
      className:"hidden md:table-cell"
  
    },
  {
    header:"Date", 
    accessor:"date", 
    className:"hidden md:table-cell"

  },

 ...((role==="admin" ||role==="teacher")? [{
    header:"Actions",
    accessor:"actions"
  }]:[])
]
    





  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && <FormModal table="result" type="create"/>}
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

export default SubjectsList