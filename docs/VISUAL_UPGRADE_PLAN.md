# Kế hoạch nâng cấp hình ảnh — Hoang Anh Nguyen

## 0. Tóm tắt quyết định

Chọn concept **Quiet Signal**: portfolio kỹ thuật mang tinh thần editorial, dùng bố cục rõ, khoảng thở lớn, hình minh họa tĩnh có chủ ý và tín hiệu cyan tiết chế. Homepage không còn dùng system map làm hero. Hero truyền đạt danh tính, chuyên ngành và trọng tâm trong 5 giây; system map trở thành một section phụ có tương tác nhẹ.

Mục tiêu: calm, clear, tactile, memorable, dễ quét. Giữ routing, SEO và dữ kiện công khai hiện có. Local-first. Không thêm CMS, authentication, search, contact backend, blog engine hoặc WebGL.

---

## 1. Chẩn đoán thẳng

### 1.1 Homepage hiện tại

`web/src/app/page.tsx` đặt `LovableSystemMap` ở vị trí đầu tiên, chiếm phần lớn vùng nhìn. Người dùng gặp một sơ đồ có năm module trước khi biết Hoang Anh là ai, đang học gì, hoặc dự án nào đáng xem. `h1` bị `sr-only`, nên nội dung quan trọng không có biểu hiện thị giác tương xứng.

Các vấn đề chính:

- **Hierarchy yếu:** identity module, năm module, connector, danh sách project và LED animation cạnh tranh ngang hàng.
- **Thông điệp chậm:** câu “exploring systems, intelligence, and hardware” nằm dưới đồ họa, không phải headline chính.
- **Độ tin cậy bị loãng:** project thật, research summary và future directions xuất hiện cùng một diagram.
- **Sparse nhưng vẫn rối:** nhiều diện tích dành cho SVG, ít nội dung có trọng lượng.
- **Journey quá chung:** section `Journey` dùng bốn ô nhỏ, không tạo được narrative hoặc ưu tiên cho 2–3 project thật.
- **Uppercase microcopy dày:** `System map / index`, `Fig. 01`, mã module và nhãn kỹ thuật khiến giao diện giống index nội bộ hơn portfolio.

### 1.2 `LovableSystemMap`

`web/src/components/system-map/LovableSystemMap.tsx` có chất liệu đáng giữ: SVG isometric, connector, module grouping, mobile fallback và liên kết route. Nhưng hiện tại nó là toàn bộ lời mở đầu.

Cần:

- Giữ làm **secondary constellation section**, không làm hero.
- Rút còn 4–5 domain, bỏ cảm giác mọi hướng có trọng lượng ngang nhau.
- Đặt label giải thích rõ `Current work` và `Future direction`.
- Chỉ dùng connector trace khi hover/focus; bỏ LED pulse mặc định.
- Có fallback HTML danh sách trên mọi viewport, không phụ thuộc SVG để hiểu nội dung.

### 1.3 Motion

`web/src/styles/map-interaction.css` có hover depth, node entrance, LED pulse và cable trace. Hover depth phù hợp; `map-led-pulse` chạy liên tục gây visual noise. Cable trace dùng animation vô hạn khi focus/hover, nên giới hạn thành một lần trace ngắn. `prefers-reduced-motion` đã có nhưng cần áp dụng thống nhất cho hero, card và detail.

### 1.4 Navigation và shell

`web/src/components/navigation/Header.tsx` giữ tốt routing, active state, theme toggle và mobile nav. Tuy nhiên header hiện dày thông tin ở mobile và dùng uppercase toàn bộ. Giữ cấu trúc, giảm cảm giác dashboard bằng type scale lớn hơn, nav label viết hoa nhẹ hoặc title case, tăng focus state.

`web/src/components/layout/PageShell.tsx` có hệ thống trang nhất quán nhưng title/intro còn nhỏ và giống template. Giữ layout primitive, mở rộng variant cho editorial intro và section heading.

### 1.5 Projects

