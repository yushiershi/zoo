<template>
    <zoo-content title="ZOO币">
      <div class="my-point">
        <span style="font-size: 24px;">{{point}}</span>
        <zoo-button-white label="提取" type="medium" width="64px" @click="gotoPage('./tx')"></zoo-button-white>
      </div>
      <div class="zoo-point" v-infinite-scroll="load">
          <el-card shadow="never" :key="index" v-for="(item,index) in dataList" style="margin: 5px 0;">
            <div class="card-inner">
              <div style="card-left">
                <div class="text-media">{{item.content}}</div>
                <div class="text-small">{{item.createdAt}}</div>
              </div>
              <div style="card-right">
                <div class="text-big">{{item.cout}}</div>
              </div>
            </div>
          </el-card>
          <zoo-no-data v-show="pagenum>1&&dataList.length==0"></zoo-no-data>
       </div>
    </zoo-content>
</template>

<script>
import { Divider,InputNumber,Dialog } from 'element-ui';
	import { getPointList } from '../../utils/axios/api.js';
import buttonWhite from '../../components/buttonWhite';
	export default {
		name:'zoo',
		data(){
			return {
        point:0,
        dataList:[],
        pagenum:1,
        flag:true,
			}
		},
		components: {
		  'el-divider':Divider,
      'zoo-button-white':buttonWhite,
		},
    methods: {
      gotoPage(url) {
        this.$router.push(url);
      },
      load(){
        if(this.flag){
          let that = this;
          getPointList({
            count:this.$store.state.pagesize,
            page:this.pagenum,
            type:1,
          }).then(res => {
            that.pagenum++;
            that.point = res.data.extras.zoo;
            if(res&&res.data&&res.data.array){
              that.dataList = that.dataList.concat(res.data.array);
            }
          })
        }
      },
    },
    mounted(){
      this.flag = true;
    },
    activated(){
      this.flag = true;
    },
    destroyed(){
      this.flag = false;
    },
    deactivated(){
      this.flag = false;
    },
	}
</script>

<style scoped>
  .my-point{
    margin: 10px 0 30px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 28px;
  }
  .my-point span{
    font-size: 16px;
    color: #333333;
  }
  .button-row{
    display: flex;
    justify-content: center;
  }
  .point-button{
      margin: 0 20px;
   }
   .info-row{
     margin: -15px 20px 20px 20px;
     width: calc(100% - 40px);
   }
   .left-side{
     display: inline-block;
     vertical-align: top;
     margin-top: 4px;
   }
   .right-side{
      display: inline-block;
   }
   .text-small{
     line-height: 22px;
     color: #131313;
     font-weight: 400px;
   }
   .text-media{
      font-size: 14px;
      line-height: 24px;
      font-weight: bolder;
   }
   .text-big{
      font-size: 18px;
      font-weight: bolder;
   }
   .card-inner{
     width: 100%;
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   .zoo-point {
     background: #F5F5F5;
     width: 100vw;
     padding: 5px 0;
     overflow: auto;
     height: calc(100vh - 172px);
   }
</style>
