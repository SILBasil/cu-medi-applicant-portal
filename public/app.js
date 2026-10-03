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
let currentApplicantEmail = "";
let currentApplicantData = null;

// UTM Parameters Capture
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || params.get('source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || params.get('campaign') || '',
    utm_content: params.get('utm_content') || '',
    landing_page: window.location.href
  };
}

// Show Toast Message
function showToast(msg, isSuccess = true) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.background = isSuccess ? '#10b981' : '#ef4444';
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

// Render 30 Decision Factor Grid
function renderFactors() {
  const renderList = (factors, containerId, prefix) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = factors.map((f, idx) => {
      const factorKey = `${prefix}_${idx + 1}`;
      factorRatings[factorKey] = 3; // default rating
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

// Switch Stage Tab
window.switchStage = function(stageNum) {
  document.querySelectorAll('.form-card').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));

  const formCard = document.getElementById(`form-stage-${stageNum}`);
  const stepBtn = document.getElementById(`step-btn-${stageNum}`);

  if (formCard) formCard.style.display = 'block';
  if (stepBtn) stepBtn.classList.add('active');

  // Update URL search param
  const url = new URL(window.location);
  url.searchParams.set('stage', stageNum);
  window.history.pushState({}, '', url);

  // If we have an active applicant, prefill fields
  if (currentApplicantData && currentApplicantData.prefill) {
    prefillFormFields(currentApplicantData.prefill);
  }
};

// Prefill form inputs
function prefillFormFields(prefill) {
  ['form1', 'form2', 'form3'].forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;
    if (prefill.email && form.elements['email']) form.elements['email'].value = prefill.email;
    if (prefill.name && form.elements['name']) form.elements['name'].value = prefill.name;
    if (prefill.nationality && form.elements['nationality']) form.elements['nationality'].value = prefill.nationality;
    if (prefill.phone && form.elements['phone']) form.elements['phone'].value = prefill.phone;
  });
}

// Update Step Tracker Visuals
function updateTrackerUI(status) {
  const badge1 = document.getElementById('badge-1');
  const badge2 = document.getElementById('badge-2');
  const badge3 = document.getElementById('badge-3');

  const step1 = document.getElementById('step-btn-1');
  const step2 = document.getElementById('step-btn-2');
  const step3 = document.getElementById('step-btn-3');

  const txt1 = document.getElementById('status-text-1');
  const txt2 = document.getElementById('status-text-2');
  const txt3 = document.getElementById('status-text-3');

  if (status.stage1_completed) {
    step1.classList.add('completed');
    badge1.innerHTML = '✓';
    txt1.textContent = 'Completed';
  }
  if (status.stage2_completed) {
    step2.classList.add('completed');
    badge2.innerHTML = '✓';
    txt2.textContent = 'Completed';
  }
  if (status.stage3_completed) {
    step3.classList.add('completed');
    badge3.innerHTML = '✓';
    txt3.textContent = 'Completed';
  }

  // Show user pill in header
  if (status.email) {
    const pill = document.getElementById('user-pill');
    const display = document.getElementById('user-email-display');
    if (pill && display) {
      display.textContent = `👤 ${status.email}`;
      pill.style.display = 'block';
    }
  }
}

// Check Email or Phone Status
async function checkApplicant(params) {
  let url = '/api/applicant/status?';
  if (params.email) url += `email=${encodeURIComponent(params.email)}`;
  else if (params.phone) url += `phone=${encodeURIComponent(params.phone)}&name=${encodeURIComponent(params.name || '')}`;
  else return;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.exists) {
      currentApplicantEmail = data.email;
      currentApplicantData = data;
      updateTrackerUI(data);
      prefillFormFields(data.prefill);
      showToast(`Welcome back, ${data.name || data.email}! Profile loaded.`);

      // Auto guide to next uncompleted stage
      if (!data.stage1_completed) switchStage(1);
      else if (!data.stage2_completed) switchStage(2);
      else if (!data.stage3_completed) switchStage(3);
    } else {
      showToast('No prior record found. You can start fresh!', true);
      if (params.email) prefillFormFields({ email: params.email });
      if (params.phone) prefillFormFields({ phone: params.phone, name: params.name });
    }
  } catch (err) {
    console.error('Error checking applicant:', err);
  }
}

// Setup Event Listeners & Form Submissions
document.addEventListener('DOMContentLoaded', () => {
  renderFactors();

  // Search mode toggle (Email vs Phone)
  const toggleBtn = document.getElementById('toggle-search-mode');
  const emailBox = document.getElementById('email-mode-box');
  const phoneBox = document.getElementById('phone-mode-box');
  let isPhoneMode = false;

  if (toggleBtn && emailBox && phoneBox) {
    toggleBtn.addEventListener('click', () => {
      isPhoneMode = !isPhoneMode;
      if (isPhoneMode) {
        emailBox.style.display = 'none';
        phoneBox.style.display = 'flex';
        toggleBtn.textContent = 'Switch back to search by Email';
      } else {
        emailBox.style.display = 'flex';
        phoneBox.style.display = 'none';
        toggleBtn.textContent = 'Forgot email? Search by Phone & Name';
      }
    });
  }

  // Handle URL Stage / Query params
  const params = new URLSearchParams(window.location.search);
  const initialStage = parseInt(params.get('stage')) || 1;
  const initialEmail = params.get('email');

  switchStage(initialStage);

  if (initialEmail) {
    document.getElementById('email-checker').value = initialEmail;
    checkApplicant({ email: initialEmail });
  }

  // Check buttons
  const btnCheckEmail = document.getElementById('btn-check-email');
  if (btnCheckEmail) {
    btnCheckEmail.addEventListener('click', () => {
      const email = document.getElementById('email-checker').value.trim();
      if (email) checkApplicant({ email });
    });
  }

  const btnCheckPhone = document.getElementById('btn-check-phone');
  if (btnCheckPhone) {
    btnCheckPhone.addEventListener('click', () => {
      const phone = document.getElementById('phone-checker').value.trim();
      const name = document.getElementById('name-checker').value.trim();
      if (phone) checkApplicant({ phone, name });
    });
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
  // Form 1 Submit (Stage 1: Lead / Interested)
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
        email: formData.get('email'),
        name: formData.get('name'),
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
          showToast('Stage 1 submitted! Proceeding to Stage 2...');
          await checkEmail(payload.email);
          setTimeout(() => switchStage(2), 1200);
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
        email: formData.get('email'),
        name: formData.get('name'),
        nationality: formData.get('nationality'),
        phone: formData.get('phone'),
        recipient_group: formData.get('recipient_group'),
        education_level: formData.get('education_level'),
        year_of_study: formData.get('year_of_study'),
        university: formData.get('university'),
        major: formData.get('major'),
        apply_intent: formData.get('apply_intent'),
        attend_mode: formData.get('attend_mode'),
        session_choice: formData.get('session_choice'),
        comments: formData.get('comments'),
        consent_pdpa: formData.get('consent_pdpa') === 'on',
        utm_data: utm
      };

      try {
        const res = await fetch('/api/submit/stage2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (res.ok) {
          showToast('Open House registration successful! Proceeding to Stage 3...');
          await checkEmail(payload.email);
          setTimeout(() => switchStage(3), 1200);
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
        email: formData.get('email'),
        name: formData.get('name'),
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
        utm_data: utm
      };

      try {
        const res = await fetch('/api/submit/stage3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (res.ok) {
          showToast('🎉 All 3 Stages Completed! Thank you for your feedback.', true);
          await checkEmail(payload.email);
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
