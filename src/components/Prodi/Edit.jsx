import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Edit(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [fakultas, setFakultas] = useState("");
    const [listFakultas, setListFakultas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get(`https://project-pw-2-vbnt.vercel.app/api/api/prodi/${id}`)
        .then((response)=>{
            console.log(response.data.result[0].nama);
            
            setNama(response.data.result[0].nama);
            setFakultas(response.data.result[0].fakultas.id);
        })
        .catch((error)=>{
            console.error("Error Fetching Data:", error);
            setError ("Data Tidak Ditemukan");
        });
        
        axios.get('https://project-pw-2-vbnt.vercel.app/api/api/fakultas')
        .then((response)=>{
            setListFakultas(response.data.result);
        })
        .catch((error)=>{
            console.error("Error Fetching Data :", error);
        });
    },[id]);

    const handleChange = (e) =>{
        setNama(e.target.value);
    };
    const handleFakultasChange = (e) => {
        setFakultas(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-pw-2-vbnt.vercel.app/api/api/prodi/${id}`,{
            nama,
            fakultas_id: fakultas,
        })
        .then((response)=>{
            navigate('/prodi');
        })
        .catch((error)=>{
            console.error("Error Updating Data: ", error);
            setError("Gagal mengupdate data");
        });
    };

    return(
        <div>
            <h2>Edit Program Studi</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-lable">
                        Nama Program Studi
                    </label>
                    <input 
                        type="text" className="form-control" id="nama" value={nama}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultas" className="form-lable">
                        Nama Fakultas
                    </label>
                    <select className="form-select" id="fakultas" value={fakultas}
                    onChange={handleFakultasChange}
                    required
                    >
                        <option value="">Pilih Fakultas</option>
                        {listFakultas.map(
                            (f)=>(
                                <option key={f.id} value={f.id}>
                                    {f.nama}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    save
                </button>{" "}
            </form>
        </div>
    );
}