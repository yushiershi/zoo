<template>
	<div :class="'icon icon-'+iconType" :style="'width:'+size+';height:'+size">
	</div>
</template>

<script>
	export default {
		name:'icon',
		props:{
			iconType:{
				type:String,
				required:true
			},
			size:{
				type:String,
				required:false,
				default:'16px'
			}
		}
	}
</script>
<style scoped>
	.icon {
		vertical-align: middle;
		display: inline-block;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
		margin-top: -2px;
	}
</style>