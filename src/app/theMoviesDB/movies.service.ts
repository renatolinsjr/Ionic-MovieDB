import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // SUBSTITUIR PELA SUA API DO MOVIE DATABASE
  private chave="9a08fb8630f61654c45bf191c1ef0b91";
  private caminhoPadrao="http://api.themoviedb.org/3";

  constructor(public http: HttpClient) {}

  public getPopularMovies(page=1, language="pt"){

    let filmes=`${this.caminhoPadrao}/movie/popular?page=${page}&language=${language}&api_key=${this.chave}`
    return this.http.get(filmes);
  }
}
