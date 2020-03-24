<template>
    <div>
        <el-table :data="users">
            <el-table-column prop="_id" label="ID" width="250">
            </el-table-column>
            <el-table-column prop="username" label="用户" width="140">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="140">
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
                users: []
            }
        },
        methods: {
            // 查询列表数据
            queryData () {
                this.$http.get('/users').then(res => {
                    this.users = res.data
                })
            },
            // 编辑
            edit (_id) {
                this.$router.push(`/users/config/${_id}`)
            },
            // 删除
            remove (id) {
                this.$http.delete(`users/${id}`).then(res => {
                    console.log(res.data)
                    this.$message({
                        message: '删除成功',
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
