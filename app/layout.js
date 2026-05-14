import './globals.css'

export const metadata = {
  title: 'My Blog',
  description: '私のブログです。',
}

export default function RootLayout({ children }) {
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
            <div className="search-box">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span style={{ color: '#5f5e5a', fontSize: '12px' }}>検索...</span>
            </div>
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