<template>
  <div class="service-index">
  	<div class="icon-item" style="margin-bottom: 6%;" @click="gotoPage('./kf')">
		<zoo-icon iconType="online-customer" size="120px"></zoo-icon>
		<div class="icon-text">线上客服</div>
	</div>
  	<div class="icon-item" style="margin-top: 6%;" @click="gotoPage('./gd')">
		<zoo-icon iconType="online-submission" size="120px"></zoo-icon>
		<div class="icon-text">在线工单提交</div>
	</div>
  </div>
</template>

<script>
	export default {
		name:'serviceIndex',
		data(){
			return {

			}
		},
    methods: {
      gotoPage(url) {
        this.$router.push(url);
      }
    },
    mounted(){
      this.$util.doStopReturn();
    },
		destroyed() {
			this.$util.removeStopReturn();
		},
	}
</script>

<style scoped>
	.service-index {
		position: absolute;
		top: 30px;
		left: 0;
		right: 0;
		bottom: 80px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.icon-item {
		text-align: center;
		cursor: pointer;
	}
	.icon-text {
		margin: 10px;
		text-align: center;
		color: #5d5d5d;
		font-size: 16px;
	}
</style>
