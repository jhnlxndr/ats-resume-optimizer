import {
    Achievement,
    Education,
    Experience,
    Language,
    Project,
    Reference,
    Responsibility,
    ResumeBase,
    ResumeBaseSkill,
} from "@/domain/entities";
import {
    Achievement as PrismaAchievement,
    Candidate as PrismaCandidate,
    Education as PrismaEducation,
    Experience as PrismaExperience,
    Language as PrismaLanguage,
    Prisma,
    Project as PrismaProject,
    Reference as PrismaReference,
    Responsibility as PrismaResponsibility,
    ResumeBase as PrismaResumeBase,
    ResumeBaseSkill as PrismaResumeBaseSkill,
    Skill as PrismaSkill,
} from "@/generated/prisma/client";
import { CandidateMapper } from "@/infrastructure/database/prisma/mappers/CandidateMapper";
import { SkillMapper } from "@/infrastructure/database/prisma/mappers/SkillMapper";

type PrismaExperienceWithResponsibilities = PrismaExperience & {
    responsibilities?: PrismaResponsibility[],
};

type PrismaProjectWithAchievements = PrismaProject & {
    achievements?: PrismaAchievement[],
};

type PrismaResumeBaseSkillWithSkill = PrismaResumeBaseSkill & {
    skill?: PrismaSkill,
};

type PrismaResumeBaseWithRelations = PrismaResumeBase & {
    candidate?: PrismaCandidate,
    educations?: PrismaEducation[],
    experiences?: PrismaExperienceWithResponsibilities[],
    languages?: PrismaLanguage[],
    projects?: PrismaProjectWithAchievements[],
    references?: PrismaReference[],
    skills?: PrismaResumeBaseSkillWithSkill[],
};

export class ResumeBaseMapper {
    static toDomain(data: PrismaResumeBaseWithRelations): ResumeBase {
        const resumeBase = ResumeBase.create({
            id: data.id,
            candidateId: data.candidateId,
            candidate: data.candidate ? CandidateMapper.toDomain(data.candidate) : undefined,
            profession: data.profession,
            aboutMe: data.aboutMe ?? undefined,
            professionalProfile: data.professionalProfile,
            salaryAspiration: data.salaryAspiration,
            salaryCurrency: data.salaryCurrency,
        });

        resumeBase.educations = data.educations?.map((education) => new Education(
            {
                academy: education.academy,
                description: education.description,
                finishDate: education.finishDate,
                isCurrent: education.isCurrent,
                linkCredential: education.linkCredential,
                resumeBase: resumeBase,
                resumeBaseId: education.resumeBaseId,
                startDate: education.startDate,
                title: education.title,
                type: education.type,
                id: education.id
            })) ?? [];

        resumeBase.experiences = data.experiences?.map((experience) => {
            const experienceEntity = new Experience(
                {
                    company: experience.company,
                    finishDate: experience.finishDate,
                    id: experience.id,
                    position: experience.position,
                    resumeBase: resumeBase,
                    resumeBaseId: experience.resumeBaseId,
                    startDate: experience.startDate
                }
            );

            experienceEntity.responsibilities =
                experience.responsibilities?.map((responsibility) =>
                    new Responsibility(
                        {
                            description: responsibility.description,
                            experience: experienceEntity,
                            experienceId: responsibility.experienceId,
                            id: responsibility.id,
                        }
                    )) ?? [];

            return experienceEntity;
        }) ?? [];

        resumeBase.projects = data.projects?.map((project) => {
            const projectEntity = new Project(
                {
                    resumeBase: resumeBase,
                    resumeBaseId: project.resumeBaseId,
                    role: project.role,
                    title: project.title,
                    achievements: []
                }
            );

            projectEntity.achievements =
                project.achievements?.map((achievement) =>
                    new Achievement(
                        {
                            description: achievement.description,
                            evidence: achievement.evidence,
                            id: achievement.id,
                            metric: achievement.metric,
                            project: projectEntity,
                            projectId: achievement.projectId

                        }
                    )) ?? [];

            return projectEntity;
        }) ?? [];

        resumeBase.languages = data.languages?.map((language) =>
            new Language(
                {
                    academy: language.academy,
                    evidence: language.evidence,
                    id: language.id,
                    level: language.level,
                    resumeBase: resumeBase,
                    resumeBaseId: language.resumeBaseId,
                    title: language.title,
                }
            )) ?? [];

        resumeBase.references = data.references?.map((reference) =>
            new Reference(
                {
                    id: reference.id,
                    companyOrProject: reference.companyOrProject,
                    fullName: reference.fullName,
                    phone: reference.phone,
                    resumeBaseId: reference.resumeBaseId,
                    resumeBase: resumeBase
                }
            )) ?? [];

        resumeBase.skills = data.skills?.map((skill) =>
            new ResumeBaseSkill(
                {
                    evidence: skill.evidence,
                    id: skill.id,
                    level: skill.level,
                    resumeBase: resumeBase,
                    resumeBaseId: skill.resumeBaseId,
                    skill: skill.skill ? SkillMapper.toDomain(skill.skill) : undefined,
                    skillId: skill.skillId,
                    yearsExperience: skill.yearsExperience
                }
            )) ?? [];

        return resumeBase;
    }

