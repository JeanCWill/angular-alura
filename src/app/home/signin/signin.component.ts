import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    
    fromUrl: string;
    loginForm: FormGroup;

    @ViewChild('userNameInput')
    userNameInput: ElementRef<HTMLInputElement>;

    constructor (
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _platformDetectorService: PlatformDetectorService,
        private _activatedRoute: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this._activatedRoute
            .queryParams
            .subscribe(params => this.fromUrl = params.fromUrl);

        this.loginForm = this._formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        this._platformDetectorService.isPlatformBrowser() && 
            this.userNameInput.nativeElement.focus();
    } 

    login() {

        const userName: string = this.loginForm.get('userName').value;
        const password: string = this.loginForm.get('password').value;

        this._authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    this.fromUrl
                        ? this._router.navigateByUrl(this.fromUrl)
                        : this._router.navigate(['user', userName])
                },
                err => {
                    console.log(err.message);
                    this.loginForm.reset();

                    this._platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();

                    alert('Invalid user name or password');
                });
    }
 }