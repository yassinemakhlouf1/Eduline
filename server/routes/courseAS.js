const express = require('express');
const router = express.Router();
const courseAS = require('../controllers/courseAS');
//const { isLoggedIn } = require('../middleware');

router.post('/create/:idDomain/:idChapter', courseAS.create);
router.get('/allCoursesAS', courseAS.CoursesASList);
router.get('/CoursesAS/:id', courseAS.CoursesASFindOne);
router.get('/CoursesASIdDomain/:id', courseAS.CoursesASListByIdDomain);
router.delete('/DelCoursesAS/:id', courseAS.CoursesASDel);
router.put('/UpdateCoursesAS/:id', courseAS.CoursesASUpdate);

module.exports = router;
