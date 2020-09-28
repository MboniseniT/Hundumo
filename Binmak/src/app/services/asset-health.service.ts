import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetHealthService {
  constructor(public http: HttpClient) { }

    post(formData, preffix): any {
    return this.http.post(preffix.key + preffix.variable, formData, this.getOptions());
  }

  put(id, formData, preffix): any {
    return this.http.put(preffix.key + preffix.variable + '/' + id, formData, this.getOptions());
  }

  delete(id, preffix): any {
    return this.http.delete(preffix.key + preffix.variable + '/' + id, this.getOptions());
  }

  get(id, preffix): any {
    return this.http.get(preffix.key + preffix.variable + '/' + id, this.getOptions());
  }
  getAll(preffix): any {
    return this.http.get(preffix.key + preffix.variable, this.getOptions());
  }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}
