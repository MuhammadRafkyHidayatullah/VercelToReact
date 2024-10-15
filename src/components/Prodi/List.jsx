import React, {useEffect, useState} from "react"
import axios from "axios"
import {    NavLink } from "react-router-dom"

export default function List(){
    const [prodi, setProdi] = useState([])

    useEffect(() => {
        axios
        .get('https://project-pw-2-vbnt.vercel.app/api/api/prodi/')
        .then ((response) =>{
            setProdi(response.data.result)
        })
        .catch((error)=> {
            console.log('Error ',error);
        });
    }, []);
    return(
        <>
            <h2>List Prodi</h2>

             {/*Tombol Tambah Fakultas */}
            <NavLink to="/prodi/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            <ul className="list-group">
                {prodi.map((p) =>(
                        <li key={p.id} className="list-group-item">
                            {p.nama}
                        </li>
                ))}
            </ul>
        </>
    )
}