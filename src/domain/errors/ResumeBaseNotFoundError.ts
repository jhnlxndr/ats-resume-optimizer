import { NotFoundError } from "@/domain/errors/NotFoundError";

/** No existe ningún Candidate con el identificador dado (id o email). */
export class ResumeBaseNotFoundError extends NotFoundError {
    constructor(identifier: string) {
        super(`Hoja de vida del candidato ${identifier} no encontrada`);

        this.name = "ResumeBaseNotFoundError";
    }
}