`web/src/components/projects/ProjectIndex.tsx` đang là danh sách đồng đều. Danh sách tốt cho tra cứu nhưng chưa giống portfolio cao cấp. Cần thêm featured case-study presentation cho 2–3 project có thật; index vẫn giữ để quét toàn bộ.

Dữ kiện cần bảo toàn:

- `SPMamba` chỉ summary-only, đã trình bày tại UEC ASEAN.
- `MossFormer 2` đã train cho three-source separation, chưa có paper.
- `Edge AI Stethoscope` là research prototype, chưa clinical validation.
- `Face Recognition` và `Cisco Networking Projects` là project public/completed theo data hiện tại.
- IC Design, FPGA, PCB, RF/Antenna, UAV chỉ là future directions.

### 1.6 Research, About, detail

`web/src/app/research/page.tsx` đúng về disclosure nhưng giống index kéo dài, thiếu framing theo câu hỏi nghiên cứu và trạng thái bằng chứng.

`web/src/app/about/page.tsx` có narrative tốt nhất hiện tại, nhưng cần đưa thông tin identity lên trước journey và phân biệt rõ `Current practice`, `Exploring`, `Future directions`.

`web/src/styles/detail.css` đã có nền tảng case study: metadata strip, pipeline, visual, disclosure box, related cards. Cần rewrite presentation để mỗi detail có opening visual, contribution, process, evidence boundary và next step; không thêm claim hoặc metric.

### 1.7 Three/R3F và code không dùng

Audit dependency và import graph trước khi xóa. Nếu Three/R3F không được route nào import và không phục vụ concept Quiet Signal, demote/remove khỏi kế hoạch triển khai để giảm bundle và maintenance. Không thay bằng WebGL. CSS/SVG và art-directed still graphics đủ đáp ứng concept.

---

## 2. Concept đã chọn: Quiet Signal

### Visual principles

1. **Identity before system:** người xem biết owner, discipline và focus trước khi thấy taxonomy.
2. **One strong signal per viewport:** mỗi vùng có một điểm nhấn, không nhiều module cùng phát sáng.
3. **Editorial rhythm:** headline lớn, đoạn văn ngắn, grid chính xác, khoảng trống có chủ ý.
4. **Evidence over spectacle:** visual giải thích project, không giả lập thành tích.
5. **Tactile restraint:** border mảnh, surface hơi nâng, shadow ngắn, hover có chiều sâu nhỏ.

### Typography

Giữ `IBM Plex Sans` cho body/UI và `IBM Plex Mono` cho metadata kỹ thuật nếu font đã được load. Dùng:

- Hero heading: clamp khoảng `3rem–6.5rem`, weight 500–600, tracking âm nhẹ.
- Page heading: `2.75rem–4.5rem` desktop, tối đa 14–16 từ mỗi dòng.
- Body: 16–18px, line-height 1.55–1.7.
- Metadata: 11–12px mono, chỉ dùng cho status, domain, year và figure caption.
- Giảm uppercase; chỉ dùng cho mã section hoặc trạng thái quan trọng.

### Palette

Warm-white và dark graphite làm nền:

- Light background: warm white ngả xám nhẹ, không xanh lạnh.
- Foreground: graphite sâu, không đen tuyệt đối.
- Surface: trắng ấm hơn background, dùng cho card.
- Rule: xám mảnh, contrast đủ WCAG.
- Accent: cyan muted, dùng cho link, focus, selected state và trace.
- Dark mode: graphite gần đen, surface nâng nhẹ, cyan sáng hơn nhưng không neon.

Có thể mở rộng `web/src/styles/tokens.css`; không tạo palette riêng trong component.

### Spacing và grid

- Container tối đa khoảng 1200–1280px.
- Gutter responsive: 20px mobile, 32px tablet, 56px desktop.
- Grid 12 cột desktop, 8 tablet, 4 mobile.
- Section spacing: 96–160px desktop, 64–96px tablet, 56–72px mobile.
- Card gap lớn hơn border gap; tránh grid nhiều ô nhỏ liên tục.

