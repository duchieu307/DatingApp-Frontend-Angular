import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // cha truyen cho con co the dung input
  // khoi tao event moi de truyen cho thang cha, event nay se tra ve 1 gia tri tu chon
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertifyService: AlertifyService,
              private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),

    // }, this.passwordMatchValidator)
    this.bsConfig = {
      containerClass: 'theme-red',
    },
    this.createRegisterForm();
  }

  createRegisterForm(){
    // dung cai Builder thay cho cai FormGroup o tren
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      knownAs : ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]] ,
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]] ,
    },{validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register(){
    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success('Dang ky thanh cong');
      }, error => {
        this.alertifyService.error('Co loi roi dai vuong oi');
      }, () => this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      }));
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertifyService.success('Regisrer Successfully');
    // }, error => {
    //   this.alertifyService.error(error);
    // })
    console.log(this.registerForm.value);
  }

  cancel(){
    // ham cancelRegister khi dc goi se tra ve gia tri false hoac tra ve cai gi tuy thich
    this.cancelRegister.emit(false);
    this.alertifyService.message('Cancel');
  }


}
