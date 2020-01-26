import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  
  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService,
    private _router: Router
  ) {}
  
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this._activatedRoute.snapshot.data.photos;
    });
  }

  load() {
    this._photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(
        photos => {
          this.filter = '';
          this.photos = this.photos.concat(photos);
          if(!photos.length) {
            this.hasMore = false;
          }
        },
        err => {
          this._router.navigate(['not-found']);
        });
  }
}
