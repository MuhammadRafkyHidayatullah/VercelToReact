import React, {useEffect, useState} from "react"
import axios from "axios"


export default function List(){
    const [prodi, setProdi] = useState([])

    useEffect(() => {
        axios
        .get('https://project-apiif-3-b.vercel.app/api/api/prodi')
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