export default async function handler(req, res) {
    const { slug } = req.query;
    res.status(200).json({ slug });
}