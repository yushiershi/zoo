<template>
    <zoo-content title="系统消息" :hasDivider="false">
      <div class="point-content" v-infinite-scroll="load">
         <zoo-msg-card class="record-list"
           :key="index"
           :data="item"
           v-for="(item,index) in dataList">
         </zoo-msg-card>
         <zoo-no-data v-show="pagenum>1&&dataList.length==0"></zoo-no-data>
       </div>
    </zoo-content>
</template>

<script>
	import { sysmsg } from '../../utils/axios/api.js';
	import msgCard from '../../components/msgCard';
	export default {
		name:'group',
		data(){
			return {
				dataList:[],
        pagenum:1,
        flag:true,
			}
		},
		components: {
			'zoo-msg-card':msgCard,
		},
    methods: {
      load(){
        if(this.flag){
          let that = this;
          sysmsg({
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
</style>
