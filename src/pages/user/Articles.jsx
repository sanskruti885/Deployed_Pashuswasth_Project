import React, { useEffect, useState } from "react";
import axios from "axios";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/articles")
            .then((response) => setArticles(response.data))
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-green-800">Educational Articles</h2>
            <p className="text-gray-600">Expand your knowledge with our curated articles on cattle health, nutrition, and care.</p>

            {/* Article Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Health</span>
                            <h3 className="text-xl font-semibold mt-2">{article.title}</h3>
                            <p className="text-gray-600">{article.snippet}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-500">{article.source}</span>
                                <a href={article.link} className="text-green-700 font-medium">Read More →</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;
