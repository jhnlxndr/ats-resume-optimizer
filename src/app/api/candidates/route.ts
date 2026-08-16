import type { CreateCandidateDTO } from "@/application/dto/CreateCandidateDTO";
import { CreateCandidateUseCase } from "@/application/use-cases/candidates/CreateCandidateUseCase";
import { PrismaCandidateRepository } from "@/infrastructure/database/prisma/repositories/PrismaCandidateRepository";
import { HttpErrorMapper } from "@/presentation/http/HttpErrorMapper";
import { CreateCandidateSchema } from "@/presentation/validators/CreateCandidateSchema";
import { NextRequest, NextResponse } from "next/server";

const candidateRepository = new PrismaCandidateRepository();
const createCandidateUseCase = new CreateCandidateUseCase(candidateRepository);

export async function GET() {
    try {
        const candidates = await candidateRepository.findAll();
        return NextResponse.json(candidates);
    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}

export async function POST(request: NextRequest) {
    let body: CreateCandidateDTO;

    try {
        body = (await request.json()) as CreateCandidateDTO;
    } catch {
        return NextResponse.json(
            { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
            { status: 400 },
        );
    }

    try {
        const validation = CreateCandidateSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Validation error",
                    issues: validation.error.issues.map(issue => ({
                        field: issue.path[0],
                        message: issue.message,
                    })),
                },
            })
        }

        const candidate = await createCandidateUseCase.execute(validation.data);

        return NextResponse.json({
                id: candidate.id,
                message: "Candidato creado satisfactoriamente",
            },
            { status: 201 });

    } catch (error) {
        return HttpErrorMapper.toResponse(error);
    }
}
