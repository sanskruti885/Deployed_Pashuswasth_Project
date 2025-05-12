import Disease from "../model/diseasesModel.js";

export const showDiseases = async (req, res) => {
    try {
      const diseases = await Disease.find({});
      console.log(diseases);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

export default {showDiseases}