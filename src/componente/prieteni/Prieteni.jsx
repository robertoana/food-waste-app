import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar"; 
import './Prieteni.css'; 

const Prieteni = () => {
    const [username, setUsername] = useState("");
    const [eticheta, setEticheta] = useState("");
    const [searchBar, setSearchBar] = useState(false);
    const [rows, setRows] = useState([]); 

    const fetchFriends = async () => {
        try {

            const friendsResponse = await axios.get('http://localhost:8090/api/friends/getAllFriends');
            const friendsData = friendsResponse.data;
        

            const usersResponse = await axios.get('http://localhost:8090/api/user/getAllUsers');
            const users = usersResponse.data;
        
            const userMap = users.reduce((acc, user) => {
              acc[user.id] = user.username; 
              return acc;
            }, {});
        

            const friendsWithNames = friendsData.map(friend => {
              return { 
                ...friend, 
                nume: userMap[friend.userId] || 'Nume indisponibil' 
              };
            });
        
            setRows(friendsWithNames);
          } catch (error) {
            console.error("Eroare la preluarea prietenilor:", error);
          }
        };
    const handleSearchBar = () => {
        setSearchBar(!searchBar);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEtichetaChange = (e) => {
        setEticheta(e.target.value);
    };

    const handleSearchSubmit = async () => {
      try {
          await axios.post('http://localhost:8090/api/friends/addFriend', {
              username: username,
              eticheta: eticheta,
          });
          await fetchFriends();
      } catch (err) {
          window.alert(`Error code ${err.response.status}, ${err.response.data.message}`);
      }
  };

      

    return (
        <>
            <Navbar />

            <div className="prieteni">
                <h1 className="titlu">Prietenii mei</h1>
                <table className="tabel">
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Eticheta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.nume}</td>
                                <td>{row.eticheta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn" onClick={handleSearchBar}>
                    Adaugă Prieteni
                </button>
                {searchBar && (
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Introduceți username-ul"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input
                            type="text"
                            placeholder="Introduceți etichetă"
                            value={eticheta}
                            onChange={handleEtichetaChange}
                        />
                        <button className="btn" onClick={handleSearchSubmit}>
                            Caută
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Prieteni;
