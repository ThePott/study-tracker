import { ReviewCheckData } from "../../_interfaces/interfaces"

const checkboxStatusArray = ["DONE", "PASS", "WRONG", "CORRECT", "NOT_SOLVED"] as const;

interface HandleClickParams {
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>,
}

/**
 * index는 이런 의미다
 * reviewCheckData는 이런 의미다
 */
interface CheckboxProps {
    index: number;
    reviewCheckData: ReviewCheckData;
    status: typeof checkboxStatusArray[number];
    setRecentTwoIndexes: React.Dispatch<React.SetStateAction<number[]>>;
}

export { checkboxStatusArray, HandleClickParams, CheckboxProps }