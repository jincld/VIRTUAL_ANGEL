const assessmentController = {};
import assessmentModel from "../models/assessment.js";

//select
assessmentController.getAssessment = async (req, res) => {
    const assessments = await assessmentModel.find().populate("idCustomer")
    res.json(assessments)
}

//insert
assessmentController.insertAssessment = async (req, res) => {
    const {idCustomer, idProducts, comment, assessment} = req.body;
    const newAssessment = new assessmentModel ({idCustomer, idProducts, comment, assessment})
    await newAssessment.save()
    res.json({message: "Assessment saved"})
}

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