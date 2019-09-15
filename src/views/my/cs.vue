<template>
    <zoo-content title="资产出售">
      <zoo-line-item label="可出售资产">
        <zoo-gray-input inputType="text" :value="'推广收益('+$route.query.profit+')'" maxLength="100" :disabled="true"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="出售资产数量">
        <zoo-gray-input inputType="number" v-model="info.point" placeHolder="请输入出售资产的数量" maxLength="10"></zoo-gray-input>
      </zoo-line-item>
      <zoo-line-item label="资产密码">
        <zoo-gray-input :inputType="show1?'text':'password'" v-model="info.cashpass" placeHolder="请填写资产密码" maxLength="16"></zoo-gray-input>
        <span slot="right">
          <zoo-icon :iconType="show1?'password-eye-open':'password-eye-close'" @click.native="show1 = !show1"></zoo-icon>
        </span>
      </zoo-line-item>
      <zoo-line-item label="出售类型">
        <el-select v-model="info.type" placeholder="请选择出售类型" style="width: 100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </zoo-line-item>
      <div class="btn">
        <zoo-button label="确认提交" @click="submit"></zoo-button>
      </div>
    </zoo-content>
</template>

<script>
import { Select,Option } from 'element-ui';
	import { discount } from '../../utils/axios/api.js';
	export default {
		name:'cs',
    data(){
      return {
        data:{},
        info:{},
        show1:false,
        options:[
          {label:'积分',value:0},
          {label:'宠物',value:1},
        ]
      }
    },
    components: {
      'el-select':Select,
      'el-option':Option,
    },
    methods: {
      submit() {
				if(!parseFloat(this.info.point)||parseFloat(this.info.point)<=0){
					this.$message.error("出售资产数量必须大于0");
					return;
				}
        if(parseFloat(this.info.point)>parseFloat(this.$route.query.profit)){
          this.$message.error("出售资产数量不能大于推广收益值");
          return;
        }
				if(!this.info.cashpass){
					this.$message.error("资产密码不能为空");
					return;
				}
				if(!(this.info.type===0||this.info.type===1)){
					this.$message.error("出售类型不能为空");
					return;
				}

        let that = this;
        discount({
          "count": this.info.point,
          "paypwd": this.info.cashpass,
          "type": this.info.type,
        }).then(res => {
          if(res.status.errCode===200){
            that.$message.success("转让信息已经提交，请耐心等待工作人员审核");
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
