<template>
  <zoo-content title="转让详情">
	  <div class="item-line">
		  订单时间：
		  <span class="item-content">{{data.adopttime}}</span>
	  </div>
	  <div class="item-line">
		  转让方联系电话：
		  <span class="item-content">{{data.tranphone}}</span>
	  </div>
	  <div class="item-line">
		  领养方联系电话：
		  <span class="item-content">{{data.adophone}}</span>
	  </div>
	  <div class="item-line">
		  金额：
		  <span class="item-content">{{data.price}}元</span>
	  </div>
  </zoo-content>
</template>

<script>
	import { transfertrade } from '../../utils/axios/api.js';
	export default {
		name:'zrContent',
		data(){
			return {
        data:{},
			}
		},
		methods: {
      transfertrade(){
        let that = this;
        transfertrade({adpotID :this.$route.params.id}).then(res => {
          that.data = res.data;
        })
      }
		},
    mounted(){
      this.transfertrade();
    }
	}
</script>

<style scoped>
	.item-line{
		margin: 10px 25px;
    font-size: 16px;
    line-height: 20px;
	}
  .item-content{
    font-size: 16px;
    font-weight: bold;
  }
</style>