### Surfaces

Card dùng border 1px, radius nhỏ 4–8px, shadow rất nhẹ chỉ khi hover. Không dùng gradient nặng, glassmorphism hoặc texture toàn trang. Hero có thể dùng một panel graphite/cyan nhạt để tạo tương phản, nhưng text phải là điểm chính.

### Imagery và iconography

Ưu tiên SVG/CSS và still graphic art direction:

- SPMamba: waveform separation / layered signal, không dùng chart số liệu giả.
- Edge AI Stethoscope: acoustic pipeline và silhouette thiết bị, ghi rõ research prototype.
- Face Recognition: image-to-inference-to-Arduino flow.
- Cisco: topology linework tối giản.
- MossFormer 2: spectrogram-like abstract field, không gắn metric.

Icon dùng line icon hoặc SVG hình học, một stroke family. Không dùng icon library hỗn tạp. Placeholder phải nói rõ `Visual placeholder` và không ngụ ý ảnh thật.

### Motion rules

- Reveal section/card một lần khi vào viewport.
- Hover card: translate tối đa 4px, shadow nhẹ, accent line.
- Constellation: connector trace một lần, tối đa 700ms khi hover/focus.
- Parallax chỉ dùng trên still graphic desktop, biên độ nhỏ; tắt trên touch.
- Không perpetual pulse, không autoplay video, không LED nhấp nháy mặc định.
- `prefers-reduced-motion: reduce`: bỏ transform, trace, parallax và animation; vẫn giữ trạng thái hover/focus bằng màu/border.

---

## 3. Homepage information architecture mới

Thứ tự cố định:

### 1. Header

Logo HN, tên, discipline ngắn, nav Home/Projects/Research/About, theme toggle. Giữ route hiện tại. Mobile dùng nav ngang cuộn, tăng target tối thiểu 44px.

### 2. Editorial hero — “Systems, intelligence, hardware.”

Mục tiêu: trả lời trong 5 giây: ai, đang học gì, hướng kỹ thuật nào.

Nội dung truthful:

- Eyebrow: `Hoang Anh Nguyen · Year 3`.
- H1: `Electronics & Telecommunications Engineering student building downward through the stack.`
- Lede: systems, edge AI, speech separation và electronics; không tuyên bố chuyên gia.
- Identity line: `Hanoi University of Science and Technology`.
- CTA: `View selected work`, `Read about the path`.
- Visual bên phải hoặc bên dưới: abstract signal/board still graphic, không phải full map.

Hero phải có H1 hiển thị, không dùng `sr-only` cho thông điệp chính.

### 3. Selected work

Ba card lớn, art direction khác nhau:

1. **SPMamba — 2-source → 3-source speech separation**: research summary, UEC ASEAN, no public paper/code/results claimed.
2. **Edge AI Stethoscope**: in-progress research prototype, acoustic signal to on-device inference, not clinically validated.
3. **Face Recognition** hoặc **Cisco Networking Projects**: chọn theo visual asset; nếu chưa có asset, dùng abstract SVG truthful.

Mỗi card có title, one-line summary, domain/status, visual, link detail. Không dùng ba card giống nhau.

### 4. Focus statement

Một đoạn ngắn giải thích trục làm việc: từ Linux/networking, qua model và signal processing, tới hệ thống vật lý. Đây là narrative, không phải claim về completed expertise.

### 5. Secondary domain constellation

Đặt `LovableSystemMap` phiên bản simplified ở đây. Hiển thị identity center và domain nodes; danh sách HTML luôn có. Current work tách khỏi future directions. CTA `Explore the full project index`.

### 6. Research note

Feature SPMamba và MossFormer 2 trong một research strip. Nêu rõ summary-only/no paper. Link `/research` và detail pages.

### 7. Learning direction

Ba nhóm ngắn: Current practice, Exploring, Future directions. IC Design, FPGA, PCB, RF/Antenna, UAV đều gắn nhãn planned/future; không biến thành project card.

