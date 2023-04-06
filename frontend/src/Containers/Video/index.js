import React from "react";
import styles from "./styles.module.scss"

export const Video = () => {
  return (
    <iframe
      src="https://www.youtube.com/embed/tMMb7G_XIt0?&autoplay=1&loop=1"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen>
    </iframe>
  )
}