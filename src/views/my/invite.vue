<template>
    <div class="back-content" @click="$router.go(-1)">
        <div class="center-area">
          <div style="color: white;font-size: 16px;">{{this.$store.state.userName}}</div>
          <img :src="qrcodeImg" class="qrcode"/>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode';
	export default {
		name:'invite',
		data(){
			return {
        qrcodeImg:"",
			}
		},
		methods: {
      getQrcode(){
        let str = window.location.href.split("#")[0]+"#/regist?invited="+this.$store.state.userName;
        let that = this;
        QRCode.toDataURL(str,{ margin:2,scale:2.5 })
        .then(url => {
          that.qrcodeImg = url;
        })
      }
		},
    mounted(){
      this.getQrcode();
    }
	}
</script>

<style scoped>
  .back-content{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(../../assets/img/invite_bg.png);
    background-size: 100% 100%;
  }
  .center-area{
    width: 100%;
    margin-top: 45vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 6vh;
  }
</style>
