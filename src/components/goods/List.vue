<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请在此输入搜索内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddpage">添加商品</el-button>
                </el-col>
            </el-row>
            <el-table :data='goodslist' border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格" width="95px"></el-table-column>
                <el-table-column prop="goods_weight" label="商品重量" width="70px"></el-table-column>
                <el-table-column prop="add_time" label="添加时间" width="140px"></el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeById(scope.row.goods_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                //Define the default data
                total: 0, //number of total items
                goodslist: [],//goods list
                queryInfo: {   //request params
                    query: '',   //search info
                    pagenum: 1,  //page number
                    pagesize: 10
                }
            }
        },
        created() {
            //logic
            this.getGoodsList()
        },
        methods: {
            async removeById(id) {
                const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                if (confirmResult !== "confirm") {
                    return this.$message.info("用户取消了删除")
                }
                //console.log(confirmResult)
                const {data: res} = await this.$http.delete(`goods/${id}`)
                this.getGoodsList()
            },
            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getGoodsList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getGoodsList()
            },
            goAddpage() {
                //jump to add page
                this.$router.push('/goods/add')
            },

            async getGoodsList() {
                //the logic fulfilled
                const {data: res} = await this.$http.get("goods", {params: this.queryInfo})
                this.goodslist = res.data.goods
                this.total = res.data.total

            }
        }

    }
</script>

<style scoped>
    .el-card {
        margin-top: 20px;
    }
    .el-table {
        margin-top: 10px;
    }
</style>
