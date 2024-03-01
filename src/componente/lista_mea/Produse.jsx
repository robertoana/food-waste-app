import React, { useState, useEffect } from "react";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import './Produse.css';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Produse = ({ deleteRow }) => {

    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const idUser = localStorage.getItem('user');
                const response = await axios.get(`http://localhost:8090/api/product/getProductsByUser/${idUser}`);
                setRows(response.data);
                if (rows.length === 0) {
                    return <div>Nu există produse disponibile.</div>;
                }
                
            } catch (error) {
                console.error('Eroare la preluarea produselor', error);
            }
        };
    
        fetchProducts();
    }, []);
    
    if (rows.length === 0) {
        return <div>Nu există produse disponibile.</div>;
    }
    

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8090/api/product/deleteProduct/${productId}`);
            const updatedRows = rows.filter((row) => row.idProdus !== productId);
            setRows(updatedRows);
        } catch (error) {
            console.error('Eroare la ștergerea produsului', error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="produse">
                <h1 className="titlu">Lista mea</h1>
                <table className="tabel">
                    <thead>
                        <tr>
                            <th> Denumire</th>
                            <th> Categorie</th>
                            <th> Cantitate <br></br>
                                (buc./l./kg.)</th>
                            <th> Data de expirare <br></br>
                                (mm/dd/yyyy)</th>
                            <th> Disponibilitate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row) => (
                                <tr key={row.idProdus}>
                                    <td>{row.numeProdus}</td>
                                    <td>{row.categorie}</td>
                                    <td>{row.cantitate}</td>
                                    <td>{new Date(row.dataExpirare).toLocaleDateString()}</td>
                                    <td>
                                        <span className="icons">
                                            <TiTick className="tick" />
                                            <FaTrash className="expirat" onClick={() => deleteProduct(row.idProdus)} />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Produse;
