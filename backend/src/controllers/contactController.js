const contactController = {};
import categoryModel from "../models/contact.js";

// SELECT
contactController.getcontact = async (req, res) => {
  const contact = await contactModel.find();
  res.json(contact);
};

// INSERT
contactController.createcontact = async (req, res) => {
  const { email, message } = req.body;
  const newContact = new contactModel({ email, message });
  await newContact.save();
  res.json({ message: "contact saved" });
};

// DELETE
contactController.deletecontact = async (req, res) => {
  const deletedcontact = await contactModel.findByIdAndDelete(req.params.id);
  if (!deletedcontact) {
    return res.status(404).json({ message: "contact not found" });
  }
  res.json({ message: "deleted contact" });
};

// UPDATE
contactController.updatecontact = async (req, res) => {
  // Solicito todos los valores
  const { email, message } = req.body;
  // Actualizo
  await contactModel.findByIdAndUpdate(
    req.params.id,
    {
        email,
        message
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "contact updated" });
};

export default contactController;