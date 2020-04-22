<template>
    <div>
        <!--面包屑导航1111111-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div  id="main" style="width: 1000px;height:400px;"></div>
        </el-card>
    </div>
</template>
<script>
    import  _ from  'lodash'
import  echarts from  'echarts'
export default{
    data(){
        return {
            options: {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#E9EEF3'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ]
            }
        }
    },
    async mounted(){
        //生命周期函数Life cycle function
        var myChart = echarts.init(document.getElementById('main'));
       const {data:res} = await this.$http.get('reports/type/1')
        const  result = _.merge(res.data,this.options)
        myChart.setOption(result);
    },
    methods:{
    }
}
</script>

<style scoped>
.el-card{
    margin-top: 20px;
}
</style>
