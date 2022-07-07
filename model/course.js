const fs = require('fs');
const courses = require('../data/courses.json');
let mySet = new Set();
for(course of courses){
    mySet.add(course.subjectId);
}
const getCourses = ()=>{
    return courses;
};
const getCourse = (id)=>{
    if(!mySet.has(id)){
       return null;
    }
    const course = courses.find(el => el.subjectId === id);
    return course;
}

const addCourse = (data)=>{

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
    const newCourse = {
        subjectId: newSubjectId,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  `${day}/${month}/${year} ${hoursIST}:${minutesIST}`,
        dateModified: `${day}/${month}/${year} ${hoursIST}:${minutesIST}`
    }
    courses.push(newCourse);
    mySet.add(newSubjectId);
    fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),(err)=>{
        if(err) return null;
    });
    return newCourse;
}

const updatedCourses = (id,data)=>{
    if(!mySet.has(id)){
       return null;
    }
    const index = courses.findIndex(el => el.subjectId === id);
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    let hoursIST = ISTTime.getHours();
    let minutesIST = ISTTime.getMinutes();
    let day = currentTime.getUTCDay()+3;
    let month = currentTime.getUTCMonth()+1;
    let year = currentTime.getUTCFullYear();
    const newCourse = {
        subjectId: id,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  courses[index].dateCreated,
        dateModified: `${day}/${month}/${year} ${hoursIST}:${minutesIST}`
    }
    courses.splice(index,1,newCourse);
    
    fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),err=>{
        if(err) return null;
    });
   return newCourse;
}

const updatedCoursesAfterDeletion = (id)=>{
    console.log(mySet);
    if(!mySet.has(id)){
       return null;
    }
    mySet.delete(id);
    const index = courses.findIndex(el => el.subjectId === id);
    courses.splice(index,1);
    
        fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),err=>{
          if(err) return null;
        });
      return courses;
}

module.exports = {getCourses,getCourse,addCourse,updatedCourses,updatedCoursesAfterDeletion,courses};