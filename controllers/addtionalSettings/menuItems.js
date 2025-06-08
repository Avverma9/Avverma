const MenuItem = require("../../models/additionalSettings/menuItem");

exports.addMenu = async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        await menuItem.save();
        res.status(201).json({ message: 'Menu item added successfully', menuItem });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// 🔹 Add bulk menu items
exports.addMenuBulk = async (req, res) => {
    try {
        const data = req.body; // should be an array
        if (!Array.isArray(data)) {
            return res.status(400).json({ error: 'Data should be an array' });
        }

        const insertedItems = await MenuItem.insertMany(data);
        res.status(201).json(insertedItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteMenuById = async (req, res) => {
    try {
        const { id } = req.params
        await MenuItem.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}