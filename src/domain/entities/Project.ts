import { randomUUID } from "node:crypto";
import type { Achievement } from './Achievement';
import type { ResumeBase } from './ResumeBase';

export interface ProjectProps {
    title: string;
    role: string;
    achievements: Achievement[];
    resumeBase: ResumeBase;
    resumeBaseId: string;
    readonly id?: string;
}

export class Project {
    id?: string;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    title: string;
    role: string;
    achievements: Achievement[];

    constructor(
        props: ProjectProps
    ) {
        this.id = props.id ?? randomUUID();
        this.resumeBase = props.resumeBase;
        this.resumeBaseId = props.resumeBaseId;
        this.title = props.title;
        this.role = props.role;
        this.achievements = props.achievements ?? [];
    }

    static create(props: ProjectProps) {
        return new Project(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
