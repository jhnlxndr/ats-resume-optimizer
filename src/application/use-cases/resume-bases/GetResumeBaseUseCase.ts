import { ResumeBaseRepository } from "@/domain/repositories/ResumeBaseRepository";
import { ResumeBaseNotFoundError } from "@/domain/errors/ResumeBaseNotFoundError";
import { ResumeBase } from "@/domain/entities";

export class GetResumeBaseUseCase {
    constructor(private readonly resumeBaseRepository: ResumeBaseRepository) { }

    async execute(candidateId: string): Promise<ResumeBase> {
        const resumeBase = await this.resumeBaseRepository.findByCandidateId(candidateId);

        if (!resumeBase) {
            throw new ResumeBaseNotFoundError(candidateId);
        }

        return resumeBase;
    }
}