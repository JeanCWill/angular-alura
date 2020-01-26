import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input()
    photoId: number;

    commentForm: FormGroup;

    comments$: Observable<PhotoComment[]>;

    constructor(
        private _photoService: PhotoService,
        private _formBuilder: FormBuilder
        ) {}

    ngOnInit(): void {
        this.comments$ = this._photoService.getComments(this.photoId);

        this.commentForm = this._formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {
        this.comments$ = this._photoService
            .addComment(this.photoId, this.commentForm.get('comment').value as string)
            .pipe(switchMap(() => this._photoService.getComments(this.photoId)))
            .pipe(tap(() => {
                this.commentForm.reset();
            }));
    }
}