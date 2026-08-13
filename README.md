# AI Money Mentor

> **Your Money, Perfectly Sorted.**

AI Money Mentor is a modern, interactive financial technology landing page designed as an AI-powered financial co-pilot for professionals. The interface combines financial dashboards, animated market visuals, interactive feature exploration, and a Financial IQ scoring experience.

## ✨ Overview

The project presents **AI Money Mentor** as an intelligent personal finance platform focused on helping users understand, organize, and improve their finances.

The homepage includes:

* Interactive navigation
* Animated financial market background
* Simulated market ticker
* Interactive six-tool financial feature visualization
* Financial IQ / Money Health Score section
* Free-trial CTA
* Beta waitlist signup
* Login navigation
* Responsive mobile navigation
* Privacy, Terms, and Contact links
* Animated UI effects and transitions

The project is implemented as a frontend HTML page with CSS styling and JavaScript-driven interactions and animations.

---

## 🚀 Features

### 1. AI Money Mentor Landing Page

The hero section introduces the platform with the headline:

**"Your Money, Perfectly Sorted."**

It also includes:

* AI Money Mentor branding
* Wealth Score 2.0 badge
* User statistics
* Assets managed statistic
* App rating
* Free trial button
* Feature exploration button

The homepage links users to login, trial, feature, and score-related pages.

---

### 2. Animated Financial Market Background

The application uses an HTML5 `<canvas>` to render an animated financial-market-style background.

The visualization contains simulated series representing:

* NIFTY
* SENSEX
* BTC
* RELIANCE
* HDFC
* TCS

The chart uses randomly generated movements and continuously updates the displayed series.

> **Note:** The market background is a visual simulation. It should not be treated as a live financial-data feed.

---

### 3. Simulated Market Ticker

A horizontally scrolling ticker displays financial instruments including:

* NIFTY 50
* SENSEX
* RELIANCE
* TCS
* HDFC BANK
* INFOSYS
* ICICI BANK
* WIPRO
* BAJFINANCE
* BTC/USD
* ETH/USD
* GOLD

Prices and percentage changes are periodically modified using JavaScript to simulate live market movement.

---

## 🌌 Interactive Financial Tools

The Features section presents six financial tools in an interactive solar-system-style visualization.

Users can hover over the tools to view their descriptions.

### Available Tools

#### 🔥 FIRE Path Planner

Provides a financial roadmap covering:

* Monthly SIP requirements
* Goal-based planning
* Asset allocation
* Insurance gaps
* Tax-saving opportunities
* Emergency fund targets

#### 💚 Money Health Score

Scores users across six financial dimensions:

* Emergency preparedness
* Insurance
* Diversification
* Debt health
* Tax efficiency
* Retirement readiness

#### 🔮 Life Event Advisor

Designed to help users plan around major financial events such as:

* Bonuses
* Inheritance
* Marriage
* New baby

The concept considers factors such as tax bracket, portfolio, risk profile, and financial goals.

#### 🧾 Tax Wizard

Designed around tax optimization using Form 16.

The proposed functionality includes:

* Finding missed deductions
* Comparing old vs. new tax regimes
* Ranking tax-saving investments
* Considering risk and liquidity

#### 💑 Couple's Money Planner

A joint financial planning tool focused on:

* HRA optimization
* NPS matching
* SIP allocation
* Joint vs. individual insurance
* Combined net-worth tracking

#### 🔍 MF Portfolio X-Ray

Designed to analyze mutual-fund portfolios using CAMS/KFintech statements.

The planned analysis includes:

* XIRR
* Portfolio overlap
* Expense-ratio impact
* Benchmark comparison
* Rebalancing recommendations

The six tools and their descriptions are defined directly in the JavaScript `TOOLS` configuration.

---

## 📊 Financial IQ / Money Health Score

The Score section presents a Financial IQ concept based on analysis of more than 50 data points.

The interface displays example metrics including:

| Metric          | Example |
| --------------- | ------: |
| Financial Score |     842 |
| Efficiency      |     18% |
| Peer Rank       |  Top 5% |
| Safety Rating   |  Secure |

Users can select **"Calculate My Score"**, which links to `calculate.html`.

---

## 📩 Beta Waitlist

The CTA section invites users to join the waitlist for early access to the AI Wealth Pilot.

Users can enter an email address and select **Secure Access**.

The current form uses:

```html
onsubmit="return false;"
```

so the supplied HTML does **not currently send the email to a backend service**. It is therefore a frontend-only form until a backend/API/email service is connected.

---

## 📱 Responsive Design

The interface includes responsive behavior for smaller screens.

On mobile:

* Desktop navigation links are hidden
* The login CTA is hidden
* A hamburger menu is displayed
* Floating hero cards are hidden
* The score layout changes to a single-column layout

The responsive rules are implemented with CSS media queries.

---

## 🎨 Design

The application uses a dark financial-dashboard aesthetic with:

