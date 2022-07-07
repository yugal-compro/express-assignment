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
        res.json({message : 'Course not found'});
    }
};

const addCourse = (req,res)=>{
    try{
     const course = dataOperation.addCourse(req.body);
     res.json(course);
    }catch(err){
        res.json({'message':'unable to add'});
    }
};

const updateCourse = (req,res)=>{
    try{
    const subjectId = parseInt(req.params.subjectId);
    const course = dataOperation.updateCourse(subjectId,req.body);
    res.json(course);
    }catch(err){
        res.json({'message':'course not found'})
    }
};

const deleteCourse = (req,res)=>{
    try{
    const subjectId = parseInt(req.params.subjectId);
    const course = dataOperation.deleteCourse(subjectId);
    res.json(course);
    }catch(err){
        res.json({'message':'course not found'});
    } 
};

module.exports = {getAllCourses,getCourse,addCourse,updateCourse,deleteCourse};