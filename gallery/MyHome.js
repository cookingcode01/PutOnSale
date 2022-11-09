import React, { useEffect, useState } from 'react'
import ItemList from './item-list/ItemList'

// import banner from '../../../images/undraw_Add_to_cart_re_wrdo.png'
// import banner from '../../../images/camp.png'
import banner from '../../../images/camp.png'
import homebottom from '../../../images/homebottom.png'

import { Grid, Container, Card } from '@material-ui/core'
import './Gallery.css'

function MyHome({ setSelectedItem, contract }) {
  return (
    <div
      style={{
        minHeight: '70vh',
        paddingBottom: '3rem',
        paddingTop: '3rem',
      }}
    >
      <Container>
        {/* Home Header */}
        <Container>
          <div className="root">
            <Grid
              container
              spacing={3}
              style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              <Grid item xs={7} className="outer">
                <img src={banner} className="logo-hero" alt="logo-hero" />
              </Grid>
              <Grid item xs={5}>
                <p className="home-text-intro">
                  <strong>Sell Your Stuff App</strong> gives users the ability
                  to buy, rent, sell and request items they need froom other
                  people, all in one click.
                  <br />
                  Our app allows you to trade items you no longer want, need, or
                  use for new stuff. Our app is designed to keep usable goods
                  circulating instead of collecting dust on a shelf or taking up
                  space in a landfill.
                </p>
              </Grid>
            </Grid>
            <img src={homebottom} className="logo-hero" alt="logo-hero" />
          </div>
        </Container>

        {/* search */}
        {/* <form className="search-form">
          <div className="pseudo-search">
            <input
              type="text"
              placeholder="Search for people, etc"
              autofocus
              required
            />
            <span className="search-clear">Clear</span>
            <span className="search-icon">🔍</span>
          </div>
        </form>

        <br /> */}
        {/* Profiles */}
        {/* <Card
          style={{
            borderRadius: '24px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: '#fff9f7',
            width: '100%',
          }}
        >
          <ItemList setSelectedProfile={setSelectedItem} contract={contract} />
        </Card> */}
      </Container>
    </div>
  )
}

export default MyHome
