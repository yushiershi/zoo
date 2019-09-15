<template>
	<zoo-card-line class="input-line">
		<zoo-icon :iconType="iconType" v-show="iconType&&iconType!='none'" size="20px"></zoo-icon>
		<input :type="inputType" v-model="data" ref="input"
			class="no-border" @input="inputModel"
			:placeHolder="placeHolder" :maxlength="maxLength"/>
		<div class="right-item">
			<zoo-icon class="close-icon" :iconType="data?'close':'none'" size="20px"
				@click.native="data = ''"></zoo-icon>
			<slot></slot>
		</div>
	</zoo-card-line>
</template>

<script>
	export default {
		name:'inputLine',
		data(){
			return {
				data:null,
			}
		},
		props:{
			iconType:{
				type:String,
				required:false,
				default:"none"
			},
			inputType:{
				type:String,
				required:false,
				default:'text'
			},
			value:{
				type:String,
				required:false,
			},
			placeHolder:{
				type:String,
				required:false,
			},
			maxLength:{
				type:String,
				required:false,
				default:"20"
			}
		},
		watch: {
			value(newValue, oldValue) {
				this.data = newValue;
			}
		},
		methods: {
			inputModel() {
				this.$emit("input",this.data);
			},
			focus(){
				this.$refs.input.focus();
			}
		},
		mounted(){
			this.data = this.value;
		}
	}
</script>

<style scoped>
	.input-line{
		position: relative;
    margin: 0 20px;
    width: calc(100% - 40px);
	}
	.no-border{
		border: 0;
		outline: none;
		width: calc(100% - 40px);
	}
	.right-item{
		position: absolute;
		top: 0;
		right: 16px;
		bottom: 0;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
</style>
