


export const currentWorkWeek =()=>{
    const today = new Date()
    const daysOfWeek = today.getDay()

    const startOfWeek =  new Date(daysOfWeek)

    if(daysOfWeek===0){
        startOfWeek.setDate(today.getDay()+1)
    }

    if(daysOfWeek===6){
        startOfWeek.setDate(today.getDay()+2)
    }else{
        startOfWeek.setDate(today.getDay()-(daysOfWeek-1))
    }

    startOfWeek.setHours(0,0,0,0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate()+4)
    endOfWeek.setHours(23,59,59,999)

    return {startOfWeek, endOfWeek}
}


type Lesson = {
  title: string;
  start: Date;
  end: Date;
};

export const adjustScehduleTOCurrentWeek = (lessons:Lesson[]):Lesson[]=>{

   const {startOfWeek, endOfWeek} = currentWorkWeek()


return lessons.map((lesson)=>{
    const lessonDayOfweek = lesson.start.getDay()

    const daysfromMonday = lessonDayOfweek===0?6:lessonDayOfweek-1


    const adjustStartDate =  new Date(startOfWeek)
    adjustStartDate.setDate(startOfWeek.getDate()+ daysfromMonday);
    const adjustEndDate =  new Date(adjustStartDate)
    adjustEndDate.setHours(
        lesson.end.getHours(),
        lesson.end.getMinutes(),
        lesson.end.getSeconds()
    )

    return {
        title:lesson.title,
        start:adjustStartDate,
        end:adjustEndDate
    }
})
}