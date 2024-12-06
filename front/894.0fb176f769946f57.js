"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[894],{4894:(A,h,s)=>{s.r(h),s.d(h,{EstatesPageModule:()=>Z});var _=s(177),w=s(1188),v=s(370),z=s(7462),E=s(889),M=s(1281),e=s(4438),d=s(9640),p=s(3390),u=s(1747),C=s(5458),F=s(2440),b=s(7498);let y=(()=>{class o{constructor(t,i,n){this.store=t,this.modalService=i,this.actions$=n}sendDownloadRentReceiptRequest(t){this.store.dispatch((0,F.KP)({estateId:t.id}))}openCreateOwnerPopup(t){this.modalService.create({nzTitle:"Ajouter un nouveau locataire",nzContent:b.r,nzData:{owner:t},nzFooter:null})}static{this.\u0275fac=function(i){return new(i||o)(e.KVO(d.il),e.KVO(p.N_),e.KVO(u.En))}}static{this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var j=s(513),R=s(6389),P=s(5930),g=s(1868),f=s(2602),I=s(3457),m=s(4341),c=s(1997);function O(o,a){if(1&o&&e.nrm(0,"nz-option",2),2&o){const t=a.$implicit;e.Y8G("nzValue",t)("nzLabel",t.name)}}let x=(()=>{class o extends I.N{constructor(t,i,n){super(t,i,n),this.store=t,this.modalService=i,this.actions$=n,this.selectedOwner=null,(0,e.QZP)(()=>{this.selectedOwner=this.estate().owner})}static{this.\u0275fac=function(i){return new(i||o)(e.rXU(d.il),e.rXU(p.N_),e.rXU(u.En))}}static{this.\u0275cmp=e.VBU({type:o,selectors:[["owner-item"]],features:[e.Vt3],decls:7,vars:1,consts:[[1,"owner-item"],[1,"select",3,"ngModelChange","ngModel"],[3,"nzValue","nzLabel"]],template:function(i,n){1&i&&(e.j41(0,"div",0)(1,"div"),e.EFF(2,"Propri\xe9taire: "),e.k0s(),e.j41(3,"div")(4,"nz-select",1),e.mxI("ngModelChange",function(l){return e.DH7(n.selectedOwner,l)||(n.selectedOwner=l),l}),e.bIt("ngModelChange",function(){return n.setOwner(n.estate(),n.selectedOwner)}),e.Z7z(5,O,1,2,"nz-option",2,e.fX1),e.k0s()()()),2&i&&(e.R7$(4),e.R50("ngModel",n.selectedOwner),e.R7$(),e.Dyx(n.owners()))},dependencies:[m.BC,m.vS,c.ld,c.WI],styles:["[_nghost-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center}.owner-item[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.select[_ngcontent-%COMP%]{width:100%}"]})}}return o})();var $=s(1257);function T(o,a){if(1&o&&e.nrm(0,"nz-option",2),2&o){const t=a.$implicit;e.Y8G("nzValue",t)("nzLabel",t.name)}}let V=(()=>{class o extends $.t{constructor(t,i,n,r){super(t,i,n,r),this.store=t,this.modalService=i,this.actions$=n,this.rentService=r,this.selectedLodger=null,(0,e.QZP)(()=>{this.selectedLodger=this.estate().lodger})}static{this.\u0275fac=function(i){return new(i||o)(e.rXU(d.il),e.rXU(p.N_),e.rXU(u.En),e.rXU(C.t))}}static{this.\u0275cmp=e.VBU({type:o,selectors:[["lodger-item"]],features:[e.Vt3],decls:7,vars:1,consts:[[1,"lodger-item"],[1,"select",3,"ngModelChange","ngModel"],[3,"nzValue","nzLabel"]],template:function(i,n){1&i&&(e.j41(0,"div",0)(1,"div"),e.EFF(2,"Locataire: "),e.k0s(),e.j41(3,"div")(4,"nz-select",1),e.mxI("ngModelChange",function(l){return e.DH7(n.selectedLodger,l)||(n.selectedLodger=l),l}),e.bIt("ngModelChange",function(){return n.setLodger(n.selectedLodger)}),e.Z7z(5,T,1,2,"nz-option",2,e.fX1),e.k0s()()()),2&i&&(e.R7$(4),e.R50("ngModel",n.selectedLodger),e.R7$(),e.Dyx(n.lodgers()))},dependencies:[m.BC,m.vS,c.ld,c.WI],styles:["[_nghost-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center}.lodger-item[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.select[_ngcontent-%COMP%]{width:100%}"]})}}return o})();function k(o,a){if(1&o){const t=e.RV6();e.j41(0,"li",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.openEditOwner(n))}),e.EFF(1),e.k0s()}if(2&o){const t=a.$implicit;e.R7$(),e.JRh(t.name)}}function X(o,a){if(1&o){const t=e.RV6();e.j41(0,"li",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.deleteOwner(n))}),e.EFF(1),e.k0s()}if(2&o){const t=a.$implicit;e.R7$(),e.JRh(t.name)}}function G(o,a){if(1&o){const t=e.RV6();e.j41(0,"li",12),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.deleteLodger(n))}),e.EFF(1),e.k0s()}if(2&o){const t=a.$implicit;e.R7$(),e.JRh(t.name)}}function D(o,a){if(1&o){const t=e.RV6();e.qex(0),e.j41(1,"li",18)(2,"ul")(3,"li",14),e.nrm(4,"owner-item",19),e.k0s(),e.j41(5,"li",14),e.nrm(6,"lodger-item",19),e.k0s(),e.j41(7,"li",14)(8,"div",20)(9,"div",21),e.EFF(10,"rent:"),e.k0s(),e.j41(11,"div",22),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.sdS(15),l=e.XpG();return e.Njj(l.startEdit(n.id+"rent",r))}),e.j41(12,"div",23),e.EFF(13),e.k0s(),e.j41(14,"input",24,5),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.stopEdit())})("change",function(){const n=e.eBV(t).$implicit,r=e.sdS(15),l=e.XpG();return e.Njj(l.edit(n,"rent",r))}),e.k0s()()()(),e.j41(16,"li",14)(17,"div",20)(18,"div",21),e.EFF(19,"charges:"),e.k0s(),e.j41(20,"div",22),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.sdS(24),l=e.XpG();return e.Njj(l.startEdit(n.id+"charges",r))}),e.j41(21,"div",23),e.EFF(22),e.k0s(),e.j41(23,"input",24,6),e.bIt("blur",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.stopEdit())})("change",function(){const n=e.eBV(t).$implicit,r=e.sdS(24),l=e.XpG();return e.Njj(l.edit(n,"charges",r))}),e.k0s()()()(),e.j41(25,"li",14)(26,"div",25)(27,"button",8),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.openRentReceipt(n))}),e.EFF(28,"quittances"),e.k0s(),e.j41(29,"button",26),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG();return e.Njj(r.deleteEstate(n))}),e.EFF(30,"supprimer"),e.k0s()()()()(),e.bVm()}if(2&o){const t=a.$implicit,i=e.XpG();e.R7$(),e.Y8G("nzTitle",t.plot_address),e.R7$(3),e.Y8G("estate",t),e.R7$(2),e.Y8G("estate",t),e.R7$(6),e.Y8G("hidden",i.editId===t.id+"rent"),e.R7$(),e.JRh(t.rent),e.R7$(),e.Y8G("value",t.rent)("hidden",i.editId!==t.id+"rent"),e.R7$(7),e.Y8G("hidden",i.editId===t.id+"charges"),e.R7$(),e.JRh(t.charges),e.R7$(),e.Y8G("value",t.charges)("hidden",i.editId!==t.id+"charges")}}const L=[{path:"",component:(()=>{class o extends v.y{constructor(t,i,n,r,l){super(t,i,n),this.store=t,this.modalService=i,this.actions$=n,this.rentService=r,this.ownerService=l}openCreateOwner(){this.modalService.create({nzTitle:"Ajouter un nouveau propri\xe9taire",nzContent:z.X,nzFooter:null})}openCreateLodger(){this.rentService.openCreateLodgerPopup()}openEditOwner(t){this.ownerService.openCreateOwnerPopup(t)}deleteOwner(t){this.store.dispatch((0,E.HD)({ownerId:t.id}))}deleteLodger(t){this.store.dispatch((0,M.rX)({lodgerId:t.id}))}openRentReceipt(t){this.rentService.downloadCustomizedRentReceipt(t)}static{this.\u0275fac=function(i){return new(i||o)(e.rXU(d.il),e.rXU(p.N_),e.rXU(u.En),e.rXU(C.t),e.rXU(y))}}static{this.\u0275cmp=e.VBU({type:o,selectors:[["app-estates-page"]],features:[e.Vt3],decls:41,vars:6,consts:[["owner",""],["editOwner",""],["removeOwner",""],["lodger",""],["removeLodger",""],["editableRentInput",""],["editableChargesInput",""],[1,"add-estate-button-container"],["nz-button","","nzType","primary",3,"click"],["nz-button","","nzType","primary","nz-dropdown","",3,"nzDropdownMenu"],["nz-selectable",""],["nz-menu",""],["nz-menu-item","",3,"click"],["nz-menu-item","","nz-dropdown","",3,"nzDropdownMenu"],["nz-menu-item",""],[1,"estates-content"],["nz-menu","","nzMode","inline"],[4,"ngFor","ngForOf"],["nz-submenu","","nzIcon","home",3,"nzTitle"],[3,"estate"],[1,"row","cell"],[1,"title"],[1,"editable-cell-number","clickable",3,"click"],[3,"hidden"],["nz-demo-input-number-basic","","type","number",3,"blur","change","value","hidden"],[1,"row","footer-buttons"],["nz-button","","nzType","primary","nzDanger","",3,"click"]],template:function(i,n){if(1&i){const r=e.RV6();e.j41(0,"div",7)(1,"button",8),e.bIt("click",function(){return e.eBV(r),e.Njj(n.openCreateEstatePopup())}),e.EFF(2,"+ bien"),e.k0s(),e.j41(3,"button",9),e.EFF(4,"propri\xe9taire"),e.k0s(),e.j41(5,"button",9),e.EFF(6,"locataire"),e.k0s()(),e.j41(7,"nz-dropdown-menu",10,0)(9,"ul",11)(10,"li",12),e.bIt("click",function(){return e.eBV(r),e.Njj(n.openCreateOwner())}),e.EFF(11,"cr\xe9er un nouveau propri\xe9taire"),e.k0s(),e.j41(12,"li",13),e.EFF(13,"\xe9diter un nouveau propri\xe9taire"),e.k0s(),e.j41(14,"li",13),e.EFF(15,"supprimer un propri\xe9taire"),e.k0s()()(),e.j41(16,"nz-dropdown-menu",null,1)(18,"ul",11),e.Z7z(19,k,2,1,"li",14,e.fX1),e.k0s()(),e.j41(21,"nz-dropdown-menu",null,2)(23,"ul",11),e.Z7z(24,X,2,1,"li",14,e.fX1),e.k0s()(),e.j41(26,"nz-dropdown-menu",10,3)(28,"ul",11)(29,"li",12),e.bIt("click",function(){return e.eBV(r),e.Njj(n.openCreateLodger())}),e.EFF(30,"cr\xe9er un nouveau locataire"),e.k0s(),e.j41(31,"li",13),e.EFF(32,"supprimer un nouveau locataire"),e.k0s()()(),e.j41(33,"nz-dropdown-menu",null,4)(35,"ul",11),e.Z7z(36,G,2,1,"li",14,e.fX1),e.k0s()(),e.j41(38,"div",15)(39,"ul",16),e.DNE(40,D,31,11,"ng-container",17),e.k0s()()}if(2&i){const r=e.sdS(8),l=e.sdS(17),J=e.sdS(22),K=e.sdS(27),Q=e.sdS(34);e.R7$(3),e.Y8G("nzDropdownMenu",r),e.R7$(2),e.Y8G("nzDropdownMenu",K),e.R7$(7),e.Y8G("nzDropdownMenu",l),e.R7$(2),e.Y8G("nzDropdownMenu",J),e.R7$(5),e.Dyx(n.owners()),e.R7$(5),e.Dyx(n.owners()),e.R7$(7),e.Y8G("nzDropdownMenu",Q),e.R7$(5),e.Dyx(n.lodgers()),e.R7$(4),e.Y8G("ngForOf",n.estates())}},dependencies:[_.Sq,j.aO,R.c,P.p,g.jS,g.CU,g.Nu,f.j3,f.wQ,f.h4,x,V],styles:["[_nghost-%COMP%]{position:relative;width:100%;height:100%;display:flex;flex-flow:column nowrap;align-items:flex-start;justify-content:flex-start}.add-estate-button-container[_ngcontent-%COMP%]{width:100%;right:0;z-index:1000;padding:10px;display:flex;flex-flow:row nowrap;align-items:center;justify-content:center;gap:10px}.estates-content[_ngcontent-%COMP%]{width:100%;height:100%;overflow-y:auto}.input-number[_ngcontent-%COMP%]{min-width:40px}.field[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;gap:10px}.row[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-evenly;align-items:center}.cell[_ngcontent-%COMP%]{width:100%;display:flex;flex-flow:row wrap;justify-content:space-between;align-items:center;gap:10px}.footer-buttons[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap;justify-content:space-evenly;align-items:center;gap:10px}  .ant-menu-submenu-title{padding:0!important}"]})}}return o})()}];let N=(()=>{class o{static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275mod=e.$C({type:o})}static{this.\u0275inj=e.G2t({imports:[w.iI.forChild(L),w.iI]})}}return o})();var S=s(7211),B=s(8543),U=s(1069),Y=s(8221),H=s(2552);let Z=(()=>{class o{static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275mod=e.$C({type:o})}static{this.\u0275inj=e.G2t({imports:[_.MD,N,Y.j,m.YN,H.H,p.U6,j.Zw,g.GP,c.DH,f.Cu,d.md.forFeature("estates",S.i),u.Vm.forFeature(B.u,U.H),c.DH]})}}return o})()}}]);