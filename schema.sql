-- CU-MEDi Applicant Portal Database Schema (Single Master Table)
-- One Connected Record: 1 ผู้สมัคร = 1 แถว อัปเดตข้อมูลสะสมข้ามทั้ง 3 Stages

CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- ข้อมูลโปรไฟล์พื้นฐาน (Common Profile)
    name VARCHAR(255),
    nationality VARCHAR(100),
    phone VARCHAR(50),
    country VARCHAR(100),
    university VARCHAR(255),
    major VARCHAR(255),

    -- สถานะ Journey (Tracking Status)
    stage1_completed BOOLEAN DEFAULT FALSE,
    stage1_completed_at TIMESTAMP WITH TIME ZONE,
    stage2_completed BOOLEAN DEFAULT FALSE,
    stage2_completed_at TIMESTAMP WITH TIME ZONE,
    stage3_completed BOOLEAN DEFAULT FALSE,
    stage3_completed_at TIMESTAMP WITH TIME ZONE,

    -- แคมเปญ / UTM Tracking
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    landing_page TEXT,

    -- STAGE 1: ข้อมูลผู้สนใจ (Interested / Lead)
    s1_bachelor_degree VARCHAR(255),
    s1_apply_intent VARCHAR(50),
    s1_req_readiness JSONB,           -- MCAT / English / Degree readiness
    s1_heard_from JSONB,              -- ช่องทางที่รู้จัก CU-MEDi
    s1_heard_other TEXT,
    s1_info_wanted JSONB,             -- ข้อมูลที่ต้องการเพิ่มเติม
    s1_info_other TEXT,
    s1_interest_reason TEXT,          -- เหตุผลที่สนใจ
    s1_suggestion_process TEXT,
    s1_suggestion_openhouse TEXT,
    s1_consent_pdpa BOOLEAN DEFAULT TRUE,

    -- STAGE 2: ข้อมูลงาน Open House (Pre-registration)
    s2_recipient_group VARCHAR(100),   -- Applicant / Parent / Other
    s2_education_level VARCHAR(100),
    s2_year_of_study VARCHAR(50),
    s2_apply_intent VARCHAR(50),
    s2_attend_mode VARCHAR(50),        -- Online / Onsite
    s2_session_choice VARCHAR(50),     -- Session 1 / 2 / Both
    s2_heard_from JSONB,
    s2_heard_other TEXT,
    s2_comments TEXT,
    s2_attended BOOLEAN DEFAULT FALSE, -- เจ้าหน้าที่เช็คชื่อวันงานจริง
    s2_consent_pdpa BOOLEAN DEFAULT TRUE,

    -- STAGE 3: ข้อมูลแบบสำรวจ (Applicant Survey & 30 Factors)
    s3_applied_status VARCHAR(50),
    s3_intake_round VARCHAR(50),
    s3_gender VARCHAR(50),
    s3_age INT,
    s3_region VARCHAR(100),
    s3_schools_rank JSONB,             -- Top 3 medical schools
    s3_destination_rank JSONB,
    s3_future_location VARCHAR(100),
    s3_postgrad_plan VARCHAR(255),
    s3_decision_factors_30 JSONB,      -- คะแนน 30 ปัจจัย (Scale 1-5)
    s3_first_choice VARCHAR(50),
    s3_why_cumedi TEXT,
    s3_roadshow_want VARCHAR(50),
    s3_consent_pdpa BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index สำหรับค้นหาได้อย่างรวดเร็ว
CREATE INDEX IF NOT EXISTS idx_applicants_email ON applicants(email);
CREATE INDEX IF NOT EXISTS idx_applicants_phone ON applicants(phone);
CREATE INDEX IF NOT EXISTS idx_applicants_name_phone ON applicants(name, phone);
