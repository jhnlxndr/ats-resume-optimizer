export type CvPaletteKey = "slate-blue" | "warm-graphite" | "teal-modern";
export type CvFontKey = "lato" | "source-sans" | "gelasio" | "eb-garamond";

export interface CvPalette {
    key: CvPaletteKey;
    name: string;
    recommendedFor: string;
    ink: string;
    inkSoft: string;
    accent: string;
    rule: string;
}

export interface CvFont {
    key: CvFontKey;
    name: string;
    type: "Sans" | "Serif";
    recommendedFor: string;
    /** Variable CSS que registra next/font/google en el layout raíz (ver layout.tsx). */
    cssVariable: string;
    /** Cadena de respaldo si la fuente web no carga o el PDF se genera sin acceso a ella. */
    fallback: string;
    /** Ajuste sumado al tamaño del cuerpo de texto para igualar el peso visual de las serif. */
    bodySizeAdjustPt: number;
}

export const CV_PALETTES: CvPalette[] = [
    {
        key: "slate-blue",
        name: "Azul institucional",
        recommendedFor: "Tecnología, finanzas, salud, administración",
        ink: "#1e293b",
        inkSoft: "#475569",
        accent: "#1e3a8a",
        rule: "#cbd5e1",
    },
    {
        key: "warm-graphite",
        name: "Grafito cálido",
        recommendedFor: "Oficios, construcción, logística, legal, contabilidad",
        ink: "#292524",
        inkSoft: "#57534e",
        accent: "#1c1917",
        rule: "#d6d3d1",
    },
    {
        key: "teal-modern",
        name: "Verde azulado",
        recommendedFor: "Startups, producto, salud, ambiental, agro",
        ink: "#1e293b",
        inkSoft: "#475569",
        accent: "#115e59",
        rule: "#cbd5e1",
    },
];

export const CV_FONTS: CvFont[] = [
    {
        key: "lato",
        name: "Lato",
        type: "Sans",
        recommendedFor: "Tecnología, startups, ingeniería",
        cssVariable: "--font-cv-lato",
        fallback: "Lato, Calibri, Carlito, Arial, sans-serif",
        bodySizeAdjustPt: 0,
    },
    {
        key: "source-sans",
        name: "Source Sans 3",
        type: "Sans",
        recommendedFor: "Universal, neutra, cualquier sector",
        cssVariable: "--font-cv-source-sans",
        fallback: '"Source Sans 3", Calibri, Carlito, Arial, sans-serif',
        bodySizeAdjustPt: 0,
    },
    {
        key: "gelasio",
        name: "Gelasio",
        type: "Serif",
        recommendedFor: "Finanzas, legal, administración pública",
        cssVariable: "--font-cv-gelasio",
        fallback: 'Gelasio, Georgia, "Times New Roman", serif',
        bodySizeAdjustPt: 0.3,
    },
    {
        key: "eb-garamond",
        name: "EB Garamond",
        type: "Serif",
        recommendedFor: "Academia, investigación, sector cultural",
        cssVariable: "--font-cv-eb-garamond",
        fallback: '"EB Garamond", Garamond, Georgia, serif',
        bodySizeAdjustPt: 0.3,
    },
];

export const CV_DEFAULT_PALETTE: CvPaletteKey = "slate-blue";
export const CV_DEFAULT_FONT: CvFontKey = "lato";

export const CV_PALETTE_STORAGE_KEY = "cv-palette";
export const CV_FONT_STORAGE_KEY = "cv-font";

export function isCvPaletteKey(value: string | null): value is CvPaletteKey {
    return CV_PALETTES.some(palette => palette.key === value);
}

export function isCvFontKey(value: string | null): value is CvFontKey {
    return CV_FONTS.some(font => font.key === value);
}
