import React from 'react'
import Loader from './Loader'

const TeaCup = ({tea}) => {
  return (
    <div>
      <Loader tea={tea} />
    </div>
  )
}

export default TeaCup