import connection from "../database.js"

export const getUsers = async (req, res) => {
    const [users] = await connection.query(`SELECT * FROM users`)

    res.status(200).json({
        ok: true,
        message: "berhasil fetch user",
        data: users
    })
}

export const getUsersById = async (req, res) => {
    const [user] = await connection.query(
        `SELECT * FROM users WHERE id = ?`,
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
}

export const addUser = async (req, res) => {
    const { username, email, password, company_id } = req.body

    const [result] = await connection.query(
        `INSERT INTO users (username,email,password,company_id)
        VALUES (?,?,?,?)`,
        [username, email, password, company_id]
    )

    res.status(201).json({
        ok: true,
        message: "user created",
        user_id: result.insertId
    })
}

export const updateUser = async (req, res) => {

    const { username, email, password, company_id } = req.body

    const [result] = await connection.query(
        `UPDATE users 
        SET username=?, email=?, password=?, company_id=? 
        WHERE id=?`,
        [username, email, password, company_id, req.params.id]
    )

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
}

export const deleteUser = async (req, res) => {
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
}

