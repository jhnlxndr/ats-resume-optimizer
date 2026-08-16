'use client'
import { Candidate } from "@/Candidate";
import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TableCandidates({ candidates }: { candidates: Candidate[] }) {
    if (candidates.length === 0) {
        return <div>No hay candidatos</div>
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900 dark:text-white">Candidatos</h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Lista de todos los candidatos que incluye su correo, teléfono y ciudad.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus-visible:outline-cyan-500"
                    >
                        Agregar candidato
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8 dark:border-white/15 dark:bg-gray-900/75 dark:text-white"
                                >
                                    Nombres completos
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell dark:border-white/15 dark:bg-gray-900/75 dark:text-white"
                                >
                                    Teléfono
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell dark:border-white/15 dark:bg-gray-900/75 dark:text-white"
                                >
                                    Correo electrónico
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter dark:border-white/15 dark:bg-gray-900/75 dark:text-white"
                                >
                                    Ciudad
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8 dark:border-white/15 dark:bg-gray-900/75"
                                >
                                    <span className="sr-only">Ver hoja de vida</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            { candidates.map((candidate, candidateIdx) => (
                                <tr key={ candidate.email }>
                                    <td
                                        className={ classNames(
                                            candidateIdx !== candidates.length - 1 ? 'border-b border-gray-200 dark:border-white/10' : '',
                                            'py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8 dark:text-white',
                                        ) }
                                    >
                                        { candidate.fullName }
                                    </td>
                                    <td
                                        className={ classNames(
                                            candidateIdx !== candidates.length - 1 ? 'border-b border-gray-200 dark:border-white/10' : '',
                                            'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell dark:text-gray-400',
                                        ) }
                                    >
                                        { candidate.phone }
                                    </td>
                                    <td
                                        className={ classNames(
                                            candidateIdx !== candidates.length - 1 ? 'border-b border-gray-200 dark:border-white/10' : '',
                                            'hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell dark:text-gray-400',
                                        ) }
                                    >
                                        { candidate.email }
                                    </td>
                                    <td
                                        className={ classNames(
                                            candidateIdx !== candidates.length - 1 ? 'border-b border-gray-200 dark:border-white/10' : '',
                                            'px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400',
                                        ) }
                                    >
                                        { candidate.city }
                                    </td>
                                    <td
                                        className={ classNames(
                                            candidateIdx !== candidates.length - 1 ? 'border-b border-gray-200 dark:border-white/10' : '',
                                            'py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-8 lg:pr-8',
                                        ) }
                                    >
                                        <Link
                                            href={ `/candidates/${ candidate.id }/resume-base` }
                                            className="text-cyan-600 hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300"
                                        >
                                            Ver hoja de vida<span className="sr-only">, { candidate.fullName }</span>
                                        </Link>
                                    </td>
                                </tr>
                            )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