### 8. Footer CTA

`Follow the work as it moves from systems toward hardware.` Link GitHub nếu có, About và Projects. Không tạo contact backend.

---

## 4. Nâng cấp theo route

### Home `/`

Rewrite composition trong `web/src/app/page.tsx`. Giữ metadata canonical. Tách hero, featured work, focus statement, constellation, research note và directions thành section components. Dữ liệu lấy từ `web/src/lib/projects.ts`, không hardcode claim mới.

### Projects `/projects`

Giữ filter query và no-JS link behavior. Trên đầu page thêm featured case-study block; bên dưới giữ complete index. Filter hiện tại dùng `Link`, tiếp tục hoạt động khi JS tắt. Hiển thị status/disclosure rõ hơn. Future domains có empty state giải thích “future direction, no completed project listed”.

### Research `/research`

Đổi từ danh sách đơn sang research editorial index:

- Intro về speech separation và acoustic signal processing.
- Evidence boundary banner: summaries only, no public paper/metrics nếu đúng project.
- Hai research cards lớn: SPMamba và MossFormer 2.
- Mỗi card có question, work summary, known boundary, link detail.

Không gọi SPMamba là publication. Không thêm paper link.

### About `/about`

Hero identity trước journey: name, institution, Year 3, discipline. Sau đó:

1. Learning journey.
2. Current practice: systems, edge AI, research, electronics.
3. Exploring: signal processing, embedded systems.
4. Future directions: IC Design, FPGA, PCB, RF/Antenna, UAV.
5. GitHub link nếu có.

Giữ anchor `#exploring`, `#future-directions`, `#directions`.

### Project detail `/projects/[slug]`

Mỗi detail đọc như credible case study:

1. Breadcrumb và status/disclosure.
2. Hero title, summary, art-directed visual.
3. At-a-glance: role/contribution, domain, status, technologies.
4. Problem/context.
5. Approach/process/pipeline.
6. What was done.
7. Evidence and limits.
8. Links nếu public.
9. Related projects và previous/next navigation.

SPMamba phải ghi UEC ASEAN và summary-only. MossFormer 2 phải ghi no paper. Edge AI Stethoscope phải ghi not clinically validated. Không thêm metrics, dates, roles hoặc outcomes chưa có trong data.

---

## 5. Component và data architecture

### Giữ

- `web/src/app/*` routing và metadata pattern.
- `web/src/components/navigation/Header.tsx` với chỉnh sửa visual, không đổi route.
- `web/src/components/layout/PageShell.tsx` làm primitive, thêm variant nếu cần.
- `web/src/lib/projects.ts`, `types.ts`, `domains.ts`, `directions.ts` làm source of truth.
- `ProjectFilters.client.tsx` và query filter bằng URL.
- `detail.css` làm nền cấu trúc detail.

### Rewrite

- `web/src/app/page.tsx`: editorial homepage.
- `web/src/components/projects/ProjectIndex.tsx`: featured cards + index, vẫn giữ filter semantics.
- `web/src/app/research/page.tsx`: research cards và evidence boundaries.
- `web/src/app/about/page.tsx`: identity-first narrative.
- `web/src/styles/tokens.css`: warm-white/graphite/cyan tokens, type scale, spacing, focus.
- `web/src/styles/detail.css`: responsive case-study rhythm, visual slots, disclosure styling.
- `web/src/styles/map-interaction.css`: bỏ perpetual pulse, giới hạn trace, giữ reduced-motion.

### Tạo mới dự kiến

Tên component là đề xuất implementation, không phải thay đổi ngoài scope:

- `web/src/components/home/EditorialHero.tsx`
- `web/src/components/home/FeaturedWork.tsx`
- `web/src/components/home/FocusStatement.tsx`
- `web/src/components/home/DomainConstellation.tsx`
- `web/src/components/home/ResearchNote.tsx`
- `web/src/components/projects/FeaturedProjectCard.tsx`
- `web/src/components/projects/ProjectVisual.tsx`
- `web/src/components/layout/SectionIntro.tsx`

