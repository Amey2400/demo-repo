import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baserurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAllMovies(): Observable<any>{
    return this.http.get(this.baserurl + '/movies/', 
    {headers: this.httpHeaders});
  }
  getOneMovie(id): Observable<any>{
    return this.http.get(this.baserurl + '/movies/' + id +'/', 
    {headers: this.httpHeaders});
  }
  updateMovie(movie): Observable<any>{
    const body = {title: movie.title, desc: movie.desc , year: movie.year};
    return this.http.put(this.baserurl + '/movies/' + movie.id +'/', body,
    {headers: this.httpHeaders});
  }
  createMovie(movie): Observable<any>{
    const body = {title: movie.title, desc: movie.desc , year: movie.year};
    return this.http.post(this.baserurl + '/movies/', body,
    {headers: this.httpHeaders});
  }
  deleteMovie(id): Observable<any>{
    return this.http.delete(this.baserurl + '/movies/'+ id + '/',
    {headers: this.httpHeaders});
  }
  
  storePlotid(): Observable<any>{
    return this.http.get(this.baserurl + '/external/', 
    {headers: this.httpHeaders});
  }
  getPlotid(): Observable<any>{
    return this.http.get(this.baserurl + '/outputplot/', 
    {headers: this.httpHeaders});
  }
}
