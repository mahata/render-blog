import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArticleRepository } from "../../repository/useArticleRepository";
import { Article } from "../../types/Article";

export default function TopPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { getAll } = useArticleRepository();

  useEffect(() => {
    getAll()
      .then((articles) => setArticles(articles))
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
      });
  }, [getAll]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold leading-5">Articles</h2>
      <div className="w-4/5">
        {articles.map((article) => {
          return (
            <div className="my-6 justify-start" key={article.id}>
              <h2>
                <Link
                  className="text-2xl font-medium leading-4"
                  to={`/articles/${article.id}`}
                >
                  {article.title}
                </Link>
              </h2>
              <p className="my-2">
                {article.content.length <= 200
                  ? article.content
                  : article.content.substring(0, 200) + "..."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
