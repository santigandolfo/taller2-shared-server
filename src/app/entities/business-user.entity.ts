import { Role } from './role.entity';
export interface BusinessUser {
   id?: number;
   username: string;
   password?: string;
   name: string;
   surname: string;
   role?: Role;
}
