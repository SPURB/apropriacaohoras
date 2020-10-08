(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{288:function(t,r,e){var content=e(309);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(18).default)("60328480",content,!1,{sourceMap:!1})},293:function(t,r,e){"use strict";e.r(r);e(44),e(24),e(6),e(5),e(30);var o=e(13),n=(e(129),e(14));function d(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(r){Object(o.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}var c={name:"CustomSelect",props:{title:{type:String,required:!0},idInput:{type:String,default:"",required:!1},values:{type:Array,required:!0},disabled:{type:Boolean},setOptionValue:{type:Number,default:0},optionTitle:{type:String,default:"Selecione uma opção"}},data:function(){return{optionValue:0}},computed:l({disabledClass:function(){if(this.disabled)return"disabled-select"}},Object(n.c)("form-registrar-horas",["isReset"])),watch:{isReset:function(t){this.optionValue=0}},methods:l(l({},Object(n.b)("form-registrar-horas",["setValueOption"])),{},{setValues:function(param){this.$emit("valueOption",param.value),this.setValueOption(param)}})},f=(e(308),e(3)),component=Object(f.a)(c,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("fieldset",[e("label",[t._v(t._s(t.title))]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.optionValue,expression:"optionValue"}],class:t.disabledClass,attrs:{id:t.idInput,disabled:t.disabled},on:{change:[function(r){var e=Array.prototype.filter.call(r.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.optionValue=r.target.multiple?e:e[0]},function(r){return t.setValues({title:t.title,value:t.optionValue})}]}},[e("option",{attrs:{value:"0",selected:"",disabled:""}},[t._v("\n      "+t._s(t.optionTitle)+"\n    ")]),t._v(" "),t._l(t.values,(function(r,o){return e("option",{key:r.nome+o,domProps:{value:r.id}},[t._v("\n      "+t._s(r.nome)+"\n    ")])}))],2)])}),[],!1,null,"e84de72e",null);r.default=component.exports},299:function(t,r,e){var content=e(325);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(18).default)("1843135d",content,!1,{sourceMap:!1})},308:function(t,r,e){"use strict";var o=e(288);e.n(o).a},309:function(t,r,e){(r=e(17)(!1)).push([t.i,'*[data-v-e84de72e]{box-sizing:border-box}body[data-v-e84de72e]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-e84de72e]{color:#008375}.row[data-v-e84de72e]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-e84de72e]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-e84de72e]{max-width:2rem}fieldset[data-v-e84de72e]{padding:0;border:0}fieldset label[data-v-e84de72e]{display:block;color:hsla(0,0%,100%,.4);font-size:.75rem;line-height:1;text-transform:uppercase;margin-bottom:.5rem}fieldset select[data-v-e84de72e]{border:none;color:inherit;font-family:inherit;font-size:1rem;background-color:hsla(0,0%,100%,.08);width:100%;padding:0 .75rem;height:3rem;border-radius:24px}fieldset select option[data-v-e84de72e]{color:#000}fieldset select[data-v-e84de72e]:hover{cursor:pointer}.disabled-select[data-v-e84de72e]{background-color:#8a8888!important;cursor:no-drop!important}',""]),t.exports=r},314:function(t,r,e){"use strict";e.r(r);var o=e(71),n={name:"ListarHoras",props:{registro:{type:Object,required:!0}},data:function(){return{showPH:!1,showPE:!1,valuesDate:[],data:""}},computed:{totalHoras:function(){return this.registro.res.horas.total},totalExtras:function(){return this.registro.res.extras.total},projetosHoras:function(){return this.registro.res.horas.projetos},projetosExtras:function(){return this.registro.res.extras.projetos},routeHidden:function(){return"/registrar"===this.$route.path}},created:function(){this.formateDate()},methods:{formateDate:function(){var t=o.a.splitDate(this.registro.data);this.data="".concat(t.sDay,"/").concat(t.sMonth)},customWidths:function(t,r){if(1===t)switch(r){case 1:return"15%";case 2:return"25%";case 3:return"37.5%";case 4:return"50%";case 5:return"62.2%";case 6:return"75%";case 7:return"87.5%";case 8:return"100%"}else switch(r){case 1:return"25%";case 2:return"50%";case 3:return"75%";case 4:return"100%"}},backgroundsEdit:function(t){switch(t){case"warning":return"#FF9A20";case"success":return"#007165"}},backgrounds:function(t){switch(t){case"warning":return"#FFAE4D";case"success":return"#008375"}}}},d=(e(324),e(3)),component=Object(d.a)(n,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"show-horas"},[e("section",{staticClass:"grupo__barra horas"},[e("div",{staticClass:"data"},[t._v(t._s(t.data))]),t._v(" "),e("div",{staticClass:"bar bar__horas",class:t.showPH?"auto__larg":"forced__height",style:{width:t.customWidths(1,t.totalHoras),backgroundColor:t.backgrounds(t.registro.res.type)},on:{click:function(r){t.showPH=!t.showPH}}},[t.showPH?e("transition-group",{staticClass:"show-horas__projetos",attrs:{tag:"ul",name:"show-horas__projetos"}},t._l(t.projetosHoras,(function(r,o){return e("li",{key:"projeto-"+o,staticClass:"show-horas__projetos-item"},[t._v("\n          "+t._s(r.nome)+"\n        ")])})),0):t._e()],1),t._v(" "),t.showPH&&t.routeHidden?e("router-link",{staticClass:"btn__editar",style:{backgroundColor:t.backgroundsEdit(t.registro.res.type)},attrs:{tag:"div",to:"/editar?data="+this.registro.data}},[e("i",{staticClass:"icon icon-editar"})]):t._e(),t._v(" "),e("div",{staticClass:"hora"},[t._v(t._s(t.totalHoras)+"h")])],1),t._v(" "),t.totalExtras>0?e("section",{staticClass:"grupo__barra extras"},[e("div",{staticClass:"bar bar__extras",class:t.showPE?"auto__larg":"forced__height",on:{click:function(r){t.showPE=!t.showPE}}},[t.showPE?e("ul",t._l(t.projetosExtras,(function(r,o){return e("li",{key:"projeto-"+o},[t._v("\n          "+t._s(r.nome)+"\n        ")])})),0):t._e()]),t._v(" "),t.showPE&&t.routeHidden?e("router-link",{staticClass:"btn__editar",style:{backgroundColor:"#0CAF9E"},attrs:{tag:"div",to:"/editar?data="+this.registro.data}},[e("i",{staticClass:"icon icon-editar"})]):t._e(),t._v(" "),e("div",{staticClass:"hora"},[t._v(t._s(t.totalExtras)+"h")])],1):t._e()])}),[],!1,null,"21712887",null);r.default=component.exports},324:function(t,r,e){"use strict";var o=e(299);e.n(o).a},325:function(t,r,e){(r=e(17)(!1)).push([t.i,'*[data-v-21712887]{box-sizing:border-box}body[data-v-21712887]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-21712887]{color:#008375}.row[data-v-21712887]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-21712887]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-21712887]{max-width:2rem}.show-horas[data-v-21712887]{display:flex;width:100%;padding:10px;margin-bottom:5px}.show-horas__projetos-item[data-v-21712887]{opacity:0;transition:opacity .3s ease-in;transition-delay:.5s}.show-horas .grupo__barra[data-v-21712887]{display:flex;align-items:center;width:100%}.show-horas .grupo__barra.horas[data-v-21712887]{width:70%}.show-horas .grupo__barra.extras[data-v-21712887]{width:30%}.show-horas .grupo__barra .bar[data-v-21712887]{margin-left:10px;cursor:pointer}.show-horas .grupo__barra .bar ul[data-v-21712887]{padding-left:10px;list-style-type:none}.show-horas .grupo__barra .bar__extras[data-v-21712887]{content:"";margin-left:50px;width:100%;background-color:#5cd6c9}.show-horas .grupo__barra .hora[data-v-21712887]{margin-left:10px}.show-horas .grupo__barra .btn__editar[data-v-21712887]{align-items:center;display:flex;justify-content:center;height:100%;width:30px}.show-horas .grupo__barra .btn__editar .icon[data-v-21712887]{font-size:1.5rem}.show-horas .grupo__barra .btn__editar[data-v-21712887]:hover{cursor:pointer}.forced__height[data-v-21712887]{height:15px;transition:all .3s ease-in;transform-origin:bottom}.auto__larg[data-v-21712887]{height:50x;padding-right:15px;transition:all .3s ease-out;transform-origin:top}.auto__larg .show-horas__projetos-item[data-v-21712887]{opacity:1}',""]),t.exports=r},337:function(t,r,e){var content=e(389);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(18).default)("013cf726",content,!1,{sourceMap:!1})},338:function(t,r,e){var content=e(391);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(18).default)("3fdcf116",content,!1,{sourceMap:!1})},360:function(t,r,e){"use strict";e.r(r);e(44),e(24),e(6),e(30),e(35),e(36),e(5),e(174);var o=e(13),n=e(14),d=e(71),l=e(28);function c(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(r){Object(o.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}var h={name:"Calendario",data:function(){return{date:new Date,months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],selection:null}},computed:f(f(f({},Object(n.e)("form-registrar-horas",{updateCalendario:function(t){return t.updateCalendario},multipleData:function(t){return t.multipleData}})),Object(n.e)("usuario",{idusuario:function(t){return t.id}})),{},{today:{get:function(){return this.date},set:function(t){this.date=t}},todayWeekDay:function(){return this.today.getDay()},todayMonthDay:function(){return this.today.getDate()},month:function(){return this.today.getMonth()},year:function(){return this.today.getFullYear()},daysThisMonth:function(){return new Date(this.year,this.month+1,0).getDate()},weeksThisMonth:function(){return Math.ceil(this.daysThisMonth/6)},firstWeekDay:function(){return new Date(this.year,this.month,1).getDay()-1}}),watch:{updateCalendario:function(t){t&&(this.typeClass(),this.TOGGLE_CALENDARIO_STATUS({status:!1}))}},updated:function(){this.typeClass(),this.resetSelected()},mounted:function(){this.typeClass()},methods:f(f(f({},Object(n.d)("form-registrar-horas",["TOGGLE_CALENDARIO_STATUS","RESET_CALENDARIO"])),Object(n.b)("form-registrar-horas",["setMultipleData"])),{},{calendario:function(t){for(var r=this.daysThisMonth+this.firstWeekDay,e=[],o=0;o<=r;o++)o>=7*t&&o<=7*(t+1)-1&&e.push(o);return e},resetSelected:function(t){var r=this.$refs.tbody,e=[];this.multipleData;r.childNodes.forEach((function(tr){tr.childNodes.forEach((function(td){td.classList.contains("selected")&&td.classList.remove("selected"),e.push(td)}))})),this.multipleData.forEach((function(data){var t=document.querySelector('[data-date~="'.concat(data,'"]'));t&&t.classList.add("selected")}))},monthInc:function(t){var r=this.month+t;this.today=new Date(this.year,r,this.todayMonthDay)},decodeMonth:function(t){return this.months[t]},daysClassification:function(t){var r=[];return new Date(this.year,this.month,t).toLocaleString().substring(0,10)===(new Date).toLocaleString().substring(0,10)&&r.push("today"),r.toString()},formatDate:function(t){return t-this.firstWeekDay<1?"":t-this.firstWeekDay},getFullData:function(t){return this.year+"-"+"".concat(this.month+1).padStart(2,"0")+"-"+"".concat(t).padStart(2,"0")},typeClass:function(){var t=this,tbody=this.$refs.tbody,r=d.a.currentDate(),e=(new Date).getFullYear().toString(),o="".concat(e,"-").concat(r.cMonth,"-").concat(r.cDay);tbody.childNodes.forEach((function(tr){tr.childNodes.forEach((function(td){var r=td.dataset.date,e=d.a.splitDate(td.dataset.date),n=d.a.isWeekend(r),c="".concat(e.sYear,"-").concat(e.sMonth,"-").concat(e.sDay),f=t.$moment(o).isBefore(c);td.classList.remove("warning"),td.classList.remove("success"),td.classList.remove("danger"),f||"00"===e.sDay||!1!==n||l.a.getStatus(t.idusuario,r).then((function(t){return td.classList.add(t.data.type)})).catch((function(t){return new Error(t)}))}))}))}})},m=(e(388),e(3)),component=Object(m.a)(h,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("table",{staticClass:"calendario"},[e("thead",[e("tr",[e("th",{attrs:{colspan:"7","data-cy":"mes__atual"}},[e("button",{attrs:{type:"button","data-cy":"prev__mes"},on:{click:function(r){return t.monthInc(-1)}}},[e("i",{staticClass:"icon icon-seta_esquerda"})]),t._v("\n        "+t._s(t.decodeMonth(t.month)+" · "+t.year)+"\n        "),e("button",{attrs:{type:"button","data-cy":"prox__mes"},on:{click:function(r){return t.monthInc(1)}}},[e("i",{staticClass:"icon icon-seta_direita"})])])]),t._v(" "),t._m(0)]),t._v(" "),e("tbody",{ref:"tbody",attrs:{id:"tbody"}},t._l(t.weeksThisMonth,(function(r,o){return e("tr",{key:o},t._l(t.calendario(o),(function(r,o){return e("td",{key:o,class:t.daysClassification(r),attrs:{"data-date":t.getFullData(t.formatDate(r)),"data-cy":"select__data"},domProps:{innerHTML:t._s(t.formatDate(r))},on:{click:function(e){t.setMultipleData({event:e,date:t.getFullData(t.formatDate(r))})}}},[t._v("\n        "+t._s(r)+"\n      ")])})),0)})),0)])}),[function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("tr",[e("th",[t._v("DOM")]),t._v(" "),e("th",[t._v("SEG")]),t._v(" "),e("th",[t._v("TER")]),t._v(" "),e("th",[t._v("QUA")]),t._v(" "),e("th",[t._v("QUI")]),t._v(" "),e("th",[t._v("SEX")]),t._v(" "),e("th",[t._v("SÁB")])])}],!1,null,"004bda91",null);r.default=component.exports},388:function(t,r,e){"use strict";var o=e(337);e.n(o).a},389:function(t,r,e){(r=e(17)(!1)).push([t.i,'*[data-v-004bda91]{box-sizing:border-box}body[data-v-004bda91]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-004bda91]{color:#008375}.row[data-v-004bda91]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-004bda91]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-004bda91]{max-width:2rem}table[data-v-004bda91]{border-spacing:1rem;table-layout:fixed}table *[data-v-004bda91]{user-select:none;-ms-user-select:none;-moz-user-select:none;-webkit-user-select:none}table thead tr th[colspan][data-v-004bda91]{font-size:1.25rem;font-weight:400;text-shadow:0 1px 2px rgba(0,0,0,.48);text-transform:uppercase}table thead tr th[colspan] button[data-v-004bda91]{border:none;background-color:hsla(0,0%,100%,.1);border-radius:100%;padding:0;color:inherit;cursor:pointer}table thead tr th[colspan] button[data-v-004bda91]:first-child{float:left}table thead tr th[colspan] button[data-v-004bda91]:nth-child(2){float:right}table thead tr th[colspan] button .icon[data-v-004bda91]{font-size:1.5rem;line-height:1.4rem;vertical-align:-2px}table thead tr th[colspan] button[data-v-004bda91]:hover{background-color:hsla(0,0%,100%,.2)}table thead tr th[data-v-004bda91]:not([colspan]){font-weight:400;color:hsla(0,0%,100%,.4)}table thead tr th[data-v-004bda91]:not([colspan]):first-child,table thead tr th[data-v-004bda91]:not([colspan]):last-child{color:hsla(0,0%,100%,.1)}table tbody tr td[data-v-004bda91]{background-color:hsla(0,0%,100%,.04);border-radius:.25rem;line-height:calc(2.5rem - 8px);text-align:center;border-top:4px solid transparent;border-bottom:4px solid transparent;cursor:pointer;box-shadow:0 0 0 transparent;transition:all .1s ease-in}table tbody tr td[data-v-004bda91]:first-child,table tbody tr td[data-v-004bda91]:nth-child(7){color:hsla(0,0%,100%,.4)}table tbody tr td[data-v-004bda91]:hover{background-color:hsla(0,0%,100%,.08)}table tbody tr td.today[data-v-004bda91]{border-bottom:5px solid #89afab!important}table tbody tr td.filled[data-v-004bda91]{background-color:#008375;text-shadow:0 1px 2px rgba(0,0,0,.48)}table tbody tr td.missingAll[data-v-004bda91]{background-color:#eb5757;text-shadow:0 1px 2px rgba(0,0,0,.48)}table tbody tr td.missingSome[data-v-004bda91]{background-color:#ffae4d;text-shadow:0 1px 2px rgba(0,0,0,.48)}table tbody tr td.selected[data-v-004bda91]{background-color:#005249;transform:scale(1.2);box-shadow:0 2px 4px rgba(0,0,0,.48)}.danger[data-v-004bda91]{border:1px dashed hsla(0,0%,100%,.5)}.warning[data-v-004bda91]{background-color:#ffae4d!important}.success[data-v-004bda91]{background-color:#008375!important}.success[data-v-004bda91]:hover,.warning[data-v-004bda91]:hover{opacity:.8}@media (max-width:850px){.selected[data-v-004bda91]{transform:scale(1.15)!important}}',""]),t.exports=r},390:function(t,r,e){"use strict";var o=e(338);e.n(o).a},391:function(t,r,e){(r=e(17)(!1)).push([t.i,'*[data-v-251a7dfa]{box-sizing:border-box}body[data-v-251a7dfa]{font-family:"Roboto","Segoe UI","Helvetica",Arial,sans-serif;font-size:16px;margin:0;background-color:#005249}a[data-v-251a7dfa]{color:#008375}.row[data-v-251a7dfa]{display:flex;flex-direction:row;flex-wrap:wrap;width:100%}.column[data-v-251a7dfa]{display:flex;flex-direction:column;flex-basis:100%;flex:1}.column.gutter[data-v-251a7dfa]{max-width:2rem}.registrar[data-v-251a7dfa]{margin-bottom:10vh}.registrar__modal[data-v-251a7dfa]{top:0}.registrar h2[data-v-251a7dfa]{max-width:1200px;font-size:1.5rem;color:#fff;line-height:3rem;margin:4rem auto 1rem}.registrar #form-registrar-horas[data-v-251a7dfa]{max-width:1200px;margin:0 auto;display:flex;flex-flow:row wrap;justify-content:space-between;color:#fff}.registrar #form-registrar-horas>*[data-v-251a7dfa]{border-radius:1.5rem}.registrar #form-registrar-horas>.calendario[data-v-251a7dfa]{width:calc(50% - 2rem);margin-right:2rem;background-color:hsla(0,0%,100%,.08)}.registrar #form-registrar-horas *>fieldset[data-v-251a7dfa]{padding:0;border:0}.registrar #form-registrar-horas *>fieldset label[data-v-251a7dfa]{display:block;color:hsla(0,0%,100%,.4);font-size:.75rem;line-height:1;text-transform:uppercase;margin-bottom:.5rem}.registrar #form-registrar-horas *>fieldset input[data-v-251a7dfa],.registrar #form-registrar-horas *>fieldset select[data-v-251a7dfa]{border:none;color:inherit;font-family:inherit;font-size:1.5rem;background-color:hsla(0,0%,100%,.08);width:100%;padding:0 .75rem;height:3rem;border-radius:1.5rem}.registrar #form-registrar-horas *>fieldset input option[data-v-251a7dfa],.registrar #form-registrar-horas *>fieldset select option[data-v-251a7dfa]{color:#000}.registrar #form-registrar-horas *>fieldset input[data-v-251a7dfa]::-webkit-inner-spin-button,.registrar #form-registrar-horas *>fieldset input[data-v-251a7dfa]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.registrar #form-registrar-horas *>fieldset input[type=number][data-v-251a7dfa]{-moz-appearance:textfield;caret-color:transparent}.registrar #form-registrar-horas *>fieldset select[data-v-251a7dfa]:hover{cursor:pointer}.registrar #form-registrar-horas>.formtop[data-v-251a7dfa]{display:flex;flex-flow:column nowrap;justify-content:space-between;width:calc(50% - 2rem);margin-left:2rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main[data-v-251a7dfa]{display:inline-block;width:30%}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main label[data-v-251a7dfa]{display:inline-block}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main>div[data-v-251a7dfa]{position:relative}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main>div button[data-v-251a7dfa]{position:absolute;top:.5rem;height:calc(100% - 1rem);width:20%;color:inherit;font-size:inherit;background-color:#008375;text-align:center;cursor:pointer;border:2px solid hsla(0,0%,100%,.12);box-shadow:0 1px 2px rgba(0,0,0,.48)}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main>div button[data-v-251a7dfa]:first-child{left:.5rem;border-radius:1.5rem 0 0 1.5rem;padding-left:.65rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main>div button[data-v-251a7dfa]:last-child{right:.5rem;border-radius:0 1.5rem 1.5rem 0;padding-right:1rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput .main>div input[data-v-251a7dfa]{text-align:center}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside[data-v-251a7dfa]{display:inline-block;height:100%;width:calc(74.5% - 2rem);vertical-align:top;padding-left:2rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside label[data-v-251a7dfa]{display:inline-block;margin-right:.75rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar[data-v-251a7dfa]{background-color:hsla(0,0%,100%,.08);padding:.5rem;width:100%;height:3rem;border-radius:1.5rem;display:flex;position:relative}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours[data-v-251a7dfa],.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .normal-hours[data-v-251a7dfa]{margin:0;padding:0;width:100%;display:flex}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours .count-hours[data-v-251a7dfa],.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .normal-hours .count-hours[data-v-251a7dfa]{background-color:#008375;border:2px solid hsla(0,0%,100%,.2);height:100%;width:12%;margin-left:.5%}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours .count-hours[data-v-251a7dfa]:first-child,.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .normal-hours .count-hours[data-v-251a7dfa]:first-child{border-radius:1.5rem 0 0 1.5rem}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours .count-hours[data-v-251a7dfa]:nth-child(8),.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .normal-hours .count-hours[data-v-251a7dfa]:nth-child(8){border-radius:0 1.5rem 1.5rem 0}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours .count-hours[data-v-251a7dfa]{background-color:#5cd6c9;width:25%}.registrar #form-registrar-horas>.formtop fieldset.timeInput aside .bar .extra-hours .count-hours[data-v-251a7dfa]:nth-child(4){border-radius:0 1.5rem 1.5rem 0}.registrar #form-registrar-horas>.formbtm[data-v-251a7dfa]{width:100%;margin-top:2rem}.registrar #form-registrar-horas>.postBtn[data-v-251a7dfa]{border:2px solid hsla(0,0%,100%,.24);background-color:#008375;font-size:inherit;font-family:inherit;border-radius:2rem;color:inherit;padding:1rem;margin:2rem 0 0;width:100%;box-shadow:0 2px 4px rgba(0,0,0,.48);cursor:pointer;transition:all .2s ease-in}.registrar #form-registrar-horas>.postBtn[data-v-251a7dfa]:hover{box-shadow:0 4px 8px rgba(0,0,0,.24)}@media (max-width:850px){.registrar h2[data-v-251a7dfa]{margin-left:15px}.registrar #form-registrar-horas[data-v-251a7dfa]{flex-direction:column;padding:15px}.registrar #form-registrar-horas .calendario[data-v-251a7dfa],.registrar #form-registrar-horas .formtop[data-v-251a7dfa]{margin:0!important;width:100%}.registrar #form-registrar-horas .calendario fieldset[data-v-251a7dfa],.registrar #form-registrar-horas .formtop fieldset[data-v-251a7dfa]{margin:15px 0}.registrar #form-registrar-horas .calendario .timeInput .main[data-v-251a7dfa],.registrar #form-registrar-horas .calendario .timeInput aside[data-v-251a7dfa],.registrar #form-registrar-horas .formtop .timeInput .main[data-v-251a7dfa],.registrar #form-registrar-horas .formtop .timeInput aside[data-v-251a7dfa]{margin:0;width:100%!important}.registrar #form-registrar-horas .calendario .timeInput aside[data-v-251a7dfa],.registrar #form-registrar-horas .formtop .timeInput aside[data-v-251a7dfa]{padding-left:0!important}}.list_horas[data-v-251a7dfa]{margin-top:7px;width:100%}.list_horas .list-enter-active[data-v-251a7dfa],.list_horas .list-leave-active[data-v-251a7dfa]{transition:all .2s}.list_horas .list-enter[data-v-251a7dfa],.list_horas .list-leave-to[data-v-251a7dfa]{opacity:0}.list_horas__title[data-v-251a7dfa]{opacity:0;transition:opacity .2s ease-in-out;transition-delay:.1s}.list_horas__title--show[data-v-251a7dfa]{opacity:1}',""]),t.exports=r},441:function(t,r,e){"use strict";e.r(r);e(44),e(24),e(30),e(6),e(25),e(5),e(11);var o=e(2),n=(e(70),e(13)),d=e(100),l=e(360),c=e(293),f=e(314),h=e(14),m=e(28);function v(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}var y={name:"Registrar",layout:"usuario",components:{Calendario:l.default,CustomSelect:c.default,ListarHoras:f.default,Modal:d.default},data:function(){return{fases:{},subatividades:{},modal:{show:!1,title:"",error:!0,errorAPI:!1,description:"",descriptionList:[],actionText:""},arrayHoras:[]}},computed:_(_(_(_({},Object(h.e)("form-registrar-horas",{horas:function(t){return t.horas},fase:function(t){return t.horas.fase},dataSelects:function(t){return t.dataSelects},validateForm:function(t){return t.validateForm},multipleData:function(t){return t.multipleData}})),Object(h.e)("usuario",{idusuario:function(t){return t.id},token:function(t){return t.token}})),Object(h.c)("form-registrar-horas",["projetos","isReset"])),{},{descricao:{get:function(){return this.horas.descricao},set:function(text){this.setDescricao(text)}}}),watch:{dataSelects:function(t){t.length&&(this.fases=t.find((function(select){return"Fases"===select.title})),this.subatividades=t.find((function(select){return"Subatividades"===select.title})))},fase:function(t,r){this.addData()},multipleData:function(t,r){t.length>0?this.listarHoras(t):this.arrayHoras=[]},idusuario:function(t){t&&(this.filterProjetos(this.idusuario),this.addData())}},created:function(){this.addData(),this.RESET_CALENDARIO()},methods:_(_(_(_({},Object(h.b)("form-registrar-horas",["addData","toggleBar","setDescricao","RESET"])),Object(h.b)("usuario",["filterProjetos"])),Object(h.d)("form-registrar-horas",["setValidationForm","TOGGLE_CALENDARIO_STATUS","RESET_CALENDARIO"])),{},{resetSelectBox:function(t){document.querySelector("#".concat(t)).selectedIndex=0},resetCalendario:function(){document.querySelector("#tbody").childNodes.forEach((function(tr){tr.childNodes.forEach((function(td){td.classList.remove("selected")}))}))},resetForm:function(t){this.resetSelectBox("projetos"),this.resetSelectBox("fases"),this.resetCalendario(),this.RESET(t)},postForm:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.setValidationForm(),!t.validateForm.msg.length){r.next=10;break}return t.modal.show=!0,t.modal.title="Erro no formulário!",t.modal.error=!0,t.modal.description="Corriga os campos abaixo:",t.modal.descriptionList=t.validateForm.msg,t.modal.actionText="Voltar",r.abrupt("return");case 10:Promise.all(t.multipleData.map((function(r){var e=_({usuario:t.idusuario,dataRefInicio:r},t.horas);return m.a.post(e,t.token)}))).then((function(r){t.TOGGLE_CALENDARIO_STATUS({status:!0}),t.modal.show=!0,t.modal.title="Sucesso!",t.modal.error=!1,t.modal.description="Horas cadastradas",t.modal.descriptionList=[],t.modal.actionText="Voltar",t.resetForm(!0)})).catch((function(r){t.modal.show=!0,t.modal.title="Erro!",t.modal.error=!0,t.modal.errorAPI=!0,t.modal.description=r.response.data.message?r.response.data.message:r.message,t.modal.descriptionList=[],t.modal.actionText="Voltar",t.resetForm(!0)})).finally((function(r){setTimeout((function(){t.RESET(!1)}),1500)}));case 11:case"end":return r.stop()}}),r)})))()},listarHoras:function(t){var r=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.arrayHoras=[],e.next=3,t.map((function(data){return m.a.getStatus(r.idusuario,data).then((function(t){t.data.totalHoras>0&&r.arrayHoras.push({data:data,res:t.data})}))}));case 3:case"end":return e.stop()}}),e)})))()}})},x=(e(390),e(3)),component=Object(x.a)(y,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"registrar"},[t.modal.show?e("modal",{staticClass:"registrar__modal",attrs:{title:t.modal.title,error:t.modal.error,description:t.modal.description,"description-list":t.modal.descriptionList,"action-text":t.modal.actionText},on:{setModalAction:function(r){t.modal.show=!t.modal.show}}}):t._e(),t._v(" "),e("h2",[t._v("Registrar horas")]),t._v(" "),e("main",[e("form",{attrs:{id:"form-registrar-horas"},on:{submit:function(r){return r.preventDefault(),t.postForm(r)}}},[e("calendario"),t._v(" "),e("div",{staticClass:"formtop"},[e("fieldset",{staticClass:"timeInput"},[e("div",{staticClass:"main"},[e("label",{attrs:{for:"horas"}},[t._v("Número de horas")]),t._v(" "),e("div",[e("button",{attrs:{disabled:1==t.horas.horas,"data-cy":"remove__hora",type:"button"},on:{click:function(r){return t.toggleBar(!1)}}},[t._v("\n                -\n              ")]),t._v(" "),e("input",{ref:"hours",attrs:{id:"horas","data-cy":"qtd__horas",type:"number",min:"0",max:"12"},domProps:{value:t.horas.horas+t.horas.extras}}),t._v(" "),e("button",{attrs:{disabled:t.horas.horas+t.horas.extras==12,"data-cy":"inclui__hora",type:"button"},on:{click:function(r){return t.toggleBar(!0)}}},[t._v("\n                +\n              ")])])]),t._v(" "),e("aside",[e("label",{style:t.horas.horas+t.horas.extras<=8?"":"color: rgba(255, 255, 255, 0.1)"},[t._v("Restante do dia")]),t._v(" "),e("label",{style:t.horas.horas+t.horas.extras>8?"":"color: rgba(255, 255, 255, 0.1)"},[t._v("Horas extras")]),t._v(" "),e("div",{staticClass:"bar"},[t.horas.horas+t.horas.extras<=8?e("div",{staticClass:"normal-hours"},t._l(t.horas.horas,(function(t){return e("div",{key:"normal-"+t,staticClass:"count-hours"})})),0):e("div",{staticClass:"extra-hours"},t._l(t.horas.extras,(function(t){return e("div",{key:"extras-"+t,staticClass:"count-hours"})})),0)])])]),t._v(" "),e("custom-select",{attrs:{"data-cy":"select__projeto",title:"Projetos",idInput:"projetos",values:t.projetos}}),t._v(" "),t.fases.title?e("custom-select",{attrs:{"data-cy":"select__fase",idInput:"fases",title:t.fases.title,values:t.fases.values}}):t._e(),t._v(" "),t.subatividades.title?e("custom-select",{attrs:{"data-cy":"select__subatividade",idInput:"subatividades",disabled:null===t.fase,title:t.subatividades.title,values:t.subatividades.values}}):t._e()],1),t._v(" "),e("div",{staticClass:"list_horas"},[e("h3",{staticClass:"list_horas__title",class:{"list_horas__title--show":t.arrayHoras.length>0}},[t._v("\n          Horas já registradas\n        ")]),t._v(" "),e("transition-group",{attrs:{name:"list"}},t._l(t.arrayHoras,(function(t,r){return e("listar-horas",{key:r+"-lista",attrs:{registro:t}})})),1)],1),t._v(" "),e("div",{staticClass:"formbtm"},[e("fieldset",[e("label",{attrs:{for:"descricao"}},[t._v("Descrição (opcional)")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.descricao,expression:"descricao"}],attrs:{id:"descricao",type:"text"},domProps:{value:t.descricao},on:{input:function(r){r.target.composing||(t.descricao=r.target.value)}}})])]),t._v(" "),e("button",{staticClass:"postBtn",attrs:{type:"submit","data-cy":"registrar__horas"}},[t._v("\n        Registrar horas\n      ")])],1)])],1)}),[],!1,null,"251a7dfa",null);r.default=component.exports;installComponents(component,{Modal:e(100).default,Calendario:e(360).default,CustomSelect:e(293).default,ListarHoras:e(314).default})}}]);