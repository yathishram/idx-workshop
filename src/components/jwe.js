import React, { useState } from 'react'

const Jwe = ({ceramic, idx}) => {

      const [jwe, setJwe] = useState(null);
      const [data, setData] = useState(null);
      const [didArray, setDidArray] = useState([]);
      const [didInput, setDidInput] = useState(null)
      const [message, setMessage] = useState("")

      //Encryption using own did

      const encryptWithOwnDid = async (payload) => {
        try{
          const jwe = await idx.ceramic.did.createDagJWE(payload, [idx.id])
          console.log(jwe)
          localStorage.setItem("jwe", JSON.stringify(jwe));
          setMessage(JSON.stringify(jwe))
        }
        catch(err){
          console.log(err)
        }
      }

      //Decryption using own did
      const decryptWithOwnDid = async () => {
        try{
          const enc = JSON.parse(localStorage.getItem("jwe"));
        const dwe = await idx.ceramic.did.decryptDagJWE(enc)
        setMessage(dwe)
        console.log(dwe);
        }catch(err){
          console.log(err);
          setMessage("Sorry you cannot decrypt the data with ur did!")
        }
        
      }

      //Encrytpion with array of dids

      const encryptWithDids = async (payload) => {
        const jwe = await idx.ceramic.did.createDagJWE(payload, didArray)
        console.log(jwe)
        localStorage.setItem("jwe", JSON.stringify(jwe));
        setJwe(jwe)
        setMessage(JSON.stringify(jwe))
      }     

      const addDid = (did) => {
        const newDidArray = [idx.id, did];
        setDidArray(newDidArray)
        console.log(newDidArray)
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      addDid(didInput);
      setMessage("Did Added")
  }
    return (
        <div>
            <form className="data">
                <div className="input-field col s12">
                  <input id="data" type="text" className="validate" onChange={e => setData(e.target.value)}/>
                  <label htmlFor="data">Enter Data</label>
                </div>
            </form>

            <button onClick={e => encryptWithOwnDid(data)}>Encrypt With your Did</button>
            <button onClick={e => decryptWithOwnDid()}>Decrypt with your did</button>

            <div>
              <h4>{message}</h4>
            </div>

            <form className="data">
                <div className="input-field col s12">
                  <input id="data" type="text" className="validate" onChange={e => setData(e.target.value)}/>
                  <label htmlFor="data">Enter Data</label>
                </div>
            </form>

            <form className="data" onSubmit={e => handleSubmit(e)}>
                <div className="input-field col s12">
                  <input id="data" type="text" className="validate" onChange={e => setDidInput(e.target.value)}/>
                  <label htmlFor="data">Enter Did</label>
                  <button>Add Did</button>
                </div>
            </form>

            <button onClick={e => encryptWithDids(data)}>Encrypt With Other Did</button>
            <button onClick={e => decryptWithOwnDid()}>Decrypt with your did</button>

            <div>
              <h4>{message}</h4>
            </div>
        </div>
    )
}

export default Jwe