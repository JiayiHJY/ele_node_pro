<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
        <el-form ref="form" @submit.native.prevent="saveUser" :model="users" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="users.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="users.password"></el-input>
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
                users: {}
            }
        },
        methods: {
            // 查询详情
            queryData () {
                this.$http.get(`users/${this.id}`).then(res => {
                    this.users = res.data
                })
            },
            saveUser() {
                if (this.id) {
                    this.$http.put(`users/${this.id}`, this.users).then(res => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$router.push('/users/index')
                        console.log(res.data)
                    })
                    return
                }
                this.$http.post('users', this.users).then(res => {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    })
                    this.$router.push('/users/index')
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
