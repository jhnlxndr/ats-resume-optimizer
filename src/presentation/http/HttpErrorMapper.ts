import { NextResponse } from "next/server";
import { DomainError } from "@/domain/errors/DomainError";
import { NotFoundError } from "@/domain/errors/NotFoundError";
import { ConflictError } from "@/domain/errors/ConflictError";
import { ValidationError } from "@/domain/errors/ValidationError";

export interface ApiErrorBody {
    error: {
        code: string;
        message: string;
        issues?: { field: string; message: string }[];
    };
}

/**
 * The only place in this app that maps a DomainError to an HTTP status code.
 * Dispatch is by category (instanceof NotFoundError / ConflictError / ...),
 * not by ErrorCode, so adding a new resource-specific error (e.g. a future
 * ResumeNotFoundError) never requires touching this file — it just needs to
 * extend the right category base class.
 */
export class HttpErrorMapper {
    static toResponse(error: unknown): NextResponse<ApiErrorBody> {
        if (error instanceof ValidationError) {
            return HttpErrorMapper.build(400, error.code, error.message, error.issues);
        }

        if (error instanceof NotFoundError) {
            return HttpErrorMapper.build(404, error.code, error.message);
        }

        if (error instanceof ConflictError) {
            return HttpErrorMapper.build(409, error.code, error.message);
        }

        if (error instanceof DomainError) {
            console.error(error);
            return HttpErrorMapper.build(500, error.code, "An unexpected error occurred");
        }

        console.error(error);
        return HttpErrorMapper.build(500, "INTERNAL_ERROR", "An unexpected error occurred");
    }

    private static build(
        status: number,
        code: string,
        message: string,
        issues?: { field: string; message: string }[],
    ): NextResponse<ApiErrorBody> {
        return NextResponse.json(
            { error: { code, message, ...(issues ? { issues } : {}) } },
            { status },
        );
    }
}
