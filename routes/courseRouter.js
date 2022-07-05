const express = require('express');
const router = express.Router();
const {getAllCourses,addCourse,getCourse,updateCourse,deleteCourse} = require('./../controllers/courseController');

router
  .route('/courses')
  .get(getAllCourses)
  .post(addCourse);

router
  .route('/courses/:subjectId')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);


  
module.exports = router;