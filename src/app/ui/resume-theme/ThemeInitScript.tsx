import {
    CV_DEFAULT_FONT,
    CV_DEFAULT_PALETTE,
    CV_FONTS,
    CV_FONT_STORAGE_KEY,
    CV_PALETTES,
    CV_PALETTE_STORAGE_KEY,
} from "./tokens";

export const CV_DOCUMENT_ID = "cv-document";

const validPaletteKeys = CV_PALETTES.map(palette => palette.key);
const validFontKeys = CV_FONTS.map(font => font.key);

// Se ejecuta de forma síncrona durante el parseo del HTML, antes de que React hidrate,
// para que el documento no "parpadee" con el tema por defecto y luego cambie al guardado.
const script = `(function () {
  try {
    var el = document.getElementById(${ JSON.stringify(CV_DOCUMENT_ID) });
    if (!el) return;
    var validPalettes = ${ JSON.stringify(validPaletteKeys) };
    var validFonts = ${ JSON.stringify(validFontKeys) };
    var palette = window.localStorage.getItem(${ JSON.stringify(CV_PALETTE_STORAGE_KEY) });
    var font = window.localStorage.getItem(${ JSON.stringify(CV_FONT_STORAGE_KEY) });
    el.setAttribute("data-cv-palette", validPalettes.indexOf(palette) !== -1 ? palette : ${ JSON.stringify(CV_DEFAULT_PALETTE) });
    el.setAttribute("data-cv-font", validFonts.indexOf(font) !== -1 ? font : ${ JSON.stringify(CV_DEFAULT_FONT) });
  } catch (e) {}
})();`;

export default function ThemeInitScript() {
    return <script dangerouslySetInnerHTML={ { __html: script } }/>;
}
