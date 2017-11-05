import { Car } from './car.entity';
export interface User {
  id?: number;
  username: string;
  password: string;
  type: string;
  firstname: string;
  lastname: string;
  country: string;
  email: string;
  birthdate: string;
  image: string;
  cars: Car[];
}
