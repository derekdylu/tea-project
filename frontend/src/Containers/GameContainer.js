import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Marquee from "react-fast-marquee";
import Game from "../Components/Game";

const db = [
  {
    name: '草麥味',
    engName: 'Wheat',
    img: 'https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg'
  },
  {
    name: '玄米味',
    engName: 'Brown Rice',
    img: 'https://hips.hearstapps.com/hmg-prod/images/brown-rice-vs-white-rice-royalty-free-image-1670260714.jpg'
  },
  {
    name: '茉莉香',
    engName: 'Jasmine',
    img: 'https://gilmour.com/wp-content/uploads/2019/05/Jasmine-Care.jpg'
  },
  {
    name: '奶香',
    engName: 'Milk',
    img: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/milk-soy-hemp-almond-non-dairy-1296x728-header-1296x728.jpg?w=1155&h=1528'
  },
  {
    name: '花香',
    engName: 'Floral',
    img: 'https://images.unsplash.com/photo-1559759708-d6e99b50f0e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvcmFsJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: '青香',
    engName: 'Grass',
    img: 'https://tg-cdn.azureedge.net/sites/default/files/images/paragraph/italrb/easy_guide_grass.jpg'
  }
]

const GameContainer = () => {
  const [index, setIndex] = useState(db.length - 1)

  const onChangeIndex = (index) => {
    setIndex(index)
  }

  return (
    <div>
      <div>
        header
      </div>
      <Game onChangeIndex={onChangeIndex}/>
      <Marquee
        gradient={false}
        speed={10}
        style={{
          position: 'absolute',
          top: '475px',
          zIndex: -1
        }}
      >
        <Typography variant="h2" sx={{ mx: 2 }}>
          {db[index].engName}
        </Typography>
        <Typography variant="h2" sx={{ mx: 0 }}>
          ∗
        </Typography>
        <Typography variant="h2" sx={{ mx: 2 }}>
          {db[index].engName}
        </Typography>
      </Marquee>
    </div>
  )
}

export default GameContainer