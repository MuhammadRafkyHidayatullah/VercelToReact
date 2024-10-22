import React, {useEffect, useState} from "react"
import axios from "axios"
import {    NavLink } from "react-router-dom"
import Swal from "sweetalert2"

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
            <NavLink to="/prodi/create" className="btn btn-primary mb-3">
                Create
            </NavLink>
            <table className="table">
                    <thead>
                        <tr>
                            <th>Nama Prodi</th>
                            <th>Nama Fakultas</th>
                            <th>#</th>
                        </tr>
                    </thead>
                <tbody>
                    {prodi.map((f)=>(
                        <tr key={f.id} >
                            <td>{f.nama}    </td>
                            <td>{f.fakultas.nama}   </td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Action buttons">
                                <NavLink to={`/prodi/edit/${f.id}`} className="btn btn-warning">
                                    Edit
                                </NavLink>
                                <button onClick={()=> handleDelete(f.id, f.nama)} className="btn-danger">
                                    Delete
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}