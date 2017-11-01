import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BusinessUser } from '../entities/business-user.entity';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BusinessUsersService {
  constructor(private http: Http) { }

  getToken(creds) {
    return this.http.post('api/auth/token',creds).map(res => {
      return {
        success: res.status === 201,
        json: res.json()
      };
    }).toPromise();
  }

  saveTokenLocally(token: string) {
    if (token) {
      localStorage.setItem('auth_token', token);
    }
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
