import { CheckboxStatus } from "@/src/_interfaces/reviewCheckInterfaces"
import useReviewCheckStore from "@/src/_store/reviewCheckStore"
import { ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material"

const getSx = (changeTo: CheckboxStatus) => {
    const theme = useTheme();
    const textColor = theme.palette.primary.contrastText;

    switch (changeTo) {
        case "CORRECT":
            return {
                "&.Mui-selected": {
                    backgroundColor: "oklch(0.7 0.17 255.78)",
                    color: textColor,
                    "&:hover": {
                        backgroundColor: "oklch(0.6 0.17 255.78)",
                    }
                }
            }
        case "WRONG":
            return {
                "&.Mui-selected": {
                    backgroundColor: "oklch(0.7 0.17 31.06)",
                    color: textColor,
                    "&:hover": {
                        backgroundColor: "oklch(0.6 0.17 31.06)",
                    }
                }
            }
        case "DONE":
            return {
                "&.Mui-selected": {
                    backgroundColor: "oklch(0.7 0 0)",
                    color: textColor,
                    "&:hover": {
                        backgroundColor: "oklch(0.6 0 0)",
                    }
                }
            }
        case "PASS":
            return {
                fontWeight: 600,
                "&.Mui-selected": {
                    backgroundColor: "oklch(0.7 0.17 307.52)",
                    color: textColor,
                    "&:hover": {
                        backgroundColor: "oklch(0.6 0.17 307.52)",
                    }
                }
            }
        default:
            /** NOT_SOLVED */
            return undefined
    }
}

const ChangeToButtonGroup = () => {
    const changeTo = useReviewCheckStore((state) => state.changeTo)
    const setChangeTo = useReviewCheckStore((state) => state.setChangeTo)

    const handleChange = (_event: React.MouseEvent<HTMLElement>, value: CheckboxStatus) => {
        if (value === null) { return }
        setChangeTo(value)
    }

    return (
        <ToggleButtonGroup
            value={changeTo}
            exclusive
            onChange={handleChange}
            fullWidth>
            <ToggleButton
                sx={{fontWeight: 600, ...getSx("NOT_SOLVED")}}
                value={"NOT_SOLVED"} aria-label="NOT_SOLVED">NOT_SOLVED</ToggleButton>
            <ToggleButton
                sx={{fontWeight: 600, ...getSx("WRONG")}}
                value={"WRONG"} aria-label="WRONG">WRONG</ToggleButton>
            <ToggleButton
                sx={{fontWeight: 600, ...getSx("CORRECT")}}
                value={"CORRECT"} aria-label="CORRECT">CORRECT</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ChangeToButtonGroup