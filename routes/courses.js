const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'},
    {id : 4, name : 'course4'},
    {id : 5, name : 'course5'}
];

// GET Course Endpoint
router.get('/', (req, res) => {
    res.send(courses);
});

// POST Endpoint
router.post('/', (req, res) => {

    if (!req.body.name || req.body.name.length < 3)
        res.status(400).send('You must provide name property value or it must be more than 3 characters long'); // 400 Bad Request

    const course = {
        id: courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});

// GET/id Endpoint
router.get('/:id', (req, res) => {
    const course = courses.find(i => i.id === parseInt(req.params.id));
    if (!course) // 404
        res.status(404).send('This course is not find into the system');
    res.send(course);
});

// PUT
router.put('/:id', (req, res) => {
    const  { error }  = validateCourse(req.body);
    
    if (error)
        return res.status(400).send(error);

    const course = courses.find(item => item.id === parseInt(req.params.id));
    
    if (!course)
        return res.status(404).send('The course with the give ID was not found into the system, please provide valid ID');

    course.name = req.body.name;
    res.send(course);
});

// DELETE
router.delete('/:id', (req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
        
    if (!course)
        return res.status(404).send('The course with the give ID was not found into the system, please provide valid ID');

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course)
{
    const schema = Joi.object({ name: Joi.string().min(3).required()});
    return schema.validate(course);
}

module.exports = router;