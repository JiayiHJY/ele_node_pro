module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Student = require('../models/students')

    router.get('/', async (req, res) => {
        res.send('index')
    })
    // 新增学员
    router.post('/students', async (req, res) => {
        const students = await Student.create(req.body)
        res.send(students)
    })
    // 修改学员
    router.put('/students/:id', async (req, res) => {
        const students = await Student.findByIdAndUpdate(req.params.id, req.body)
        res.send(students)
    })
    // 学员列表
    router.get('/students', async (req, res) => {
        const students = await Student.find()
        res.send(students)
    })
    // 删除学员
    router.delete('/students/:id', async (req, res) => {
        await Student.findByIdAndDelete(req.params.id)
        res.send({
            status: true
        })
    })
    // 学员详情
    router.get('/students/:id', async (req, res) => {
        const students = await Student.findById(req.params.id)
        res.send(students)
    })

    app.use('/api', router)
}
