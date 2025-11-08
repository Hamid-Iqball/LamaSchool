"use client"

import { ITEMS_PER_PAGE } from "@/lib/settings"
import { useRouter } from "next/navigation"

function Paginations({page,count}:{page:number, count:number}) {
  const router = useRouter()
  const currentPage = Number(page) || 1

  const hasPrevious = currentPage > 1;
  const hasNext = ITEMS_PER_PAGE * currentPage < count

  const changePage = (newPage:number)=>{
    const params  = new URLSearchParams(window.location.search)
    params.set("page",newPage.toString() )
    router.push(`${window.location.pathname}?${params}`)
  }
  return (
    <div className="p-4 flex justify-between items-center text-gray-500">
        <button  onClick={()=>changePage(currentPage-1)}  className="py-2 px-4  rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed " disabled={!hasPrevious}>Prev</button>
        <div className="flex items-center text-sm">
          {
            Array.from( //Items, mapFn
              {
                length:Math.ceil(count/ITEMS_PER_PAGE)
              },
              (_,index)=>{
                const pageIndex =index+1;
                return (

                  <button 
                  onClick={()=>changePage(pageIndex)}
                  className={`px-2 rounded-sm mx-1 ${currentPage===pageIndex ?"bg-lamaSky" : ""}`} key={pageIndex}>{pageIndex}</button>
                )
              }
            )
          }
         
           
        </div>
        <button  className="py-2 px-4  rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>changePage(currentPage+1)} disabled={!hasNext}>Next</button>

    </div>
  )
}

export default Paginations