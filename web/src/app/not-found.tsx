import Link from 'next/link'
export default function NotFound(){return <section className="container empty"><p className="eyebrow">404 / NOT FOUND</p><h1>This node does not exist.</h1><p>The route may be a future direction or an unpublished project.</p><Link className="text-link" href="/">Return home →</Link></section>}
