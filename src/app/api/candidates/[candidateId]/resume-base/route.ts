import { GetResumeBaseUseCase } from "@/application/use-cases/resume-bases/GetResumeBaseUseCase";
import { PrismaResumeBaseRepository } from "@/infrastructure/database/prisma/repositories/PrismaResumeBaseRepository";
import { ResumeBaseResponseMapper } from "@/presentation/mappers/ResumeBaseResponseMapper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ candidateId: string }> }
) {
    try {
        const candidateId = await params;
        console.log(candidateId);
        const repository = new PrismaResumeBaseRepository();
        const useCase = new GetResumeBaseUseCase(repository);
        const resumeBase = await useCase.execute(candidateId.candidateId)
        console.log(resumeBase);
        return NextResponse.json(
            ResumeBaseResponseMapper.toResponse(resumeBase),
            { status: 200 });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            if (error.name === "ResumeBaseNotFoundError") {
                return NextResponse.json(
                    {
                        code: "RESUME_BASE_NOT_FOUND",
                        message: error.message,
                    },
                    { status: 404 }
                );
            }
        }
    }
}