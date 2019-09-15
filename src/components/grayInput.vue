<template>
  <el-input
    :disabled="disabled"
    class="gray-input"
    :placeHolder="placeHolder"
    v-model="model"
    @input="setModel"
    :maxlength="maxLength"
    :type="inputType"
    :rows="3"
    :show-word-limit="inputType=='textarea'"
    clearable>
  </el-input>
</template>

<script>
import { Input } from 'element-ui';
	export default {
		name:'grayInput',
		components: {
		  'el-input':Input,
		},
		data(){
			return {
				model:"",
			}
		},
		props:{
			value:{
				type:String,
				required:false,
			},
			  placeHolder:{
				type:String,
				required:false,
			  },
			  maxLength:{
				type:String,
				required:false,
			  },
			  inputType:{
				type:String,
				required:false,
				default:"text"
			  },
			  disabled:{
				type:Boolean,
				required:false,
				default:false
			  },
		},
		watch: {
		  value(newValue, oldValue) {
			this.model = newValue;
		  }
		},
		methods: {
		  setModel(){
			this.$emit("input",this.model);
		  }
		},
		mounted(){
		  this.model = this.value;
		}
	}
</script>
<style>
  .gray-input input,.gray-input textarea,.gray-input .el-input__count{
    background-color: #EFEFEF !important;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    outline: none !important;
    -webkit-appearance:none !important;
    padding: 20px;
  }
  .gray-input input:focus,.gray-input textarea:focus{
    border-color:#eeeeee !important;
  }
</style>
