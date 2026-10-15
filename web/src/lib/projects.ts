import type { Project, Status, Text, Track } from './types'

export const projects: Project[] = [
  {
    slug: 'edge-ai-stethoscope',
    title: { en: 'Edge AI Stethoscope', vi: 'Ống nghe Edge AI' },
    track: 'device',
    status: 'prototype',
    visibility: 'published',
    summary: {
      en: 'Separates heart and lung sounds, filters noise and flags patterns worth a second listen — entirely on the device, with no internet.',
      vi: 'Tách tiếng tim và tiếng phổi, lọc nhiễu và đánh dấu những đoạn âm thanh cần nghe lại — chạy hoàn toàn trên thiết bị, không cần internet.',
    },
    forWhom: {
      en: 'Commune health stations and village health workers who examine many patients without a cardiologist or pulmonologist nearby.',
      vi: 'Trạm y tế xã và nhân viên y tế thôn bản — những người khám nhiều bệnh nhân nhưng không có bác sĩ tim mạch hay hô hấp ở gần.',
    },
    overview: {
      en: 'Heart and lung sounds overlap in the same chestpiece, and a busy clinic adds talking, footsteps and fans. The stethoscope captures the sound, splits it into a heart stream and a lung stream, cleans each one, and runs a small model on the device to highlight segments a clinician should listen to again. Results appear on the device screen; recordings never leave it.',
      vi: 'Tiếng tim và tiếng phổi chồng lên nhau trong cùng một đầu nghe, cộng thêm tiếng nói chuyện, tiếng bước chân, tiếng quạt ở phòng khám. Ống nghe thu âm, tách thành hai luồng tim và phổi, làm sạch từng luồng, rồi chạy một mô hình nhỏ ngay trên thiết bị để đánh dấu những đoạn bác sĩ nên nghe lại. Kết quả hiện trên màn hình của thiết bị; bản ghi âm không rời khỏi máy.',
    },
    pipeline: [
      { en: 'Capture chest sound', vi: 'Thu âm ở ngực' },
      { en: 'Separate heart / lung', vi: 'Tách tim / phổi' },
      { en: 'Filter clinic noise', vi: 'Lọc tiếng ồn phòng khám' },
      { en: 'On-device AI', vi: 'AI chạy trên chip' },
      { en: 'Show on screen', vi: 'Hiển thị tại chỗ' },
    ],
    hardware: [
      { en: 'Acoustic chestpiece with microphone', vi: 'Đầu nghe kèm micro thu âm' },
      { en: 'Edge processing board', vi: 'Bo mạch xử lý edge' },
      { en: 'Built-in display', vi: 'Màn hình trên thiết bị' },
      { en: 'Rechargeable battery', vi: 'Pin sạc' },
    ],
    contribution: [
      { en: 'Built the end-to-end signal path, from chest sound capture to an on-device result.', vi: 'Xây dựng toàn bộ đường đi của tín hiệu, từ thu âm ở ngực tới kết quả trên thiết bị.' },
      { en: 'Applied speech-separation research to split overlapping heart and lung sounds.', vi: 'Áp dụng nghiên cứu tách nguồn âm thanh để tách tiếng tim và tiếng phổi chồng lên nhau.' },
      { en: 'Kept all processing on the device so it works without internet and protects patient data.', vi: 'Giữ toàn bộ xử lý trên thiết bị để dùng được khi không có mạng và bảo vệ dữ liệu bệnh nhân.' },
    ],
    technologies: ['Source separation', 'Signal processing', 'Edge AI', 'Embedded'],
    note: {
      en: 'Near-complete research prototype. Not clinically validated; it supports, and does not replace, a clinician’s judgement.',
      vi: 'Nguyên mẫu nghiên cứu gần hoàn thiện. Chưa được kiểm định lâm sàng; chỉ hỗ trợ, không thay thế đánh giá của bác sĩ.',
    },
  },
  {
    slug: 'cough-listener',
    title: { en: 'Cough Listener', vi: 'Máy nghe tiếng ho' },
    track: 'device',
    status: 'in-development',
    visibility: 'published',
    summary: {
      en: 'A small box for clinic waiting rooms that picks out coughs from background noise and suggests who may need TB or pneumonia screening.',
      vi: 'Một chiếc hộp nhỏ đặt ở phòng chờ, nhận ra tiếng ho giữa tiếng ồn xung quanh và gợi ý ai có thể cần sàng lọc lao hoặc viêm phổi.',
    },
    forWhom: {
      en: 'Waiting rooms at district hospitals and commune health stations, where a persistent cough is often the first sign that goes unchecked.',
      vi: 'Phòng chờ ở bệnh viện huyện và trạm y tế xã — nơi tiếng ho kéo dài thường là dấu hiệu đầu tiên nhưng hay bị bỏ qua.',
    },
    overview: {
      en: 'The device listens for cough events, separates each cough from speech and room noise using the same source-separation approach as the stethoscope, and classifies the cough’s acoustic pattern on the chip. When a pattern looks concerning it lights up and suggests a referral for screening. Only a short anonymous summary is kept; no conversation is recorded.',
      vi: 'Thiết bị lắng nghe các tiếng ho, tách từng tiếng ho khỏi giọng nói và tiếng ồn trong phòng bằng cùng cách tách nguồn âm như ống nghe, rồi phân loại đặc điểm âm học của tiếng ho ngay trên chip. Khi gặp dấu hiệu đáng lo, thiết bị bật đèn và gợi ý chuyển đi sàng lọc. Máy chỉ lưu một bản tóm tắt ngắn, ẩn danh; không ghi lại bất kỳ cuộc trò chuyện nào.',
    },
    pipeline: [
      { en: 'Listen to the room', vi: 'Nghe âm thanh phòng chờ' },
      { en: 'Detect a cough', vi: 'Phát hiện tiếng ho' },
      { en: 'Separate from speech', vi: 'Tách khỏi giọng nói' },
      { en: 'Classify on chip', vi: 'Phân loại trên chip' },
      { en: 'Suggest screening', vi: 'Gợi ý sàng lọc' },
    ],
    hardware: [
      { en: 'ESP32-S3 microcontroller', vi: 'Vi điều khiển ESP32-S3' },
      { en: 'Two I²S MEMS microphones', vi: 'Hai micro MEMS chuẩn I²S' },
      { en: 'Status LED ring and small display', vi: 'Vòng đèn LED và màn hình nhỏ' },
      { en: 'USB-C power with battery backup', vi: 'Nguồn USB-C kèm pin dự phòng' },
    ],
    contribution: [
      { en: 'Designing the cough detection and separation pipeline to fit on a microcontroller.', vi: 'Thiết kế quy trình phát hiện và tách tiếng ho đủ nhẹ để chạy trên vi điều khiển.' },
      { en: 'Reusing the three-source separation work from SPMamba and MossFormer 2.', vi: 'Tận dụng kết quả nghiên cứu tách ba nguồn âm từ SPMamba và MossFormer 2.' },
      { en: 'Privacy by design: no raw audio or speech is stored.', vi: 'Bảo vệ quyền riêng tư ngay từ thiết kế: không lưu âm thanh gốc hay giọng nói.' },
    ],
    technologies: ['ESP32-S3', 'TinyML', 'Audio event detection', 'Source separation'],
    note: {
      en: 'In development. A screening aid only; it does not diagnose tuberculosis or pneumonia.',
      vi: 'Đang phát triển. Chỉ là công cụ hỗ trợ sàng lọc, không chẩn đoán lao hay viêm phổi.',
    },
  },
  {
    slug: 'ecg-patch',
    title: { en: 'Single-lead ECG Patch', vi: 'Miếng dán điện tim' },
    track: 'device',
    status: 'in-development',
    visibility: 'published',
    summary: {
      en: 'A thin chest patch worn for several days that watches for irregular heart rhythms such as atrial fibrillation and saves only the moments that matter.',
      vi: 'Miếng dán mỏng đeo trên ngực vài ngày, theo dõi nhịp tim không đều như rung nhĩ và chỉ lưu lại những đoạn đáng chú ý.',
    },
    forWhom: {
      en: 'Older adults living far from a hospital, for whom a 24-hour Holter test means a long trip and a long wait.',
      vi: 'Người cao tuổi sống xa bệnh viện, với họ một lần đo Holter 24 giờ nghĩa là một chuyến đi xa và chờ đợi lâu.',
    },
    overview: {
      en: 'Two electrodes feed a low-power analog front-end. The patch removes muscle and mains noise, finds each heartbeat, and runs a compact model that looks at rhythm irregularity. Instead of streaming everything, it keeps short episodes around suspicious rhythms and hands them to a phone over Bluetooth at the next check-up.',
      vi: 'Hai điện cực đưa tín hiệu vào mạch đo tương tự tiết kiệm điện. Miếng dán lọc nhiễu cơ và nhiễu điện lưới, tìm từng nhịp tim, rồi chạy một mô hình nhỏ đánh giá độ đều của nhịp. Thay vì gửi liên tục, nó chỉ giữ lại những đoạn ngắn quanh nhịp đáng ngờ và chuyển sang điện thoại qua Bluetooth ở lần tái khám.',
    },
    pipeline: [
      { en: 'Two-electrode ECG', vi: 'Điện tim hai điện cực' },
      { en: 'Remove noise', vi: 'Lọc nhiễu' },
      { en: 'Find each beat', vi: 'Tìm từng nhịp tim' },
      { en: 'Rhythm model', vi: 'Mô hình nhịp tim' },
      { en: 'Save key episodes', vi: 'Lưu đoạn đáng chú ý' },
    ],
    hardware: [
      { en: 'AD8232 ECG front-end', vi: 'Mạch đo điện tim AD8232' },
      { en: 'nRF52840 Bluetooth Low Energy SoC', vi: 'Chip Bluetooth năng lượng thấp nRF52840' },
      { en: 'On-board flash for episodes', vi: 'Bộ nhớ flash lưu các đoạn ghi' },
      { en: 'Thin LiPo cell, flexible PCB', vi: 'Pin LiPo mỏng, mạch in dẻo' },
    ],
    contribution: [
      { en: 'Designing the analog front-end and filtering chain for a two-electrode patch.', vi: 'Thiết kế mạch đo tương tự và chuỗi lọc cho miếng dán hai điện cực.' },
      { en: 'Building a rhythm model small enough for a Bluetooth microcontroller.', vi: 'Xây dựng mô hình nhịp tim đủ nhỏ cho vi điều khiển Bluetooth.' },
      { en: 'Event-based storage to stretch battery life over several days.', vi: 'Chỉ lưu theo sự kiện để pin dùng được nhiều ngày.' },
    ],
    technologies: ['AD8232', 'nRF52840', 'BLE', 'ECG signal processing', 'TinyML'],
    note: {
      en: 'In development. Flags rhythms for a doctor to review; it does not diagnose heart disease.',
      vi: 'Đang phát triển. Chỉ đánh dấu nhịp tim để bác sĩ xem lại, không chẩn đoán bệnh tim.',
    },
  },
  {
    slug: 'hearing-screener',
    title: { en: 'School Hearing Screener', vi: 'Bộ sàng lọc thính lực học đường' },
    track: 'device',
    status: 'in-development',
    visibility: 'published',
    summary: {
      en: 'A headphone kit that lets a school nurse run a quick hearing check, with a built-in microphone that pauses the test when the room is too loud.',
      vi: 'Bộ tai nghe giúp y tế học đường kiểm tra thính lực nhanh, có micro tích hợp để tạm dừng bài kiểm tra khi phòng quá ồn.',
    },
    forWhom: {
      en: 'Primary schools without audiology equipment, where mild hearing loss is often mistaken for inattention.',
      vi: 'Trường tiểu học không có thiết bị đo thính lực — nơi trẻ nghe kém nhẹ thường bị hiểu nhầm là thiếu tập trung.',
    },
    overview: {
      en: 'The kit plays calibrated tones at several frequencies and adjusts the level up or down as the child presses a button when they hear a sound. A microphone measures background noise throughout, and a small on-device model recognises disruptions such as talking or traffic so a noisy result is never recorded as hearing loss. The output is a simple pass or refer, with a printable note for parents.',
      vi: 'Bộ thiết bị phát âm chuẩn ở nhiều tần số và tăng giảm âm lượng dựa vào việc trẻ bấm nút khi nghe thấy. Micro đo tiếng ồn nền suốt bài kiểm tra, và một mô hình nhỏ trên thiết bị nhận ra tiếng nói chuyện hay tiếng xe để kết quả bị nhiễu không bao giờ bị ghi thành nghe kém. Kết quả đơn giản là "đạt" hoặc "cần khám thêm", kèm phiếu in gửi phụ huynh.',
    },
    pipeline: [
      { en: 'Play test tones', vi: 'Phát âm kiểm tra' },
      { en: 'Child presses button', vi: 'Trẻ bấm nút' },
      { en: 'Adaptive level', vi: 'Điều chỉnh mức âm' },
      { en: 'Check room noise', vi: 'Kiểm tra tiếng ồn' },
      { en: 'Pass / refer', vi: 'Đạt / cần khám thêm' },
    ],
    hardware: [
      { en: 'RP2040 microcontroller', vi: 'Vi điều khiển RP2040' },
      { en: 'I²S audio DAC and calibrated headphones', vi: 'DAC âm thanh I²S và tai nghe đã hiệu chuẩn' },
      { en: 'Ambient noise microphone', vi: 'Micro đo tiếng ồn nền' },
      { en: 'Large response button', vi: 'Nút bấm cỡ lớn cho trẻ' },
    ],
    contribution: [
      { en: 'Designing the adaptive tone test and the headphone calibration step.', vi: 'Thiết kế bài kiểm tra âm thích ứng và bước hiệu chuẩn tai nghe.' },
      { en: 'Training a small noise classifier to protect the result from a noisy classroom.', vi: 'Huấn luyện bộ phân loại tiếng ồn nhỏ để kết quả không bị ảnh hưởng bởi lớp học ồn.' },
      { en: 'A child-friendly flow a school nurse can run without training in audiology.', vi: 'Quy trình thân thiện với trẻ, y tế học đường dùng được mà không cần học chuyên sâu về thính học.' },
    ],
    technologies: ['RP2040', 'I²S audio', 'Audiometry', 'TinyML'],
    note: {
      en: 'In development. A screening step that refers children to a specialist; it is not a clinical audiogram.',
      vi: 'Đang phát triển. Là bước sàng lọc để chuyển trẻ tới chuyên khoa, không thay thế đo thính lực lâm sàng.',
    },
  },
  {
    slug: 'spmamba-3-source',
    title: { en: 'SPMamba — 2-source to 3-source separation', vi: 'SPMamba — tách 2 nguồn thành 3 nguồn' },
    track: 'research',
    status: 'completed',
    visibility: 'published',
    summary: {
      en: 'Extended SPMamba from two-source to three-source speech separation, presented at UEC ASEAN Seminar and Workshop 2026.',
      vi: 'Mở rộng SPMamba từ tách 2 nguồn âm thanh sang 3 nguồn, trình bày tại UEC ASEAN Seminar and Workshop 2026.',
    },
    overview: {
      en: 'Separating several overlapping sources is the same problem the stethoscope and the cough listener face: heart and lung, cough and speech. This study extended the SPMamba model from two to three simultaneous speakers and became the technical base for the project’s acoustic devices.',
      vi: 'Tách nhiều nguồn âm chồng lên nhau chính là bài toán mà ống nghe và máy nghe tiếng ho gặp phải: tim và phổi, tiếng ho và giọng nói. Nghiên cứu này mở rộng mô hình SPMamba từ 2 lên 3 người nói cùng lúc và trở thành nền tảng kỹ thuật cho các thiết bị âm thanh của dự án.',
    },
    contribution: [
      { en: 'Adapted SPMamba from two-source to three-source separation.', vi: 'Điều chỉnh SPMamba từ tách 2 nguồn sang 3 nguồn.' },
      { en: 'Presented the work at UEC ASEAN Seminar and Workshop 2026.', vi: 'Trình bày tại UEC ASEAN Seminar and Workshop 2026.' },
    ],
    technologies: ['SPMamba', 'State-space models', 'Speech separation'],
    event: { en: 'Presented at UEC ASEAN Seminar and Workshop 2026', vi: 'Trình bày tại UEC ASEAN Seminar and Workshop 2026' },
    note: {
      en: 'Research summary. Paper and code are not yet public.',
      vi: 'Bản tóm tắt nghiên cứu. Bài báo và mã nguồn chưa được công khai.',
    },
  },
  {
    slug: 'mossformer-2',
    title: { en: 'MossFormer 2 — 3-source separation', vi: 'MossFormer 2 — tách 3 nguồn âm' },
    track: 'research',
    status: 'completed',
    visibility: 'published',
    summary: {
      en: 'Trained MossFormer 2 for three-source audio separation as a comparison point for SPMamba.',
      vi: 'Huấn luyện MossFormer 2 cho bài toán tách 3 nguồn âm, làm mốc so sánh với SPMamba.',
    },
    overview: {
      en: 'A second separation architecture trained on the same three-source task, to understand which design is more practical to shrink for small devices.',
      vi: 'Một kiến trúc tách nguồn thứ hai được huấn luyện trên cùng bài toán 3 nguồn, nhằm hiểu thiết kế nào thực tế hơn khi thu nhỏ cho thiết bị nhỏ.',
    },
    contribution: [
      { en: 'Trained MossFormer 2 for three-source audio separation.', vi: 'Huấn luyện MossFormer 2 cho bài toán tách 3 nguồn âm.' },
    ],
    technologies: ['MossFormer 2', 'Transformers', 'Audio separation'],
    note: {
      en: 'Research summary. No paper has been published for this work.',
      vi: 'Bản tóm tắt nghiên cứu. Chưa có bài báo công bố cho phần này.',
    },
  },
  {
    slug: 'face-recognition',
    title: { en: 'Face Recognition → Arduino', vi: 'Nhận diện khuôn mặt → Arduino' },
    track: 'other',
    status: 'completed',
    visibility: 'published',
    summary: {
      en: 'An early project connecting a camera, a recognition model and an Arduino output — the first step from AI software to physical hardware.',
      vi: 'Dự án đầu tiên nối camera, mô hình nhận diện và tín hiệu điều khiển Arduino — bước đầu tiên từ phần mềm AI tới phần cứng thật.',
    },
    overview: {
      en: 'A camera frame passes through a face recognition model and the result drives an Arduino control signal in real time.',
      vi: 'Khung hình từ camera đi qua mô hình nhận diện khuôn mặt, và kết quả điều khiển tín hiệu Arduino theo thời gian thực.',
    },
    contribution: [
      { en: 'Built an image → model → Arduino control pipeline.', vi: 'Xây dựng chuỗi xử lý ảnh → mô hình → điều khiển Arduino.' },
      { en: 'Explored real-time inference connected to hardware.', vi: 'Thử nghiệm suy luận thời gian thực gắn với phần cứng.' },
    ],
    technologies: ['Computer vision', 'Arduino'],
    links: { github: 'https://github.com/hoanganh0106/Face-recognition' },
    note: { en: 'Open-source on GitHub.', vi: 'Mã nguồn mở trên GitHub.' },
  },
  {
    slug: 'cisco-networking-projects',
    title: { en: 'Cisco Networking Labs', vi: 'Thực hành mạng Cisco' },
    track: 'other',
    status: 'completed',
    visibility: 'published',
    summary: {
      en: 'Structured Cisco Packet Tracer labs covering routing, switching, OSPF, EIGRP and NAT.',
      vi: 'Các bài thực hành Cisco Packet Tracer về định tuyến, chuyển mạch, OSPF, EIGRP và NAT.',
    },
    overview: {
      en: 'Practical networking work completed through structured labs in Cisco Packet Tracer.',
      vi: 'Phần thực hành mạng máy tính qua các bài lab có cấu trúc trên Cisco Packet Tracer.',
    },
    contribution: [
      { en: 'Configured routing, switching, OSPF, EIGRP and NAT scenarios.', vi: 'Cấu hình các tình huống định tuyến, chuyển mạch, OSPF, EIGRP và NAT.' },
    ],
    technologies: ['Cisco Packet Tracer', 'OSPF', 'EIGRP', 'NAT'],
    links: { github: 'https://github.com/hoanganh0106/Cisco-Networking-Projects' },
    note: { en: 'Configuration files are on GitHub.', vi: 'File cấu hình có trên GitHub.' },
  },
]

export const statusLabel: Record<Status, Text> = {
  prototype: { en: 'Working prototype', vi: 'Nguyên mẫu' },
  'in-development': { en: 'In development', vi: 'Đang phát triển' },
  completed: { en: 'Completed', vi: 'Hoàn thành' },
}

export const trackLabel: Record<Track, Text> = {
  device: { en: 'Devices', vi: 'Thiết bị' },
  research: { en: 'Research foundation', vi: 'Nền tảng nghiên cứu' },
  other: { en: 'Earlier work', vi: 'Dự án trước đây' },
}

export function publishedProjects() {
  return projects.filter(p => p.visibility === 'published')
}

export function projectsByTrack(track: Track) {
  return publishedProjects().filter(p => p.track === track)
}

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug && p.visibility === 'published')
}
