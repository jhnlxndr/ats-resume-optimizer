import { randomUUID } from "node:crypto";
import type { ResumeBase } from './ResumeBase';

export type EducationType = 'Academic' | 'Course' | 'Bootcamp' | 'Certification';

export interface EducationProps {
    type: EducationType;
    title: string;
    description?: string | null;
    academy: string;
    linkCredential?: string | null;
    startDate: Date;
    finishDate?: Date | null;
    isCurrent: boolean;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    id?: string;
}

export class Education {
    id?: string;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    type: EducationType;
    title: string;
    description?: string | null;
    academy: string;
    linkCredential?: string | null;
    startDate: Date;
    finishDate?: Date | null;
    isCurrent: boolean;

    constructor(
        props: EducationProps,
    ) {
        this.id = props.id ?? randomUUID();
        this.resumeBase = props.resumeBase;
        this.resumeBaseId = props.resumeBaseId;
        this.type = props.type;
        this.title = props.title;
        this.description = props.description;
        this.academy = props.academy;
        this.linkCredential = props.linkCredential;
        this.startDate = props.startDate;
        this.finishDate = props.finishDate;
        this.isCurrent = props.isCurrent;
    }

    static create(props: EducationProps) {
        return new Education(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
