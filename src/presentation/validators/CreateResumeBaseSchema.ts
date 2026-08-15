import zod from "zod";

const EducationTypeSchema = zod.enum(['Academic', 'Course', 'Bootcamp', 'Certification']);
const LanguageLevelSchema = zod.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']);

const CreateEducationSchema = zod.object({
    type: EducationTypeSchema,
    title: zod.string('El título es requisito').trim().min(1),
    description: zod.string().trim().optional(),
    academy: zod.string('La academia es requisito').trim().min(1),
    linkCredential: zod.url('Formato no válido para el link de la credencial').trim().optional(),
    startDate: zod.coerce.date(),
    finishDate: zod.coerce.date().optional(),
    isCurrent: zod.boolean(),
});

const CreateResponsibilitySchema = zod.object({
    description: zod.string('La descripción es requisito').trim().min(1),
});

const CreateExperienceSchema = zod.object({
    startDate: zod.coerce.date(),
    finishDate: zod.coerce.date().optional(),
    company: zod.string('La empresa es requisito').trim().min(1),
    position: zod.string('El cargo es requisito').trim().min(1),
    responsibilities: zod.array(CreateResponsibilitySchema).optional(),
});

const CreateAchievementSchema = zod.object({
    description: zod.string('La descripción es requisito').trim().min(1),
    metric: zod.string().trim().optional(),
    evidence: zod.string('La evidencia es requisito').trim().min(1),
});

const CreateProjectSchema = zod.object({
    title: zod.string('El título es requisito').trim().min(1),
    role: zod.string('El rol es requisito').trim().min(1),
    achievements: zod.array(CreateAchievementSchema).optional(),
});

const CreateLanguageSchema = zod.object({
    title: zod.string('El idioma es requisito').trim().min(1),
    level: LanguageLevelSchema,
    academy: zod.string('La academia es requisito').trim().min(1),
    evidence: zod.string().trim().optional(),
});

const CreateReferenceSchema = zod.object({
    fullName: zod.string('El nombre es requisito').trim().min(1),
    phone: zod
        .string('El teléfono es requisito')
        .trim()
        .min(10, 'Mínimo de 10 caracteres')
        .max(15, 'Máximo de 15 caracteres'),
    companyOrProject: zod.string('La empresa o proyecto es requisito').trim().min(1),
});

const CreateResumeBaseSkillSchema = zod.object({
    skillId: zod.uuid('El id de la habilidad no es válido'),
    level: zod.string().trim().optional(),
    yearsExperience: zod.number().min(0).optional(),
    evidence: zod.string().trim().optional(),
});

export const CreateResumeBaseSchema = zod.object({
    candidateId: zod.uuid('El id del candidato no es válido'),
    profession: zod.string('La profesión es requisito').trim().min(1),
    aboutMe: zod.string().trim().optional(),
    professionalProfile: zod.string().trim().optional(),
    salaryAspiration: zod.number('La aspiración salarial es requisito').min(0),
    salaryCurrency: zod
        .string('La moneda es requisito')
        .trim()
        .length(3, 'Debe ser un código de moneda de 3 letras (p. ej. USD)'),
    educations: zod.array(CreateEducationSchema).optional(),
    experiences: zod.array(CreateExperienceSchema).optional(),
    projects: zod.array(CreateProjectSchema).optional(),
    languages: zod.array(CreateLanguageSchema).optional(),
    references: zod.array(CreateReferenceSchema).optional(),
    skills: zod.array(CreateResumeBaseSkillSchema).optional(),
});
