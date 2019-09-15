<template>
    <zoo-content title="转赠">
      <zoo-line-item label="转赠对象手机号码">
        <zoo-gray-input inputType="tel" v-model="info.phone" placeHolder="请填写转赠对象手机号码" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="转赠积分">
        <zoo-gray-input inputType="number" v-model="info.point" placeHolder="请填写转赠积分" maxLength="5"></zoo-gray-input>
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
	import { giving } from '../../utils/axios/api.js';
	export default {
		name:'gd',
    data(){
      return {
        info:{},
        show1:false,
      }
    },
    methods: {
      submit() {
        if(!new RegExp(this.$ptn.phone()).test(this.info.phone)){
        	this.$message.error("请输入正确的手机号码");
        	return;
        }
				if(!new RegExp(this.$ptn.positive_interger()).test(this.info.point)){
					this.$message.error("积分必须为正整数");
					return;
				}
				if(!this.info.cashpass){
					this.$message.error("资产密码不能为空");
					return;
				}
        let that = this;
        giving({
          "paypwd": this.info.cashpass,
          "phone": this.info.phone,
          "cout": this.info.point,
        }).then(res => {
          if(res.status.errCode===200){
            that.$message.success("转赠成功");
            that.$router.go(-1);
          }
        })
      }
    },
	}
</script>
