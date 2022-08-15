import Link from "next/link"
import styles from "./index.module.css"

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
              <td>
                <Link href={`/articles/${article.id}`}>
                  <a className={styles.link}>{article.title}</a>
                </Link>
              </td>
              <td>{article.content}</td>
              <td>{article.created_at}</td>
              <td>{article.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <Link href="/articles/new">
        <a className={styles.link}>新規登録フォーム</a>
      </Link>
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
