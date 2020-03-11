import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
    
    photo$: Observable<Photo>;
    photoId: number;
    
    constructor(
        private _route: ActivatedRoute,
        private _photoService: PhotoService,
        private _router: Router,
        private _alertService: AlertService,
        private _userService: UserService
        ) {}
    
    ngOnInit(): void {
        this.photoId = this._route.snapshot.params.photoId;

        this.photo$ = this._photoService.findById(this.photoId);

        this.photo$.subscribe(() => {}, err => {
            this._router.navigate(['not-found']);
        });
    }

    remove() {
        this._photoService
            .removePhoto(this.photoId)
            .subscribe(
                () => {
                    this._alertService.success('Photo removed', true);
                    this._router.navigate(['/user', this._userService.getUserName()], { replaceUrl: true });
                },
                err => {
                    this._alertService.warning('Could not delete the photo!', true);
                });
    }

    like(photo: Photo) {
        this._photoService
            .like(photo.id)
            .subscribe(liked => {
                if(liked) {
                    this.photo$ = this._photoService.findById(photo.id);
                }
            })
    }
}