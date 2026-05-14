import { getPostData, getSortedPostsData } from '../../../lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function Post({ params }) {
  const { id } = await params
  const postData = await getPostData(id)
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link href="/">← 一覧に戻る</Link>
      <h1>{postData.title}</h1>
      <small style={{ color: '#666' }}>{postData.date}</small>
      <div
        style={{ marginTop: '2rem', lineHeight: '1.8' }}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </main>
  )
}