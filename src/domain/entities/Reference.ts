import { randomUUID } from "node:crypto";
import type { ResumeBase } from './ResumeBase';

export interface ReferenceProps {
    resumeBase: ResumeBase;
    resumeBaseId: string;
    fullName: string;
    phone: string;
    companyOrProject: string;
    id?: string;
}

export class Reference {
    id?: string;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    fullName: string;
    phone: string;
    companyOrProject: string;

    constructor(
        props: ReferenceProps,) {
        this.id = props.id;
        this.resumeBase = props.resumeBase;
        this.resumeBaseId = props.resumeBaseId;
        this.fullName = props.fullName;
        this.phone = props.phone;
        this.companyOrProject = props.companyOrProject;
    }

    static create(props: ReferenceProps) {
        return new Reference(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
