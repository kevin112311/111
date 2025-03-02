export default async function handler(req, res) {
    const { s } = req.query;
    res.status(200).json({ s });
}