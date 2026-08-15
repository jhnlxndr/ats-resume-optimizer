'use client'

import { useRef } from "react";
import { CV_FONTS, CV_PALETTES, type CvFontKey, type CvPaletteKey } from "./tokens";

interface ResumeThemeControlsProps {
    palette: CvPaletteKey;
    font: CvFontKey;
    onPaletteChange: (palette: CvPaletteKey) => void;
    onFontChange: (font: CvFontKey) => void;
}

function nextRadioIndex(event: React.KeyboardEvent, currentIndex: number, length: number): number | null {
    switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
            event.preventDefault();
            return (currentIndex + 1) % length;
        case "ArrowLeft":
        case "ArrowUp":
            event.preventDefault();
            return (currentIndex - 1 + length) % length;
        case "Home":
            event.preventDefault();
            return 0;
        case "End":
            event.preventDefault();
            return length - 1;
        default:
            return null;
    }
}

export default function ResumeThemeControls(
    { palette, font, onPaletteChange, onFontChange }: ResumeThemeControlsProps,
) {
    const paletteRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const fontRefs = useRef<(HTMLButtonElement | null)[]>([]);

    function handlePaletteKeyDown(event: React.KeyboardEvent, index: number) {
        const nextIndex = nextRadioIndex(event, index, CV_PALETTES.length);
        if (nextIndex === null) return;
        onPaletteChange(CV_PALETTES[nextIndex].key);
        paletteRefs.current[nextIndex]?.focus();
    }

    function handleFontKeyDown(event: React.KeyboardEvent, index: number) {
        const nextIndex = nextRadioIndex(event, index, CV_FONTS.length);
        if (nextIndex === null) return;
        onFontChange(CV_FONTS[nextIndex].key);
        fontRefs.current[nextIndex]?.focus();
    }

    return (
        <div className="flex flex-col gap-4 print:hidden">
            <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">Paleta de color</p>
                <div
                    role="radiogroup"
                    aria-label="Paleta de color de la hoja de vida"
                    className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                    { CV_PALETTES.map((item, index) => {
                        const checked = item.key === palette;

                        return (
                            <button
                                key={ item.key }
                                ref={ el => { paletteRefs.current[index] = el; } }
                                type="button"
                                role="radio"
                                aria-checked={ checked }
                                tabIndex={ checked ? 0 : -1 }
                                onClick={ () => onPaletteChange(item.key) }
                                onKeyDown={ event => handlePaletteKeyDown(event, index) }
                                className={ `flex flex-col gap-1.5 rounded-md border p-2.5 text-left transition-colors ${
                                    checked ? "border-indigo-600 ring-1 ring-indigo-600" : "border-gray-200 hover:border-gray-300"
                                }` }
                            >
                                <span className="flex gap-1">
                                    <span aria-hidden="true" className="size-4 rounded-sm" style={ { backgroundColor: item.ink } }/>
                                    <span aria-hidden="true" className="size-4 rounded-sm" style={ { backgroundColor: item.inkSoft } }/>
                                    <span aria-hidden="true" className="size-4 rounded-sm" style={ { backgroundColor: item.accent } }/>
                                    <span
                                        aria-hidden="true"
                                        className="size-4 rounded-sm border border-gray-300"
                                        style={ { backgroundColor: item.rule } }
                                    />
                                </span>
                                <span className="text-sm font-medium text-gray-900">{ item.name }</span>
                                <span className="text-xs text-gray-500">Recomendada para: { item.recommendedFor }</span>
                            </button>
                        );
                    }) }
                </div>
            </div>

            <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">Tipografía</p>
                <div
                    role="radiogroup"
                    aria-label="Tipografía de la hoja de vida"
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                    { CV_FONTS.map((item, index) => {
                        const checked = item.key === font;

                        return (
                            <button
                                key={ item.key }
                                ref={ el => { fontRefs.current[index] = el; } }
                                type="button"
                                role="radio"
                                aria-checked={ checked }
                                tabIndex={ checked ? 0 : -1 }
                                onClick={ () => onFontChange(item.key) }
                                onKeyDown={ event => handleFontKeyDown(event, index) }
                                style={ { fontFamily: `var(${ item.cssVariable }), ${ item.fallback }` } }
                                className={ `flex flex-col gap-1 rounded-md border p-2.5 text-left transition-colors ${
                                    checked ? "border-indigo-600 ring-1 ring-indigo-600" : "border-gray-200 hover:border-gray-300"
                                }` }
                            >
                                <span className="text-base text-gray-900">{ item.name }</span>
                                <span className="text-xs text-gray-500">{ item.type } · Recomendada para: { item.recommendedFor }</span>
                            </button>
                        );
                    }) }
                </div>
            </div>
        </div>
    );
}
