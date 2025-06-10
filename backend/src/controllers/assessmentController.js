const assessmentController = {};
import assessmentModel from "../models/assessment.js";

//select
assessmentController.getAssessment = async (req, res) => {
    const assessments = await assessmentModel.find().populate("idCustomer")
    res.json(assessments)
}

// getbyid
assessmentController.getAssessmentByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const assessments = await assessmentModel
      .find({ idProducts: id })
      .populate("idCustomer", "name"); // <-- Esto es lo que faltaba

    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};



//insert
assessmentController.insertAssessment = async (req, res) => {
    const { idProducts, comment, assessment } = req.body; 
    const idCustomer = req.user.idCustomer;  // Accedemos al id del cliente desde el middleware
  
    const newAssessment = new assessmentModel({
      idCustomer,
      idProducts,
      comment,
      assessment
    });
  
    await newAssessment.save();
    res.json({ message: "Assessment saved" });
};

  

//delete
assessmentController.deleteAssessment = async (req, res) => {
    await assessmentModel.findByIdAndDelete(req.params.id)
    res.json({message: "Assessment deleted"})
}

//update
assessmentController.updateAssessment = async (req, res) => {
    const{idCustomer, idProducts, comment, assessment} = req.body;
    await assessmentModel.findByIdAndUpdate(req.params.id,
        {idCustomer, idProducts, comment, assessment}, {new:true}
    );
    res.json({message: "Assessment updated"});
};

export default assessmentController;