const ProductsType = require('./../models/ProductsType');

const createTypes = async (req, res) => {
    try {
        const type = new ProductsType(req.body);
        await type.save();
        res.status(200).json({ message: 'Tipo de producto creado exitosamente', type });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

const editTypes = async (req, res) => {
    try {
        const { id } = req.params;
        const editedType = await ProductsType.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Tipo de producto editado existosamente', type: editedType });
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

const deleteTypes = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductsType.deleteOne({ _id: id });
        res.status(200).json({ message: 'Tipo de producto eliminado existosamente'});
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
};

module.exports = {
    createTypes,
    editTypes,
    deleteTypes,
};