import { Candidate } from '@/domain/entities'
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";

async function main() {
    const candidateRepository = new PrismaCandidateRepository();
    const candidate = Candidate.create({
        fullName: 'Johan',
        city: 'Caldas',
        country: 'Colombia',
        email: 'johan.londono@gmail.com',
        phone: '123456789',
    })

    const saved = await candidateRepository.save(candidate);

    console.log(saved);
}

main();