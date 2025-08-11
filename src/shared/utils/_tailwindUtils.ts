export type FontVariant = "base" | "accent" | "title" | "super"

const fontSizeDict: Record<FontVariant, number> = {
    "base": 16,
    "accent": 20,
    "title": 24,
    "super": 36
}

/** MUST SYNC WITH fontConstant */
export const convertFontSizeToPixel = (fontVariant: FontVariant): number => {
    return fontSizeDict[fontVariant]
}