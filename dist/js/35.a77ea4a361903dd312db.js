(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{252:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("zoo-content",{attrs:{title:"转让确认"}},[s("zoo-line-item",{attrs:{label:"资产密码"}},[s("zoo-gray-input",{ref:"pass",attrs:{placeHolder:"请输入资产密码",inputType:e.show1?"text":"password",maxLength:"16"},nativeOn:{keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.checkPass(!1)}},model:{value:e.info.paypwd,callback:function(t){e.$set(e.info,"paypwd",t)},expression:"info.paypwd"}}),e._v(" "),s("span",{attrs:{slot:"right"},slot:"right"},[s("zoo-icon",{attrs:{iconType:e.show1?"password-eye-open":"password-eye-close"},nativeOn:{click:function(t){e.show1=!e.show1}}})],1)],1),e._v(" "),s("zoo-line-item",{attrs:{label:"上传截图"}},[s("zoo-upload-img",{attrs:{type:1},model:{value:e.info.paysrc,callback:function(t){e.$set(e.info,"paysrc",t)},expression:"info.paysrc"}})],1),e._v(" "),s("div",{staticClass:"btn"},[s("zoo-button",{attrs:{label:"提交"},on:{click:e.submit}})],1)],1)};o._withStripped=!0;var i=s(81),n={name:"zrDetail",data:()=>({info:{},show1:!1}),methods:{submit(){if(!this.info.paypwd)return void this.$message.error("资产密码不能为空");if(!this.info.paysrc)return void this.$message.error("截图不能为空");let e=this;Object(i.C)({id:this.$route.params.id,...this.info}).then(t=>{e.$message.success("确认成功！"),e.$router.go(-1)})}}},a=s(4),r=Object(a.a)(n,o,[],!1,null,null,null);r.options.__file="src/views/my/zrDetail.vue";t.default=r.exports}}]);