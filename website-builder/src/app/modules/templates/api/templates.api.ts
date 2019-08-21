import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';
import { Template } from '../interfaces/template.interface';

@Injectable()
export class TemplatesApi {
  constructor(private http: HttpClient) {}

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>('/api/templates');
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('/api/companies');
  }
}
