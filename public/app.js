// 30 Decision Factors List
const GROUP1_FACTORS = [
  "Institutional reputation and ranking",
  "University's public profile and prestige",
  "International accreditation",
  "Less competitive admission process",
  "High-level healthcare & technology",
  "Great quality of the curriculum",
  "Positive learning environment",
  "Good study-life balance",
  "Research opportunities",
  "Unique opportunities / programs / specializations",
  "Adequate learning & teaching resources",
  "Good academic support system",
  "Clinical opportunities",
  "Shorter program duration",
  "Affiliation with highly ranked universities"
];

const GROUP2_FACTORS = [
  "Good accommodation arrangements",
  "Good campus facilities",
  "Good physical infrastructure",
  "Climate and weather",
  "Friendly & safe local culture",
  "Encouragement from family / teachers",
  "Encouragement from seniors / friends",
  "Interesting local culture & language",
  "Potential language barriers",
  "Sociocultural challenges",
  "Extracurricular activities / student clubs"
];

const GROUP3_FACTORS = [
  "Good value for tuition fee",
  "Good financial support (scholarship, grants)",
  "Affordable living expenses",
  "Access to health care services"
];

const GROUP1_FACTORS_TH = [
  "ชื่อเสียงและอันดับของมหาวิทยาลัย/สถาบัน",
  "ภาพลักษณ์และความน่าเชื่อถือในระดับสากล",
  "การรับรองมาตรฐานระดับนานาชาติ (WFME)",
  "การแข่งขันในขั้นตอนการคัดเลือกที่ไม่สูงจนเกินไป",
  "เทคโนโลยีทางการแพทย์และการบริการสุขภาพระดับสูง",
  "คุณภาพและมาตรฐานของหลักสูตรการศึกษา",
  "บรรยากาศการเรียนรู้ที่ดีและเกื้อหนุน",
  "ความสมดุลระหว่างการเรียนและการใช้ชีวิต (Study-life balance)",
  "โอกาสในการทำงานวิจัยและต่อยอดวิชาการ",
  "โอกาสพิเศษ / แขนงวิชาเฉพาะทางและการศึกษาดูงาน",
  "ทรัพยากรการเรียนการสอนและอาจารย์ผู้สอนที่เพียงพอ",
  "ระบบสนับสนุนและให้คำปรึกษาทางวิชาการแก่นิสิต",
  "โอกาสในการฝึกปฏิบัติงานทางคลินิก (Clinical opportunities)",
  "ระยะเวลาหลักสูตรที่กระชับและคุ้มค่า",
  "ความร่วมมือกับมหาวิทยาลัยชั้นนำระดับโลก"
];

const GROUP2_FACTORS_TH = [
  "การจัดหาที่พักและหอพักที่สะดวกสบาย",
  "สิ่งอำนวยความสะดวกในวิทยาเขตที่ครบครัน",
  "โครงสร้างพื้นฐานและสภาพแวดล้อมทางกายภาพ",
  "สภาพภูมิอากาศและสภาพแวดล้อมที่อยู่อาศัย",
  "วัฒนธรรมท้องถิ่นที่เป็นมิตรและปลอดภัย",
  "การสนับสนุนและกำลังใจจากครอบครัว / อาจารย์",
  "คำแนะนำและการสนับสนุนจากรุ่นพี่ / เพื่อน",
  "ความน่าสนใจของภาษาและวัฒนธรรมท้องถิ่น",
  "อุปสรรคทางภาษาที่อาจเกิดขึ้น",
  "ความท้าทายด้านการปรับตัวทางสังคมและวัฒนธรรม",
  "กิจกรรมนอกหลักสูตรและชมรมนักศึกษา"
];

const GROUP3_FACTORS_TH = [
  "ความคุ้มค่าของอัตราค่าธรรมเนียมการศึกษา",
  "ทุนการศึกษาและการสนับสนุนทางการเงิน",
  "ค่าครองชีพที่เหมาะสมสำหรับการอยู่อาศัย",
  "การเข้าถึงการบริการสุขภาพและการรักษาพยาบาล"
];

let currentLang = 'en';
try {
  currentLang = localStorage.getItem('portal_lang') || 'en';
} catch (e) {}

