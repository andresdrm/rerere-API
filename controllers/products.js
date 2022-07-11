const productData = require("../Data/productData.json");
const userProducts = require("../Data/userProducts.json");
exports.product = (req, res) => {
    try {
        if(productData){
            res.status(200).send(productData); 
        }else{
           res.status(404).send("Datos no válidos");
        }
       
        } 
    catch (error) {
            res.status(500).json({
            message: "Ocurrió un error al insertar el usuario.",
            error,
        });
 
    }
}

exports.categoryProducts = async (req, res) =>
{
    try{
        const productPayload = req.body;
        const products = productData.filter(e => e.category == productPayload.category);

        if (!products) {
            res.status(401).send("Invalid");
            return;
      }
          
         res.status(200).send(products);
        
    }
    catch(error)
    {
        res.status(500).json({
        message: "Ocurrió un error al filtrar productos.",
        error,
    });
    }
}

exports.filterProducts = async (req, res) => 
{
console.log("Req es: ", req.body);
  try {
    const productPayload = req.body;

    let array = productData;

    const product = array.filter(e => e.name.toLowerCase().includes( productPayload.name));
    if (product.length === 0) {
      res.status(401).send("Invalid credentials");
      return;
    }
   
   res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};


exports.createProduct = async (req, res) => {
   try {
        const productPayload = req.body;
        const newProduct = [
                id = new Date().getTime(),
                name= productPayload.name,
                company = productPayload.company,
                amount = productPayload.amount,
                price = productPayload.price,
                description = productPayload.description,
                category = productPayload.category,
            ]
        res.status(200).send(newProduct); 
        } catch (error) {
            res.status(500).json({
            message: "Ocurrió un error al insertar el usuario.",
            error,
        });
    return;
  } 
}

exports.userProducts = async (req, res) => {
    try{
        const userProductPayload = req.body;
        const userP = userProducts.filter(e => e.email == userProductPayload.email);
        let array = [];
    
        for(let x=0; x < userP[0].products.length; x++){
           array.push(productData.filter(user => user.id == userP[0].products[x]));
        } 
        res.status(200).send(array);
    }catch(error){
        res.status(500).json({
        message: "Ocurrió un error al insertar el usuario.",
        error,
    });
    }
    return;
}