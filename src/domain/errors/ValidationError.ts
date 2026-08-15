import { DomainError } from "@/domain/errors/DomainError";
import { ErrorCode } from "@/domain/errors/ErrorCode";

export interface ValidationIssue {
    readonly field: string;
    readonly message: string;
}

/**
 * Representa el incumplimiento de una invariante de una entidad de dominio
 * (p. ej. un Candidate sin email válido o sin nombre). A diferencia de
 * NotFoundError/ConflictError, esta clase es concreta (no abstracta): una
 * violación de invariante es estructuralmente igual sin importar qué entidad
 * la lanzó (una lista de pares campo/mensaje), así que crear una subclase por
 * entidad agregaría ceremonia sin agregar significado.
 */
export class ValidationError extends DomainError {
    readonly code: ErrorCode = ErrorCode.VALIDATION_ERROR;
    readonly issues: ValidationIssue[];

    constructor(issues: ValidationIssue[]) {
        super(ValidationError.buildMessage(issues));
        this.issues = issues;
    }

    private static buildMessage(issues: ValidationIssue[]): string {
        return issues.map((issue) => `${issue.field}: ${issue.message}`).join("; ");
    }
}
