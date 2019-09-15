<template>
    <zoo-content title="转赠">
      <zoo-line-item label="真实姓名">
        <zoo-gray-input inputType="text" v-model="info.name" placeHolder="请填写真实姓名" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="身份证号码">
        <zoo-gray-input inputType="text" v-model="info.idnumber" placeHolder="请填写身份证号码" maxLength="18"></zoo-gray-input>
      </zoo-line-item>
      <div class="btn">
        <zoo-button label="确认提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
	import { idinfo } from '../../utils/axios/api.js';
	export default {
		name:'verification',
    data(){
      return {
        info:{},
      }
    },
    methods: {
      submit() {
				if(!this.info.name){
					this.$message.error("姓名不能为空");
					return;
				}
        if(!new RegExp(this.$ptn.carid()).test(this.info.idnumber)){
        	this.$message.error("请输入正确的身份证号码");
        	return;
        }
        let that = this;
        idinfo(this.info).then(res => {
          if(res.status.errCode===200){
            that.$message.success("提交成功，请耐心等待工作人员审核。");
            that.$router.go(-1);
          }
        })
      }
    },
	}
</script>
