"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[202],{6202:(U,f,i)=>{i.r(f),i.d(f,{EstatesPageModule:()=>k});var h=i(177),_=i(1188),w=i(370),b=i(7462),j=i(3215),e=i(4438),p=i(9640),u=i(3390),g=i(1747),C=i(1253),v=i(513),M=i(6389),z=i(5930),m=i(1868),y=i(7434),c=i(4341),a=i(1997);function E(s,d){if(1&s&&e.nrm(0,"nz-option",2),2&s){const t=d.$implicit;e.Y8G("nzValue",t)("nzLabel",t.name)}}let I=(()=>{class s extends y.N{constructor(t,o,n){super(t,o,n),this.store=t,this.modalService=o,this.actions$=n,this.selectedOwner=null,(0,e.QZP)(()=>{this.selectedOwner=this.estate().owner})}static{this.\u0275fac=function(o){return new(o||s)(e.rXU(p.il),e.rXU(u.N_),e.rXU(g.En))}}static{this.\u0275cmp=e.VBU({type:s,selectors:[["owner-item"]],features:[e.Vt3],decls:7,vars:1,consts:[[1,"owner-item"],[1,"select",3,"ngModelChange","ngModel"],[3,"nzValue","nzLabel"]],template:function(o,n){1&o&&(e.j41(0,"div",0)(1,"div"),e.EFF(2,"Propri\xe9taire: "),e.k0s(),e.j41(3,"div")(4,"nz-select",1),e.mxI("ngModelChange",function(l){return e.DH7(n.selectedOwner,l)||(n.selectedOwner=l),l}),e.bIt("ngModelChange",function(){return n.setOwner(n.estate(),n.selectedOwner)}),e.Z7z(5,E,1,2,"nz-option",2,e.fX1),e.k0s()()()),2&o&&(e.R7$(4),e.R50("ngModel",n.selectedOwner),e.R7$(),e.Dyx(n.owners()))},dependencies:[c.BC,c.vS,a.ld,a.WI],styles:["[_nghost-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center}.owner-item[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.select[_ngcontent-%COMP%]{width:100%}"]})}}return s})();var x=i(1257);function F(s,d){if(1&s&&e.nrm(0,"nz-option",2),2&s){const t=d.$implicit;e.Y8G("nzValue",t)("nzLabel",t.name)}}let P=(()=>{class s extends x.t{constructor(t,o,n,r){super(t,o,n,r),this.store=t,this.modalService=o,this.actions$=n,this.rentService=r,this.selectedLodger=null,(0,e.QZP)(()=>{this.selectedLodger=this.estate().lodger})}static{this.\u0275fac=function(o){return new(o||s)(e.rXU(p.il),e.rXU(u.N_),e.rXU(g.En),e.rXU(C.t))}}static{this.\u0275cmp=e.VBU({type:s,selectors:[["lodger-item"]],features:[e.Vt3],decls:7,vars:1,consts:[[1,"lodger-item"],[1,"select",3,"ngModelChange","ngModel"],[3,"nzValue","nzLabel"]],template:function(o,n){1&o&&(e.j41(0,"div",0)(1,"div"),e.EFF(2,"Locataire: "),e.k0s(),e.j41(3,"div")(4,"nz-select",1),e.mxI("ngModelChange",function(l){return e.DH7(n.selectedLodger,l)||(n.selectedLodger=l),l}),e.bIt("ngModelChange",function(){return n.setLodger(n.selectedLodger)}),e.Z7z(5,F,1,2,"nz-option",2,e.fX1),e.k0s()()()),2&o&&(e.R7$(4),e.R50("ngModel",n.selectedLodger),e.R7$(),e.Dyx(n.lodgers()))},dependencies:[c.BC,c.vS,a.ld,a.WI],styles:["[_nghost-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center}.lodger-item[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.select[_ngcontent-%COMP%]{width:100%}"]})}}return s})();function O(s,d){if(1&s){const t=e.RV6();e.qex(0),e.j41(1,"li",7)(2,"ul")(3,"li",8),e.nrm(4,"owner-item",9),e.k0s(),e.j41(5,"li",8),e.nrm(6,"lodger-item",9),e.k0s(),e.j41(7,"li",8)(8,"div",10)(9,"div",11),e.EFF(10,"rent:"),e.k0s(),e.j41(11,"div",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.sdS(15),l=e.XpG();return e.Njj(l.startEdit(n.id+"rent",r))}),e.j41(12,"div",13),e.EFF(13),e.k0s(),e.j41(14,"input",14,0),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.stopEdit())})("change",function(){const n=e.eBV(t).$implicit,r=e.sdS(15),l=e.XpG();return e.Njj(l.edit(n,"rent",r))}),e.k0s()()()(),e.j41(16,"li",8)(17,"div",10)(18,"div",11),e.EFF(19,"charges:"),e.k0s(),e.j41(20,"div",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.sdS(24),l=e.XpG();return e.Njj(l.startEdit(n.id+"charges",r))}),e.j41(21,"div",13),e.EFF(22),e.k0s(),e.j41(23,"input",14,1),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.stopEdit())})("change",function(){const n=e.eBV(t).$implicit,r=e.sdS(24),l=e.XpG();return e.Njj(l.edit(n,"charges",r))}),e.k0s()()()(),e.j41(25,"li",8)(26,"div",15)(27,"button",3),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.openRentReceipt(n))}),e.EFF(28,"quittances"),e.k0s(),e.j41(29,"button",16),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.deleteEstate(n))}),e.EFF(30,"supprimer"),e.k0s()()()()(),e.bVm()}if(2&s){const t=d.$implicit,o=e.XpG();e.R7$(),e.Y8G("nzTitle",t.plot_address),e.R7$(3),e.Y8G("estate",t),e.R7$(2),e.Y8G("estate",t),e.R7$(6),e.Y8G("hidden",o.editId===t.id+"rent"),e.R7$(),e.JRh(t.rent),e.R7$(),e.Y8G("value",t.rent)("hidden",o.editId!==t.id+"rent"),e.R7$(7),e.Y8G("hidden",o.editId===t.id+"charges"),e.R7$(),e.JRh(t.charges),e.R7$(),e.Y8G("value",t.charges)("hidden",o.editId!==t.id+"charges")}}const R=[{path:"",component:(()=>{class s extends w.y{constructor(t,o,n,r){super(t,o,n),this.store=t,this.modalService=o,this.actions$=n,this.rentService=r}openCreateOwner(){this.modalService.create({nzTitle:"Ajouter un nouveau propri\xe9taire",nzContent:b.X,nzFooter:null})}openCreateLodger(){this.modalService.create({nzTitle:"Ajouter un nouveau locataire",nzContent:j.B,nzFooter:null})}openRentReceipt(t){this.rentService.downloadCustomizedRentReceipt(t)}static{this.\u0275fac=function(o){return new(o||s)(e.rXU(p.il),e.rXU(u.N_),e.rXU(g.En),e.rXU(C.t))}}static{this.\u0275cmp=e.VBU({type:s,selectors:[["app-estates-page"]],features:[e.Vt3],decls:10,vars:1,consts:[["editableRentInput",""],["editableChargesInput",""],[1,"add-estate-button-container"],["nz-button","","nzType","primary",3,"click"],[1,"estates-content"],["nz-menu","","nzMode","inline"],[4,"ngFor","ngForOf"],["nz-submenu","","nzIcon","home",3,"nzTitle"],["nz-menu-item",""],[3,"estate"],[1,"row","cell"],[1,"title"],[1,"editable-cell-number","clickable",3,"click"],[3,"hidden"],["nz-demo-input-number-basic","","type","number",3,"blur","change","value","hidden"],[1,"row","footer-buttons"],["nz-button","","nzType","primary","nzDanger","",3,"click"]],template:function(o,n){1&o&&(e.j41(0,"div",2)(1,"button",3),e.bIt("click",function(){return n.openCreateEstatePopup()}),e.EFF(2,"+ bien"),e.k0s(),e.j41(3,"button",3),e.bIt("click",function(){return n.openCreateOwner()}),e.EFF(4,"+ propri\xe9taire"),e.k0s(),e.j41(5,"button",3),e.bIt("click",function(){return n.openCreateLodger()}),e.EFF(6,"+ locataire"),e.k0s()(),e.j41(7,"div",4)(8,"ul",5),e.DNE(9,O,31,11,"ng-container",6),e.k0s()()),2&o&&(e.R7$(9),e.Y8G("ngForOf",n.estates()))},dependencies:[h.Sq,v.aO,M.c,z.p,m.jS,m.CU,m.Nu,I,P],styles:["[_nghost-%COMP%]{position:relative;width:100%;height:100%;display:flex;flex-flow:column nowrap;align-items:flex-start;justify-content:flex-start}.add-estate-button-container[_ngcontent-%COMP%]{width:100%;right:0;z-index:1000;padding:10px;display:flex;flex-flow:row nowrap;align-items:center;justify-content:center;gap:10px}.estates-content[_ngcontent-%COMP%]{width:100%;height:100%;overflow-y:auto}.input-number[_ngcontent-%COMP%]{min-width:40px}.field[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;gap:10px}.row[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-evenly;align-items:center}.cell[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.footer-buttons[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-evenly;align-items:center;gap:10px}  .ant-menu-submenu-title{padding:0!important}"]})}}return s})()}];let T=(()=>{class s{static{this.\u0275fac=function(o){return new(o||s)}}static{this.\u0275mod=e.$C({type:s})}static{this.\u0275inj=e.G2t({imports:[_.iI.forChild(R),_.iI]})}}return s})();var X=i(7211),G=i(8543),V=i(1069),$=i(7778),L=i(2552);let k=(()=>{class s{static{this.\u0275fac=function(o){return new(o||s)}}static{this.\u0275mod=e.$C({type:s})}static{this.\u0275inj=e.G2t({imports:[h.MD,T,$.j,c.YN,L.H,u.U6,v.Zw,m.GP,a.DH,p.md.forFeature("estates",X.i),g.Vm.forFeature(G.u,V.H),a.DH]})}}return s})()}}]);