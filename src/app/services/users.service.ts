import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  private getLocalToken() {
    const token = localStorage.getItem('auth_token');
    return token;
  }

  private authHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authtoken', this.getLocalToken());
    return headers;
  }

  getAll(): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/users', options).map(res => {
      return res.json();
    }).toPromise();
  }

  getById(id): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/users/' + id, options).map(res => {
      return res.json();
    }).toPromise();
  }

  delete(id): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.delete('api/users/' + id, options).map(res => {
      return res;
    }).toPromise();
  }
}
