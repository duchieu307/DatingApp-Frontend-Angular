import { Injectable } from '@angular/core';
// khi xuat hien loi khong tim dc thu vien them vao, co the fix bawng cach chay npm trong goi y
// hoac tao mot file config, trong truong hop nay la typing.d.js
// roi them vao typeRoots trong tsconfig.base.json
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  // tra ve box confirm voi nut ok
  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (event: any) => {
      if (event) {
        okCallback();
      } else {
      }
    });
  }

  //hien thi success noti
  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
