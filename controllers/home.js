const cards = require("../Data/homeCardsData.json")
exports.home = (req, res) => {
    try{
        if(cards){
            res.status(200).send(cards);
        }else{
           res.status(404).send("Datos no válidos");
        }
    }
    catch(error)
    {
        res.status(500).json({
            message: "Ocurrió un error al obtener los datos.",
            error,
          });
    }
  };