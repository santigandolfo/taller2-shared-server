import { Injectable } from '@angular/core';
import { Rule } from '../entities/rule.entity';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class RulesService {

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

  getAll(): Promise<Rule[]> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/rules', options).map(res => {
      return res.json();
    }).toPromise();
  }

  getById(anId): Promise<Rule> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.get('api/rules/' + anId, options).map(res => {
      return res.json();
    }).toPromise();
  }

  create(rule): Promise<string> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.post('api/rules', rule, options).map(res => {
      return res.json();
    }).toPromise();
  }

  update(rule, anId): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.put('api/rules/' + anId, rule, options).map(res => {
      return res;
    }).toPromise();
  }

  delete(anId): Promise<any> {
    const theHeaders = this.authHeader();
    const options = new RequestOptions({ headers: theHeaders});
    return this.http.delete('api/rules/' + anId, options).map(res => {
      return res;
    }).toPromise();
  }

}
