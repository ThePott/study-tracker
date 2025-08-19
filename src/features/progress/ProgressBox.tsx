import MemoCard from '@/src/shared/components/MemoCard';
import { styleClassName } from '@/src/shared/constants/style';
import { Progress } from '@/src/shared/interfaces/_progressInterfaces';
import useBoundStore from '@/src/shared/store';
import { memo } from 'react';
// 기능이 더 구현되어야 어떻게 분리할지가 뚜렷해질 것. 우선 구현이 먼저다

const comletedStyle = {
  "NOT_STARTED": `${styleClassName.bgGray} ${styleClassName.borderVivid}`,
  "IN_PROGRESS": `${styleClassName.bgYellow} ${styleClassName.fontVividInverted}`,
  "COMPLETED": "border-black text-zinc-600",
}

const ProgressBox = memo(({ progress }: { progress: Progress }) => {
  const changeCompleted = useBoundStore((state) => state.changeCompleted)

  const containerBaseStyle = `${styleClassName.pTight} flex flex-col`
  const containerCompletedStye = comletedStyle[progress.completed]
  const containerClassName = `${containerBaseStyle} ${containerCompletedStye}`

  const handleClick = () => {
    changeCompleted(progress)
  }

  return (

    <div onClick={handleClick}>
      <MemoCard className={containerClassName}>
        <>
          <p className={`break-keep ${styleClassName.fontMuted}`}>{progress.stepTitle}</p>
          <div className="flex justify-between">
            <p className="break-keep">{progress.questionGroupDescription}</p>
            <p className="self-end">{progress.completed}</p>
          </div>
        </>
      </MemoCard>
    </div>

  )
})


export default ProgressBox