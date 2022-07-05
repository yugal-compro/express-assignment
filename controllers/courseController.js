const fs = require('fs');
const {getCourses,getCourseById,modifiedCoursesArray,modifiedCoursesArrayAfterUpdation,modifiedCoursesArrayAfterDeletion} = require('./../model/course');
//let courses = JSON.parse(fs.readFileSync(`${__dirname}/../data/courses.json`));

const getAllCourses = (req,res)=>{
    const courses = getCourses();
    res.status(200).json(courses);
};

const getCourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const course = getCourseById(subjectId);
    (course == null)? res.status(404).json({message : 'Course not found'}) : res.status(200).json(course);
};

const addCourse = (req,res)=>{
    const courses = modifiedCoursesArray(req.body);
    fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),(err)=>{
        (err)? res.status(404).json({message : 'Unable to modify'}):res.status(201).json(courses);
    });
};

const updateCourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const courses = modifiedCoursesArrayAfterUpdation(subjectId,req.body);
    if(courses == null) res.status(404).json({message:'Unable to find the item you want to modify.'});
    else{
    fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),err=>{
        (err)? res.status(404).json({message : 'Unable to modify'}):res.status(201).json(courses);
    })};
};

const deleteCourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const courses = modifiedCoursesArrayAfterDeletion(subjectId);
    if(courses==null){
      res.status(404).json('The server is unable to find the course in the database.');
    }else{
      fs.writeFile(`C:/express-assignment/data/courses.json`,JSON.stringify(courses),err=>{
        (err)? res.status(404).json({message : 'Unable to modify'}):res.status(201).json(courses);
      });
    }  
    
};

module.exports = {getAllCourses,getCourse,addCourse,updateCourse,deleteCourse};