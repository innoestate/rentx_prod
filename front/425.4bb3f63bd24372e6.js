"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[425],{1257:($,M,t)=>{t.d(M,{t:()=>y});var e=t(4438),a=t(431),c=t(1281),s=t(496),h=t(9640),E=t(3390),r=t(1747),u=t(5458);let y=(()=>{class P{constructor(d,m,v,n){this.store=d,this.modalService=m,this.actions$=v,this.rentService=n,this.estate=e.hFB.required(),this.lodgers=this.store.selectSignal(s.T)}downloadCustomizedRentReceipt(){this.rentService.downloadCustomizedRentReceipt(this.estate())}downloadRentReceipt(){this.rentService.downloadRentReceipt(this.estate())}senddRentReceipt(){this.rentService.sendRentReceiptByEmail(this.estate())}createLodger(){this.rentService.openCreateLodgerPopup(this.estate())}setLodger(d){this.store.dispatch((0,a.dG)({estate:{id:this.estate().id,lodger_id:d?.id??""}}))}deleteLodger(d){this.store.dispatch((0,c.rX)({lodgerId:d.id}))}static{this.\u0275fac=function(m){return new(m||P)(e.rXU(h.il),e.rXU(E.N_),e.rXU(r.En),e.rXU(u.t))}}static{this.\u0275dir=e.FsC({type:P,inputs:{estate:[1,"estate"]}})}}return P})()},3457:($,M,t)=>{t.d(M,{N:()=>P});var e=t(4438),a=t(7462),c=t(7498),s=t(431),h=t(889),E=t(1176),r=t(9640),u=t(3390),y=t(1747);let P=(()=>{class f{constructor(m,v,n){this.store=m,this.modalService=v,this.actions$=n,this.estate=e.hFB.required(),this.owners=this.store.selectSignal(E.P)}openCreateOwnerPopup(){this.modalService.create({nzTitle:"Ajouter un nouveau propri\xe9taire",nzContent:a.X,nzFooter:null})}openEditOwnerPopup(m){this.modalService.create({nzTitle:"\xe9ditier un propri\xe9taire",nzContent:c.r,nzData:{owner:m},nzFooter:null})}createOwner(m){this.openCreateOwnerPopup()}setOwner(m,v){this.store.dispatch((0,s.dG)({estate:{...m,owner_id:v.id}}))}deleteOwner(m){this.store.dispatch((0,h.HD)({ownerId:m.id}))}editOwner(m){this.openEditOwnerPopup(m)}static{this.\u0275fac=function(v){return new(v||f)(e.rXU(r.il),e.rXU(u.N_),e.rXU(y.En))}}static{this.\u0275dir=e.FsC({type:f,inputs:{estate:[1,"estate"]}})}}return f})()},370:($,M,t)=>{t.d(M,{y:()=>o});var e=t(431),a=t(9640);const E=(0,a.UX)("estates"),r=(0,a.UX)("owners"),u=(0,a.UX)("lodgers"),y=(0,a.Mz)(E,r,u,(i,l,p)=>i.estates.map(D=>((i,l,p)=>({...i,address:i.street+" "+i.city+" "+i.zip,plot_address:i.plot?"LOT "+i.plot+" / "+i.street+" "+i.city+" "+i.zip:i.street+" "+i.city+" "+i.zip,owner:l.find(D=>D.id+""==i.owner_id+""),lodger:p.find(D=>D.id+""==i.lodger_id+"")}))(D,l.owners,p.lodgers)));var P=t(496),f=t(1176),d=t(4341),m=t(513),v=t(1997),n=t(4438);let L=(()=>{class i{constructor(p,D){this.formBuilder=p,this.store=D,this.owners=this.store.selectSignal(f.P)}ngOnInit(){this.buildFormGroup()}buildFormGroup(){this.formGroup=this.formBuilder.group({street:new d.MJ("",[d.k0.required]),city:new d.MJ("",[d.k0.required]),zip:new d.MJ("",[d.k0.required]),plot:new d.MJ(""),rent:new d.MJ(0),charges:new d.MJ(0),owner:new d.MJ(this.owners().length?this.owners()[0].id:null),lodger:new d.MJ("")})}create(){if(this.formGroup.invalid)return;const p=(i=>{let l=i.get("owner")?.value;return"string"!=typeof l&&"number"!=typeof l&&l&&(l=i.get("owner")?.value?.id),{street:i.get("street").value,city:i.get("city").value,zip:i.get("zip").value,plot:i.get("plot")?.value,rent:i.get("rent")?.value,charges:i.get("charges")?.value,owner_id:l,lodger_id:i.get("lodger")?.value}})(this.formGroup);this.store.dispatch((0,e.l6)({estate:p}))}static{this.\u0275fac=function(D){return new(D||i)(n.rXU(d.ok),n.rXU(a.il))}}static{this.\u0275dir=n.FsC({type:i})}}return i})();var F=t(6389),T=t(5930);function R(i,l){if(1&i&&n.nrm(0,"nz-option",8),2&i){const p=l.$implicit;n.Y8G("nzValue",p.id)("nzLabel",p.name)}}let I=(()=>{class i extends L{static{this.\u0275fac=(()=>{let p;return function(w){return(p||(p=n.xGo(i)))(w||i)}})()}static{this.\u0275cmp=n.VBU({type:i,selectors:[["create-estate-popup"]],standalone:!0,features:[n.Vt3,n.aNF],decls:21,vars:1,consts:[[1,"form-group-popup",3,"formGroup"],["for","name"],["type","text","formControlName","street",1,"form-control"],["type","text","formControlName","city",1,"form-control"],["type","text","formControlName","zip",1,"form-control"],["type","text","formControlName","plot",1,"form-control"],["for","owner"],["formControlName","owner","nzPlaceHolder","Propri\xe9taire",1,"select"],[3,"nzValue","nzLabel"],[1,"footer"],["nz-button","","nzType","primary",3,"click"]],template:function(D,w){1&D&&(n.j41(0,"form",0)(1,"label",1),n.EFF(2,"Adresse"),n.k0s(),n.nrm(3,"input",2),n.j41(4,"label",1),n.EFF(5,"Ville"),n.k0s(),n.nrm(6,"input",3),n.j41(7,"label",1),n.EFF(8,"Code Postal"),n.k0s(),n.nrm(9,"input",4),n.j41(10,"label",1),n.EFF(11,"Lot"),n.k0s(),n.nrm(12,"input",5),n.j41(13,"label",6),n.EFF(14,"Propri\xe9taire"),n.k0s(),n.j41(15,"nz-select",7),n.Z7z(16,R,1,2,"nz-option",8,n.fX1),n.k0s()(),n.j41(18,"div",9)(19,"button",10),n.bIt("click",function(){return w.create()}),n.EFF(20,"cr\xe9er"),n.k0s()()),2&D&&(n.Y8G("formGroup",w.formGroup),n.R7$(16),n.Dyx(w.owners()))},dependencies:[d.X1,d.qT,d.me,d.BC,d.cb,d.j4,d.JD,v.DH,v.ld,v.WI,m.Zw,m.aO,F.c,T.p],styles:[".form-group-popup[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;justify-content:flex-start;align-items:flex-start}"]})}}return i})();var g=t(3390),C=t(1747);let o=(()=>{class i{constructor(p,D,w){this.store=p,this.modalService=D,this.actions$=w,this.owners=this.store.selectSignal(f.P),this.lodgers=this.store.selectSignal(P.T),this.estates=this.store.selectSignal(y)}ngOnInit(){this.store.dispatch((0,e.kW)())}openCreateEstatePopup(){this.modalService.create({nzTitle:"Cr\xe9er un nouveau bien",nzContent:I,nzFooter:null})}startEdit(p,D){this.editId=p,setTimeout(()=>{requestAnimationFrame(()=>{D.focus()})},0)}stopEdit(){this.editId=null}edit(p,D,w){const O={id:p.id};O[D]=w.value,this.store.dispatch({type:"[Estates] Edit Estate",estate:O})}deleteEstate(p){this.store.dispatch((0,e.su)({estateId:p.id}))}static{this.\u0275fac=function(D){return new(D||i)(n.rXU(a.il),n.rXU(g.N_),n.rXU(C.En))}}static{this.\u0275dir=n.FsC({type:i})}}return i})()},7462:($,M,t)=>{t.d(M,{X:()=>d});var e=t(4341),a=t(889),c=t(2062),s=t(4438),h=t(9640);let E=(()=>{class m{constructor(n,L){this.formBuilder=n,this.store=L}ngOnInit(){this.buildFormGroup()}buildFormGroup(){this.formGroup=this.formBuilder.group({name:new e.MJ("",[e.k0.required]),street:new e.MJ("",[e.k0.required]),city:new e.MJ("",[e.k0.required]),zip:new e.MJ("",[e.k0.required]),signature:new e.MJ("")})}create(){if(this.formGroup.invalid)return;const n=(0,c.g)(this.formGroup);this.store.dispatch((0,a.lv)({owner:n}))}static{this.\u0275fac=function(L){return new(L||m)(s.rXU(e.ok),s.rXU(h.il))}}static{this.\u0275dir=s.FsC({type:m})}}return m})();var r=t(1997),u=t(513),y=t(8468),P=t(6389),f=t(5930);let d=(()=>{class m extends E{static{this.\u0275fac=(()=>{let n;return function(F){return(n||(n=s.xGo(m)))(F||m)}})()}static{this.\u0275cmp=s.VBU({type:m,selectors:[["app-create-owner-popup"]],standalone:!0,features:[s.Vt3,s.aNF],decls:19,vars:1,consts:[[1,"form-group-popup",3,"formGroup"],["for","name"],["type","text","formControlName","name",1,"form-control"],["type","text","formControlName","street",1,"form-control"],["type","text","formControlName","city",1,"form-control"],["type","text","formControlName","zip",1,"form-control"],["formControlName","signature"],[1,"footer"],["nz-button","","nzType","primary",3,"click"]],template:function(L,F){1&L&&(s.j41(0,"form",0)(1,"label",1),s.EFF(2,"Nom et pr\xe9nom"),s.k0s(),s.nrm(3,"input",2),s.j41(4,"label",1),s.EFF(5,"Adresse"),s.k0s(),s.nrm(6,"input",3),s.j41(7,"label",1),s.EFF(8,"Ville"),s.k0s(),s.nrm(9,"input",4),s.j41(10,"label",1),s.EFF(11,"Code Postal"),s.k0s(),s.nrm(12,"input",5),s.j41(13,"label",1),s.EFF(14,"Signature"),s.k0s(),s.nrm(15,"signature-pad",6),s.k0s(),s.j41(16,"div",7)(17,"button",8),s.bIt("click",function(){return F.create()}),s.EFF(18,"cr\xe9er"),s.k0s()()),2&L&&s.Y8G("formGroup",F.formGroup)},dependencies:[e.X1,e.qT,e.me,e.BC,e.cb,e.j4,e.JD,r.DH,u.Zw,u.aO,P.c,f.p,y.u]})}}return m})()},7498:($,M,t)=>{t.d(M,{r:()=>T});var e=t(4341),a=t(513),c=t(1997),s=t(3390),h=t(889),E=t(2062),r=t(4438),u=t(9640);let y=(()=>{class R{constructor(g,C,o){this.data=g,this.formBuilder=C,this.store=o}ngOnInit(){this.buildFormGroup()}buildFormGroup(){this.formGroup=this.formBuilder.group({name:new e.MJ(this.data?.owner?.name??"",[e.k0.required]),street:new e.MJ(this.data?.owner?.street??""),city:new e.MJ(this.data?.owner?.city??""),zip:new e.MJ(this.data?.owner?.zip??""),signature:new e.MJ(this.data?.owner?.signature??"")})}edit(){if(this.formGroup.invalid)return;const g=(0,E.o)(this.formGroup,this.data.owner.id);this.store.dispatch((0,h.He)({owner:g}))}static{this.\u0275fac=function(C){return new(C||R)(r.rXU(s.or),r.rXU(e.ok),r.rXU(u.il))}}static{this.\u0275dir=r.FsC({type:R})}}return R})();var P=t(8468),f=t(1747),d=t(1413),m=t(6977),v=t(6697),n=t(8141),L=t(6389),F=t(5930);let T=(()=>{class R extends y{constructor(g,C,o,i,l){super(g,C,o),this.data=g,this.formBuilder=C,this.store=o,this.modalRef=i,this.actions$=l,this.destroyed$=new d.B}ngOnInit(){super.ngOnInit(),this.actions$.pipe((0,f.gp)(h.eX),(0,m.Q)(this.destroyed$),(0,v.s)(1),(0,n.M)(()=>this.modalRef.close())).subscribe()}ngOnDestroy(){this.destroyed$.next(),this.destroyed$.complete()}static{this.\u0275fac=function(C){return new(C||R)(r.rXU(s.or),r.rXU(e.ok),r.rXU(u.il),r.rXU(s.J9),r.rXU(f.En))}}static{this.\u0275cmp=r.VBU({type:R,selectors:[["edit-owner-popup"]],standalone:!0,features:[r.Vt3,r.aNF],decls:19,vars:1,consts:[[1,"form-group-popup",3,"formGroup"],["for","name"],["type","text","formControlName","name",1,"form-control"],["type","text","formControlName","street",1,"form-control"],["type","text","formControlName","city",1,"form-control"],["type","text","formControlName","zip",1,"form-control"],["formControlName","signature"],[1,"footer"],["nz-button","","nzType","primary",3,"click"]],template:function(C,o){1&C&&(r.j41(0,"form",0)(1,"label",1),r.EFF(2,"Nom et pr\xe9nom"),r.k0s(),r.nrm(3,"input",2),r.j41(4,"label",1),r.EFF(5,"Adresse"),r.k0s(),r.nrm(6,"input",3),r.j41(7,"label",1),r.EFF(8,"Ville"),r.k0s(),r.nrm(9,"input",4),r.j41(10,"label",1),r.EFF(11,"Code Postal"),r.k0s(),r.nrm(12,"input",5),r.j41(13,"label",1),r.EFF(14,"Signature"),r.k0s(),r.nrm(15,"signature-pad",6),r.k0s(),r.j41(16,"div",7)(17,"button",8),r.bIt("click",function(){return o.edit()}),r.EFF(18,"\xe9diter"),r.k0s()()),2&C&&r.Y8G("formGroup",o.formGroup)},dependencies:[e.X1,e.qT,e.me,e.BC,e.cb,e.j4,e.JD,c.DH,a.Zw,a.aO,L.c,F.p,P.u]})}}return R})()},2552:($,M,t)=>{t.d(M,{H:()=>C});var e=t(177),a=t(1747),c=t(9640),s=t(1281),h=t(3993),E=t(6354),r=t(5558),u=t(7673),y=t(9437),P=t(8141),f=t(889),d=t(496),m=t(431),v=t(4438),n=t(5312),L=t(1626);let F=(()=>{class o{constructor(l){this.http=l,this.API_URL=n.c.apiURL}create(l){return this.http.post(`${this.API_URL}/lodgers`,l)}read(){return this.http.get(`${this.API_URL}/lodgers`)}update(l){return this.http.patch(`${this.API_URL}/lodgers`,l)}delete(l){return this.http.delete(`${this.API_URL}/lodgers`,{body:{id:l}}).pipe((0,E.T)(()=>l))}static{this.\u0275fac=function(p){return new(p||o)(v.KVO(L.Qq))}}static{this.\u0275prov=v.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var T=t(7094);let R=(()=>{class o{constructor(l,p,D,w){this.actions$=l,this.lodgerService=p,this.store=D,this.message=w,this.loadOwners$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.z8),(0,h.E)(this.store.select(d.T)),(0,E.T)(([O,U])=>U),(0,r.n)(O=>O&&O.length>0?(0,u.of)((0,s.Yq)({lodgers:O})):this.lodgerService.read().pipe((0,E.T)(U=>(0,s.Yq)({lodgers:U})),(0,y.W)(U=>(0,u.of)((0,f.fJ)(U))))))),this.createLodger$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.EU),(0,r.n)(({lodger:O,estateId:U})=>this.lodgerService.create(O).pipe((0,E.T)(z=>(U&&this.store.dispatch((0,m.dG)({estate:{id:U,lodger_id:z.id}})),(0,s.B8)({lodger:z}))),(0,y.W)(z=>(0,u.of)((0,s.qU)(z))))))),this.createLodgerSuccess$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.B8),(0,P.M)(()=>this.message.success("locataire ajout\xe9 avec succ\xe8s!"))),{dispatch:!1}),this.createLodgerFailure$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.qU),(0,P.M)(O=>this.message.error(O.error.message))),{dispatch:!1}),this.updateLodger$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.Z1),(0,r.n)(O=>this.lodgerService.update(O.lodger).pipe((0,E.T)(U=>(0,s.YG)({lodger:U})),(0,y.W)(U=>(0,u.of)((0,s.d9)(U))))))),this.deleteLodger$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(s.rX),(0,r.n)(O=>this.lodgerService.delete(O.lodgerId).pipe((0,E.T)(U=>(0,s.CI)({lodgerId:U})),(0,y.W)(()=>(0,u.of)((0,s.CI)(O.ownerId)))))))}static{this.\u0275fac=function(p){return new(p||o)(v.KVO(a.En),v.KVO(F),v.KVO(c.il),v.KVO(T.xh))}}static{this.\u0275prov=v.jDH({token:o,factory:o.\u0275fac})}}return o})();const g=(0,c.vy)({lodgers:[]},(0,c.on)(s.Yq,(o,{lodgers:i})=>({...o,lodgers:i})),(0,c.on)(s.B8,(o,{lodger:i})=>({...o,lodgers:o.lodgers.concat(i)})),(0,c.on)(s.YG,(o,{lodger:i})=>({...o,lodgers:o.lodgers.map(l=>l.id===i.id?{...l,...i}:l)})),(0,c.on)(s.CI,(o,{lodgerId:i})=>({...o,lodgers:o.lodgers.filter(l=>l.id!==i)})));let C=(()=>{class o{constructor(l,p){this.store=l,this.actions$=p,this.store.dispatch((0,s.z8)())}static{this.\u0275fac=function(p){return new(p||o)(v.KVO(c.il),v.KVO(a.En))}}static{this.\u0275mod=v.$C({type:o})}static{this.\u0275inj=v.G2t({imports:[e.MD,c.md.forFeature("lodgers",g),a.Vm.forFeature(R)]})}}return o})()},8221:($,M,t)=>{t.d(M,{j:()=>C});var e=t(177),a=t(1747),c=t(9640),s=t(3993),h=t(6354),E=t(5558),r=t(7673),u=t(9437),y=t(8141),P=t(1176),f=t(889),d=t(4438),m=t(5312),v=t(1626);let n=(()=>{class o{constructor(l){this.http=l,this.API_URL=m.c.apiURL}get(){return this.http.get(`${this.API_URL}/owners`)}create(l){return this.http.post(`${this.API_URL}/owners`,l)}edit(l){return this.http.patch(`${this.API_URL}/owners`,l).pipe((0,h.T)(p=>l))}delete(l){return this.http.delete(`${this.API_URL}/owners`,{body:{id:l}}).pipe((0,h.T)(p=>l))}static{this.\u0275fac=function(p){return new(p||o)(d.KVO(v.Qq))}}static{this.\u0275prov=d.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var L=t(7094);let F=(()=>{class o{constructor(l,p,D,w){this.actions$=l,this.ownerService=p,this.store=D,this.message=w,this.loadOwners$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)("[Owners] Load Owners"),(0,s.E)(this.store.select(P.P)),(0,h.T)(([O,U])=>U),(0,E.n)(O=>O&&O.length>0?(0,r.of)({type:"[Owners] Load Owners Success",owners:O}):this.ownerService.get().pipe((0,h.T)(U=>({type:"[Owners] Load Owners Success",owners:U})),(0,u.W)(()=>(0,r.of)({type:"[Owners] Load Owners Failure"})))))),this.addOwner$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)("[Owners] Add Owner"),(0,E.n)(({owner:O})=>this.ownerService.create(O).pipe((0,h.T)(U=>({type:"[Owners] Add Owner Success",owner:U})),(0,u.W)(()=>(0,r.of)({type:"[Owners] Load Owners Failure"})))))),this.addOwnerSuccess$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(f._P),(0,y.M)(()=>this.message.success("propri\xe9taire ajout\xe9 avec succ\xe8s!"))),{dispatch:!1}),this.addOwnerFailure$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)(f.LM),(0,y.M)(O=>this.message.error(O.error.message))),{dispatch:!1}),this.updateOwner$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)("[Owners] Update Owner"),(0,E.n)(({owner:O})=>this.ownerService.edit(O).pipe((0,h.T)(U=>(0,f.eX)({owner:U})),(0,u.W)(()=>(0,r.of)({type:"[Owners] Update Owner Failure"})))))),this.deleteOwner$=(0,a.EH)(()=>this.actions$.pipe((0,a.gp)("[Owners] Delete Owner"),(0,E.n)(O=>this.ownerService.delete(O.ownerId).pipe((0,h.T)(U=>({type:"[Owners] Delete Owner Success",ownerId:U})),(0,u.W)(()=>(0,r.of)({type:"[Owners] Delete Owner Failure"}))))))}static{this.\u0275fac=function(p){return new(p||o)(d.KVO(a.En),d.KVO(n),d.KVO(c.il),d.KVO(L.xh))}}static{this.\u0275prov=d.jDH({token:o,factory:o.\u0275fac})}}return o})();const R=(0,c.vy)({owners:[]},(0,c.on)(f.Ju,(o,i)=>({...o})),(0,c.on)(f.kN,(o,i)=>({...o,owners:i.owners})),(0,c.on)(f.fJ,(o,i)=>({...o})),(0,c.on)(f.lv,(o,i)=>({...o})),(0,c.on)(f._P,(o,i)=>({...o,owners:o.owners.concat(i.owner)})),(0,c.on)(f.LM,(o,i)=>({...o})),(0,c.on)(f.HD,(o,i)=>({...o})),(0,c.on)(f.eX,(o,{owner:i})=>({...o,owners:o.owners.map(l=>l.id===i.id?{...l,...i}:l)})),(0,c.on)(f.ye,(o,{ownerId:i})=>({...o,owners:o.owners.filter(l=>l.id!==i)})),(0,c.on)(f.XB,(o,i)=>({...o})));var I=t(3456),g=t(6697);let C=(()=>{class o{constructor(l,p){this.store=l,this.actions$=p,this.loadOwners()}loadOwners(){this.actions$.pipe((0,a.gp)(I.DP),(0,g.s)(1),(0,y.M)(l=>{this.store.dispatch((0,f.Ju)())})).subscribe()}static{this.\u0275fac=function(p){return new(p||o)(d.KVO(c.il),d.KVO(a.En))}}static{this.\u0275mod=d.$C({type:o})}static{this.\u0275inj=d.G2t({imports:[e.MD,c.md.forFeature("owners",R),a.Vm.forFeature(F)]})}}return o})()},8113:($,M,t)=>{t.d(M,{M:()=>s});var e=t(5312),a=t(4438),c=t(1626);let s=(()=>{class h{constructor(r){this.http=r,this.API_URL=e.c.apiURL}downloadRentReceipt(r,u,y){let P=`estate=${r}`;return u&&(P+=`&startDate=${u}`),y&&(P+=`&endDate=${y}`),this.http.get(`${this.API_URL}/rents/pdf?${P}`,{responseType:"blob"})}sendRentReceipt(r,u,y){let P=`estate=${r}`;return u&&(P+=`&startDate=${u}`),y&&(P+=`&endDate=${y}`),this.http.get(`${this.API_URL}/rents/email?${P}`)}static{this.\u0275fac=function(u){return new(u||h)(a.KVO(c.Qq))}}static{this.\u0275prov=a.jDH({token:h,factory:h.\u0275fac,providedIn:"root"})}}return h})()},8543:($,M,t)=>{t.d(M,{u:()=>v});var e=t(1747),a=t(5558),c=t(6354),s=t(9437),h=t(7673),E=t(8141),r=t(431),u=t(4438),y=t(5312),P=t(1626);let f=(()=>{class n{constructor(F){this.http=F,this.API_URL=y.c.apiURL}getEstates(){return this.http.get(`${this.API_URL}/estates`)}create(F){return this.http.post(`${this.API_URL}/estates`,F)}editEstate(F){return this.http.patch(`${this.API_URL}/estate`,F)}deleteEstate(F){return this.http.delete(`${this.API_URL}/estates`,{body:{id:F}})}static{this.\u0275fac=function(T){return new(T||n)(u.KVO(P.Qq))}}static{this.\u0275prov=u.jDH({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var d=t(8113),m=t(7094);let v=(()=>{class n{constructor(F,T,R,I){this.actions$=F,this.estatesService=T,this.rentsService=R,this.message=I,this.loadEstates$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)("[Estates] Load Estates"),(0,a.n)(()=>this.estatesService.getEstates().pipe((0,c.T)(g=>({type:"[Estates] Load Estates Success",estates:g})),(0,s.W)(()=>(0,h.of)({type:"[Estates] Load Estates Failure"})))))),this.createEstate$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)("[Estates] Create Estate"),(0,a.n)(({estate:g})=>this.estatesService.create(g).pipe((0,c.T)(C=>({type:"[Estates] Create Estate Success",estate:C})),(0,s.W)(({error:C})=>(0,h.of)({type:"[Estates] Create Estate Failure",error:C})))))),this.createEstateSuccess$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.Cs),(0,E.M)(()=>{this.message.success("Bien ajout\xe9 avec succ\xe8s!")})),{dispatch:!1}),this.editEstate$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)("[Estates] Edit Estate"),(0,a.n)(({estate:g})=>this.estatesService.editEstate(g).pipe((0,c.T)(()=>({type:"[Estates] Edit Estate Success",estate:g})),(0,s.W)(()=>(0,h.of)({type:"[Estates] Edit Estate Failure"})))))),this.deleteEstate$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.su),(0,a.n)(({estateId:g})=>this.estatesService.deleteEstate(g).pipe((0,c.T)(()=>(0,r.Ng)({estateId:g})),(0,s.W)(()=>(0,h.of)({type:"[Estates] Delete Estate Failure"})))))),this.sendRentReceipt$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.eT),(0,a.n)(({estate:g,startDate:C,endDate:o})=>this.rentsService.sendRentReceipt(g.id,C,o).pipe((0,c.T)(i=>(0,r.tT)({estate:i})),(0,s.W)(i=>(0,h.of)((0,r.eV)(i))))))),this.sendRentReceiptSuccess$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.tT),(0,E.M)(({})=>{this.message.success("Votre quittance a bien \xe9t\xe9 envoy\xe9e.")})),{dispatch:!1}),this.sendRentReceiptFaillure$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.eV),(0,E.M)(({})=>{this.message.error("Failed to send rent receipt")})),{dispatch:!1})}static{this.\u0275fac=function(T){return new(T||n)(u.KVO(e.En),u.KVO(f),u.KVO(d.M),u.KVO(m.xh))}}static{this.\u0275prov=u.jDH({token:n,factory:n.\u0275fac})}}return n})()},7211:($,M,t)=>{t.d(M,{i:()=>s});var e=t(9640),a=t(431);const s=(0,e.vy)({estates:[]},(0,e.on)(a.Lj,(h,E)=>({...h,estates:E.estates})),(0,e.on)(a.Cs,(h,E)=>({...h,estates:[...h.estates,E.estate]})),(0,e.on)(a.wP,(h,E)=>({...h,estates:h.estates.map(r=>r.id===E.estate.id?{...r,...E.estate}:r)})),(0,e.on)(a.Ng,(h,{estateId:E})=>({...h,estates:h.estates.filter(r=>r.id!==E)})))},496:($,M,t)=>{t.d(M,{T:()=>c});var e=t(9640);const a=(0,e.UX)("lodgers"),c=(0,e.Mz)(a,s=>s.lodgers)},1176:($,M,t)=>{t.d(M,{P:()=>c});var e=t(9640);const a=(0,e.UX)("owners"),c=(0,e.Mz)(a,s=>s.owners)},1069:($,M,t)=>{t.d(M,{H:()=>f});var e=t(1747),a=t(5558),c=t(8141),s=t(6354),h=t(9437),E=t(7673),r=t(2440),u=t(4438),y=t(8113),P=t(7094);let f=(()=>{class d{constructor(v,n,L){this.actions$=v,this.rentsService=n,this.message=L,this.downloadRentReceipt$=(0,e.EH)(()=>this.actions$.pipe((0,e.gp)(r.KP),(0,a.n)(({estateId:F,startDate:T,endDate:R})=>this.rentsService.downloadRentReceipt(F,T,R).pipe((0,c.M)(I=>{const g=window.URL.createObjectURL(I),C=document.createElement("a");C.href=g,C.download="quittance.pdf",C.click(),window.URL.revokeObjectURL(g)}),(0,s.T)(I=>(0,r.n9)()),(0,h.W)(I=>(0,E.of)((0,r.kZ)(I)))))))}static{this.\u0275fac=function(n){return new(n||d)(u.KVO(e.En),u.KVO(y.M),u.KVO(P.xh))}}static{this.\u0275prov=u.jDH({token:d,factory:d.\u0275fac})}}return d})()},2062:($,M,t)=>{t.d(M,{g:()=>e,o:()=>a});const e=c=>({name:c.get("name").value,street:c.get("street").value,city:c.get("city").value,zip:c.get("zip").value,signature:c.get("signature")?.value}),a=(c,s)=>({name:c.get("name").value,street:c.get("street").value,city:c.get("city").value,zip:c.get("zip").value,signature:c.get("signature")?.value,id:s})}}]);