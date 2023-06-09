<template>
    <el-row :gutter="10">
        <el-col :span="10">
            <el-avatar :size="100" :src="userInfo.userImage" />
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="3">
            头像：
        </el-col>
        <el-col :span="7">
            <el-input v-model="userInfo.userImage" />
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
        <el-col :span="6">
            <h2>文件上传</h2>
            <el-upload class="upload-demo" drag action="http://127.0.0.1:8080/api/upload" multiple :file="file"
                :on-success="handleSucess" :before-upload="beforeUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png</div>
            </el-upload>
        </el-col>
        <el-col :span:="4">
            <div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <el-col :span="10">
            <el-button type="primary" round @click="updateUse">修改</el-button>
            <el-button type="primary" round>刷新</el-button>
        </el-col>
    </el-row>
</template>

<script>

import axios from 'axios';
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            file:null,
            fileinfo: {
                virtualPath: ""
            },
            userInfo: {
                id: null,
                name: '',
                sex: '',
                password: '',
                userImage: "",
                createDate: '',
                age: '',
            },

        }
    },
    mounted() {
        this.getUserInfo();

    },
    methods: {
        getUserInfo(token) {
            token = localStorage.getItem('token'),
                // console.log('token值为：' + token);
                // 发送获取用户信息的请求，携带token
                axios.get('/api/userinfo', {

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
            //alert(file.type)
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传文件格式只能是 JPG PNG格式!');
            }
            if (!isLt2M) {
                s
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        },
        handleSucess(result) {
            alert("上传成功")
            console.log("存储路径:" + result.virtualPath)
            console.log("文件名:" + result.fileName)
            this.fileinfo.virtualPath = result.virtualPath
        },
        // onUploadSuccess(response) {
        //     // 上传成功后的回调
        //     if (response && response.data) {
        //         this.imageUrl = response.data; // 更新头像图片路径
        //     }
        // },
        // uploadHttpRequest(){

        // }

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
