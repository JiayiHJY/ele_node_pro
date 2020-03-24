const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

// require('./plugins/db')(app)
// require('./routes')(app)
app.set('secret', 'i2u34y12oi3u4y8')

app.use(require('cors')())
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ele_node', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})

// 资料管理模型
const Student = mongoose.model('Student', new mongoose.Schema({
    CHName: { type: String },
    ENName: { type: String },
    level: { type: String }
}))
// 管理员用户模型
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }}
}))

// 登录校验中间件
const auth = async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await User.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
}

app.get('/', async (req, res) => {
    res.send('index')
})
// 新增学员
app.post('/api/students', async (req, res) => {
    const students = await Student.create(req.body)
    res.send(students)
})
// 新增管理员
app.post('/api/users', async (req, res) => {
    const users = await User.create(req.body)
    res.send(users)
})

// 修改学员
app.put('/api/students/:id', async (req, res) => {
    const students = await Student.findByIdAndUpdate(req.params.id, req.body)
    res.send(students)
})
// 修改管理员
app.put('/api/users/:id', async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(users)
})

// 学员列表
app.get('/api/students', auth, async (req, res) => {
    const students = await Student.find()
    res.send(students)
})
// 管理员列表
app.get('/api/users', auth, async (req, res) => {
    const users = await User.find()
    res.send(users)
})

// 删除学员
app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})
// 删除管理员
app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

// 学员详情
app.get('/api/students/:id', async (req, res) => {
    const students = await Student.findById(req.params.id)
    res.send(students)
})
// 管理员详情
app.get('/api/users/:id', async (req, res) => {
    const users = await User.findById(req.params.id)
    res.send(users)
})

// 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1根据用户名找用户
    const user = await User.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    // 2校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //     return res.status(422).send({
    //         message: '密码错误'
    //     })
    // }
    // 3返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
})

// 错误处理函数
app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})
app.listen(3001, () => {
    console.log('http://localhost:3001/')
})
