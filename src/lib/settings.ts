export const ITEMS_PER_PAGE =10

type RouteAccessMap ={
    [key:string]  :string[]
}



export const RouteAccessMap:RouteAccessMap ={
    "/admin(.*)":["admin"],
    "/student(.*)":["student"],
    "(teacher.*)":["teacher"],
    "/parent(.*)":["parent"],
    "/list/teachers":["admin", "teacher"],
    "/list/students":["admin", "teacher"],
    "/list/parents":["admin", "teacher"],
    "/list/subjects":["admin"],
    "/list/classes":["admin"],
    "/list/exams":["admin", "teacher", "parent" , "student"],
    "/list/assignments":["admin", "teacher", "parent" , "student"],
    "/list/results":["admin", "teacher", "parent" , "student"],
    "/list/attendance":["admin", "teacher", "parent" , "student"],
    "/list/events":["admin", "teacher", "parent" , "student"],
    "/list/announcements":["admin", "teacher", "parent" , "student"],
    
}