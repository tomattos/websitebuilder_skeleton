import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request.interface';
import { Observable } from 'rxjs';

@Injectable()
export class LoginApi {
  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<HttpResponse<null>> {
    return this.http.post<null>('/api/auth', payload, { observe: 'response' });
  }

  logout(): Observable<HttpResponse<null>> {
    return this.http.post<null>('/api/logout', null);
  }
}
