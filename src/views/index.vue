<template>
	<div></div>
</template>

<script>
	import { getSessionid } from '../utils/axios/api.js';
	export default {
		name:'index',
		beforeCreate(){
			let that = this;
			getSessionid().then(res => {
				that.$store.commit(that.$types.LOGOUT);
				that.$router.push("/login");
			}).catch(res => {
				that.$store.commit(that.$types.LOGIN,true);
				that.$router.push("/sx/index");
			})
		}
	}
</script>

<style>
</style>
