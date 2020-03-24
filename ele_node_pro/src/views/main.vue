<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['4']" unique-opened :default-active="$route.path">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-tickets"></i>资料管理</template>
                    <el-menu-item index="/students/index">学员信息</el-menu-item>
                    <el-menu-item index="/students/config">学员配置</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-tickets"></i>课堂管理</template>
                    <el-menu-item index="/class/index">课表信息</el-menu-item>
                    <el-menu-item index="/class/config">编辑课表</el-menu-item>
                    <el-menu-item index="/class/leave">请假审批</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-tickets"></i>订单管理</template>
                    <el-menu-item index="/order/index">课程订单</el-menu-item>
                    <el-menu-item index="/order/config">订单处理</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-tickets"></i>系统管理</template>
                    <el-menu-item index="/users/index">管理员列表</el-menu-item>
                    <el-menu-item index="/users/config">管理员配置</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "main"
    }
</script>

<style scoped>
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
