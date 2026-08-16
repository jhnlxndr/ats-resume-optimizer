import { randomUUID } from "node:crypto";
import type { JobOfferSkill } from './JobOfferSkill';
import type { ResumeBaseSkill } from './ResumeBaseSkill';

export interface SkillProps {
    name: string;
    description: string;
    category: SkillCategory;
    resumes?: ResumeBaseSkill[];
    jobOffers?: JobOfferSkill[];
    id?: string;
}

export type SkillCategory =
    | 'Technical'
    | 'Soft'
    | 'Language'
    | 'Tool'
    | 'Backend'
    | 'Frontend'
    | 'DevOps'
    | 'Database'
    | 'Cloud'
    | 'SoftSkills'
    | 'Agile';

export class Skill {
    id?: string;
    name: string;
    description: string;
    category: SkillCategory;
    resumes?: ResumeBaseSkill[];
    jobOffers?: JobOfferSkill[];

    constructor(
        props: SkillProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.category = props.category;
        this.resumes = props.resumes;
        this.jobOffers = props.jobOffers;
    }

    static create(props: SkillProps) {
        return new Skill({
            id: props.id ?? randomUUID(),
            ...props,
        });
    }
}
