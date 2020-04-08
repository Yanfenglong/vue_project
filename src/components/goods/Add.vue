<template>
    <di>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-alert type="info" title="添加商品信息" center show-icon :closable="false" ></el-alert>
            <el-steps :space="200" align-center :active="activeIndex -0 " finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form>
                <el-tabs :tab-position="'left'" >
                    <el-tab-pane label="基本信息">
                       <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                       </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-input v-model="addForm.goods_cat" ></el-input>
                        </el-form-item>

                    </el-tab-pane>
                    <el-tab-pane label="商品参数">商品参数</el-tab-pane>
                    <el-tab-pane label="商品属性">商品属性</el-tab-pane>
                    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
                    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </di>
</template>

<script>
    export default {
        name: "Add",
        data(){
            return {
                activeIndex:'0',
                catelist:[],
                addForm: {
                    goods_name:'',//default value ,we get new value from the input table,so we can change these
                    goods_cat:[],
                    goods_price:0,
                    goods_number:0,
                    goods_weight:0,
                    pics:[],
                    attrs:[]
                }
            }
        },
        created() {
            //logic
            this.getCateList()
        },
        methods:{
            async getCateList(){
                const {data: res} = await this.$http.get("categories")
               this.catelist = res.data
               console.log(this.catelist)
            }
        }
    }
</script>

<style scoped>
.el-card{
    margin-top: 20px;
}
</style>
