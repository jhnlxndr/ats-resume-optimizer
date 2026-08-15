import { Candidate } from "@/domain/entities";
import { CandidateAlreadyExistsError } from "@/domain/errors/CandidateAlreadyExistsError";
import { CandidateRepository } from "@/domain/repositories/CandidateRepository";
import { CreateCandidateDTO } from "../../dto/CreateCandidateDTO";

export class CreateCandidateUseCase {
    constructor(
        private readonly createCandidateRepository: CandidateRepository
    ) {
    }

    async execute(data: CreateCandidateDTO): Promise<Candidate> {
        const existingCandidate = await this.createCandidateRepository.findByEmail(data.email);

        if (existingCandidate) {
            throw new CandidateAlreadyExistsError(data.email);
        }

        const candidate = Candidate.create(data);

        return await this.createCandidateRepository.save(candidate)
    }

}