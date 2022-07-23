import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import Link from 'next/link'
import { marked } from 'marked'

export default function PostPage({
    frontmatter :{title,date, cover_image}, 
    slug, 
    content
}) {
  return (
    <>
    <Link href='/'>
        <a className='btn btn-back'>back</a>
    </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <img src={cover_image} alt=''/>
        <div className='post-body'>
            <div dangerouslySetInnerHTML={{ __html: marked(content)}}></div>

        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('Posts'))

    const paths = files.map((item) =>({
        params: {
            slug: item.replace('.md', '')

        }
    }) )
    
    return {
        paths,
        fallback: false
    }


}

export async function getStaticProps({params:{slug}}) {
    const markdownData = fs.readFileSync(path.join('posts',slug + '.md'), 'utf-8')
   
    const {data: frontmatter, content} = matter(markdownData)

    return{
        props:{frontmatter, content, slug}
    }

}


