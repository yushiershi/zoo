<template>
    <zoo-content title="线上客服">
      <zoo-card-line class="question-line" :key="index" v-for="(item,index) in dataList"
        @click.native="gotoOnline(item)">
          <div class="question-text">{{item}}</div>
      </zoo-card-line>
    </zoo-content>
</template>

<script>
	export default {
		name:'kf',
		data(){
			return {
				dataList:['领养问题','充值问题','账户问题','实名问题','其他问题','社区问题'],
			}
		},
    methods: {
      gotoOnline(question) {
        this.$router.push({path:"./online",query:{ask:question}});
      }
    },
	}
</script>

<style scoped>
  .question-line{
    margin: 20px 20px;
    width: calc(100vw - 40px);
  }
  .question-line:first-child{
    margin-top: 40px;
  }
  .question-text{
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
</style>