Các component nhận data typed. Không copy project facts giữa nhiều file.

### `LovableSystemMap`

Demote thành `DomainConstellation` hoặc rewrite nội bộ:

- Giữ SVG geometry và mobile list nếu code audit thấy ổn.
- Giảm module size và visual weight.
- Tách data node khỏi JSX nếu cần typed shared data.
- Dùng `aria-label`, visible headings, focus ring.
- Không để map đứng trước hero.

### Three/R3F

Tìm mọi import trong `web/src`. Nếu unused, loại khỏi dependency/runtime scope ở phase audit tương ứng. Nếu đang được route khác dùng, giữ nguyên và không đưa vào homepage. Không thêm WebGL cho Quiet Signal.

### Dữ liệu

Có thể bổ sung typed presentation metadata trong `web/src/lib/projects.ts` như visual family hoặc featured flag chỉ khi dựa trên project facts hiện có. Không thêm completion claim, metric, paper, image provenance hoặc ownership fact.

---

## 6. Responsive và light/dark

### Desktop — 1440x900

Hero dùng 12-column grid, text chiếm 5–6 cột, visual 5–6 cột. Featured work hiển thị 2 card lớn và card thứ ba lệch nhịp có chủ đích. Constellation có thể hiển thị SVG + HTML labels, nhưng không vượt quá một viewport section.

### Tablet — 1024x768

Hero chuyển thành 7/5 hoặc stacked nếu text bị chật. Featured cards dùng 2 cột rồi card cuối full width. Constellation giảm node labels, tăng khoảng cách touch, không để connector đè text.

### Mobile — 390x844

Hero xếp dọc; H1 tối đa 3–5 dòng, CTA full-width hoặc 2 nút dễ chạm. Featured cards một cột, visual ratio cố định để tránh layout shift. Constellation dùng danh sách semantic, SVG chỉ là decoration hoặc thumbnail. Không yêu cầu hover. Header nav cuộn ngang, không che nội dung.

### Theme

Light là mặc định: warm-white background, graphite text, cyan accent. Dark giữ cùng hierarchy, không đảo thành neon dashboard. Kiểm tra contrast cho text, border, focus, link và disabled state. Theme toggle không làm mất focus hoặc gây flash khó chịu nếu hệ thống hiện đã có persistence.

---

## 7. Phased implementation

### Phase 1 — Visual foundation và homepage slice

**Files/components:**

- `web/src/styles/tokens.css`
- `web/src/components/home/EditorialHero.tsx`
- `web/src/components/home/FeaturedWork.tsx`
- `web/src/app/page.tsx`
- `web/src/components/navigation/Header.tsx`

**Dependencies:** audit font loading, existing project data, existing theme mechanism.

**Acceptance criteria:**

- Homepage hero hiển thị H1 identity-first và CTA trong 1440x900.
- Có ít nhất 2 featured cards dùng truthful data.
- Warm-white/graphite/cyan tokens hoạt động ở light/dark.
- Không còn system map ở vị trí hero.
- No-JS vẫn đọc được heading, links và cards.

**Tests:** TypeScript, lint, build; Playwright screenshot/locator cho H1, `/projects`, `/about`; keyboard tab test cho header và CTA.

### Phase 2 — Featured work và art direction

**Files/components:**

- `web/src/components/projects/FeaturedProjectCard.tsx`
- `web/src/components/projects/ProjectVisual.tsx`
- `web/src/components/projects/ProjectIndex.tsx`
- `web/src/lib/projects.ts`
- `web/src/styles/detail.css`

**Dependencies:** visual placeholder strategy, existing project type.

**Acceptance criteria:**

- 2–3 project card có art direction khác nhau.
- Card nêu status/disclosure đúng data.
- Complete project index vẫn filter được bằng URL.
- Visual không dùng metric hoặc claim mới.

**Tests:** Playwright filter links có URL đúng, empty state, project card route; axe scan cho card links; build và lint.

