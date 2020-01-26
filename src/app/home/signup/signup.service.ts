import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NewUser } from './new-user';
import { environment } from '../../../environments/environment'

const API_URL = environment.ApiUrl;

@Injectable()
export class SignUpService {

    constructor (private _httpClient: HttpClient) {}

    checkUserNameTaken(username: string): Observable<Object> {
        return this._httpClient.get(`${API_URL}/user/exists/${username}`);
    }

    signup(newUser: NewUser) {
        return this._httpClient.post(`${API_URL}/user/signup`, newUser);
    }
}