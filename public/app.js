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
  const renderList = (factors, containerId, prefix) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = factors.map((f, idx) => {
      const factorKey = `${prefix}_${idx + 1}`;
      factorRatings[factorKey] = 3;
      return `
        <div class="factor-item">
          <div class="factor-name">${idx + 1}. ${f}</div>
          <div class="scale-options">
            ${[1, 2, 3, 4, 5].map(val => `
              <button type="button" class="scale-btn ${val === 3 ? 'active' : ''}" 
                      onclick="selectFactor('${factorKey}', ${val}, this)">
                ${val}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  };

  renderList(GROUP1_FACTORS, 'group1-factors', 'g1');
  renderList(GROUP2_FACTORS, 'group2-factors', 'g2');
  renderList(GROUP3_FACTORS, 'group3-factors', 'g3');
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

  if (currentStage === 1) {
    if (title) title.textContent = "CU-MEDi 2027 Admissions (Stage 1: Lead)";
    if (gateTitle) gateTitle.textContent = "Sign up for CU-MEDi 2027 Updates";
    if (gateDesc) gateDesc.textContent = "Enter your email to start your application journey and receive admission reminders.";
  } else if (currentStage === 2) {
    if (title) title.textContent = "CU-MEDi Open House Registration (Stage 2)";
    if (gateTitle) gateTitle.textContent = "Open House Registration Verification";
    if (gateDesc) gateDesc.textContent = "Enter your email to register for the Open House or link to your existing applicant profile.";
  } else if (currentStage === 3) {
    if (title) title.textContent = "CU-MEDi Applicant Survey (Stage 3)";
    if (gateTitle) gateTitle.textContent = "Applicant Survey Verification";
    if (gateDesc) gateDesc.textContent = "Enter your email to verify your application and complete the 30 decision factors survey.";
  }
}

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

  // Customize Form 1 Submit Button
  const btn1 = document.getElementById('btn-submit-1');
  if (btn1) {
    if (currentStage === 1) {
      btn1.textContent = 'Submit Stage 1 Information';
    } else if (currentStage === 2) {
      btn1.textContent = 'Save & Continue to Open House (Step 2) →';
    } else {
      btn1.textContent = 'Save & Continue to Next Step →';
    }
  }

  // Customize Form 2 Submit Button & Skip button
  const btn2 = document.getElementById('btn-submit-2');
  const btnSkip2 = document.getElementById('btn-skip-2');
  if (btn2) {
    if (currentStage === 2) {
      btn2.textContent = 'Submit Open House Registration';
      if (btnSkip2) btnSkip2.style.display = 'none';
    } else if (currentStage === 3) {
      btn2.textContent = 'Save & Continue to Survey (Step 3) →';
      if (btnSkip2) btnSkip2.style.display = 'block';
    }
  }

  // Prerequisite Notice Banner for new users
  if (notice) {
    const isNew = !verifiedApplicant?.stage1_completed;
    if (isNew && currentStage > 1 && activeStep === 1) {
      notice.style.display = 'block';
      notice.innerHTML = `<b>📌 Prerequisite:</b> Please complete Step 1 (Applicant Profile & Readiness) first, then click Save & Continue to proceed to ${currentStage === 2 ? 'Open House registration' : 'the survey'}.`;
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
  setupStageHeader();
  renderFactors();

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
