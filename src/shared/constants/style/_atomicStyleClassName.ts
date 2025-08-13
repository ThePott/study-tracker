export const colorClassName = {
    borderVivid: "transition border-1 border-black/30 dark:border-white/30",
    borderMuted: "transition border-1 border-black/10 dark:border-white/10",

    borderMutedHover: "hover:border-black/30 dark:hover:border-white/30",


    fontVivid: "text-black/90 dark:text-white/90",
    fontMuted: "text-black/60 dark:text-white/60",
    fontVividInverted: "text-white/90 dark:text-black/90",

    bg: "bg-white dark:bg-black",
    bgInverted: "bg-black dark:bg-white",
    bgMuted: "bg-black/5 dark:bg-white/5",
    bgNeutral: "transition bg-black/75 hover:bg-black/60 active:bg-black/45 dark:bg-white/70 dark:hover:bg-white/75 dark:active:bg-white/80",

    bgYellow: "bg-yellow-in-light dark:bg-yellow-in-dark",
    bgBlue: "bg-blue-in-light dark:bg-blue-in-dark",
    bgGray: "bg-zinc-300 dark:bg-zinc-900",
}

export const fontClassName = {
    fontSuper: "text-4xl font-semibold",
    fontTitle: "text-2xl font-semilbold",
    fontAccent: "text-xl font-semibold",
    fontJustBold: "font-semibold"
}

export const displayClassName = {
    flex: "flex gap-3",
    flexWide: "flex gap-6",
    flexCol: "flex flex-col gap-3",
    memoGrid: "grid-cols-[repeat(3,300px)]",
    center: "flex justify-center items-center"
}

export const paddingMarginClassName = {
    pTight: "py-1 px-3",
    pAll: "p-3",
    px: "px-3",
    pExceptB: "pt-3 px-3"
}

export const sizeClassName = {
    fullScreen: "w-screen h-screen overflow-hidden pt-3 px-3",
    flex1Fixed: "flex-1 overflow-hidden ",
    flex1YScroll: "flex-1 overflow-x-hidden overflow-y-scroll",

    grow: "grow",

    memoWidth: "w-[300px]",
    memoHeight: "h-[200px]",
    siebarWidth: "w-[132px]",
}

export const shapeClassName = {
    rounded: "rounded-md",
    roundedFull: "rounded-full",
}

/** 얘는 위의 것들 사용함. 위에는 아래 것을 사용 못 함 */
const vividButtonColorBase = `${paddingMarginClassName.pTight} transition rounded-full border-1`
const vividButtonColorOff = `${vividButtonColorBase} ${colorClassName.fontVivid} 
border--black/0 hover:border-black/30 active:bg-black/30
dark:border-white/0 dark:hover:border-white/30 dark:active:bg-white/30`
const vividButtonColorOn = `${vividButtonColorBase} ${colorClassName.fontVividInverted} ${colorClassName.bgInverted}`

export const boxClassName = {
    button: `${paddingMarginClassName.pTight} transition border-1`,
    
    buttonNeutral: `${shapeClassName.rounded} ${fontClassName.fontJustBold}`,
    buttonNeutralOn: `${colorClassName.fontVividInverted}  ${colorClassName.bgNeutral}`,
    buttonNeutralOff: `${colorClassName.borderMuted} ${colorClassName.borderMutedHover}`,
    
    buttonRounded: ``,
    buttonPill: ``,

    buttonVividPillOff: `${vividButtonColorOff} `,
    buttonVividPillOn: `${vividButtonColorOn} `,

    groupByBorder: `${paddingMarginClassName.pAll} ${colorClassName.borderMuted} ${displayClassName.flexCol} ${shapeClassName.rounded}`
}

export const sx = {
    scrollbar: {
        scrollbarColor: "oklch(0.5 0 0 ) transparent"
    }
}