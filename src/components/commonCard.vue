<template>
	<el-card class="common-card">
		<slot></slot>
	</el-card>
</template>

<script>
	export default {
		name:'commonCard',
	}
</script>
<style>
	.common-card.el-card{
		border-radius: 16px !important;
		margin: 0 !important;
	}
	.common-card .el-card__body{
		padding: 10px !important;
	}
</style>