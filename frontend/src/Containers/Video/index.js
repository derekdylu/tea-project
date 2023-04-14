import React from "react";
import styles from "./styles.module.scss"

export const Video = () => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        src="https://www.youtube.com/embed/tMMb7G_XIt0?playlist=tMMb7G_XIt0&loop=1"
        title="YouTube video player"
        allow="autoplay"
        allowFullScreen>
      </iframe>
    </div>
  )
}