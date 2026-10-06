# CU-MEDi Applicant Portal & Intelligence Dashboard

ระบบลงทะเบียนและแดชบอร์ดวิเคราะห์ข้อมูลผู้สนใจศึกษาต่อหลักสูตรแพทยศาสตรบัณฑิต (CU-MEDi) คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย  
โฮสต์บน **Cloudflare Workers** พร้อมฐานข้อมูล **Neon PostgreSQL (Serverless)**

---

## 🌐 ลิงก์เข้าใช้งานระบบ (Production URLs)

**Domain หลัก:** `https://cu-medi-applicant-portal.silbasil0411.workers.dev`

| ฟอร์ม / บริการ | วัตถุประสงค์ | ลิงก์หลัก (Primary Link) | ลิงก์สำรอง (Aliases) |
| :--- | :--- | :--- | :--- |
| **Form 1: Admissions Registration** | ลงทะเบียนรับข้อมูลข่าวสารรอบปี 2027 (Lead Capture) | [เปิดฟอร์มที่ 1](https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested) | `/` หรือ `/stage1` |
| **Form 2: Open House Pre-registration** | ลงทะเบียนเข้าร่วมงาน CU-MEDi Open House (Onsite/Online) | [เปิดฟอร์มที่ 2](https://cu-medi-applicant-portal.silbasil0411.workers.dev/openhouse) | `/stage2` |
| **Form 3: Applicant Survey** | แบบสำรวจผู้สมัครและแบบประเมิน 30 ปัจจัยการตัดสินใจ | [เปิดฟอร์มที่ 3](https://cu-medi-applicant-portal.silbasil0411.workers.dev/survey) | `/stage3` |
| **Executive Intelligence Dashboard** | แดชบอร์ดสรุปสถิติผู้สมัครสำหรับผู้บริหารและอาจารย์ | [เปิดแดชบอร์ด](https://cu-medi-applicant-portal.silbasil0411.workers.dev/dashboard) | `/intelligence` |

---

## 🏷️ การสร้างลิงก์สำหรับแชร์และตรวจวัดต้นทาง (Source Tracking)

ระบบรองรับการติดตามแหล่งที่มาผ่าน Query Parameter `?source=...` (หรือ `?utm_source=...`) โดยระบบจะบันทึกแหล่งที่มาลงฐานข้อมูลและนำไปแยกสถิติใน Dashboard อัตโนมัติ

### ตัวอย่างการใส่แท็กตามแพลตฟอร์ม

#### 1. ฟอร์ม 1 (ลงทะเบียนรับข่าวสาร 2027)
* **Facebook:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested?source=facebook`
* **LINE Official Account:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested?source=line`
* **Instagram (Bio/Story):**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested?source=instagram`
* **TikTok:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested?source=tiktok`
* **เว็บไซต์ CU-MEDi:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/interested?source=website`

#### 2. ฟอร์ม 2 (ลงทะเบียน Open House)
* **โพสต์ประชาสัมพันธ์งาน:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/openhouse?source=facebook-post`
* **ทำ QR Code บนโปสเตอร์/แบนเนอร์:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/openhouse?source=poster-qr`
* **Roadshow:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/openhouse?source=roadshow`

#### 3. ฟอร์ม 3 (แบบสำรวจผู้สมัคร)
* **ส่งผ่าน Email ถึงผู้สมัคร:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/survey?source=email`
* **QR Code ในงาน Open House:**  
  `https://cu-medi-applicant-portal.silbasil0411.workers.dev/survey?source=openhouse-onsite`

> 💡 **Tip:** สามารถตั้งชื่อหลัง `?source=` เป็นชื่อแคมเปญหรือกิจกรรมใดๆ ก็ได้ เช่น `?source=camp2027`, `?source=dek-d`

---

## 💻 การรันสำหรับนักพัฒนา (Local Development)

```bash
# ติดตั้ง dependencies
npm install

# รัน Local Dev Server
npm run dev
# เปิดที่ http://localhost:8787
```