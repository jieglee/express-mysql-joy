import connection from "../database.js"

// GET ALL
export const getCompanies = async (req, res) => {
    try {
        const [companies] = await connection.query(`SELECT * FROM company`)

        res.status(200).json({
            ok: true,
            data: companies
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// GET BY ID
export const getCompanyById = async (req, res) => {
    try {
        const [company] = await connection.query(
            `SELECT * FROM company WHERE id_company=?`,
            [req.params.id]
        )

        if (company.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "company tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            data: company[0]
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// ADD
export const addCompany = async (req, res) => {
    try {
        const { name, address } = req.body

        if (!name) {
            return res.status(400).json({
                ok: false,
                message: "nama wajib diisi"
            })
        }

        const [result] = await connection.query(
            `INSERT INTO company (name,address)
                VALUES (?,?)`,
            [name, address]
        )

        res.status(201).json({
            ok: true,
            message: "company created",
            id: result.insertId
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// UPDATE
export const updateCompany = async (req, res) => {
    try {
        const { name, address } = req.body

        const [result] = await connection.query(
            `UPDATE company SET name=?, address=? WHERE id_company=?`,
            [name, address, req.params.id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "company tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            message: "company updated"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

// DELETE
export const deleteCompany = async (req, res) => {
    try {
        const [result] = await connection.query(
            `DELETE FROM company WHERE id_company=?`,
            [req.params.id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                message: "company tidak ditemukan"
            })
        }

        res.status(200).json({
            ok: true,
            message: "company deleted"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}