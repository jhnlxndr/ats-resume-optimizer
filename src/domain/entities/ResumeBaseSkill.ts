import type { ResumeBase } from './ResumeBase';
import type { Skill } from './Skill';

export interface ResumeBaseSkillProps {
    resumeBaseId: string;
    skillId: string;
    resumeBase?: ResumeBase | null;
    skill?: Skill | null;
    level?: string | null;
    yearsExperience?: number | null;
    evidence?: string | null;
    id?: string;
}

export class ResumeBaseSkill {
    id?: string;
    resumeBaseId: string;
    skillId: string;
    resumeBase?: ResumeBase | null;
    skill?: Skill | null;
    level?: string | null;
    yearsExperience?: number | null;
    evidence?: string | null;

    constructor(
        props: ResumeBaseSkillProps,) {
        this.id = props.id;
        this.resumeBaseId = props.resumeBaseId;
        this.skillId = props.skillId;
        this.resumeBase = props.resumeBase;
        this.skill = props.skill;
        this.level = props.level;
        this.yearsExperience = props.yearsExperience;
        this.evidence = props.evidence;
    }

    static create(props: ResumeBaseSkillProps) {
        return new ResumeBaseSkill(props);
    }
}