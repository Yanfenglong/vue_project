<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-alert type="info" title="添加商品信息" center show-icon :closable="false"></el-alert>
            <el-steps :space="200" align-center :active="activeIndex -0 " finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form :model="addForm" ref="addFormRef" :rules="addFormRules"  label-width="100px" label-position="top">
                <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave"
                         @tab-click="tabClick">
                    <el-tab-pane label="基本信息" name="0">
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
                            <el-cascader expandTrigger="hover"
                                         :options="catelist"
                                         :props="cateProps"
                                         v-model="addForm.goods_cat"
                                         clearable
                                         @change="handleChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">
                        <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox border v-for="(cb,i) in item.attr_vals" :label="cb" :key="i"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name="2">
                        <el-form-item v-for="item in onlyTableData" :key="item.attr_id" :label="item.attr_name">
                            <el-input v-model="item.attr_vals" disabled></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload
                                action="uploadUrl"
                                :headers="headerObj"
                                :on-preview="handlePreview"
                                :on-success="handleOnSuccess"
                                list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name="4">
                        <quill-editor
                                :v-model="addForm.goods_introduce"
                        >
                        </quill-editor>
                        <el-button type="primary" style="margin: 20px" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import _ from  'lodash'
    export default {
        name: "Add",
        data() {
            return {
                proviewpath: '',
                goods_introduce: '',
                addFormRules: {
                    goods_name: [
                        {
                            required: true,
                            message: "please input the goods_name",
                            trigger: blur
                        }
                    ],
                    goods_price: [
                        {
                            require: false, message: "please input the goods_price",
                            trigger: blur
                        }
                    ],
                },
                headerObj: {
                    Authorization: window.sessionStorage.getItem('token')
                },
                uploadUrl: "http://127.0.0.1:8888/api/private/v1/upload",
                previewVisible: false,
                activeIndex: '0',
                catelist: [],
                cateProps: {
                    value: 'cat_id',
                    label: 'cat_name',
                    children: 'children'
                },
                addForm: {
                    goods_name: '',//default value ,we get new value from the input table,so we can change these
                    goods_cat: [],
                    goods_price: 0,
                    goods_number: 0,
                    goods_weight: 0,
                    pics: [],
                    attrs: []
                },
                manyTableData: [],
                onlyTableData: [],
            }
        },
        computed: {
            cateId() {
                if (this.addForm.goods_cat.length === 3) {
                    return this.addForm.goods_cat[2]
                }
                return null
            }
        },
        created() {
            //logic
            this.getCateList()
        },
        methods: {
             add() {
                //向后台提交数据submit the goods information to the server
                console.log("1111111")
                 this.$ref.addFormRef.validate(async valid=>{
                     if (!valid) {
                         this.$message.error("Please input all the information correctly")
                     }
                     //Then get data and transform data to server
                    const form = _.cloneDeep(this.addForm)
                     //Use deep copy to change the structure from Array [] to String "1,2,3"
                     form.goods_cat = form.goods_cat.join(',')  //add comma after each array item ,then it is String
                     this.manyTableData.forEach(item =>{
                         const newInfo ={
                             attr_id:item.attr_id,
                             attr_value:item.attr_value.join(' ')
                         }
                         this.addForm.attrs.push(newInfo)
                     })
                     this.onlyTableData.forEach(item=>{
                         const newInfo ={
                             attr_id:item.attr_id,
                             attr_value:item.attr_value
                         }
                         this.addForm.attrs.push(newInfo)
                     })
                     form.attrs = this.addForm.attrs
                     const {data: res} = await this.$http.post("goods", form)
                     this.$router.push('./goods')
                 })
            },
            handleOnSuccess(response) {
                // console.log(response)
                const picInfo = {pic: response.data.tmp_path}
                this.addForm.pics.push(picInfo)
            },
            handlePreview(file) {
                console.log(file)
                this.proviewpath = file.response.data.url
                this.previewVisible = true
            },
            async tabClick() {
                if (this.activeIndex === "1") {
                    const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'many'}})
                    res.data.forEach(item => {
                        item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
                    })
                    this.manyTableData = res.data
                } else if (this.activeIndex === "2") {
                    const {data: res} = await this.$http.get(`categories/${this.cateId}/attributes`, {params: {sel: 'only'}})
                    this.onlyTableData = res.data
                }
            },
            beforeTabLeave(activeName, oldActiveName) {
                if (oldActiveName = '0' && this.addForm.goods_cat.length !== 3) {
                    this.$message.error("请先选择3级分类")
                    return false
                }
            },
            handleChange() {
                if (this.addForm.goods_cat.length !== 3) {
                    this.addForm.goods_cat = []
                }
            },
            async getCateList() {
                const {data: res} = await this.$http.get("categories")
                this.catelist = res.data
                //  console.log(this.catelist)
            }
        }
    }
</script>

<style scoped>
    .el-card {
        margin-top: 20px;
    }
</style>
