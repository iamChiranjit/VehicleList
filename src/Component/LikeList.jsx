import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./likeList.css"

const LikeList = () => {
  let [content, setContent] = useState([])
  useEffect(()=>{
    axios.get(`http://localhost:3000/favourite`)
    .then((x)=>{
      setContent(x.data)
    }).catch(()=>{
      console.log("Something Wrong");
    })
  },[])

  let deleteData=(x)=>{
    axios.delete(`http://localhost:3000/favourite/${x}`)
    window.location.assign("/likeList")
  }
  return (
    <div id='fav'>
      {content.map((x)=>{
        return(
          <div className='box'>
            <table>
              <tr>
                <th colSpan="2">Name: {x.name}</th>
              </tr>
              <tr>
                <td>Model: </td>
                <td>{x.model}</td>
              </tr>
              <tr>
                <td>Manufacturer: </td>
                <td>{x.manufacturer}</td>
              </tr>
              <tr>
                <td>Length: </td>
                <td>{x.length}</td>
              </tr>
              <tr>
                <td>Crew: </td>
                <td>{x.crew}</td>
              </tr>
              <tr>
                <td>Passengers: </td>
                <td>{x.passengers}</td>
              </tr>
              <tr>
                <td>Cargo Capacity: </td>
                <td>{x.cargo_capacity}</td>
              </tr>
              <tr>
                <td>Consumables: </td>
                <td>{x.consumables}</td>
              </tr>
              <tr>
                <td>Vehicle Class: </td>
                <td>{x.vehicle_class}</td>
              </tr>
              <br />
              <tr>
                <td><button onClick={()=>deleteData(x.id)}>Delete</button></td>
              </tr>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default LikeList