import * as React from 'react'

// styles
// @ts-ignore
import styles from './posts.module.css'

interface Props {
  id: string
  content: string
  user: string
}

const Posts: React.FC<Props> = ({ id, content, user }) => {
  return (
    <div
      key={id}
      className={`w-full p-4 rounded-md mt-2 bg-white ${styles?.['post-container']}`}
    >
      <div>{content}</div>
      <div className={`w-fit ml-auto ${styles?.['post-user']}`}>{user}</div>
    </div>
  )
}

export default Posts
