export const teacherColumns =[
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
  {
    header:"Actions",
    accessor:"actions"
  }
]


export const studnetColumns =[
  {
    header:"Info", accessor:"Info"

  },
  {
    header:"Student ID", 
    accessor:"studentId", 
    className:"hidden md:table-cell"

  },
  {
    header:"Grade", 
    accessor:"grade", 
    className:"hidden md:table-cell"

  },
  
  {
    header:"Address", 
    accessor:"address", 
    className:"hidden lg:table-cell"

  },
  {
    header:"Actions",
    accessor:"actions"
  }
]


export const parentsColumns =[
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
  {
    header:"Actions",
    accessor:"actions"
  }
]



export const subjectColumns =[
  {
    header:"Subject Name", accessor:"name"

  },
  {
    header:"Teachers", 
    accessor:"teachers", 
    className:"hidden md:table-cell"

  },

  {
    header:"Actions",
    accessor:"actions"
  }
]

export const classesList =[
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
  {
    header:"Actions",
    accessor:"actions"
  }
]


export const lessonColumns =[
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
  
  
  {
    header:"Actions",
    accessor:"actions"
  }
]