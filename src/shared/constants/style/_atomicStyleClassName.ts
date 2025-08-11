export const colorClassName = {
    borderVivid: "border-1 border-black/30 dark:border-white/30 ",
    borderMuted: "border-1 border-black/10 dark:border-white/10",

    fontVivid: "text-black/90 dark:text-white/90",
    fontMuted: "text-black/60 dark:text-white/60",
    fontVividInverted: "text-white/90 dark:text-black/90",

    bg: "bg-white dark:bg-black",
    bgMuted: "bg-black/5 dark:bg-white/5",
    bgNeutral: "transition bg-black/75 hover:bg-black/60 active:bg-black/45 dark:bg-white/75 dark:hover:bg-white/60 dark:active:bg-white/45",

    bgYellow: "bg-yellow-in-light dark:bg-yellow-in-dark",
    bgBlue: "bg-blue-in-light dark:bg-blue-in-dark",
    bgGray: "bg-zinc-300 dark:bg-zinc-900",
}

export const fontClassName = {
    fontSuper: "text-4xl font-semibold",
    fontTitle: "text-2xl font-semilbold",
    fontAccent: "text-xl font-semibold",
    fontJustBold: "font-medium"
}

export const displayClassName = {
    flexCol: "flex flex-col gap-3",
    memoGrid: "grid-cols-[repeat(3,300px)]",
}

export const sizeClassName = {
    fullScreen: "w-screen h-screen overflow-hidden",
    
    memoWidth: "w-[300px]",
    memoHeight: "h-[200px]",
}

export const shapeClassName = {
    rounded: "rounded-md",
}

/** 얘는 위의 것들 사용함. 위에는 아래 것을 사용 못 함 */
export const boxClassName = {
    button: `py-2 px-3 ${shapeClassName.rounded} border-1 ${colorClassName.fontVividInverted} ${colorClassName.bgNeutral} ${fontClassName.fontAccent} border-black/15 bg-black/5 hover:border-black/30 hover:bg-black/10 active:border-black/45`,
    groupByBorder: `p-3 ${colorClassName.borderMuted} ${displayClassName.flexCol} ${shapeClassName.rounded}`
}

export const sx = {
    scrollbar: {
        scrollbarColor: "oklch(0.5 0 0 ) transparent"
    }
}