    static toPersistence(resumeBase: ResumeBase): Prisma.ResumeBaseUncheckedCreateInput {
        return {
            id: resumeBase.id,
            candidateId: resumeBase.candidateId,
            profession: resumeBase.profession,
            aboutMe: resumeBase.aboutMe,
            professionalProfile: resumeBase.professionalProfile,
            salaryAspiration: resumeBase.salaryAspiration,
            salaryCurrency: resumeBase.salaryCurrency,
            educations: resumeBase.educations?.length ? {
                create: resumeBase.educations.map((education) => ({
                    id: education.id,
                    type: education.type,
                    title: education.title,
                    description: education.description,
                    academy: education.academy,
                    linkCredential: education.linkCredential,
                    startDate: education.startDate,
                    finishDate: education.finishDate,
                    isCurrent: education.isCurrent,
                })),
            } : undefined,
            experiences: resumeBase.experiences?.length ? {
                create: resumeBase.experiences.map((experience) => ({
                    id: experience.id,
                    startDate: experience.startDate,
                    finishDate: experience.finishDate,
                    company: experience.company,
                    position: experience.position,
                    responsibilities: experience.responsibilities?.length ? {
                        create: experience.responsibilities.map((responsibility) => ({
                            id: responsibility.id,
                            description: responsibility.description,
                        })),
                    } : undefined,
                })),
            } : undefined,
            projects: resumeBase.projects?.length ? {
                create: resumeBase.projects.map((project) => ({
                    id: project.id,
                    title: project.title,
                    role: project.role,
                    achievements: project.achievements?.length ? {
                        create: project.achievements.map((achievement) => ({
                            id: achievement.id,
                            description: achievement.description,
                            metric: achievement.metric,
                            evidence: achievement.evidence,
                        })),
                    } : undefined,
                })),
            } : undefined,
            languages: resumeBase.languages?.length ? {
                create: resumeBase.languages.map((language) => ({
                    id: language.id,
                    title: language.title,
                    level: language.level,
                    academy: language.academy,
                    evidence: language.evidence,
                })),
            } : undefined,
            references: resumeBase.references?.length ? {
                create: resumeBase.references.map((reference) => ({
                    id: reference.id,
                    fullName: reference.fullName,
                    phone: reference.phone,
                    companyOrProject: reference.companyOrProject,
                })),
            } : undefined,
            skills: resumeBase.skills?.length ? {
                create: resumeBase.skills.map((skill) => ({
                    id: skill.id,
                    skillId: skill.skillId,
                    level: skill.level,
                    yearsExperience: skill.yearsExperience,
                    evidence: skill.evidence,
                })),
            } : undefined,
        };
    }
}
