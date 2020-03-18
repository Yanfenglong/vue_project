<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card style="margin-top: 15px">
            <el-row gutter=20>
                <el-col :span="9">
                    <el-input placeholder="请输入内容"></el-input>
                    <el-button icon="el-icon-search" slot="append"></el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="userlist"
                    border
                    stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                       <el-tooltip effect="dark" content="编辑" placement="top">
                           <el-button icon="el-icon-edit" size="mini" type="primary"></el-button>
                       </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top">
                            <el-button icon="el-icon-delete" size="mini" type="danger"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="设置" placement="top">
                            <el-button icon="el-icon-setting" size="mini" type="warning"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                queryInfo: {
                    query: '',
                    pagenum: 1,
                    pagesize: 4
                },
                userlist: [],
                total: 0,
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const {data: res} = await this.$http.get('users', {params: this.queryInfo});
                if (res.meta.status !== 200) return this.$message.error('失败');
                this.userlist = res.data.users
                this.total = res.data.total
                console.log(this.userlist)
            }
        }
    }
</script>

<style scoped>

</style>
