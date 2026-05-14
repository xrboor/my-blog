import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home() {
  const allPostsData = getSortedPostsData()
  return (
    <>
      <div className="fade-up" style={{ marginBottom: '56px' }}>
        <p style={{
          color: '#5f5e5a',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Writing
        </p>
        <h1 style={{
          color: '#f0ede6',
          fontSize: '32px',
          fontWeight: '500',
          lineHeight: '1.2',
          letterSpacing: '-0.01em',
        }}>
          思考の断片を、<br />言葉に残す場所。
        </h1>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {allPostsData.map(({ id, date, title }, i) => (
          <li key={id} className={`fade-up fade-up-delay-${Math.min(i + 1, 5)}`}>
            <Link href={`/posts/${id}`} className="post-link">
              <span className="post-title">{title}</span>
              <span style={{ color: '#5f5e5a', fontSize: '12px', whiteSpace: 'nowrap' }}>
                {date}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}