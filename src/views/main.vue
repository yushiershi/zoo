<template>
	<el-container>
		<el-main>
			<transition name="zoo-fade" mode="out-in">
				  <keep-alive :include="tagNavList">
				  		<router-view :key="$route.path+$store.state.timestamp"/>
				  </keep-alive>
			</transition>
		</el-main>
		<el-footer v-show="$route.meta.tabIndex">
			<div class="foot-tools">
				<div class="icon-tool" @click="gotoPage('/sx/index')">
					<zoo-icon :iconType="$route.meta.tabIndex==1?'index1-selected':'index1-unselected'"
						size="28px"></zoo-icon>
					<div class="tool-title">动物园</div>
				</div>
				<div class="icon-tool" @click="gotoPage('/service/index')">
					<zoo-icon :iconType="$route.meta.tabIndex==2?'index2-selected':'index2-unselected'"
						size="28px"></zoo-icon>
					<div class="tool-title">服务中心</div>
				</div>
				<div class="icon-tool" @click="gotoPage('/my/index')">
					<zoo-icon :iconType="$route.meta.tabIndex==3?'index3-selected':'index3-unselected'"
						size="28px"></zoo-icon>
					<div class="tool-title">我的钱包</div>
				</div>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	import { Container,Main,Footer } from 'element-ui';
	import { usermsg } from '../utils/axios/api.js';
	export default {
		name:'login',
		components: {
			'el-container':Container,
			'el-main':Main,
			'el-footer':Footer,
		},
		data(){
			return {
        tagNavList:[],//["lyList","zrList"],
        msgList:[],
			}
		},
		methods: {
			gotoPage(url) {
        this.$store.commit("SET_TIME");
				this.$router.push(url);
			},
      getusermsg(){
        let that = this;
        usermsg().then(res => {
          if(res&&res.data&&res.data[0]&&(res.data[0].title||res.data[0].content)){
            that.dataList = res.data;
            that.index = 0;
            that.setMsg();
          }
        })
      },
      setMsg(){
        if(!this.dataList||this.index>=this.dataList.length){
          return;
        }
        let that = this;
        let options = {
          title:this.dataList[this.index].title,
          message:this.dataList[this.index].content,
          dangerouslyUseHTMLString:true,
          showClose:false,
          closeOnClickModal:false,
          closeOnPressEscape:false,
          showCancelButton:true,
          showConfirmButton:this.index<this.dataList.length-1,
          cancelButtonText:'关闭',
          confirmButtonText:'下一条',
          beforeClose:function(action, instance, done){
             done();
            if(action=="confirm"){
              that.index++;
              setTimeout(that.setMsg,200);
            }
          }
        }
        this.$msgbox(options);
      }
		},
    mounted(){
      this.getusermsg();
    },
    updated(){
      this.getusermsg();
    }
	}
</script>

<style scoped>
	.foot-tools{
		width: calc(100% + 40px);
		height: 60px;
		margin: 0 -20px;
		display: flex;
		justify-content: space-around;
		background-color: #283369;
	}
	.icon-tool{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.tool-title {
		margin-top: 2px;
		color: white;
		font-size: 12px;
	}
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .zoo-fade-enter-active {
    transition: all .2s ease;
  }
  .zoo-fade-leave-active {
    transition: all .2s ease;
  }
  .zoo-fade-enter, .zoo-fade-leave-to{
    opacity: 0;
  }
</style>
