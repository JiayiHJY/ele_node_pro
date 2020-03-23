const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ele_node', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})

const Student = mongoose.model('Student', new mongoose.Schema({
    CHName: { type: String },
    ENName: { type: String },
    level: { type: String }
}))

app.get('/', async (req, res) => {
    res.send('index')
})
// 新增文章
app.post('/api/students', async (req, res) => {
    const students = await Student.create(req.body)
    res.send(students)
})
// 修改文章
app.put('/api/students/:id', async (req, res) => {
    const students = await Student.findByIdAndUpdate(req.params.id, req.body)
    res.send(students)
})
// 文章列表
app.get('/api/students', async (req, res) => {
    const students = await Student.find()
    res.send(students)
})
// 删除文章
app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})
// 文章详情
app.get('/api/students/:id', async (req, res) => {
    const students = await Student.findById(req.params.id)
    res.send(students)
})

app.listen(3001, () => {
    console.log('http://localhost:3001/')
})
