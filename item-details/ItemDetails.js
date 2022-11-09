import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import './ItemDetails.css'
import detailsImg from '../../../images/details.png'
import imageHolder from '../../../images/imageHolder.jpg'
import { CircularStatic } from '../../commons/CircularProgressWithLabel'

function ItemDetails({ account, contract, selectedItem }) {
  console.log('SelectedItem', selectedItem)
  console.log(
    'selectedItem.contractData.isSold',
    selectedItem.contractData.isSold,
  )
  const [comment, setComment] = useState('')
  const [codeHash, setCodeHash] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const mintNFT = async () => {
    console.log(
      'contractData.id._hex == ',
      selectedItem.contractData.id.toString(),
    )
    try {
      const curItemID = selectedItem.contractData.id.toString()
      const res = await contract.buyCampus(curItemID)
      console.log('MINT res', res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container className="root-pet-details">
        <div className="">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} className="grid-container">
              {selectedItem.contractData.isSold ? (
                <Button
                  variant="contained"
                  className="wallet-btn"
                  color="primary"
                >
                  Sold
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="wallet-btn"
                  color="primary"
                  onClick={mintNFT}
                >
                  Buy now
                </Button>
              )}

              <br />
              <div style={{ textAling: 'center' }}></div>

              <center>
                <img
                  className="img"
                  src={selectedItem.image ? selectedItem.image : imageHolder}
                  alt="pet"
                />
                <div className="flex-container">
                  <div>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </div>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </div>
              </center>

              <div className="specifications">
                <h2 style={{ margin: '3px' }}>Description</h2>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  color="textPrimary"
                >
                  {selectedItem.description}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card className="code-hash">
                <Typography
                  gutterBottom
                  variant="h5"
                  className="ingredients-title "
                >
                  {selectedItem.name}
                </Typography>

                <p className="price">
                  ${selectedItem.price ? selectedItem.price : 0}
                </p>
                <p className="retailPrice price">
                  Retail Price: ${selectedItem.retailPrice}
                </p>
                <p className="category price">
                  {' '}
                  Category: {selectedItem.category}
                </p>
                <p className="condition price">
                  Condition: {selectedItem.condition}
                </p>

                <p className="location price">
                  Location: {selectedItem.location}
                </p>
                <img
                  src={detailsImg}
                  alt="detailsImg"
                  className="direction-img"
                />
                <br />
                <div className="chef-profile">
                  <Link>
                    <Typography>
                      Listed by <strong>{selectedItem.walletAddress}</strong>
                    </Typography>
                  </Link>
                </div>
              </Card>

              <div className="code-hash">
                <Typography
                  gutterBottom
                  variant="h5"
                  className="ingredients-title"
                >
                  <p className="created ">Created: {selectedItem.created}</p>
                  Directions
                </Typography>
                There are no directions for this item.it is recommendable to
                meet in a public place.
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default ItemDetails
