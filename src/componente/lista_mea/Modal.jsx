import React, {useState, useEffect} from "react";
import axios from "axios";
import './Modal.css';

const ModalComponent = ({closeModal, onSubmit}) => {
    const [formState, setFormState] = useState({
        numeProdus: "",
        categorie: "",
        cantitate: "",
        dataExpirare: "",
        valabil: 1, 
    });

    useEffect(() => {
        const userId = localStorage.getItem('user'); 
        setFormState(prevState => ({
            ...prevState,
            idUser: userId
        }));
    }, []);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8090/api/product/createProduct', formState)
            .then(response => {
                window.alert("Produs adăugat cu succes", response.data);
                closeModal();
                onSubmit();
            })
            .catch(error => {
                window.alert('Eroare la adăugarea produsului:', error);
            });
    };

    return (
        <div className="container" onClick={(e) => {
                                                if(e.target.className === 'container')
                                                     closeModal()}
                                            }>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <label htmlFor="denumire">Denumire</label>
                        <input name="numeProdus" value={formState.numeProdus} onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <label htmlFor="description">Categorie</label>
                        <select name="categorie" value={formState.categorie} onChange={handleChange}>
                            <option value="lactate">Lactate</option>
                            <option value="carne">Carne</option>
                            <option value="fructe">Fructe</option>
                            <option value="legume">Legume</option>
                            <option value="altele">Altele</option>
                        </select>
                    </div>
                    <div className="form">
                        <label htmlFor="cantitate"> Cantitate (buc./l./kg.)</label>
                        <input type="number" name="cantitate" value={formState.cantitate} onChange={handleChange}/>
                    </div>
                    <div className="form">
                        <label htmlFor="data">Data</label>
                        <input type="date" name="dataExpirare" value={formState.dataExpirare} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="buton" onClick={handleSubmit}> Adaugă produs</button>
                </form>
            </div>
        </div>
    )
}

export default ModalComponent;
