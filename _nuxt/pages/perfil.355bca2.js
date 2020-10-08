(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{282:function(t,e,o){var content=o(291);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("f2fef828",content,!1,{sourceMap:!1})},283:function(t,e,o){"use strict";o.r(e);var n={name:"InputOptions",data:function(){return{open:!1,selected:""}},props:{options:{type:Array,required:!0},type:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},computed:{typeBackground:function(){return this.type?"forms":"default"},typeDisabled:function(){return this.disabled?(this.selected=this.options[0].title,"disabled"):""}},created:function(){this.selected=this.options[0].title},methods:{setSelectedValue:function(option){this.selected=option.title,this.open=!1,this.$emit("setOptionValue",option.value)}}},r=(o(290),o(3)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"select-options"},[o("button",{staticClass:"select-options__toggler",class:[t.typeBackground,t.typeDisabled],attrs:{"data-cy":"btn__options",disabled:t.disabled},on:{click:function(e){e.preventDefault(),t.open=!t.open}}},[o("div",[t._v(t._s(t.selected))]),t._v(" "),o("i",{staticClass:"icon icon-expandir",class:{open:t.open}})]),t._v(" "),o("transition",{attrs:{name:"fade"}},[o("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"select-options__select"},t._l(t.options,(function(option,e){return o("li",{key:e,staticClass:"select-options__options",attrs:{value:option.value}},[o("button",{attrs:{"data-cy":"select__option"},on:{click:function(e){return e.preventDefault(),t.setSelectedValue(option)}}},[t._v("\n          "+t._s(option.title)+"\n        ")])])})),0)])],1)}),[],!1,null,"190b6e78",null);e.default=component.exports},290:function(t,e,o){"use strict";var n=o(282);o.n(n).a},291:function(t,e,o){(e=o(17)(!1)).push([t.i,'*[data-v-190b6e78]{box-sizing:border-box}body[data-v-190b6e78]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-190b6e78]{color:#008375}.row[data-v-190b6e78]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-190b6e78]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-190b6e78]{max-width:2rem}.select-options__select[data-v-190b6e78]{list-style-type:none;margin:0 0 2rem;padding:0;box-shadow:0 4px 8px rgba(0,0,0,.24)}.select-options__select li[data-v-190b6e78]:first-child{display:none}.select-options button[data-v-190b6e78]{height:48px;width:100%;text-align:left;cursor:pointer;border:0;font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:1rem;padding-left:1.75rem;transition:background-color .35s ease-in-out}.select-options button.default[data-v-190b6e78]{background-color:hsla(0,0%,100%,.05);color:#fff}.select-options button.default[data-v-190b6e78]:hover{background-color:hsla(0,0%,100%,.15)}.select-options button.disabled[data-v-190b6e78]{cursor:not-allowed;background-color:#ccc}.select-options button.disabled[data-v-190b6e78]:hover{background-color:#ccc}.select-options button.forms[data-v-190b6e78]{background-color:rgba(0,0,0,.08);color:#000}.select-options button.forms[data-v-190b6e78]:hover{background-color:rgba(0,0,0,.1)}.select-options button[data-v-190b6e78]:focus{outline:none}.select-options__toggler[data-v-190b6e78]{display:flex;align-items:center;justify-content:space-between;border-radius:20px;margin-bottom:10px}.select-options__toggler .icon[data-v-190b6e78]{font-size:40px;transition:transform .15s ease-in-out}.select-options__toggler .icon.open[data-v-190b6e78]{transform:rotate(180deg)}.fade-enter-active[data-v-190b6e78],.fade-leave-active[data-v-190b6e78]{transition:opacity .25s}.fade-enter[data-v-190b6e78],.fade-leave-to[data-v-190b6e78]{opacity:0}',""]),t.exports=e},300:function(t,e,o){var content=o(331);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("c6375ad0",content,!1,{sourceMap:!1})},315:function(t,e,o){"use strict";o.r(e);o(6),o(5),o(73);var n=o(283),r=o(101),l={name:"InputUpdate",components:{InputOptions:n.default,BtnAction:r.default},data:function(){return{input:"",usuario:{email:"",arroba:"",nprodam:""}}},props:{display:{type:Boolean,required:!0},description:{type:String,default:""},value:{type:String,required:!0},checkAndEmail:{type:Boolean,default:!1},fetching:{type:Boolean,default:!1},step:{type:String,default:""},values:{type:Object,default:function(){return{email:"",nprodam:""}}}},computed:{noStep:function(){return""===this.step},valid:function(){return this.noStep?this.input.length>3&&this.usuario.nprodam.length>3&&this.usuario.email.length>2:this.input.length>3},hostOptions:function(){return[{title:this.values.email.split("@")[1],value:this.values.email.split("@")[1]},{title:"prefeitura.sp.gov.br",value:"prefeitura.sp.gov.br"},{title:"spurbanismo.sp.gov.br",value:"spurbanismo.sp.gov.br"}]}},watch:{display:function(t){this.input=this.value,this.checkAndEmail&&(this.usuario.email=this.values.email.split("@")[0],this.usuario.arroba="@"+this.values.email.split("@")[1],this.usuario.nprodam=this.values.nprodam)}},methods:{set:function(){this.checkAndEmail?this.$emit("setUpdate",{nome:this.input,email:this.usuario.email+this.usuario.arroba,nprodam:this.usuario.nprodam}):(this.$emit("setUpdate",this.input),this.input="")},cancel:function(){this.$emit("setUpdateCancel",!0)},setOptionValue:function(param){this.usuario.arroba="@"+param}}},c=(o(330),o(3)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"botao__editar"},[t.display?o("form",{staticClass:"input-update__form"},[o("div",{staticClass:"row"},[o("div",{staticClass:"column"},[o("label",{staticClass:"input-update__label",attrs:{for:"nome"}},[t._v(t._s(t.description))]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"input-update__input",attrs:{name:"nome",type:"text","data-cy":"input__update"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}})]),t._v(" "),t.noStep?o("div",{staticClass:"column gutter"}):t._e(),t._v(" "),t.noStep?o("div",{staticClass:"column"},[t.noStep?o("label",{staticClass:"input-update__label",attrs:{for:"nprodam"}},[t._v("NPRODAM")]):t._e(),t._v(" "),o("div",{staticClass:"input-update__inputs"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.nprodam,expression:"usuario.nprodam"}],staticClass:"input-update__input input-update__text-input",attrs:{name:"nprodam",type:"text","data-cy":"input__nprodam"},domProps:{value:t.usuario.nprodam},on:{input:function(e){e.target.composing||t.$set(t.usuario,"nprodam",e.target.value)}}})])]):t._e()]),t._v(" "),t.checkAndEmail?o("div",{staticClass:"row"},[o("div",{staticClass:"column input-update__email"},[o("label",{staticClass:"input-update__label",attrs:{for:"email"}},[t._v("Email")]),t._v(" "),o("div",{staticClass:"input-update__inputs"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.usuario.email,expression:"usuario.email"}],staticClass:"input-update__input input-update__text-input",staticStyle:{width:"100%"},attrs:{name:"email",type:"text","data-cy":"input__email"},domProps:{value:t.usuario.email},on:{input:function(e){e.target.composing||t.$set(t.usuario,"email",e.target.value)}}}),t._v(" "),o("span",{staticClass:"input-update__arroba"},[t._v("@")]),t._v(" "),o("input-options",{staticClass:"input-update__options",attrs:{type:!0,options:t.hostOptions},on:{setOptionValue:t.setOptionValue}})],1)])]):t._e(),t._v(" "),o("div",{staticClass:"input-update__btn-group"},[o("btn-action",{attrs:{"data-cy":"update__cancel",title:"Cancelar",danger:"",compact:""},on:{action:function(e){return e.preventDefault(),t.cancel(e)}}}),t._v(" "),o("btn-action",{attrs:{"data-cy":"btn__update",title:"Atualizar",disabled:!t.valid,loading:t.fetching,loadingMessage:"Atualizando",compact:""},on:{action:function(e){return e.preventDefault(),t.set(e)}}})],1)]):t._e()])}),[],!1,null,"0ceb0c38",null);e.default=component.exports;installComponents(component,{InputOptions:o(283).default,BtnAction:o(101).default})},330:function(t,e,o){"use strict";var n=o(300);o.n(n).a},331:function(t,e,o){(e=o(17)(!1)).push([t.i,'*[data-v-0ceb0c38]{box-sizing:border-box}body[data-v-0ceb0c38]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-0ceb0c38]{color:#008375}.row[data-v-0ceb0c38]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-0ceb0c38]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-0ceb0c38]{max-width:2rem}.input-update__inputs[data-v-0ceb0c38]{display:flex;align-items:center}@media (max-width:800px){.input-update__inputs[data-v-0ceb0c38]{flex-direction:column;align-items:normal}}.input-update__form[data-v-0ceb0c38]{background:#fff;display:flex;flex-direction:column;color:#000;padding:.8rem 2rem}@media (max-width:800px){.input-update__form[data-v-0ceb0c38]{padding:.8rem 1rem}}.input-update__email[data-v-0ceb0c38]{max-width:650px}.input-update__label[data-v-0ceb0c38]{margin:1rem 0 .25rem;font-size:1rem}.input-update__options[data-v-0ceb0c38]{margin-top:5px}.input-update__arroba[data-v-0ceb0c38]{margin:10px}.input-update__input[data-v-0ceb0c38]{width:100%;font-size:1rem;height:3rem;border-radius:4px;padding:1rem;border:0;background:rgba(0,0,0,.08);font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;transition:all .25s ease-in-out}.input-update__input[data-v-0ceb0c38]:active,.input-update__input[data-v-0ceb0c38]:focus{background:rgba(0,0,0,.04);height:3.2rem}.input-update__btn-group[data-v-0ceb0c38]{display:flex;margin-bottom:1rem;max-width:180px;justify-content:space-between}',""]),t.exports=e},332:function(t,e,o){var content=o(385);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(18).default)("3c97ba90",content,!1,{sourceMap:!1})},384:function(t,e,o){"use strict";var n=o(332);o.n(n).a},385:function(t,e,o){(e=o(17)(!1)).push([t.i,'*[data-v-ed72e5c0]{box-sizing:border-box}body[data-v-ed72e5c0]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-ed72e5c0]{color:#008375}.row[data-v-ed72e5c0]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-ed72e5c0]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-ed72e5c0]{max-width:2rem}.perfil[data-v-ed72e5c0]{max-width:1200px;min-height:calc(100vh - 166px);margin:0 auto;padding:2rem}.perfil h1[data-v-ed72e5c0]{color:#fff}.perfil__forms[data-v-ed72e5c0]{width:100%}.perfil__switch-display[data-v-ed72e5c0]{background-color:#008375;height:70px;display:flex;align-items:center;color:#fff;padding:1rem;transition:all .25s ease-in-out}.perfil__switch-display .icon[data-v-ed72e5c0]{font-size:1.2rem;margin-right:1rem;transition:all .25s ease-in-out}.perfil__switch-display[data-v-ed72e5c0]:hover{cursor:pointer;background-color:#00a896}.perfil__switch-display:hover .icon[data-v-ed72e5c0]{transform:rotate(90deg)}',""]),t.exports=e},439:function(t,e,o){"use strict";o.r(e);o(44),o(24),o(6),o(5),o(30);var n=o(13),r=o(315),l=o(100),c=o(14);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"Perfil",layout:"usuario",components:{InputUpdate:r.default,Modal:l.default},data:function(){return{display:!1}},computed:f(f({},Object(c.e)("usuario",{id:function(t){return t.usuario.id},nome:function(t){return t.usuario.nome},email:function(t){return t.usuario.email},nprodam:function(t){return t.usuario.nprodam},status:function(t){return t.status},showModal:function(t){return t.showModal},error:function(t){return t.error},apiMessage:function(t){return t.apiMessage},token:function(t){return t.token},fetching:function(t){return t.fetching}})),{},{nomeUsuario:function(){return this.nome?this.nome:"Carregando nome"},errorTitle:function(){var title={400:"Erro na requisição",403:"Erro na autenticação",500:"Erro no servidor",200:"Sucesso"}[this.status];return title||"Erro"},errorDescription:function(){var t={403:"Faça o login novamente",200:"Registro atualizado."}[this.status];return t||"Entre em contato com o desenvolvedor: \ndesenvolvimento@spurbanismo.sp.gov.br"},actionText:function(){var text={403:"Voltar para login",200:"Voltar"}[this.status];return text||"Tentar novamente"}}),methods:f(f({},Object(c.b)("usuario",["updateUsuario","closeModal","logout"])),{},{handleUpdate:function(param){this.updateUsuario(param)},handleUpdateCancel:function(t){this.display=!1},sair:function(){403===this.status?(this.logout(this.token),this.reset(),this.$router.push("/login")):this.closeModal()}})},v=(o(384),o(3)),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.showModal?o("modal",{attrs:{title:t.errorTitle,error:t.error,description:t.apiMessage,"action-description":t.errorDescription,"action-text":t.actionText},on:{setModalAction:t.sair}}):t._e(),t._v(" "),o("div",{staticClass:"perfil"},[o("h1",[t._v("Perfil")]),t._v(" "),o("section",{staticClass:"perfil__forms"},[o("a",{staticClass:"perfil__switch-display",attrs:{"data-cy":"open__update"},on:{click:function(e){t.display=!t.display}}},[o("i",{staticClass:"icon icon-adicionar"}),t._v("\n        Atualizar dados cadastrais\n      ")]),t._v(" "),o("input-update",{attrs:{description:"Nome",value:t.nomeUsuario,display:t.display,checkAndEmail:!0,values:{email:t.email,nprodam:t.nprodam},fetching:t.fetching},on:{setUpdate:t.handleUpdate,setUpdateCancel:t.handleUpdateCancel}})],1)])],1)}),[],!1,null,"ed72e5c0",null);e.default=component.exports;installComponents(component,{Modal:o(100).default,InputUpdate:o(315).default})}}]);