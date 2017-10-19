import { Component, Inject, OnInit } from '@angular/core';
import { User} from '../../entities/user.entity';
import { UsersService } from '../../services/users.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { UserEditModal } from './userseditmodal.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] | null;
  constructor(public dialog: MdDialog, private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getAll().then((users: User[]) =>
      this.users = users
    );
  }

  delete(anId) {
    this.usersService.delete(anId).then(res => {
      console.log('deleted');
      this.users = this.users.filter(user => {
        return user.id !== anId;
      });
    });
  }

  openEdit(anId) {
    const dialogRef = this.dialog.open(UserEditModal, {
      width: '350px',
      data: {
        id: anId,
        service: this.usersService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usersService.update(result.id, result).then(res => {
        this.usersService.getAll().then((users: User[]) => {
          this.users = users;
        });
      });
    });
  }
}


