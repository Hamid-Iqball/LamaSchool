
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




export const examColumns =[
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

  {
    header:"Actions",
    accessor:"actions"
  }
]


export const assignmentColumns =[
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
    header:"Due Date", 
    accessor:"dueDate", 
    className:"hidden md:table-cell"

  },

  {
    header:"Actions",
    accessor:"actions"
  }
]



