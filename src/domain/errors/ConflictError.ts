import { DomainError } from "@/domain/errors/DomainError";
import { ErrorCode } from "@/domain/errors/ErrorCode";

/**
 * Categoría base para "la solicitud entra en conflicto con el estado actual de un
 * recurso" (p. ej. una violación de una regla de unicidad de negocio, como un
 * email de Candidate duplicado). La presentación mapea cualquier instancia de esta
 * jerarquía a HTTP 409, así que agregar un nuevo error de conflicto nunca requiere
 * tocar el mapeador.
 *
 * `code` es `ErrorCode.CONFLICT` por defecto — el detalle de negocio va en el
 * `message` de la subclase concreta, no en el código. Una subclase puede
 * sobrescribir `code` si algún caso puntual amerita uno propio.
 */
export abstract class ConflictError extends DomainError {
    readonly code: ErrorCode = ErrorCode.CONFLICT;
}
