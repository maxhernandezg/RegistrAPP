"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2081],{2081:(C,P,a)=>{a.r(P),a.d(P,{ResetPasswordPageModule:()=>M});var w=a(177),c=a(9417),n=a(4742),u=a(6432),p=a(9631),g=a(8834),h=a(9213),m=a(5559),f=a(467),e=a(4438),R=a(7783);const v=[{path:"",component:(()=>{var s;class i{constructor(o,t){this.apiService=o,this.toastController=t,this.email="",this.currentPassword="",this.newPassword="",this.hidePassword=!0,this.hideNewPassword=!0}updatePassword(){this.email&&this.currentPassword&&this.newPassword?this.apiService.getUserByEmail(this.email).subscribe({next:o=>{if(o.password===this.currentPassword){const t={...o,password:this.newPassword};this.apiService.updateUserPassword(o.id,t).subscribe({next:()=>this.presentToast("Contrase\xf1a actualizada exitosamente."),error:()=>this.presentToast("Error al actualizar la contrase\xf1a.")})}else this.presentToast("La contrase\xf1a actual es incorrecta.")},error:()=>this.presentToast("El correo electr\xf3nico no existe.")}):this.presentToast("Por favor, completa todos los campos.")}presentToast(o){var t=this;return(0,f.A)(function*(){(yield t.toastController.create({message:o,duration:3e3})).present()})()}}return(s=i).\u0275fac=function(o){return new(o||s)(e.rXU(R.G),e.rXU(n.K_))},s.\u0275cmp=e.VBU({type:s,selectors:[["app-reset-password"]],decls:32,vars:7,consts:[["color","light"],[1,"ion-padding-top",2,"display","flex","justify-content","center","align-items","center","width","100%"],["src","assets/logoregistrap.png",2,"width","300px","height","auto"],["color","light",1,"ion-text-center"],[1,"ion-text-center"],[2,"color","#833050","font-size","30px"],[1,"custom-card-content"],["appearance","outline",1,"custom-form-field"],[2,"color","#833050"],["matInput","","placeholder","Ingresa tu correo electr\xf3nico",3,"ngModelChange","ngModel"],["matInput","","placeholder","Ingresa tu contrase\xf1a actual",3,"ngModelChange","type","ngModel"],["mat-icon-button","","matSuffix","",3,"click"],["matInput","","placeholder","Ingresa tu nueva contrase\xf1a",3,"ngModelChange","type","ngModel"],["color","secondary","shape","round",3,"click"],[2,"color","white","padding-top","12px"]],template:function(o,t){1&o&&(e.j41(0,"ion-content",0)(1,"div",1),e.nrm(2,"ion-img",2),e.k0s(),e.j41(3,"div")(4,"ion-card",3)(5,"ion-card-title",4)(6,"p",5),e.EFF(7,"Actualizar Contrase\xf1a"),e.k0s()(),e.j41(8,"ion-card-content",6)(9,"mat-form-field",7)(10,"mat-label",8),e.EFF(11,"Correo electr\xf3nico"),e.k0s(),e.j41(12,"input",9),e.mxI("ngModelChange",function(r){return e.DH7(t.email,r)||(t.email=r),r}),e.k0s()()(),e.j41(13,"ion-card-content",6)(14,"mat-form-field",7)(15,"mat-label",8),e.EFF(16,"Contrase\xf1a actual"),e.k0s(),e.j41(17,"input",10),e.mxI("ngModelChange",function(r){return e.DH7(t.currentPassword,r)||(t.currentPassword=r),r}),e.k0s(),e.j41(18,"button",11),e.bIt("click",function(){return t.hidePassword=!t.hidePassword}),e.j41(19,"mat-icon",8),e.EFF(20),e.k0s()()()(),e.j41(21,"ion-card-content",6)(22,"mat-form-field",7)(23,"mat-label",8),e.EFF(24,"Nueva contrase\xf1a"),e.k0s(),e.j41(25,"input",12),e.mxI("ngModelChange",function(r){return e.DH7(t.newPassword,r)||(t.newPassword=r),r}),e.k0s(),e.j41(26,"button",11),e.bIt("click",function(){return t.hideNewPassword=!t.hideNewPassword}),e.j41(27,"mat-icon",8),e.EFF(28),e.k0s()()()(),e.j41(29,"ion-button",13),e.bIt("click",function(){return t.updatePassword()}),e.j41(30,"p",14),e.EFF(31,"Actualizar Contrase\xf1a"),e.k0s()()()()()),2&o&&(e.R7$(12),e.R50("ngModel",t.email),e.R7$(5),e.Y8G("type",t.hidePassword?"password":"text"),e.R50("ngModel",t.currentPassword),e.R7$(3),e.JRh(t.hidePassword?"visibility_off":"visibility"),e.R7$(5),e.Y8G("type",t.hideNewPassword?"password":"text"),e.R50("ngModel",t.newPassword),e.R7$(3),e.JRh(t.hideNewPassword?"visibility_off":"visibility"))},dependencies:[c.me,c.BC,c.vS,n.Jm,n.b_,n.I9,n.tN,n.W9,n.KW,u.rl,u.nJ,u.yw,p.fg,g.iY,h.An]}),i})()}];let F=(()=>{var s;class i{}return(s=i).\u0275fac=function(o){return new(o||s)},s.\u0275mod=e.$C({type:s}),s.\u0275inj=e.G2t({imports:[m.iI.forChild(v),m.iI]}),i})(),M=(()=>{var s;class i{}return(s=i).\u0275fac=function(o){return new(o||s)},s.\u0275mod=e.$C({type:s}),s.\u0275inj=e.G2t({imports:[w.MD,c.YN,n.bv,F,u.RG,p.fS,g.Hl,h.m_]}),i})()}}]);