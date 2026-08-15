import type { CreateResumeBaseDTO } from "@/application/dto/CreateResumeBaseDTO";
import { CreateResumeBaseUseCase } from "@/application/use-cases/resume-bases/CreateResumeBaseUseCase";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { PrismaResumeBaseRepository } from "@/infrastructure/database/prisma/repositories/PrismaResumeBaseRepository";
import { HttpErrorMapper } from "@/presentation/http/HttpErrorMapper";
import { ResumeBaseResponseMapper } from "@/presentation/mappers/ResumeBaseResponseMapper";
import { CreateResumeBaseSchema } from "@/presentation/validators/CreateResumeBaseSchema";
import { NextRequest, NextResponse } from "next/server";

const candidateRepository = new PrismaCandidateRepository();
const resumeBaseRepository = new PrismaResumeBaseRepository();
const createResumeBaseUseCase = new CreateResumeBaseUseCase(resumeBaseRepository, candidateRepository);

export async function GET(request: NextRequest) {
    const candidateId = request.nextUrl.searchParams.get("candidateId");
    const candidateEmail = request.nextUrl.searchParams.get("candidateEmail");

    if (!candidateId && !candidateEmail) {
        return NextResponse.json(
            {
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Para la consulta es determinante candidateId o candidateEmail"
                }
            },
            { status: 400 },
        );
    }

    try {
        const resumeBase = candidateId
            ? await resumeBaseRepository.findByCandidateId(candidateId)
            : await resumeBaseRepository.findByCandidateEmail(candidateEmail!);

        if (!resumeBase) {
            return NextResponse.json(
                { error: { code: "NOT_FOUND", message: "Hoja de vida no encontrada" } },
                { status: 404 },
            );
        }

        return NextResponse.json(ResumeBaseResponseMapper.toResponse(resumeBase));
    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}

export async function POST(request: NextRequest) {
    let body: CreateResumeBaseDTO;

    try {
        body = (await request.json()) as CreateResumeBaseDTO;
    } catch {
        return NextResponse.json(
            { error: { code: "INVALID_JSON", message: "El cuerpo de la petición debe tener un JSON válido" } },
            { status: 400 },
        );
    }

    try {
        const validation = CreateResumeBaseSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Error de validación",
                    issues: validation.error.issues.map(issue => ({
                        field: issue.path[0],
                        message: issue.message,
                    })),
                },
            })
        }

        const resumeBase = await createResumeBaseUseCase.execute(validation.data);

        return NextResponse.json({
                id: resumeBase.id,
                message: "Hoja de vida creada satisfactoriamente",
            },
            { status: 201 });

    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}
