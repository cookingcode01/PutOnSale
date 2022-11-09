import React from 'react'
import { StylesProvider, Chip, Container } from '@material-ui/core'
import './Home.css'
import PetGallery from '../gallery/Gallery'

function Home({ setSelectedItem, contract }) {
  return (
    <StylesProvider injectFirst>
      <Container>
        <div className="label-btns">
          <Chip size="medium" label="All Listings" color="primary" clickable />
          <Chip size="medium" label="Today's Listings" clickable />
          <Chip size="medium" label="Last Week" clickable />
          <Chip size="medium" label="Last Month" clickable />
          <Chip size="medium" label="Popular" clickable />
        </div>
        <PetGallery contract={contract} setSelectedItem={setSelectedItem} />
      </Container>
    </StylesProvider>
  )
}

export default Home
