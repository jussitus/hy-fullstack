import { CoursePart } from '../types'

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps) => {
  const part = props.coursePart
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
        </div>
      )
    case 'background':
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          more info at {part.backgroundMaterial}
        </div>
      )
    case 'group':
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          project exercises {part.groupProjectCount}
        </div>
      )
    case 'special':
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </div>
      )
    default:
      const _exhaustive: never = part
      return _exhaustive
  }
}

export default Part
