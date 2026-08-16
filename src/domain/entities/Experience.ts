import { randomUUID } from "node:crypto";
import type { Responsibility } from './Responsibility';
import type { ResumeBase } from './ResumeBase';

export interface ExperienceProps {
    startDate: Date;
    finishDate?: Date | null;
    company: string;
    position: string;
    responsibilities?: Responsibility[];
    resumeBase: ResumeBase;
    resumeBaseId: string;
    id?: string;
}

export class Experience {
    id?: string;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    startDate: Date;
    finishDate?: Date | null;
    company: string;
    position: string;
    responsibilities?: Responsibility[];

    constructor(
        props: ExperienceProps) {
        this.id = props.id ?? randomUUID();
        this.resumeBase = props.resumeBase;
        this.resumeBaseId = props.resumeBaseId;
        this.startDate = props.startDate;
        this.company = props.company;
        this.position = props.position;
        this.finishDate = props.finishDate;
        this.responsibilities = props.responsibilities;
    }

    static create(props: ExperienceProps) {
        return new Experience(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