### Phase 3 — Secondary constellation và motion discipline

**Files/components:**

- `web/src/components/system-map/LovableSystemMap.tsx`
- `web/src/components/home/DomainConstellation.tsx`
- `web/src/styles/map-interaction.css`
- `web/src/app/page.tsx`

**Dependencies:** Phase 1 hierarchy, node route audit.

**Acceptance criteria:**

- Map xuất hiện sau featured work/focus statement.
- Mobile có semantic list, không cần hover.
- Không có perpetual LED pulse.
- Connector trace chỉ chạy khi hover/focus và tắt với reduced motion.
- Future directions phân biệt rõ với current work.

**Tests:** Playwright desktop/mobile rendering, keyboard focus on nodes, reduced-motion emulation, no-JS node links.

### Phase 4 — Research, About và detail narrative

**Files/components:**

- `web/src/app/research/page.tsx`
- `web/src/app/about/page.tsx`
- project detail route/component hiện có
- `web/src/styles/detail.css`
- `web/src/components/layout/PageShell.tsx`

**Dependencies:** data audit, disclosure copy review.

**Acceptance criteria:**

- Research page phân biệt summary-only và no paper.
- About hiển thị Year 3, Hanoi University of Science and Technology và future directions đúng sự thật.
- Detail page có context, approach, evidence boundary, links và related navigation.
- Existing anchors vẫn hoạt động.

**Tests:** route crawl cho mọi published project, metadata/canonical assertions, Playwright disclosure assertions, axe scan, build.

### Phase 5 — Responsive polish, performance và release gate

**Files/components:**

- toàn bộ homepage/page shells
- `web/src/styles/tokens.css`
- `web/src/styles/map-interaction.css`
- unused Three/R3F imports/dependencies nếu audit xác nhận không dùng
- Playwright config/tests hiện có

**Dependencies:** owner review of visual slice, all previous phases.

**Acceptance criteria:**

- Layout đạt visual criteria tại 1440x900, 1024x768, 390x844.
- LCP target dưới 2.5s trên mobile mid-tier; homepage JS budget tối đa 170KB gzip first-load không tính framework cache; không load Three/R3F cho homepage.
- Không layout shift đáng kể từ visual placeholder.
- TypeScript, lint, production build và Playwright pass trong CI.
- Reduced motion, keyboard, no-JS và dark mode đều được kiểm tra.

**Tests:** Lighthouse/Performance budget, Playwright viewport matrix, axe, `npm run lint`, `npm run build`, `tsc --noEmit` nếu script tồn tại.

---

## 8. Visual acceptance criteria

### 1440x900

- Trong 5 giây, người xem đọc được Hoang Anh Nguyen, Electronics & Telecommunications Engineering student, Year 3 và trọng tâm systems/edge AI/electronics.
- H1 là điểm nổi bật đầu tiên; không có system map cạnh tranh với H1.
- Hero có tối đa một visual chính, không có animation liên tục.
- Featured work xuất hiện trước constellation.
- 2–3 project cards có scale lớn, visual khác nhau và status rõ.
- Grid, gutter và baseline nhìn có chủ ý; không có vùng trống lớn không giải thích.
- Text body không vượt quá measure đọc thoải mái; metadata không lấn át narrative.

### 1024x768

- Header không wrap bất thường; CTA không bị đẩy khỏi hero.
- Hero và featured cards giữ thứ tự thông tin, không vỡ grid.
- Constellation không chồng connector lên label.
- Project title, status và disclosure đọc được mà không cần hover.
- Dark mode giữ contrast và cùng hierarchy.

### 390x844

- H1 đọc được trong 3–5 dòng; không tràn ngang.
- CTA và nav target tối thiểu 44px.
- Card visual không làm nội dung quan trọng xuống quá thấp.
- Không yêu cầu hover để hiểu project.
- Constellation chuyển thành danh sách rõ ràng; domain và link vẫn truy cập được.
- Header sticky không che anchor content.
- Trang đầu có cảm giác giàu thông tin nhưng không dày hoặc chật.

