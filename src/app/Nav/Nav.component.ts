import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string ;

  constructor(private authService: AuthService, private alertifyService: AlertifyService, 
              private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrlFromAuth => this.photoUrl = photoUrlFromAuth);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Login Successfully');

    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logged() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertifyService.message('Logged out');
    this.router.navigate(['/home']);
  }

}
