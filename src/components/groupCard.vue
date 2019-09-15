<template>
	<div class="animal-card">
		<el-card>
      <div class="animal-card-inner">
        <div class="flex-left" style="width: 40px;">
          <zoo-icon iconType="player" size="40px"></zoo-icon>
        </div>
        <div class="flex-center" style="width: calc(100% - 56px);">
          <div class="flex-left">
            <div class="flex-top">{{data.isverification?'认证玩家':'普通玩家'}}</div>
            <div class="flex-bottom">ID&nbsp;{{data.phone}}</div>
          </div>
          <div class="flex-right">
            <div class="flex-top">{{data.count}}人</div>
            <div class="flex-bottom">团队人数</div>
          </div>
        </div>
      </div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name:'groupCard',
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
	.animal-card-inner{
		width: 100%;
		display: flex;
		justify-content: space-between;
    align-items: center;
	}
  .flex-left{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .flex-center{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-right{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  .flex-top{
    font-weight: bolder;
    font-size: 16px;
  }
  .flex-bottom{
    font-size: 14px;
  }
</style>
<style>
	.animal-card .el-card{
		border-radius: 8px !important;
	}
	.animal-card .el-card__body{
		padding: 10px 20px !important;
	}
</style>
