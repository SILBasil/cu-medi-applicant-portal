import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_N0ErUm5Bnxko@ep-hidden-truth-b37brfql-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(databaseUrl);

const firstNamesTh = [
  "กานต์", "ณภัทร", "ภูริช", "สิรดา", "ธนภัทร", "ณัฐมน", "ชญานิศ", "วริศ", "ปิยพัทธ์", "ปัณณธร",
  "ศุภิสรา", "พิชญุตม์", "พิมพ์ลภัส", "อนันดา", "กิตติภพ", "ชิดชนก", "เตชินท์", "นภัสสร", "ธนาคาร", "เกวลิน",
  "รวิภา", "กษิดิศ", "ปรีดี", "ชวัลนุช", "จิรายุ", "ญาณิศา", "พงศ์พิชญ์", "สรชา", "อัครินทร์", "ลลิตา",
  "ศุภณัฐ", "กานต์พิชชา", "ชนิกานต์", "ปัณณวิชญ์", "ฐิติกร", "พชร", "อภิชญา", "ปัญญพัฒน์", "รวิสรา", "ชลธิชา"
];

const lastNamesTh = [
  "วิริยะกุล", "รัตนไพศาล", "สิริวัฒนา", "โสภณพนิช", "โชติช่วง", "จรัสแสง", "ตันติพาณิชย์", "บุญยรัตกลิน", "เตชะณรงค์", "มังกรพันธ์",
  "ศรีสวัสดิ์", "อัศวบำรุง", "จินดารัตน์", "วรโชติ", "พัฒนาการ", "เกียรติวงศ์", "ชัยเจริญ", "พงษ์พาณิชย์", "ธนสาร", "ศิริโภคา",
  "สุขเกษม", "วงษ์สุวรรณ", "เจริญกิจ", "พิทักษ์ธรรม", "เลิศวิริยะ", "ประเสริฐยิ่ง", "มโนธรรม", "อนันตชัย", "กิตติคุณ", "จงสถิตย์"
];

const firstNamesEn = ["Alex", "Michael", "Sophia", "Chloe", "Benjamin", "Lucas", "Emma", "Daniel", "Kevin", "Grace", "Oliver", "Emily", "James", "Lily", "Ethan"];
const lastNamesEn = ["Chen", "Wong", "Smith", "Taylor", "Tanaka", "Lim", "Patel", "Kim", "Davies", "Lee", "Anderson", "Wilson", "Johnson", "Brown", "Miller"];

