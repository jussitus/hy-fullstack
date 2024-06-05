import { CoursePart } from '../types'
import Part from './Part'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return props.courseParts.map((coursePart) => (
    <p>
      <Part coursePart={coursePart} />
    </p>
  ))
}

export default Content
