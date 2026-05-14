import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      id,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      tags: matterResult.data.tags || [],
      excerpt: matterResult.data.excerpt || '',
    }
  })
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllTags() {
  const posts = getSortedPostsData()
  const tagSet = new Set()
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet)
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content)
  let contentHtml = processedContent.toString()

  const headings = []
  contentHtml = contentHtml.replace(/<h([23])>(.*?)<\/h[23]>/g, (_, level, text) => {
    const id = text.toLowerCase().replace(/\s+/g, '-')
    headings.push({ level: parseInt(level), text })
    return `<h${level} id="${id}">${text}</h${level}>`
  })

  return {
    id,
    contentHtml,
    headings,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
  }
}