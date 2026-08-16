import { ResumeBase } from "@/domain/entities";
import type { ResumeBaseResponseDTO } from "@/presentation/dto/ResumeBaseResponseDTO";

/**
 * Los entities del dominio guardan referencias hacia su padre (p. ej.
 * Education.resumeBase), lo que forma un grafo circular. Serializar el
 * entity directamente con NextResponse.json() falla con "Converting
 * circular structure to JSON", por lo que esta capa de presentación aplana
 * el grafo a un DTO plano antes de responder al cliente.
 */
export class ResumeBaseResponseMapper {
    static toResponse(resumeBase: ResumeBase): ResumeBaseResponseDTO {
        return {
            id: resumeBase.id!,
            candidateId: resumeBase.candidateId,
            candidate: resumeBase.candidate ? {
                id: resumeBase.candidate.id!,
                fullName: resumeBase.candidate.fullName,
                email: resumeBase.candidate.email,
                phone: resumeBase.candidate.phone,
                secondaryPhone: resumeBase.candidate.secondaryPhone,
                city: resumeBase.candidate.city,
                country: resumeBase.candidate.country,
                portfolio: resumeBase.candidate.portfolio,
            } : undefined,
            profession: resumeBase.profession,
            aboutMe: resumeBase.aboutMe,
            professionalProfile: resumeBase.professionalProfile,
            salaryAspiration: resumeBase.salaryAspiration,
            salaryCurrency: resumeBase.salaryCurrency,
            educations: (resumeBase.educations ?? []).map((education) => ({
                id: education.id!,
                type: education.type,
                title: education.title,
                description: education.description,
                academy: education.academy,
                linkCredential: education.linkCredential,
                startDate: education.startDate,
                finishDate: education.finishDate,
                isCurrent: education.isCurrent,
            })),
            experiences: (resumeBase.experiences ?? []).map((experience) => ({
                id: experience.id!,
                startDate: experience.startDate,
                finishDate: experience.finishDate,
                company: experience.company,
                position: experience.position,
                responsibilities: (experience.responsibilities ?? []).map((responsibility) => ({
                    id: responsibility.id!,
                    description: responsibility.description,
                })),
            })),
            projects: (resumeBase.projects ?? []).map((project) => ({
                id: project.id!,
                title: project.title,
                role: project.role,
                achievements: (project.achievements ?? []).map((achievement) => ({
                    id: achievement.id!,
                    description: achievement.description,
                    metric: achievement.metric,
                    evidence: achievement.evidence,
                })),
            })),
            languages: (resumeBase.languages ?? []).map((language) => ({
                id: language.id!,
                title: language.title,
                level: language.level,
                academy: language.academy,
                evidence: language.evidence,
            })),
            references: (resumeBase.references ?? []).map((reference) => ({
                id: reference.id!,
                fullName: reference.fullName,
                phone: reference.phone,
                companyOrProject: reference.companyOrProject,
            })),
            skills: (resumeBase.skills ?? []).map((skill) => ({
                id: skill.id!,
                skillId: skill.skillId,
                name: skill.skill?.name,
                description: skill.skill?.description,
                category: skill.skill?.category,
                level: skill.level,
                yearsExperience: skill.yearsExperience,
                evidence: skill.evidence,
            })),
        };
    }
}
