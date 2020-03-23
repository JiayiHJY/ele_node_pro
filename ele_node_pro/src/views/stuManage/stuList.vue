<template>
    <div>
        <el-table :data="students">
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
                students: []
            }
        },
        methods: {
            // 查询列表数据
            queryData () {
                this.$http.get('students').then(res => {
                    this.students = res.data
                })
            },
            // 编辑
            edit (_id) {
                this.$router.push(`/students/config/${_id}`)
            },
            // 删除
            remove (id) {
                this.$http.delete(`students/${id}`).then(res => {
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
