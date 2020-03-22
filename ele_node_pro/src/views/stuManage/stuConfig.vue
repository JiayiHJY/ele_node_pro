<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}学员资料</h1>
        <el-form ref="form" @submit.native.prevent="saveArticle" :model="article" label-width="80px">
            <el-form-item label="中文名">
                <el-input v-model="article.CHName"></el-input>
            </el-form-item>
            <el-form-item label="英文名">
                <el-input v-model="article.ENName"></el-input>
            </el-form-item>
            <el-form-item label="等级">
                <el-input v-model="article.level"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                article: {}
            }
        },
        methods: {
            // 查询详情
            queryData () {
                this.$http.get(`articles/${this.id}`).then(res => {
                    this.article = res.data
                })
            },
            saveArticle() {
                if (this.id) {
                    this.$http.put(`articles/${this.id}`, this.article).then(res => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$router.push('/articles/index')
                        console.log(res.data)
                    })
                    return
                }
                this.$http.post('articles', this.article).then(res => {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    })
                    this.$router.push('/articles/index')
                    console.log(res.data)
                })
            }
        },
        mounted() {
            if (this.id) {
                this.queryData()
            }
        }
    }
</script>

<style scoped>

</style>
