import { NotFoundError } from "@/domain/errors/NotFoundError";

/** No existe ningún Candidate con el identificador dado (id o email). */
export class CandidateNotFoundError extends NotFoundError {
    constructor(identifier: string) {
        super(`Candidate not found: ${ identifier }`);
    }
}
