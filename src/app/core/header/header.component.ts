import { Component } from '@angular/core';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html',
    styleUrls: ['home.component.css']
})
export class HeaderComponent {

    user$: Observable<User>;

    constructor(
        private _userService: UserService,
        private _router: Router
        ) {
        this.user$ = this._userService.getUser();
    }

    logout() {
        this._userService.logout();
        this._router.navigate(['']);
    }
}