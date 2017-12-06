import { Injectable } from '@angular/core';
import { Rule } from '../entities/rule.entity';

@Injectable()
export class RulesService {

  constructor() { }

  getAll(): Promise<Rule[]> {
    return new Promise((reject, resolve) => {
      resolve([]);
    });
  }

}
