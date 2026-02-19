import { useState } from "react";

function ArticleManager() {
  const [articles, setArticles] = useState([
    { id: 1, title: "First", summary: "First summary", display: "none" },
    { id: 2, title: "Second", summary: "Second summary", display: "none" },
  ]);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const onClickAdd = () => {
    if (!title.trim() || !summary.trim()) return;

    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      summary: summary.trim(),
      display: "none",
    };

    setArticles((prev) => [newArticle, ...prev]);
    setTitle("");
    setSummary("");
  };

  const onClickRemove = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const onClickToggle = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, display: a.display === "none" ? "block" : "none" }
          : a
      )
    );
  };

  return (
    <>
      <section>
        <h1>Articles</h1>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <button onClick={onClickAdd}>Add</button>
      </section>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a
              href={`#${article.id}`}
              title="Toggle Summary"
              onClick={(e) => {
                e.preventDefault();
                onClickToggle(article.id);
              }}
            >
              {article.title}
            </a>

            <button onClick={() => onClickRemove(article.id)}>×</button>

            <p style={{ display: article.display }}>{article.summary}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ArticleManager;
