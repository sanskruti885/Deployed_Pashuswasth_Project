import HomeRemedies from "../model/RemediesModel.js";
import BasicCare from "../model/BasicCareModel.js";
// -------GET DATABASE LINKS AND SYMPTOM-----------
export const getRemedies = async (req,res,next) =>{
    try{
        const remedies = await HomeRemedies.find({},'symptom link')
        res.status(200).json({sucess:true, data: remedies})
    }catch(err){
        next(err)
    }
}
export const basicCare = async (req,res,next) =>{
    try{
        const remedies = await BasicCare.find({},'care_topic description youtube_link')
        res.status(200).json({sucess:true, data: remedies})
    }catch(err){
        next(err)
    }
}


export default {getRemedies,basicCare}