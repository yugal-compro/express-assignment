const dataOperation = require('./../model/courseModel');

const getAllCourses = (req,res)=>{
    const courses = dataOperation.getAllCourses();
    res.json(courses);
};

const getCourse = (req,res)=>{
    try{
       const subjectId = parseInt(req.params.subjectId);
       const course = dataOperation.getCourse(subjectId);
       res.json(course);
    }catch(err){
        res.status(404).send(err.message);
    }
};

const addCourse = (req,res)=>{
    try{
       const course = dataOperation.addCourse(req.body);
       res.status(201).json(course);
    }catch(err){
        res.status(404).send(err.message);
    }
};

const updateCourse = (req,res)=>{
    try{
       const subjectId = parseInt(req.params.subjectId);
       const course = dataOperation.updateCourse(subjectId,req.body);
       res.status(202).json(course);
    }catch(err){
        res.status(404).send(err.message);
    }
};

const deleteCourse = (req,res)=>{
    try{
       const subjectId = parseInt(req.params.subjectId);
       const course = dataOperation.deleteCourse(subjectId);
       res.json(course);
    }catch(err){
        res.status(404).send(err.message);
    } 
};

module.exports = {getAllCourses,getCourse,addCourse,updateCourse,deleteCourse};