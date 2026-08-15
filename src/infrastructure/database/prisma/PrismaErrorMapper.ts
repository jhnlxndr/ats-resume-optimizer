import { Prisma } from "@/generated/prisma/client";
import { DomainError } from "@/domain/errors/DomainError";
import { UnexpectedError } from "@/domain/errors/UnexpectedError";
import { ErrorCode } from "@/domain/errors/ErrorCode";

/**
 * El significado de negocio de un código de error de Prisma depende de qué agregado
 * lo lanzó (un P2002 en Candidate.email significa algo diferente de un P2002 en
 * el campo único de otro modelo). Este mapeador permanece genérico — solo conoce
 * la taxonomía de errores de Prisma — y permite que cada repositorio proporcione el
 * DomainError específico a lanzar a través de estos hooks. Los códigos sin hook correspondiente,
 * y cualquier otro fallo técnico, vuelven a un UnexpectedError genérico.
 */
export interface PrismaErrorHandlers {
    /** P2002 — se violó una restricción de unicidad. */
    onUniqueConstraintViolation?: (error: Prisma.PrismaClientKnownRequestError) => DomainError;
    /** P2025 — el registro requerido por la operación no pudo ser encontrado. */
    onRecordNotFound?: (error: Prisma.PrismaClientKnownRequestError) => DomainError;
    /** P2003 — se violó una restricción de llave foránea (la entidad referenciada no existe). */
    onForeignKeyConstraintViolation?: (error: Prisma.PrismaClientKnownRequestError) => DomainError;
    /** P2011 — se violó una restricción de no-nulidad en un campo requerido. */
    onNullConstraintViolation?: (error: Prisma.PrismaClientKnownRequestError) => DomainError;
    /** P2014 — la operación violaría una relación requerida entre registros ya existentes. */
    onRequiredRelationViolation?: (error: Prisma.PrismaClientKnownRequestError) => DomainError;
}

export class PrismaErrorMapper {
    static toDomainError(error: unknown, handlers: PrismaErrorHandlers = {}): Error {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2000":
                    return new UnexpectedError(
                        ErrorCode.DATABASE_ERROR,
                        "El valor proporcionado es demasiado largo para la columna",
                        { cause: error },
                    );
                case "P2002":
                    return handlers.onUniqueConstraintViolation?.(error)
                        ?? new UnexpectedError(ErrorCode.DATABASE_ERROR, "Violación de restricción de unicidad", { cause: error });
                case "P2003":
                    return handlers.onForeignKeyConstraintViolation?.(error)
                        ?? new UnexpectedError(ErrorCode.DATABASE_ERROR, "Violación de restricción de llave foránea", { cause: error });
                case "P2011":
                    return handlers.onNullConstraintViolation?.(error)
                        ?? new UnexpectedError(ErrorCode.DATABASE_ERROR, "Falta un valor requerido (restricción de no-nulidad)", { cause: error });
                case "P2014":
                    return handlers.onRequiredRelationViolation?.(error)
                        ?? new UnexpectedError(
                            ErrorCode.DATABASE_ERROR,
                            "La operación viola una relación requerida entre registros",
                            { cause: error },
                        );
                case "P2021":
                    return new UnexpectedError(ErrorCode.DATABASE_ERROR, "La tabla no existe en la base de datos actual", { cause: error });
                case "P2022":
                    return new UnexpectedError(ErrorCode.DATABASE_ERROR, "La columna no existe en la base de datos actual", { cause: error });
                case "P2024":
                    return new UnexpectedError(
                        ErrorCode.DATABASE_ERROR,
                        "Tiempo de espera agotado al obtener una conexión del pool de la base de datos",
                        { cause: error },
                    );
                case "P2025":
                    return handlers.onRecordNotFound?.(error)
                        ?? new UnexpectedError(ErrorCode.DATABASE_ERROR, "Registro no encontrado", { cause: error });
                case "P2028":
                    return new UnexpectedError(ErrorCode.DATABASE_ERROR, "Error en la API de transacciones", { cause: error });
                case "P2034":
                    return new UnexpectedError(
                        ErrorCode.DATABASE_ERROR,
                        "La transacción falló por un conflicto de escritura o un interbloqueo; puede reintentarse",
                        { cause: error },
                    );
                default:
                    return new UnexpectedError(
                        ErrorCode.DATABASE_ERROR,
                        `La solicitud a la base de datos falló (${ error.code })`,
                        { cause: error },
                    );
            }
        }

        if (
            error instanceof Prisma.PrismaClientValidationError
            || error instanceof Prisma.PrismaClientUnknownRequestError
            || error instanceof Prisma.PrismaClientRustPanicError
            || error instanceof Prisma.PrismaClientInitializationError
        ) {
            return new UnexpectedError(ErrorCode.DATABASE_ERROR, "La operación de base de datos falló", { cause: error });
        }

        if (error instanceof Error) {
            return error;
        }

        return new UnexpectedError(ErrorCode.INTERNAL_ERROR, "Error desconocido", { cause: error });
    }
}
