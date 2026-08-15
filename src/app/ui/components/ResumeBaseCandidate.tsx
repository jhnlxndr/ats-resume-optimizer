'use client'

import type {
    EducationResponseDTO,
    ExperienceResponseDTO,
    ResumeBaseResponseDTO,
} from "@/presentation/dto/ResumeBaseResponseDTO";
import type { EducationType } from "@/domain/entities/Education";
import type { LanguageLevel } from "@/domain/entities/Language";
import { PrinterIcon } from '@heroicons/react/20/solid'
import { CV_DOCUMENT_ID } from "@/app/ui/resume-theme/ThemeInitScript";
import ResumeThemeControls from "@/app/ui/resume-theme/ResumeThemeControls";
import { useResumeTheme } from "@/app/ui/resume-theme/useResumeTheme";

const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat("es", { month: "short", year: "numeric" });

const EDUCATION_TYPE_LABEL: Record<EducationType, string> = {
    Academic: "Formación académica",
    Course: "Curso",
    Bootcamp: "Bootcamp",
    Certification: "Certificación",
};

const LANGUAGE_LEVEL_LABEL: Record<LanguageLevel, string> = {
    A1: "A1 · Principiante",
    A2: "A2 · Básico",
    B1: "B1 · Intermedio",
    B2: "B2 · Intermedio alto",
    C1: "C1 · Avanzado",
    C2: "C2 · Avanzado alto",
    Native: "Nativo",
};

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPeriod(startDate: string | Date, finishDate?: string | Date | null, isCurrent?: boolean): string {
    const start = capitalize(MONTH_YEAR_FORMAT.format(new Date(startDate)));

    if (isCurrent || !finishDate) return `${ start } — Presente`;

    return `${ start } — ${ capitalize(MONTH_YEAR_FORMAT.format(new Date(finishDate))) }`;
}

function byStartDateDesc(a: { startDate: string | Date }, b: { startDate: string | Date }): number {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
}

