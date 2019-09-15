<template>
	<div class="no-data">
    <img src="../assets/img/no_data.png" style="width: 25vw;margin-bottom: 20px;">
    <div>{{text}}</div>
	</div>
</template>

<script>
	export default {
		name:'noData',
		props:{
			text:{
				type:String,
				required:false,
        default:'没有相关记录',
			}
		}
	}
</script>
<style scoped>
	.no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
	}
</style>