const I18N = {
  en: {
    stage1_header_title: "CU-MEDi 2027 Admissions (Stage 1: Lead)",
    stage2_header_title: "CU-MEDi Open House Registration (Stage 2)",
    stage3_header_title: "CU-MEDi Applicant Survey (Stage 3)",
    gate_stage1_title: "Sign up for CU-MEDi 2027 Updates",
    gate_stage1_desc: "Enter your email to start your application journey and receive admission reminders.",
    gate_stage2_title: "Open House Registration Verification",
    gate_stage2_desc: "Enter your email to register for the Open House or link to your existing applicant profile.",
    gate_stage3_title: "Applicant Survey Verification",
    gate_stage3_desc: "Enter your email to verify your application and complete the 30 decision factors survey.",
    gate_email_placeholder: "Enter your email address...",
    gate_verify_btn: "Verify & Continue →",
    gate_phone_toggle: "Forgot email? Search by Phone & Name",
    gate_phone_placeholder: "Phone Number (e.g. 0812345678)",
    gate_name_placeholder: "First Name (optional)",
    gate_phone_btn: "Search Record & Continue →",

    step_node_1: "1. Lead Profile",
    step_node_2: "2. Open House",
    step_node_3: "3. Applicant Survey",
    step1_banner_desc: "Your basic profile, degree, and requirements status are saved.",
    step2_banner_desc: "Your event attendance preference is confirmed.",

    req_readiness_title: "2027 Admission Requirements Readiness",
    req_readiness_sub: "self-report only — no actual scores or documents collected at this stage",
    th_item: "Requirements",
    th_done: "Done",
    th_tentative: "Tentative Date",
    th_notdone: "Not Done",
    mcat_title: "MCAT",
    mcat_sub: "MCAT score report",
    eng_title: "English (TOEFL/IELTS)",
    eng_sub: "English proficiency test result",
    degree_title: "Bachelor's degree",
    degree_sub: "Graduation status / Transcript",

    f1_intro_tag: "Stage 01 · Lead Capture",
    f1_intro_title: "The CU-MEDi Applications for 2027",
    f1_intro_desc: "Sign up to get updates on the 2027 admission round. Learn more at <a href=\"https://cu-medi.md.chula.ac.th\" target=\"_blank\" style=\"color: var(--primary);\">cu-medi.md.chula.ac.th</a>. <i>Remark: this portal is not an official application process, but a reminder to ensure requirements are complete.</i>",
    lbl_email: "Email address",
    lbl_fullname: "Full Name",
    lbl_phone: "Phone Number",
    lbl_nationality: "Nationality",
    lbl_country: "Current Address (Country)",
    lbl_degree: "Bachelor's Degree",
    lbl_university: "University / Institution",
    lbl_apply_intent: "Will you apply for CU-MEDi 2027 admission?",
    opt_yes: "Yes",
    opt_no: "No",
    opt_maybe: "Maybe",
    opt_unsure: "Unsure",
    lbl_heard_from: "How did you know the CU-MEDi program?",
    opt_hf_1: "CU-MEDi Website, Facebook, Roadshow",
    opt_hf_2: "Faculty of Medicine sources",
    opt_hf_3: "Chulalongkorn University Open House",
    opt_hf_4: "Social media and personal referrals",
    opt_hf_5: "Other",
    lbl_heard_other: "For other sources, please specify",
    lbl_sugg_process: "Suggestion for the CU-MEDi application process",
    lbl_sugg_openhouse: "Suggestion for the upcoming open house",
    lbl_consent_pdpa: "I acknowledge and consent to the collection and processing of my personal data under PDPA guidelines for CU-MEDi admissions purposes.",
    btn_submit_s1: "Submit Stage 1 Information",
    btn_s1_to_s2: "Save & Continue to Open House (Step 2) →",
    btn_s1_to_s3: "Save & Continue to Next Step →",

    f2_intro_tag: "Stage 02 · Event Registration",
    f2_intro_title: "Pre-registration for CU-MEDi Open House",
    f2_intro_desc: "Pre-register for the Open House · Room 1209, Fl.12 Bhumisiri Mangkhalanusorn Bldg. & Live via MDCU Facebook · <i>Limited Onsite seats.</i>",
    lbl_major: "Major / Area of Study",
    lbl_recipient_group: "You are:",
    recipient_applicant: "Prospective Applicant",
    recipient_parent: "Parent / Guardian",
    recipient_other: "Other",
    lbl_edu_level: "Level of Education",
    lbl_year_study: "Year of Study (if Bachelor)",
    lbl_plan_apply: "Do you plan to apply to CU-MEDi next year?",
    lbl_attend_mode: "How do you plan to attend? *",
    lbl_onsite: "Onsite (Limited Seats at Bhumisiri Bldg.)",
    lbl_online: "Online (via MDCU Facebook Live)",
    lbl_session: "Select Session (for Onsite attendance)",
    opt_sess_1: "Session 1 (Morning / Program Intro)",
    opt_sess_2: "Session 2 (Afternoon / Hands-on Workshop)",
    opt_sess_both: "Both Sessions",
    lbl_comments: "Additional Comments / Questions",
    lbl_f2_pdpa: "I acknowledge that registration details will be used for event check-in and communication.",
    btn_submit_s2: "Submit Open House Registration",
    btn_s2_to_s3: "Save & Continue to Survey (Step 3) →",
    btn_skip_s2: "Skip Open House & Go to Survey (Step 3) →",

    f3_intro_tag: "Stage 03 · Research & Insight",
    f3_intro_title: "CU-MEDi Applicant Survey",
    f3_intro_desc: "A questionnaire about medical school applications (~3–5 min). Participation will not affect your application status. Data will be used to enhance the curriculum and faculty.",
    lbl_applied_status: "Have you applied to CU-MEDi? *",
    lbl_gender_age: "Gender / Age",
    lbl_region: "Region of Citizenship",
    lbl_major_type: "Major Type",
    lbl_top_schools: "Top 3 Medical Schools You Wish to Apply To *",
    factors_title: "30 Decision-Making Factors (Scale 1–5)",
    factors_instruction: "Rate how each factor impacts your decision on your 1st-rank medical school (1 = No effect, 5 = Very significant)",
    group1_title: "Group 1 · Reputation & Academic Factors (15 Factors)",
    group2_title: "Group 2 · Lifestyle & Campus Environment (11 Factors)",
    group3_title: "Group 3 · Cost, Support & Healthcare (4 Factors)",
    lbl_first_choice: "Did you choose CU-MEDi as your first choice?",
    lbl_why_cumedi: "Why did you choose to apply to CU-MEDi?",
    lbl_f3_pdpa: "I consent to providing survey responses for CU-MEDi academic research.",
    btn_submit_s3: "Submit Complete Applicant Survey"
  },
  th: {
    stage1_header_title: "ระบบรับสมัคร CU-MEDi 2027 (ขั้นตอนที่ 1: ข้อมูลผู้สนใจ)",
    stage2_header_title: "ลงทะเบียนเข้าร่วม CU-MEDi Open House (ขั้นตอนที่ 2)",
    stage3_header_title: "แบบสำรวจความคิดเห็นผู้สมัคร CU-MEDi (ขั้นตอนที่ 3)",
    gate_stage1_title: "ลงทะเบียนรับข้อมูลข่าวสาร CU-MEDi 2027",
    gate_stage1_desc: "กรอกอีเมลของคุณเพื่อเริ่มต้นและรับการแจ้งเตือนกำหนดการรับสมัคร",
    gate_stage2_title: "ยืนยันการลงทะเบียน CU-MEDi Open House",
    gate_stage2_desc: "กรอกอีเมลของคุณเพื่อลงทะเบียนเข้าร่วมงาน หรือเชื่อมโยงกับโปรไฟล์ผู้สมัครที่มีอยู่",
    gate_stage3_title: "ยืนยันตัวตนสำหรับทำแบบสำรวจผู้สมัคร",
    gate_stage3_desc: "กรอกอีเมลของคุณเพื่อยืนยันตัวตนและประเมินปัจจัยการตัดสินใจเลือกศึกษาต่อ 30 ปัจจัย",
    gate_email_placeholder: "กรอกที่อยู่อีเมลของคุณ...",
    gate_verify_btn: "ยืนยันและดำเนินการต่อ →",
    gate_phone_toggle: "ลืมอีเมล? ค้นหาด้วยเบอร์โทรและชื่อ",
    gate_phone_placeholder: "เบอร์โทรศัพท์ (เช่น 0812345678)",
    gate_name_placeholder: "ชื่อจริง (ไม่บังคับ)",
    gate_phone_btn: "ค้นหาข้อมูลและดำเนินการต่อ →",

    step_node_1: "1. ข้อมูลผู้สนใจ",
    step_node_2: "2. Open House",
    step_node_3: "3. แบบสำรวจ",
    step1_banner_desc: "บันทึกข้อมูลส่วนตัว วุฒิการศึกษา และสถานะคุณสมบัติเรียบร้อยแล้ว",
    step2_banner_desc: "ยืนยันรูปแบบการเข้าร่วมกิจกรรมของท่านเรียบร้อยแล้ว",

    req_readiness_title: "สถานะความพร้อมของคุณสมบัติ (req_readiness)",
    req_readiness_sub: "self-report เท่านั้น — ไม่เก็บคะแนน/เอกสารจริง",
    th_item: "รายการ",
    th_done: "Done",
    th_tentative: "มีกำหนดแล้ว",
    th_notdone: "ยังไม่ทำ",
    mcat_title: "MCAT",
    mcat_sub: "คะแนนผลสอบ MCAT",
    eng_title: "English (TOEFL/IELTS)",
    eng_sub: "ผลคะแนนการทดสอบภาษาอังกฤษ",
    degree_title: "Bachelor's degree",
    degree_sub: "สถานะการศึกษาปริญญาตรี / ทรานสคริปต์",

    f1_intro_tag: "ขั้นตอนที่ 01 · ข้อมูลผู้สนใจ (Lead Capture)",
    f1_intro_title: "การเปิดรับสมัคร CU-MEDi ประจำปีการศึกษา 2027",
    f1_intro_desc: "ลงทะเบียนเพื่อรับข่าวสารและอัปเดตการรับสมัครรอบปี 2027 ศึกษารายละเอียดเพิ่มเติมได้ที่ <a href=\"https://cu-medi.md.chula.ac.th\" target=\"_blank\" style=\"color: var(--primary);\">cu-medi.md.chula.ac.th</a> <i>หมายเหตุ: ระบบนี้มิใช่การสมัครอย่างเป็นทางการ แต่เป็นการติดตามเตรียมความพร้อมคุณสมบัติของผู้สมัคร</i>",
    lbl_email: "ที่อยู่อีเมล",
    lbl_fullname: "ชื่อ - นามสกุล",
    lbl_phone: "เบอร์โทรศัพท์มือถือ",
    lbl_nationality: "สัญชาติ",
    lbl_country: "ประเทศที่พำนักปัจจุบัน",
    lbl_degree: "วุฒิการศึกษาปริญญาตรี / สาขาวิชา",
    lbl_university: "สถาบันการศึกษา / มหาวิทยาลัย",
    lbl_apply_intent: "คุณตั้งใจจะสมัครเข้าศึกษา CU-MEDi รอบปี 2027 หรือไม่?",
    opt_yes: "ใช่ (Yes)",
    opt_no: "ไม่ใช่ (No)",
    opt_maybe: "อาจจะ (Maybe)",
    opt_unsure: "ยังไม่แน่ใจ (Unsure)",
    lbl_heard_from: "คุณรู้จักหลักสูตร CU-MEDi ผ่านช่องทางใด?",
    opt_hf_1: "เว็บไซต์ CU-MEDi, Facebook, กิจกรรม Roadshow",
    opt_hf_2: "ช่องทางประชาสัมพันธ์ของคณะแพทยศาสตร์",
    opt_hf_3: "งานจุฬาฯ เอกซ์โป / จุฬาฯ Open House",
    opt_hf_4: "โซเชียลมีเดียและคำแนะนำจากคนรู้จัก",
    opt_hf_5: "อื่นๆ",
    lbl_heard_other: "หากเลือกช่องทางอื่นๆ โปรดระบุ",
    lbl_sugg_process: "ข้อเสนอแนะเกี่ยวกับขั้นตอนการรับสมัคร CU-MEDi",
    lbl_sugg_openhouse: "ข้อเสนอแนะสำหรับกิจกรรม Open House ที่กำลังจะมาถึง",
    lbl_consent_pdpa: "ข้าพเจ้ายินยอมให้เก็บ รวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) เพื่อประโยชน์ในการรับสมัคร CU-MEDi",
    btn_submit_s1: "บันทึกข้อมูลขั้นตอนที่ 1",
    btn_s1_to_s2: "บันทึกและไปต่อยัง Open House (ขั้นตอนที่ 2) →",
    btn_s1_to_s3: "บันทึกและไปต่อยังขั้นตอนถัดไป →",

    f2_intro_tag: "ขั้นตอนที่ 02 · ลงทะเบียนกิจกรรม",
    f2_intro_title: "ลงทะเบียนล่วงหน้าเข้าร่วมงาน CU-MEDi Open House",
    f2_intro_desc: "ลงทะเบียนเข้าร่วมงาน ณ ห้อง 1209 ชั้น 12 อาคารภูมิสิริมังคลานุสรณ์ รพ.จุฬาฯ และรับชมถ่ายทอดสดผ่าน Facebook Live MDCU · <i>ที่นั่ง Onsite มีจำนวนจำกัด</i>",
    lbl_major: "สาขาวิชา / สาขาที่กำลังศึกษา",
    lbl_recipient_group: "ท่านคือ:",
    recipient_applicant: "ผู้สนใจสมัครเข้าศึกษา",
    recipient_parent: "ผู้ปกครอง",
    recipient_other: "บุคคลทั่วไป / อื่นๆ",
    lbl_edu_level: "ระดับการศึกษาสูงสุด",
    lbl_year_study: "ชั้นปีที่กำลังศึกษา (กรณีระดับปริญญาตรี)",
    lbl_plan_apply: "ท่านวางแผนจะสมัคร CU-MEDi ในปีหน้าหรือไม่?",
    lbl_attend_mode: "รูปแบบการเข้าร่วมงาน *",
    lbl_onsite: "เข้าร่วม ณ สถานที่จัดงาน (Onsite อาคารภูมิสิริฯ)",
    lbl_online: "รับชมผ่านออนไลน์ (Facebook Live)",
    lbl_session: "รอบเวลาที่ประสงค์เข้าร่วม (Onsite)",
    opt_sess_1: "รอบที่ 1 (ช่วงเช้า / แนะนำหลักสูตร)",
    opt_sess_2: "รอบที่ 2 (ช่วงบ่าย / เวิร์กช็อป Hands-on)",
    opt_sess_both: "ทั้งสองรอบ",
    lbl_comments: "คำถามเพิ่มเติม / ข้อเสนอแนะ",
    lbl_f2_pdpa: "ข้าพเจ้ารับทราบว่าข้อมูลการลงทะเบียนจะนำไปใช้สำหรับเช็คอินเข้างานและติดต่อสื่อสาร",
    btn_submit_s2: "ยืนยันการลงทะเบียน Open House",
    btn_s2_to_s3: "บันทึกและไปทำแบบสำรวจ (ขั้นตอนที่ 3) →",
    btn_skip_s2: "ข้ามขั้นตอน Open House ไปทำแบบสำรวจทันที →",

    f3_intro_tag: "ขั้นตอนที่ 03 · แบบสำรวจและงานวิจัย",
    f3_intro_title: "แบบสำรวจความคิดเห็นผู้สมัคร CU-MEDi",
    f3_intro_desc: "แบบสอบถามเกี่ยวกับการเลือกสมัครเข้าศึกษาหลักสูตรแพทยศาสตรบัณฑิต (~3–5 นาที) การตอบแบบสำรวจไม่มีผลต่อการคัดเลือก ข้อมูลจะนำไปพัฒนาหลักสูตรและการเรียนการสอน",
    lbl_applied_status: "ท่านเคยยื่นใบสมัคร CU-MEDi แล้วหรือไม่? *",
    lbl_gender_age: "เพศ / อายุ",
    lbl_region: "ภูมิภาคของสัญชาติ",
    lbl_major_type: "กลุ่มสาขาวิชาที่สำเร็จการศึกษา",
    lbl_top_schools: "โรงเรียนแพทย์ 3 อันดับแรกที่ท่านต้องการสมัคร *",
    factors_title: "30 ปัจจัยที่มีอิทธิพลต่อการตัดสินใจเลือกโรงเรียนแพทย์",
    factors_instruction: "โปรดให้คะแนนระดับอิทธิพลต่อการตัดสินใจของท่าน ตั้งแต่ 1 (ไม่มีผลเลย) ถึง 5 (มีผลอย่างยิ่ง)",
    group1_title: "กลุ่มที่ 1 · ปัจจัยด้านวิชาการและสถาบัน (15 ปัจจัย)",
    group2_title: "กลุ่มที่ 2 · ปัจจัยด้านสภาพแวดล้อม การใช้ชีวิต และสังคม (11 ปัจจัย)",
    group3_title: "กลุ่มที่ 3 · ปัจจัยด้านการเงิน ค่าใช้จ่าย และบริการสาธารณสุข (4 ปัจจัย)",
    lbl_first_choice: "ท่านเลือก CU-MEDi เป็นอันดับ 1 หรือไม่?",
    lbl_why_cumedi: "เหตุผลที่ท่านตัดสินใจสมัครเข้าศึกษาที่ CU-MEDi",
    lbl_f3_pdpa: "ข้าพเจ้ายินยอมให้ข้อมูลแบบสำรวจเพื่อใช้ในการศึกษาวิจัยทางวิชาการของ CU-MEDi",
    btn_submit_s3: "ส่งแบบสำรวจผู้สมัครที่สมบูรณ์"
  }
};

