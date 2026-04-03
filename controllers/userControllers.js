import connection from "../database.js"
import bcrypt from "bcryptjs"

// GET ALL USERS
export const getUsers = async (req, res) => {
    try {
        const [users] = await connection.query(
            `SELECT id, username, email, id_company FROM users`
        )
        
        res.status(200).json({
            ok: true,
            message: "berhasil fetch user",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// GET USER BY ID
export const getUsersById = async (req, res) => {
    try {
        const [user] = await connection.query(
            `SELECT id, username, email, id_company FROM users WHERE id = ?`,
            [req.params.id]
        )

        if (user.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "user tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            message: "berhasil fetch user by id",
            data: user[0]
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// ADD USER
export const addUser = async (req, res) => {
    try {
        const { username, email, password, id_company } = req.body

        if (!username || !email || !password || !id_company) {
            return res.status(400).json({
                ok: false,
                message: "semua field wajib diisi"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const [result] = await connection.query(
            `INSERT INTO users (username,email,password,id_company)
                VALUES (?,?,?,?)`,
            [username, email, hashedPassword, id_company]
        )

        res.status(201).json({
            ok: true,
            message: "user created",
            user_id: result.insertId
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        const { username, email, password, id_company } = req.body

        let result
        const hashedPassword = await bcrypt.hash(password, 10)

        if (password) {
            [result] = await connection.query(
                `UPDATE users SET username=?, email=?, password=?, id_company=? WHERE id=?`,
                [username, email, hashedPassword, id_company, req.params.id]
            )
        } else {
            [result] = await connection.query(
                `UPDATE users SET username=?, email=?, id_company=? WHERE id=?`,
                [username, email, id_company, req.params.id]
            )
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "user tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            message: "user updated"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const [result] = await connection.query(
            `DELETE FROM users WHERE id=?`,
            [req.params.id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "user tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            message: "user deleted"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}