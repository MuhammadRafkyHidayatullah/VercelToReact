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
    
const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Are You Sure?',
            text: `you Won't be Able to Revert This! Fakultas: ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: `#00ffee`, cancelButtonColor: "#d33",
            confirmButtonText: "Yes! Delete it!",
        }).then((result) => {
            if(result.isConfirmed){
                axios.delete(`https://project-pw-2-vbnt.vercel.app/api/api/prodi/${id}`)
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