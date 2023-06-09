<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        <el-dialog v-model="dialogVisible" width="30%">
            <el-row :gutter="20">
                <el-col :span="20">
                    <h3 style="text-align: center;">添加分类</h3>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <span>
                        分类名称：
                    </span>
                </el-col>
                <el-col :span="14">
                    <div>
                        <el-input v-model="classifyAdd.classifyName" placeholder="分类名称" clearable />
                    </div>
                </el-col>
            </el-row>
            <template #footer>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-button @click="saveClassify">保存</el-button>
                    </el-col>
                    <el-col :span="10">
                        <el-button type="primary" @click="dialogVisible = false"> 取消 </el-button>
                    </el-col>
                </el-row>
            </template>
        </el-dialog>
    </div>
    <div>
        <el-table :data="classifyList" style="width: 100%">
            <el-table-column label="分类ID" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.classifyId }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="分类名称" width="180">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #default>
                            <div>{{ scope.row.classifyName }}</div>
                        </template>
                        <template #reference>
                            <el-tag>{{ scope.row.classifyName }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="danger" @click="deleteClassify(scope.row.classifyId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            classifyList: [],
            classifyAdd: {
                classifyId: null,
                classifyName: ''
            },
            dialogVisible: false,
        }
    },
    mounted() {
        this.getClassify()
    },
    methods: {
        getClassify() {
            let that = this
            axios.get('/api/classify')
                .then(response => {
                    that.classifyList = response.data
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        saveClassify() {
            let that = this
            if (that.classifyAdd.classifyName != '') {
                axios.post('/api/classifySave', that.classifyAdd)
                    .then(response => {
                        // 处理成功响应
                        console.log('插入成功' + response);
                        ElMessage({
                            message: '插入成功',
                            type: 'success',
                        });
                        that.dialogVisible=false;
                    })
                    .catch(error => {
                        // 处理错误
                        console.error('插入失败', error);
                    });
            } else {
                ElMessage({
                    message: '分类名不能为空',
                    type: 'success',
                })
            }
        },
        deleteClassify(userId) {

            // 在这里处理点击行获取到的 userId
            console.log('分类ID:', userId);
            axios.delete(`/api/delete/classify/${userId}`)
                .then(() => {
                    // 删除成功后刷新商品列表
                    this.getClassify()
                })
                .catch(error => {
                    console.error(error);
                });
        },
    }
}
</script>