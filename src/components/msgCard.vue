<template>
	<div class="animal-card">
		<el-card class="animal-card-inner">
			<div class="header-line">
				<span class="line-title">系统消息：</span>
				<span class="line-text">{{data.updatedAt}}</span>
			</div>
			<div class="animal-hr"></div>
			<div class="each-line">
				<span class="line-title">{{data.title}}</span>
			</div>
			<div class="line-content" ref="outer" :style="showFlag?'':'max-height: 112px;'">
        <div class="each-line-content" ref="inner" v-html="data.content">
        </div>
			</div>
			<div class="line-more" v-show="!showFlag&&overflowFlag"
        @click="showFlag=true">
          点击查看更多
          <zoo-icon iconType="down"></zoo-icon>
			</div>
			<div class="line-more" v-show="showFlag" @click="showFlag=false">
          收回信息
          <zoo-icon iconType="up"></zoo-icon>
        </span>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name:'animalRecordCard',
		data(){
			return {
				showFlag:false,
				overflowFlag:false,
			}
		},
		props:{
			data:{
				type:Object,
				required:true,
			},
		},
		mounted(){
		  this.overflowFlag = parseInt(window.getComputedStyle(this.$refs.inner,null).height.replace('px',''))
			> parseInt(window.getComputedStyle(this.$refs.outer,null).height.replace('px',''));
		}
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
  .header-line span{
    color: #302F2F;
  }
	.each-line {
		width: 100%;
		text-align: left;
	}
  .line-content{
    overflow: hidden;
   }
	.line-title{
		color: #302F2F;
		font-size: 16px;
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
  .line-more{
    margin-top: 10px;
    margin-bottom: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
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
