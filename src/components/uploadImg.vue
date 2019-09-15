<template>
	<div>
    <div class="upload-img" v-show="!img">
      <input type="file" ref="file" accept="image/*" @change="fileChange" style="display: none;"/>
      <zoo-icon iconType="add" size="40px" @click.native="getFileClick"></zoo-icon>
    </div>
    <div class="upload-img-show" v-show="img">
        <img :src="img" style="width: 100%;"/>
        <zoo-icon iconType="close" size="40px" @click.native="deleteImg()" class="close-img"></zoo-icon>
    </div>
	</div>
</template>

<script>
	import { uploadImg } from '../utils/axios/api.js';
	export default {
		name:'uploadImg',
		data(){
			return {
				img:null,
			}
		},
		props:{
			value:{
				type:String,
				required:false,
			},
			type:{
				type:Number,
				required:false,
				default:0,
			},
		},
    watch: {
      value(newValue, oldValue) {
        this.img = newValue?(this.$store.state.imgUrl+newValue):null;
      }
    },
		methods: {
			getFileClick(){
			  this.$refs['file'].dispatchEvent(new MouseEvent('click'));
			},
			fileChange(){
			  let that = this;
			  let files = this.$refs.file.files;
			  if(!files||!files[0]){
			    return;
			  }
			  if(files[0].size>1024*1024*5){
			    this.$message.error("图片大小不能超过5M");
			    return;
			  }
			  const loading = this.$loading({
			    lock: true,
			    text: '图片上传中',
			  });
			  var reader = new FileReader();
			  reader.onload = function () {
			      that.img = this.result;
			  };
			  reader.readAsDataURL(files[0]);
			  let formdata = new FormData();
			  formdata.append('file', files[0]);
			  formdata.append("filename",that.$util.encodeAes(that.$store.state.userid+','+that.type));
			  uploadImg(formdata).then(res => {
			    that.$message.success("图片上传成功！");
			    loading.close();
				that.$emit("input",res.data)
			  });
			},
			deleteImg(){
			  this.img = null;
			  this.$message.success("图片已经删除");
				this.$emit("input",null);
			},
		},
    mounted(){
      this.img = this.value?(this.$store.state.imgUrl+this.value):null;
    }
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
