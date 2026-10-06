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
    lbl_f1_info_wanted: "What information do you want to receive? *",
    lbl_f1_info_other: "For other information wanted, please specify",
    lbl_f1_interest_reason: "What made you interested in CU-MEDi?",
    opt_iw_1: "Curriculum & Academics",
    opt_iw_2: "Scholarships / Expenses",
    opt_iw_3: "Admission Steps & Criteria",
    opt_iw_4: "Activities / Open House",
    opt_iw_5: "Other",
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
    lbl_f2_heard: "How did you hear about our Open House? *",
    opt_f2_hf_1: "CU-MEDi Website",
    opt_f2_hf_2: "CU-MEDi Facebook",
    opt_f2_hf_3: "MDCU Facebook",
    opt_f2_hf_4: "Email Newsletter",
    opt_f2_hf_5: "Word of Mouth",
    opt_f2_hf_6: "Other",
    lbl_f2_heard_other: "For other sources, please specify",
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
    lbl_f3_dest_rank: "Apart from Thailand, where do you wish to apply for medical school? (rank 1–3) *",
    lbl_f3_dest_r1: "First rank *",
    lbl_f3_dest_r2: "Second rank",
    lbl_f3_dest_r3: "Third rank",
    lbl_f3_future_loc: "Where do you see yourself after graduating medical school? (Location) *",
    opt_fl_th: "Thailand",
    opt_fl_other: "Other (specify)",
    lbl_f3_postgrad: "Postgraduation plans *",
    opt_pg_1: "Medical specialization",
    opt_pg_2: "Medical research",
    opt_pg_3: "Medical teaching",
    opt_pg_4: "Healthcare management",
    opt_pg_5: "Medical writing",
    opt_pg_6: "Insurance, law, or public health",
    opt_pg_7: "Other",
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
    lbl_f1_info_wanted: "อยากได้ข้อมูลเรื่องไหน *",
    lbl_f1_info_other: "หากต้องการข้อมูลเรื่องอื่นๆ โปรดระบุ",
    lbl_f1_interest_reason: "อะไรทำให้เริ่มสนใจ CU-MEDi",
    opt_iw_1: "หลักสูตร & การเรียน",
    opt_iw_2: "ทุน / ค่าใช้จ่าย",
    opt_iw_3: "ขั้นตอน & เกณฑ์การสมัคร",
    opt_iw_4: "กิจกรรม / Open House",
    opt_iw_5: "อื่น ๆ",
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
    lbl_f2_heard: "รู้จัก Open House จากไหน *",
    opt_f2_hf_1: "เว็บไซต์ CU-MEDi",
    opt_f2_hf_2: "Facebook CU-MEDi",
    opt_f2_hf_3: "Facebook MDCU",
    opt_f2_hf_4: "จดหมายข่าวทางอีเมล",
    opt_f2_hf_5: "คนรู้จัก / ปากต่อปาก",
    opt_f2_hf_6: "อื่นๆ",
    lbl_f2_heard_other: "หากทราบจากช่องทางอื่น โปรดระบุ",
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
    lbl_f3_dest_rank: "ประเทศนอกไทยที่อยากสมัคร (อันดับ 1–3) *",
    lbl_f3_dest_r1: "อันดับที่ 1 *",
    lbl_f3_dest_r2: "อันดับที่ 2",
    lbl_f3_dest_r3: "อันดับที่ 3",
    lbl_f3_future_loc: "หลังจบอยากอยู่ที่ไหน (สถานที่) *",
    opt_fl_th: "ประเทศไทย (Thailand)",
    opt_fl_other: "ประเทศอื่น (ระบุ)",
    lbl_f3_postgrad: "แผนหลังจบ *",
    opt_pg_1: "แพทย์เฉพาะทาง (Medical specialization)",
    opt_pg_2: "งานวิจัยทางการแพทย์ (Medical research)",
    opt_pg_3: "อาจารย์แพทย์ (Medical teaching)",
    opt_pg_4: "บริหารจัดการระบบสาธารณสุข (Healthcare management)",
    opt_pg_5: "งานเขียนทางการแพทย์ (Medical writing)",
    opt_pg_6: "ประกันภัย, กฎหมาย หรือสาธารณสุขศาสตร์",
    opt_pg_7: "อื่นๆ",
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
      const currentVal = factorRatings[factorKey];
      return `
        <div class="factor-item">
          <div class="factor-name">${idx + 1}. ${f}</div>
          <div class="scale-options">
            ${[1, 2, 3, 4, 5].map(val => `
              <button type="button" class="scale-btn ${currentVal !== undefined && val === currentVal ? 'active' : ''}" 
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

  // Header & Email Buttons
  setupStageHeader();
  ['1', '2', '3'].forEach(num => {
    const btn = document.getElementById(`btn-f${num}-check-email`);
    if (btn) {
      const isLocked = document.getElementById(`f${num}-locked-body`) && !document.getElementById(`f${num}-locked-body`).classList.contains('unlocked');
      if (isLocked) {
        btn.textContent = currentLang === 'th' ? 'ดำเนินการต่อ →' : 'Continue →';
      } else {
        btn.textContent = currentLang === 'th' ? '✓ ตรวจสอบแล้ว' : '✓ Verified';
      }
    }
  });

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
  setText('lbl-f1-info-wanted', t.lbl_f1_info_wanted);
  setText('lbl-f1-info-other', t.lbl_f1_info_other);
  setText('lbl-f1-interest-reason', t.lbl_f1_interest_reason);
  setText('opt-iw-1', t.opt_iw_1);
  setText('opt-iw-2', t.opt_iw_2);
  setText('opt-iw-3', t.opt_iw_3);
  setText('opt-iw-4', t.opt_iw_4);
  setText('opt-iw-5', t.opt_iw_5);
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
  setText('lbl-f2-heard', t.lbl_f2_heard);
  setText('opt-f2-hf-1', t.opt_f2_hf_1);
  setText('opt-f2-hf-2', t.opt_f2_hf_2);
  setText('opt-f2-hf-3', t.opt_f2_hf_3);
  setText('opt-f2-hf-4', t.opt_f2_hf_4);
  setText('opt-f2-hf-5', t.opt_f2_hf_5);
  setText('opt-f2-hf-6', t.opt_f2_hf_6);
  setText('lbl-f2-heard-other', t.lbl_f2_heard_other);
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
  setText('lbl-f3-dest-rank', t.lbl_f3_dest_rank);
  setText('lbl-f3-dest-r1', t.lbl_f3_dest_r1);
  setText('lbl-f3-dest-r2', t.lbl_f3_dest_r2);
  setText('lbl-f3-dest-r3', t.lbl_f3_dest_r3);
  setText('lbl-f3-future-loc', t.lbl_f3_future_loc);
  setText('opt-fl-th', t.opt_fl_th);
  setText('opt-fl-other', t.opt_fl_other);
  setText('lbl-f3-postgrad', t.lbl_f3_postgrad);
  setText('opt-pg-1', t.opt_pg_1);
  setText('opt-pg-2', t.opt_pg_2);
  setText('opt-pg-3', t.opt_pg_3);
  setText('opt-pg-4', t.opt_pg_4);
  setText('opt-pg-5', t.opt_pg_5);
  setText('opt-pg-6', t.opt_pg_6);
  setText('opt-pg-7', t.opt_pg_7);
  setText('lbl-f3-factors-title', t.factors_title);
  setText('lbl-f3-factors-desc', t.factors_instruction);
  setText('title-group1', t.group1_title);
  setText('title-group2', t.group2_title);
  setText('title-group3', t.group3_title);
  setText('lbl-f3-firstchoice', t.lbl_first_choice + ' *');
  setText('opt-f3-fc-yes', t.opt_yes);
  setText('opt-f3-fc-no', t.opt_no);
  setText('lbl-f3-intake', t.lbl_f3_intake);
  setText('lbl-f3-whycumedi', t.lbl_why_cumedi);
  setText('lbl-f3-roadshow', t.lbl_f3_roadshow);
  setHtml('lbl-f3-pdpa', t.lbl_f3_pdpa + ' <span class="req">*</span>');
  setText('btn-submit-3', t.btn_submit_s3);

  // Re-render components with translated content
  renderFactors();
}
window.setLanguage = setLanguage;

