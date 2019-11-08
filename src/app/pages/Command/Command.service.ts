import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HandleError, HttpErrorHandler } from 'src/app/http-error-handler.service';

export interface Test {
    data: {
        code?: number,
        msg?: string,
    }
}

export interface ProtoList {
    protos: { filPath: string, name: string }[]
}
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
    })
};

@Injectable()
export class CommandService {
    private handleError: HandleError;


    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    TestLoginPost(url: string, body: any): Observable<Test> {
        return this.http.post(url, body, httpOptions).pipe(
            catchError(this.handleError('testLogin', body))
        )
    }


    GetProtoList(): Observable<ProtoList> {
        return this.http.get("assets/protoList.json").pipe(
            catchError(this.handleError('testLogin', null))
        )
    }

    getProto(path: string): Observable<SubProto> {
        return this.http.get("assets/" + path).pipe(
            catchError(this.handleError('testLogin', null))
        )
    }

}

export interface SubProto {
    protos: proto[]
}
export interface proto {
    name: string
    proto: any
    color: string

}