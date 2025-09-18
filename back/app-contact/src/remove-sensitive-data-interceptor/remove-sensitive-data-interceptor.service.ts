import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class RemoveSensitiveDataInterceptorService implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => this.removeSensitiveData(data))
        );
    }

    private removeSensitiveData(data: any): any {
        if (Array.isArray(data)) {
            // Si c'est un tableau, traite chaque élément
            return data.map(item => this.removeSensitiveFields(item));
        }
        // Si c'est un objet simple, traite-le directement
        return this.removeSensitiveFields(data);
    }

    private removeSensitiveFields(item: any): any {
        if (!item || typeof item !== 'object') return item;

        // Supprime tous les champs sensibles
        const { password, motDePasse, hashedPassword, ...safeData } = item;
        return safeData;
    }
}
