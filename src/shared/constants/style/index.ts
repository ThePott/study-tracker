import {
    displayClassName,
    shapeClassName,
    colorClassName,
    fontClassName,
    boxClassName,
    sizeClassName,
    paddingMarginClassName,
} from "./_atomicStyleClassName"

export const styleClassName = {
    ...colorClassName,
    ...fontClassName,
    ...displayClassName,
    ...sizeClassName,
    ...shapeClassName,
    ...boxClassName,
    ...paddingMarginClassName,
}

export const scrollbarStyle = { scrollbarColor: "oklch(0.5 0 0) transparent" }
