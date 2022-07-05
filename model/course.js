const courses = require('../data/courses.json');
console.log(courses);
let mySet = new Set();
for(course of courses){
    mySet.add(course.subjectId);
}

const getCourses = ()=>{
  //  console.log(courses);
    return courses;
};

const getCourseById = (id)=>{
    
    if(!mySet.has(id)){
       return null;
    }
    const course = courses.find(el => el.subjectId === id);
    return course;
}

const modifiedCoursesArray = (data)=>{

    const newSubjectId = (courses.length==0)?1:courses[courses.length-1].subjectId + 1;
    //date and time calculation
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let day = currentTime.getUTCDay()+3;
    let month = currentTime.getUTCMonth()+1;
    let year = currentTime.getUTCFullYear();

    // const newCourse = Object.assign({subjectId:newSubjectId},data,{"dateCreated":},{"dateModified":});
    const newCourse = {
        subjectId: newSubjectId,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  `${day}/${month}/${year} ${hoursIST}:${minutesIST}`,
        dateModified: `${day}/${month}/${year} ${hoursIST}:${minutesIST}`
    }
    courses.push(newCourse);
    mySet.add(newSubjectId);
    //console.log(courses);
    return courses;
}

const modifiedCoursesArrayAfterUpdation = (id,data)=>{
    if(!mySet.has(id)){
       return null;
    }
    const index = courses.findIndex(el => el.subjectId === id);
    // if(data.subjectId != id){
    //     return null;
    // }
    //date and time calculation
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let day = currentTime.getUTCDay()+3;
    let month = currentTime.getUTCMonth()+1;
    let year = currentTime.getUTCFullYear();

    // const newCourse = Object.assign({subjectId:newSubjectId},data,{"dateCreated":},{"dateModified":});
    const newCourse = {
        subjectId: id,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  courses[index].dateCreated,
        dateModified: `${day}/${month}/${year} ${hoursIST}:${minutesIST}`
    }
    courses.splice(index,1,newCourse);
    return courses;
}

const modifiedCoursesArrayAfterDeletion = (id)=>{
    console.log(mySet);
    if(!mySet.has(id)){
       return null;
    }
    mySet.delete(id);
    const index = courses.findIndex(el => el.subjectId === id);
    courses.splice(index,1);
    return courses;
}

module.exports = {getCourses,getCourseById,modifiedCoursesArray,modifiedCoursesArrayAfterUpdation,modifiedCoursesArrayAfterDeletion,courses};