import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
        json: () => res.json()
      };
    }).toPromise();
  }

  private saveTokenLocally(token: string) {
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  }

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

  private me() {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/business-users/me', options)
    .map(res => {
      return {
        success: res.status === 200,
        status: res.status,
        json: () => res.json()
      };
    }).toPromise();
  }

  isLoggedIn(): Promise<BusinessUser> {
    return new Promise((resolve, reject) => {
      const token = this.getLocalToken();
      if (token == null) {
        reject();
      }else {
        this.me().then(res => {
          if (res.success) {
            resolve(res.json());
          }else {
            reject();
          }
        }).catch(() => {
          reject();
        });
      }
    });
  }

  logout() {
    return new Promise(resolve => {
      localStorage.removeItem('auth_token');
      resolve();
    });
  }

  authenticate(creds) {
    return new Promise((resolve, reject) => {
      this.getToken(creds).then(res => {
        if (res.success) {
          this.saveTokenLocally(res.json().token);
          resolve(res.json);
        }else {
          reject();
        }
      }).catch(err => {
        reject(err.json());
      });
    });
  }

  getAll(): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/business-users', options).map(res => {
      return res.json();
    }).toPromise();
  }

  getAllRoles(): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/business-users/roles', options).map(res => {
      return res.json();
    }).toPromise();
  }

  getById(id): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/business-users/' + id, options).map(res => {
      return res.json();
    }).toPromise();
  }

  update(user, id): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.put('api/business-users/' + id, user, options).map(res => {
      return res;
    }).toPromise();
  }

  delete(id): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.delete('api/business-users/' + id, options).map(res => {
      return res;
    }).toPromise();
  }
}
