import { Injectable } from '@angular/core';
import { Rule } from '../entities/rule.entity';

@Injectable()
export class RulesService {

  constructor() { }

  getAll(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      resolve([{
        id: 1,
        name: 'default',
        definition: '',
        createdAt: '2017/12/06 12:00',
        updatedAt: '2017/12/06 12:00',
        belongsTo: 'appserver'
      }]);
    });
  }

  getById(anId): Promise<Rule> {
    return new Promise((resolve, reject) => {
      resolve({
        id: 1,
        name: 'default',
        definition: '',
        createdAt: '2017/12/06 12:00',
        updatedAt: '2017/12/06 12:00',
        belongsTo: 'appserver'
      });
    });
  }

}
