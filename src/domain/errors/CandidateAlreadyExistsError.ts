import { ConflictError } from "@/domain/errors/ConflictError";

/** El email ya pertenece a otro Candidate — regla de unicidad de negocio,
 * no un detalle de la base de datos. */
export class CandidateAlreadyExistsError extends ConflictError {
    constructor(email: string) {
        super(`Candidate with email ${ email } already exists`);
    }
}