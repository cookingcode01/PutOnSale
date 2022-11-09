import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Button,
  Card,
  StylesProvider,
  TextField,
  MenuItem,
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import './CreateLinks.css'
import { apiKey } from '../APIKEYS'
import { NFTStorage, File } from 'nft.storage'

function CreateLinks({
  image1,
  title,
  description,
  category,
  price,
  condition,
  retailPrice,
  location,
  setPrice,
  setCondition,
  setRetailPrice,
  setLocation,
  walletAddress,
  contract,
}) {
  console.log('ONCREATE contract', contract)
  const history = useHistory()
  const coditionTypeRef = React.createRef()
  const [loading, setLoading] = useState(false)

  const getTime = () => {
    let date = new Date()
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return date.toLocaleTimeString('en-us', options)
  }

  const saveToNFTStorage = async () => {
    const created = getTime()
    try {
      setLoading(true)
      const client = new NFTStorage({ token: apiKey })

      const obj = {
        description,
        category,
        price,
        condition,
        retailPrice,
        location,
        walletAddress,
        created,
      }

      console.log('WHAT obj', obj)

      const metadata = await client.store({
        name: title,
        description: JSON.stringify(obj),
        image: new File([image1], 'imageName', { type: 'image/*' }),
      })
      if (metadata) {
        console.log('metadata', metadata)
        console.log('metadata.data', metadata.data)
        let metaData = metadata.url.substring(7)
        const getDatUrl = `https://cloudflare-ipfs.com/ipfs/${metaData}`
        console.log(' getDatUrl', getDatUrl)
        await contract.createCampus(getDatUrl, price)
        setLoading(false)
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <StylesProvider injectFirst>
      <Container
        className="root-pet-details"
        style={{ minHeight: '50vh', paddingBottom: '3rem' }}
      >
        <center>
          <Card
            style={{
              maxWidth: '500px',
              padding: '2rem',
              paddingBottom: '3rem',
              borderRadius: '13px',
              textAlign: 'start',
            }}
          >
            <div className="">
              <Button
                className="whiteLink-no-active"
                component={Link}
                to="/sell-item"
              >
                Appearance
              </Button>

              <Button
                className="whiteLink"
                component={Link}
                to="/create-location"
              >
                Details
              </Button>
            </div>
            <br />

            <hr style={{ border: '1px solid #ccc' }} />
            <br />

            <p>
              <label htmlFor="fname">Price</label>
            </p>
            <input
              type="number"
              id="fname"
              name="price"
              placeholder={price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="create-profile-input"
              required
            ></input>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">Only numbers</label>
            </p>

            <br />
            <p>
              <label htmlFor="fname">Retail Price</label>
            </p>
            <input
              type="number"
              id="retailPrice"
              name="$"
              className="create-profile-input"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
            ></input>
            <p style={{ textAlign: 'right', fontSize: '11px' }}>
              <label htmlFor="w3review">Only numbers</label>
            </p>

            <br />

            <TextField
              fullWidth
              name="condition"
              select
              label="Choose  the condition"
              variant="outlined"
              onChange={(e) => setCondition(e.target.value)}
              defaultValue=""
              ref={coditionTypeRef}
              required
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used - Like New">Used - Like New</MenuItem>
              <MenuItem value="Used - Good">Used - Good</MenuItem>
              <MenuItem value="Used - Fair">Used - Fair</MenuItem>
            </TextField>

            <br />
            <br />

            <p>
              <label htmlFor="fname">Location</label>
            </p>
            <input
              type="text"
              id="location"
              name="City College"
              className="create-profile-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>

            <br />
            <br />

            <br />
            <br />
            <hr style={{ border: '1px solid #ccc' }} />
            <br />
            <br />
            {loading ? (
              <div className="">
                <LinearProgress />
              </div>
            ) : (
              ''
            )}

            <br />
            <center>
              <Button className="whiteLink" component={Link} to="/">
                Nevermind
              </Button>
              <Button
                className="phase-btn"
                variant="contained"
                onClick={saveToNFTStorage}
              >
                Save
              </Button>
            </center>
          </Card>
        </center>
      </Container>
    </StylesProvider>
  )
}

export default CreateLinks
