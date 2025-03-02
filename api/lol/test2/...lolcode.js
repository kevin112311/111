module.exports = async (req, res) => {
    const { lolcode } = req.query;
    res.status(200).json({ lolcode });
}