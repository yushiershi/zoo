(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{599:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("zoo-content",{attrs:{title:"转赠"}},[n("zoo-line-item",{attrs:{label:"真实姓名"}},[n("zoo-gray-input",{attrs:{inputType:"text",placeHolder:"请填写真实姓名",maxLength:"11"},model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1),e._v(" "),n("zoo-line-item",{attrs:{label:"身份证号码"}},[n("zoo-gray-input",{attrs:{inputType:"text",placeHolder:"请填写身份证号码",maxLength:"18"},model:{value:e.info.idnumber,callback:function(t){e.$set(e.info,"idnumber",t)},expression:"info.idnumber"}})],1),e._v(" "),n("div",{staticClass:"btn"},[n("zoo-button",{attrs:{label:"确认提交"},on:{click:e.submit}})],1)],1)};i._withStripped=!0;var o=n(174),s={name:"verification",data:function(){return{info:{}}},methods:{submit:function(){if(this.info.name)if(new RegExp(this.$ptn.carid()).test(this.info.idnumber)){var e=this;Object(o.s)(this.info).then(function(t){200===t.status.errCode&&(e.$message.success("提交成功，请耐心等待工作人员审核。"),e.$router.go(-1))})}else this.$message.error("请输入正确的身份证号码");else this.$message.error("姓名不能为空")}}},a=n(12),r=Object(a.a)(s,i,[],!1,null,null,null);r.options.__file="src/views/my/verification.vue";t.default=r.exports}}]);