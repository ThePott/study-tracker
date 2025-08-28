export const isBetween = (check: number, boundary: number[]) => {
    if (boundary.length === 0) {
        return false
    }
    
    const ceil = Math.max(...boundary)
    const floor = Math.min(...boundary)
    return check >= floor && check <= ceil
}
