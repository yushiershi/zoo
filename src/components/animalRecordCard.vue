<template>
	<div class="animal-card">
		<el-card class="animal-card-inner">
			<div class="header-line">
				<span class="line-title">宠物编号：</span>
				<span class="line-text">{{data.iD}}</span>
			</div>
			<div class="animal-hr"></div>
			<div class="each-line">
				<span class="line-title">宠物：</span>
				<span class="line-text">{{data.name}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">价值：</span>
				<span class="line-text">{{data.value}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">智能合约收益：</span>
				<span class="line-text">{{data.gainprofitperday}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">获得收益：</span>
				<span class="line-text">{{data.dayprofit?data.dayprofit:0}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">领养时间：</span>
				<span class="line-text">{{data.adopttime}}</span>
			</div>
      <div class="each-line">
        <slot></slot>
      </div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name:'animalRecordCard',
		data(){
			return {
			}
		},
		props:{
			data:{
				type:Object,
				required:true,
			},
		},
	}
</script>
<style scoped>
	.animal-card {
		cursor: pointer;
		width: calc(100% - 40px);
		margin: 10px 20px;
    line-height: 28px;
	}
  .animal-card:first-child{
    padding-top: 20px;
  }
	.animal-card-inner{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.each-line {
		width: 100%;
		text-align: left;
	}
	.animal-img{
		width: calc(100% - 58px);
	}
	.line-title{
		color: #949494;
		font-size: 16px;
	}
  .header-line span{
    font-weight: bolder;
  }
	.line-text {
		color: #4f4e4e;
		font-size: 16px;
		word-break: break-all;
		word-wrap: break-word;
	}
	.animal-hr{
		border-top: 1px solid #efefef;
		margin: 10px 0;
	}
  .line-right{
    display: inline-block;
    width: 50px;
  }
  .cnt-down{
    width: 100%;
    text-align: center;
    color: red;
  }
</style>
<style>
	.animal-card .el-card{
		border-radius: 8px !important;
	}
	.animal-card .el-card__body{
		padding: 20px !important;
	}
</style>
