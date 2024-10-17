import React, {useEffect, useState} from "react"
import axios from "axios"
import {    NavLink } from "react-router-dom"


export default function List(){
    const [fakultas, setFakultas] = useState([])

    useEffect(() => {
        axios
        .get('https://project-pw-2-vbnt.vercel.app/api/api/fakultas')
        .then ((response) =>{
            setFakultas(response.data.result)
        })
        .catch((error)=> {
            console.log('Error ',error);
        });
    }, []);
    
    return(
        <>
            <h2>List Fakultas</h2>

            {/*Tombol Tambah Fakultas */}
            <NavLink to="/fakultas/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            <ul className="list-group">
                {fakultas.map((f) =>(
                        <li key={f.id} className="list-group-item d-flex justify-content-between align-item-center">
                            <span>{f.nama}</span>{/* Menampilkan nama Fakultas */}
                            <NavLink to={`/fakultas/edit/${f.id}`} className="btn btn-warning">
                                Edit
                            </NavLink>
                        </li>
                ))}
            </ul>
        </>
    )
}