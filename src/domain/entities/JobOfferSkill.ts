import type { JobOffer } from './JobOffer';
import type { Skill } from './Skill';

export interface JobOfferSkillProps {
    skill: Skill;
    jobOffer: JobOffer;
    skillId: string;
    jobOfferId: string;
    required?: boolean | null;
    priority?: number | null;
    yearsRequired?: number | null;
}

export class JobOfferSkill {
    skill: Skill;
    jobOffer: JobOffer;
    skillId: string;
    jobOfferId: string;
    required?: boolean | null;
    priority?: number | null;
    yearsRequired?: number | null;

    constructor(
        props: JobOfferSkillProps) {
        this.skill = props.skill;
        this.jobOffer = props.jobOffer;
        this.skillId = props.skillId;
        this.jobOfferId = props.jobOfferId;
        this.required = props.required;
        this.priority = props.priority;
        this.yearsRequired = props.yearsRequired;
    }

    static create(props: JobOfferSkillProps) {
        return new JobOfferSkill(props);
    }
}
