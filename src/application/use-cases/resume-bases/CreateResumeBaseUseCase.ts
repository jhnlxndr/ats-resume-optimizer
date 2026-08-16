import { CreateResumeBaseDTO } from "@/application/dto/CreateResumeBaseDTO";
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
import { CandidateNotFoundError } from "@/domain/errors/CandidateNotFoundError";
import { ResumeBaseAlreadyExistsError } from "@/domain/errors/ResumeBaseAlreadyExistsError";
import { CandidateRepository } from "@/domain/repositories/CandidateRepository";
import { ResumeBaseRepository } from "@/domain/repositories/ResumeBaseRepository";

export class CreateResumeBaseUseCase {
    constructor(
        private readonly resumeBaseRepository: ResumeBaseRepository,
        private readonly candidateRepository: CandidateRepository,
    ) {
    }

    async execute(data: CreateResumeBaseDTO): Promise<ResumeBase> {
        // Validamos que el candidato exista.
        const candidate = await this.candidateRepository.findById(data.candidateId);

        if (!candidate) {
            throw new CandidateNotFoundError(data.candidateId);
        }

        // Ahora validamos si ya existe un registro (hoja de vida) con el mismo candidato.
        const existingResumeBase = await this.resumeBaseRepository.findByCandidateId(data.candidateId);

        if (existingResumeBase) {
            // Si existe, lanzamos un error.
            throw new ResumeBaseAlreadyExistsError(candidate.email);
        }

        // Una vez validados los datos, creamos el registro (hoja de vida).
        const resumeBase = ResumeBase.create({
            candidateId: data.candidateId,
            candidate,
            profession: data.profession,
            aboutMe: data.aboutMe,
            professionalProfile: data.professionalProfile,
            salaryAspiration: data.salaryAspiration,
            salaryCurrency: data.salaryCurrency,
        });

        // Una vez creado el registro, se asignan los valores de los campos relacionados.
        // Si los tiene, relacionamos los datos académicos con el registro (hoja de vida).
        resumeBase.educations = data.educations?.map((education) => new Education({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            type: education.type,
            title: education.title,
            academy: education.academy,
            startDate: education.startDate,
            isCurrent: education.isCurrent,
            description: education.description,
            linkCredential: education.linkCredential,
            finishDate: education.finishDate,
        }));

        // Si los tiene, relacionamos la experiencia laboral con el registro (hoja de vida).
        resumeBase.experiences = data.experiences?.map((experience) => {
            const experienceEntity = new Experience({
                resumeBase,
                resumeBaseId: resumeBase.id!,
                startDate: experience.startDate,
                company: experience.company,
                position: experience.position,
                finishDate: experience.finishDate,
            });

            // Relacionamos las responsabilidades con la experiencia laboral.
            experienceEntity.responsibilities = experience.responsibilities?.map((responsibility) => new Responsibility({
                experience: experienceEntity,
                experienceId: experienceEntity.id!,
                description: responsibility.description,
            }));

            return experienceEntity;
        });

        // Si los tiene, relacionamos los proyectos con el registro (hoja de vida).
        resumeBase.projects = data.projects?.map((project) => {
            const projectEntity = new Project({
                resumeBase,
                resumeBaseId: resumeBase.id!,
                title: project.title,
                role: project.role,
                achievements: [],
            });

            // Si los tiene, relacionamos los logros con el proyecto.
            projectEntity.achievements = project.achievements?.map((achievement) => new Achievement({
                project: projectEntity,
                projectId: projectEntity.id!,
                description: achievement.description,
                evidence: achievement.evidence,
                metric: achievement.metric,
            })) ?? [];

            return projectEntity;
        });

        // Si los tiene, relacionamos los idiomas con el registro (hoja de vida).
        resumeBase.languages = data.languages?.map((language) => new Language({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            title: language.title,
            level: language.level,
            academy: language.academy,
            evidence: language.evidence,
        }));

        // Si los tiene, relacionamos las referencias con el registro (hoja de vida).
        resumeBase.references = data.references?.map((reference) => new Reference({
            resumeBase,
            resumeBaseId: resumeBase.id!,
            fullName: reference.fullName,
            phone: reference.phone,
            companyOrProject: reference.companyOrProject,
        }));

        // Si los tiene, relacionamos las habilidades con el registro (hoja de vida).
        resumeBase.skills = data.skills?.map((skill) => new ResumeBaseSkill({
            resumeBaseId: resumeBase.id!,
            skillId: skill.skillId,
            resumeBase,
            skill: null,
            level: skill.level,
            yearsExperience: skill.yearsExperience,
            evidence: skill.evidence,
        }));

        // Finalmente, guardamos el registro (hoja de vida) en la base de datos.
        return await this.resumeBaseRepository.save(resumeBase);
    }
}
