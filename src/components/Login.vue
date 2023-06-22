<template>
	<div id="building">

	</div>
	<div class="login-box">
		<div class="box-all" v-show="iSLogin">
			<h2>购物管理系统登录</h2>
			<div class="input-box">
				<span style="vertical-align:middle">
					<el-icon>
						<UserFilled />
					</el-icon>
				</span>
				<el-input v-model="from.username" placeholder="用户名" style="vertical-align:middle;width: 250px;" />
			</div>
			<div class="input-box">
				<span style="vertical-align:middle">
					<el-icon>
						<Lock />
					</el-icon>
				</span>
				<el-input v-model="from.password" type="password" placeholder="密码" show-password
					style="vertical-align:middle;width: 250px;" />
			</div>
			<div>
				<el-button type="primary" @click="login" class="input-box">登录</el-button>
				<el-button type="primary" @click="iSLoginShow" class="input-box">注册</el-button>
			</div>
		</div>
		<div class="box-all" v-show="iSRegister">
			<h2>管理员注册</h2>
			<div class="input-box">
				<span style="vertical-align:middle">
					<el-icon>
						<EditPen />
					</el-icon>
				</span>
				<el-input v-model="from.name" placeholder="姓名" style="vertical-align:middle;width: 250px;" />
			</div>
			<div class="input-box">
				<span style="vertical-align:middle">
					<el-icon>
						<UserFilled />
					</el-icon>
				</span>
				<el-input type="number" v-model="from.username" placeholder="用户名" style="vertical-align:middle;width: 250px;" />
			</div>
			<div class="input-box">
				<span style="vertical-align:middle">
					<el-icon>
						<Lock />
					</el-icon>
				</span>
				<el-input v-model="from.password" type="password" placeholder="密码" show-password
					style="vertical-align:middle;width: 250px;" />
			</div>
			<div>
				<el-button type="primary" @click="iSRegisterShow" class="input-box">登录</el-button>
				<el-button type="primary" @click="register" class="input-box">注册</el-button>
			</div>
		</div>
	</div>
</template>
  
<script>
import axios from "axios";
import { ElMessage } from 'element-plus'
import moment from 'moment';
export default {
	data() {
		return {
			userInfo: [],
			iSLogin: true,
			iSRegister: false,
			from: {
				name: '',
				username: '',
				password: '',
				createDate: new Date()

			},
		};
	},
	
	methods: {


		iSLoginShow() {
			this.iSRegister = true;
			this.iSLogin = false;
		},
		iSRegisterShow() {
			this.iSLogin = true
			this.iSRegister = false
			this.from.name = ''
		},
		register() {
			let that = this
			that.from.createDate = moment(that.from.createDate).format("yyyy-MM-DD");
			if (that.from.username != '' && that.from.password != '' & that.from.name != '') {
				axios.post('api/register',that.from
				).then(function (response) {
						console.log(response.data);
						ElMessage('注册成功!');
						that.iSLogin = true
						that.iSRegister = false
					}).catch(function (error) {
						console.log(error);
						ElMessage('用户已被注册!')
					})
			} else {
				ElMessage('账号密码不能为空!')
			}

		},
		login() {
			const that = this
			that.errorMessage = '';
			// 校验密码是否为空
			if (that.from.username != '' && that.from.password != '') {
				// 发送登录请求
				axios.post('api/login', {
					username: that.from.username,
					password: that.from.password
				})
					.then(function (response) {
						const token = response.data.token;
						localStorage.setItem('token', token);
						console.log(token);
						that.$router.push('/home')
						return response;
					})
					.catch(function (error) {
					
							ElMessage('账号或密码不存在!')
					});


			} else {
				ElMessage('账号密码不能为空!')
			}
		},
	},
};
</script>
  
<style scoped>
.login-box {
	width: 500px;
	/* border: solid 1px red; */
	box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.1);
	text-align: center;
	/*让div内部文字居中*/
	background-color: #fff;
	border-radius: 30px;
	width: 400px;
	height: 250px;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.input-box {
	margin-top: 10px;
}

.error {
	color: #0A0A0A;
	margin-top: 10px;
}

.el-input {
	margin-left: 5px;
}

#building {
	background-color: aqua;
	width: 100%;
	height: 100%;
	position: fixed;
	background-size: 100% 100%;
}
</style>
  