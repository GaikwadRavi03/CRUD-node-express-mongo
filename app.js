const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
require('./config/db.connection')
const Student = require('./model/Student')

app.get('/student', (req, res) => {
    Student.find().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    });
});

app.post('/student', jsonParser, (req, res) => {
    const data = new Student({
        id: req.body.id,
        name: req.body.name,
        class: req.body.class
    })

    data.save().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});

app.delete('/student/:id', (req, res) => {
    Student.deleteOne({ id: req.params.id }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});

app.put('/student/:id', jsonParser, (req, res) => {
    Student.updateOne({ id: req.params.id },
        {
            $set:
            {
                name: req.body.name,
                class: req.body.class
            }
        }).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json(err)
        })
});

app.get('/serach/:name', (req, res) => {
    const regex = new RegExp(req.params.name, 'i')
    Student.find({ name: regex }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});

app.get('/search/:name', (req, res) => {
    var regex = new RegExp(req.params.name, 'i');
    User.find({ name: regex }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});

app.listen(1234)