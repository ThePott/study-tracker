import { CheckboxStatus } from "@/src/shared/interfaces/_reviewCheckInterfaces"
import useBoundStore from "@/src/shared/store";
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
    const changeTo = useBoundStore((state) => state.changeTo)
    const setChangeTo = useBoundStore((state) => state.setChangeTo)

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