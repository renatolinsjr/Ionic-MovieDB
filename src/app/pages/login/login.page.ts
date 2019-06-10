import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

	usuario: string = ""
	senha: string = ""

	constructor(public afAuth: AngularFireAuth, public alert: AlertController, public router: Router) { }

	ngOnInit() {
	}

	async login() {
		const { usuario, senha } = this
		try {
			// Se o login for aceito no Banco de Dados redireciona para a página inicial
	  		const res = await this.afAuth.auth.signInWithEmailAndPassword(usuario + '@email.com', senha)
	  		console.log(res)
			this.router.navigateByUrl('/tabs')
		} catch(err) {
			// Mostra o erro no Console
			console.dir(err)
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