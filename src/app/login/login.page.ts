import { Component, OnInit, Input } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() isModal:boolean;
  constructor(private faio:FingerprintAIO, private router:Router, private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  login(){
    this.faio.show({
      description:"Inicia sesión con tus datos biométricos",
      title:"Inicio de sesión"
    }).then(()=>{
      if(this.isModal){
        this.modalCtrl.dismiss();
        this.setTime();
      }else{
        this.router.navigateByUrl('/home');
        this.setTime();
      }
    });
  }

  setTime(){
    let timeOut:any = setTimeout(()=>{
      this.lockApp();
    },5000);
    localStorage.setItem('timeOut',timeOut);
  }

  lockApp(){
    this.modalCtrl.getTop().then(async v =>{
      if(!v){
        const modal=await this.modalCtrl.create({
          component:LoginPage,
          backdropDismiss:false,
          cssClass:'login-modal',
          componentProps:{
            isModal:true
          }
        });
        modal.present();
      }
    });
  }

}
