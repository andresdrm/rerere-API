const dotenv = require("dotenv");
const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

dotenv.config();

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  region: "us-east-1",
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "ci0137",
    key: function (req, file, cb) {
      cb(null, `rerere/products/${file.originalname}`);
    },
  }),
});

const uploadUser = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "ci0137",
    key: function (req, file, cb) {
      cb(null, `rerere/users/${file.originalname}`);
    },
  }),
});

const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/home");
const productsRoutes = require("./routes/products");
const { userIsAuthenticated } = require("./middlewares/auth");
// const swaggerFile = require("./swagger.json");

const server = express();

server.use(express.json());
server.use(cors());

//Mount routes
server.use("/users", usersRoutes);
server.use("/home", homeRoutes);
server.use("/products", productsRoutes);
const swaggerFile = require("./swagger.json");

//Documentation setup
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
const llega = () => {
  return;
}

server.post("/upload", userIsAuthenticated, upload.single("file"),function (req, res) {
  console.log("Req file es:", req.file);
  const file = req.file;
 
  res.send({
    message: "Uploaded!",
    url: file.location,
    name: file.key,
    type: file.mimetype,
    size: file.size,
  });
});

server.post("/uploadUser", uploadUser.single("file"),function (req, res) {
  const file = req.file;
  res.send({
    message: "Uploaded!",
    url: file.location,
    name: file.key,
    type: file.mimetype,
    size: file.size,
  });
});

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}
   You can find the docs at http://localhost:${process.env.PORT || 7500}/docs`
);
