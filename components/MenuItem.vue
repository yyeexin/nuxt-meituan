<template>
	<div>
		<template v-for="(item,index) in menuList">
			<el-submenu v-if="item.children && item.children.length" :index="String(index)" :key="index">
				<template slot="title">
					<i v-if="item.icon" :class="item.icon"></i>
					<span slot="title">{{item.name}}</span>
				</template>
				<MenuItem :menuList="item.children" />
			</el-submenu>
			<el-menu-item v-else :index="item.path" :key="item.path">
				<i v-if="item.icon" :class="item.icon"></i>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</template>
	</div>
</template>
<script>
export default {
	name: 'MenuItem',
	data() {
		return {}
	},
	props: {
		menuList: {
			type: Array,
			required: true
		}
	}
}
</script>
