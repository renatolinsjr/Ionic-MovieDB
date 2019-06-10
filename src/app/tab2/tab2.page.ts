import { Component } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import { MoviesService } from '../theMoviesDB/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MoviesService]
})
export class Tab2Page {

  public lista_filmes = new Array<any>();
  // public imagem: String = "../../assets/item.jpg";
  private page = 1;

  constructor(public loadingController: LoadingController, public movieService: MoviesService){ }

  ionViewDidEnter(){
    this.presentLoadingWithOptions();
    this.carregaPagina();
  }

  carregaPagina() {
    this.movieService.getPopularMovies(1, 'pt')
      .subscribe(
        data => {
          const response = (data as any);
          if(this.page==1) {
            this.lista_filmes = response.results;
          } else {
            this.lista_filmes = this.lista_filmes.concat(response.results);
          }
          this.lista_filmes = this.lista_filmes.concat(response.results);
          console.log(this.lista_filmes);
        },
        error => {
          console.log(error)
        }
      );
  }

  doRefresh(event) {
    console.log('Iniciando operação assíncrona');
    this.page = 1;
    this.carregaPagina();

    setTimeout(() => {
      event.target.complete();
      console.log('finalizando refresh');
    }, 500)
  }
     async presentLoadingWithOptions() {
      const carregando = await this.loadingController.create({
        spinner: "bubbles",
        duration: 200,
        message: 'Por Favor espere...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });

      return await carregando.present();
    }
  }