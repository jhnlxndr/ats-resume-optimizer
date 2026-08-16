import type { ResumeBase } from './ResumeBase';
import type { OptimizedResume } from './OptimizedResume';
import { randomUUID } from "node:crypto";
import { ValidationError, type ValidationIssue } from "@/domain/errors/ValidationError";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface CandidateProps {
    readonly id?: string;
    fullName: string;
    email: string;
    phone: string;
    secondaryPhone?: string | null;
    city: string;
    country: string;
    portfolio?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    resumeBase?: ResumeBase | null;
    resumes?: OptimizedResume[];
}

export class Candidate {
    fullName: string;
    email: string;
    phone: string;
    secondaryPhone?: string | null;
    city: string;
    country: string;
    portfolio?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    resumeBase?: ResumeBase | null;
    resumes?: OptimizedResume[];
    readonly id?: string;

    constructor(props: CandidateProps) {
        this.id = props.id ?? randomUUID();
        this.fullName = props.fullName;
        this.email = props.email;
        this.phone = props.phone;
        this.secondaryPhone = props.secondaryPhone;
        this.city = props.city;
        this.country = props.country;
        this.portfolio = props.portfolio;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
        this.resumeBase = props.resumeBase;
        this.resumes = props.resumes;
    }

    static create(props: CandidateProps) {
        Candidate.validate(props);

        return new Candidate(
            {
                id: props.id ?? randomUUID(),
                ...props,
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? new Date(),
            }
        );
    }

    private static validate(props: CandidateProps): void {
        const issues: ValidationIssue[] = [];

        if (!props.fullName?.trim()) {
            issues.push({ field: "fullName", message: "El nombre completo es obligatorio" });
        }
        if (!props.email?.trim() || !EMAIL_PATTERN.test(props.email)) {
            issues.push({ field: "email", message: "El correo electrónico debe ser válido" });
        }
        if (!props.phone?.trim()) {
            issues.push({ field: "phone", message: "El teléfono es obligatorio" });
        }
        if (!props.city?.trim()) {
            issues.push({ field: "city", message: "La ciudad es obligatoria" });
        }
        if (!props.country?.trim()) {
            issues.push({ field: "country", message: "El país es obligatorio" });
        }

        if (issues.length > 0) {
            throw new ValidationError(issues);
        }
    }
}
