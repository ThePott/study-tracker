import { Progress } from '@/src/shared/interfaces'
import ProgressBox from './ProgressBox'

const ProgressColumn = ({ progressArray }: { progressArray: Progress[] }) => {
    return (
        <div className="grow">
            {progressArray.map((progress) => <ProgressBox key={progress.id} progress={progress} />)}
        </div>
    )
}

export default ProgressColumn