* Dark backgrounds
* Gold accents
* Teal highlights
* Glass-like cards
* Animated charts
* Canvas visualizations
* Hover effects
* Smooth scrolling
* Responsive layouts

The project imports the following Google Fonts:

* Space Grotesk
* Bebas Neue
* Playfair Display
* Cinzel Decorative

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* HTML5 Canvas

### External Resources

Google Fonts are loaded from Google Fonts.

No frontend framework or package manager is required by the provided HTML.

There is also no evidence in the supplied file of React, Vue, Angular, Node.js, or another JavaScript framework.

---

## 📁 Suggested Project Structure

The supplied file references several additional HTML pages. A recommended project structure is:

```text
AI-Money-Mentor/
│
├── index.html
├── login.html
├── trial.html
├── calculate.html
├── privacy.html
├── terms.html
├── contact.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── README.md
```

> The provided source is currently largely contained in a single HTML file, with CSS and JavaScript embedded directly inside it. The structure above is a recommended organization for future development rather than a claim about the current repository structure.

---

## ▶️ Running the Project

Because the supplied page is a static HTML/CSS/JavaScript application, it can be opened directly in a browser.

### Option 1 — Open directly

Open:

```text
index.html
```

in a modern web browser.

### Option 2 — Use VS Code Live Server

If using Visual Studio Code:

1. Open the project folder.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

This is recommended during development because it makes it easier to test navigation and browser behavior.

---

## 🔗 Page Dependencies

The homepage contains links to additional pages:

```text
login.html
trial.html
calculate.html
privacy.html
terms.html
contact.html
```

These pages should exist in the project directory if the links are expected to work.

---

## ⚠️ Current Limitations

Based on the supplied source, several features are currently frontend/demo functionality:

### Simulated market data

The ticker values are generated and updated in JavaScript rather than retrieved from a live market API.

### Waitlist form

The email form currently prevents normal submission:

```javascript
onsubmit="return false;"
```

A backend or email service would need to be connected for real submissions.

### Financial tools

The six tools are currently represented through the interactive frontend visualization. The supplied source does not establish that the described financial analysis is connected to production AI, financial APIs, databases, or document-processing services.

### Financial Score

The Score section currently displays example metrics and provides a link to `calculate.html`; the actual scoring implementation is not established by the supplied homepage source.

---

## 🔮 Future Development

Potential next steps for turning the prototype into a full application include:

* Connect real market-data APIs
* Add user authentication
* Build the actual Financial IQ questionnaire
* Store user financial profiles
* Connect an AI/LLM backend
* Implement portfolio analysis
* Add Form 16/document processing
* Build tax calculation logic
* Add mutual-fund data APIs
* Add database persistence
* Connect the waitlist to an email service
* Add secure API authentication
* Add automated testing
* Add CI/CD through GitHub Actions
* Deploy the application

---

## 🤝 GitHub Collaboration Workflow

For team development, use feature branches instead of directly modifying `main`.

```text
main
│
├── feature/login
├── feature/financial-score
├── feature/tax-wizard
├── feature/portfolio-xray
├── feature/landing-page
└── bugfix/mobile-navigation
```

Typical workflow:

```bash
git clone <repository-url>

git switch main
git pull origin main

git switch -c feature/my-feature

# Make changes

git status
git add .
git commit -m "Add my feature"

git push -u origin feature/my-feature
```

Then create a **Pull Request** on GitHub.

After review and merge:

```bash
git switch main
git pull origin main
```

---

## 📌 Git Commit Guidelines

Use descriptive commit messages.

### Good

```text
Add interactive financial tools
Add responsive mobile navigation
Implement Financial IQ score section
Add animated market ticker
Fix mobile score layout
Update landing page CTA
```

### Avoid

```text
update
changes
final
done
new
test
```

Small, focused commits make collaborative development and code review much easier.

---

## 🔐 Security Considerations

When converting this frontend prototype into a production financial application:

* Never store passwords in frontend code.
* Never expose API secrets in JavaScript.
* Validate and sanitize user input.
* Use HTTPS.
* Secure authentication tokens.
* Protect financial documents and personal data.
* Implement server-side authorization.
* Use secure database access.
* Add appropriate privacy and compliance controls.

---

## 📄 License

No license is specified in the supplied source.

Before making the project public on GitHub, choose an appropriate license and add a `LICENSE` file if required.

---

## 👨‍💻 Project Status

**Status:** Frontend Prototype / Landing Page

The current project provides the visual and interactive foundation for **AI Money Mentor**. Backend services, authentication, persistent data, real financial APIs, and production AI functionality would need to be implemented separately.

---

## ⭐ AI Money Mentor

**Your Money, Perfectly Sorted.**

A concept for an AI-powered financial co-pilot combining financial planning, scoring, tax assistance, life-event planning, couple financial management, and mutual-fund portfolio analysis into one experience.
