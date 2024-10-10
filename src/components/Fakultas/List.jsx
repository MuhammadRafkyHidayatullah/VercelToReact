import React, {useEffect, useState} from "react"
import axios from "axios"


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

            <ul className="list-group">
                {fakultas.map((f) =>(
                        <li key={f.id} className="list-group-item">
                            {f.nama}
                        </li>
                ))}
            </ul>
        </>
    )
}