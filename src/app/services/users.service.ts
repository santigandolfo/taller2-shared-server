import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../entities/user.entity';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  constructor(private http: Http) { }

  getAll(): Promise<User[]> {
    return this.http.get('api/users').map(res => 
      res.json()
    ).toPromise();
  }

  getById(id): Promise<User> {
    return this.http.get('api/users/' + id).map(res => 
      res.json()
    ).toPromise();
  }

  update(id,user): Promise<any> {
    return this.http.put('api/users/' + id,user).map(res => {  
      return {};
    }).toPromise();
  }

  delete(id): Promise<any> {
    return this.http.delete('api/users/' + id).map(res => {  
      return {};
    }).toPromise();
  }
}
