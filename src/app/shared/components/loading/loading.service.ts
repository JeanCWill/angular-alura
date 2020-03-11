import { Injectable } from '@angular/core';
import { loadingType } from './loading-type';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoadingService {
    
    loadingSubject: Subject<loadingType> = new Subject<loadingType>();

    getLoading() {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(loadingType.STOPPED));
    }

    start() {
        this.loadingSubject.next(loadingType.LOADING);
    }

    stop() {
        this.loadingSubject.next(loadingType.STOPPED);
    }
}