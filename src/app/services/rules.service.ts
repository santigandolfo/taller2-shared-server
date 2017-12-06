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
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        belongsTo: 'appserver'
      },
      {
        id: 2,
        name: 'default2',
        definition: '',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
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

  create(rule): Promise<string> {
    return new Promise((resolve, reject) => {
      const rulesString = localStorage.getItem('rules');
      const rules = JSON.parse(rulesString);
      rule.id = rules.length + 1;
      rule.createdAt = new Date().toDateString();
      rule.updatedAt = new Date().toDateString();
      rules.push(rule);
      localStorage.setItem('rules', JSON.stringify(rules));
      resolve('OK');
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
        rule.updatedAt = new Date().toDateString();
        rules[anId - 1] = rule;
        localStorage.setItem('rules', JSON.stringify(rules));
        resolve(rules[anId - 1]);
      }
    });
  }

}
