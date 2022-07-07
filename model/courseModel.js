const fs = require('fs');
const path = require('path');
const courses = require('../data/courses.json');
const dataPath = path.join(__dirname,'..','data/courses.json');

exports.getAllCourses = ()=>{
    return courses;
};
exports.getCourse = (id)=>{
    const course = courses.find(course => course.subjectId === id);
    if(!course){
        throw new Error();
    }
    return course;
};
exports.addCourse = (data)=>{

    const newSubjectId = (courses.length==0)?1:courses[courses.length-1].subjectId + 1;
    const newDate = dateCalc();
    const newCourse = {
        subjectId: newSubjectId,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  `${newDate.day}/${newDate.month}/${newDate.year} ${newDate.hours}:${newDate.minutes}`,
        dateModified: `${newDate.day}/${newDate.month}/${newDate.year} ${newDate.hours}:${newDate.minutes}`
    }
    courses.push(newCourse);
    updateData(courses);
    return newCourse;
}

exports.updateCourse = (id,data)=>{
    const index = courses.findIndex(course => course.subjectId === id);
    if(index===-1){
        throw new Error();
    }
    const newDate = dateCalc();
    const newCourse = {
        subjectId: id,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  courses[index].dateCreated,
        dateModified: `${newDate.day}/${newDate.month}/${newDate.year} ${newDate.hours}:${newDate.minutes}`
    }
    courses.splice(index,1,newCourse);
    
    updateData(courses);
   return newCourse;
}

exports.deleteCourse = (id)=>{       
    const index = courses.findIndex(course => course.subjectId === id);
    if(index===-1){
        throw Error('Course not found');
    }
    courses.splice(index,1);
   
    updateData(courses);
    return courses;
}


function updateData(data){
    fs.writeFile(dataPath,JSON.stringify(data),err=>{
        if(err) throw new Error(err);
      });
}

function dateCalc(){
    
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330;
    const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    const hoursIST = ISTTime.getHours();
    const minutesIST = ISTTime.getMinutes();
    const day = currentTime.getUTCDay()+3;
    const month = currentTime.getUTCMonth()+1;
    const year = currentTime.getUTCFullYear();
   return {
         'day':day,
         'month':month,
         'year':year,
         'hours':hoursIST,
         'minutes':minutesIST
        }
}