function formatSalary(amount: number, currency: string): string {
    try {
        return new Intl.NumberFormat("es", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch {
        return `${ amount } ${ currency }`;
    }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="cv-section-title mb-3 border-b-2 border-cv-rule pb-1 text-cv-accent">
            { children }
        </h2>
    );
}

export default function ResumeBaseCandidate({ resumeBase }: { resumeBase: ResumeBaseResponseDTO }) {
    const { palette, font, setPalette, setFont } = useResumeTheme();

    if (resumeBase === undefined) return <p>No hay datos del candidato por mostrar</p>

    const candidate = resumeBase.candidate;
    const summary = resumeBase.professionalProfile ?? resumeBase.aboutMe;

    const experiences = [...(resumeBase.experiences ?? [])].sort(byStartDateDesc);
    const educations = [...(resumeBase.educations ?? [])].sort(byStartDateDesc);
    const projects = resumeBase.projects ?? [];
    const languages = resumeBase.languages ?? [];
    const references = resumeBase.references ?? [];
    const skills = resumeBase.skills ?? [];

    const softSkills = skills.filter(skill => skill.category === "Soft" || skill.category === "SoftSkills");
    const technicalSkills = skills.filter(skill => skill.category !== "Soft" && skill.category !== "SoftSkills");

    const contactLine = [
        candidate?.email,
        candidate?.phone,
        candidate?.secondaryPhone,
        [candidate?.city, candidate?.country].filter(Boolean).join(", "),
        candidate?.portfolio,
    ].filter(Boolean).join(" · ");

    return (
        <>
            {/* Panel del editor: paleta, tipografía, nota de salario y exportación. Nunca se imprime. */}
            <div className="mb-4 flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-50 p-4 print:hidden">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                        Expectativa salarial: <span
                        className="font-medium text-gray-700">{ formatSalary(resumeBase.salaryAspiration, resumeBase.salaryCurrency) }</span>
                        <span className="ml-2 text-xs text-gray-400">(no se incluye en el PDF)</span>
                    </p>
                    <button
                        type="button"
                        onClick={ () => window.print() }
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                    >
                        <PrinterIcon aria-hidden="true" className="size-4"/>
                        Imprimir / Guardar como PDF
                    </button>
                </div>
                <ResumeThemeControls
                    palette={ palette }
                    font={ font }
                    onPaletteChange={ setPalette }
                    onFontChange={ setFont }
                />
            </div>

            {/* Documento imprimible: una sola columna, encabezados semánticos y texto real
                (sin tablas, sin iconos, sin fondos de color) para máxima compatibilidad con
                parsers ATS. Los colores y la tipografía llegan por variables CSS controladas
                por data-cv-palette/data-cv-font (ver globals.css y src/app/ui/resume-theme). */}
            <article
                id={ CV_DOCUMENT_ID }
                data-cv-palette={ palette }
                data-cv-font={ font }
                suppressHydrationWarning
                className="font-cv w-full rounded-lg border border-cv-rule bg-white p-8 text-cv-ink sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none"
            >
                <header className="mb-6 border-b border-cv-rule pb-4">
                    <h1 className="cv-name text-cv-accent">{ candidate?.fullName }</h1>
                    <p className="cv-title mt-1 text-cv-ink">{ resumeBase.profession }</p>
                    { contactLine && <p className="cv-body mt-3 text-cv-ink-soft">{ contactLine }</p> }
                </header>

                { summary && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Perfil profesional</SectionTitle>
                        <p className="cv-body text-cv-ink">{ summary }</p>
                    </section>
                ) }

                { technicalSkills.length > 0 && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Habilidades técnicas</SectionTitle>
                        <div className="flex flex-wrap gap-2">
                            { technicalSkills.map(skill => (
                                <span
                                    key={ skill.id }
                                    className="cv-body inline-flex items-center rounded-md border border-cv-rule px-2.5 py-1 text-cv-ink"
                                >
                                    { skill.name }
                                    { skill.level && ` · ${ skill.level }` }
                                    { skill.yearsExperience ? ` (${ skill.yearsExperience } ${ skill.yearsExperience === 1 ? "año" : "años" })` : "" }
                                </span>
                            )) }
                        </div>
                    </section>
                ) }

                { softSkills.length > 0 && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Habilidades blandas</SectionTitle>
                        <div className="flex flex-wrap gap-2">
                            { softSkills.map(skill => (
                                <span
                                    key={ skill.id }
                                    className="cv-body inline-flex items-center rounded-md border border-cv-rule px-2.5 py-1 text-cv-ink"
                                >
                                    { skill.name }
                                </span>
                            )) }
                        </div>
                    </section>
                ) }

                { projects.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Proyectos</SectionTitle>
                        <div className="space-y-4">
                            { projects.map(project => (
                                <div key={ project.id } className="cv-entry">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                        <h3 className="cv-heading text-cv-ink">{ project.title }</h3>
                                        <span className="cv-heading text-cv-ink-soft">{ project.role }</span>
                                    </div>
                                    { project.achievements.length > 0 && (
                                        <ul className="cv-body mt-2 list-disc space-y-1 pl-5 text-cv-ink">
                                            { project.achievements.map(achievement => (
                                                <li key={ achievement.id }>
                                                    { achievement.description }
                                                    { achievement.metric && (
                                                        <span className="font-semibold"> — { achievement.metric }</span>
                                                    ) }
                                                    { achievement.evidence && (
                                                        <span className="text-cv-ink-soft"> ({ achievement.evidence })</span>
                                                    ) }
                                                </li>
                                            )) }
                                        </ul>
                                    ) }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { experiences.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Experiencia laboral</SectionTitle>
                        <div className="space-y-4">
                            { experiences.map((experience: ExperienceResponseDTO) => (
                                <div key={ experience.id } className="cv-entry">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                        <h3 className="cv-heading text-cv-ink">{ experience.position }</h3>
                                        <span className="cv-meta whitespace-nowrap text-cv-ink-soft">
                                            { formatPeriod(experience.startDate, experience.finishDate) }
                                        </span>
                                    </div>
                                    <p className="cv-heading text-cv-ink-soft">{ experience.company }</p>
                                    { experience.responsibilities.length > 0 && (
                                        <ul className="cv-body mt-2 list-disc space-y-1 pl-5 text-cv-ink">
                                            { experience.responsibilities.map(responsibility => (
                                                <li key={ responsibility.id }>{ responsibility.description }</li>
                                            )) }
                                        </ul>
                                    ) }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { educations.length > 0 && (
                    <section className="mb-6">
                        <SectionTitle>Educación</SectionTitle>
                        <div className="space-y-4">
                            { educations.map((education: EducationResponseDTO) => (
                                <div key={ education.id } className="cv-entry">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                        <h3 className="cv-heading text-cv-ink">{ education.title }</h3>
                                        <span className="cv-meta whitespace-nowrap text-cv-ink-soft">
                                            { formatPeriod(education.startDate, education.finishDate, education.isCurrent) }
                                        </span>
                                    </div>
                                    <p className="cv-heading text-cv-ink-soft">
                                        { education.academy } · { EDUCATION_TYPE_LABEL[education.type] }
                                    </p>
                                    { education.description && (
                                        <p className="cv-body mt-1 text-cv-ink">{ education.description }</p>
                                    ) }
                                    { education.linkCredential && (
                                        <p className="cv-body mt-1 break-all text-cv-ink-soft">{ education.linkCredential }</p>
                                    ) }
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { languages.length > 0 && (
                    <section className="cv-entry mb-6">
                        <SectionTitle>Idiomas</SectionTitle>
                        <div className="divide-y divide-dashed divide-cv-rule">
                            { languages.map(language => (
                                <div key={ language.id } className="flex flex-wrap justify-between gap-x-3 py-1.5">
                                    <span className="cv-heading text-cv-ink">{ language.title }</span>
                                    <span className="cv-meta text-cv-ink-soft">
                                        { LANGUAGE_LEVEL_LABEL[language.level] } · { language.academy }
                                    </span>
                                </div>
                            )) }
                        </div>
                    </section>
                ) }

                { references.length > 0 && (
                    <section className="cv-entry">
                        <SectionTitle>Referencias</SectionTitle>
                        <div className="space-y-1.5">
                            { references.map(reference => (
                                <p key={ reference.id } className="cv-body text-cv-ink">
                                    <span className="cv-heading text-cv-ink">{ reference.fullName }</span>
                                    { " — " }
                                    <span className="text-cv-ink-soft">{ reference.companyOrProject } · { reference.phone }</span>
                                </p>
                            )) }
                        </div>
                    </section>
                ) }
            </article>
        </>
    )
}
