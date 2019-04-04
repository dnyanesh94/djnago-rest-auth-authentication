import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService} from './services/user.service';



import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
      let authReq = req;
      let token = this.userService.getStoredToken();
      if (token != null && req.url != '/api/login') {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
      }
  
      
      
      return next.handle(authReq).do(
         (success:any) => {/*todo*/},

        (err: any) => {
          if (err instanceof HttpErrorResponse) {
           
            if (err.status === 401) {
              this.router.navigate(['login']);
            }
          }
        }
      );
      

      /*
     return next.handle(authReq).pipe(catchError(err => {
            if (err.status === 401) {
                this.router.navigate(['login']);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
      }))
      */ 
  }
}