// Update Stepper Progress UI (hidden for standalone form mode)
function updateStepperUI() {
  const wrap = document.getElementById('journey-stepper-wrap');
  if (wrap) wrap.style.display = 'none';
}

// Show Active Step Container (Standalone Form)
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
  const wrap = document.getElementById('journey-stepper-wrap');

  if (banner1) banner1.style.display = 'none';
  if (banner2) banner2.style.display = 'none';
  if (notice) notice.style.display = 'none';
  if (wrap) wrap.style.display = 'none';

  // Show target active step form directly
  const activeContainer = document.getElementById(`form-stage-${activeStep}`);
  if (activeContainer) activeContainer.style.display = 'block';

  const t = I18N[currentLang] || I18N.en;

  // Customize Submit Buttons
  const btn1 = document.getElementById('btn-submit-1');
  if (btn1) btn1.textContent = t.btn_submit_s1;

  const btn2 = document.getElementById('btn-submit-2');
  if (btn2) btn2.textContent = t.btn_submit_s2;

  const btnSkip2 = document.getElementById('btn-skip-2');
  if (btnSkip2) btnSkip2.style.display = 'none';

  const btn3 = document.getElementById('btn-submit-3');
  if (btn3) btn3.textContent = t.btn_submit_s3;

  // Smooth scroll to top of current form
  if (activeContainer) {
    activeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Synchronize email fields across all 3 forms
  ['f1', 'f2', 'f3'].forEach(fId => {
    const emailInput = document.getElementById(`${fId}-email`);
    if (emailInput && emailVal) {
      emailInput.value = emailVal;
    }
  });

  const highlightField = (el) => {
    if (!el) return;
    el.classList.add('prefilled-highlight');
    setTimeout(() => el.classList.remove('prefilled-highlight'), 3000);
  };

  // Prefill Form 1 (Lead Capture)
  const f1 = document.getElementById('form1');
  if (f1) {
    if (prefill.name && f1.elements['name']) { f1.elements['name'].value = prefill.name; highlightField(f1.elements['name']); }
    if (prefill.phone && f1.elements['phone']) { f1.elements['phone'].value = prefill.phone; highlightField(f1.elements['phone']); }
    if (prefill.nationality && f1.elements['nationality']) { f1.elements['nationality'].value = prefill.nationality; highlightField(f1.elements['nationality']); }
    if (prefill.country && f1.elements['country']) { f1.elements['country'].value = prefill.country; highlightField(f1.elements['country']); }
    if (prefill.university && f1.elements['university']) { f1.elements['university'].value = prefill.university; highlightField(f1.elements['university']); }
    if (prefill.bachelor_degree && f1.elements['bachelor_degree']) { f1.elements['bachelor_degree'].value = prefill.bachelor_degree; highlightField(f1.elements['bachelor_degree']); }
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

  // Prefill Form 2 (Open House)
  const f2 = document.getElementById('form2');
  if (f2) {
    const f2Name = document.getElementById('f2-name');
    const f2Phone = document.getElementById('f2-phone');
    const f2Nat = document.getElementById('f2-nationality');
    const f2Uni = document.getElementById('f2-university');
    const f2Major = document.getElementById('f2-major');

    if (prefill.name && f2Name) { f2Name.value = prefill.name; highlightField(f2Name); }
    if (prefill.phone && f2Phone) { f2Phone.value = prefill.phone; highlightField(f2Phone); }
    if (prefill.nationality && f2Nat) { f2Nat.value = prefill.nationality; highlightField(f2Nat); }
    if (prefill.university && f2Uni) { f2Uni.value = prefill.university; highlightField(f2Uni); }
    if (prefill.major && f2Major) { f2Major.value = prefill.major; highlightField(f2Major); }
    if (prefill.education_level && document.getElementById('sel-f2-edu')) {
      document.getElementById('sel-f2-edu').value = prefill.education_level;
    }
    if (prefill.year_of_study && document.getElementById('sel-f2-year')) {
      document.getElementById('sel-f2-year').value = prefill.year_of_study;
    }
  }

  // Prefill Form 3 (Survey)
  const f3 = document.getElementById('form3');
  if (f3) {
    const f3Name = document.getElementById('f3-name');
    if (prefill.name && f3Name) { f3Name.value = prefill.name; highlightField(f3Name); }
    if (prefill.gender && document.getElementById('sel-f3-gender')) {
      document.getElementById('sel-f3-gender').value = prefill.gender;
    }
    if (prefill.age && f3.elements['age']) {
      f3.elements['age'].value = prefill.age;
    }
    if (prefill.region && document.getElementById('sel-f3-region')) {
      document.getElementById('sel-f3-region').value = prefill.region;
    }
  }

  syncConditionalDisplay();
}

// Synchronize visibility of "Other" text fields and conditional blocks
function syncConditionalDisplay() {
  const f1HfOther = document.querySelector('#form1 input[name="heard_from"][value="Other"]');
  const f1HfGroup = document.getElementById('f1-heard-other-group');
  if (f1HfGroup) f1HfGroup.style.display = (f1HfOther && f1HfOther.checked) ? 'block' : 'none';

  const f1IwOther = document.querySelector('#form1 input[name="info_wanted"][value="Other"]');
  const f1IwGroup = document.getElementById('f1-info-other-group');
  if (f1IwGroup) f1IwGroup.style.display = (f1IwOther && f1IwOther.checked) ? 'block' : 'none';

  const f2HfOther = document.querySelector('#form2 input[name="heard_from"][value="Other"]');
  const f2HfGroup = document.getElementById('f2-heard-other-group');
  if (f2HfGroup) f2HfGroup.style.display = (f2HfOther && f2HfOther.checked) ? 'block' : 'none';

  const f3FlOther = document.querySelector('#form3 input[name="future_location"]:checked')?.value === 'Other';
  const f3FlGroup = document.getElementById('f3-fl-other-group');
  if (f3FlGroup) f3FlGroup.style.display = f3FlOther ? 'block' : 'none';

  const f3PgOther = document.querySelector('#form3 input[name="postgrad_plan"]:checked')?.value === 'Other';
  const f3PgGroup = document.getElementById('f3-pg-other-group');
  if (f3PgGroup) f3PgGroup.style.display = f3PgOther ? 'block' : 'none';

  const attendOnsite = document.getElementById('attend-onsite');
  const sessionBox = document.getElementById('session-select-box');
  if (sessionBox) sessionBox.style.display = (attendOnsite && attendOnsite.checked) ? 'block' : 'none';
}

function setupConditionalFields() {
  const f1 = document.getElementById('form1');
  if (f1) {
    f1.querySelectorAll('input[name="heard_from"]').forEach(cb => {
      cb.addEventListener('change', syncConditionalDisplay);
    });
    f1.querySelectorAll('input[name="info_wanted"]').forEach(cb => {
      cb.addEventListener('change', syncConditionalDisplay);
    });
  }

  const f2 = document.getElementById('form2');
  if (f2) {
    f2.querySelectorAll('input[name="heard_from"]').forEach(cb => {
      cb.addEventListener('change', syncConditionalDisplay);
    });
    const attendOnsite = document.getElementById('attend-onsite');
    const attendOnline = document.getElementById('attend-online');
    if (attendOnsite) attendOnsite.addEventListener('change', syncConditionalDisplay);
    if (attendOnline) attendOnline.addEventListener('change', syncConditionalDisplay);
  }

  const f3 = document.getElementById('form3');
  if (f3) {
    f3.querySelectorAll('input[name="future_location"]').forEach(rb => {
      rb.addEventListener('change', syncConditionalDisplay);
    });
    f3.querySelectorAll('input[name="postgrad_plan"]').forEach(rb => {
      rb.addEventListener('change', syncConditionalDisplay);
    });
  }

  syncConditionalDisplay();
}

// Check form email, lookup existing records, prefill, and unlock the form
async function checkFormEmail(stageNum) {
  const emailInput = document.getElementById(`f${stageNum}-email`);
  if (!emailInput) return;
  const email = emailInput.value.trim().toLowerCase();

  const statusBanner = document.getElementById(`f${stageNum}-email-status`);
  const lockedBody = document.getElementById(`f${stageNum}-locked-body`);
  const checkBtn = document.getElementById(`btn-f${stageNum}-check-email`);

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    if (statusBanner) {
      statusBanner.className = 'email-status-banner locked';
      statusBanner.innerHTML = `<span>⚠️ ${currentLang === 'th' ? 'กรุณาระบุอีเมลที่ถูกต้อง (เช่น yourname@example.com)' : 'Please enter a valid email address (e.g. yourname@example.com)'}</span>`;
    } else {
      showToast(currentLang === 'th' ? 'กรุณาระบุอีเมลที่ถูกต้อง' : 'Please enter a valid email address', false);
    }
    emailInput.focus();
    return;
  }

  if (checkBtn) {
    checkBtn.disabled = true;
    checkBtn.textContent = currentLang === 'th' ? 'กำลังตรวจสอบ...' : 'Checking...';
  }

  if (statusBanner) {
    statusBanner.className = 'email-status-banner';
    statusBanner.innerHTML = `<span>⏳ ${currentLang === 'th' ? 'กำลังตรวจสอบประวัติผู้สมัคร...' : 'Verifying applicant record...'}</span>`;
  }

  try {
    const res = await fetch(`/api/applicant/status?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    verifiedApplicant = data;

    // Check if THIS stage is already completed
    let isAlreadyDone = false;
    if (stageNum === 1 && data.stage1_completed) isAlreadyDone = true;
    if (stageNum === 2 && data.stage2_completed) isAlreadyDone = true;
    if (stageNum === 3 && data.stage3_completed) isAlreadyDone = true;

    // Unlock the form section!
    if (lockedBody) {
      lockedBody.classList.add('unlocked');
    }
    const emailBox = document.getElementById(`f${stageNum}-email-box`);
    if (emailBox) {
      emailBox.classList.add('verified');
    }

    // Show verified user pill in header
    const pill = document.getElementById('verified-user-pill');
    const pillText = document.getElementById('verified-email-text');
    if (pill && pillText) {
      pillText.textContent = `✓ ${email}`;
      pill.style.display = 'block';
    }

    if (data.exists) {
      // Prefill all available fields across forms
      const mergedPrefill = Object.assign({ email }, data.prefill || {});
      prefillData(mergedPrefill);

      const applicantName = data.name || (data.prefill && data.prefill.name) || '';

      if (isAlreadyDone) {
        if (statusBanner) {
          statusBanner.className = 'email-status-banner already-done';
          statusBanner.innerHTML = `<span>📌 ${currentLang === 'th' 
            ? `คุณเคยส่งฟอร์มนี้เรียบร้อยแล้ว (${email}) หากต้องการแก้ไขข้อมูล สามารถปรับปรุงด้านล่างแล้วกดส่งอีกครั้งได้ครับ` 
            : `You have previously submitted this stage (${email}). You can review or update the details below and submit again.`}</span>`;
        }
        showToast(currentLang === 'th' ? 'พบข้อมูลเดิมที่เคยส่งไว้เรียบร้อยแล้ว' : 'Found existing submission record.');
      } else {
        if (statusBanner) {
          statusBanner.className = 'email-status-banner success';
          statusBanner.innerHTML = `<span>✨ ${currentLang === 'th' 
            ? `ยินดีต้อนรับกลับมา <b>${applicantName || email}</b>! ระบบดึงข้อมูลชื่อ เบอร์โทร และประวัติเดิมให้เรียบร้อยแล้ว` 
            : `Welcome back <b>${applicantName || email}</b>! Your profile details have been auto-filled.`}</span>`;
        }
        showToast(currentLang === 'th' ? `ยินดีต้อนรับกลับมา ${applicantName || email}! ดึงข้อมูลเดิมแล้ว` : `Welcome back, ${applicantName || email}! Profile auto-filled.`);
      }
    } else {
      // New applicant
      if (statusBanner) {
        statusBanner.className = 'email-status-banner new-user';
        statusBanner.innerHTML = `<span>✨ ${currentLang === 'th' 
          ? `บันทึกอีเมลเรียบร้อยแล้ว ท่านสามารถกรอกข้อมูลด้านล่างต่อได้เลยครับ` 
          : `Email confirmed! Please complete the form details below.`}</span>`;
      }
    }

    // Focus smoothly to next field (Full Name)
    const nextInput = document.getElementById(`f${stageNum}-name`);
    if (nextInput && !nextInput.value) {
      nextInput.focus();
    }

  } catch (err) {
    console.error('Error verifying email:', err);
    if (statusBanner) {
      statusBanner.className = 'email-status-banner locked';
      statusBanner.innerHTML = `<span>⚠️ ${currentLang === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง' : 'Connection error, please try again.'}</span>`;
    }
  } finally {
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.textContent = currentLang === 'th' ? '✓ ตรวจสอบแล้ว' : '✓ Verified';
    }
  }
}
window.checkFormEmail = checkFormEmail;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  currentStage = detectStage();
  setLanguage(currentLang);

  // Directly show the target form
  showActiveStep(currentStage);

  // Bind Enter key and onBlur auto-check for email inputs in all forms
  [1, 2, 3].forEach(stageNum => {
    const emailInput = document.getElementById(`f${stageNum}-email`);
    if (emailInput) {
      emailInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkFormEmail(stageNum);
        }
      });
      emailInput.addEventListener('blur', () => {
        const val = emailInput.value.trim();
        const lockedBody = document.getElementById(`f${stageNum}-locked-body`);
        if (val && lockedBody && !lockedBody.classList.contains('unlocked')) {
          checkFormEmail(stageNum);
        }
      });
    }
  });

  // Auto trigger if email is in URL parameter
  const params = new URLSearchParams(window.location.search);
  const urlEmail = params.get('email');
  if (urlEmail) {
    const activeEmailInput = document.getElementById(`f${currentStage}-email`);
    if (activeEmailInput) {
      activeEmailInput.value = urlEmail;
      checkFormEmail(currentStage);
    }
  }

  // Setup conditional visibility for "Other" fields and session choice
  setupConditionalFields();

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
      const infoWanted = formData.getAll('info_wanted');
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
        info_wanted: infoWanted,
        info_other: formData.get('info_other'),
        interest_reason: formData.get('interest_reason'),
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

          if (f2Name && payload.name) f2Name.value = payload.name;
          if (f2Phone && payload.phone) f2Phone.value = payload.phone;
          if (f2Nat && payload.nationality) f2Nat.value = payload.nationality;
          if (f2Uni && payload.university) f2Uni.value = payload.university;
          if (f3Name && payload.name) f3Name.value = payload.name;

          // Show verified pill
          const pill = document.getElementById('verified-user-pill');
          const pillText = document.getElementById('verified-email-text');
          if (pill && pillText && payload.email) {
            pillText.textContent = `✓ ${payload.email}`;
            pill.style.display = 'block';
          }

          form1.style.display = 'none';
          showToast(currentLang === 'th' ? 'บันทึกข้อมูลเรียบร้อยแล้ว ขอบคุณครับ!' : 'Stage 1 submitted successfully! Thank you.');
          const doneCard = document.getElementById('already-completed-card');
          const doneText = document.getElementById('already-completed-text');
          if (doneText) doneText.textContent = currentLang === 'th' ? "ขอบคุณสำหรับการลงทะเบียนความสนใจ CU-MEDi ระบบได้บันทึกข้อมูลเรียบร้อยแล้ว" : "Thank you for registering your interest in CU-MEDi 2027. We have recorded your preferences.";
          if (doneCard) doneCard.style.display = 'block';
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
      const heardFrom = formData.getAll('heard_from');
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
        heard_from: heardFrom,
        heard_other: formData.get('heard_other'),
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

          form2.style.display = 'none';
          showToast(currentLang === 'th' ? 'ลงทะเบียนเข้าร่วม Open House เรียบร้อยแล้ว!' : 'Open House registration completed! See you at the event.');
          const doneCard = document.getElementById('already-completed-card');
          const doneText = document.getElementById('already-completed-text');
          if (doneText) doneText.textContent = currentLang === 'th' ? "การลงทะเบียน CU-MEDi Open House ของคุณเสร็จสมบูรณ์แล้ว ระบบได้บันทึกข้อมูลและส่งการยืนยันเรียบร้อยแล้ว" : "Your registration for CU-MEDi Open House has been confirmed. A confirmation has been registered to your profile.";
          if (doneCard) doneCard.style.display = 'block';
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

      // Build destination_rank object
      const destRank = {
        rank1: formData.get('dest_rank1') || '',
        rank2: formData.get('dest_rank2') || '',
        rank3: formData.get('dest_rank3') || ''
      };

      // Handle future_location with other field
      let futureLocation = formData.get('future_location') || 'Thailand';
      if (futureLocation === 'Other') {
        const otherVal = formData.get('future_location_other')?.trim();
        if (otherVal) futureLocation = otherVal;
      }

      // Handle postgrad_plan with other field
      let postgradPlan = formData.get('postgrad_plan') || '';
      if (postgradPlan === 'Other') {
        const otherVal = formData.get('postgrad_plan_other')?.trim();
        if (otherVal) postgradPlan = otherVal;
      }

      const payload = {
        email: document.getElementById('f3-email').value,
        name: formData.get('name'),
        applied_status: formData.get('applied_status'),
        intake_round: formData.get('intake_round'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        region: formData.get('region'),
        major: formData.get('major'),
        schools_rank: {
          rank1: formData.get('school_rank1'),
          rank2: formData.get('school_rank2'),
          rank3: formData.get('school_rank3')
        },
        destination_rank: destRank,
        future_location: futureLocation,
        postgrad_plan: postgradPlan,
        decision_factors_30: factorRatings,
        first_choice: formData.get('first_choice'),
        why_cumedi: formData.get('why_cumedi'),
        roadshow_want: formData.get('roadshow_want'),
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
          showToast(currentLang === 'th' ? 'ส่งแบบสอบถามเรียบร้อยแล้ว ขอบคุณมากครับ!' : 'Thank you! Your survey responses have been submitted.');
          const doneCard = document.getElementById('already-completed-card');
          const doneText = document.getElementById('already-completed-text');
          if (doneText) doneText.textContent = currentLang === 'th' ? "ขอบคุณสำหรับการให้ข้อมูลแบบสอบถาม CU-MEDi ข้อมูลของท่านจะเป็นประโยชน์อย่างยิ่งต่อการพัฒนาหลักสูตรต่อไป" : "Thank you for completing the CU-MEDi Applicant Survey. Your feedback is invaluable to our curriculum development.";
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
