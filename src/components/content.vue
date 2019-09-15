<template>
	<div class="content">
    <div class="header">
      <zoo-icon iconType="back" size="28px" class="back-icon" @click.native="$router.go(-1)"></zoo-icon>
      {{title}}
      <el-divider v-if="hasDivider"></el-divider>
    </div>
    <div class="main-content" :style="hasDivider?'height:calc(100vh - 66px);':'margin-top:-15px;height:calc(100vh - 51px);'">
       <slot></slot>
    </div>
	</div>
</template>

<script>
import { Divider } from 'element-ui';
	export default {
		name:'zooContent',
		components: {
		  'el-divider':Divider,
		},
		props:{
			title:{
				type:String,
				required:false
			},
			hasDivider:{
				type:Boolean,
				required:false,
        default:true,
			},
		},
	}
</script>
<style scoped>
  .content{
    width: 100vw;
    height: calc(100vh - 10px);
    margin: -20px -10px -10px -10px;
    overflow: visible;
    z-index: 0;
  }
  .header{
    position: relative;
    width: 100vw;
    margin: 20px 0;
    height: 32px;
    text-align: center;
    font-size: 16px;
    padding-top: 4px;
    z-index: 0;
  }
  .back-icon{
    position: absolute;
    left: 10px;
    top: 6px;
  }
  .main-content{
    width: 100vw;
    overflow: visible;
    z-index: 1;
  }
</style>
<style>
  .header .el-divider{
    margin: 18px 0!important;
  }
</style>
