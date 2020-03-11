import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {
    
    signupForm: FormGroup;

    @ViewChild('emailInput')
    emailInput: ElementRef<HTMLInputElement>;
    
    constructor(
        private _formBuilder: FormBuilder,
        private _userNotTakenValidatorService: UserNotTakenValidatorService,
        private _signupService: SignUpService,
        private _router: Router,
        private _platformDetectorService: PlatformDetectorService
        ) {
        
    }

    ngOnInit(): void {
        this.signupForm = this._formBuilder.group({
            email: ['', 
                [
                    Validators.required, 
                    Validators.email
                ]
            ],
            fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this._userNotTakenValidatorService.ckeckUserNameTaken()
            ],
            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        }, {
            validator: userNamePassword
        });

        this._platformDetectorService.isPlatformBrowser() && 
                this.emailInput.nativeElement.focus();
    }

    signup() {
        if (this.signupForm.valid && !this.signupForm.pending) {
            const newUser: NewUser = this.signupForm.getRawValue() as NewUser;
            this._signupService
                .signup(newUser)
                .subscribe(
                    () => this._router.navigate(['']),
                    err => console.log(err)
                );
        }

    }
}