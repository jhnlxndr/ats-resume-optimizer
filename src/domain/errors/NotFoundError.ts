import { DomainError } from "@/domain/errors/DomainError";
import { ErrorCode } from "@/domain/errors/ErrorCode";

/**
 * Categoría base para "el recurso solicitado no existe" (p. ej. buscar o eliminar
 * un Candidate por un id que no está en la base de datos). La presentación mapea
 * cualquier instancia de esta jerarquía a HTTP 404, así que agregar un nuevo error
 * de "no encontrado" para otra entidad nunca requiere tocar el mapeador.
 *
 * `code` es `ErrorCode.NOT_FOUND` por defecto — qué entidad falta se comunica en
 * el `message` de la subclase concreta, no en el código. Una subclase puede
 * sobrescribir `code` si algún caso puntual amerita uno propio.
 */
export abstract class NotFoundError extends DomainError {
    readonly code: ErrorCode = ErrorCode.NOT_FOUND;
}
