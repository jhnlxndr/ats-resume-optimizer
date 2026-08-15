import { randomUUID } from "node:crypto";
import type { ResumeBase } from './ResumeBase';

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';

export interface LanguageProps {
    title: string;
    level: LanguageLevel;
    academy: string;
    evidence?: string | null;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    id?: string;
}

export class Language {
    id?: string;
    resumeBase: ResumeBase;
    resumeBaseId: string;
    title: string;
    level: LanguageLevel;
    academy: string;
    evidence?: string | null;

    constructor(
        props: LanguageProps,) {
        this.id = props.id ?? randomUUID();
        this.resumeBase = props.resumeBase;
        this.resumeBaseId = props.resumeBaseId;
        this.title = props.title;
        this.level = props.level;
        this.academy = props.academy;
        this.evidence = props.evidence;
    }

    static create(props: LanguageProps) {
        return new Language(
            {
                id: props.id ?? randomUUID(),
                ...props,
            }
        );
    }
}
