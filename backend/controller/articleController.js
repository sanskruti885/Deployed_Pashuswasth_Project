import Articles from "../model/articleModel.js";

export const showArticles = async (req, res) => {
    try {
      const articles = await Articles.find({});
      console.log(articles);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }

export default {showArticles}