import Insurance from "../model/insuranceModel.js";

export const showInsurance = async (req, res) => {
    try {
      const insurance = await Insurance.find({});
      console.log(insurance);
      res.json(insurance);
    } catch (err) {
        console.error("Error fetching insurance data:", err); // Log actual error to console
      res.status(500).json({ error: "Server error" });
    }
  }

export default {showInsurance}