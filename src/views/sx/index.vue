<template>
  <div>
	<div class="logo-header">
		<img src="../../assets/img/sx/logo_header.png" style="width: 25%;"/>
		<div class="zoo-text">
			CHINESE<br/>ZOOZOO
		</div>
	</div>
  	<div class="logo">
		<img src="../../assets/img/sx/home_banner.png" style="width: 100%;"/>
	</div>
	<div class="animal-list">
		<zoo-animal-card :key="index" @research="getZooList"
			v-for="(item,index) in animalList"
			:data="item"></zoo-animal-card>
	</div>
  </div>
</template>

<script>
	import { getZooList } from '../../utils/axios/api.js';
	import animalCard from '../../components/animalCard';
	export default {
		name:'sxIndex',
		components: {
			'zoo-animal-card':animalCard,
		},
		data(){
			return {
				animalList:[]
			}
		},
		methods: {
			getZooList() {
				let that = this;
				getZooList().then(res => {
					that.animalList = res.data;
				})
			}
		},
		mounted(){
			this.$util.doStopReturn();
			this.getZooList();
		},
		destroyed() {
			this.$util.removeStopReturn();
		},
	}
</script>

<style scoped>
	.animal-list{
		width: 100%;
		margin: 5px 0;
	}
	.logo-header{
		background-color: #111a44;
		margin: -10px -10px 20px -10px;
		padding: 5px 10px;
		position: relative;
	}
	.zoo-text{
		position: absolute;
		top: 0;
		right: 20px;
		bottom: 0;
		color: white;
		font-weight: 600;
		letter-spacing:1px;
		font-family: arial;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	* {
		font-size: 12px;
	}
</style>
