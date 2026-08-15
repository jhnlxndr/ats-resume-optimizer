import { randomUUID } from "node:crypto";
import type { JobOfferSkill } from './JobOfferSkill';
import type { OptimizedResume } from './OptimizedResume';

export interface JobOfferProps {
    position: string;
    date: Date;
    company: string;
    skills: JobOfferSkill[];
    minEducation: string;
    minExperienceTime: number;
    description: string;
    optimizedResume?: OptimizedResume | null;
    id?: string;
}

export class JobOffer {
    id?: string;
    optimizedResume?: OptimizedResume | null;
    position: string;
    date: Date;
    company: string;
    skills: JobOfferSkill[];
    minEducation: string;
    minExperienceTime: number;
    description: string;

    constructor(
        props: JobOfferProps,) {
        this.id = props.id ?? randomUUID();
        this.optimizedResume = props.optimizedResume;
        this.position = props.position;
        this.date = props.date;
        this.company = props.company;
        this.skills = props.skills;
        this.minEducation = props.minEducation;
        this.minExperienceTime = props.minExperienceTime;
        this.description = props.description;
    }

    static create(props: JobOfferProps) {
        return new JobOffer(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