---

## 9. Technical acceptance criteria

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`; mỗi page có một H1 hiển thị.
- Keyboard navigation đầy đủ; focus-visible rõ trên link, button, theme toggle và map node.
- Contrast đạt WCAG AA cho body text, interactive text và focus indicator.
- SVG decorative dùng `aria-hidden`; SVG truyền tải thông tin có accessible label hoặc HTML fallback.
- No-JS navigation tới `/`, `/projects`, `/research`, `/about` và mọi published detail hoạt động.
- Query filter `/projects?domain=...` giữ semantics và không phụ thuộc client state để hiển thị cơ bản.
- `prefers-reduced-motion` tắt animation, trace, transform và parallax không cần thiết.
- Homepage không tải WebGL/Three/R3F nếu không cần.
- Performance budgets: LCP < 2.5s mục tiêu mobile mid-tier; CLS < 0.1; homepage first-load JS ≤170KB gzip mục tiêu; ảnh/graphic có kích thước cố định và lazy-load ngoài viewport.
- Chạy TypeScript check, ESLint, production build và Playwright trước merge. Kế hoạch không tuyên bố các test đã pass.
- Playwright kiểm tra route, viewport matrix, theme, reduced motion, keyboard, no-JS và disclosure copy.
- SEO hiện tại được giữ: title, description, canonical và route structure. Chỉ cải thiện metadata khi copy vẫn truthful.

---

## 10. Quyết định cần owner asset/fact — không blocking

1. Chân dung hoặc ảnh cá nhân: nếu chưa có, dùng abstract identity graphic `HN`, không giả làm ảnh thật.
2. Ảnh hardware/stethoscope: nếu chưa có ảnh được phép dùng, dùng SVG acoustic/device schematic.
3. Visual ưu tiên cho project thứ ba: Face Recognition hoặc Cisco Networking Projects. Nếu chưa quyết, dùng visual CSS/SVG từ data hiện có.
4. Copy chính xác cho role/contribution từng project: dùng current `contribution` và `overview` làm placeholder.
5. GitHub URL và eventual domain: giữ local-first; chỉ dùng `nguyenhoanganh.dev` khi owner xác nhận deploy.
6. Theme mặc định: light là default theo concept; owner có thể xác nhận dark default sau visual review, không ảnh hưởng architecture.
7. Mốc thời gian, paper, metric hoặc publication: không cần để triển khai; giữ disclosure hiện có và không dựng placeholder mang tính thành tích.

---

## 11. Definition of done

- [ ] Homepage truyền đạt identity và focus trong 5 giây.
- [ ] Hero editorial thay thế system-map-as-entire-hero.
- [ ] 2–3 real projects xuất hiện dưới dạng large case-study cards với art direction riêng.
- [ ] System map trở thành secondary constellation, có HTML fallback và motion tiết chế.
- [ ] Projects, Research, About và project detail có narrative và visual purpose rõ.
- [ ] SPMamba, MossFormer 2, Edge AI Stethoscope và future directions giữ đúng disclosure/truthfulness.
- [ ] Không thêm CMS, auth, search, contact backend, blog engine hoặc WebGL không cần thiết.
- [ ] Tokens, typography, spacing, surfaces, light/dark và focus states thống nhất.
- [ ] Responsive đạt tiêu chí ở 1440x900, 1024x768 và 390x844.
- [ ] Reduced motion, keyboard, no-JS, semantic HTML và contrast đạt tiêu chí.
- [ ] Homepage đạt performance budget; unused Three/R3F được loại khỏi scope nếu audit xác nhận không dùng.
- [ ] TypeScript, lint, production build và Playwright được chạy và ghi nhận trong release review.
- [ ] Owner review visual slice từ Phase 1 trước khi hoàn thiện toàn route.
- [ ] Canonical, metadata và routing hiện tại không bị phá vỡ.
- [ ] Local-first vẫn là trạng thái triển khai; domain tương lai chỉ xuất hiện khi được xác nhận.


