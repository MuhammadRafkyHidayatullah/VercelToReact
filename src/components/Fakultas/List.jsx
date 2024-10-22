import React, {useEffect, useState} from "react"
import axios from "axios"
import {    NavLink } from "react-router-dom"
import Swal from "sweetalert2"


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
    
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `you Won't be Able to Revert This! Fakultas: ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: `#00ffee`, cancelButtonColor: "#d33",
            confirmButtonText: "Yes! Delete it!",
        }).then((result) => {
            if(result.isConfirmed){
                axios.delete(`https://project-pw-2-vbnt.vercel.app/api/api/fakultas/${id}`)
                .then((response) => {
                    setFakultas(fakultas.filter((f)=> f.id !==id));
                    Swal.fire("Deleted!", "Your Data Has Been Deleted", "Success");
                })
                .catch((error)=>{
                    console.error("Error deleting data:", Error);
                    Swal.fire(
                        "Error",
                        "There was An issue Deleting The Data",
                        "error"
                    );
                });
            }
        });
    }

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
                            <div className="btn-group" role="group" aria-label="Action button">
                            <NavLink to={`/fakultas/edit/${f.id}`} className="btn btn-warning">
                                Edit
                            </NavLink>
                            <button onClick={() => handleDelete(f.id, f.nama)} className="btn btn-danger">
                                Delete
                            </button>
                            </div>
                        </li>
                ))}
            </ul>
        </>
    )
}