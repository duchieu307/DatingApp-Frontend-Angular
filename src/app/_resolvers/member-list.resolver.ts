import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberListResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize =  10;

    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Loi o cho lay nhieu user');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
    
}
