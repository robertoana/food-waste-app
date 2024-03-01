import React, { useState, useEffect } from "react";
import './Prod.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog'; 
import { Button } from 'primereact/button'; 
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import Navbar from "../Navbar";
import axios from "axios";

const Prod = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/product/getProducts`);
        setProducts(response.data); 
      } catch (error) {
        console.error('Eroare la preluarea produselor', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const getSelectedItems = () => {
    return Object.keys(selectedItems).filter(key => selectedItems[key]).map(key => {
      return products.find(item => item.numeProdus === key); 
    });
  };

  const onCheckboxChange = (rowData) => {
    const newSelection = { ...selectedItems };
    if (newSelection[rowData.numeProdus]) {
      delete newSelection[rowData.numeProdus];
    } else {
      newSelection[rowData.numeProdus] = true;
    }
    setSelectedItems(newSelection);
  };

  const checkboxBodyTemplate = (rowData) => {
    return (
      <Checkbox
        onChange={() => onCheckboxChange(rowData)}
        checked={selectedItems[rowData.numeProdus] || false}
      />
    );
  };

  const renderSelectedItemsTable = () => {
    const selectedProducts = getSelectedItems();
    return (
      <DataTable value={selectedProducts}>
        <Column field="numeProdus" header="Denumire"></Column>
        <Column field="categorie" header="Categorie"></Column>
        <Column field="cantitate" header="Cantitate"></Column>
        <Column field="dataExpirare" header="Valabilitate"></Column>
        <Column field="proprietar" header="Proprietar"></Column>
      </DataTable>
    );
  };

  const renderDialogHeader = () => {
    return (
      <div className="dialog-header">
        Coșul meu
      </div>
    );
  };

  return (
    <>
      <Navbar/>
      <h1 className="titlu">Produse disponibile</h1>
      <div className="table" filters={filters}>
        <div className="cautare">
          <InputText onInput={(e) => setFilters({
            ...filters,
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
          })} placeholder="Căutați..." />
        </div>
        <Button label="Coșul meu" icon="pi pi-shopping-cart" className="cos" onClick={toggleCart} />

        <DataTable value={products} filters={filters}>
          <Column field="numeProdus" header="Denumire" bodyClassName="text"></Column>
          <Column field="categorie" header="Categorie" bodyClassName="text" sortable></Column>
          <Column field="cantitate" header="Cantitate" bodyClassName="text"></Column>
          <Column field="dataExpirare" header="Valabilitate" bodyClassName="text" sortable></Column>
          <Column field="proprietar" header="Proprietar" bodyClassName="text" sortable></Column>
          <Column field="Adaugă" header="Adaugă în coș" body={checkboxBodyTemplate} bodyClassName="text"></Column>
        </DataTable>

        <Dialog 
          header={renderDialogHeader()} 
          visible={isCartVisible} 
          className="custom-dialog"
          onHide={toggleCart}
        >
          {isCartVisible && renderSelectedItemsTable()}
        </Dialog>
             
      </div>
    </>
  )
}

export default Prod;