let factorRatings = {};
let currentStage = 1;
let activeStep = 1;
let verifiedApplicant = null;

// Determine active stage from URL Path or Query parameter
function detectStage() {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const qStage = parseInt(params.get('stage'));

  if (path.includes('/openhouse') || path.includes('/stage2') || qStage === 2) return 2;
  if (path.includes('/survey') || path.includes('/stage3') || qStage === 3) return 3;
  return 1; // default to stage 1 (/interested, /stage1, or /)
}

// Get Source Tracking Parameters (Simple & Flexible)
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  const src = params.get('utm_source') || params.get('source') || params.get('utm') || params.get('from') || '';
  return {
    utm_source: src,
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || params.get('campaign') || '',
    utm_content: params.get('utm_content') || '',
    landing_page: window.location.href
  };
}

// Show Toast
function showToast(msg, isSuccess = true) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.background = isSuccess ? '#10b981' : '#ef4444';
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

// Render 30 Decision Factor Scale
function renderFactors() {
  const g1 = currentLang === 'th' ? GROUP1_FACTORS_TH : GROUP1_FACTORS;
  const g2 = currentLang === 'th' ? GROUP2_FACTORS_TH : GROUP2_FACTORS;
  const g3 = currentLang === 'th' ? GROUP3_FACTORS_TH : GROUP3_FACTORS;

  const renderList = (factors, containerId, prefix) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = factors.map((f, idx) => {
      const factorKey = `${prefix}_${idx + 1}`;
      if (factorRatings[factorKey] === undefined) {
        factorRatings[factorKey] = 3;
      }
      const currentVal = factorRatings[factorKey];
      return `
        <div class="factor-item">
          <div class="factor-name">${idx + 1}. ${f}</div>
          <div class="scale-options">
            ${[1, 2, 3, 4, 5].map(val => `
              <button type="button" class="scale-btn ${val === currentVal ? 'active' : ''}" 
                      onclick="selectFactor('${factorKey}', ${val}, this)">
                ${val}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  };

  renderList(g1, 'group1-factors', 'g1');
  renderList(g2, 'group2-factors', 'g2');
  renderList(g3, 'group3-factors', 'g3');
}

window.selectFactor = function(key, val, el) {
  factorRatings[key] = val;
  const parent = el.closest('.scale-options');
  parent.querySelectorAll('.scale-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
};

// Setup Titles based on active stage
function setupStageHeader() {
  const title = document.getElementById('header-stage-title');
  const gateTitle = document.getElementById('gate-title');
  const gateDesc = document.getElementById('gate-desc');
  const t = I18N[currentLang] || I18N.en;

  if (currentStage === 1) {
    if (title) title.textContent = t.stage1_header_title;
    if (gateTitle) gateTitle.textContent = t.gate_stage1_title;
    if (gateDesc) gateDesc.textContent = t.gate_stage1_desc;
  } else if (currentStage === 2) {
    if (title) title.textContent = t.stage2_header_title;
    if (gateTitle) gateTitle.textContent = t.gate_stage2_title;
    if (gateDesc) gateDesc.textContent = t.gate_stage2_desc;
  } else if (currentStage === 3) {
    if (title) title.textContent = t.stage3_header_title;
    if (gateTitle) gateTitle.textContent = t.gate_stage3_title;
    if (gateDesc) gateDesc.textContent = t.gate_stage3_desc;
  }
}

// Language Switcher Function
function setLanguage(lang) {
  currentLang = lang;
  try {
    localStorage.setItem('portal_lang', lang);
  } catch (e) {}

  const btnEn = document.getElementById('btn-lang-en');
  const btnTh = document.getElementById('btn-lang-th');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  if (btnTh) btnTh.classList.toggle('active', lang === 'th');

  const t = I18N[lang] || I18N.en;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  };

  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el && html !== undefined) el.innerHTML = html;
  };

  // Header & Gate
  setupStageHeader();
  const emailInput = document.getElementById('gate-email-input');
  if (emailInput) emailInput.placeholder = t.gate_email_placeholder;
  setText('btn-gate-verify', t.gate_verify_btn);
  setText('gate-toggle-mode', t.gate_phone_toggle);
  const phoneInput = document.getElementById('gate-phone-input');
  if (phoneInput) phoneInput.placeholder = t.gate_phone_placeholder;
  const nameInput = document.getElementById('gate-name-input');
  if (nameInput) nameInput.placeholder = t.gate_name_placeholder;
  setText('btn-gate-verify-phone', t.gate_phone_btn);

  // Stepper
  setText('node-label-1', t.step_node_1);
  setText('node-label-2', t.step_node_2);
  setText('node-label-3', t.step_node_3);
  setText('step1-banner-desc', t.step1_banner_desc);
  setText('step2-banner-desc', t.step2_banner_desc);

  // Form 1
  setText('f1-tag', t.f1_intro_tag);
  setText('f1-title', t.f1_intro_title);
  setHtml('f1-desc', t.f1_intro_desc);
  setText('lbl-f1-email', t.lbl_email + ' *');
  setText('lbl-f1-name', t.lbl_fullname + ' *');
  setText('lbl-f1-phone', t.lbl_phone + ' *');
  setText('lbl-f1-nat', t.lbl_nationality + ' *');
  setText('lbl-f1-country', t.lbl_country);
  setText('lbl-f1-degree', t.lbl_degree);
  setText('lbl-f1-uni', t.lbl_university);
  setText('lbl-f1-apply', t.lbl_apply_intent + ' *');
  setText('opt-apply-yes', t.opt_yes);
  setText('opt-apply-no', t.opt_no);
  setText('opt-apply-maybe', t.opt_maybe);

  // Table Grid
  setText('lbl-req-readiness', t.req_readiness_title);
  setText('lbl-req-readiness-sub', t.req_readiness_sub);
  setText('th-req-item', t.th_item);
  setText('th-req-done', t.th_done);
  setText('th-req-tentative', t.th_tentative);
  setText('th-req-notdone', t.th_notdone);
  setText('txt-mcat-title', t.mcat_title);
  setText('txt-mcat-sub', t.mcat_sub);
  setText('txt-eng-title', t.eng_title);
  setText('txt-eng-sub', t.eng_sub);
  setText('txt-degree-title', t.degree_title);
  setText('txt-degree-sub', t.degree_sub);

  // Form 1 bottom
  setText('lbl-f1-heard', t.lbl_heard_from + ' *');
  setText('opt-hf-1', t.opt_hf_1);
  setText('opt-hf-2', t.opt_hf_2);
  setText('opt-hf-3', t.opt_hf_3);
  setText('opt-hf-4', t.opt_hf_4);
  setText('opt-hf-5', t.opt_hf_5);
  setText('lbl-f1-other', t.lbl_heard_other);
  setText('lbl-f1-sugg-p', t.lbl_sugg_process);
  setText('lbl-f1-sugg-oh', t.lbl_sugg_openhouse);
  setHtml('lbl-f1-pdpa', t.lbl_consent_pdpa + ' <span class="req">*</span>');

  // Form 2
  setText('f2-tag', t.f2_intro_tag);
  setText('f2-title', t.f2_intro_title);
  setHtml('f2-desc', t.f2_intro_desc);
  setText('lbl-f2-email', t.lbl_email + ' *');
  setText('lbl-f2-name', t.lbl_fullname + ' *');
  setText('lbl-f2-nat', t.lbl_nationality);
  setText('lbl-f2-phone', t.lbl_phone + ' *');
  setText('lbl-f2-uni', t.lbl_university);
  setText('lbl-f2-major', t.lbl_major);
  setText('lbl-f2-recipient', t.lbl_recipient_group + ' *');
  setText('opt-rc-1', t.recipient_applicant);
  setText('opt-rc-2', t.recipient_parent);
  setText('opt-rc-3', t.recipient_other);
  setText('lbl-f2-edu', t.lbl_edu_level);
  setText('lbl-f2-year', t.lbl_year_study);
  setText('lbl-f2-apply', t.lbl_plan_apply + ' *');
  setText('opt-f2-apply-yes', t.opt_yes);
  setText('opt-f2-apply-no', t.opt_no);
  setText('opt-f2-apply-unsure', t.opt_unsure);
  setText('lbl-f2-attend', t.lbl_attend_mode);
  setText('opt-attend-onsite', t.lbl_onsite);
  setText('opt-attend-online', t.lbl_online);
  setText('lbl-f2-session', t.lbl_session);
  setText('opt-sess-1', t.opt_sess_1);
  setText('opt-sess-2', t.opt_sess_2);
  setText('opt-sess-both', t.opt_sess_both);
  setText('lbl-f2-comments', t.lbl_comments);
  setHtml('lbl-f2-pdpa', t.lbl_f2_pdpa + ' <span class="req">*</span>');
  setText('btn-skip-2', t.btn_skip_s2);

  // Form 3
  setText('f3-tag', t.f3_intro_tag);
  setText('f3-title', t.f3_intro_title);
  setHtml('f3-desc', t.f3_intro_desc);
  setText('lbl-f3-email', t.lbl_email + ' *');
  setText('lbl-f3-name', t.lbl_fullname);
  setText('lbl-f3-status', t.lbl_applied_status);
  setText('lbl-f3-gender', t.lbl_gender_age);
  setText('lbl-f3-region', t.lbl_region);
  setText('lbl-f3-major', t.lbl_major_type);
  setText('lbl-f3-schools', t.lbl_top_schools);
  setText('lbl-f3-factors-title', t.factors_title);
  setText('lbl-f3-factors-desc', t.factors_instruction);
  setText('title-group1', t.group1_title);
  setText('title-group2', t.group2_title);
  setText('title-group3', t.group3_title);
  setText('lbl-f3-firstchoice', t.lbl_first_choice + ' *');
  setText('opt-f3-fc-yes', t.opt_yes);
  setText('opt-f3-fc-no', t.opt_no);
  setText('lbl-f3-whycumedi', t.lbl_why_cumedi);
  setHtml('lbl-f3-pdpa', t.lbl_f3_pdpa + ' <span class="req">*</span>');
  setText('btn-submit-3', t.btn_submit_s3);

  // Re-render components with translated content
  renderFactors();
}
window.setLanguage = setLanguage;

