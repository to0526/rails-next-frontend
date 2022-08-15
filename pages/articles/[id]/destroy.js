import Link from "next/link"
import styles from "./destroy.module.css"
import { useRouter } from "next/router"

export default function Article(props) {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    if (confirm("削除してもよろしいですか？") === false) {
      return false
    }
    const data = {
      id: event.target.id.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = `http://localhost:3000/articles/${event.target.id.value}`
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    alert("destroyed")
    router.push("/articles")
  }

  return (
    <>
      <h1>記事削除</h1>
      <div>ID: {props.article.id}</div>
      <div>タイトル: {props.article.title}</div>
      <div>内容: {props.article.content}</div>
      <div>作成日時: {props.article.created_at}</div>
      <div>更新日時: {props.article.updated_at}</div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="id" name="article[id]" value={props.article.id} />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <Link href="/articles">
        <a className={styles.link}>記事一覧</a>
      </Link>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/articles/${context.params.id}`)
  const article = await res.json()
  return {
    props: {
      article: article
    }
  }
}
