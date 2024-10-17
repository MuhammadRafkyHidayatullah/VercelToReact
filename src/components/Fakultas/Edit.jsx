import axios from "axios";
import React, {useState , useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit(){
    const { id } = useParams();
    const navigate = useNavigate();
    const {nama, setNama} = useState("");
    const {error, setError} = useState(null);

    //mengambil Data Fakultas Berdasar id Ketika Komponen Pertamakali Dimuat
    useEffect(() => {
        axios.get(`https://project-pw-2-vbnt.vercel.app/api/api/fakultas/${id}`)//Mengirimkan Request Get untuk Mendapatkan dara Fakultas BEradasrkan ID
        .then((response) => {
            setNama(response.data.result.nama);
        })
        .catch((error) =>{
            console.error("Error Fetching data:", error);
            setError("Data Tidak Ditemukan");
        });
    },[id],);

    //menghandle perubahan Input saat mengetik di form
    const handleChange = (e) => {
        setNama(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-pw-2-vbnt.vercel.app/api/api/fakultas/${id}`, {nama}) // mengirimkan data patch Request
        .then((response) =>{
            navigate("/fakultas");
        })
        .catch((error) =>{
            console.error("Error Updating data:",error);
            setError("gagal Update data")
        });
    };

    return(
        <div>
            <h2>Edit Fakultas</h2> {/*Menampilkan judul */}
            {error && <p className="text-danger">{error}</p>} {/* Menampilakan Pesan Error Jika ada */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <lable htmlFor="nama" className="form-lable">
                        Nama Fakultas
                    </lable>
                    <input
                    type="text"
                    className="from-control"
                    id="nama"
                    value={nama} //mengisi nilai input dengan state nama
                    onChange={handleChange} //mengubah nilai input saat ada perubahan (user Mengetik)
                    required //input wajib diisi
                    />
                </div>
                <button type="submit" className="btn btn-primary">save</button>
            </form>
        </div>
    );
}