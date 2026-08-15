import { randomUUID } from "node:crypto";
import type { Candidate } from './Candidate';
import type { JobOffer } from './JobOffer';

export interface OptimizedResumeProps {
    jobOffer: JobOffer;
    jobOfferId: string;
    candidate: Candidate;
    candidateId: string;
    score: number;
    recommendations: string;
    analysis: string;
    id?: string;
}

export class OptimizedResume {
    id?: string;
    jobOffer: JobOffer;
    jobOfferId: string;
    candidate: Candidate;
    candidateId: string;
    score: number;
    recommendations: string;
    analysis: string;

    constructor(
        props: OptimizedResumeProps,) {
        this.id = props.id ?? randomUUID();
        this.jobOffer = props.jobOffer;
        this.jobOfferId = props.jobOfferId;
        this.candidate = props.candidate;
        this.candidateId = props.candidateId;
        this.score = props.score;
        this.recommendations = props.recommendations;
        this.analysis = props.analysis;
    }

    static create(props: OptimizedResumeProps) {
        return new OptimizedResume({
            id: props.id ?? randomUUID(),
            ...props,
        });
    }
}
