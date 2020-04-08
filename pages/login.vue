<template>
	<div>
		<el-card class="login-container" shadow="hover">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" size="mini">立即登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
	name: 'Login',
	middleware: 'notAuthenticated',
	data() {
		return {
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '账号不能为空',
						trigger: 'change'
					}
				],
				password: [
					{
						required: true,
						message: '密码不能为空',
						trigger: 'change'
					}
				]
			}
		}
	},
	methods: {
		async onSubmit() {
			this.$refs.form.validate(async valid => {
				if (!valid) return
				const { data: res } = await this.$axios.post(
					'/login',
					this.form
				)
				const { status, success, message, data } = res
				if (status === 200) {
					this.$message({
						message,
						type: success ? 'success' : 'error'
					})
					if (success) {
						this.$store.commit('setAuth', data)
						this.$router.push('/admin')
					}
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.login-container {
	width: 400px;
	margin: 30vh auto;
}
</style>
