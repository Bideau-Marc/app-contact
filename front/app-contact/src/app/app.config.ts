import { ApplicationConfig, NgZone } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, } from '@angular/common/http';
import { authInterceptor } from './service/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch(),
    ),
    { provide: NgZone, useFactory: () => new NgZone({ enableLongStackTrace: false }) }
  ]
};
