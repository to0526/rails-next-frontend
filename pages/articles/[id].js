export default function Article(props) {
  return (
    <>
      <h1>記事詳細</h1>
      <div>ID: {props.article.id}</div>
      <div>タイトル: {props.article.title}</div>
      <div>内容: {props.article.content}</div>
      <div>作成日時: {props.article.created_at}</div>
      <div>更新日時: {props.article.updated_at}</div>
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
