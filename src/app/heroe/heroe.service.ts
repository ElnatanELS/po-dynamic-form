import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  readonly headers: HttpHeaders = new HttpHeaders({
    'X-PO-SCREEN-LOCK': 'true',
  });

  readonly endpoint = 'https://po-sample-api.onrender.com/v1/heroes';

  constructor(private http: HttpClient) {}

  deleteResource(id?: string): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`, { headers: this.headers });
  }

  deleteResources(ids: Array<any>): Observable<any> {
    return this.http.request('delete', `${this.endpoint}`, { headers: this.headers, body: ids });
  }

  getResources(params?: HttpParams): Observable<any> {
    return this.http.get(`${this.endpoint}`, { headers: this.headers, params });
  }

  getResource(id: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`, { headers: this.headers });
  }

  createResource(resource: any): Observable<any> {
    return this.http.post(`${this.endpoint}`, resource, { headers: this.headers });
  }

  updateResource(id: string, resource: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, resource, { headers: this.headers });
  }

}
