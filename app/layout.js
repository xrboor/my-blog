import './globals.css'
import { getSortedPostsData } from '../lib/posts'
import SearchModal from './SearchModal'

export const metadata = {
  title: 'My Blog',
  description: '私のブログです。',
}

export default function RootLayout({ children }) {
  const allPostsData = getSortedPostsData()

  return (
    <html lang="ja">
      <body>
        <header style={{
          borderBottom: '0.5px solid #2c2c2a',
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '57px',
          position: 'sticky',
          top: 0,
          background: '#111110',
          zIndex: 100,
        }}>
          <a href="/" style={{ color: '#f0ede6', fontSize: '15px', fontWeight: '600', letterSpacing: '0.03em' }}>
            My Blog
          </a>
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <SearchModal posts={allPostsData} />
          </nav>
        </header>
        {children}
        <footer style={{
          borderTop: '0.5px solid #2c2c2a',
          padding: '28px 32px',
          textAlign: 'center',
          color: '#444441',
          fontSize: '12px',
        }}>
          © {new Date().getFullYear()} My Blog — Built with Next.js & Vercel
        </footer>
      </body>
    </html>
  )
}