import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home() {
 
  return (
    <div>
      <Head>
        <title>Developer Blog</title>
        
      </Head>
      <h2>Hello</h2>
      </div>

      
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts

  const posts = files.map(item => {
    // slug
    const slug = item.replace('.md','')
   // Get Frontmatter
   const markdownData = fs.readFileSync(
    path.join('posts', item),'utf-8'
   )

  const {data: frontmatter} = matter(markdownData)
  return {
    slug,
    frontmatter
  }
 })

console.log(posts)
  return {
    props: {posts: 'Hello world'}
  }

}
