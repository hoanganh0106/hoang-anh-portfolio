import Link from 'next/link'
import { siteConfig, siteUrl } from '@/lib/site-config'
import { projectsByTrack } from '@/lib/projects'
import Localized, { Tx } from '@/components/language/Localized'
import DeviceArt from '@/components/devices/DeviceArt'
import { DeviceCard, StatusPill } from '@/components/devices/DeviceCard'

export const metadata = { alternates: { canonical: siteUrl ? `${siteUrl}/` : undefined } }

const problems = [
  {
    title: { en: 'Few specialists at the front line', vi: 'Tuyến cơ sở thiếu bác sĩ chuyên khoa' },
    body: {
      en: 'A commune health station is often a patient’s first and only stop, yet heart and lung sounds take years of practice to judge well.',
      vi: 'Trạm y tế xã thường là nơi đầu tiên và duy nhất người bệnh tới khám, nhưng nghe tim phổi cho chuẩn cần nhiều năm kinh nghiệm.',
    },
  },
  {
    title: { en: 'Cloud AI doesn’t reach the village', vi: 'AI cần internet thì không tới được thôn bản' },
    body: {
      en: 'Many smart tools stop working when the connection drops — exactly in the places that need them most.',
      vi: 'Nhiều công cụ thông minh ngừng hoạt động khi mất mạng, mà đó lại chính là những nơi cần chúng nhất.',
    },
  },
  {
    title: { en: 'Imported devices cost too much', vi: 'Thiết bị nhập khẩu quá đắt' },
    body: {
      en: 'Each device uses common, affordable parts so a health station could own one, repair it, and build another.',
      vi: 'Mỗi thiết bị dùng linh kiện phổ biến, giá rẻ để trạm y tế có thể tự mua, tự sửa và làm thêm.',
    },
  },
]

const principles = [
  {
    icon: <path d="M4 9a12 12 0 0 1 16 0M7 12.5a7.5 7.5 0 0 1 10 0M10 16a3 3 0 0 1 4 0M3 3l18 18" />,
    title: { en: 'Works offline', vi: 'Chạy không cần mạng' },
    body: { en: 'The AI runs on the device’s own chip. No signal, no problem.', vi: 'AI chạy trên chip của thiết bị. Mất sóng vẫn dùng được.' },
  },
  {
    icon: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    title: { en: 'Data stays on the device', vi: 'Dữ liệu ở lại trên máy' },
    body: { en: 'Recordings are processed and kept locally, never uploaded by default.', vi: 'Bản ghi được xử lý và lưu tại chỗ, mặc định không tải lên đâu cả.' },
  },
  {
    icon: <><path d="M14.5 5.5a4 4 0 0 0-5 5L4 16v4h4l5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5Z" /></>,
    title: { en: 'Affordable and repairable', vi: 'Rẻ và dễ sửa' },
    body: { en: 'Off-the-shelf parts that a local technician can source and replace.', vi: 'Linh kiện có sẵn trên thị trường, kỹ thuật viên địa phương tự thay được.' },
  },
  {
    icon: <><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="12" cy="17" r="2.5" /><path d="M8.5 9 11 15M15.5 9 13 15M9.5 7h5" /></>,
    title: { en: 'Open to the community', vi: 'Mở cho cộng đồng' },
    body: { en: 'Designs and code are shared as each device reaches a safe, documented stage.', vi: 'Thiết kế và mã nguồn được chia sẻ khi mỗi thiết bị đạt mức an toàn và có tài liệu đầy đủ.' },
  },
]

const steps = [
  { title: { en: 'Sense', vi: 'Thu tín hiệu' }, body: { en: 'Sound, heart rhythm or a hearing response, captured by low-cost sensors.', vi: 'Âm thanh, nhịp tim hay phản hồi thính lực, thu bằng cảm biến giá rẻ.' } },
  { title: { en: 'Clean', vi: 'Làm sạch' }, body: { en: 'Separate overlapping sources and remove the noise of a real clinic.', vi: 'Tách các nguồn chồng lên nhau và loại bỏ tiếng ồn của phòng khám thật.' } },
  { title: { en: 'Decide on the chip', vi: 'Xử lý trên chip' }, body: { en: 'A small model, sized for a microcontroller, highlights what needs attention.', vi: 'Một mô hình nhỏ vừa với vi điều khiển đánh dấu những gì cần chú ý.' } },
  { title: { en: 'Show it here', vi: 'Báo kết quả tại chỗ' }, body: { en: 'A clear result on the device. The clinician makes the call.', vi: 'Kết quả rõ ràng ngay trên thiết bị. Người quyết định vẫn là nhân viên y tế.' } },
]

