import { Component,Inject,OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User} from '../../entities/user.entity';
@Component({
  selector: 'user-edit-modal',
  template: `
  <h1 md-dialog-title>Edit</h1>
  <div md-dialog-content>
    <md-form-field>
      <label>Firstname:</label>
      <input mdInput tabindex="1" [(ngModel)]="editUser.firstname">
    </md-form-field>
    <md-form-field>
      <label>Lastname:</label>
      <input mdInput tabindex="1" [(ngModel)]="editUser.lastname">
    </md-form-field>
    <md-form-field>
      <label>Email:</label>
      <input mdInput tabindex="1" [(ngModel)]="editUser.email">
    </md-form-field>
    <md-form-field>
      <label>Password:</label>
      <input type="password" mdInput tabindex="1" [(ngModel)]="editUser.password">
    </md-form-field>
  </div>
  <div md-dialog-actions>
    <button md-button [md-dialog-close]="editUser" tabindex="2">SUBMIT</button>
    <button md-button (click)="onNoClick()" tabindex="-1">CANCEL</button>
  </div>
  `,
})
export class UserEditModal implements OnInit {

  private editUser: User = {
    id: 0,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    country: '',
    birthdate: '',
    email: '',
    type: '',
    image: ''
  };

  constructor(public dialogRef: MdDialogRef<UserEditModal>,
    @Inject(MD_DIALOG_DATA) public data: any) {
    }

  ngOnInit(){
    this.data.service.getById(this.data.id).then((user: User) => 
      this.editUser = user
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}