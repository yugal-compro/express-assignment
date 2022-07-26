const fs = require('fs');
const path = require('path');
const courses = require('../data/courses.json');
const dataPath = path.join(__dirname,'..','data/courses.json');
const {dateCalc} = require('../utils/dateCal.js');
const getAllCourses = ()=>{
    return courses;
};
const getCourse = (id)=>{
    const course = courses.find(course => course.subjectId === id);
    if(!course){
        throw new Error('Course not found');
    }
    return course;
};
const addCourse = (data)=>{

    const newSubjectId = (courses.length==0)?1:courses[courses.length-1].subjectId + 1;
    const newDate = dateCalc();
    const newCourse = {
        subjectId: newSubjectId,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  newDate,
        dateModified: newDate
    }
    courses.push(newCourse);
    updateData(courses);
    return courses;
}

const updateCourse = (id,data)=>{
    const index = courses.findIndex(course => course.subjectId === id);
    if(index===-1){
        throw new Error('Course not found');
    }
    const newDate = dateCalc();
    const newCourse = {
        subjectId: id,
        subjectName: data.subjectName,
        courseName: data.courseName,
        dateCreated:  courses[index].dateCreated,
        dateModified: newDate
    }
    courses.splice(index,1,newCourse);
    
    updateData(courses);
   return courses;
}

const deleteCourse = (id)=>{       
    const index = courses.findIndex(course => course.subjectId === id);
    if(index===-1){
        throw new Error('Course not found');
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


module.exports = {getAllCourses,getCourse,addCourse,updateCourse,deleteCourse};
