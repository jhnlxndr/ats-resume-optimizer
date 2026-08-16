import { Candidate } from "../entities";

export interface CandidateRepository {
    save(candidate: Candidate): Promise<Candidate>;

    findAll(): Promise<Candidate[]>;

    findById(id: string): Promise<Candidate | null>;

    findByEmail(email: string): Promise<Candidate | null>;

    delete(id: string): Promise<void>;
}