const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const db = require("../models/index");
const data = require("../Data/userData.json");
const user = require("../models/user");

const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const userPayload = req.body;



    let token = jwt.sign(
      { userEmail: userPayload.email },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );



    let array = data;
    const user = array.filter(e => e.email === userPayload.email);
    if(user.length === 0){
    const newUser = [
      id = new Date().getTime(),
      email = userPayload.email,
      contrasena = await bcrypt.hash(userPayload.contrasena, saltRounds),
      phone = userPayload.phone,
      picture = userPayload.picture,
      token = token
    ];
   res.status(200).send(newUser);
  }else{
    res.status(409).send("El usuario ya está registrado.");
  }
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al insertar el usuario.",
      error,
    });
    return;
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userPayload = req.body;
    const editUser = [
      name = userPayload.name,
      email = userPayload.email,
      contrasena = "",
      phone = userPayload.phone,
      picture = userPayload.picture
    ];
    let array = data;
    const user = array.filter(e => e.id == userId);
    if(userPayload.contrasena != "" && await bcrypt.hash(userPayload.contrasena, saltRounds) == user.contrasena){
      user.contrasena = await bcrypt.hash(userPayload.nuevaContrasena, saltRounds);
    }

   res.status(200).send(editUser);
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al insertar el usuario.",
      error,
    });
    return;
  }
};

exports.loginUser = async (req, res) => {
 
  try {
    const userPayload = req.body;
    let array = data;
    const user = array.filter(e => e.email == userPayload.email);
    if (!user[0] || !(await bcrypt.compare(userPayload.contrasena, user[0].contrasena))) {
      res.status(401).send("Invalid credentials");
      return;
    }

    const token = jwt.sign(
      { userEmail: user[0].email },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    const result = {
      email: user[0].email,
      name: user[0].name,
      id: user[0].id,
      phone: user[0].phone,
      picture: user[0].picture,
      token
    }
 
  
   res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    let array = data;
    const userPayload = req.body;
    const user = array.filter(e => e.email == userPayload.email);
    if (user.length === 0) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );

    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.setMinutes(nowDate.getMinutes() + 15)
    ).toISOString();

    const result = 
    {
      code: randomToken,
      expirationDate,
    }
    await sendRecoveryCodeEmail(user[0].email, randomToken);

     res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const userPayload = req.body;

  
    const user = array.filter(e => e.email == userPayload.email);
    if (!user || !user.recoveryCode || user.recoveryCode.code !== userPayload.code) 
    {
      res.status(401).send("Datos no válidos");
      return;
    }
    
    if (user.recoveryCode.expirationDate < new Date()) 
    {
      res
        .status(401)
        .send(
          "El código de recuperación brindado ya expiró. Solicite un nuevo código de recuperación."
        );
      return;
   }

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.changePassword = async (req, res) => {
  console.log("Req: ", req.body );
  try {
    if (req.body === null) 
    {
      res.status(204).send("No content");
      return;
    }
    let array = data;
    const userPayload = req.body;

  
    const user = array.filter(e => e.email == userPayload.email);
    if (user.length === 0) 
    {
      res.status(401).send("Datos no válidos");
      return;
    }
    
    if (userPayload.codigoExpiracion < new Date().toISOString()) 
    {
      res
        .status(401)
        .send(
          "El código de recuperación brindado ya expiró. Solicite un nuevo código de recuperación."
        );
      return;
   }
   console.log("LLego al 200");
   res.status(200).send("Contraseña restaurada");

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
}

exports.listUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    res.json(data);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};
