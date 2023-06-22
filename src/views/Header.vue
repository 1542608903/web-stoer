<template>
    <el-page-header>
        <template #title>
            <div>
                <h1>网上购物系统</h1>
            </div>
        </template>
        <template #content>
            <span>
                <el-avatar :size="32" :src="iURL + userInfo.userImage" />
            </span>
            <span style="font-size: 10px;">姓名：{{ userInfo.name }}</span>
        </template>
        <template #extra>
            <div>
                <el-button @click="logout" style="margin-left: 10px;">退出</el-button>
                <router-link to="/updateuser">
                    <el-button type="primary" class="ml-2" style="margin-left: 10px;">修改</el-button>
                </router-link>
            </div>
        </template>
    </el-page-header>
</template>
<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useDark, useToggle } from '@vueuse/core'
export default {
    data() {
        return {
            iURL:'http://127.0.0.1:8080/images/',
            value: "",
            userInfo: [],
            userData: [],
        }
    },
    created() {


    },
    mounted() {
        this.getUserInfo();
        this.getHello();
    },
    methods: {
        getHello() {
            if (this.userInfo.name != "") {
                ElMessage({
                    message: '欢迎登录！',
                    type: 'success',
                })
            }
        },
        back() {
            this.logout()
        },
        logout() {
            const that = this
            localStorage.removeItem('token')
            that.$router.replace('/login')
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
    }
}
</script>

<style></style>
  