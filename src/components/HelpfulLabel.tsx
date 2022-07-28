import { Tooltip } from "@fluentui/react-components";
import { Info12Regular } from '@fluentui/react-icons';


interface HelpfulLabelProps {
  label: string
  content: string
}

function HelpfulLabel(props: HelpfulLabelProps) {
  return (
    <div className='helpfulLabel'>
      <Tooltip
      content={props.content}
      relationship="description"
      withArrow
      positioning="before"
      >
        <label>{props.label} <Info12Regular/> </label>
      </Tooltip>    
    </div>
  )
}

export default HelpfulLabel;
