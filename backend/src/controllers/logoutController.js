const logoutController = {};

logoutController.logout = async (req, res) => {
    //Borrar cookie de authToker
    res.clearCookie("authToken")

    return res.json({message: "Logged out"})
}

export default logoutController;