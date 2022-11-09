import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './ItemList.css'
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import imageHolder from '../../../../images/imageHolder.jpg'
import CircularStatic from '../../../commons/CircularProgressWithLabel'

function ItemList({ account, contract, setSelectedProfile }) {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [data, setData] = useState([])

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  useEffect(() => {
    const tempItems = []
    const loadsData = async () => {
      try {
        setLoading(true)

        // returns a number of  all ids from smaart contract
        const itemsLengthSC = await contract._ids()
        for (let i = 2; i <= itemsLengthSC; i++) {
          // thelist is list of campus from SC
          let item = await contract.thelist(i)
          // creating new obj, will hold all data & push it to tempItems
          let curObj = {
            contractData: item,
          }

          //  use to get metadata from IPFS
          const cid = item.cid

          //  get data from IPFS using cid
          let res = await fetch(cid)
          res = await res.json()
          // converts string to obj
          let description = JSON.parse(res.description)
          // assembling curObj
          curObj.description = description.description
          curObj.category = description.category
          curObj.price = description.price
          curObj.condition = description.condition
          curObj.retailPrice = description.retailPrice
          curObj.location = description.location
          curObj.walletAddress = description.walletAddress
          curObj.created = description.created
          curObj.image = getImage(res.image)
          curObj.name = res.name
          tempItems.push(curObj)
        }
        setData(tempItems)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadsData()
  }, [contract])

  const details = (profile) => {
    localStorage.removeItem('selectedItem')
    localStorage.setItem('selectedItem', profile)
    setSelectedProfile(profile)
    history.push(`/details/${profile.cid}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          <Grid container spacing={40}>
            {data.length ? (
              data.map((profile, index) => (
                <Grid item md={3} spacing={1} className="swap-card">
                  <Card sx={{ maxWidth: 300 }} onClick={() => details(profile)}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={profile.image || imageHolder}
                      alt="Profile"
                    />
                    <CardContent>
                      <Typography className="card-price">
                        ${profile.price ? profile.price : 'FREE'}
                      </Typography>
                      <Typography
                        color="#1C1A19"
                        className="card-header-swap spacer"
                      >
                        {profile.name || profile.username}
                      </Typography>
                      <Typography className="card-location spacer">
                        {profile.location ? profile.location : 'New York City'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Items Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ItemList
