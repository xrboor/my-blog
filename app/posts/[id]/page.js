import { getPostData, getSortedPostsData } from '../../../lib/posts'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({ id: post.id }))
}

export default async function Post({ params }) {
  const { id } = await params
  const postData = await getPostData(id)
  return (
    <div className="fade-up">
      <Link href="/" className="back-link">
        ← 一覧に戻る
      </Link>

      <article>
        <header style={{ marginBottom: '40px' }}>
          <p style={{
            color: '#5f5e5a',
            fontSize: '12px',
            letterSpacing: '0.06em',
            marginBottom: '16px',
          }}>
            {postData.date}
          </p>
          <h1 style={{
            color: '#f0ede6',
            fontSize: '26px',
            fontWeight: '500',
            lineHeight: '1.4',
            letterSpacing: '-0.01em',
          }}>
            {postData.title}
          </h1>
        </header>

        <hr style={{
          border: 'none',
          borderTop: '0.5px solid #2c2c2a',
          marginBottom: '40px',
        }} />

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  )
}