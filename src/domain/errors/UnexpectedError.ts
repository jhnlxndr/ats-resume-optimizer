import { DomainError } from "@/domain/errors/DomainError";
import { ErrorCode } from "@/domain/errors/ErrorCode";

/**
 * Fallback genérico para fallos técnicos (persistencia, red, etc.) que no tienen
 * significado de negocio. La infraestructura lanza esto en vez de dejar escapar
 * excepciones específicas del driver (p. ej. errores de Prisma) más allá de su
 * frontera, así la capa de Application solo trata con DomainError. El fallo
 * original se conserva vía la cadena estándar `cause` solo para logging del
 * servidor — `message` debe seguir siendo seguro para mostrar al cliente.
 *
 * Usa `ErrorCode.DATABASE_ERROR` para fallos técnicos de persistencia (el caso
 * más común, ver PrismaErrorMapper) y `ErrorCode.INTERNAL_ERROR` (el default)
 * para cualquier otro fallo no clasificado.
 */
export class UnexpectedError extends DomainError {
    constructor(
        readonly code: ErrorCode = ErrorCode.INTERNAL_ERROR,
        message = "An unexpected error occurred",
        options?: ErrorOptions,
    ) {
        super(message, options);
    }
}
