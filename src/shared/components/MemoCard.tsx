import { styleClassName } from '../constants/style'

interface AdditionalProps {
  className?: string
}
type MemoCardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & AdditionalProps

const MemoCard = (props: MemoCardProps) => {
  const { className, children, ...rest } = props
  return (
    <div {...rest} className={`p-6 ${styleClassName.memoWidth}  ${styleClassName.rounded} ${className}`}>
      {children}
    </div>
  )
}

export default MemoCard