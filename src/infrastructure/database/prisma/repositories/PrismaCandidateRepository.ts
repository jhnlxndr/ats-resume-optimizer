import { Candidate } from "@/domain/entities";
import { CandidateAlreadyExistsError } from "@/domain/errors/CandidateAlreadyExistsError";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { CandidateRepository } from "@/domain/repositories/CandidateRepository";
import { prisma } from "@/infrastructure/database/prisma/client";
import { CandidateMapper } from "@/infrastructure/database/prisma/mappers/CandidateMapper";
import { PrismaErrorMapper } from "@/infrastructure/database/prisma/PrismaErrorMapper";

export class PrismaCandidateRepository implements CandidateRepository {

    // A este punto, el objeto que se viene a guardar, viene en forma de Entity.
    // Por lo tanto, se debe convertir a Persistence (o a base de datos).
    async save(candidate: Candidate): Promise<Candidate> {
        try {
            const data = CandidateMapper.toPersistence(candidate);
            const created = await prisma.candidate.create({ data });

            return CandidateMapper.toDomain(created);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error, {
                onUniqueConstraintViolation: () => new CandidateAlreadyExistsError(candidate.email),
            });
        }
    }

    async findAll(): Promise<Candidate[]> {
        try {
            const candidates = await prisma.candidate.findMany();
            return candidates.map(CandidateMapper.toDomain);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

    async findByEmail(email: string): Promise<Candidate | null> {
        try {
            const candidate = await prisma.candidate.findUnique({ where: { email } });

            if (!candidate) {
                return null;
            }

            return CandidateMapper.toDomain(candidate);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

    async findById(id: string): Promise<Candidate | null> {
        try {
            const candidate = await prisma.candidate.findUnique({ where: { id } });

            if (!candidate) {
                return null;
            }

            return CandidateMapper.toDomain(candidate);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.candidate.delete({ where: { id } });
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error, {
                onRecordNotFound: () => new CandidateNotFoundError(id),
            });
        }
    }

}
