import { getPostData, getSortedPostsData } from '../../../lib/posts'
import Link from 'next/link'
import TableOfContents from './TableOfContents'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({ id: post.id }))
}

export default async function Post({ params }) {
  const { id } = await params
  const postData = await getPostData(id)

  return (
    <div className="site-layout">
      <main className="main-content">
        <div className="fade-up">
          <Link href="/" className="back-link">← 一覧に戻る</Link>
          <article>
            <header className="article-header">
              <div className="article-date">{postData.date}</div>
              <h1 className="article-title">{postData.title}</h1>
              {postData.tags.length > 0 && (
                <div className="article-tags">
                  {postData.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/?tag=${encodeURIComponent(tag)}`}
                      className="article-tag"
                      style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>
            <hr className="article-divider" />
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </article>
        </div>
      </main>

      <aside className="sidebar">
        {postData.headings.length > 0 && (
          <div className="sidebar-section fade-up delay-1">
            <div className="sidebar-label">目次</div>
            <TableOfContents headings={postData.headings} />
          </div>
        )}

        <div className="sidebar-section fade-up delay-2">
          <div className="sidebar-label">タグ</div>
          {postData.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="sidebar-tag"
              style={{ display: 'inline-block' }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )
}