// Update Stepper Progress UI
function updateStepperUI() {
  const wrap = document.getElementById('journey-stepper-wrap');
  if (!wrap) return;

  if (currentStage === 1) {
    wrap.style.display = 'none';
    return;
  }

  wrap.style.display = 'block';

  // Toggle Node 3 visibility if target is only stage 2
  const node3 = document.getElementById('node-step-3');
  if (node3) {
    node3.style.display = currentStage === 2 ? 'none' : 'flex';
  }

  // Update progress bar fill
  const fill = document.getElementById('stepper-progress-fill');
  if (fill) {
    if (currentStage === 2) {
      fill.style.width = activeStep === 2 ? '100%' : '0%';
    } else {
      fill.style.width = activeStep === 1 ? '0%' : (activeStep === 2 ? '50%' : '100%');
    }
  }

  // Update Step Nodes
  [1, 2, 3].forEach(step => {
    const node = document.getElementById(`node-step-${step}`);
    const circle = document.getElementById(`node-circle-${step}`);
    if (!node || !circle) return;

    node.classList.remove('active', 'completed');

    const isStepDone = 
      (step === 1 && verifiedApplicant?.stage1_completed) ||
      (step === 2 && verifiedApplicant?.stage2_completed) ||
      (step === 3 && verifiedApplicant?.stage3_completed);

    if (activeStep === step) {
      node.classList.add('active');
      circle.textContent = step;
    } else if (isStepDone) {
      node.classList.add('completed');
      circle.textContent = '✓';
    } else {
      circle.textContent = step;
    }
  });
}

