import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  routes: RouteServices;

  // public rutasServicios: RutasServicios = {
  //   urlServidor: 'https://accesibilidad-back-end.herokuapp.com/',
  //   urlSocket: 'https://accesibilidad-back-end.herokuapp.com/'
  // };
  // public rutasServicios: RutasServicios = {
  //   urlServidor: 'http://localhost:3000/',
  //   urlSocket: 'http://localhost:3001/'
  // };

  constructor(private http: HttpClient) {
    this.getRoutes();
  }

  getRoutes() {
    if (this.routes) {
      return this.routes;
    }
    this.getAllRoutes();
  }

  getAllRoutes() {
    return this.http.get<RouteServices>('assets/config.json').subscribe(routes => this.routes = routes);
  }

}

class RouteServices {
  urlServices: string;
  urlSocket: string;
}
