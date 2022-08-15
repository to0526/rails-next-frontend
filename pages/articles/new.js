import Link from "next/link"
import styles from "./new.module.css"
import { useRouter } from "next/router"

export default function CreateForm() {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      title: event.target.title.value,
      content: event.target.content.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = "http://localhost:3000/articles"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    router.push("/articles")
    alert("created")
  }

  return (
    <>
      <h1>登録フォーム</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" name="article[title]" />
        <br />
        <label htmlFor="content">内容</label>
        <textarea id="content" name="article[content]" />
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

