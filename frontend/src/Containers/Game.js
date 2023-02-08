import React, { useState, useEffect, useRef, useMemo } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'characteristic A',
    url: 'https://www.vectornator.io/blog/content/images/2022/07/what-is-vector-art.widget.png'
  },
  {
    name: 'characteristic B',
    url: 'https://media.illustrationx.com/images/artist/QuincySutton/139036/crop/500/3832-139036.jpg'
  },
  {
    name: 'characteristic C',
    url: 'https://www.qualitylogoproducts.com/images/_promo-university/vector/astro-bitmap-1.png'
  },
  {
    name: 'characteristic D',
    url: 'https://cc-prod.scene7.com/is/image/CCProdAuthor/AdobeStock_164712883?$pjpeg$&jpegSize=100&wid=500'
  },
  {
    name: 'characteristic E',
    url: 'https://cdn.pixabay.com/photo/2017/02/01/10/44/design-art-2029562__340.png'
  }
]

const Game = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' , height: '300px' , width: '300px' , borderRadius: '32px' , margin: '32px'}}
              className='card'
            >
              <h3 style={{ color: '#ffffff', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '54px', paddingTop: '36px'}}>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons' style={{ marginLeft: '108px'}}>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>左滑</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>復原</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>右滑</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          🆘🆘🆘滑動卡片🆘🆘🆘
        </h2>
      )}
    </div>
  )
}

export default Game