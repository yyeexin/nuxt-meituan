<template>
	<el-container>
		<el-aside :width="isCollapse ? '64px':'200px'">
			<div class="menu-header">
				<span v-if="!isCollapse">电商后台管理系统</span>
			</div>
			<el-menu
				router
				unique-opened
				text-color="#fff"
				background-color="#454e59"
				active-text-color="#409EFF"
				:collapse="isCollapse"
				:default-active="activePath"
				@select="onMenuSelect"
				:collapse-transition="false"
			>
				<MenuItem :menuList="menuList" :collapse="isCollapse" />
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<i
					@click="toggleMenu"
					:class="['toggle-button',isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
				></i>
				<el-button type="info" @click="logout" size="mini">退出</el-button>
			</el-header>
			<el-main>
				<nuxt-child />
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
import MenuItem from '@/components/MenuItem'
export default {
	name: 'Admin',
	components: {
		MenuItem
	},
	data() {
		return {
			isCollapse: false,
			activePath: '',
			menuList: [
				{
					icon: 'el-icon-s-custom',
					name: '用户管理',
					path: '/admin/user'
				},
				{
					icon: 'el-icon-s-comment',
					name: '留言管理',
					path: '/admin/message'
				}
			]
		}
	},
	mounted() {
		this.activePath = window.sessionStorage.getItem('activePath') || ''
	},
	methods: {
		logout() {
			window.sessionStorage.clear()
			this.$router.push('/login')
		},
		toggleMenu() {
			this.isCollapse = !this.isCollapse
		},
		onMenuSelect(index, indexPath) {
			if (!index) return
			this.activePath = index
			window.sessionStorage.setItem('activePath', index)
		}
	}
}
</script>
<style lang="scss">
.el-aside {
	background-color: #454e59;
	height: 100vh;
	transition: all 0.3s ease;
	overflow-x: hidden;
	.menu-header {
		width: 100%;
		height: 60px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 40px;
			height: 40px;
		}
		span {
			margin-left: 10px;
			white-space: nowrap;
		}
	}
	.el-menu {
		border-right: 0;
	}
}

.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
	height: 0;
	width: 0;
	overflow: hidden;
	visibility: hidden;
	display: inline-block;
}

.el-header {
	display: flex;
	align-items: center;
	background-color: rgba(92, 205, 222, 0.9);
	padding-left: 0px !important;
	.toggle-button {
		font-size: 24px;
		color: #fff;
		display: inline-block;
		width: 60px;
		height: 100%;
		line-height: 60px;
		text-align: center;
		&:hover {
			background-color: rgba(0, 0, 0, 0.15);
		}
	}

	.el-button {
		margin-left: auto;
	}
}
.el-main {
	background-color: #f0f2f5;
	height: calc(100vh - 60px);
}
.el-submenu__title i {
	color: #fff !important;
}
</style>
