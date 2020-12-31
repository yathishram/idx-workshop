import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import {Route, Switch, useHistory, BrowserRouter, Redirect} from "react-router-dom"
import {generateSignature} from './utils/connectSign'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import {randomBytes} from 'crypto'
import {fromString} from 'uint8arrays/from-string'


//Components
import Connect from "./components/connect";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Jwe from "./components/jwe";

import { definitions } from './lib/config.json'
const CERAMIC_URL = 'https://ceramic-dev.3boxlabs.com'



function App() {

  const [ceramic, setCeramic] = useState(null);
  const [idx, setIdx] = useState(null);
  const [docId, setDocId] = useState(null);

const setup = async () => {
    const seed = await generateSignature();

    const ceramic = new Ceramic(CERAMIC_URL)
    await ceramic.setDIDProvider(new Ed25519Provider(seed))
    setCeramic(ceramic)
  // Create the IDX instance with the definitions aliases from the config
    const idx = new IDX({ ceramic, aliases: definitions })
    console.log(idx);
    setIdx(idx)
  // Load the existing notes
    //await idx.set(definitions.profile, test )
    const profile = await idx.get(definitions.profile, idx.id)
    return profile
}
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" render={(props) => <Connect setup={setup} />} />
        <Route path="/login" render={(props) => <Login idx={idx} ceramic={ceramic}/>} />
        <Route path="/dashboard" render={(props) => <Dashboard idx={idx} ceramic={ceramic}/>} />
        <Route path="/profile" render={(props) => <Profile idx={idx} ceramic={ceramic}/>} />
        <Route path="/jwe" render={(props) => <Jwe idx={idx} ceramic={ceramic}/>} />
      </Switch>
   </div>
  </BrowserRouter>
  );
}

export default App;
