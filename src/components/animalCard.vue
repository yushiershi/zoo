<template>
	<div class="animal-card">
		<el-card class="animal-card-inner">
			<div class="each-line">
				<span class="line-title">价值：</span>
				<span class="line-text">{{data.value}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">zoo币：</span>
				<span class="line-text">{{data.coin}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">积分：</span>
				<span class="line-text">{{data.integral}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">抢购开始时间：</span>
				<span class="line-text">{{data.begin}}</span>
			</div>
			<div class="each-line">
				<span class="line-title">智能合约收益：</span>
				<span class="line-text">{{data.profit}}</span>
			</div>
			<div class="animal-hr"></div>
			<div class="each-line">
				<img :src="data.imagesrc" class="animal-img"/>
        <div class="line-right-title">{{data.title}}</div>
        <div class="line-right">
          <!-- <div class="cnt-down" v-show="cnt>0">
            倒计时
          </div>
          <div class="cnt-down" v-show="cnt>0" style="margin-bottom: -10px;">
            {{cnt}}
          </div> -->
          <zoo-button @click="bespeak" :label="cnt>0?cnt+'':'预约'" type="small" style="width: 52px;" v-if="data.status===0" :disabled="cnt>0"></zoo-button>
          <zoo-button label="待领养" type="small" style="width: 52px;" v-if="data.status===1" :disabled="true"></zoo-button>
          <zoo-button label="繁殖中" type="small" style="width: 52px;" v-if="data.status===2" :disabled="true"></zoo-button>
          <zoo-button @click="buy" :label="cnt>0?cnt+'':'抢购'" type="small" style="width: 52px;" v-if="data.status===3" :disabled="cnt>0"></zoo-button>
        </div>
			</div>
		</el-card>
    <div class="animation" v-show="waitingFlag||successFlag||failFlag" @click.prevent @mousewheel.prevent>
        <div class="animation-inner">
          <marquee style="color: white;font-weight: bolder;" v-show="waitingFlag">等待开奖结果中...</marquee>
          <img v-onload="'./preload/waiting.gif'" v-show="waitingFlag"/>
          <img v-onload="'./preload/success.gif'" v-show="successFlag" style="margin-bottom: 20vh;"/>
          <img v-onload="'./preload/fail.gif'" v-show="failFlag" style="margin-bottom: 20vh;"/>
          <zoo-icon iconType="close" size="40px" class="close-icon" @click.native="closeAll" v-show="successFlag||failFlag"></zoo-icon>
        </div>
        <audio src='./preload/success.mp3' preload='auto' ref="success"></audio>
        <audio src='./preload/fail.mp3' preload='auto' ref="fail"></audio>
     </div>
	</div>
</template>

<script>
	import { bespeakAction,buyAction,result } from '../utils/axios/api.js';
	export default {
		name:'animalCard',
		data(){
			return {
        id:null,
				inter:null,
				cnt:0,
        successFlag:false,
        failFlag:false,
        waitingFlag:false,
			}
		},
		props:{
			data:{
				type:Object,
				required:true,
			},
		},
    watch: {
      'data.status'(newValue, oldValue) {
        if(newValue===3){
          this.cnt = 0;
        }
      }
    },
		methods: {
      closeAll(){
        this.waitingFlag = false;
        this.successFlag = false;
        this.failFlag = false;
      },
      getResult(){
        let that = this;
        result({
          ID:this.id,
          timestamp:new Date().getTime(),
        }).then(res => {
          that.$nextTick(() => {
            if(res.data=='jackpot'){
              that.waitingFlag = false;
              that.successFlag = true;
              that.$refs.success.play();
              that.$emit("research");
            }else if(res.data=='lose'){
              that.waitingFlag = false;
              that.failFlag = true;
              that.$refs.fail.play();
              that.$emit("research");
            }
          })
        })
      },
      buy(){
        if(this.data.status!==3){
          return;
        }
        let that = this;
        buyAction({
          petID:parseInt(this.data.iD),
          timestamp:new Date().getTime(),
        }).then(res => {
          that.id = res.data;
          that.waitingFlag = true;
        })
      },
			bespeak() {
        if(this.data.status!==0){
          return;
        }
        let that = this;
        bespeakAction({
          petID:parseInt(this.data.iD),
          timestamp:new Date().getTime(),
        }).then(res => {
          this.$emit("research");
        })
			},
			updateTime(){
        let datestr = this.$util.formatDate(new Date(),"yyyy/MM/dd")+" "+this.data.begin;
				let cnt = Math.ceil((new Date(datestr).getTime()-new Date().getTime())/1000)+2;
				if(cnt>0&&cnt<=120){
					this.cnt = cnt;
          return;
				}
        if(this.waitingFlag){
          this.cnt--;
          if(-this.cnt%60===0){
            this.getResult();
          }
          return;
        }
        if(this.data.status===2||this.data.status===3){
          this.cnt--;
          if(-this.cnt%60===0){
            this.$emit("research");
          }
          return;
        }
        if(cnt<=0){
          if(this.cnt === false){
            this.cnt = 0;
            this.$emit("research");
          }
          this.cnt = false;
        }
			}
		},
		mounted(){
			this.inter = setInterval(this.updateTime,1000);
      this.updateTime();
		},
    activated(){
      this.inter = setInterval(this.updateTime,1000);
      this.updateTime();
    },
    destroyed(){
      clearInterval(this.inter);
      this.inter = null;
    },
    deactivated(){
      clearInterval(this.inter);
      this.inter = null;
    }
	}
</script>
<style scoped>
	.animal-card {
		display: inline-block;
		cursor: pointer;
		width: calc(50% - 12px);
		margin: 10px 5px;
	}
	.animal-card-inner{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.each-line {
		width: 100%;
		text-align: left;
    position: relative;
	}
	.animal-img{
		width: calc(100% - 58px);
	}
	.line-title{
		color: #949494;
		font-size: 14px;
	}
	.line-text {
		color: #4f4e4e;
		font-size: 14px;
		font-weight: bolder;
		word-break: break-all;
		word-wrap: break-word;
	}
	.animal-hr{
		border-top: 1px dashed #949494;
		margin: 20px 0 10px 0;
	}
  .line-right{
    display: inline-block;
    width: 50px;
  }
  .cnt-down{
    width: 100%;
    text-align: center;
    color: red;
    line-height: 15px;
  }
  .animation{
    position: absolute;
    top: 0;/* calc(50vh - 170px); */
    left: 0;/* calc(50vw - 161px); */
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    z-index: 9;
  }
  .animation-inner{
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .animation-inner img{
    width: 320px;
  }
  .close-icon{
    position: absolute;
    background-color:#EFEFEF;
    border-radius:50px;
    border: 1px solid #eeeeee;
    top: calc(40vh - 140px);
    right: calc(50vw - 180px);
  }
  .line-right-title{
    position: absolute;
    left: calc(50% + 17px);
    right: 5px;
    top: -5px;
    text-align: center;
  }
</style>
<style>
	.animal-card .el-card{
		border-radius: 20px !important;
	}
	.animal-card .el-card__body{
		padding: 10px !important;
	}
</style>
