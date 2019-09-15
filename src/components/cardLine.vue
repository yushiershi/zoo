<template>
	<div class="card-line-outer">
	  <el-card class="card-line">
		  <div class="no-wrap">
			<slot></slot>
		  </div>
	  </el-card>
	</div>
</template>

<script>
	export default {
		name:'cardLine'
	}
</script>

<style scoped>
	.card-line-outer{
		width: 100%;
	}
</style>
<style>
	.card-line.el-card{
		width: 100% !important;
		line-height: 28px !important;
		border-radius: 28px !important;
		margin: 10px 0 !important;
	}
	.card-line .el-card__body{
		padding: 5px 15px !important;
	}
	.no-wrap {
		word-break: keep-all;
		word-wrap: no-wrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>