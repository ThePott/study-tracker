import ProgressSkeleton from '../features/layouts/ProgressSkeleton'
import ProgressContent from '../features/progress/ProgressContent'
import useBoundStore from '../shared/store'

const ProgressPage = () => {
  const doShowSkeleton = useBoundStore((state) => state.doShowSkeleton)
  console.log({doShowSkeleton})
  // if (doShowSkeleton) { return <p>로딩중이지롱</p> }
  if (doShowSkeleton) { return <ProgressSkeleton /> }

  return <ProgressContent />
}

export default ProgressPage