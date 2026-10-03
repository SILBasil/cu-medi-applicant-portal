-- CU-MEDi Applicant Portal Database Schema (PostgreSQL)

CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    nationality VARCHAR(100),
    phone VARCHAR(50),
    stage1_completed BOOLEAN DEFAULT FALSE,
    stage1_completed_at TIMESTAMP WITH TIME ZONE,
    stage2_completed BOOLEAN DEFAULT FALSE,
    stage2_completed_at TIMESTAMP WITH TIME ZONE,
    stage3_completed BOOLEAN DEFAULT FALSE,
    stage3_completed_at TIMESTAMP WITH TIME ZONE,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    landing_page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form1_interested (
    id SERIAL PRIMARY KEY,
    applicant_id INT REFERENCES applicants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    nationality VARCHAR(100),
    country VARCHAR(100),
    bachelor_degree VARCHAR(255),
    university VARCHAR(255),
    apply_intent VARCHAR(50),
    req_readiness JSONB,
    heard_from JSONB,
    heard_other TEXT,
    suggestion_process TEXT,
    suggestion_openhouse TEXT,
    consent_pdpa BOOLEAN DEFAULT TRUE,
    utm_data JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form2_openhouse (
    id SERIAL PRIMARY KEY,
    applicant_id INT REFERENCES applicants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    nationality VARCHAR(100),
    phone VARCHAR(50),
    recipient_group VARCHAR(100),
    education_level VARCHAR(100),
    year_of_study VARCHAR(50),
    university VARCHAR(255),
    major VARCHAR(255),
    apply_intent VARCHAR(50),
    heard_from JSONB,
    attend_mode VARCHAR(50),
    session_choice VARCHAR(50),
    comments TEXT,
    consent_pdpa BOOLEAN DEFAULT TRUE,
    attended BOOLEAN DEFAULT FALSE,
    utm_data JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form3_survey (
    id SERIAL PRIMARY KEY,
    applicant_id INT REFERENCES applicants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    applied_status VARCHAR(50),
    req_readiness JSONB,
    gender VARCHAR(50),
    age INT,
    education_level VARCHAR(100),
    major VARCHAR(100),
    university VARCHAR(255),
    region VARCHAR(100),
    schools_rank JSONB,
    destination_rank JSONB,
    future_location VARCHAR(100),
    postgrad_plan VARCHAR(255),
    decision_factors_30 JSONB,
    first_choice VARCHAR(50),
    why_cumedi TEXT,
    consent_pdpa BOOLEAN DEFAULT TRUE,
    utm_data JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookup by email and phone/name fallback
CREATE INDEX IF NOT EXISTS idx_applicants_email ON applicants(email);
CREATE INDEX IF NOT EXISTS idx_applicants_phone ON applicants(phone);
CREATE INDEX IF NOT EXISTS idx_applicants_name_phone ON applicants(name, phone);

