<template>
  <div class="content">
    <div class="header">
      <zoo-icon iconType="back" size="28px" class="back-icon" @click.native="$router.go(-1)"></zoo-icon>
      在线客服
      <el-divider></el-divider>
    </div>
    <div class="main-content">
       <div class="logo-header" v-show="showHeaderFlag">
         <zoo-icon iconType="my-headimg" size="50px" class="left-icon"></zoo-icon>
        <div class="zoo-text">
          <div class="flex-inner">
             <span style="font-size: 16px; line-height: 24px;">智能小小</span>
             <span style="font-size: 12px; line-height: 16px;margin-top: 3px;">163428</span>
           </div>
           <div class="flex-inner">
             <span>
               <zoo-icon size="18px" :iconType="voiceFlag?'volume-open':'volume-close'" @click.native="voiceFlag = !voiceFlag"></zoo-icon>
               <zoo-icon size="18px" iconType="close" @click.native="showHeaderFlag = false"></zoo-icon>
             </span>
           </div>
        </div>
       </div>
       <div class="chat-content">
          <div class="time-line">{{nowtime}}</div>
         <div :key="index" v-for="(item,index) in dataList"
          :class="item.type=='user'?'user-line':'kf-line'">
           <div v-if="item.type=='kf'" class="chat-name">
             智能小小
           </div>
           <div class="chat-text">
             {{item.content}}
           </div>
         </div>
         <div class="input-area">
           <zoo-gray-input v-model="ask" placeHolder="在此输入..." maxLength="100" inputType="textarea"></zoo-gray-input>
           <zoo-button-gray label="发送" class="send-button" type="small" width="50px" @click="sendChat"></zoo-button-gray>
         </div>
       </div>
    </div>
  </div>
    </div>
</template>

<script>
import { Divider } from 'element-ui';
import buttonGray from '../../components/buttonGray';
	import { getFagList } from '../../utils/axios/api.js';
	export default {
		name:'online',
		components: {
		  'el-divider':Divider,
      'zoo-button-gray':buttonGray,
		},
		data(){
			return {
        ask:"",
        dataList:[
          {
            type:'kf',
            content:'您好，我是zoo智能客服机器人，请问有什么能帮到您吗？Hello, I am zoo,can I help you?',
          },
        ],
        voiceFlag:true,
        showHeaderFlag:true,
        nowtime:'今天 '+this.$util.formatDate(new Date(),'hh:mm'),
			}
		},
    methods: {
      sendChat(){
        if(!this.ask){
          this.$message.error("提问不能为空");
          return;
        }
        this.getFagList(this.ask);
        this.ask = "";
      },
      getFagList(ask){
        this.dataList.push({
          type:'user',
          content:ask,
        })
        let that = this;
        getFagList({
          ask:ask
        }).then(res => {
          if(res.status.errCode===200){
            that.dataList.push({
              type:'kf',
              content:res.data,
            })
          }else{
            that.dataList.push({
              type:'kf',
              content:'对不起，找不到相关回答，您可以换个关键字重新查询。',
            })
          }
        }).catch(res => {
          that.dataList.push({
            type:'kf',
            content:'对不起，找不到相关回答，您可以换个关键字重新查询。',
          })
        })
      },
    },
    mounted(){
      this.getFagList(this.$route.query.ask);
    }
	}
</script>

<style scoped>
  .content{
    width: 100vw;
    height: calc(100vh - 10px);
    margin: -20px -10px -10px -10px;
  }
  .header{
    position: relative;
    width: 100vw;
    margin: 20px 0;
    height: 32px;
    text-align: center;
    font-size: 16px;
    padding-top: 4px;
  }
  .back-icon{
    position: absolute;
    left: 10px;
    top: 6px;
  }
  .main-content{
    width: 100vw;
    margin: -12px 0 0 0;
    height: calc(100vh - 54px);
    overflow: auto;
  }
  .logo-header{
  	background-color: #5e5e5e;
  	margin: 0;
  	padding: 20px 30px 10px 30px;
  	position: relative;
    z-index: 99;
  }
  .left-icon{
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .zoo-text{
  	display: flex;
  	align-items: flex-start;
  	justify-content: space-between;
    width: calc(100vw - 99px);
    margin-left: 50px;
  	height: 40px;
  }
  .zoo-text * {
    color: white;
  }
  .flex-inner{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .chat-content{
    width: calc(100% - 60px);
    padding: 20px 30px 120px 30px;
    height: calc(100vh - 284px);
    overflow: auto;
  }
  .time-line{
    width: 100%;
    text-align: center;
    color: #9e9e9e;
  }
  .chat-name{
    color: #868d8f;
    line-height: 28px;
  }
  .user-line{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .user-line .chat-text{
    color: #868d8f;
    background-color: #efefef;
    border-radius: 8px;
    padding: 10px 20px;
    position: relative;
  }
  .user-line .chat-text:after{
    content:"";
    position: absolute;
    right: -20px;
    top: 10px;
    border: 5px solid;
    border-color: transparent transparent transparent #efefef;
    transform: scaleX(3);
  }
  .kf-line{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .kf-line .chat-text{
    color: #302f2f;
    background-color: #e0ffd8;
    border-radius: 8px;
    padding: 10px 20px;
    position: relative;
  }
  .kf-line .chat-text:after{
    content:"";
    position: absolute;
    left: -20px;
    top: 10px;
    border: 5px solid;
    border-color: transparent #e0ffd8 transparent transparent;
    transform: scaleX(3);
  }
  .input-area{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .send-button{
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>
<style>
  .chat-content .el-input__count{
    right: 20px !important;
  }
</style>
