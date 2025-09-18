import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let authReq = req.clone({

        withCredentials: true // 🔑 pour que les cookies partent avec la requête
    });
    console.log('je suis ici');

    if (authReq.method === 'GET') {
        authReq = authReq.clone({
            headers: authReq.headers
                .set('Cache-Control', 'no-cache, no-store, must-revalidate')
                .set('Pragma', 'no-cache')
                .set('Expires', '0')
        });
    }

    console.log("toujours la ", authReq);
    return next(authReq);
};
// auth.interceptor.ts