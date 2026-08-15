import type { Metadata } from "next";
import ResumeBaseCandidate from "@/app/ui/components/ResumeBaseCandidate";
import ThemeInitScript from "@/app/ui/resume-theme/ThemeInitScript";
import type { ResumeBaseResponseDTO } from "@/presentation/dto/ResumeBaseResponseDTO";

async function getResumeBase(id: string): Promise<ResumeBaseResponseDTO | undefined> {
    return fetch(`http://localhost:3000/api/candidates/${id}/resume-base`)
        .then(res => res.json()).catch(err => { console.error(err); return undefined; });
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const fullName = (await getResumeBase(id))?.candidate?.fullName;

    if (!fullName) return {};

    return { title: `CV | ${fullName}` };
}

export default async function CandidateResumeBasePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (id === undefined) return <p>Se ha presentado un error al consultar la hoja de vida del candidato</p>;

    const resumeBase = await getResumeBase(id);

    if (resumeBase === undefined) return <p>Se ha presentado un error al consultar la hoja de vida del candidato</p>;

    return <>
        <main className="min-h-screen bg-gray-50 py-10 print:bg-white print:py-0">
            <div className="mx-auto max-w-3xl px-4 print:max-w-none print:px-0">
                <ResumeBaseCandidate resumeBase={resumeBase} />
                <ThemeInitScript />
            </div>
        </main>
    </>
}


