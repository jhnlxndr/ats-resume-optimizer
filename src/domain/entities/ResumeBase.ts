import { ValidationError, type ValidationIssue } from "@/domain/errors/ValidationError";
import { randomUUID } from "node:crypto";
import type { Candidate } from './Candidate';
import type { Education } from './Education';
import type { Experience } from './Experience';
import type { Language } from './Language';
import type { Project } from './Project';
import type { Reference } from './Reference';
import type { ResumeBaseSkill } from './ResumeBaseSkill';

export interface ResumeBaseProps {
    candidate?: Candidate | null;
    candidateId: string;
    profession: string;
    aboutMe?: string;
    professionalProfile?: string | null;
    salaryAspiration: number;
    salaryCurrency: string;
    educations?: Education[];
    experiences?: Experience[];
    projects?: Project[];
    languages?: Language[];
    references?: Reference[];
    skills?: ResumeBaseSkill[];
    readonly id?: string;
}

export class ResumeBase {
    readonly id?: string;
    candidate?: Candidate | null;
    candidateId: string;
    profession: string;
    aboutMe?: string;
    professionalProfile?: string | null;
    salaryAspiration: number;
    salaryCurrency: string;
    educations?: Education[];
    experiences?: Experience[];
    projects?: Project[];
    languages?: Language[];
    references?: Reference[];
    skills?: ResumeBaseSkill[];

    constructor(props: ResumeBaseProps) {
        this.id = props.id ?? randomUUID();
        this.candidate = props.candidate;
        this.candidateId = props.candidateId;
        this.profession = props.profession;
        this.aboutMe = props.aboutMe;
        this.professionalProfile = props.professionalProfile;
        this.salaryAspiration = props.salaryAspiration;
        this.salaryCurrency = props.salaryCurrency;
        this.educations = props.educations;
        this.experiences = props.experiences;
        this.projects = props.projects;
        this.languages = props.languages;
        this.references = props.references;
        this.skills = props.skills;
    }

    public static create(props: ResumeBaseProps): ResumeBase {
        ResumeBase.validate(props);

        return new ResumeBase({
            id: props.id ?? randomUUID(),
            ...props,
            educations: props.educations ?? [],
            experiences: props.experiences ?? [],
            projects: props.projects ?? [],
            languages: props.languages ?? [],
            references: props.references ?? [],
            skills: props.skills ?? [],
        });
    }

    private static validate(props: ResumeBaseProps): void {
        const issues: ValidationIssue[] = [];

        if (!props.candidateId?.trim()) {
            issues.push({ field: "candidateId", message: "Candidate id is required" });
        }
        if (!props.profession?.trim()) {
            issues.push({ field: "profession", message: "Profession is required" });
        }
        if (props.salaryAspiration === undefined || props.salaryAspiration === null || props.salaryAspiration < 0) {
            issues.push({ field: "salaryAspiration", message: "Salary aspiration must be a non-negative number" });
        }
        if (!props.salaryCurrency?.trim()) {
            issues.push({ field: "salaryCurrency", message: "Salary currency is required" });
        }

        if (issues.length > 0) {
            throw new ValidationError(issues);
        }
    }
}
