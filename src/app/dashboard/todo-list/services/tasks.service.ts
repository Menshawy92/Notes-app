import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map,tap,catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable,throwError  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public url = environment.baseApi;

  constructor(private httpClint: HttpClient) { }
  listTask(): Observable<any> {
    return this.httpClint.get(`${this.url}/tasks`).pipe(
      tap((item: any) => {
        if(item.length < 3){
          throw new Error("This is an error0");
        }
        return item;
      }),
    )
  }
}
