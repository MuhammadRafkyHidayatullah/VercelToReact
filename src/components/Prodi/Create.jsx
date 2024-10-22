import React, {useState} from "react";
import axios from "axios";
import { useEffect } from "react";

export default function CreateProdi(){
    //inisialisasi state untuk menyimpan nama Prodi
    const [namaProdi, setNamaProdi] = useState(" ");
    //inisialisasi state untukmenyimpan id fakultas yang telah di pilih
    const [fakultasId, setFakultasId] = useState("");
    //inisisalisasi state untuk menyimpan nama fakultas yang dipilih
    const [FakultasList, setFakultasList] = useState([]);
    //inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");
    //iisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    //mengambil daftar fakultas dari API saat komponen select dimuat
    useEffect (() => {
        const fetchFakultas = async () => {
            try{
                const response = await axios.get(
                    "https://project-pw-2-vbnt.vercel.app/api/api/fakultas/"
                );
                setFakultasList(response.data.result);
            }catch (error){
                setError("failed To fetch data");
            }
        };
        fetchFakultas();
    }, []);
    

    //fungsi yang akan dijalankan saat form di submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        //validasi input jia namaFakultas kosong set pesan error
        if(namaProdi.trim() == "" || fakultasId.trim() === "") {
            setError("Nama Fakultas is Required") //setpesan error jika input kososng
            return;
        }
        try{
            const response = await axios.post(
                "https://project-pw-2-vbnt.vercel.app/api/api/prodi/",
                {
                    nama: namaProdi,
                    fakultas_id: fakultasId
                }
            );

            

            console.log(response.status);
            

            //lika response HTTP status 210 (Created), berarti berhasil
            if(response.status === 201){
                //tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Fakultas Created Successfully");
                setNamaProdi("");
                setFakultasId("");
           }else{
                //jika tidak berhasil, tampilkan error
                setError("Failed to Create Fakultas")
            }
        } catch (error){
            //jika terjadi error (misal masalah jarigan), ta,mpilkan persan eror
            setError("An error occured while creating fakultas");
            console.log(error);
        }
    }

    return(
        <div className="container mt-5">
        <h2 className="mb-4">Create Prodi</h2>
        {/*jika ada pesan error tampilkan dalam alret bootrstrap*/}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Jika ada persan success, tampilkan dalam tampilan alert bootstrap*/}
        {success && <div className="alert alert-success">{success}</div>}

        {/*Form Untuk Mengisi nama Fakultas */}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="namaFakultas" className="form-lable">
                    Nama Prodi
                </label>

                {/* Input untuk nama fakultas dengan class bootstrap */}
                <input
                    type="text"
                    className="form-control"
                    id="namaProdi"
                    value={namaProdi} // nilai input disimpan di state Nama Fakultas
                    onChange={(e) => setNamaProdi(e.target.value)}
                    placeholder="Enter Nama Fakultas" //placeholder Text untuk input
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fakultasId" className="form-lable">
                    Fakultas
                </label>
                {/* Input untuk nama fakultas dengan class bootstrap */}
                <select
                    className="form-slect" id="fakultasId"
                    value={fakultasId}
                    onChange={(e) => setFakultasId(e.target.value)}
                >
                    <option value="">Select Fakultas</option>
                    {FakultasList.map((fakultas) =>(
                        <option key={fakultas.id} value={fakultas.id}>
                            {fakultas.nama}
                        </option>
                    ))}
                </select>
            </div>
            {/* Tombol submit dengan class bootstrap */}
            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    </div>
    )
}