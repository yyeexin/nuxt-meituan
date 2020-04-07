<template>
	<div>
		<el-card class="login-container" shadow="hover">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-form-item label="手机号" prop="username">
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
				const { data } = await this.$axios.post('/login', this.form)
				if (data.status === 200) {
					const { token } = data
					this.$store.commit('setAuth', {})
					this.$router.push('/admin')
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
