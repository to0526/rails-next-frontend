export default function Articles(props) {
  return (
    <>
      <h1>記事一覧</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>内容</th>
            <th>作成日時</th>
            <th>更新日時</th>
          </tr>
        </thead>
        <tbody>
          { props.articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.created_at}</td>
              <td>{article.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/articles")
  const articles = await res.json()
  return {
    props: {
      articles: articles
    }
  }
}
