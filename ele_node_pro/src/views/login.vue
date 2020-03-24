<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                user: {}
            }
        },
        methods: {
            // 登录
            async login () {
                const res = await this.$http.post('login', this.user)
                localStorage.token = res.data.token // 关掉浏览器仍存在
                // sessionStorage.token = res.data.token // 关掉浏览器不存在
                this.$router.push('/')
                this.$message({
                    message: '登录成功',
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>
.login-card {
    width: 25rem;
    margin: 5rem auto;
}
</style>
