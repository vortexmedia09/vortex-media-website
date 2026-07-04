import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Blog({ single = false, slug = null }) {
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (single && slug) loadPost()
    else loadPosts()
  }, [slug])

  async function loadPosts() {
    const { data } = await supabase.from('vx_blog_posts')
      .select('id,title,slug,excerpt,category,cover_image,featured,author,created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  async function loadPost() {
    const { data } = await supabase.from('vx_blog_posts')
      .select('*').eq('slug', slug).eq('published', true).single()
    setPost(data)
    setLoading(false)
  }

  if (loading) return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:32, height:32, border:'2px solid rgba(255,255,255,0.1)', borderTop:'2px solid var(--accent)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
    </div>
  )

  // Single post view
  if (single && post) return (
    <article style={{ maxWidth:720, margin:'0 auto', padding:'140px 24px 80px' }}>
      <a href="/blog" style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,0.4)', textDecoration:'none', display:'block', marginBottom:24 }}>← Back to Blog</a>
      {post.cover_image && <img src={post.cover_image} alt={post.title} style={{ width:'100%', borderRadius:16, marginBottom:32, aspectRatio:'16/9', objectFit:'cover' }} />}
      <div style={{ fontSize:11, fontWeight:700, color:'var(--accent)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>{post.category}</div>
      <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,5vw,48px)', fontWeight:700, lineHeight:1.1, letterSpacing:'-0.03em', color:'#fff', marginBottom:16 }}>{post.title}</h1>
      <div style={{ display:'flex', gap:12, fontSize:12, color:'rgba(255,255,255,0.3)', marginBottom:40 }}>
        <span>{post.author || 'Vortex Media'}</span>
        <span>·</span>
        <span>{new Date(post.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
      </div>
      <div style={{ fontSize:16, lineHeight:1.8, color:'rgba(255,255,255,0.7)' }}>
        {post.content?.split('\n\n').map((para, i) => {
          if (para.startsWith('## ')) return <h2 key={i} style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:700, color:'#fff', margin:'32px 0 16px', letterSpacing:'-0.02em' }}>{para.slice(3)}</h2>
          if (para.startsWith('# ')) return <h1 key={i} style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:700, color:'#fff', margin:'40px 0 20px', letterSpacing:'-0.03em' }}>{para.slice(2)}</h1>
          if (para.startsWith('### ')) return <h3 key={i} style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color:'#fff', margin:'24px 0 12px' }}>{para.slice(4)}</h3>
          return <p key={i} style={{ marginBottom:20 }}>{para}</p>
        })}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </article>
  )

  // Blog listing
  return (
    <section style={{ padding:'140px 24px 80px', maxWidth:1100, margin:'0 auto' }}>
      <div style={{ overflow:'hidden', marginBottom:8 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--accent)' }}>Our Blog</div>
      </div>
      <div style={{ overflow:'hidden', marginBottom:48 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,56px)', fontWeight:700, lineHeight:1.06, letterSpacing:'-0.04em', color:'#fff', margin:0 }}>
          Insights & Stories<span style={{ color:'var(--accent)' }}>.</span>
        </h2>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:'rgba(255,255,255,0.3)' }}>No posts yet — check back soon.</div>
      ) : (
        <div style={{ display:'grid', gap:24 }}>
          {/* Featured post */}
          {posts.filter(p => p.featured)[0] && (
            <a href={'/blog/' + posts.filter(p=>p.featured)[0].slug} style={{ textDecoration:'none', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, padding:32, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, transition:'background 0.3s' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.07)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'}>
              {posts.filter(p=>p.featured)[0].cover_image && (
                <img src={posts.filter(p=>p.featured)[0].cover_image} alt="" style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', borderRadius:12 }} />
              )}
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ fontSize:10, fontWeight:700, color:'var(--accent)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Featured · {posts.filter(p=>p.featured)[0].category}</div>
                <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(22px,3vw,32px)', fontWeight:700, color:'#fff', lineHeight:1.2, letterSpacing:'-0.02em', marginBottom:12 }}>{posts.filter(p=>p.featured)[0].title}</h3>
                <p style={{ fontSize:14, color:'rgba(255,255,255,0.45)', lineHeight:1.7, marginBottom:20 }}>{posts.filter(p=>p.featured)[0].excerpt}</p>
                <span style={{ fontSize:12, color:'var(--accent)', fontWeight:600 }}>Read more →</span>
              </div>
            </a>
          )}

          {/* Rest of posts */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
            {posts.filter(p => !p.featured).map(post => (
              <a key={post.id} href={'/blog/' + post.slug} style={{ textDecoration:'none', display:'block', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, overflow:'hidden', transition:'transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.2)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}>
                {post.cover_image && <img src={post.cover_image} alt="" style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover' }} />}
                <div style={{ padding:20 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:'var(--accent)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:8 }}>{post.category}</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:8, letterSpacing:'-0.01em' }}>{post.title}</h3>
                  {post.excerpt && <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', lineHeight:1.6, marginBottom:12 }}>{post.excerpt.slice(0,100)}...</p>}
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.25)' }}>{new Date(post.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  )
}
