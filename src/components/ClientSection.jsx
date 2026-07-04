import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const FALLBACK_CLIENTS = [
  { name:'Dr. Vidhi Doshi', industry:'Healthcare', color:'#F2552C' },
  { name:'Nature Cure', industry:'Wellness', color:'#10B981' },
  { name:'Shantivan Sanidhya', industry:'Real Estate', color:'#3B82F6' },
  { name:'Virtual Vision 3D', industry:'Technology', color:'#8B5CF6' },
  { name:'Corbitose', industry:'Technology', color:'#D4A853' },
]

export default function ClientSection() {
  const [clients, setClients] = useState(FALLBACK_CLIENTS)

  useEffect(() => {
    supabase.from('vx_clients').select('id,name,industry,color').then(({data}) => {
      if (data && data.length > 0) setClients(data)
    })
  }, [])

  return (
    <section style={{ padding:'120px 0' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 48px' }}>
        <div style={{ overflow:'hidden', marginBottom:4 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--accent)' }}>The Crew</div>
        </div>
        <div style={{ overflow:'hidden', marginBottom:48 }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,56px)', fontWeight:700, lineHeight:1.06, letterSpacing:'-0.04em', color:'#fff' }}>
            Trusted by brands that dare to grow<span style={{ color:'var(--accent)' }}>.</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:16 }}>
          {clients.map((c,i) => {
            const initials = c.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
            const logoPath = '/clients/' + c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-') + '.png'
            return (
              <div key={c.id||i} style={{
                padding:'24px 20px', borderRadius:16, textAlign:'center',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.06)',
                transition:'background 0.3s, transform 0.3s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.transform='none'}}>
                <div style={{
                  width:56, height:56, borderRadius:14, margin:'0 auto 12px',
                  background: c.color ? c.color+'22' : 'rgba(242,85,44,0.12)',
                  border:'1px solid '+(c.color||'#F2552C')+'33',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  overflow:'hidden',
                }}>
                  <img src={logoPath} alt={c.name}
                    style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <span style={{ display:'none', fontSize:18, fontWeight:800, color:c.color||'#F2552C', width:'100%', height:'100%', alignItems:'center', justifyContent:'center' }}>{initials}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:'#fff', marginBottom:3 }}>{c.name}</div>
                <div style={{ fontSize:10, fontWeight:600, color:c.color||'var(--accent)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{c.industry}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
