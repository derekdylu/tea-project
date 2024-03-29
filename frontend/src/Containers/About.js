import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@emotion/react"
import theme from '../Themes/Theme'
import useWindowDimensions from '../Hooks/useWindowDimensions'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

import bg0 from '../Images/About/about_bg0.png';
import bg1 from '../Images/About/about_bg1.png';
import bgb from '../Images/About/about_bg_b.png';
import email from '../Images/Icon/mail.svg';
import github from '../Images/Icon/github-fill.svg';
import linkedin from '../Images/Icon/linkedin-box-fill.svg';
import behance from '../Images/Icon/behance-fill.svg';

import { NavBar } from "../Components/NavBar"

const titles = ["覺茶的旅程"]
const description = "本專案由台大農經系研究室委託螺絲福祿團隊製作，希望能藉由一款俐落且極富趣味的小品遊戲，拉近大眾與台灣茶的距離，開啟與台灣茶的對話。"

const teams = [[["臺大", "農經系"], "本專案由台大農經系研究室委託螺絲福祿團隊製作，希望能藉由一款俐落且極富趣味的小品遊戲，拉近大眾與台灣茶的距離並開啟對話。"], [["設計", "開發"], "本團隊在臺大創新設計學院(D-School)的課程中相遇並組成團隊，持續發展本團隊的互動式產品，期待能為世界帶來更多正向的力量。"]]
const devs = [
  {
    color: "#F46B3B",
    name: "林奕萱",
    occupation: "專案管理",
    email: "mailto:osramic@gmail.com",
    linkedin: "https://www.linkedin.com/in/JellyMichelle",
    github: "https://jellyfishlin.github.io",
  },{
    color: "#15834A",
    name: "盧德原",
    occupation: "全端工程",
    email: "mailto:derek@gmail.com",
    linkedin: "https://www.linkedin.com/in/derekdylu",
    github: "https://github.com/derekdylu",
  },{
    color: "#5D9FE4",
    name: "張琪",
    occupation: "全端工程",
    email: "mailto:gracezhang1611@gmail.com",
    linkedin: "https://www.linkedin.com/in/gracetheo",
  },{
    color: "#FEF6D1",
    name: "張育綸",
    occupation: "設計",
    email: "mailto:lnd870929@gmail.com",
    behance: "https://www.behance.net/lnd870929178d",
  }
]

const cautions = [
  "本站以學術為唯一目的建置與營運，無任何商業相關活動。自本網站開啟之外部連結非由本站營運。瀏覽外部網站時，應妥善管理個人資料，並理性消費。"
]

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box width="100%" height={64} style={{ background: "#fefcf4", position: "fixed"}}>
        <NavBar />
      </Box>
      <Grid sx={{ pt: 10, px: 3 }}>
        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 1 }}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" xs={10}>
            <Typography variant="bodyLarge" sx={{color: theme.palette.neutralVariant[30]}}>
              {/* {description} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ px: 3, pt: 0}}>
        <Grid container direction="row" justifyItems="flex-start" alignItems="flex-start" sx={{ mt: 0 }}>
          {
            teams.map((team, index) => {
              return (
                <>
                  <Grid container direction="column" xs={2} sx={{ mt: 1 }} key={index}>
                    <Typography variant="titleMedium" sx={{ color: theme.palette.neutralVariant[30] }}>
                      {team[0][0]}
                    </Typography>
                    <Typography variant="titleMedium" sx={{ color: theme.palette.neutralVariant[30] }}>
                      {team[0][1]}
                    </Typography>
                  </Grid>
                  <Grid item xs={10} sx={{ mt: 1 }} key={index}>
                    <Typography variant="bodyLarge" sx={{ color: theme.palette.neutralVariant[30] }}>
                      {team[1]}
                    </Typography>
                  </Grid>
                </>
              )
            })
          }
        </Grid>
        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 1, pb: 0.5}} >
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" xs={10}>
            {
              devs.map((dev, index) => {
                return (
                  <>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ py: 0.5}} key={index} style={{borderStyle: 'hidden hidden solid hidden', borderWidth: '0 0 0.5px 0'}}>
                      <Grid container direction="column" justifyContent="center" alignItems="flex-start" xs={4}>
                        <Typography variant="bodySmall" sx={{ color: theme.palette.neutralVariant[30] }}>
                          {dev.occupation}
                        </Typography>
                        <Typography variant="labelLarge" sx={{mt: 0.6, color: theme.palette.neutralVariant[30]}}>
                          {dev.name}
                        </Typography>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-end" alignItems="center" xs={8}>
                        <a href={dev.email}><Icon><img src={email} alt="mail" /></Icon></a>
                        {
                          dev.github ? <a href={dev.github}><Icon sx={{ml: 3, color: theme.palette.neutralVariant[30]}}><img src={github} alt="github" /></Icon></a> : null
                        }
                        {
                          dev.linkedin ? <a href={dev.linkedin}><Icon sx={{ml: 3, color: theme.palette.neutralVariant[30]}}><img src={linkedin} alt="linkedin" /></Icon></a> : null
                        }
                        {
                          dev.behance ? <a href={dev.behance}><Icon sx={{ml: 3, color: theme.palette.neutralVariant[30]}}><img src={behance} alt="behance" /></Icon></a> : null
                        }
                      </Grid>
                    </Grid>
                  </>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" sx={{ mb: 4, pt: 1, px: 3, pb: 12}} style={{backgroundImage: `url(${bgb})`, backgroundSize: "180px", backgroundRepeat: 'no-repeat', backgroundPosition: "100% 0%"}}>
        {
          cautions.map((caution, index) => {
            return (
              <Typography variant="bodySmall" sx={{mt: 1, color: theme.palette.neutralVariant[30]}}>
                {caution}
              </Typography>
            )
          })
        }
      </Grid>
    </ThemeProvider>
  )
}

export default About