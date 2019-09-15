<template>
	<div class="line-item">
		<div class="line-item-text" :style="hasMargin?'padding: 20px;width: calc(100% - 40px);':'padding: 20px 0;width: 100%;'">{{label}}</div>
    <div class="line-item-content">
      <slot></slot>
      <div class="right-item">
        <slot name="right"></slot>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		name:'lineItem',
		data(){
			return {
			}
		},
		props: {
			label: {
				type: String,
				required:false,
			},
			hasMargin: {
				type: Boolean,
				required:false,
        default:true,
			},
		},
	}
</script>
<style scoped>
  .line-item{
    width: calc(100% - 40px);
    margin: 10px 20px;
  }
  .line-item-text{
    font-size: 16px;
    font-weight: bolder;
  }
  .line-item-content{
    width: 100%;
    position: relative;
  }
  .right-item{
    position: absolute;
    top: 0;
    right: 28px;
    bottom: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>
