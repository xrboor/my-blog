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
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: '#111110',
          zIndex: 10,
        }}>
          <a href="/" style={{
            color: '#f0ede6',
            fontSize: '15px',
            fontWeight: '500',
            letterSpacing: '0.02em',
          }}>
            My Blog
          </a>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </header>
        <main style={{ maxWidth: '680px', margin: '0 auto', padding: '64px 40px' }}>
          {children}
        </main>
        <footer style={{
          borderTop: '0.5px solid #2c2c2a',
          padding: '32px 40px',
          textAlign: 'center',
          color: '#5f5e5a',
          fontSize: '12px',
        }}>
          © {new Date().getFullYear()} My Blog
        </footer>
      </body>
    </html>
  )
}