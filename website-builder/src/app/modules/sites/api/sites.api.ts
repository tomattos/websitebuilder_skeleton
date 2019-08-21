import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../interfaces/site.interface';

@Injectable()
export class SitesApi {
  constructor(private readonly http: HttpClient) {}

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>('/api/websites');
  }

  removeSite(id: number): Observable<null> {
    return this.http.delete<null>(`/api/websites/${id}`);
  }
}