// Regional Profiles with Universities & Provinces for balanced nationwide distribution
const REGION_POOLS = [
  // 1. Bangkok & Metropolitan (35% -> ~70 applicants)
  {
    regionId: "bkk",
    weight: 35,
    country: "Thailand",
    provinces: ["Bangkok Metropolis", "Nonthaburi", "Pathum Thani", "Samut Prakan", "Nakhon Pathom"],
    universities: [
      { name: "Chulalongkorn University (CU)", majors: ["Biomedical Science", "Biotechnology", "Bioengineering", "Chemistry", "Pharmacy"] },
      { name: "Mahidol University (MU / MUIC)", majors: ["Biological Sciences", "Medical Technology", "Physical Therapy", "Chemistry", "Public Health"] },
      { name: "Thammasat University (TU)", majors: ["Biotechnology", "Health Science", "Chemical Engineering", "Computer Science"] },
      { name: "Kasetsart University (KU)", majors: ["Genetics", "Microbiology", "Veterinary Sciences", "Food Science"] },
      { name: "King Mongkut's (KMUTT/KMITL)", majors: ["Biomedical Engineering", "Chemical Engineering", "Data Science"] }
    ]
  },
  // 2. Northern Thailand (15% -> ~30 applicants)
  {
    regionId: "north",
    weight: 15,
    country: "Thailand",
    provinces: ["Chiang Mai", "Chiang Rai", "Phitsanulok", "Lampang", "Nan"],
    universities: [
      { name: "Chiang Mai University (CMU)", majors: ["Biological Science", "Medical Technology", "Microbiology", "Biochemistry"] },
      { name: "Mae Fah Luang University", majors: ["Biotechnology", "Public Health", "Applied Biological Science"] },
      { name: "Naresuan University", majors: ["Medical Technology", "Pharmacy", "Biomedical Science"] }
    ]
  },
  // 3. Northeastern Thailand / Isan (15% -> ~30 applicants)
  {
    regionId: "northeast",
    weight: 15,
    country: "Thailand",
    provinces: ["Khon Kaen", "Nakhon Ratchasima", "Ubon Ratchathani", "Udon Thani", "Buri Ram"],
    universities: [
      { name: "Khon Kaen University (KKU)", majors: ["Biomedical Science", "Medical Technology", "Biotechnology", "Public Health"] },
      { name: "Suranaree University of Technology", majors: ["Bioengineering", "Public Health", "Applied Biology"] },
      { name: "Ubon Ratchathani University", majors: ["Pharmacy", "Biological Science", "Biotechnology"] }
    ]
  },
  // 4. Central & Eastern Thailand (13% -> ~26 applicants)
  {
    regionId: "central",
    weight: 13,
    country: "Thailand",
    provinces: ["Chon Buri", "Rayong", "Phra Nakhon Si Ayutthaya", "Chachoengsao", "Saraburi"],
    universities: [
      { name: "Burapha University", majors: ["Biomedical Science", "Marine Technology", "Medical Science"] },
      { name: "Silpakorn University", majors: ["Biotechnology", "Pharmacy", "Chemistry"] }
    ]
  },
  // 5. Southern Thailand (12% -> ~24 applicants)
  {
    regionId: "south",
    weight: 12,
    country: "Thailand",
    provinces: ["Songkhla", "Phuket", "Nakhon Si Thammarat", "Surat Thani", "Krabi"],
    universities: [
      { name: "Prince of Songkla University (PSU)", majors: ["Biology", "Medical Technology", "Pharmacy", "Biochemistry"] },
      { name: "Walailak University", majors: ["Biomedical Sciences", "Medical Technology", "Public Health"] }
    ]
  },
  // 6. International / Overseas (10% -> ~20 applicants)
  {
    regionId: "intl",
    weight: 10,
    country: "International",
    provinces: [null],
    universities: [
      { name: "University of Melbourne", majors: ["Biomedicine", "Biochemistry", "Physiology"] },
      { name: "University of British Columbia (UBC)", majors: ["Biology", "Physiology", "Microbiology"] },
      { name: "University of California, Los Angeles (UCLA)", majors: ["Molecular Biology", "Neuroscience"] },
      { name: "National University of Singapore (NUS)", majors: ["Life Sciences", "Biomedical Engineering"] },
      { name: "Imperial College London", majors: ["Biological Sciences", "Medical Biosciences"] }
    ]
  }
];

