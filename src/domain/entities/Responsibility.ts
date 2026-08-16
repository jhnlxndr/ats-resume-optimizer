import { randomUUID } from "node:crypto";
import type { Experience } from './Experience';

export interface ResponsibilityProps {
    experience: Experience;
    experienceId: string;
    description: string;
    id?: string;
}

export class Responsibility {
    id?: string;
    experience: Experience;
    experienceId: string;
    description: string;

    constructor(
        props: ResponsibilityProps,) {
        this.id = props.id ?? randomUUID();
        this.experience = props.experience;
        this.experienceId = props.experienceId;
        this.description = props.description;
    }

    static create(props: ResponsibilityProps) {
        return new Responsibility(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
