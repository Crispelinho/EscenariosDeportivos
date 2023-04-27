import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { icalendarApi } from '../calendar';

export interface iMetodo {
  url:string,
  data:object,
  header?:HttpHeaders,
  port?:number 
}

export interface iToken{
  access:string,
  refresh:string
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseurl:string = environment.apiurl;  
  
  constructor(
    private https:HttpClient,
  ) { }
  
  // getEvents():Observable<icalendarApi> {
  getEvents() {
    let method:iMetodo = {
      port: 8000,
      url:'solicitudes/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`, {});
  }

  setEvent(data): Observable<any>{
    let method:iMetodo = {
      port: 8000,
      url:'solicitudes/',
      data: data
    }
    return this.https.post(`${this.baseurl}:${method.port}/${method.url}`, method.data);
  }

  getTipoSolicitantes(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'tiposolicitantes/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }

  getDiscapacidad(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'discapacidades/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }

  getEscenario(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'escenariosdeportivos/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }

  getTipoEvento(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'disciplinasdeportivas/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }

  getActividadDeportiva(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'actividaddeportiva/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }

  getEventoDeportivo(): Observable<any> {
    let method:iMetodo = {
      port: 8000,
      url:'regimenes/',
      data: null
    }
    return this.https.get(`${this.baseurl}:${method.port}/${method.url}`);
  }
}
