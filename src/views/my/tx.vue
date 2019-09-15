<template>
    <zoo-content title="提现">
      <zoo-line-item label="提现积分">
        <zoo-gray-input inputType="number" v-model="info.point" placeHolder="请填写提现积分" maxLength="5"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="资产密码">
        <zoo-gray-input :inputType="show1?'text':'password'" v-model="info.cashpass" placeHolder="请填写资产密码" maxLength="16"></zoo-gray-input>
        <span slot="right">
          <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
        </span>
      </zoo-line-item>
      <div class="btn">
        <zoo-button label="确认提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
	import { discountzoo } from '../../utils/axios/api.js';
	export default {
		name:'gd',
    data(){
      return {
        data:{},
        info:{},
        img:null,
        show1:false,
      }
    },
    methods: {
      submit() {
				if(!new RegExp(this.$ptn.positive_interger()).test(this.info.point)){
					this.$message.error("积分必须为正整数");
					return;
				}
				if(!this.info.cashpass){
					this.$message.error("资产密码不能为空");
					return;
				}

        let that = this;
        discountzoo({
          "count": this.info.point,
          "paypwd": this.info.cashpass,
        }).then(res => {
          if(res.status.errCode===200){
            that.$message.success("提现信息已经提交，请耐心等待工作人员审核");
            that.$router.go(-1);
          }
        })
      },
    },
	}
</script>
<style scoped>
  .upload-img{
    width: 120px;
    height: 120px;
    border: 1px solid #eeeeee;
    background-color: #EFEFEF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .upload-img-show{
    width: 120px;
    height: 120px;
    border: 1px solid #eeeeee;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .close-img{
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -20px;
    background-color:#EFEFEF;
    border-radius:50px;
    border: 1px solid #eeeeee;
  }
</style>
