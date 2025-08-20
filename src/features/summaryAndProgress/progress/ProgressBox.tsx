import MemoCard from '@/src/shared/components/MemoCard';
import { styleClassName } from '@/src/shared/constants/style';
import { Progress } from '@/src/shared/interfaces/_progressInterfaces';
import useBoundStore from '@/src/shared/store';
import { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const bgClassNameDict = {
  "NOT_STARTED": `${styleClassName.borderVivid} ${styleClassName.bgGray}`,
  "IN_PROGRESS": `${styleClassName.borderVivid} ${styleClassName.bgYellow}`,
  "COMPLETED": `${styleClassName.borderMuted}  opacity-60`,
}
const plainFontClassNameDict = {
  "NOT_STARTED": `${styleClassName.fontMuted}`,
  "IN_PROGRESS": `${styleClassName.fontMutedInverted}`,
  "COMPLETED": `${styleClassName.fontMuted}`,
}
const accentFontClassNameDict = {
  "NOT_STARTED": `${styleClassName.fontVivid}`,
  "IN_PROGRESS": `${styleClassName.fontVividInverted}`,
  "COMPLETED": `${styleClassName.fontVivid}`,
}

const completedInKorean = {
  "NOT_STARTED": "아직",
  "IN_PROGRESS": "진행 중",
  "COMPLETED": "완료",
}

const ProgressBox = memo(({ progress }: { progress: Progress }) => {
  const changeCompleted = useBoundStore((state) => state.changeCompleted)

  const handleClick = () => {
    changeCompleted(progress)
  }

  const memoBaseClassName = `${styleClassName.pTight} flex flex-col`
  const memoClassName = `${memoBaseClassName} ${bgClassNameDict[progress.completed]}`

  return (
    <MemoCard onClick={handleClick} className={memoClassName}>
      <p className={`break-keep ${plainFontClassNameDict[progress.completed]}`}>{progress.stepTitle}</p>
      <div className="flex justify-between">
        <p className={`break-keep ${styleClassName.fontJustBold} ${accentFontClassNameDict[progress.completed]}`}>{progress.questionGroupDescription}</p>
        {progress.completed !== "NOT_STARTED" && <p className={`self-end ${plainFontClassNameDict[progress.completed]}`}>{completedInKorean[progress.completed]}</p>}
      </div>
    </MemoCard>
  )
})


export default ProgressBox