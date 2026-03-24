import connection from "../database.js"

export const getCompanies = async (req, res) => {
    const [companies] = await connection.query(
        `SELECT * FROM company`
    )

    res.status(200).json({
        ok: true,
        data: companies
    })
}

export const getCompanyById = async (req, res) => {
    const [company] = await connection.query(
        `SELECT * FROM company WHERE id_company=?`,
        [req.params.id]
    )

    if (company.length === 0) {
        return res.status(404).json({
            ok: false,
            message: "company not found"
        })
    }

    res.status(200).json({
        ok: true,
        data: company[0]
    })
}

export const addCompany = async (req, res) => {
    const { name, address } = req.body

    const [result] = await connection.query(
        `INSERT INTO company (name, address)
        VALUES (?, ?)`,
        [name, address]
    )

    res.status(201).json({
        ok: true,
        message: "company created",
        id: result.insertId
    })
}

export const updateCompany = async (req, res) => {
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
}

export const deleteCompany = async (req, res) => {
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
}