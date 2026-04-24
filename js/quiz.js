
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. QUIZ DATA ---
  const questions = [
    {
      id: 1,
      text: "Which statement best describes your income pattern over the last 12 months?",
      options: [
        { text: "Consistent but stuck at the same level month after month", points: 5 },
        { text: "Rollercoaster—great months followed by terrible months", points: 8 },
        { text: "Slowly declining or stagnant despite more effort", points: 6 },
        { text: "Just starting out, haven't hit income goals yet", points: 3 }
      ]
    },
    {
      id: 2,
      text: "When you set a goal or plan, what usually happens?",
      options: [
        { text: "I execute hard for 1-2 weeks, then momentum dies", points: 7 },
        { text: "I struggle to start—procrastination and resistance", points: 6 },
        { text: "I execute consistently but results don't match effort", points: 8 },
        { text: "I don't follow through at all—mostly just plan", points: 4 }
      ]
    },
    {
      id: 3,
      text: "How much have you invested in courses, coaching, or masterminds in the last 2 years?",
      options: [
        { text: "$0 - $500", points: 2 },
        { text: "$500 - $3,000", points: 5 },
        { text: "$3,000 - $10,000", points: 7 },
        { text: "$10,000+", points: 10 }
      ]
    },
    {
      id: 4,
      text: "How clear are you on your next income goal?",
      options: [
        { text: "Crystal clear—I know exactly what I want", points: 7 },
        { text: "Somewhat clear—I have a range in mind", points: 5 },
        { text: "Unclear—I just know I want 'more'", points: 3 },
        { text: "I have multiple conflicting goals", points: 6 }
      ]
    },
    {
      id: 5,
      text: "When things start going well, do you notice yourself pulling back or self-sabotaging?",
      options: [
        { text: "Yes, all the time—it's my biggest frustration", points: 9 },
        { text: "Sometimes—I notice patterns but don't know why", points: 7 },
        { text: "Rarely—but I do plateau unexpectedly", points: 5 },
        { text: "No, I don't relate to this", points: 2 }
      ]
    },
    {
      id: 6,
      text: "What's your current average monthly income from your business/sales?",
      options: [
        { text: "$0 - $3K", points: 3 },
        { text: "$3K - $10K", points: 6 },
        { text: "$10K - $20K", points: 8 },
        { text: "$20K+", points: 10 }
      ]
    },
    {
      id: 7,
      text: "How much time can you commit daily to subconscious reprogramming work?",
      options: [
        { text: "10-15 minutes (morning routine only)", points: 3 },
        { text: "30 minutes (morning + evening routine)", points: 6 },
        { text: "60+ minutes (full daily practice)", points: 8 },
        { text: "Whatever it takes to break through", points: 10 }
      ]
    },
    {
      id: 8,
      text: "What learning/transformation style works best for you?",
      options: [
        { text: "Give me the tools and I'll figure it out myself", points: 3 },
        { text: "I need a structured program I can follow step-by-step", points: 6 },
        { text: "I need a coach to guide me 1-on-1", points: 9 },
        { text: "I want both the program AND personalized coaching", points: 10 }
      ]
    },
    {
      id: 9,
      text: "Deep down, do you believe you're capable of earning $20K-$50K per month?",
      options: [
        { text: "Absolutely—I know I can, I just haven't yet", points: 7 },
        { text: "Maybe—it seems possible but feels unrealistic for ME", points: 5 },
        { text: "I want to believe it but have serious doubts", points: 8 },
        { text: "Honestly, no—that seems impossible", points: 4 }
      ]
    },
    {
      id: 10,
      text: "How urgent is it for you to break through your current income level?",
      options: [
        { text: "EXTREMELY urgent—I need this now", points: 9 },
        { text: "Very important but I can wait a few months", points: 5 },
        { text: "Important but not pressing—I'm exploring options", points: 3 },
        { text: "Just curious—no immediate timeline", points: 1 }
      ]
    },
    {
      id: 11,
      text: "When it comes to following through, what do you need most?",
      options: [
        { text: "Clear instructions—I'll hold myself accountable", points: 3 },
        { text: "A community of people on the same path", points: 6 },
        { text: "Regular check-ins with a coach", points: 8 },
        { text: "Someone to work with me 1-on-1 weekly", points: 10 }
      ]
    },
    {
      id: 12,
      text: "When making an important investment decision, you typically:",
      options: [
        { text: "Decide quickly when it feels right", points: 8 },
        { text: "Research thoroughly, then decide within a week", points: 6 },
        { text: "Need to talk to spouse/partner before committing", points: 4 },
        { text: "Take a long time and need to 'think about it'", points: 2 }
      ]
    }
  ];

  // --- 2. STATE ---
  let currentQuestionIndex = 0;
  let answerHistory = []; // Stack to store points for back navigation

  // --- 3. DOM ELEMENTS ---
  const landing = document.getElementById('quizLanding');
  const questionView = document.getElementById('quizQuestion');
  const emailView = document.getElementById('quizEmail');
  const resultView = document.getElementById('quizResult');

  const startBtn = document.getElementById('startQuizBtn');
  const prevBtn = document.getElementById('prevBtn');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const currentQuestionNum = document.getElementById('currentQuestionNum');
  const progressBar = document.getElementById('quizProgress');
  const emailForm = document.getElementById('emailForm');

  // --- 4. FUNCTIONS ---

  function startQuiz() {
    landing.classList.remove('active');
    questionView.classList.add('active');
    renderQuestion();
  }

  function renderQuestion() {
    const q = questions[currentQuestionIndex];

    // Update Progress
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionNum.textContent = currentQuestionIndex + 1;

    // Show/Hide Back Button
    if (currentQuestionIndex > 0) {
      prevBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
    }

    // Animate Text Update
    questionText.style.opacity = 0;
    optionsContainer.style.opacity = 0;

    setTimeout(() => {
      questionText.textContent = q.text;
      optionsContainer.innerHTML = '';

      q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt.text;
        btn.style.animationDelay = `${index * 0.1}s`;

        btn.onclick = (e) => handleOptionClick(e, opt.points);

        optionsContainer.appendChild(btn);
      });

      questionText.style.opacity = 1;
      optionsContainer.style.opacity = 1;
    }, 300);
  }

  function handleOptionClick(e, points) {
    // Add selected class for glow effect
    const btn = e.target;
    btn.classList.add('selected');

    // Disable all buttons to prevent double click
    const allBtns = optionsContainer.querySelectorAll('.quiz-option');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    // Wait for animation then proceed
    setTimeout(() => {
      answerHistory.push(points);
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        showEmailCapture();
      }
    }, 500); // 0.5s delay
  }

  function goBack() {
    if (currentQuestionIndex > 0) {
      answerHistory.pop(); // Remove last answer
      currentQuestionIndex--;
      renderQuestion();
    }
  }

  function showEmailCapture() {
    questionView.classList.remove('active');
    emailView.classList.add('active');
    progressBar.style.width = '100%';
  }

  function getTotalScore() {
    return answerHistory.reduce((a, b) => a + b, 0);
  }

  function determineTier(score) {
    if (score <= 30) return 'ACCELERATOR';
    if (score <= 60) return 'MINDSET_RESET';
    if (score <= 85) return 'SIX_PLUS_SIX';
    return 'COMPLETE';
  }

  function renderResult(tier) {
    emailView.classList.remove('active');
    resultView.classList.add('active');
    const finalScore = getTotalScore();

    let content = '';
    // ... (Result HTML generation remains same, just using finalScore) ...
    // Copying logic from previous iteration with finalScore variable

    // Common Calendly Section HTML (Reused for all tiers for consistent booking flow)
    const calendlySection = `
      <div class="calendly-section">
        <h2 class="calendly-headline">
          Book Your Free Subconscious Success Call — Let's Build Your Block Removal Plan
        </h2>
        
        <p class="calendly-subheadline">
          On this complimentary 45-minute strategy session, we'll:<br>
          <strong style="color: var(--white);">✓ Deep-dive into your specific subconscious blocks</strong><br>
          <strong style="color: var(--white);">✓ Identify which reprogramming phase you need most</strong><br>
          <strong style="color: var(--white);">✓ Show you the exact process to reset your income thermostat</strong><br>
          <strong style="color: var(--white);">✓ Create a personalized roadmap for your breakthrough</strong><br><br>
          <strong>No pitch. No pressure. Just clarity on your next steps.</strong>
        </p>
        
        <!-- Booking Embed -->
        <iframe src="https://link.apexmasterymembers.com/widget/booking/WHCA39KySFSxmTvQKN6f" style="width: 100%; height: 700px; border:none; overflow: hidden;" scrolling="no" id="WHCA39KySFSxmTvQKN6f_1776979147857"></iframe><br><script src="https://link.apexmasterymembers.com/js/form_embed.js" type="text/javascript"></script>
        
        <div class="trust-badges">
           <span>🔒 100% Confidential</span>
           <span class="divider">|</span>
           <span>⏱️ 45 Minutes</span>
           <span class="divider">|</span>
           <span>✓ Zero Pressure</span>
        </div>

         <div class="mobile-cta" style="margin-top: 40px; display: none;">
          <p style="margin-bottom: 16px; opacity: 0.7;">Prefer to talk now?</p>
          <a href="tel:+1234567890" class="btn-primary-test" style="justify-content: center; width: 100%;">
            📞 Call Us: (123) 456-7890
          </a>
        </div>
      </div>
    `;

    if (tier === 'ACCELERATOR') {
      content = `
        <div class="result-card">
          <div class="result-score-badge">Your Score: ${finalScore}/100</div>
          <h1>Diagnosis: <span class="highlight">The Foundation Builder</span></h1>
          <p class="result-desc">
            You're in the early stages and need solid tools and structure before deep reprogramming work. 
            Your primary block is <strong>lack of foundation</strong>.
          </p>
          
          <div class="result-blocks">
            <h3>Your Biggest Blocks:</h3>
            <ul>
              <li>No daily reprogramming routine in place—your subconscious runs on old defaults</li>
              <li>Goal structure is vague, so your brain has no clear target to move toward</li>
              <li>You're consuming information but haven't converted knowledge into a repeatable action framework</li>
            </ul>
          </div>

          <p class="transition-text" style="text-align: center; max-width: 600px; margin: 0 auto 40px; color: var(--gold-bright); font-size: 18px;">
            The good news? These blocks aren't permanent. They're just subconscious programming—and programming can be rewritten.
          </p>

          ${calendlySection}
        </div>
      `;
    } else if (tier === 'MINDSET_RESET') {
      content = `
        <div class="result-card">
          <div class="result-score-badge">Your Score: ${finalScore}/100</div>
          <h1>Diagnosis: <span class="highlight">The Self-Guided Transformer</span></h1>
          <p class="result-desc">
            You have <strong>Self-Image Ceiling Syndrome</strong>. You're capable, but an invisible thermostat 
            pulls you back every time you start to break through.
          </p>

          <div class="result-blocks">
            <h3>Your Biggest Blocks:</h3>
            <ul>
              <li>Your income thermostat is locked in the $5K–$10K range—every time you push past it, an unconscious pullback brings you right back</li>
              <li>You lack a consistent daily reprogramming practice, so new beliefs never get installed deeply enough to stick</li>
              <li>Your current environment (friends, feeds, conversations) reinforces who you were, not who you're becoming</li>
            </ul>
          </div>

          <p class="transition-text" style="text-align: center; max-width: 600px; margin: 0 auto 40px; color: var(--gold-bright); font-size: 18px;">
            Now that you know WHAT'S holding you back, the next question is: how do you actually DELETE these blocks?
          </p>

          ${calendlySection}
        </div>
      `;
    } else if (tier === 'SIX_PLUS_SIX') {
      content = `
        <div class="result-card">
          <div class="result-score-badge">Your Score: ${finalScore}/100</div>
          <h1>Diagnosis: <span class="highlight">The Blocked Achiever</span></h1>
          <p class="result-desc">
            You have a clear goal and take action, but you're hitting an <strong>invisible wall</strong>. 
            You need deep 1-on-1 work to identify whether it's a block (Rob) or a goal issue (Matt).
          </p>

          <div class="result-blocks">
            <h3>Your Biggest Blocks:</h3>
            <ul>
              <li>Deep-rooted fear patterns are triggering self-sabotage right at the moments that matter most—closing deals, raising prices, or asking for the sale</li>
              <li>Your nervous system isn't wired for the next level, which creates the yo-yo income cycle: big month, crash, recovery, repeat</li>
              <li>There's a gap between your conscious ambition and your subconscious identity—until those two align, execution will always feel like pushing uphill</li>
            </ul>
          </div>

          <p class="transition-text" style="text-align: center; max-width: 600px; margin: 0 auto 40px; color: var(--gold-bright); font-size: 18px;">
            You've just uncovered the invisible ceiling that's been limiting your income. Don't let it stay there.
          </p>

          ${calendlySection}
        </div>
      `;
    } else {
      content = `
        <div class="result-card">
          <div class="result-score-badge">Your Score: ${finalScore}/100</div>
          <h1>Diagnosis: <span class="highlight">The Total Transformer</span></h1>
          <p class="result-desc">
            You're a serious player ready for the <strong>complete loop</strong>. 
            You understand you need BOTH block removal (Rob) AND new identity installation (Matt).
          </p>

          <div class="result-blocks">
            <h3>Your Biggest Insight:</h3>
            <ul>
              <li>You have stacked subconscious blocks AND misaligned identity architecture—clearing one without fixing the other is why past programs only gave you temporary results</li>
              <li>Rob's clearing work removes the invisible resistance (fear, limiting beliefs, old emotional patterns), while Matt's installation work builds the new identity operating system your goals demand</li>
              <li>You need both engines running simultaneously for real, lasting velocity—this is the gap most high-performers never close</li>
            </ul>
          </div>

          <p class="transition-text" style="text-align: center; max-width: 600px; margin: 0 auto 40px; color: var(--gold-bright); font-size: 18px;">
             We've reserved a limited number of 1-on-1 Subconscious Success Strategy Sessions this week to help you map this out.
          </p>

          ${calendlySection}
        </div>
      `;
    }

    resultView.innerHTML = content;
  }

  // --- 5. EVENT LISTENERS ---
  startBtn.addEventListener('click', startQuiz);

  if (prevBtn) {
    prevBtn.addEventListener('click', goBack);
  }

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const finalScore = getTotalScore();
    const tier = determineTier(finalScore);
    console.log(`User: ${document.getElementById('email').value}, Score: ${finalScore}, Tier: ${tier}`);

    // Simulate loading
    const btn = emailForm.querySelector('button');
    btn.textContent = 'Analyzing...';
    btn.disabled = true;

    setTimeout(() => {
      renderResult(tier);
    }, 1500);
  });

});
