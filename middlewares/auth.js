const jwt = require("jsonwebtoken");
const db = require("../models/index");
const data = require("../Data/userData.json");

exports.userIsAuthenticated = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            try {
                const decryptedToken = jwt.verify(token, process.env.JWT_KEY);
                   let array = data;
                   const user = array.filter(e => e.email == decryptedToken.userEmail);
                if (user.length === 0) {
                    res.status(401).json({
                        error: true,
                        message: "Las credenciales brindadas no son válidas."
                    });
                }
                else {
                    req.user = decryptedToken; //raro
                    next();
                }
            } catch (error) {
                res.status(401).json({
                    error: true,
                    message: "Las credenciales brindadas no son válidas o su sesión ha expirado."
                });
            }
        }
        else {
            res.status(401).json({
                error: true,
                message: "El usuario no está autenticado."
            });
        }
    }
    else {
        res.status(401).json({
            error: true,
            message: "El usuario no está autenticado."
        });
    }
}

