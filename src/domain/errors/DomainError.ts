import { ErrorCode } from "@/domain/errors/ErrorCode";

/**
 * Representa un fallo con significado de dominio (una regla violada, un recurso ausente),
 * a diferencia de un fallo técnico como una caída de conexión.
 * La capa de presentación (`HttpErrorMapper`) despacha por categoría
 * (`instanceof NotFoundError` / `ConflictError` / ...), no por `code`, así que agregar
 * un nuevo DomainError nunca requiere tocar ese mapeador —solo requiere
 * extender la categoría correcta.
 */
export abstract class DomainError extends Error {
    abstract readonly code: ErrorCode;

    protected constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        this.name = new.target.name;
    }
}