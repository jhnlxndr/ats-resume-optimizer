import { ResumeBase } from "@/domain/entities";
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { ResumeBaseAlreadyExistsError } from "@/domain/errors/ResumeBaseAlreadyExistsError";
import { ResumeBaseRepository } from "@/domain/repositories/ResumeBaseRepository";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/infrastructure/database/prisma/client";
import { ResumeBaseMapper } from "@/infrastructure/database/prisma/mappers/ResumeBaseMapper";
import { PrismaErrorMapper } from "@/infrastructure/database/prisma/PrismaErrorMapper";

const RESUME_BASE_INCLUDE = {
    candidate: true,
    educations: true,
    experiences: { include: { responsibilities: true } },
    projects: { include: { achievements: true } },
    languages: true,
    references: true,
    skills: { include: { skill: true } },
} satisfies Prisma.ResumeBaseInclude;

export class PrismaResumeBaseRepository implements ResumeBaseRepository {

    // A este punto, el objeto que se viene a guardar, viene en forma de Entity.
    // Por lo tanto, se debe convertir a Persistence (o a base de datos).
    async save(resumeBase: ResumeBase): Promise<ResumeBase> {
        try {
            const data = ResumeBaseMapper.toPersistence(resumeBase);
            const created = await prisma.resumeBase.create({ data, include: RESUME_BASE_INCLUDE });

            return ResumeBaseMapper.toDomain(created);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error, {
                onUniqueConstraintViolation: () => new ResumeBaseAlreadyExistsError(
                    resumeBase.candidate?.email ?? resumeBase.candidateId,
                ),
                onForeignKeyConstraintViolation: () => new CandidateNotFoundError(resumeBase.candidateId),
            });
        }
    }

    async findByCandidateId(candidateId: string): Promise<ResumeBase | null> {
        try {
            const resumeBase = await prisma.resumeBase.findUnique({
                where: { candidateId },
                include: RESUME_BASE_INCLUDE,
            });

            if (!resumeBase) {
                return null;
            }

            return ResumeBaseMapper.toDomain(resumeBase);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

    async findByCandidateEmail(candidateEmail: string): Promise<ResumeBase | null> {
        try {
            const resumeBase = await prisma.resumeBase.findFirst({
                where: { candidate: { email: candidateEmail } },
                include: RESUME_BASE_INCLUDE,
            });

            if (!resumeBase) {
                return null;
            }

            return ResumeBaseMapper.toDomain(resumeBase);
        } catch (error) {
            throw PrismaErrorMapper.toDomainError(error);
        }
    }

}
