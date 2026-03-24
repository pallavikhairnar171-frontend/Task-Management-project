import themModel from "../models/theme.model.js";

export const createTheme = async (req, res) => {
  const { name, mode, userId, ...rBody } = req.body;

  if (!name || !mode || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide required theme details",
    });
  }

  try {
    // check if same theme already exists for user
    const existingTheme = await themModel.findOne({
      userId,
      mode,
    });

    if (existingTheme) {
      return res.status(409).json({
        success: false,
        message: "Theme already exists for this user",
      });
    }

    const newTheme = await themModel.create({
      name,
      mode,
      userId,
     ...rBody
    });

    return res.status(201).json({
      success: true,
      message: "Theme added successfully!",
      theme: newTheme,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTheme = async (req, res) => {
    const { themeId, ...data } = req.body;

  if (!themeId) {
    return res.status(400).json({
      success: false,
      message: "themeId is required",
    });
  }

  // prevent updating protected fields
  delete data.userId;
  delete data._id;

  try {
    console.log(themeId,data,"===update theme=")
    const updatedTheme = await themModel.findByIdAndUpdate(
      themeId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTheme) {
      return res.status(404).json({
        success: false,
        message: "Theme not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Theme updated successfully!",
      theme: updatedTheme,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

};

export const getProject = async(req,res)=>{
  const {userId} =req.params
  try{
    const existingTheme = await themModel.findOne({
       userId,
       
     });
     if(!existingTheme) return res.status(404).json({success:false,message:"Theme not exist"})
     return res.status(200).json({success:true,message:"Theme faitch successfully",theme:existingTheme})

  }catch(err){
    return res.status(500).json({success:false,message:err.message})
  }
}
