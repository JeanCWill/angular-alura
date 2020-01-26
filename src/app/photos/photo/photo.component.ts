import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment'

const API_URL = `${environment.ApiUrl}/imgs/`;

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {

    private _url = '';

    @Input() 
    description = '';

    @Input() 
    set url(url: string) {
        if (url.startsWith('data')) {
            this._url = url;
        } else {
            this._url = API_URL + url;
        }
    }

    get url(): string {
        return this._url;
    }
}