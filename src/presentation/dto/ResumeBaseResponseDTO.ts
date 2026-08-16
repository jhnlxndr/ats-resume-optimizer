import type { EducationType } from "@/domain/entities/Education";
import type { LanguageLevel } from "@/domain/entities/Language";
import type { SkillCategory } from "@/domain/entities/Skill";

export interface CandidateSummaryDTO {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    secondaryPhone?: string | null;
    city: string;
    country: string;
    portfolio?: string | null;
}

export interface EducationResponseDTO {
    id: string;
    type: EducationType;
    title: string;
    description?: string | null;
    academy: string;
    linkCredential?: string | null;
    startDate: Date;
    finishDate?: Date | null;
    isCurrent: boolean;
}

export interface ResponsibilityResponseDTO {
    id: string;
    description: string;
}

export interface ExperienceResponseDTO {
    id: string;
    startDate: Date;
    finishDate?: Date | null;
    company: string;
    position: string;
    responsibilities: ResponsibilityResponseDTO[];
}

export interface AchievementResponseDTO {
    id: string;
    description: string;
    metric?: string | null;
    evidence: string;
}

export interface ProjectResponseDTO {
    id: string;
    title: string;
    role: string;
    achievements: AchievementResponseDTO[];
}

export interface LanguageResponseDTO {
    id: string;
    title: string;
    level: LanguageLevel;
    academy: string;
    evidence?: string | null;
}

export interface ReferenceResponseDTO {
    id: string;
    fullName: string;
    phone: string;
    companyOrProject: string;
}

export interface ResumeBaseSkillResponseDTO {
    id: string;
    skillId: string;
    name?: string;
    description?: string;
    category?: SkillCategory;
    level?: string | null;
    yearsExperience?: number | null;
    evidence?: string | null;
}

export interface ResumeBaseResponseDTO {
    id: string;
    candidateId: string;
    candidate?: CandidateSummaryDTO;
    profession: string;
    aboutMe?: string | null;
    professionalProfile?: string | null;
    salaryAspiration: number;
    salaryCurrency: string;
    educations: EducationResponseDTO[];
    experiences: ExperienceResponseDTO[];
    projects: ProjectResponseDTO[];
    languages: LanguageResponseDTO[];
    references: ReferenceResponseDTO[];
    skills: ResumeBaseSkillResponseDTO[];
}
