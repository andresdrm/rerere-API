const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "ReReRe",
    description:
      "Este es el API de ReReRe",
  },
  host: "localhost:7500",
  schemes: ["http", "https"],
  definitions: {
    AddUser: {
      name: "Cristiano",
      email: "goatCristiano@gmail.com",
      password: "asdf1234",
      phone: 20806545,
      picture: "https://ci0137.s3.amazonaws.com/rerere/users/senorasonriente.jpg"
    },
    AddProduct: {
      name: "Nombre del producto",
      price: 9999,
      description: "Lorem ipsum kljdsf adsf asf adsf",
      picture: "https://domain.com/picture.jpg",
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  require("./server.js");
});
