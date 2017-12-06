import { Injectable } from '@angular/core';
import { Rule } from '../entities/rule.entity';

@Injectable()
export class RulesService {

  constructor() {
    const rules = localStorage.getItem('rules');
    if (!rules) {
      localStorage.setItem('rules', JSON.stringify([{
        id: 1,
        name: 'default',
        definition: '',
        createdAt: '2017/12/06 12:00',
        updatedAt: '2017/12/06 12:00',
        belongsTo: 'appserver'
      }]));
    }
  }

  getAll(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      const rulesString = localStorage.getItem('rules');
      resolve(JSON.parse(rulesString));
    });
  }

  getById(anId): Promise<Rule> {
    return new Promise((resolve, reject) => {
      const rulesString = localStorage.getItem('rules');
      const rules = JSON.parse(rulesString);
      resolve(rules[anId - 1]);
    });
  }

  update(rule, anId): Promise<Rule> {
    return new Promise((resolve, reject) => {
      const rulesString = localStorage.getItem('rules');
      const rules = JSON.parse(rulesString);
      if (anId > rules.length) {
        reject({
          msg: 'not found'
        });
      }else {
        console.log('SAVED!');
        rules[anId - 1] = rule;
        localStorage.setItem('rules', JSON.stringify(rules));
        resolve(rules[anId - 1]);
      }
    });
  }

}
