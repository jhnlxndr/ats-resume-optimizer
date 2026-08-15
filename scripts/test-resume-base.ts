import { Candidate } from '@/domain/entities'
import { CreateResumeBaseUseCase } from "@/application/use-cases/resume-bases/CreateResumeBaseUseCase";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { PrismaResumeBaseRepository } from "@/infrastructure/database/prisma/repositories/PrismaResumeBaseRepository";

async function main() {
    const candidateRepository = new PrismaCandidateRepository();
    const resumeBaseRepository = new PrismaResumeBaseRepository();
    const createResumeBaseUseCase = new CreateResumeBaseUseCase(resumeBaseRepository, candidateRepository);

    const candidate = await candidateRepository.save(Candidate.create({
        fullName: 'Johan',
        city: 'Caldas',
        country: 'Colombia',
        email: `johan.${ Date.now() }@gmail.com`,
        phone: '123456789',
    }));

    const resumeBase = await createResumeBaseUseCase.execute({
        candidateId: candidate.id!,
        profession: 'Software Engineer',
        aboutMe: 'Backend developer',
        salaryAspiration: 5000000,
        salaryCurrency: 'COP',
        educations: [
            {
                type: 'Academic',
                title: 'Systems Engineering',
                academy: 'UTP',
                startDate: new Date('2015-01-01'),
                finishDate: new Date('2020-12-01'),
                isCurrent: false,
            },
        ],
        experiences: [
            {
                startDate: new Date('2021-01-01'),
                company: 'Acme Corp',
                position: 'Backend Developer',
                responsibilities: [
                    { description: 'Built the payments service that increased checkout conversion by 12%' },
                ],
            },
        ],
        languages: [
            { title: 'English', level: 'B2', academy: 'Self-taught' },
        ],
    });

    console.log(resumeBase);
}

main();
