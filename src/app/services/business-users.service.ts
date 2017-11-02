import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BusinessUser } from '../entities/business-user.entity';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BusinessUsersService {
  constructor(private http: Http) { }

  private getToken(creds) {
    return this.http.post('api/auth/token',creds).map(res => {
      return {
        success: res.status === 201,
        json: res.json()
      };
    }).toPromise();
  }

  private saveTokenLocally(token: string) {
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  }
  private getLocalToken() {
    return localStorage.getItem('auth_token');
  }

  // login() {
  //   return new Promise((resolve, reject) => {
  //     const token = this.getLocalToken();
  //     if (token) {
  //       const headers = new Headers();
  //       headers.append('AuthToken', token);
  //       this.me(headers).then(res => {
  //         if (res.success) {
  //         }
  //       });
  //     }
  //   });
  // }

  private me(theHeaders) {
    return this.http.post('api/business-users/me', null, { headers: theHeaders }).map(res => {
      return {
        success: res.status === 200,
        status: res.status,
        json: res.json()
      };
    }).toPromise();
  }

  authenticate(creds) {
    return new Promise((resolve, reject) => {
      this.getToken(creds).then(res => {
        if (res.success) {
          this.saveTokenLocally(res.json.token);
          resolve();
        }else {
          reject();
        }
      });
    });
  }

  getAll(): Promise<any> {
    return this.http.get('api/business-users').map(res =>{
      return {
        success: res.status === 200,
        json: res.json()
      };
    }).toPromise();
  }

  getById(id): Promise<any> {
    return this.http.get('api/users/' + id).map(res => {
      return {
        success: res.status === 200,
        json: res.json()
      };
    }).toPromise();
  }

  update(id, user): Promise<any> {
    return this.http.put('api/users/' + id, user).map(res => {
      return {
        success: res.status === 200,
        json: res.json()
      };
    }).toPromise();
  }

  delete(id): Promise<any> {
    return this.http.delete('api/users/' + id).map(res => {
      return {
        success: res.status === 200,
        json: res.json()
      };
    }).toPromise();
  }
}
