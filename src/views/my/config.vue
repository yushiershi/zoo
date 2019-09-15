<template>
  <zoo-content title="设置">
    <zoo-list-line style="margin-top: -10px;" :rightFlag="false">
      手机号码<div style="float: right;font-size: 16px;">{{$store.state.userName}}</div>
    </zoo-list-line>
    <zoo-button type="big" label="安全退出" @click="logout"></zoo-button>
  </zoo-content>
</template>

<script>
import listLine from '../../components/listLine';
	import { logout } from '../../utils/axios/api.js';
	export default {
		name:'safe',
    components: {
      'zoo-list-line':listLine,
    },
    data(){
			return {
			}
		},
    methods: {
      gotoPage(url) {
        this.$router.push(url);
      },
      logout(){
        let that = this;
        logout().then(res => {
          that.$store.commit(that.$types.LOGOUT);
          that.$router.push("/");
        })
       }
    },
	}
</script>

<style scoped>
</style>
