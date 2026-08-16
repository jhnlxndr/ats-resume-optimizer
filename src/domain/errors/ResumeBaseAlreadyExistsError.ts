import { ConflictError } from "@/domain/errors/ConflictError";

/** El email ya pertenece a otro Candidate — regla de unicidad de negocio,
 * no un detalle de la base de datos. */
export class ResumeBaseAlreadyExistsError extends ConflictError {
    constructor(email: string) {
        super(`The candidate with email ${ email } already has a resume base`);
    }
}