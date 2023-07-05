import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'

const Home = () => {
    let[content, setContent] = useState([])
    let[detailsVehicle, setDetailsVehicle] = useState(false)
    let[currentPage, setCurrentPage] = useState(1)
    let[totalPage, setTotalPage] = useState(0)
    let[btn, setBtn] = useState([])
    
        useEffect(()=>{
            axios.get(`http://localhost:3000/favourite`)
            .then((x)=>{
                setBtn(x.data)
            })
        },[])
        const fetchPeople = async (currentPage) => {
            try {
              const x= await axios.get(`https://swapi.dev/api/vehicles/?page=${currentPage}`);
              setContent(x.data.results);
              const totalPage = Math.ceil(x.data.count / 10);
              setTotalPage(totalPage);
            } catch (error) {
              console.log(error);
            }
          }

    let pPage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
            fetchPeople(currentPage-1)
        }
    }
    let nPage=()=>{
        if(currentPage<totalPage){
            setCurrentPage(currentPage+1)
            fetchPeople(currentPage+1)
        }
    }

    useEffect(()=>{
        fetchPeople(currentPage)
    }, [currentPage])

    let clickDetails=(x)=>{
        setDetailsVehicle(x)
    }

    let nav = useNavigate()

    let favHandle=(name, model, manufacturer, length, crew, passengers, cargo_capacity, consumables, vehicle_class)=>{
        if(!arr.includes(name)){
            alert(`${name} Added to favourite`)
            let payload = {name, model, manufacturer, length, crew, passengers, cargo_capacity, consumables, vehicle_class}
            axios.post(`http://localhost:3000/favourite`, payload)
            nav('/likeList')
        }
        else{
            alert("Already added to favourite")
        }
    }
    
    let x = btn.map((e)=>{
        return e.name
    })
    let arr = Array.from(x)

  return (
    <div>
        <div className='first'>
            <table>
            <thead>
                <tr>
                    <th>SL No.</th>
                    <th>Vehicle Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <br />
            <tbody>
                {content.map((x, i) => (
                <tr>
                    <td style={{width:"20%", paddingLeft:"44px"}}>{i + 1}</td>
                    <td onClick={()=>{clickDetails(x)}} style={{cursor:"pointer", display:"flex", justifyContent:"center"}} id='name'>{x.name}</td>
                    <td style={{width:"20%", paddingLeft:"15px"}}><button onClick={()=>favHandle(x.name, x.model, x.manufacturer, x.length, x.crew, x.passengers, x.cargo_capacity, x.consumables, x.vehicle_class)}><Link>Favourite</Link></button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div>
            {detailsVehicle && (
                <div className='second'>
                    <div className='box'>
                        <h2>Vehicle Details</h2>
                        <p>Name: {detailsVehicle.name}</p>
                        <p>Model: {detailsVehicle.model}</p>
                        <p>Manufacturer: {detailsVehicle.manufacturer}</p>
                        <p>Length: {detailsVehicle.length}</p>
                        <p>Crew: {detailsVehicle.crew}</p>
                        <p>Passengers: {detailsVehicle.passengers}</p>
                        <p>Cargo Capacity: {detailsVehicle.cargo_capacity}</p>
                        <p>Consumables: {detailsVehicle.consumables}</p>
                        <p>Vehicle Class: {detailsVehicle.vehicle_class}</p>
                    </div>
                </div>
            )}
            </div>
        <div className='btn'>
            <button onClick={pPage} disabled={currentPage===1}>Previous Page</button>
            <h3>Page No: {currentPage}/{totalPage}</h3>
            <button onClick={nPage} disabled={currentPage===totalPage}>Next Page</button>
        </div>
    </div>
  )
}

export default Home