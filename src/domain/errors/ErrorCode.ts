export const ErrorCode = {
    // --- Categorías de negocio, compartidas por cualquier entidad ---
    /**
     * El recurso solicitado no existe (código por defecto de NotFoundError).
     * Qué entidad falta se distingue por el `message`, no por el código — si algún
     * caso puntual necesita un código propio (p. ej. para que el cliente lo
     * distinga sin parsear el mensaje), se agrega aquí y se sobrescribe `code`
     * en esa subclase específica.
     */
    NOT_FOUND: "NOT_FOUND",
    /**
     * La solicitud entra en conflicto con el estado actual de un recurso, p. ej.
     * una violación de unicidad de negocio (código por defecto de ConflictError).
     * Misma lógica que NOT_FOUND: el detalle va en el mensaje, salvo que una
     * subclase concreta decida que amerita su propio código.
     */
    CONFLICT: "CONFLICT",

    // --- Invariantes de dominio, aplican a cualquier entidad ---
    /** Los datos de entrada no cumplen las invariantes de la entidad (campos requeridos, formato, etc.). */
    VALIDATION_ERROR: "VALIDATION_ERROR",

    // --- Fallos técnicos, sin significado de negocio ---
    /** La operación de persistencia falló por una causa técnica (conexión, constraint no mapeado, etc.). */
    DATABASE_ERROR: "DATABASE_ERROR",
    /** Fallo no clasificado que no encaja en ninguna categoría anterior. */
    INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode =
    typeof ErrorCode[keyof typeof ErrorCode];