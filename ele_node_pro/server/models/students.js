const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    CHName: { type: String },
    ENName: { type: String },
    level: { type: String }
})

module.exports = mongoose.model('Student', schema)
