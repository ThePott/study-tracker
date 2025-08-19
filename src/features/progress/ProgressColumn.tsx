import { Progress } from '@/src/shared/interfaces'
import ProgressBox from './ProgressBox'
import { styleClassName } from '@/src/shared/constants/style'

const ProgressColumn = ({ bookTitle, progressArray }: { bookTitle: string, progressArray: Progress[] }) => {
    const groupedProgressArray = Object.groupBy(progressArray, ({ topicTitle }) => topicTitle)
    const groupedEntryArray = Object.entries(groupedProgressArray)
    groupedEntryArray.sort((a, b) => a[0].localeCompare(b[0]))

    return (
        <div className={`${styleClassName.memoWidth} flex flex-col gap-3`}>
            <h2 className={`${styleClassName.fontVivid} text-center ${styleClassName.fontJustBold}`}>{bookTitle}</h2>
            {groupedEntryArray.map((entry) => (
                <div key={`${entry[0]}`} className="flex flex-col gap-2">
                    <h2 className={`${styleClassName.fontMuted} `}>{entry[0]}</h2>
                    {entry[1].map((progress) => <ProgressBox key={progress.id} progress={progress} />)}
                </div>
            ))}
        </div>
    )
}

export default ProgressColumn