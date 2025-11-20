import FormModal from "@/components/FormModal"
import Paginations from "@/components/Paginations"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { announcementsData, eventsData, examsData, parentsData, resultsData, studentsData, subjectsData, teachersData } from "@/lib/data"
import prisma from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/settings"
import { auth } from "@clerk/nextjs/server"
import { Announcement, Class, Prisma } from "@prisma/client"
import Image from "next/image"




type AnnouncementList = Announcement & {class:Class}


const renderRow = (item:AnnouncementList, role:string|undefined)=>(
<tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
  
  <td className="flex items-center gap-4 p-4">
   {item.title}
     </td>
    <td >{item.class.name}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.date)}</td> 
    <td>
    <div className="flex items-center gap-2">
    {  role==="admin" && <>
     <FormModal type="update"  table="announcement" data={item}  />
       
      <FormModal type="delete"  table="announcement" id={item.id}  /> </>}
        
    </div>
    </td>
</tr>
)

async function  Announements({searchParams}:{
  searchParams: {[key:string]: string | undefined}
}) {


  const {sessionClaims} = await auth()
  const role =  (sessionClaims?.publiMetadata as {role:string} | undefined)?.role


  const {page ,...queryParams} = searchParams
  const p = page? parseInt(page) : 1
  
  const query: Prisma.AnnouncementWhereInput = {}
  //this logic is for the query
      if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
          if(value !== undefined){
            switch (key) {
               case "search":
             query.title = {contains:value, mode:"insensitive"} 
               break
            
              default:
                break;
            }
        
              }
            }
          }
        
    

        // This is prisma interaction function
    const [data,count] = await prisma.$transaction([
      
      //remmeber prisma doesnot fetch relations automatically we have to mention it in the query
      prisma.announcement.findMany({
        where:query,
        include:{
         class: true
        },
        take:ITEMS_PER_PAGE,
        skip: ITEMS_PER_PAGE*(p-1),
      }),
      
      prisma.announcement.count({where:query})
      
    ])

const columns =[
  {
    header:"Title",
     accessor:"title"

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
 ...(role==="admin"? [{
    header:"Actions",
    accessor:"actions"
  }] : [])
]


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
    <div className="flex items-center justify-between">
    <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch/>
      <div className="flex items-center gap-4 self-end">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/filter.png" alt="" width={14} height={14} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
          <Image src="/sort.png" alt="" width={14} height={14} />
        </button>
       { role === "admin" && <FormModal table="announcement" type="create"/>}
      </div>
    </div>
    </div>
    {/* List */}
    <div>
      <Table
          columns={columns}
          renderRow={(item: AnnouncementList) => renderRow(item, role)}
          data={data}
        />
    </div>
    {/* Pagination */}
    <div className="">
      <Paginations page={p} count={count} />
    </div>
    </div>
  )
}

export default Announements