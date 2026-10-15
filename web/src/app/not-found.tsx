import Link from 'next/link'
import Localized from '@/components/language/Localized'

export default function NotFound() {
  return (
    <section className="container empty">
      <p className="eyebrow">404</p>
      <h1><Localized en="This page does not exist." vi="Trang này không tồn tại." /></h1>
      <p><Localized en="The link may be out of date, or the page has moved." vi="Đường dẫn có thể đã cũ, hoặc trang đã được chuyển đi." /></p>
      <Link className="button button--primary" href="/"><Localized en="Return home" vi="Về trang chủ" /></Link>
    </section>
  )
}
