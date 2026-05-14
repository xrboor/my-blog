import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home() {
  const allPostsData = getSortedPostsData()
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>My Blog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/posts/${id}`} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {title}
            </Link>
            <br />
            <small style={{ color: '#666' }}>{date}</small>
          </li>
        ))}
      </ul>
    </main>
  )
}