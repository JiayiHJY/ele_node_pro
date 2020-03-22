<template>
    <div>
        <el-table :data="articles">
            <el-table-column prop="CHName" label="中文名" width="140">
            </el-table-column>
            <el-table-column prop="ENName" label="英文名" width="140">
            </el-table-column>
            <el-table-column prop="level" label="等级" width="140">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
                    <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articles: []
            }
        },
        methods: {
            // 查询列表数据
            queryData () {
                this.$http.get('articles').then(res => {
                    this.articles = res.data
                })
            },
            // 编辑
            edit (_id) {
                this.$router.push(`/articles/config/${_id}`)
            },
            // 删除
            remove (id) {
                this.$http.delete(`articles/${id}`).then(res => {
                    console.log(res.data)
                    this.$message({
                        message: '文章删除成功',
                        type: 'success'
                    })
                    this.queryData()
                })
            }
        },
        mounted() {
            this.queryData()
        }
    }
</script>

<style scoped>

</style>
