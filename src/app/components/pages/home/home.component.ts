import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../../entities/credentials.entity';
import { NgForm } from '@angular/forms';
import { BusinessUsersService } from '../../../services/business-users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  credentials: Credentials;
  constructor(private router: Router, private businessUsersService: BusinessUsersService) { }

  ngOnInit() {
    this.credentials = { username: '', password: ''};
  }

  login(form: NgForm) {
    this.businessUsersService.authenticate(this.credentials).then(() => {
      console.log('success');
      this.router.navigate(['/business-users']);
    }).catch(() => {
      alert('Username y/o password incorrectos');
    });
  }

}
