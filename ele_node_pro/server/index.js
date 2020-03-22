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

const Article = mongoose.model('Article', new mongoose.Schema({
    CHName: { type: String },
    ENName: { type: String },
    level: { type: String }
}))

app.get('/', async (req, res) => {
    res.send('index')
})
// 新增文章
app.post('/api/articles', async (req, res) => {
    const article = await Article.create(req.body)
    res.send(article)
})
// 修改文章
app.put('/api/articles/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})
// 文章列表
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find()
    res.send(articles)
})
// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})
// 文章详情
app.get('/api/articles/:id', async (req, res) => {
    const articles = await Article.findById(req.params.id)
    res.send(articles)
})

app.listen(3001, () => {
    console.log('http://localhost:3001/')
})
