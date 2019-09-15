<template>
    <zoo-content title="提交工单">
      <zoo-line-item label="联系信息">
        <zoo-gray-input inputType="tel" v-model="info.phone" placeHolder="请填写您的注册手机号码" maxLength="11"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="提交问题">
        <zoo-gray-input v-model="info.question" placeHolder="问题不超过100个字符" maxLength="100" inputType="textarea"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="上传截图">
        <zoo-upload-img :type="0" v-model="info.imgurl"></zoo-upload-img>
      </zoo-line-item>
      <div class="btn">
        <zoo-button label="确认提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
	import { addWorkOrder } from '../../utils/axios/api.js';
	export default {
		name:'gd',
		data(){
		  return {
			info:{},
		  }
		},
		methods: {
		  submit() {
			if(!new RegExp(this.$ptn.phone()).test(this.info.phone)){
				this.$message.error("请输入正确的手机号码");
				return;
			}
					if(!this.info.question){
						this.$message.error("问题描述不能为空");
						return;
					}
			let that = this;
			addWorkOrder({
			  "descript": this.info.question,
			  "imagesrc": this.info.imgurl,
			  "phone": this.info.phone,
			  "type": 0,
			}).then(res => {
			  that.$message.success("问题已经提交");
			  that.$router.go(-1);
			})
		  }
		},
	}
</script>
