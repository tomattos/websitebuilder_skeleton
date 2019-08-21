import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomHttpInterceptor } from './interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
];
