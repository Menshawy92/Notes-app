import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data = new BehaviorSubject<[]>([])
    currentData = this.data.asObservable()

    constructor(){}

    resultData(msg: []) {
        this.data.next(msg)
    }
}
