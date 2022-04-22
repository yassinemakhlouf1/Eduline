import React from 'react'
import ReactPlayer from 'react-player/youtube'
export default function CourseAsDetails() {
<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
  return (
    <div className='player-wrapper'>
    <ReactPlayer
      className='player'
      url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
      controls
      playing
      muted
      width='100%'
      height='100%'
    />
  </div>
  )
}