// Show Active Step Container
function showActiveStep(stepNum) {
  activeStep = stepNum;

  // Hide all form containers first
  ['form-stage-1', 'form-stage-2', 'form-stage-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const banner1 = document.getElementById('step1-completed-banner');
  const banner2 = document.getElementById('step2-completed-banner');
  const notice = document.getElementById('new-applicant-notice');

  // Show completed accordion summaries for past completed stages
  if (banner1) {
    banner1.style.display = (verifiedApplicant?.stage1_completed && activeStep > 1) ? 'flex' : 'none';
  }
  if (banner2) {
    banner2.style.display = (verifiedApplicant?.stage2_completed && activeStep > 2) ? 'flex' : 'none';
  }

  // Show active step form
  const activeContainer = document.getElementById(`form-stage-${activeStep}`);
  if (activeContainer) activeContainer.style.display = 'block';

  const t = I18N[currentLang] || I18N.en;

  // Customize Form 1 Submit Button
  const btn1 = document.getElementById('btn-submit-1');
  if (btn1) {
    if (currentStage === 1) {
      btn1.textContent = t.btn_submit_s1;
    } else if (currentStage === 2) {
      btn1.textContent = t.btn_s1_to_s2;
    } else {
      btn1.textContent = t.btn_s1_to_s3;
    }
  }

  // Customize Form 2 Submit Button & Skip button
  const btn2 = document.getElementById('btn-submit-2');
  const btnSkip2 = document.getElementById('btn-skip-2');
  if (btn2) {
    if (currentStage === 2) {
      btn2.textContent = t.btn_submit_s2;
      if (btnSkip2) btnSkip2.style.display = 'none';
    } else if (currentStage === 3) {
      btn2.textContent = t.btn_s2_to_s3;
      if (btnSkip2) {
        btnSkip2.textContent = t.btn_skip_s2;
        btnSkip2.style.display = 'block';
      }
    }
  }

  // Prerequisite Notice Banner for new users
  if (notice) {
    const isNew = !verifiedApplicant?.stage1_completed;
    if (isNew && currentStage > 1 && activeStep === 1) {
      notice.style.display = 'block';
      const targetName = currentStage === 2 ? (currentLang === 'th' ? 'การลงทะเบียน Open House' : 'Open House registration') : (currentLang === 'th' ? 'แบบสำรวจความคิดเห็น' : 'the survey');
      notice.innerHTML = currentLang === 'th'
        ? `<b>📌 คำแนะนำ:</b> สำหรับผู้สนใจครั้งแรก โปรดกรอกข้อมูลขั้นตอนที่ 1 (ประวัติผู้สมัครและความพร้อม) ก่อน จากนั้นกด "บันทึกและไปต่อ" เพื่อไปยัง ${targetName}`
        : `<b>📌 Prerequisite:</b> Please complete Step 1 (Applicant Profile & Readiness) first, then click Save & Continue to proceed to ${targetName}.`;
    } else {
      notice.style.display = 'none';
    }
  }

  updateStepperUI();

  // Smooth scroll to top of current active stage
  const scrollTarget = document.getElementById('journey-stepper-wrap') || activeContainer;
  if (scrollTarget) {
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Accordion toggle to review or re-edit completed steps
window.toggleReviewStep = function(stepNum) {
  const formCard = document.getElementById(`form-stage-${stepNum}`);
  const btnToggle = document.getElementById(`btn-toggle-step${stepNum}`);
  if (!formCard) return;

  const isVisible = formCard.style.display === 'block';
  if (isVisible) {
    formCard.style.display = 'none';
    if (btnToggle) btnToggle.textContent = 'Review / Edit';
    // Re-show active step
    const activeCard = document.getElementById(`form-stage-${activeStep}`);
    if (activeCard && activeStep !== stepNum) activeCard.style.display = 'block';
  } else {
    // Hide active step to focus on review
    ['form-stage-1', 'form-stage-2', 'form-stage-3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    formCard.style.display = 'block';
    if (btnToggle) btnToggle.textContent = 'Close Review ▲';
    formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.navigateToStep = function(stepNum) {
  if (stepNum > currentStage) return;
  const canGo = (stepNum === 1) || 
                (stepNum === 2 && verifiedApplicant?.stage1_completed) ||
                (stepNum === 3 && (verifiedApplicant?.stage2_completed || verifiedApplicant?.stage1_completed));
  if (canGo) {
    showActiveStep(stepNum);
  } else {
    showToast(`Please complete Step ${stepNum - 1} first!`, false);
  }
};

window.skipToStep3 = function() {
  showToast('Skipped Open House. Proceeding to Survey...');
  showActiveStep(3);
};

// Prefill form inputs across all stages with existing data
function prefillData(prefill) {
  if (!prefill) return;

  const emailVal = prefill.email || verifiedApplicant?.email || '';

  // Always bind email fields
  ['f1', 'f2', 'f3'].forEach(fId => {
    const hidden = document.getElementById(`${fId}-email`);
    const display = document.getElementById(`${fId}-email-display`);
    if (hidden && emailVal) hidden.value = emailVal;
    if (display && emailVal) display.value = emailVal;
  });

  // Prefill Form 1
  const f1 = document.getElementById('form1');
  if (f1) {
    if (prefill.name && f1.elements['name']) f1.elements['name'].value = prefill.name;
    if (prefill.phone && f1.elements['phone']) f1.elements['phone'].value = prefill.phone;
    if (prefill.nationality && f1.elements['nationality']) f1.elements['nationality'].value = prefill.nationality;
    if (prefill.country && f1.elements['country']) f1.elements['country'].value = prefill.country;
    if (prefill.university && f1.elements['university']) f1.elements['university'].value = prefill.university;
    if (prefill.bachelor_degree && f1.elements['bachelor_degree']) f1.elements['bachelor_degree'].value = prefill.bachelor_degree;
    if (prefill.req_readiness) {
      let r = prefill.req_readiness;
      if (typeof r === 'string') {
        try { r = JSON.parse(r); } catch(e){}
      }
      if (r) {
        if (r.mcat) {
          const rad = document.querySelector(`input[name="req_mcat"][value="${r.mcat}"]`);
          if (rad) rad.checked = true;
        }
        if (r.english) {
          const rad = document.querySelector(`input[name="req_eng"][value="${r.english}"]`);
          if (rad) rad.checked = true;
        }
        if (r.degree) {
          const rad = document.querySelector(`input[name="req_degree"][value="${r.degree}"]`);
          if (rad) rad.checked = true;
        }
      }
    }
  }

  // Prefill Form 2
  const f2 = document.getElementById('form2');
  if (f2) {
    if (prefill.name) document.getElementById('f2-name').value = prefill.name;
    if (prefill.nationality) document.getElementById('f2-nationality').value = prefill.nationality;
    if (prefill.phone) document.getElementById('f2-phone').value = prefill.phone;
    if (prefill.university && document.getElementById('f2-university')) document.getElementById('f2-university').value = prefill.university;
    if (prefill.major && document.getElementById('f2-major')) document.getElementById('f2-major').value = prefill.major;
  }

  // Prefill Form 3
  const f3 = document.getElementById('form3');
  if (f3) {
    if (prefill.name) document.getElementById('f3-name').value = prefill.name;
    if (prefill.nationality && document.getElementById('f3-nationality')) document.getElementById('f3-nationality').value = prefill.nationality;
    if (prefill.university && document.getElementById('f3-university')) document.getElementById('f3-university').value = prefill.university;
  }
}

// Verification Gate Action
async function verifyAndProceed(params) {
  let url = '/api/applicant/status?';
  if (params.email) url += `email=${encodeURIComponent(params.email)}`;
  else if (params.phone) url += `phone=${encodeURIComponent(params.phone)}&name=${encodeURIComponent(params.name || '')}`;
  else return;

  const btn = params.email ? document.getElementById('btn-gate-verify') : document.getElementById('btn-gate-verify-phone');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Verifying...';
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    verifiedApplicant = data;

    const emailUsed = data.email || params.email || '';

    // Check if TARGET stage is ALREADY COMPLETED
    let isAlreadyDone = false;
    if (currentStage === 1 && data.stage1_completed) isAlreadyDone = true;
    if (currentStage === 2 && data.stage2_completed) isAlreadyDone = true;
    if (currentStage === 3 && data.stage3_completed) isAlreadyDone = true;

    if (isAlreadyDone) {
      document.getElementById('verification-gate').style.display = 'none';
      const doneCard = document.getElementById('already-completed-card');
      const doneText = document.getElementById('already-completed-text');
      if (doneText) {
        doneText.textContent = `You have already submitted Stage ${currentStage} for ${emailUsed}. Your record is securely saved in the system.`;
      }
      if (doneCard) doneCard.style.display = 'block';
      return;
    }

    // Unlock form area
    document.getElementById('verification-gate').style.display = 'none';

    // Show verified pill in header
    const pill = document.getElementById('verified-user-pill');
    const pillText = document.getElementById('verified-email-text');
    if (pill && pillText && emailUsed) {
      pillText.textContent = `✓ ${emailUsed}`;
      pill.style.display = 'block';
    }

    // Explicitly populate email inputs in all forms
    ['f1', 'f2', 'f3'].forEach(fId => {
      const hidden = document.getElementById(`${fId}-email`);
      const display = document.getElementById(`${fId}-email-display`);
      if (hidden) hidden.value = emailUsed;
      if (display) display.value = emailUsed;
    });

    // Prefill all inputs
    const mergedPrefill = Object.assign({ email: emailUsed, phone: params.phone, name: params.name }, data.prefill || {});
    prefillData(mergedPrefill);

    if (data.exists) {
      showToast(`Welcome back, ${data.name || emailUsed}! Profile loaded.`);
    }

    // Determine initial active step in the progressive journey
    if (currentStage === 1) {
      activeStep = 1;
    } else if (currentStage === 2) {
      activeStep = data.stage1_completed ? 2 : 1;
    } else if (currentStage === 3) {
      if (!data.stage1_completed) {
        activeStep = 1;
      } else if (!data.stage2_completed) {
        activeStep = 2;
      } else {
        activeStep = 3;
      }
    }

    showActiveStep(activeStep);

  } catch (err) {
    console.error('Error verifying applicant:', err);
    showToast('Failed to verify. Please try again.', false);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Verify & Continue →';
    }
  }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  currentStage = detectStage();
  setLanguage(currentLang);

  // Mode Toggle (Email vs Phone)
  const toggleBtn = document.getElementById('gate-toggle-mode');
  const emailBox = document.getElementById('gate-email-box');
  const phoneBox = document.getElementById('gate-phone-box');
  let isPhoneMode = false;

  if (toggleBtn && emailBox && phoneBox) {
    toggleBtn.addEventListener('click', () => {
      isPhoneMode = !isPhoneMode;
      if (isPhoneMode) {
        emailBox.style.display = 'none';
        phoneBox.style.display = 'flex';
        toggleBtn.textContent = 'Switch back to Email verification';
      } else {
        emailBox.style.display = 'flex';
        phoneBox.style.display = 'none';
        toggleBtn.textContent = 'Forgot email? Search by Phone & Name';
      }
    });
  }

  // Gate Verify Buttons
  const btnVerifyEmail = document.getElementById('btn-gate-verify');
  if (btnVerifyEmail) {
    btnVerifyEmail.addEventListener('click', () => {
      const email = document.getElementById('gate-email-input').value.trim();
      if (!email) {
        showToast('Please enter a valid email address', false);
        return;
      }
      verifyAndProceed({ email });
    });
  }

  const btnVerifyPhone = document.getElementById('btn-gate-verify-phone');
  if (btnVerifyPhone) {
    btnVerifyPhone.addEventListener('click', () => {
      const phone = document.getElementById('gate-phone-input').value.trim();
      const name = document.getElementById('gate-name-input').value.trim();
      if (!phone) {
        showToast('Please enter your phone number', false);
        return;
      }
      verifyAndProceed({ phone, name });
    });
  }

  // Auto trigger if email is in URL
  const params = new URLSearchParams(window.location.search);
  const urlEmail = params.get('email');
  if (urlEmail) {
    document.getElementById('gate-email-input').value = urlEmail;
    verifyAndProceed({ email: urlEmail });
  }

  // Attend mode toggle for Open House Session
  const attendOnsite = document.getElementById('attend-onsite');
  const attendOnline = document.getElementById('attend-online');
  const sessionBox = document.getElementById('session-select-box');

  if (attendOnsite && attendOnline && sessionBox) {
    attendOnsite.addEventListener('change', () => { sessionBox.style.display = 'block'; });
    attendOnline.addEventListener('change', () => { sessionBox.style.display = 'none'; });
  }

  // ==========================================
  // Form 1 Submit (Stage 1: Lead)
  // ==========================================
  const form1 = document.getElementById('form1');
  if (form1) {
    form1.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-1');
      btn.disabled = true;
      btn.textContent = 'Submitting...';

      const formData = new FormData(form1);
      const heardFrom = formData.getAll('heard_from');
      const utm = getUTMParams();

      const payload = {
        email: document.getElementById('f1-email').value,
        name: formData.get('name'),
        phone: formData.get('phone'),
        nationality: formData.get('nationality'),
        country: formData.get('country'),
        bachelor_degree: formData.get('bachelor_degree'),
        university: formData.get('university'),
        apply_intent: formData.get('apply_intent'),
        req_readiness: {
          mcat: formData.get('req_mcat'),
          english: formData.get('req_eng'),
          degree: formData.get('req_degree')
        },
        heard_from: heardFrom,
        heard_other: formData.get('heard_other'),
        suggestion_process: formData.get('suggestion_process'),
        suggestion_openhouse: formData.get('suggestion_openhouse'),
        consent_pdpa: formData.get('consent_pdpa') === 'on',
        ...utm
      };

      try {
        const res = await fetch('/api/submit/stage1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (res.ok) {
          if (!verifiedApplicant) verifiedApplicant = {};
          verifiedApplicant.stage1_completed = true;

          // Propagate answers to Form 2 & Form 3 in-memory
          const f2Name = document.getElementById('f2-name');
          const f2Phone = document.getElementById('f2-phone');
          const f2Nat = document.getElementById('f2-nationality');
          const f2Uni = document.getElementById('f2-university');
          const f3Name = document.getElementById('f3-name');
          const f3Uni = document.getElementById('f3-university');

          if (f2Name && payload.name) f2Name.value = payload.name;
          if (f2Phone && payload.phone) f2Phone.value = payload.phone;
          if (f2Nat && payload.nationality) f2Nat.value = payload.nationality;
          if (f2Uni && payload.university) f2Uni.value = payload.university;
          if (f3Name && payload.name) f3Name.value = payload.name;
          if (f3Uni && payload.university) f3Uni.value = payload.university;

          if (currentStage === 1) {
            form1.style.display = 'none';
            showToast('Stage 1 submitted successfully! Thank you.');
            const doneCard = document.getElementById('already-completed-card');
            const doneText = document.getElementById('already-completed-text');
            if (doneText) doneText.textContent = "Thank you for registering your interest in CU-MEDi 2027. We have recorded your preferences.";
            if (doneCard) doneCard.style.display = 'block';
          } else if (currentStage === 2) {
            showToast('✓ Step 1 Profile Saved! Opening Open House Registration.');
            showActiveStep(2);
          } else if (currentStage === 3) {
            showToast('✓ Step 1 Profile Saved! Proceeding to Next Step.');
            showActiveStep(2);
          }
        } else {
          showToast(result.error || 'Submission failed', false);
        }
      } catch (err) {
        showToast('Network error, please try again', false);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Submit Stage 1 Information';
      }
    });
  }

  // ==========================================
  // Form 2 Submit (Stage 2: Open House)
  // ==========================================
  const form2 = document.getElementById('form2');
  if (form2) {
    form2.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-2');
      btn.disabled = true;
      btn.textContent = 'Submitting...';

      const formData = new FormData(form2);
      const utm = getUTMParams();

      const payload = {
        email: document.getElementById('f2-email').value,
        name: formData.get('name'),
        nationality: formData.get('nationality'),
        phone: formData.get('phone'),
        university: formData.get('university') || '',
        major: formData.get('major') || '',
        recipient_group: formData.get('recipient_group'),
        education_level: formData.get('education_level'),
        year_of_study: formData.get('year_of_study'),
        apply_intent: formData.get('apply_intent'),
        attend_mode: formData.get('attend_mode'),
        session_choice: formData.get('session_choice'),
        comments: formData.get('comments'),
        consent_pdpa: formData.get('consent_pdpa') === 'on',
        ...utm
      };

      try {
        const res = await fetch('/api/submit/stage2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (res.ok) {
          if (!verifiedApplicant) verifiedApplicant = {};
          verifiedApplicant.stage2_completed = true;

          if (currentStage === 2) {
            form2.style.display = 'none';
            showToast('Open House registration completed! See you at the event.');
            const doneCard = document.getElementById('already-completed-card');
            const doneText = document.getElementById('already-completed-text');
            if (doneText) doneText.textContent = "Your registration for CU-MEDi Open House has been confirmed. A confirmation has been registered to your profile.";
            if (doneCard) doneCard.style.display = 'block';
          } else if (currentStage === 3) {
            showToast('✓ Step 2 Saved! Proceeding to Applicant Survey (Step 3).');
            showActiveStep(3);
          }
        } else {
          showToast(result.error || 'Submission failed', false);
        }
      } catch (err) {
        showToast('Network error, please try again', false);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Submit Open House Registration';
      }
    });
  }

  // ==========================================
  // Form 3 Submit (Stage 3: Survey & 30 Factors)
  // ==========================================
  const form3 = document.getElementById('form3');
  if (form3) {
    form3.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-3');
      btn.disabled = true;
      btn.textContent = 'Submitting...';

      const formData = new FormData(form3);
      const utm = getUTMParams();

      const payload = {
        email: document.getElementById('f3-email').value,
        name: formData.get('name'),
        nationality: formData.get('nationality') || '',
        phone: formData.get('phone') || '',
        university: formData.get('university') || '',
        applied_status: formData.get('applied_status'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        region: formData.get('region'),
        major: formData.get('major'),
        schools_rank: {
          rank1: formData.get('school_rank1'),
          rank2: formData.get('school_rank2'),
          rank3: formData.get('school_rank3')
        },
        decision_factors_30: factorRatings,
        first_choice: formData.get('first_choice'),
        why_cumedi: formData.get('why_cumedi'),
        consent_pdpa: formData.get('consent_pdpa') === 'on',
        ...utm
      };

      try {
        const res = await fetch('/api/submit/stage3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (res.ok) {
          form3.style.display = 'none';
          showToast('Thank you! Your survey responses have been submitted.');
          const doneCard = document.getElementById('already-completed-card');
          const doneText = document.getElementById('already-completed-text');
          if (doneText) doneText.textContent = "Thank you for completing the CU-MEDi Applicant Survey. Your feedback is invaluable to our curriculum development.";
          if (doneCard) doneCard.style.display = 'block';
        } else {
          showToast(result.error || 'Submission failed', false);
        }
      } catch (err) {
        showToast('Network error, please try again', false);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Submit Survey Responses';
      }
    });
  }
});
