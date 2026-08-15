import { ResumeBase } from "@/domain/entities";

export interface ResumeBaseRepository {
    save(resumeBase: ResumeBase): Promise<ResumeBase>;

    findByCandidateId(candidateId: string): Promise<ResumeBase | null>;

    // findByResumeBaseId(resumeBaseId: string): Promise<ResumeBase | null>;

    findByCandidateEmail(candidateEmail: string): Promise<ResumeBase | null>;
}