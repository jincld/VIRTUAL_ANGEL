import orderModel from "../models/order.js";

const dashboardController = {};

// Gráfico de líneas: ventas por mes y tipo (camisas, pantalones, chaquetas, suéteres)
dashboardController.getSalesData = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("idProducts");

    const salesByMonth = {};

    orders.forEach(order => {
      const month = new Date(order.date).toLocaleString('default', { month: 'short' }).toUpperCase();

      if (!salesByMonth[month]) {
        salesByMonth[month] = { month, shirts: 0, pants: 0, jackets: 0, sweaters: 0 };
      }

      order.idProducts.forEach(product => {
        const category = product.category.toLowerCase();

        if (category.includes("shirt")) salesByMonth[month].shirts += 1;
        else if (category.includes("pant")) salesByMonth[month].pants += 1;
        else if (category.includes("jacket")) salesByMonth[month].jackets += 1;
        else if (category.includes("sweater")) salesByMonth[month].sweaters += 1;
      });
    });

    const result = Object.values(salesByMonth).sort((a, b) =>
      new Date(`1 ${a.month} 2023`) - new Date(`1 ${b.month} 2023`)
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error generating sales data", error: error.message });
  }
};

// Gráfico de pastel: porcentaje por colección
dashboardController.getCollectionData = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("idProducts");

    const collectionCount = {};

    orders.forEach(order => {
      order.idProducts.forEach(product => {
        const collection = product.collection || "Other";
        collectionCount[collection] = (collectionCount[collection] || 0) + 1;
      });
    });

    const total = Object.values(collectionCount).reduce((acc, val) => acc + val, 0);

    const result = Object.entries(collectionCount).map(([name, count]) => ({
      name,
      value: parseFloat(((count / total) * 100).toFixed(1)),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error generating collection data", error: error.message });
  }
};

export default dashboardController;
