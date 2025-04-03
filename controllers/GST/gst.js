const GST = require('../../models/GST/gst');

exports.createGST = async (req, res) => {
    const { gstPrice } = req.body;

    try {
        const gst = new GST({ gstPrice });
        await gst.save();
        res.status(201).json(gst);
    } catch (error) {
        res.status(500).json({ message: 'Error creating GST', error });
    }
}
exports.updateGST = async (req, res) => {
    const { gstPrice } = req.body;

    try {
        const gst = await GST.findOne().sort({ createdAt: -1 });
        if (!gst) {
            return res.status(404).json({ message: 'GST not found' });
        }

        gst.gstPrice = gstPrice;
        await gst.save();
        res.status(200).json(gst);
    } catch (error) {
        res.status(500).json({ message: 'Error updating GST', error });
    }
}
exports.applyGST = async (req, res) => {
    const { price } = req.body;

    try {
        const gst = await GST.findOne().sort({ createdAt: -1 });
        if (!gst) {
            return res.status(404).json({ message: 'GST not found' });
        }

        const gstPrice = (price * gst.gstPrice) / 100;
        const totalPrice = price + gstPrice;

        res.status(200).json({
            price: totalPrice,
            message: `GST Applied ${gstPrice} on this booking`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error applying GST', error });
    }
};