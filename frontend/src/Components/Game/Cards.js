import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

import styles from './styles.module.css'

import 蔬菜香 from '../../Images/Card/蔬菜香.png'
import 豆子 from '../../Images/Card/豆子.png'
import 茶色淺 from '../../Images/Card/茶色淺.png'
import 茶色深 from '../../Images/Card/茶色深.png'
import 焙香 from '../../Images/Card/焙香.png'
import 清香 from '../../Images/Card/清香.png'
import 龍眼乾 from '../../Images/Card/龍眼乾.png'
import 無花果乾 from '../../Images/Card/無花果乾.png'
import 熱帶果香 from '../../Images/Card/熱帶果香.png'
import 果香 from '../../Images/Card/果香.png'
import 口感較厚 from '../../Images/Card/口感較厚.png'
import 野薑花 from '../../Images/Card/野薑花.png'
import 柑橘味 from '../../Images/Card/柑橘味.png'
import 薄荷 from '../../Images/Card/薄荷.png'
import 肉桂味 from '../../Images/Card/肉桂味.png'
import 口感濃稠 from '../../Images/Card/口感濃稠.png'
import 甜香 from '../../Images/Card/甜香.png'
import 蜜香 from '../../Images/Card/蜜香.png'
import 中藥味 from '../../Images/Card/中藥味.png'
import 濃郁果香 from '../../Images/Card/濃郁果香.png'
import 果酸 from '../../Images/Card/果酸.png'
import 淡雅花香 from '../../Images/Card/淡雅花香.png'
import 草麥味 from '../../Images/Card/草麥味.png'
import 玄米 from '../../Images/Card/玄米.png'
import 茉莉花 from '../../Images/Card/茉莉花.png'
import 奶香 from '../../Images/Card/奶香.png'
import 花香 from '../../Images/Card/花香.png'
import 青香 from '../../Images/Card/青香.png'
import 收斂感 from '../../Images/Card/收斂感.png'

const images = [
  蔬菜香,
  豆子,
  茶色淺,
  茶色深,
  焙香,
  清香,
  龍眼乾,
  無花果乾,
  熱帶果香,
  果香,
  口感較厚,
  野薑花,
  柑橘味,
  薄荷,
  肉桂味,
  收斂感,
  甜香,
  蜜香,
  中藥味,
  濃郁果香,
  果酸,
  口感濃稠,
  淡雅花香,
  草麥味,
  玄米,
  茉莉花,
  奶香,
  花香,
  青香,
]

const cards = images

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  )
}

export default function App() {
  return (
    <div className={styles.container}>
      <Deck />
    </div>
  )
}
