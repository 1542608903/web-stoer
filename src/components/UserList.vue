<template>
    <el-table :data="tableData" style="width:1100">
        <el-table-column fixed prop="id" label="用户id" width="100" />
        <el-table-column fixed prop="name" label="姓名" width="100" />
        <el-table-column prop="sex" label="性别" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="createDate" label="创建时间" width="200" />
        <el-table-column prop="userImage" label="图像" width="200">
        <template  #default="scope">
            <el-image style="width: 40px; height: 40px" :src="scope.row.userImage" />
        </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" 
                @click="handleButtonClick(scope.row.id)"
                >删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts">
import axios from 'axios';
import {Delete,Edit} from '@element-plus/icons-vue'
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
        }
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        // 获取用户
        fetchUsers() {
            axios.get('/api/users')
                .then(response => {
                    this.tableData = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleButtonClick(userId) {
            let id = userId
            // 在这里处理点击行获取到的 userId
            console.log('点击的用户ID:', id);
            axios.delete(`/api/users/${id}`)
                .then(() => {
                    // 删除成功后刷新用户列表
                    this.fetchUsers();
                })
                .catch(error => {
                    console.error(error);
                });
        },
    }
}

</script>

<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.block {
    margin-top: 20px;
}
</style>