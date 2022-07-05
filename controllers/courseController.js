const {getCourses,getCourse,addCourse,updatedCourses,updatedCoursesAfterDeletion, courses} = require('./../model/course');

const getAllCourses = (req,res)=>{
    const courses = getCourses();
    res.status(200).json(courses);
};

const getACourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const course = getCourse(subjectId);
    (course == null)? res.status(404).json({message : 'Course not found'}) : res.status(200).json(course);
};

const addNewCourse = (req,res)=>{
    const course = addCourse(req.body);
    (course==null)?res.status(404).json({message:'NO'}):res.status(201).json(course);
};

const updateCourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const course = updatedCourses(subjectId,req.body);
    (course==null)?res.status(404).json({message:'NO'}):res.status(200).json(course);
};

const deleteCourse = (req,res)=>{
    const subjectId = req.params.subjectId * 1;
    const course = updatedCoursesAfterDeletion(subjectId); 
    (course==null)?res.status(404).json({message:'NO'}):res.status(200).json(courses);
};

module.exports = {getAllCourses,getACourse,addNewCourse,updateCourse,deleteCourse};