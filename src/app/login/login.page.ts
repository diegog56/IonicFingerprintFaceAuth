import { Component, OnInit, Input } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() isModal: boolean;
  constructor(private faio:FingerprintAIO, private router:Router, private modalCtrl:ModalController) { }
  to;
  ngOnInit() {
  }

  login(){
    this.faio.show({
      description: "Inicia sesión con tus datos biométricos",
      title:"Inicio de sesión",
      cancelButtonTitle:"Cancelar"
    }).then(()=>{
      if(this.isModal){
        this.modalCtrl.dismiss().then(()=>{
          this.setTime();
        });
      }else{
        this.router.navigateByUrl('/home');
        this.setTime();
      }
    });
  }

  setTime(){
    let v:any=setTimeout(()=>{
      this.lockApp();
    },5000);
    localStorage.setItem('timeOut',v);
  }

  
  // 

  lockApp(){
    this.modalCtrl.getTop().then(async v => {
      if(!v){
        const modal = await this.modalCtrl.create({
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
