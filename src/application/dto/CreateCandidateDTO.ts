import type { OptimizedResume, ResumeBase } from "@/domain/entities";

export interface CreateCandidateDTO {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    portfolio?: string;
    resumes?: OptimizedResume[];
    createdAt?: Date;
    updatedAt?: Date;
    secondaryPhone?: string | null;
    resumeBase?: ResumeBase | null;
    id?: string;
}
