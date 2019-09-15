<template>
    <zoo-content title="预约记录" :hasDivider="false">
      <div class="point-content" v-infinite-scroll="load">
          <el-card shadow="never" :key="index" v-for="(item,index) in dataList" style="margin: 5px 10px;">
            <div class="card-inner">
              <div style="card-left">
                <div class="text-big">{{item.title}}<span class="text-media">（{{item.isdeal===1?'未抢中':(item.isdeal===2?'已预约':'已抢购')}}）</span></div>
                <div class="text-media">{{item.createdAt}}</div>
              </div>
              <div style="card-right">
                <div class="text-media" style="text-align: right;">{{item.integral}}</div>
                <div class="text-media">花费积分</div>
              </div>
            </div>
          </el-card>
          <zoo-no-data v-show="pagenum>1&&dataList.length==0"></zoo-no-data>
       </div>
    </zoo-content>
</template>

<script>
	import { getBespList } from '../../utils/axios/api.js';
	export default {
		name:'yyList',
		data(){
			return {
				dataList:[],
        pagenum:1,
        flag:true,
			}
		},
    methods: {
      load(){
        if(this.flag){
          let that = this;
          getBespList({
            count:this.$store.state.pagesize,
            page:this.pagenum,
          }).then(res => {
            that.pagenum++;
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
   .point-content {
     background: #F5F5F5;
     width: 100vw;
     padding: 5px 0;
     overflow: auto;
     height: calc(100vh - 62px);
   }
   .text-small{
     color: #131313;
     font-weight: 400px;
   }
   .text-media{
      font-size: 16px;
      font-weight: normal;
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
      line-height: 32px;
   }
</style>
