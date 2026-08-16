import zod from "zod";

export const CreateCandidateSchema = zod.object({
    fullName: zod
        .string('Nombre debe tener como mínimo un carácter')
        .trim()
        .min(1),
    email: zod
        .email('Formato de correo electrónico no válido')
        .trim(),
    phone: zod
        .string('El teléfono principal es requisito')
        .trim()
        .min(10, 'Mínimo de 10 caracteres')
        .max(15, 'Máximo de 15 caracteres'),
    secondaryPhone: zod
        .string()
        .trim()
        .min(10, 'Mínimo de 10 caracteres')
        .max(15, 'Máximo de 15 caracteres')
        .optional(),
    city: zod
        .string('La ciudad es requisito')
        .trim()
        .min(2, 'Mínimo de 2 caracteres'),
    country: zod
        .string('El país es requisito')
        .trim()
        .min(2, 'Mínino de 2 caracteres'),
    portfolio: zod
        .url('Formato no válido para el portafolio')
        .trim()
        .optional()
        .or(zod.literal('')),
})