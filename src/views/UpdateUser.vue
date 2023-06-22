<template>
    <el-row :gutter="10">
        <el-col :span="10">
            <el-avatar :size="100" :src="iURL + userInfo.userImage" />
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="3">
            姓名：
        </el-col>
        <el-col :span="7">
            <el-input v-model="userInfo.name" />
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="3">
            年龄：
        </el-col>
        <el-col :span="7">
            <el-input v-model="userInfo.age" type="number" />
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="3">
            密码：
        </el-col>
        <el-col :span="7">
            <el-input v-model="userInfo.password" type="password" show-password />

        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="3">
            性别：
        </el-col>
        <el-col :span="7">
            <el-radio-group v-model="userInfo.sex">
                <el-radio label="男" size="large">男</el-radio>
                <el-radio label="女" size="large">女</el-radio>
            </el-radio-group>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="10">
            <el-upload action="http://127.0.0.1:8080/api/upload" 
                list-type="picture-card"
                :before-upload="beforeUpload"
                :on-success="handleSuccess" 
                :on-remove="handleRemove" 
                :file-list="fileList" 
                :limit="1"
                >
                <el-icon>
                    <Plus />
                </el-icon>
                <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="iURL + userInfo.userImage" />
                        <span class="el-upload-list__item-actions">
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="iURL + userInfo.userImage" />
            </el-dialog>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="10">
            <el-button type="primary" round @click="updateUse">修改</el-button>
            <el-button type="primary" round>刷新</el-button>
        </el-col>
    </el-row>
</template>

<script >

import axios from 'axios';
import { ElMessage } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'

export default {
    data() {
        return {
            iURL: 'http://127.0.0.1:8080/images/',
            fileList: [],
            userInfo: {
                id: null,
                name: '',
                sex: '',
                password: '',
                userImage: '',
                createDate: '',
                age: '',
            },
            imageUrl: '',
            disabled: false,
            dialogVisible: false,
            hideUploadEdit: true
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        imageShow(){

        },
        getUserInfo(token) {
            token = localStorage.getItem('token'),
                // console.log('token值为：' + token);
                // 发送获取用户信息的请求，携带token
                axios.get('/api/user/info', {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        this.userInfo = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        // 处理获取用户信息失败的情况
                    });
        },
        async updateUse() {
            try {
                const response = await axios.put(`/api/update/${this.userInfo.id}`, this.userInfo);
                console.log(response.data); // 处理成功响应
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
            } catch (error) {
                console.error(error); // 处理错误响应
            }
        },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传文件格式只能是 JPG/PNG格式!');
            }
            if (!isLt2M) {

                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        handleRemove(file, fileList) {
            console.log('移除的文件：', file);
            console.log('当前文件列表：', fileList);
            const that = this;
            that.fileList = [];
            // 发送删除请求给后端
            axios.delete(`/api/deleteImage?filePath=${that.imageUrl}`)
                .then(response => {
                    // 处理删除成功的情况
                    console.log("删除成功:" + that.userInfo.userImage);
                })
                .catch(error => {
                    // 处理删除失败的情况
                    console.error('删除失败', error);
                    console.log("删除失败:" + that.imageUrl);
                });
        },
        handleSuccess(response) {
            // 上传成功后的处理
            this.userInfo.userImage = response.imageName;
            this.imageUrl = response.imageUrl;
        },
        handleEditChange(file, fileList) {
            let vm = this
            vm.hideUploadEdit = fileList.length >= 1
        },
    }
}

</script>
<style>
.avatar-uploader {
    display: inline-block;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #999;
    cursor: pointer;
}
</style>
