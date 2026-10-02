export const projectVi: Record<string, {
  summary: string
  contribution?: string[]
  overview?: string
  disclosureNote?: string
  pipeline?: string[]
}> = {
  'spmamba-3-source': {
    summary: 'Điều chỉnh SPMamba từ bài toán speech separation 2 nguồn sang 3 nguồn và trình bày công trình tại UEC ASEAN Seminar and Workshop 2026.',
    contribution: [
      'Điều chỉnh SPMamba từ speech separation 2 nguồn sang 3 nguồn.',
      'Trình bày công trình tại UEC ASEAN Seminar and Workshop 2026.',
    ],
    overview: 'Một hướng nghiên cứu mở rộng SPMamba từ speech separation 2 nguồn sang 3 nguồn. Project hiện được ghi lại dưới dạng research summary ngắn gọn; chưa công bố paper, code hay empirical results.',
    disclosureNote: 'Đã trình bày tại UEC ASEAN Seminar and Workshop 2026. Hiện chỉ công bố summary; không tuyên bố có public paper, code hay results.',
  },
  'edge-ai-stethoscope': {
    summary: 'Research prototype gần hoàn thiện, tập trung vào heart/lung sound separation và AI inference trực tiếp trên thiết bị.',
    contribution: [
      'Phát triển research prototype theo pipeline acoustic signal và inference từ đầu đến cuối.',
      'Khảo sát cách chạy AI processing gần physical device thay vì phụ thuộc hoàn toàn vào cloud.',
    ],
    overview: 'Research prototype gần hoàn thiện nhằm khảo sát heart/lung sound separation, noise filtering và AI inference trực tiếp gần physical device thay vì phụ thuộc hoàn toàn vào cloud computation.',
    disclosureNote: 'Research prototype đang phát triển; chưa được clinically validated.',
    pipeline: ['Acoustic signal', 'Signal capture', 'Heart / lung source separation', 'Noise filtering', 'AI inference', 'Edge device', 'On-device display'],
  },
  'face-recognition': {
    summary: 'Một AI project ban đầu kết nối image input, model inference và Arduino control signal.',
    contribution: [
      'Xây dựng pipeline image → model → inference → Arduino control signal.',
      'Khảo sát real-time inference kết nối với physical hardware control.',
    ],
    overview: 'Một AI experiment ban đầu kết nối image input và model inference với Arduino control signal. Đây là bước chuyển đầu tiên từ AI software sang physical electronics.',
    disclosureNote: 'Open-source educational repository hiện có trên GitHub.',
  },
  'cisco-networking-projects': {
    summary: 'Các tutorial và lab có cấu trúc trên Cisco Packet Tracer, bao gồm routing, switching, OSPF, EIGRP và NAT.',
    contribution: [
      'Hoàn thành các tutorial và lab có cấu trúc trên Cisco Packet Tracer.',
      'Thực hành cấu hình routing, switching, OSPF, EIGRP và NAT.',
    ],
    overview: 'Phần thực hành networking được triển khai qua các tutorial và lab có cấu trúc trên Cisco Packet Tracer.',
    disclosureNote: 'Configuration files và Packet Tracer work được công khai trên GitHub.',
  },
  'mossformer-2': {
    summary: 'Huấn luyện MossFormer 2 cho bài toán audio separation 3 nguồn.',
    contribution: ['Huấn luyện MossFormer 2 cho audio separation 3 nguồn.'],
    overview: 'Một experiment theo hướng research, tập trung vào việc huấn luyện MossFormer 2 cho audio separation 3 nguồn. Hiện chưa có paper được công bố cho công việc này.',
    disclosureNote: 'Không tuyên bố có public paper. Hiện chỉ công bố summary.',
  },
}
