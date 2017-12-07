export interface Role {
   id?: number;
   name: boolean;
   deletable: boolean;
   buser_deletable: boolean;
   view_roles: boolean;
   create_roles: boolean;
   delete_roles: boolean;
   view_bs_users: boolean;
   create_bs_users: boolean;
   edit_bs_users: boolean;
   delete_bs_users: boolean;
   view_users: boolean;
   create_users: boolean;
   edit_users: boolean;
   delete_users: boolean;
   view_rules: boolean;
   view_my_rules: boolean;
   run_rules: boolean;
   create_rules: boolean;
   edit_rules: boolean;
   delete_rules: boolean;
}
