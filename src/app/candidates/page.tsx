import TableCandidates from "@/app/ui/components/TableCandidates";

export default async function CandidatesPage() {
    const candidates = await fetch("http://localhost:3000/api/candidates")
        .then(res => res.json())
        .catch(err => console.error(err));

    if (candidates === undefined) return <p>Se ha presentado un error al consultar los candidatos</p>;

    return <>
        <main className="py-24 flex min-h-screen flex-col items-center max-w-5xl mx-auto">
            <TableCandidates candidates={ candidates }/>
        </main>
    </>;
}