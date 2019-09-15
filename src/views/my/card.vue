<template>
  <zoo-content title="设置">
    <div class="info-line">
      实名基本条件温馨提示：需要添加两种或以上正确收款方式才给予审核通过！只有一种，不给予通过！
    </div>
    <zoo-list-line style="margin-top: -10px;font-weight: normal !important;" @click.native="zfbFlag=!zfbFlag"
      :iconType="zfbFlag?'cc-down':'go'">
      支付宝<div class="right-float">{{data.alipayAccount||'未完善'}}</div>
    </zoo-list-line>
    <div class="list-content" v-show="zfbFlag">
      <zoo-line-item label="支付宝账号">
        <zoo-gray-input inputType="text" v-model="zfb.account" placeHolder="请输入账号" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="收款人">
        <zoo-gray-input inputType="text" v-model="zfb.name" placeHolder="请输入收款人" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="收款二维码">
        <zoo-upload-img :type="1" v-model="zfb.imageSrc"></zoo-upload-img>
      </zoo-line-item>
    </div>
    <zoo-list-line style="font-weight: normal !important;" @click.native="wxFlag=!wxFlag"
      :iconType="wxFlag?'cc-down':'go'">
      微信<div class="right-float">{{data.wechatAccount||'未完善'}}</div>
    </zoo-list-line>
    <div class="list-content" v-show="wxFlag">
      <zoo-line-item label="微信账号">
        <zoo-gray-input inputType="text" v-model="wx.account" placeHolder="请输入账号" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="收款人">
        <zoo-gray-input inputType="text" v-model="wx.name" placeHolder="请输入收款人" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="收款二维码">
        <zoo-upload-img :type="2" v-model="wx.imageSrc"></zoo-upload-img>
      </zoo-line-item>
    </div>
    <zoo-list-line style="font-weight: normal !important;" @click.native="cardFlag=!cardFlag"
      :iconType="cardFlag?'cc-down':'go'">
      银行卡<div class="right-float">{{data.bank||'未完善'}}</div>
    </zoo-list-line>
    <div class="list-content" v-show="cardFlag">
      <zoo-line-item label="银行卡账号">
        <zoo-gray-input inputType="text" v-model="card.bankaccount" placeHolder="请输入账号" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="收款人">
        <zoo-gray-input inputType="text" v-model="card.name" placeHolder="请输入收款人" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="开户银行">
        <zoo-gray-input inputType="text" v-model="card.bank" placeHolder="请输入开户银行" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="支行">
        <zoo-gray-input inputType="text" v-model="card.bankname" placeHolder="请输入支行名称" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <el-divider></el-divider>
    </div>
    <div class="list-content" v-if="!data.alipayAccount||!data.wechatAccount||!data.bank">
      <zoo-line-item label="手机号码">
        <zoo-gray-input inputType="tel" v-model="user.phone" placeHolder="请输入手机号码" maxLength="30"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="资金密码">
        <zoo-gray-input :inputType="show1?'text':'password'" v-model="user.paypwd" placeHolder="请输入资金密码" maxLength="11">
          <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
        </zoo-gray-input>
      </zoo-line-item>
    </div>
    <zoo-button type="big" label="保存" @click="save" v-if="!data.alipayAccount||!data.wechatAccount||!data.bank"></zoo-button>
  </zoo-content>
</template>

<script>
  import listLine from '../../components/listLine';
