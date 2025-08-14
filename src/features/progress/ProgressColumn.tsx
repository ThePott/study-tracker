import { Progress } from '@/src/shared/interfaces'
import ProgressBox from './ProgressBox'
import { styleClassName } from '@/src/shared/constants/style'

const ProgressColumn = ({ bookTitle, progressArray }: { bookTitle: string, progressArray: Progress[] }) => {

    return (
        <div className="grow">
            <h2 className={`${styleClassName.fontSuper} ${styleClassName.fontVivid} p-3 bg-amber-300`}>{bookTitle}</h2>
            {progressArray.map((progress) => <ProgressBox key={progress.id} progress={progress} />)}
        </div>
    )
}

export default ProgressColumn