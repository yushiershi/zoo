<template>
    <zoo-content title="转让记录">
      <div class="tabs">
        <div @click="tabClick(0)" :class="tabIndex===0?'tab-selected':'tab-common'">待转让</div>
        <div @click="tabClick(1)" :class="tabIndex===1?'tab-selected':'tab-common'">转让中</div>
        <div @click="tabClick(2)" :class="tabIndex===2?'tab-selected':'tab-common'">已完成</div>
        <div @click="tabClick(3)" :class="tabIndex===3?'tab-selected':'tab-common'">取消/申诉</div>
      </div>
      <div class="tabs" style="margin-top: -20px;margin-bottom: 20px;">
        <div @click="tabClick(0)" :class="tabIndex===0?'tab-selected':'tab-common'">
          <span :class="tabIndex===0?'tab-selected-line':'tab-common-line'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div @click="tabClick(1)" :class="tabIndex===1?'tab-selected':'tab-common'">
          <span :class="tabIndex===1?'tab-selected-line':'tab-common-line'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div @click="tabClick(2)" :class="tabIndex===2?'tab-selected':'tab-common'">
          <span :class="tabIndex===2?'tab-selected-line':'tab-common-line'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div @click="tabClick(3)" :class="tabIndex===3?'tab-selected':'tab-common'">
          <span :class="tabIndex===3?'tab-selected-line':'tab-common-line'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <div class="main-area" ref="mainContent">
         <div class="tab-content" v-show="tabIndex===0"
          v-infinite-scroll="load(0)">
            <zoo-animal-card class="record-list"
              @click.native="gotoPage('./zrContent/'+item.iD)"
              :key="index"
              :data="item"
              v-for="(item,index) in list[0]">
            </zoo-animal-card>
            <zoo-no-data v-show="page[0]>1&&list[0].length==0"></zoo-no-data>
         </div>
         <div class="tab-content" v-show="tabIndex===1"
          v-infinite-scroll="load(1)">
            <zoo-animal-card class="record-list"
              @click.native="gotoPage('/my/zrDetail/'+item.iD)"
              :key="index"
              :data="item"
              v-for="(item,index) in list[1]">
              <div style="float: right;" @click.stop>
                <span v-show="item.cnt>0" style="vertical-align:middle;margin-right: 10px;">自动确认剩余<span style="color: red;">{{item.cnt}}</span>秒</span>
                <zoo-button type="medium" :label="textList[item.paystatus]" width="60px" style="margin-right: 16px;"
                   @click.native.stop="gotoPage('/my/zrDetail/'+item.iD)"></zoo-button>
                <zoo-button type="medium" label="申诉" width="60px" @click.native.stop="gotoPage('/service/gd')"></zoo-button>
              </div>
            </zoo-animal-card>
            <zoo-no-data v-show="page[1]>1&&list[1].length==0"></zoo-no-data>
         </div>
         <div class="tab-content" v-show="tabIndex===2"
          v-infinite-scroll="load(2)">
            <zoo-animal-card class="record-list"
              :key="index"
              :data="item"
              v-for="(item,index) in list[2]">
            </zoo-animal-card>
            <zoo-no-data v-show="page[2]>1&&list[2].length==0"></zoo-no-data>
         </div>
         <div class="tab-content" v-show="tabIndex===3"
          v-infinite-scroll="load(3)">
            <zoo-animal-card class="record-list"
              :key="index"
              :data="item"
              v-for="(item,index) in list[3]">
            </zoo-animal-card>
            <zoo-no-data v-show="page[3]>1&&list[3].length==0"></zoo-no-data>
         </div>
      </div>
    </zoo-content>
</template>

<script>
	import { adoptinfo } from '../../utils/axios/api.js';
	import animalCard from '../../components/animalRecordCard';
	export default {
		name:'zrList',
    components: {
    	'zoo-animal-card':animalCard,
    },
		data(){
			return {
        inter:null,
        tabIndex:0,
        list:[[],[],[],[]],
        page:[1,1,1,1],
        textList:['完成','未支付','已支付','待确认']
			}
		},
    methods: {
      getCount(datestr){
        if(!datestr){
          return 0;
        }
        return Math.ceil((new Date(datestr.replace(/-/,"/")).getTime()-new Date().getTime())/1000);
      },
      tabClick(index){
        this.tabIndex=index;
        if(this.page[index]>1){
          return;
        }
        this.load(index)();
      },
      gotoPage(url) {
        this.$router.push(url);
      },
      load(index){
        let that = this;
        return function(){
          if(index != that.tabIndex){
            return;
          }
          adoptinfo({
            count:that.$store.state.pagesize,
            page:that.page[index],
            type:1,
            transfersta:index,
          }).then(res => {
            that.page[index]++;
            if(res&&res.data&&res.data.array){
              that.$set(that.list,index,that.list[index].concat(res.data.array));
            }
          })
        }
      },
			updateTime(){
				for(let item of this.list[1]){
          this.$set(item,'cnt',this.getCount(item.autoconfirm));
        }
			}
    },
		mounted(){
			this.inter = setInterval(this.updateTime,1000);
      this.updateTime();
		},
    activated(){
      this.inter = setInterval(this.updateTime,1000);
      this.updateTime();
    },
    destroyed(){
      clearInterval(this.inter);
      this.inter = null;
    },
    deactivated(){
      clearInterval(this.inter);
      this.inter = null;
    },
	}
</script>

<style scoped>
	.tabs{
    width: 100vw;
    margin: 10px 0;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .tab-common{
    font-size: 16px;
    width: 25%;
    text-align: center;
  }
  .tab-selected{
    font-size: 18px;
    font-weight: bolder;
    width: 25%;
    text-align: center;
  }
  .tab-selected-line{
    border-bottom: 2px solid #333333;
    padding-bottom: 5px;
  }
  .main-area{
    width: 100vw;
    margin: 10px 0 0 0;
    background-color: #F2F1F1;
  }
  .tab-content{
    width: 100%;
    overflow: auto;
    height: calc(100vh - 120px);
  }
</style>
