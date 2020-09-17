import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    //url = 'https://localhost:44318/api/account';
    //url = 'http://localhost:44318/api/account';
    url = 'http://binmakdev.dedicated.co.za:93/api/account';
   //url = 'http://binmak.dedicated.co.za:84/api/account'
   //url = 'http://binmakdev.dedicated.co.za:81/api/account'
   //url = 'http://binmaktest.dedicated.co.za:81/api/account'

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    constructor(private http: HttpClient) { }

    registerBinMakUser(model){
        return this.http.post(this.url+'/systemAccount',  model )
    }

    login(Email: string, Password: string) {

        const model: any = {
            Email: Email,
            Password: Password
        };

        return this.http.post(this.url,  model )
            .pipe(map((user: any) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    forgotPassword(model) {

        return this.http.post<any[]>(this.url+'/forgotPassword',  model);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCountries(){
        return this.http.get<any[]>(this.url+"/countries");
      }
}

