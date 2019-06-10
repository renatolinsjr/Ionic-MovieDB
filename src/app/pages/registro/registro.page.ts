import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: string = ""
  senha: string = ""
  csenha: string = ""

  constructor(public afAuth: AngularFireAuth, public alert: AlertController, public router: Router) { }

  ngOnInit() {
  }

  async register() {
    const { usuario, senha, csenha } = this
    if(senha !== csenha ) {
      this.router.navigate(['/tabs'])
      return console.error("Senhas diferentes")
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(usuario + '@email.com', senha)
      console.log(res)
      this.router.navigateByUrl('/tabs')
    } catch(error) {
      console.dir(error)
    }    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"] 
    })

    await alert.present()
  }
}
