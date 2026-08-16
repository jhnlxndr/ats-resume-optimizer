import { randomUUID } from "node:crypto";
import type { Project } from './Project';

export interface AchievementProps {
    project: Project;
    projectId: string;
    description: string;
    metric?: string | null;
    evidence: string;
    id?: string;
}

export class Achievement {
    id?: string;
    project: Project;
    projectId: string;
    description: string;
    metric?: string | null;
    evidence: string;

    constructor(
        props: AchievementProps,) {
        this.id = props.id ?? randomUUID();
        this.project = props.project;
        this.projectId = props.projectId;
        this.description = props.description;
        this.metric = props.metric;
        this.evidence = props.evidence;
    }

    static create(props: AchievementProps) {
        return new Achievement(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }

    public assignProject(project: Project, projectId: string) {
        this.project = project;
        this.projectId = projectId;
    }

    public updateDescription(description: string) {
        this.description = description;
    }

    public updateMetric(metric: string | null) {
        this.metric = metric;
    }

    public updateEvidence(evidence: string) {
        this.evidence = evidence;
    }
}
