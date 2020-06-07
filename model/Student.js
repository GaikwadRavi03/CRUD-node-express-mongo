const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema;

const studentSchema = new mongoSchema({
    id: Number,
    name: String,
    class: String
});

module.exports = mongoose.model('students', studentSchema);