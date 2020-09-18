import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()

// service van se dc dung de lay du lieu nhung thay viec return data o component thi 
// return data qua 1 resolver de tranh bao loi trong viec load du lieu
// resolve la 1 observable nen dung no phai subcribe

// lam not cai memberlist resolver

// khai bao resolver o route.ts

export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Loi o resolve du lieu');
                this.router.navigate(['/members']);
                return of(null);
            } )
        );
    }
}