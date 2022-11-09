import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import MyHome from './components/home-container/gallery/MyHome'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home-container/home/Home'
import ItemDetails from './components/home-container/item-details/ItemDetails'
import CreatePet from './components/create-post/CreatePet'
import Web3Modal from 'web3modal'
import CreateLinks from './components/create-links/CreateLinks'
import { CONTRACTADDRESS, ABI } from './contractData'
const { ethers } = require('ethers')

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [contract, setContract] = useState('')
  console.log('MYcontract', contract)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [category, setCategory] = useState('')

  // store cdn & price in the contract
  const [price, setPrice] = useState(0)
  const [condition, setCondition] = useState('')
  const [retailPrice, setRetailPrice] = useState()
  const [location, setLocation] = useState('')

  // const [allProfiles, setAllProfiles] = useState([])
  // const [image, setImage] = useState('')
  // const [username, setUsername] = useState('')
  // const [bio, setBio] = useState('')
  // const [coverPhoto, setCoverPhoto] = useState('')
  // const [userUD, setUserUD] = useState('')

  const disconnectWallet = () => {
    localStorage.removeItem('walletAddress')
    setWalletAddress('')
  }

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    setWalletAddress(address)
    let contract = new ethers.Contract(CONTRACTADDRESS, ABI, signer)
    setContract(contract)
  }

  useEffect(() => {
    const getAddress = localStorage.getItem('walletAddress')
    setWalletAddress(getAddress)
  }, [])

  return (
    <Router>
      <div className="cl">
        <Navbar
          walletAddress={walletAddress}
          disconnectWallet={disconnectWallet}
          connectWallet={connectWallet}
        />
        <Route exact path="/">
          <MyHome />
        </Route>
        <Route exact path="/marketplace">
          <Home
            setSelectedItem={setSelectedItem}
            walletAddress={walletAddress}
            contract={contract}
          />
        </Route>

        <Switch>
          <Route exact path="/sell-item">
            <CreatePet
              image1={image1}
              image2={image2}
              title={title}
              description={description}
              category={category}
              setImage1={setImage1}
              setImage2={setImage2}
              setTitle={setTitle}
              setDescription={setDescription}
              setCategory={setCategory}
              walletAddress={walletAddress}
            />
          </Route>

          <Route exact path="/create-location">
            <CreateLinks
              image1={image1}
              image2={image2}
              title={title}
              description={description}
              category={category}
              price={price}
              condition={condition}
              retailPrice={retailPrice}
              location={location}
              setPrice={setPrice}
              setCondition={setCondition}
              setRetailPrice={setRetailPrice}
              setLocation={setLocation}
              walletAddress={walletAddress}
              contract={contract}
            />
          </Route>

          <Route path="/details/:itemId">
            <ItemDetails selectedItem={selectedItem} contract={contract} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
