import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export const register = (req, res) => {

     // Проверка на обязательные поля
     if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json("Все поля должны быть заполнены");
    }

    // Проверка длины полей
    if (req.body.username.length < 3 || req.body.username.length > 20) {
        return res.status(400).json("Логин должен содержаить от 3 до 20 символов");
    }
    if (req.body.password.length < 6 || req.body.password.length > 20) {
        return res.status(400).json("Пароль должен содержать от 6 до 20 символов");
    }
    // //CHECK EXISTING USER

    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("Данный пользователь уже существует");

        //Hash the password and create a user

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`)VALUES(?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        })
    });
};

export const login = (req, res) => {

    //CHECK USER

    const q = "SELECT*FROM users WHERE email=? OR username=?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //CHECK Password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) 
        return res.status(400).json("Неверный логин или пароль");


        //jsonwebtoken                                  

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];


        //cookie 
        res.cookie("access_token",token, {
            httpOnly: true,
        })
        .status(200)
        .json(other);

    });
};
export const logout = (req, res) => {

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has beet logget out ")
}