import { Divider } from 'element-ui';
	import { creditinfo,payInfo } from '../../utils/axios/api.js';
	export default {
		name:'card',
    components: {
      'zoo-list-line':listLine,
		  'el-divider':Divider,
    },
    data(){
			return {
        data:{},
        zfbFlag:false,
        zfb:{},
        wxFlag:false,
        wx:{},
        cardFlag:false,
        card:{},
        user:{},
        show1:false,
        bankData:[],
        showBankFlag:false,
			}
		},
    methods: {
      gotoPage(url) {
        this.$router.push(url);
      },
      creditinfo(){
        let that = this;
        creditinfo().then(res => {
          that.data = res.data;
          that.zfb.account=res.data.alipayAccount;
          that.zfb.name=res.data.alipayName;
          that.zfb.imageSrc=res.data.alipaySrc;
          that.wx.account=res.data.wechatAccount;
          that.wx.name=res.data.wechatName;
          that.wx.imageSrc=res.data.wechatSrc;
          that.card.bankaccount=res.data.account;
          that.card.name=res.data.bankUsername;
          that.card.bank=res.data.bank;
          that.card.bankname=res.data.bankName;
        })
       },
       save(){
         if(!new RegExp(this.$ptn.phone()).test(this.user.phone)){
         	this.$message.error("请输入正确的手机号码");
         	return;
         }
         if(!this.user.paypwd){
         	this.$message.error("密码不能为空");
         	return;
         }
         if(!this.checkEdit()){
           return;
         }
         let arr = [];
         if(this.checkZfb()){
           arr.push('支付宝');
         }
         if(this.checkWx()){
           arr.push('微信');
         }
         if(this.checkCard()){
           arr.push('银行卡');
         }
         if(arr.length==[]){
           this.$message.error("至少填写一种收款方式！");
           return;
         }
         let str;
         if(arr.length==3){
           str = "支付宝、微信和银行卡";
         }else if(arr.length==2){
           str = arr.join("和")
         }else{
           str = arr[0];
         }
         let that = this;
         this.$msgbox.confirm("您即将提交"+str+"信息，是否确认？","提示",{
           callback:function(action, instance){
             if(action=='confirm'){
               if(that.checkZfb()){
                 payInfo({
                   phone:that.user.phone,
                   paypwd:that.user.paypwd,
                   type:1,
                   ...that.zfb
                 })
               }
               if(that.checkWx()){
                 payInfo({
                   phone:that.user.phone,
                   paypwd:that.user.paypwd,
                   type:0,
                   ...that.wx
                 })
              }
               if(that.checkCard()){
                 payInfo({
                   phone:that.user.phone,
                   paypwd:that.user.paypwd,
                   type:2,
                   ...that.card
                 })
               }
               that.$message.success("提交成功，请耐心等待工作人员审核。");
               that.$router.go(-1);
              }
            }
         })
       },
       checkEdit(){
         if(this.data.alipayAccount){
           if(this.zfb.account!=this.data.alipayAccount
            ||this.zfb.name!=this.data.alipayName
            ||this.zfb.imageSrc!=this.data.alipaySrc){
             if(!this.zfb.account||!this.zfb.name||!this.zfb.imageSrc){
               this.$message.error("您修改了支付宝账号信息，但是并未填写完整，请修改后再提交。");
               return false;
             }
           }
         }
         if(this.data.wechatAccount){
           if(this.wx.account!=this.data.wechatAccount
            ||this.wx.name!=this.data.wechatName
            ||this.wx.imageSrc!=this.data.wechatSrc){
             if(!this.wx.account||!this.wx.name||!this.wx.imageSrc){
               this.$message.error("您修改了微信账号信息，但是并未填写完整，请修改后再提交。");
               return false;
             }
           }
         }
         if(this.data.bank){
           if(this.card.bankaccount!=this.data.bankNum
            ||this.card.name!=this.data.bankUsername
            ||this.card.bank!=this.data.bank
            ||this.card.bankname!=this.data.bankName){
             if(!this.card.bankaccount||!this.card.name||!this.card.bank||!this.card.bankname){
               this.$message.error("您修改了银行卡账号信息，但是并未填写完整，请修改后再提交。");
               return false;
             }
           }
         }
         return true;
       },
       checkZfb(){
         if(this.data.alipayAccount){
           if(this.zfb.account==this.data.alipayAccount
            &&this.zfb.name==this.data.alipayName
            &&this.zfb.imageSrc==this.data.alipaySrc){
              return false;
           }
         }
         if(!this.zfb.account||!this.zfb.name||!this.zfb.imageSrc){
           return false;
         }
         return true;
       },
       checkWx(){
         if(this.data.wechatAccount){
           if(this.wx.account==this.data.wechatAccount
            &&this.wx.name==this.data.wechatName
            &&this.wx.imageSrc==this.data.wechatSrc){
              return false;
           }
         }
         if(this.data.wechatAccount){
           return false;
         }
         if(!this.wx.account||!this.wx.name||!this.wx.imageSrc){
           return false;
         }
         return true;
       },
       checkCard(){
         if(this.data.bank){
           if(this.card.bankaccount==this.data.bankNum
            &&this.card.name==this.data.bankUsername
            &&this.card.bank==this.data.bank
            &&this.card.bankname==this.data.bankName){
              return false;
           }
         }
         if(!this.card.bankaccount||!this.card.name||!this.card.bank||!this.card.bankname){
           return false;
         }
         return true;
       }
    },
    mounted(){
      this.creditinfo();
    }
	}
</script>

<style scoped>
  .info-line{
    background-color: #fffac7;
    color: #ff6e17;
    font-size: 16px;
    margin: -13px 0 20px 0;
    padding: 10px 15px;
    line-height: 32px;
  }
  .right-float{
    float: right;
    font-size: 16px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: keep-all;
    word-wrap: normal;
  }
</style>