const audiences = [
  {
    title: { en: 'Doctors and nurses', vi: 'Bác sĩ và điều dưỡng' },
    body: { en: 'Tell me what your clinic actually needs, review a design, or help test a prototype safely.', vi: 'Cho tôi biết phòng khám của bạn thực sự cần gì, góp ý thiết kế, hoặc giúp thử nghiệm nguyên mẫu một cách an toàn.' },
  },
  {
    title: { en: 'Students and engineers', vi: 'Sinh viên và kỹ sư' },
    body: { en: 'Firmware, PCB layout, signal processing, small models — there is a piece for every skill.', vi: 'Firmware, thiết kế mạch in, xử lý tín hiệu, mô hình AI nhỏ — kỹ năng nào cũng có việc để làm.' },
  },
  {
    title: { en: 'Organisations', vi: 'Tổ chức và nhà tài trợ' },
    body: { en: 'Host a pilot at a health station or school, or sponsor parts for the next batch of devices.', vi: 'Thí điểm tại trạm y tế hay trường học, hoặc tài trợ linh kiện cho đợt thiết bị tiếp theo.' },
  },
]

export default function Home() {
  const [flagship, ...devices] = projectsByTrack('device')
  const research = projectsByTrack('research')

  return (
    <div className="home">
      <section className="hero container" aria-labelledby="home-title">
        <div className="hero__copy">
          <p className="tag"><span aria-hidden="true" /><Localized en="Community project · Non-profit" vi="Dự án cộng đồng · Phi lợi nhuận" /></p>
          <h1 id="home-title">
            <Localized
              en={<>Medical devices that think on the spot, <em>for clinics without specialists or internet.</em></>}
              vi={<>Thiết bị y tế tự xử lý AI ngay tại chỗ, <em>cho nơi thiếu bác sĩ chuyên khoa và thiếu mạng.</em></>}
            />
          </h1>
          <p className="hero__lede">
            <Localized
              en={<><strong>{siteConfig.project}</strong> is a student-led project by {siteConfig.name} at Hanoi University of Science and Technology. I design low-cost devices that run AI on the chip itself, so they work offline and patient data never leaves the device.</>}
              vi={<><strong>{siteConfig.project}</strong> là dự án của {siteConfig.nameVi}, sinh viên Đại học Bách khoa Hà Nội. Tôi thiết kế các thiết bị y tế giá rẻ có AI chạy ngay trên chip, nên dùng được khi không có mạng và dữ liệu bệnh nhân không bao giờ rời khỏi máy.</>}
            />
          </p>
          <div className="actions">
            <Link className="button button--primary" href="#devices"><Localized en="See the devices" vi="Xem các thiết bị" /></Link>
            <Link className="button" href="#join"><Localized en="Get involved" vi="Cùng tham gia" /></Link>
          </div>
          <dl className="hero__facts">
            <div><dt><Localized en="devices" vi="thiết bị" /></dt><dd>4</dd></div>
            <div><dt><Localized en="prototype" vi="nguyên mẫu" /></dt><dd>1</dd></div>
            <div><dt><Localized en="internet needed" vi="cần internet" /></dt><dd>0</dd></div>
          </dl>
          <p className="hero__partner">
            <span className="hero__partner-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18" /></svg></span>
            <span><Localized
              en={<><strong>Clinically supported by a hospital in Hanoi.</strong> The partner is not named because this is an internal collaboration.</>}
              vi={<><strong>Được một bệnh viện tại Hà Nội hỗ trợ chuyên môn.</strong> Tên đối tác được giữ kín vì đây là dự án hợp tác nội bộ.</>}
            /></span>
          </p>
        </div>
        <figure className="hero__figure">
          <DeviceArt slug={flagship.slug} />
          <figcaption>
            <StatusPill status={flagship.status} />
            <span><Tx t={flagship.title} /> · <Localized en="design illustration" vi="minh họa thiết kế" /></span>
          </figcaption>
        </figure>
      </section>

      <section className="section section--tinted" aria-labelledby="why-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow"><Localized en="Why this project" vi="Vì sao có dự án này" /></p>
            <h2 id="why-title"><Localized en="A good examination shouldn’t depend on where you live." vi="Được khám kỹ không nên phụ thuộc vào nơi bạn sống." /></h2>
          </div>
          <ol className="problem-grid">
            {problems.map((item, index) => (
              <li key={item.title.en}>
                <span className="problem-grid__num" aria-hidden="true">0{index + 1}</span>
                <h3><Tx t={item.title} /></h3>
                <p><Tx t={item.body} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow"><Localized en="Design principles" vi="Nguyên tắc thiết kế" /></p>
            <h2 id="principles-title"><Localized en="Four rules every device follows." vi="Bốn nguyên tắc cho mọi thiết bị." /></h2>
          </div>
          <ul className="principle-grid">
            {principles.map(item => (
              <li key={item.title.en}>
                <span className="principle-grid__icon" aria-hidden="true"><svg viewBox="0 0 24 24">{item.icon}</svg></span>
                <h3><Tx t={item.title} /></h3>
                <p><Tx t={item.body} /></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="devices" className="section" aria-labelledby="devices-title">
        <div className="container">
          <div className="section__head section__head--split">
            <div>
              <p className="eyebrow"><Localized en="The devices" vi="Các thiết bị" /></p>
              <h2 id="devices-title"><Localized en="One approach, four everyday problems." vi="Một cách tiếp cận, bốn vấn đề thường ngày." /></h2>
            </div>
            <Link className="text-link" href="/projects"><Localized en="All devices and work" vi="Tất cả thiết bị và dự án" /> →</Link>
          </div>
          <DeviceCard project={flagship} featured />
          <div className="device-grid">
            {devices.map(project => <DeviceCard key={project.slug} project={project} />)}
          </div>
          <p className="fine-print"><Localized en="Illustrations are design drawings, not product photos." vi="Hình ảnh là bản vẽ minh họa thiết kế, không phải ảnh chụp sản phẩm." /></p>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="how-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow"><Localized en="How it works" vi="Cách hoạt động" /></p>
            <h2 id="how-title"><Localized en="Every device follows the same four steps — all of them on the device." vi="Mọi thiết bị đều theo bốn bước giống nhau — tất cả diễn ra ngay trên máy." /></h2>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title.en}>
                <span className="steps__num" aria-hidden="true">{index + 1}</span>
                <h3><Tx t={step.title} /></h3>
                <p><Tx t={step.body} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="research-title">
        <div className="container split">
          <div>
            <p className="eyebrow"><Localized en="Research foundation" vi="Nền tảng nghiên cứu" /></p>
            <h2 id="research-title"><Localized en="Built on speech-separation research." vi="Xây trên nền nghiên cứu tách nguồn âm thanh." /></h2>
            <p className="section__lede"><Localized
              en="Telling apart several sounds that overlap — three voices at once, a heartbeat under a breath, a cough in a noisy room — is the same problem. My separation research is the core of the acoustic devices."
              vi="Tách riêng nhiều âm thanh chồng lên nhau — ba giọng nói cùng lúc, tiếng tim lẫn trong tiếng thở, tiếng ho giữa phòng ồn — thực chất là cùng một bài toán. Nghiên cứu tách nguồn của tôi là phần lõi của các thiết bị âm thanh."
            /></p>
            <Link className="text-link" href="/research"><Localized en="Read the research notes" vi="Đọc ghi chú nghiên cứu" /> →</Link>
          </div>
          <ul className="research-list">
            {research.map(project => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <strong><Tx t={project.title} /></strong>
                  <span><Tx t={project.summary} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="founder-title">
        <div className="container founder">
          <span className="founder__avatar" aria-hidden="true">HA</span>
          <div>
            <p className="eyebrow"><Localized en="Who is behind it" vi="Người thực hiện" /></p>
            <h2 id="founder-title"><Localized en={`Hi, I’m ${siteConfig.name}.`} vi={`Chào bạn, tôi là ${siteConfig.nameVi}.`} /></h2>
            <p className="section__lede"><Localized
              en="I’m a third-year Electronics & Telecommunications student at Hanoi University of Science and Technology. I started with Linux and networking, moved into AI on small hardware, and found the problem I want to spend my time on: bringing careful listening and early screening to places that don’t have specialists."
              vi="Tôi là sinh viên năm 3 ngành Điện tử – Viễn thông, Đại học Bách khoa Hà Nội. Tôi bắt đầu từ Linux và mạng máy tính, rồi chuyển sang AI trên phần cứng nhỏ, và tìm ra vấn đề mình muốn dành thời gian: đưa việc nghe khám cẩn thận và sàng lọc sớm tới những nơi không có bác sĩ chuyên khoa."
            /></p>
            <Link className="text-link" href="/about"><Localized en="More about me" vi="Thêm về tôi" /> →</Link>
          </div>
        </div>
      </section>

      <section id="join" className="section" aria-labelledby="join-title">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow"><Localized en="Get involved" vi="Cùng tham gia" /></p>
            <h2 id="join-title"><Localized en="This project gets better with more people in it." vi="Dự án sẽ tốt hơn khi có thêm nhiều người cùng làm." /></h2>
          </div>
          <ul className="join-grid">
            {audiences.map(item => (
              <li key={item.title.en}>
                <h3><Tx t={item.title} /></h3>
                <p><Tx t={item.body} /></p>
              </li>
            ))}
          </ul>
          <div className="actions">
            {siteConfig.email && <a className="button button--primary" href={`mailto:${siteConfig.email}`}><Localized en="Email me" vi="Gửi email cho tôi" /></a>}
            <a className={`button ${siteConfig.email ? '' : 'button--primary'}`} href={siteConfig.github} target="_blank" rel="noreferrer"><Localized en="Follow on GitHub" vi="Theo dõi trên GitHub" /> ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}
