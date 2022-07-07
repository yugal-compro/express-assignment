const express = require('express');
const router = express.Router();
const {getAllCourses,addNewCourse,getACourse,updateCourse,deleteCourse} = require('./../controllers/courseController');

router
  .route('/courses')
  .get(getAllCourses)
  .post(addNewCourse);

router
  .route('/courses/:subjectId')
  .get(getACourse)
  .put(updateCourse)
  .delete(deleteCourse);


  
module.exports = router;