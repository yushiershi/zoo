<template>
	<div :class="disabled||cnt>0?'button-'+type+' button-countdown':'button-'+type" :style="'width:'+width"
		@click="btnClick">
		<div v-show="cnt<=0">{{label}}</div>
		<div v-show="cnt>0">{{cnt}}</div>
	</div>
</template>

<script>
	export default {
		name:'zooButton',
		data(){
			return {
				cnt:0,
			}
		},
		props:{
			width:{
				type:String,
				required:false,
				default:'calc(100% - 80px)'
			},
			label:{
				type:String,
				required:false,
			},
			maxCount:{
				type:Number,
				required:false,
				default:3
			},
			type:{
				type:String,
				required:false,
				default:'big'
			},
			disabled:{
				type:Boolean,
				required:false,
				default:false
			},
		},
		methods: {
			btnClick() {
				if(this.disabled||this.cnt>0){
					return;
				}
				this.cnt = this.maxCount;
				setTimeout(this.countdown,1000);
				this.$emit("click");
			},
			countdown(){
				this.cnt--;
				if(this.cnt>0){
					setTimeout(this.countdown,1000);
				}
			},
			clearInterval(){
				this.cnt = 0;
			}
		},
	}
</script>
<style scoped>
	.button-big {
		vertical-align: middle;
		display: inline-block;
		background-color: white;
		text-align: center;
		padding: 8px 20px;
		margin: 20px;
		line-height: 28px;
		border-radius: 28px;
		cursor: pointer;
    border: 1px solid #673ab7;
	}
  .button-medium {
  	vertical-align: middle;
  	display: inline-block;
  	background-color: white;
  	text-align: center;
  	padding: 4px 0;
  	margin: 10px 0;
  	line-height: 20px;
  	border-radius: 20px;
  	cursor: pointer;
    border: 1px solid #673ab7;
  }
	.button-small {
		vertical-align: middle;
		display: inline-block;
		background-color: white;
		text-align: center;
		padding: 4px 0;
		margin: 10px 0;
		line-height: 18px;
		border-radius: 20px;
		cursor: pointer;
    border: 1px solid #673ab7;
	}
	.button-big div{
		color:#673ab7;
	}
  .button-medium div{
		font-size: 14px;
    color:#673ab7;
  }
	.button-small div{
		font-size: 12px;
		color:#673ab7;
	}
	.button-countdown{
		opacity: 0.3;
	}
	* {
		font-size: 16px;
	}
</style>
