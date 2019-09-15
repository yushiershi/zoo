<template>
	<div class="list-item">
    <zoo-icon :iconType="iconType" size="20px" style="float: right;margin-left: 10px;" v-if="rightFlag"></zoo-icon>
    <slot></slot>
	</div>
</template>

<script>
	export default {
		name:'icon',
		props:{
			rightFlag: {
				type: Boolean,
				required:false,
				default:true,
			},
			iconType: {
				type: String,
				required:false,
				default:'go',
			},
		}
	}
</script>
<style scoped>
  .list-item{
    width: calc(100vw - 40px);
    border-bottom: 1px solid #DCDFE6;
    font-size: 16px;
    color: #302f2f;
    line-height: 20px;
    padding: 16px 20px;
    font-weight: bolder;
  }
</style>
