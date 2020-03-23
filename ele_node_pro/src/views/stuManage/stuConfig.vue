<template>
    <div>
        <h1>{{ id ? '编辑' : '新建' }}学员资料</h1>
        <el-form ref="form" @submit.native.prevent="saveStudent" :model="students" label-width="80px">
            <el-form-item label="中文名">
                <el-input v-model="students.CHName"></el-input>
            </el-form-item>
            <el-form-item label="英文名">
                <el-input v-model="students.ENName"></el-input>
            </el-form-item>
            <el-form-item label="等级">
                <el-input v-model="students.level"></el-input>
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
                students: {}
            }
        },
        methods: {
            // 查询详情
            queryData () {
                this.$http.get(`students/${this.id}`).then(res => {
                    this.students = res.data
                })
            },
            saveStudent() {
                if (this.id) {
                    this.$http.put(`students/${this.id}`, this.students).then(res => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$router.push('/students/index')
                        console.log(res.data)
                    })
                    return
                }
                this.$http.post('students', this.students).then(res => {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    })
                    this.$router.push('/students/index')
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
