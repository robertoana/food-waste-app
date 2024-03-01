const Products = require("../models").Products;
const User = require("../models").User;


const productFieldsValidation = async (productBody) => {
    const errors = [];

    if (!productBody.numeProdus || !productBody.categorie) {
        errors.push("Numele produsului și categoria sunt necesare.");
    } 

    if (productBody.cantitate <= 0) {
        errors.push("Cantitatea trebuie să fie mai mare decât zero.");
    }

    if (!productBody.dataExpirare) {
        errors.push("Data expirării este necesară.");
    }

    if (productBody.valabil === undefined) {
        errors.push("Starea de valabilitate a produsului este necesară.");
    }

    return errors;
};


const controller={
    
    createProduct: async (req, res) => {
        try {
            const userBody = {
                numeProdus: req.body.numeProdus,
                categorie: req.body.categorie,
                cantitate: req.body.cantitate,
                dataExpirare: req.body.dataExpirare,
                valabil: req.body.valabil,
                idUser: req.body.idUser  
            };
            const errors = await productFieldsValidation(userBody);
            if (errors.length === 0) {
                await Products.create(userBody);
                res.status(201).json({
                    message: `Product created!`,
                });
            } else {
                res.status(400).json({ message: errors });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }    ,
    getAllProducts: async (req, res) => {
        try {
            const products = await Products.findAll();

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getProductsByUser: async (req, res) => {
        try {
            const userId = req.params.idUser;
            if (!userId) {
                return res.status(400).json({
                    message: "User ID is required as a path parameter.",
                });
            }
            const products = await Products.findAll({
                where: { idUser: userId }
            });
            if (products && products.length > 0) {
                res.status(200).json(products);
            } else {
                res.status(404).json({ message: "No products found for the given user." });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getProducts: async (req, res) => {
        try {
          const products = await Products.findAll({
            include: [{
                model: User,
                as: 'User', 
                attributes: ['name']
            }]
          });
          const productsWithOwnerNames = products.map((product) => {
            const { numeProdus, categorie, cantitate, dataExpirare, valabil, User } = product; 
            const ownerName = User ? User.name : 'Numele lipsește'; 
            return {
                numeProdus,
                categorie,
                cantitate,
                dataExpirare,
                valabil,
                proprietar: ownerName
            };
        });
      
          res.json(productsWithOwnerNames);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
      
      
    deleteProducts: async (req, res) => {
        try {
            const product = await Products.findByPk(req.params.id);
            if (product) {
                product.destroy();
                res.status(200).json({
                    message: `The '${product.numeProdus}' product was deleted.`,
                });
            } else {
                res.status(404).json({
                    message: `A product with the provided id: '${req.params.id}' doesn't exist.`,
                });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
}


module.exports = controller;