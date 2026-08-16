'use client'

import { useCallback, useSyncExternalStore } from "react";
import {
    CV_DEFAULT_FONT,
    CV_DEFAULT_PALETTE,
    CV_FONT_STORAGE_KEY,
    CV_PALETTE_STORAGE_KEY,
    type CvFontKey,
    type CvPaletteKey,
    isCvFontKey,
    isCvPaletteKey,
} from "./tokens";

// El navegador solo dispara el evento "storage" nativo en OTRAS pestañas. Al guardar la
// preferencia disparamos uno manualmente para que useSyncExternalStore también refresque
// esta misma pestaña, sin recurrir a un setState dentro de un efecto.
function notify() {
    window.dispatchEvent(new Event("cv-theme-change"));
}

function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener("cv-theme-change", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("cv-theme-change", callback);
    };
}

function getPaletteSnapshot(): CvPaletteKey {
    const stored = window.localStorage.getItem(CV_PALETTE_STORAGE_KEY);
    return isCvPaletteKey(stored) ? stored : CV_DEFAULT_PALETTE;
}

function getFontSnapshot(): CvFontKey {
    const stored = window.localStorage.getItem(CV_FONT_STORAGE_KEY);
    return isCvFontKey(stored) ? stored : CV_DEFAULT_FONT;
}

function getServerPaletteSnapshot(): CvPaletteKey {
    return CV_DEFAULT_PALETTE;
}

function getServerFontSnapshot(): CvFontKey {
    return CV_DEFAULT_FONT;
}

export function useResumeTheme() {
    const palette = useSyncExternalStore(subscribe, getPaletteSnapshot, getServerPaletteSnapshot);
    const font = useSyncExternalStore(subscribe, getFontSnapshot, getServerFontSnapshot);

    const setPalette = useCallback((next: CvPaletteKey) => {
        window.localStorage.setItem(CV_PALETTE_STORAGE_KEY, next);
        notify();
    }, []);

    const setFont = useCallback((next: CvFontKey) => {
        window.localStorage.setItem(CV_FONT_STORAGE_KEY, next);
        notify();
    }, []);

    return { palette, font, setPalette, setFont };
}
