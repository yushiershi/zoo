(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{605:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("zoo-content",{attrs:{title:"资产出售"}},[o("zoo-line-item",{attrs:{label:"可出售资产"}},[o("zoo-gray-input",{attrs:{inputType:"text",value:"推广收益("+t.$route.query.profit+")",maxLength:"100",disabled:!0}})],1),t._v(" "),o("zoo-line-item",{attrs:{label:"出售资产数量"}},[o("zoo-gray-input",{attrs:{inputType:"number",placeHolder:"请输入出售资产的数量",maxLength:"10"},model:{value:t.info.point,callback:function(e){t.$set(t.info,"point",e)},expression:"info.point"}})],1),t._v(" "),o("zoo-line-item",{attrs:{label:"资产密码"}},[o("zoo-gray-input",{attrs:{inputType:t.show1?"text":"password",placeHolder:"请填写资产密码",maxLength:"16"},model:{value:t.info.cashpass,callback:function(e){t.$set(t.info,"cashpass",e)},expression:"info.cashpass"}}),t._v(" "),o("span",{attrs:{slot:"right"},slot:"right"},[o("zoo-icon",{attrs:{iconType:t.show1?"password-eye-open":"password-eye-close"},nativeOn:{click:function(e){t.show1=!t.show1}}})],1)],1),t._v(" "),o("zoo-line-item",{attrs:{label:"出售类型"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择出售类型"},model:{value:t.info.type,callback:function(e){t.$set(t.info,"type",e)},expression:"info.type"}},t._l(t.options,function(t){return o("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),o("div",{staticClass:"btn"},[o("zoo-button",{attrs:{label:"确认提交"},on:{click:t.submit}})],1)],1)};s._withStripped=!0;var i=o(17),n=o(174),a={name:"cs",data:function(){return{data:{},info:{},show1:!1,options:[{label:"积分",value:0},{label:"宠物",value:1}]}},components:{"el-select":i.Select,"el-option":i.Option},methods:{submit:function(){if(!parseFloat(this.info.point)||parseFloat(this.info.point)<=0)this.$message.error("出售资产数量必须大于0");else if(parseFloat(this.info.point)>parseFloat(this.$route.query.profit))this.$message.error("出售资产数量不能大于推广收益值");else if(this.info.cashpass)if(0===this.info.type||1===this.info.type){var t=this;Object(n.g)({count:this.info.point,paypwd:this.info.cashpass,type:this.info.type}).then(function(e){200===e.status.errCode&&(t.$message.success("转让信息已经提交，请耐心等待工作人员审核"),t.$router.go(-1))})}else this.$message.error("出售类型不能为空");else this.$message.error("资产密码不能为空")}}},l=(o(694),o(12)),r=Object(l.a)(a,s,[],!1,null,"7c465489",null);r.options.__file="src/views/my/cs.vue";e.default=r.exports},643:function(t,e,o){},694:function(t,e,o){"use strict";var s=o(643);o.n(s).a}}]);