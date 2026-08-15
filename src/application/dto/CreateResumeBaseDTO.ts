import type { EducationType } from "@/domain/entities/Education";
import type { LanguageLevel } from "@/domain/entities/Language";

export interface CreateEducationDTO {
    type: EducationType;
    title: string;
    description?: string | null;
    academy: string;
    linkCredential?: string | null;
    startDate: Date;
    finishDate?: Date | null;
    isCurrent: boolean;
}

export interface CreateResponsibilityDTO {
    description: string;
}

export interface CreateExperienceDTO {
    startDate: Date;
    finishDate?: Date | null;
    company: string;
    position: string;
    responsibilities?: CreateResponsibilityDTO[];
}

export interface CreateAchievementDTO {
    description: string;
    metric?: string | null;
    evidence: string;
}

export interface CreateProjectDTO {
    title: string;
    role: string;
    achievements?: CreateAchievementDTO[];
}

export interface CreateLanguageDTO {
    title: string;
    level: LanguageLevel;
    academy: string;
    evidence?: string | null;
}

export interface CreateReferenceDTO {
    fullName: string;
    phone: string;
    companyOrProject: string;
}

export interface CreateResumeBaseSkillDTO {
    skillId: string;
    level?: string | null;
    yearsExperience?: number | null;
    evidence?: string | null;
}

export interface CreateResumeBaseDTO {
    candidateId: string;
    profession: string;
    aboutMe?: string;
    professionalProfile?: string | null;
    salaryAspiration: number;
    salaryCurrency: string;
    educations?: CreateEducationDTO[];
    experiences?: CreateExperienceDTO[];
    projects?: CreateProjectDTO[];
    languages?: CreateLanguageDTO[];
    references?: CreateReferenceDTO[];
    skills?: CreateResumeBaseSkillDTO[];
}
