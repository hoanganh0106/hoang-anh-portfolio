import Link from 'next/link'
import Localized from '@/components/language/Localized'

export default function NotFound(){
  return <section className="container empty"><p className="eyebrow">404 / NOT FOUND</p><h1><Localized en="This node does not exist." vi="Node này không tồn tại." /></h1><p><Localized en="The route may be a future direction or an unpublished project." vi="Route này có thể là một future direction hoặc một project chưa được công bố." /></p><Link className="text-link" href="/"><Localized en="Return home" vi="Về trang chủ" /> →</Link></section>
}
