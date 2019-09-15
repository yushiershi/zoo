<template>
  <div class="my-index">
  	<div class="logo-header">
  		我的钱包
		<div class="right-icon">
			<zoo-icon iconType="mine-set" size="18px" @click.native="gotoPage('./config')"></zoo-icon>
		</div>
  	</div>
	<zoo-common-card style="margin: -5px 0 30px 0 !important;">
		<div class="my-info-header">
			<div class="header-text">
				<zoo-icon iconType="mine-headimg" size="36px" style="margin-right: 10px;"></zoo-icon>
				ID/手机：{{user.phone}}
			</div>
			<div class="header-text">{{user.isverification!=1?'已实名验证':(user.isverification==2?'实名审核中':'未实名验证')}}</span></div>
		</div>
	</zoo-common-card>
	<div class="my-line">
		<zoo-card-line class="half-line" @click.native="gotoPage('./zoo')">
			zoo币：{{user.zooconin}}
		</zoo-card-line>
		<zoo-card-line class="half-line" @click.native="gotoPage('./point')">
			积分：{{user.integral}}
		</zoo-card-line>
		<zoo-card-line class="half-line" @click.native="gotoPage('./profit')">
			推荐收益：{{user.profitrecommand}}
		</zoo-card-line>
		<zoo-card-line class="half-line" @click.native="gotoPage('./profitAll')">
			累计收益：{{user.profitsum}}
		</zoo-card-line>
		<zoo-card-line class="half-line">
			总资产：{{user.property}}
		</zoo-card-line>
		<zoo-card-line class="half-line">
			等级：{{user.level}}
		</zoo-card-line>
	</div>
	<zoo-common-card style="margin: 10px 0 !important;">
		<div class="my-info-header">
			<div class="flex-item" @click="gotoPage('./lyList')">
				<zoo-icon iconType="animal-log" size="36px" :class="user.tagappoint?'red-dot':''"></zoo-icon>
				<div class="flex-item-text">领养记录</div>
			</div>
			<div class="flex-item" @click="gotoPage('./zrList')">
				<zoo-icon iconType="animal-interactive" size="36px" :class="user.tagtransfer?'red-dot':''"></zoo-icon>
				<div class="flex-item-text">转让记录</div>
			</div>
			<div class="flex-item" @click="gotoPage('./yyList')">
				<zoo-icon iconType="animal-signin" size="36px"></zoo-icon>
				<div class="flex-item-text">预约记录</div>
			</div>
		</div>
	</zoo-common-card>
	<zoo-common-card style="margin: 10px 0 -10px 0 !important;">
		<div class="my-info-header">
			<div class="flex-item" @click="gotoPage('./safe')">
				<zoo-icon iconType="security" size="36px"></zoo-icon>
				<div class="flex-item-text">安全中心</div>
			</div>
			<div class="flex-item" @click="verification">
				<zoo-icon iconType="verification" size="36px"></zoo-icon>
				<div class="flex-item-text">实名认证</div>
			</div>
			<div class="flex-item" @click="gotoPage('./card')">
				<zoo-icon iconType="card-bag" size="36px"></zoo-icon>
				<div class="flex-item-text">我的银行卡</div>
			</div>
			<div class="flex-item" @click="gotoPage('./group')">
				<zoo-icon iconType="my-group" size="36px"></zoo-icon>
				<div class="flex-item-text">我的团队</div>
			</div>
			<div class="flex-item" @click="gotoPage('./invite')">
				<zoo-icon iconType="share" size="36px"></zoo-icon>
				<div class="flex-item-text">邀请好友</div>
			</div>
			<div class="flex-item" @click="gotoPage('./msg')">
				<zoo-icon iconType="my-notice" size="36px"></zoo-icon>
				<div class="flex-item-text">系统消息</div>
			</div>
		</div>
	</zoo-common-card>
  </div>
</template>

<script>
	import { getPersonInfo } from '../../utils/axios/api.js';
	export default {
		name:'myIndex',
		data(){
			return {
				user:{}
			}
		},
		methods: {
      verification(){
        if(this.user.isverification!=1){
          if(this.user.isverification==2){
            this.$message.info("您的实名信息正在审核中，请耐心等待。");
          }else{
            this.$message.info("您已通过实名认证，不需要再次认证。");
          }
          return;
        }
        this.gotoPage('./verification');
      },
			getPersonInfo() {
				let that = this;
				getPersonInfo().then(res => {
					that.user = res.data;
				})
			},
      gotoPage(url) {
        this.$router.push(url);
      }
		},
		mounted(){
			this.$util.doStopReturn();
			this.getPersonInfo();
		},
		destroyed() {
			this.$util.removeStopReturn();
		},
	}
</script>

<style scoped>
	.logo-header{
		background-color: #111a44;
		margin: -10px -10px 20px -10px;
		width: 100%;
		padding: 5px 10px;
		position: relative;
		text-align: center;
		color: white;
		line-height: 40px;
		font-size: 16px;
	}
	.right-icon{
		position: absolute;
		right: 26px;
		top:0;
		bottom: 0;
		line-height: 50px;
		vertical-align: middle;
		cursor: pointer;
	}
	.my-info-header{
		line-height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
	}
	.header-text,.header-text span{
		color: #4f4e4e;
		font-size: 12px;
	}
	.mine-headimg,.header-text{
		margin: 0 5px;
	}
	.my-line{
		display: flex;
    flex-grow: 0.5;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
	}
	.half-line{
    width: 50%;
	}
	.flex-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: calc(33.33% - 2px);
		margin: 10px 0;
		cursor: pointer;
	}
	.flex-item-text{
		color: #4f4e4e;
		margin-top: 5px;
	}
	.red-dot{
		position: relative;
	}
	.red-dot::after{
		position: absolute;
		content: "";
		left: 0;
		top: 0;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: red;
	}
</style>
<style>
  .half-line .el-card{
    margin: 0 5px 10px !important;
    width: calc(100% - 15px) !important;
  }
</style>
