import { useState } from "react";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

function ArticleManager() {
  const [articles, setArticles] = useState([
    { id: 1, title: "First", summary: "First summary" },
    { id: 2, title: "Second", summary: "Second summary" },
  ]);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const onClickAdd = () => {
    if (!title.trim() || !summary.trim()) return;

    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      summary: summary.trim(),
    };

    setArticles((prev) => [newArticle, ...prev]);
    setTitle("");
    setSummary("");
  };

  const onClickRemove = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <AddArticle
        name="Articles"
        title={title}
        summary={summary}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeSummary={(e) => setSummary(e.target.value)}
        onClickAdd={onClickAdd}
      />

      <ArticleList articles={articles} onClickRemove={onClickRemove} />
    </>
  );
}

export default ArticleManager;
