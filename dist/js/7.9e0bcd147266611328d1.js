(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{574:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"header"},[n("zoo-icon",{staticClass:"back-icon",attrs:{iconType:"back",size:"28px"},nativeOn:{click:function(e){return t.$router.go(-1)}}}),t._v("\n    在线客服\n    "),n("el-divider")],1),t._v(" "),n("div",{staticClass:"main-content"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showHeaderFlag,expression:"showHeaderFlag"}],staticClass:"logo-header"},[n("zoo-icon",{staticClass:"left-icon",attrs:{iconType:"my-headimg",size:"50px"}}),t._v(" "),n("div",{staticClass:"zoo-text"},[t._m(0),t._v(" "),n("div",{staticClass:"flex-inner"},[n("span",[n("zoo-icon",{attrs:{size:"18px",iconType:t.voiceFlag?"volume-open":"volume-close"},nativeOn:{click:function(e){t.voiceFlag=!t.voiceFlag}}}),t._v(" "),n("zoo-icon",{attrs:{size:"18px",iconType:"close"},nativeOn:{click:function(e){t.showHeaderFlag=!1}}})],1)])])],1),t._v(" "),n("div",{staticClass:"chat-content"},[n("div",{staticClass:"time-line"},[t._v(t._s(t.nowtime))]),t._v(" "),t._l(t.dataList,function(e,i){return n("div",{key:i,class:"user"==e.type?"user-line":"kf-line"},["kf"==e.type?n("div",{staticClass:"chat-name"},[t._v("\n           智能小小\n         ")]):t._e(),t._v(" "),n("div",{staticClass:"chat-text"},[t._v("\n           "+t._s(e.content)+"\n         ")])])}),t._v(" "),n("div",{staticClass:"input-area"},[n("zoo-gray-input",{attrs:{placeHolder:"在此输入...",maxLength:"100",inputType:"textarea"},model:{value:t.ask,callback:function(e){t.ask=e},expression:"ask"}}),t._v(" "),n("zoo-button-gray",{staticClass:"send-button",attrs:{label:"发送",type:"small",width:"50px"},on:{click:t.sendChat}})],1)],2)])])};i._withStripped=!0;var s=n(17),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.disabled||t.cnt>0?"button-"+t.type+" button-countdown":"button-"+t.type,style:"width:"+t.width,on:{click:t.btnClick}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.cnt<=0,expression:"cnt<=0"}]},[t._v(t._s(t.label))]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.cnt>0,expression:"cnt>0"}]},[t._v(t._s(t.cnt))])])};a._withStripped=!0;var o={name:"zooButton",data:function(){return{cnt:0}},props:{width:{type:String,required:!1,default:"calc(100% - 80px)"},label:{type:String,required:!1},maxCount:{type:Number,required:!1,default:3},type:{type:String,required:!1,default:"big"},disabled:{type:Boolean,required:!1,default:!1}},methods:{btnClick:function(){this.disabled||this.cnt>0||(this.cnt=this.maxCount,setTimeout(this.countdown,1e3),this.$emit("click"))},countdown:function(){this.cnt--,this.cnt>0&&setTimeout(this.countdown,1e3)},clearInterval:function(){this.cnt=0}}},c=(n(680),n(12)),r=Object(c.a)(o,a,[],!1,null,"095e2845",null);r.options.__file="src/components/buttonGray.vue";var l=r.exports,u=n(174),d={name:"online",components:{"el-divider":s.Divider,"zoo-button-gray":l},data:function(){return{ask:"",dataList:[{type:"kf",content:"您好，我是zoo智能客服机器人，请问有什么能帮到您吗？Hello, I am zoo,can I help you?"}],voiceFlag:!0,showHeaderFlag:!0,nowtime:"今天 "+this.$util.formatDate(new Date,"hh:mm")}},methods:{sendChat:function(){this.ask?(this.getFagList(this.ask),this.ask=""):this.$message.error("提问不能为空")},getFagList:function(t){this.dataList.push({type:"user",content:t});var e=this;Object(u.m)({ask:t}).then(function(t){200===t.status.errCode?e.dataList.push({type:"kf",content:t.data}):e.dataList.push({type:"kf",content:"对不起，找不到相关回答，您可以换个关键字重新查询。"})}).catch(function(t){e.dataList.push({type:"kf",content:"对不起，找不到相关回答，您可以换个关键字重新查询。"})})}},mounted:function(){this.getFagList(this.$route.query.ask)}},v=(n(681),n(682),Object(c.a)(d,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex-inner"},[e("span",{staticStyle:{"font-size":"16px","line-height":"24px"}},[this._v("智能小小")]),this._v(" "),e("span",{staticStyle:{"font-size":"12px","line-height":"16px","margin-top":"3px"}},[this._v("163428")])])}],!1,null,"b49cbdf2",null));v.options.__file="src/views/service/online.vue";e.default=v.exports},627:function(t,e,n){},628:function(t,e,n){},629:function(t,e,n){},680:function(t,e,n){"use strict";var i=n(627);n.n(i).a},681:function(t,e,n){"use strict";var i=n(628);n.n(i).a},682:function(t,e,n){"use strict";var i=n(629);n.n(i).a}}]);