// Acquisition UTM Sources matching the 4 Client Tag Sets
const utmSources = [
  { source: "cu_medi_web", medium: "website_banner", campaign: "cumedi_admissions_2027" },
  { source: "cu_medi_fb", medium: "social_post", campaign: "cumedi_facebook_official" },
  { source: "mdcu_web", medium: "faculty_portal", campaign: "mdcu_admission_announcement" },
  { source: "mdcu_fb", medium: "social_share", campaign: "mdcu_life_doctor" },
  { source: "other_social_dekd", medium: "tcas_forum", campaign: "dekd_medical_board" },
  { source: "other_social_ig", medium: "instagram_story", campaign: "doctor_journey_reels" },
  { source: "other_academic_page", medium: "partner_page", campaign: "premed_thailand_network" },
  { source: "roadshow_school", medium: "school_visit", campaign: "triam_udom_roadshow" },
  { source: "event_openhouse", medium: "event_booth", campaign: "chula_expo_2027" },
  { source: "direct", medium: "direct_access", campaign: "direct_url" }
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick regional pool based on weighted percentage
function pickRegionPool() {
  const rand = Math.random() * 100;
  let cum = 0;
  for (const pool of REGION_POOLS) {
    cum += pool.weight;
    if (rand <= cum) return pool;
  }
  return REGION_POOLS[0];
}

async function seed() {
  console.log("Starting Neon DB demo seed for CU-MEDi...");
  
  // Wipe existing mock data cleanly
  try {
    await sql`TRUNCATE TABLE applicants RESTART IDENTITY CASCADE;`;
    console.log("Truncated applicants table.");
  } catch (err) {
    console.log("Truncate warning:", err.message);
  }

  const total = 200;        // 200 total applicants (Stage 1)
  const stage2Target = 100; // 100 did Stage 2 (50%)
  const stage3Target = 50;  // 50 did Stage 3 (25% of total, 50% of Stage 2)

  let createdCount = 0;

  for (let i = 1; i <= total; i++) {
    const pool = pickRegionPool();
    const isEn = pool.regionId === "intl";

    const firstName = isEn ? getRandomItem(firstNamesEn) : getRandomItem(firstNamesTh);
    const lastName = isEn ? getRandomItem(lastNamesEn) : getRandomItem(lastNamesTh);
    const name = `${firstName} ${lastName}`;
    const email = `applicant${i}_${firstName.toLowerCase()}${getRandomInt(10, 99)}@gmail.com`;
    const phone = `08${getRandomInt(1, 9)}${getRandomInt(1000000, 9999999)}`;
    
    const uniObj = getRandomItem(pool.universities);
    const university = uniObj.name;
    const major = getRandomItem(uniObj.majors);
    const nationality = isEn ? (Math.random() < 0.4 ? "American" : (Math.random() < 0.5 ? "Singaporean" : "British")) : "Thai";
    const country = isEn ? (Math.random() < 0.35 ? "United States" : (Math.random() < 0.5 ? "Singapore" : (Math.random() < 0.5 ? "United Kingdom" : "Australia"))) : "Thailand";
    const province = isEn ? null : getRandomItem(pool.provinces);

    // Stage determinations
    const hasStage3 = i <= stage3Target;
    const hasStage2 = i <= stage2Target;
    const hasStage1 = true;

    // UTM Attribution
    const utm = getRandomItem(utmSources);

    // Stage 1 Fields
    const s1Intent = Math.random() < 0.65 ? "Class of 2027 (This Year)" : (Math.random() < 0.6 ? "Class of 2028 (Next Year)" : "Class of 2029+");
    const mcatStatus = Math.random() < 0.42 ? "Ready / Taken (500+)" : (Math.random() < 0.48 ? "Preparing (Exam scheduled)" : "Not started yet");
    const engStatus = Math.random() < 0.62 ? "Ready (IELTS 7.0+ / TOEFL 100+)" : (Math.random() < 0.30 ? "Preparing" : "Need to retake");
    const degStatus = Math.random() < 0.80 ? "Graduated / Final Year" : "2nd-3rd Year Undergraduate";

    const s1_req_readiness = {
      mcat: mcatStatus,
      english: engStatus,
      degree: degStatus
    };

    const s1_heard_from = [utm.source, Math.random() < 0.4 ? "University Senior" : "Official Website"];

    // Stage 2 Fields (if applicable)
    let s2_attend_mode = null;
    let s2_session_choice = null;
    let s2_recipient_group = null;
    let s2_education_level = null;
    let s2_year_of_study = null;
    let s2_apply_intent = null;
    let s2_attended = false;
    let s2_comments = null;

    if (hasStage2) {
      s2_attend_mode = Math.random() < 0.65 ? "Onsite (Faculty of Medicine)" : "Online (Zoom Webinar)";
      s2_session_choice = Math.random() < 0.5 ? "Morning Session (09:00 - 12:00)" : (Math.random() < 0.7 ? "Afternoon Session (13:00 - 16:00)" : "Full Day Pass");
      s2_recipient_group = Math.random() < 0.85 ? "Applicant (Self)" : "Parent / Guardian";
      s2_education_level = degStatus.includes("Graduated") ? "Bachelor Degree Graduate" : "University Undergraduate";
      s2_year_of_study = degStatus.includes("Graduated") ? "Graduated" : "Year 4";
      s2_apply_intent = s1Intent;
      // ~78% show up rate
      s2_attended = Math.random() < 0.78;
      s2_comments = Math.random() < 0.3 ? "Interested in clinical rotation abroad and USMLE pathway." : null;
    }

    // Stage 3 Fields (if applicable)
    let s3_applied_status = null;
    let s3_gender = null;
    let s3_age = null;
    let s3_region = null;
    let s3_schools_rank = null;
    let s3_destination_rank = null;
    let s3_future_location = null;
    let s3_postgrad_plan = null;
    let s3_decision_factors_30 = null;
    let s3_first_choice = null;
    let s3_why_cumedi = null;

    if (hasStage3) {
      s3_applied_status = Math.random() < 0.75 ? "First-time Applicant" : "Re-applicant";
      s3_gender = Math.random() < 0.58 ? "Female" : "Male";
      s3_age = getRandomInt(21, 27);
      s3_region = pool.regionId === "bkk" ? "Central & Bangkok" : (pool.regionId === "north" ? "Northern" : (pool.regionId === "northeast" ? "Northeastern" : (pool.regionId === "south" ? "Southern" : "International")));

      const medSchools = [
        "CU-MEDi (Chulalongkorn)",
        "RAMA-IDP (Mahidol)",
        "CICM (Thammasat)",
        "HRH Princess Chulabhorn College",
        "National University of Singapore (NUS)",
        "Duke-NUS Medical School"
      ];
      
      const shuffled = [...medSchools].sort(() => 0.5 - Math.random());
      s3_schools_rank = {
        rank1: "CU-MEDi (Chulalongkorn)",
        rank2: shuffled[1],
        rank3: shuffled[2]
      };

      const destinations = [
        "None (Study in Thailand only)",
        "Asia (outside Thailand)",
        "Europe",
        "Australia / New Zealand",
        "North America"
      ];
      const dShuffled = [...destinations].sort(() => 0.5 - Math.random());
      s3_destination_rank = {
        rank1: Math.random() < 0.45 ? "None (Study in Thailand only)" : dShuffled[0],
        rank2: dShuffled[1],
        rank3: dShuffled[2]
      };

      s3_future_location = Math.random() < 0.65 ? "Thailand" : "Abroad (US / UK / Singapore)";
      s3_postgrad_plan = Math.random() < 0.5 ? "Specialist Residency in Thailand" : (Math.random() < 0.5 ? "US Residency (USMLE Pathway)" : "Clinical Fellowship Abroad");
      s3_first_choice = Math.random() < 0.68 ? "Yes" : "Considering alongside others";
      s3_why_cumedi = "Strong clinical network at King Chulalongkorn Memorial Hospital and internationally certified MD curriculum.";

      s3_decision_factors_30 = {
        hospital_clinical_exposure: getRandomInt(4, 5),
        faculty_reputation: getRandomInt(4, 5),
        curriculum_international: getRandomInt(4, 5),
        usmle_readiness: getRandomInt(4, 5),
        tuition_cost_value: getRandomInt(3, 5),
        location_convenience: getRandomInt(3, 5),
        alumni_success: getRandomInt(4, 5),
        modern_simulation_center: getRandomInt(4, 5),
        research_opportunities: getRandomInt(3, 5)
      };
    }

    const createdDaysAgo = getRandomInt(1, 45);
    const createdAt = new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000).toISOString();
    const stage2At = hasStage2 ? new Date(Date.now() - (createdDaysAgo - 2) * 24 * 60 * 60 * 1000).toISOString() : null;
    const stage3At = hasStage3 ? new Date(Date.now() - (createdDaysAgo - 4) * 24 * 60 * 60 * 1000).toISOString() : null;

    await sql`
      INSERT INTO applicants (
        email, name, nationality, phone, country, province, university, major,
        stage1_completed, stage1_completed_at,
        stage2_completed, stage2_completed_at,
        stage3_completed, stage3_completed_at,
        utm_source, utm_medium, utm_campaign, utm_content, landing_page,
        s1_bachelor_degree, s1_apply_intent, s1_req_readiness, s1_heard_from,
        s2_recipient_group, s2_education_level, s2_year_of_study, s2_apply_intent,
        s2_attend_mode, s2_session_choice, s2_comments, s2_attended,
        s3_applied_status, s3_gender, s3_age, s3_region,
        s3_schools_rank, s3_destination_rank, s3_future_location, s3_postgrad_plan,
        s3_decision_factors_30, s3_first_choice, s3_why_cumedi,
        created_at, updated_at
      ) VALUES (
        ${email}, ${name}, ${nationality}, ${phone}, ${country}, ${province}, ${university}, ${major},
        ${hasStage1}, ${createdAt},
        ${hasStage2}, ${stage2At},
        ${hasStage3}, ${stage3At},
        ${utm.source}, ${utm.medium}, ${utm.campaign}, ${'ad_' + getRandomInt(1, 5)}, '/portal',
        ${major}, ${s1Intent}, ${JSON.stringify(s1_req_readiness)}, ${JSON.stringify(s1_heard_from)},
        ${s2_recipient_group}, ${s2_education_level}, ${s2_year_of_study}, ${s2_apply_intent},
        ${s2_attend_mode}, ${s2_session_choice}, ${s2_comments}, ${s2_attended},
        ${s3_applied_status}, ${s3_gender}, ${s3_age}, ${s3_region},
        ${JSON.stringify(s3_schools_rank)}, ${JSON.stringify(s3_destination_rank)}, ${s3_future_location}, ${s3_postgrad_plan},
        ${JSON.stringify(s3_decision_factors_30)}, ${s3_first_choice}, ${s3_why_cumedi},
        ${createdAt}, ${stage3At || stage2At || createdAt}
      );
    `;

    createdCount++;
    if (createdCount % 25 === 0) {
      console.log(`Inserted ${createdCount} / ${total} applicants...`);
    }
  }

  console.log(`\n🎉 Seed finished! Successfully inserted ${createdCount} applicants across all Thai regions and overseas.`);
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
