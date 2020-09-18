import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  // truy cap vao cai edit form de catch cac even cua no
  @ViewChild('editForm') editForm: NgForm;
  // truy cap vao browser de xem khi nao thang nguoi dung thao tac voi browser
  // trong truong hop nay la tat browser
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  user: User;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authServce: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
    console.log(this.photoUrl);
    this.authServce.currentPhotoUrl.subscribe(photoUrlFromAuth => this.photoUrl = photoUrlFromAuth)
  }

  updateUser() {
    this.userService
      .updateUser(this.authServce.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('Updated user infomation');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl){
    this.user.photoUrl = photoUrl;
  }
}
