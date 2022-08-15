import Link from "next/link"
import styles from "./edit.module.css"
import { useRouter } from "next/router"

export default function EditForm(props) {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      id: event.target.id.value,
      title: event.target.title.value,
      content: event.target.content.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = `http://localhost:3000/articles/${event.target.id.value}`
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    router.push("/articles")
    alert("updated")
  }

  return (
    <>
      <h1>編集フォーム</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="id" name="article[id]" value={props.article.id} />
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="article[title]" defaultValue={props.article.title} />
        <br />
        <label htmlFor="content">内容</label>
        <textarea id="content" name="article[content]" defaultValue={props.article.content} />
        <br />
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
