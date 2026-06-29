document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // Elements
  // ========================
  const navItems = document.querySelectorAll(".nav-item");
  const mainContent = document.getElementById("main-content");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchTrigger = document.getElementById("search-trigger");
  const filterChips = document.querySelectorAll(".filter-chip");

  // ========================
  // Page Templates
  // ========================
  const pages = {
    dashboard: `
            <!-- Greeting + Date -->
    <div class="dashboard-header">
        <div>
            <h1>Good morning, Jane.</h1>
            <p class="welcome-text">Monday, June 29, 2026</p>
        </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-grid">
        
        <!-- Widget: Overdue Alerts -->
        <div class="widget widget-alerts" data-widget="alerts">
            <div class="widget-header">
                <h3><i class="ph ph-warning-circle"></i> Overdue</h3>
                <span class="widget-count urgent">2</span>
            </div>
            <div class="widget-body">
                <div class="alert-item">
                    <span class="alert-case">Smith Response to Motion</span>
                    <span class="alert-due">Due Jun 25</span>
                </div>
                <div class="alert-item">
                    <span class="alert-case">Reyes Filing Deadline</span>
                    <span class="alert-due">Due Jun 24</span>
                </div>
            </div>
        </div>

        <!-- Widget: Tasks -->
        <div class="widget widget-tasks" data-widget="tasks">
            <div class="widget-header">
                <h3><i class="ph ph-check-square"></i> My Tasks</h3>
                <span class="widget-count">5</span>
            </div>
            <div class="widget-body">
                <label class="task-item">
                    <input type="checkbox" />
                    <span>File motion — Smith case</span>
                </label>
                <label class="task-item">
                    <input type="checkbox" />
                    <span>Review discovery — Reyes case</span>
                </label>
                <label class="task-item">
                    <input type="checkbox" checked />
                    <span>Call Johnson client</span>
                </label>
                <label class="task-item">
                    <input type="checkbox" />
                    <span>Prep hearing notes</span>
                </label>
                <label class="task-item">
                    <input type="checkbox" />
                    <span>Submit billable hours</span>
                </label>
            </div>
        </div>

        <!-- Widget: Today's Schedule -->
        <div class="widget widget-schedule widget-wide" data-widget="schedule">
            <div class="widget-header">
                <h3><i class="ph ph-calendar"></i> Today's Schedule</h3>
                <span class="widget-date">Jun 29</span>
            </div>
            <div class="widget-body">
                <div class="schedule-item">
                    <div class="schedule-time">9:00 AM</div>
                    <div class="schedule-dot"></div>
                    <div class="schedule-info">
                        <span class="schedule-title">Smith v. Jones — Court Hearing</span>
                        <span class="schedule-meta">Dept 4, County Courthouse</span>
                    </div>
                </div>
                <div class="schedule-item">
                    <div class="schedule-time">11:30 AM</div>
                    <div class="schedule-dot"></div>
                    <div class="schedule-info">
                        <span class="schedule-title">Client Call — M. Thompson</span>
                        <span class="schedule-meta">Phone • 15 min</span>
                    </div>
                </div>
                <div class="schedule-item">
                    <div class="schedule-time">2:00 PM</div>
                    <div class="schedule-dot"></div>
                    <div class="schedule-info">
                        <span class="schedule-title">Deposition Prep — Reyes Case</span>
                        <span class="schedule-meta">Conference Room B</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Widget: Recent Cases -->
        <div class="widget widget-cases" data-widget="recent-cases">
            <div class="widget-header">
                <h3><i class="ph ph-briefcase"></i> Recent Cases</h3>
            </div>
            <div class="widget-body">
                <div class="case-row">
                    <span class="case-id">CASE-0042</span>
                    <span class="case-name">Johnson Divorce</span>
                    <span class="case-status status-active">Active</span>
                </div>
                <div class="case-row">
                    <span class="case-id">CASE-0041</span>
                    <span class="case-name">Reyes Insurance</span>
                    <span class="case-status status-pending">Pending</span>
                </div>
                <div class="case-row">
                    <span class="case-id">CASE-0040</span>
                    <span class="case-name">Thompson Property</span>
                    <span class="case-status status-active">Active</span>
                </div>
            </div>
        </div>

        <!-- Widget: Quick Actions -->
        <div class="widget widget-actions" data-widget="quick-actions">
            <div class="widget-header">
                <h3><i class="ph ph-lightning"></i> Quick Actions</h3>
            </div>
            <div class="widget-body">
                <button class="action-btn">
                    <i class="ph ph-plus-circle"></i>
                    New Case
                </button>
                <button class="action-btn">
                    <i class="ph ph-note-pencil"></i>
                    New Document
                </button>
                <button class="action-btn">
                    <i class="ph ph-check-square"></i>
                    New Task
                </button>
                <button class="action-btn">
                    <i class="ph ph-calendar-plus"></i>
                    Schedule Meeting
                </button>
            </div>
        </div>

    </div>
        `,
    cases: `
    <div class="page-header">
        <h1>Cases</h1>
        <button class="btn-new-case" onclick="alert('New case form coming soon')">
            <i class="ph ph-plus"></i> New Case
        </button>
    </div>

    <!-- Filter Bar -->
    <div class="cases-filter-bar">
        <div class="filter-tabs">
            <button class="filter-tab active">All Cases</button>
            <button class="filter-tab">Active</button>
            <button class="filter-tab">Pending</button>
            <button class="filter-tab">Closed</button>
        </div>
        <div class="filter-search">
            <i class="ph ph-magnifying-glass"></i>
            <input type="text" placeholder="Filter cases..." class="cases-filter-input" />
        </div>
    </div>

    <!-- Cases List -->
    <div class="cases-list">
        <div class="case-card" data-case="0042">
            <div class="case-card-header">
                <span class="case-card-id">CASE-0042</span>
                <span class="case-status status-active">Active</span>
            </div>
            <div class="case-card-title">Johnson Divorce Settlement</div>
            <div class="case-card-meta">
                <span><i class="ph ph-folder"></i> Family Law</span>
                <span><i class="ph ph-calendar"></i> Next: Jul 15, 2026</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>

        <div class="case-card" data-case="0041">
            <div class="case-card-header">
                <span class="case-card-id">CASE-0041</span>
                <span class="case-status status-pending">Pending</span>
            </div>
            <div class="case-card-title">Reyes Insurance Claim</div>
            <div class="case-card-meta">
                <span><i class="ph ph-folder"></i> Corporate</span>
                <span><i class="ph ph-calendar"></i> Next: TBD</span>
                <span><i class="ph ph-user"></i> Tom Smith</span>
            </div>
        </div>

        <div class="case-card" data-case="0040">
            <div class="case-card-header">
                <span class="case-card-id">CASE-0040</span>
                <span class="case-status status-active">Active</span>
            </div>
            <div class="case-card-title">Thompson Property Dispute</div>
            <div class="case-card-meta">
                <span><i class="ph ph-folder"></i> Property</span>
                <span><i class="ph ph-calendar"></i> Next: Jun 30, 2026</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>

        <div class="case-card" data-case="0039">
            <div class="case-card-header">
                <span class="case-card-id">CASE-0039</span>
                <span class="case-status status-closed">Closed</span>
            </div>
            <div class="case-card-title">Garcia Employment Dispute</div>
            <div class="case-card-meta">
                <span><i class="ph ph-folder"></i> Employment</span>
                <span><i class="ph ph-calendar"></i> Closed: May 12, 2026</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>
    </div>

    <!-- Peek Panel (hidden by default) -->
    <div class="peek-overlay" id="peek-overlay" style="display: none;">
        <div class="peek-panel" id="peek-panel">
            <!-- Content injected by JS -->
        </div>
    </div>
`,
    calendar:
      '<h1>Calendar</h1><p class="welcome-text">Schedule and manage court dates, meetings, and deadlines.</p>',
    documents: `
    <div class="page-header">
        <h1>Documents</h1>
        <button class="btn-new-case" onclick="alert('New document coming soon')">
            <i class="ph ph-plus"></i> New Document
        </button>
    </div>

    <!-- Filter Bar -->
    <div class="cases-filter-bar">
        <div class="filter-tabs">
            <button class="filter-tab active">All</button>
            <button class="filter-tab">Drafts</button>
            <button class="filter-tab">Final</button>
            <button class="filter-tab">Filed</button>
        </div>
        <div class="filter-search">
            <i class="ph ph-magnifying-glass"></i>
            <input type="text" placeholder="Search documents..." class="cases-filter-input" />
        </div>
    </div>

    <!-- Documents List -->
    <div class="cases-list">
        <div class="case-card" data-doc="doc-001">
            <div class="case-card-header">
                <span class="doc-type-badge draft">Draft</span>
                <span class="case-card-id">Smith v. Jones</span>
            </div>
            <div class="doc-card-title">
                <i class="ph ph-file-text doc-icon"></i>
                Motion to Dismiss
            </div>
            <div class="case-card-meta">
                <span><i class="ph ph-clock"></i> Modified 2 hours ago</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>

        <div class="case-card" data-doc="doc-002">
            <div class="case-card-header">
                <span class="doc-type-badge final">Final</span>
                <span class="case-card-id">Johnson Divorce</span>
            </div>
            <div class="doc-card-title">
                <i class="ph ph-file-text doc-icon"></i>
                Settlement Agreement
            </div>
            <div class="case-card-meta">
                <span><i class="ph ph-clock"></i> Modified yesterday</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>

        <div class="case-card" data-doc="doc-003">
            <div class="case-card-header">
                <span class="doc-type-badge filed">Filed</span>
                <span class="case-card-id">Reyes Insurance</span>
            </div>
            <div class="doc-card-title">
                <i class="ph ph-file-text doc-icon"></i>
                Demand Letter
            </div>
            <div class="case-card-meta">
                <span><i class="ph ph-clock"></i> Filed Jun 20</span>
                <span><i class="ph ph-user"></i> Tom Smith</span>
            </div>
        </div>

        <div class="case-card" data-doc="doc-004">
            <div class="case-card-header">
                <span class="doc-type-badge draft">Draft</span>
                <span class="case-card-id">Thompson Property</span>
            </div>
            <div class="doc-card-title">
                <i class="ph ph-file-text doc-icon"></i>
                Summary Judgment Motion
            </div>
            <div class="case-card-meta">
                <span><i class="ph ph-clock"></i> Modified Jun 25</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>

        <div class="case-card" data-doc="doc-005">
            <div class="case-card-header">
                <span class="doc-type-badge final">Final</span>
                <span class="case-card-id">Smith v. Jones</span>
            </div>
            <div class="doc-card-title">
                <i class="ph ph-file-text doc-icon"></i>
                Discovery Request — Plaintiff
            </div>
            <div class="case-card-meta">
                <span><i class="ph ph-clock"></i> Modified Jun 18</span>
                <span><i class="ph ph-user"></i> Jane Doe</span>
            </div>
        </div>
    </div>

    <!-- Peek Panel for Documents -->
    <div class="peek-overlay" id="doc-peek-overlay" style="display: none;">
        <div class="peek-panel" id="doc-peek-panel">
            <!-- Content injected by JS -->
        </div>
    </div>
`,
    messages:
      '<h1>Messages</h1><p class="welcome-text">Team communication and case discussions.</p>',
    drafts:
      '<h1>My Drafts</h1><p class="welcome-text">Continue working on your saved legal drafts.</p>',
    templates:
      '<h1>Templates</h1><p class="welcome-text">Legal document templates and forms.</p>',
    "my-notes":
      '<h1>My Notes</h1><p class="welcome-text">Personal notes and case observations.</p>',
    "quick-capture":
      '<h1>Quick Capture</h1><p class="welcome-text">Quickly jot down thoughts, tasks, or reminders.</p>',
    "team-general":
      '<h1>General Teamspace</h1><p class="welcome-text">Shared resources and firm-wide announcements.</p>',
    "team-litigation":
      '<h1>Litigation Department</h1><p class="welcome-text">Shared case files and team chat for litigation.</p>',
    "team-corporate":
      '<h1>Corporate Department</h1><p class="welcome-text">Shared case files and team chat for corporate law.</p>',
    "team-family":
      '<h1>Family Law Department</h1><p class="welcome-text">Shared case files and team chat for family law.</p>',
    settings:
      '<h1>Settings</h1><p class="welcome-text">Manage your account and preferences.</p>',
  };

// ========================
// Navigation
// ========================
navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        const page = this.getAttribute('data-page');
        if (pages[page]) {
            mainContent.innerHTML = pages[page];
            updateSidebarContext(page);   // ← Update sidebar when page changes
        }
    });
});

// Also call on initial load
updateSidebarContext('dashboard');

// ========================
// Dynamic Sidebar Context
// ========================
function updateSidebarContext(page) {
    const contextSection = document.getElementById('sidebar-context');

    switch (page) {
        case 'cases':
            contextSection.innerHTML = `
                <span class="section-label">Cases</span>
                <a href="#" class="tree-item active" data-case="0042">
                    <i class="ph ph-folder"></i>
                    <span class="tree-label">Johnson Divorce</span>
                    <span class="tree-badge active-badge">Active</span>
                </a>
                <div class="tree-indent">
                    <a href="#" class="tree-item" data-case="0042-docs">
                        <i class="ph ph-file-text"></i>
                        <span class="tree-label">Documents</span>
                    </a>
                    <a href="#" class="tree-item" data-case="0042-notes">
                        <i class="ph ph-notepad"></i>
                        <span class="tree-label">Notes</span>
                    </a>
                    <a href="#" class="tree-item" data-case="0042-calendar">
                        <i class="ph ph-calendar"></i>
                        <span class="tree-label">Hearings</span>
                    </a>
                </div>
                <a href="#" class="tree-item" data-case="0041">
                    <i class="ph ph-folder"></i>
                    <span class="tree-label">Reyes Insurance</span>
                    <span class="tree-badge pending-badge">Pending</span>
                </a>
                <a href="#" class="tree-item" data-case="0040">
                    <i class="ph ph-folder"></i>
                    <span class="tree-label">Thompson Property</span>
                    <span class="tree-badge active-badge">Active</span>
                </a>
                <a href="#" class="tree-item" data-case="0039">
                    <i class="ph ph-folder"></i>
                    <span class="tree-label">Garcia Employment</span>
                    <span class="tree-badge closed-badge">Closed</span>
                </a>
                <a href="#" class="tree-add" data-page="cases" onclick="alert('New case coming soon')">
                    <i class="ph ph-plus"></i>
                    <span>New Case</span>
                </a>
            `;
            break;

        case 'documents':
            contextSection.innerHTML = `
                <span class="section-label">Documents</span>
                <a href="#" class="tree-item active" data-doc="doc-001">
                    <i class="ph ph-file-text"></i>
                    <span class="tree-label">Motion to Dismiss</span>
                    <span class="tree-badge draft-badge">Draft</span>
                </a>
                <a href="#" class="tree-item" data-doc="doc-002">
                    <i class="ph ph-file-text"></i>
                    <span class="tree-label">Settlement Agreement</span>
                    <span class="tree-badge final-badge">Final</span>
                </a>
                <a href="#" class="tree-item" data-doc="doc-003">
                    <i class="ph ph-file-text"></i>
                    <span class="tree-label">Demand Letter</span>
                    <span class="tree-badge filed-badge">Filed</span>
                </a>
                <a href="#" class="tree-item" data-doc="doc-004">
                    <i class="ph ph-file-text"></i>
                    <span class="tree-label">Summary Judgment</span>
                    <span class="tree-badge draft-badge">Draft</span>
                </a>
                <a href="#" class="tree-item" data-doc="doc-005">
                    <i class="ph ph-file-text"></i>
                    <span class="tree-label">Discovery Request</span>
                    <span class="tree-badge final-badge">Final</span>
                </a>
                <a href="#" class="tree-add" onclick="alert('New document coming soon')">
                    <i class="ph ph-plus"></i>
                    <span>New Document</span>
                </a>
            `;
            break;

        case 'calendar':
            contextSection.innerHTML = `
                <span class="section-label">Calendar</span>
                <a href="#" class="tree-item active">
                    <i class="ph ph-calendar-check"></i>
                    <span class="tree-label">Today</span>
                </a>
                <a href="#" class="tree-item">
                    <i class="ph ph-calendar-blank"></i>
                    <span class="tree-label">This Week</span>
                </a>
                <a href="#" class="tree-item">
                    <i class="ph ph-calendar"></i>
                    <span class="tree-label">This Month</span>
                </a>
                <a href="#" class="tree-item">
                    <i class="ph ph-clock"></i>
                    <span class="tree-label">Pending</span>
                    <span class="tree-badge pending-badge">3</span>
                </a>
                <a href="#" class="tree-add" onclick="alert('Add event coming soon')">
                    <i class="ph ph-plus"></i>
                    <span>Add Event</span>
                </a>
            `;
            break;

        default:
            // Dashboard and everything else — show Upcoming
            contextSection.innerHTML = `
                <span class="section-label">Upcoming</span>
                <div class="upcoming-item">
                    <div class="upcoming-date">Jul 15</div>
                    <div class="upcoming-details">
                        <span class="upcoming-title">Smith v. Jones</span>
                        <span class="upcoming-time">9:00 AM • Court Hearing</span>
                    </div>
                </div>
                <div class="upcoming-item">
                    <div class="upcoming-date">Jul 16</div>
                    <div class="upcoming-details">
                        <span class="upcoming-title">Client Meeting</span>
                        <span class="upcoming-time">2:00 PM • Office</span>
                    </div>
                </div>
                <a href="#" class="nav-item" data-page="calendar">
                    <i class="ph ph-calendar"></i>
                    <span>Full Calendar</span>
                </a>
            `;
            break;
    }

    // Re-bind click events for tree items
    bindTreeItemClicks();
}

// ========================
// Tree Item Click Handling
// ========================
function bindTreeItemClicks() {
    // Tree items that reference cases
    document.querySelectorAll('.tree-item[data-case]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Highlight active tree item
            document.querySelectorAll('.tree-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const caseId = this.getAttribute('data-case');
            // If it's a sub-item like docs/notes, you can handle that logic here
            console.log('Selected:', caseId);
        });
    });

    // Tree items that reference documents
    document.querySelectorAll('.tree-item[data-doc]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelectorAll('.tree-item').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const docId = this.getAttribute('data-doc');
            // Open document peek panel if on documents page
            if (typeof openDocPeek === 'function') {
                openDocPeek(docId);
            }
        });
    });
} 

// ========================
// Document Peek Panel
// ========================

// Mock document data
const docData = {
    'doc-001': {
        title: 'Motion to Dismiss',
        case: 'Smith v. Jones',
        caseId: 'CASE-0042',
        status: 'Draft',
        author: 'Jane Doe',
        modified: 'June 29, 2026 — 2:34 PM',
        created: 'June 25, 2026',
        type: 'Motion',
        description: 'Motion to dismiss pursuant to Rule 12(b)(6) for failure to state a claim upon which relief can be granted.',
        preview: `IN THE COUNTY COURT OF THE STATE
DEPARTMENT 4

SMITH, Plaintiff,
v.
JONES, Defendant.

Case No. CIV-2026-0042

MOTION TO DISMISS

COMES NOW the Defendant, by and through undersigned counsel, and hereby moves this Honorable Court for an Order dismissing the Plaintiff's Complaint...`
    },
    'doc-002': {
        title: 'Settlement Agreement',
        case: 'Johnson Divorce Settlement',
        caseId: 'CASE-0042',
        status: 'Final',
        author: 'Jane Doe',
        modified: 'June 28, 2026 — 11:15 AM',
        created: 'June 10, 2026',
        type: 'Agreement',
        description: 'Marital settlement agreement resolving all issues related to asset division, spousal support, and child custody.',
        preview: `MARITAL SETTLEMENT AGREEMENT

This Agreement is entered into by and between Michael Johnson ("Husband") and Sarah Johnson ("Wife"), collectively referred to as "the Parties."

WHEREAS, the Parties were married on March 15, 2008, and separated on January 10, 2026...`
    },
    'doc-003': {
        title: 'Demand Letter',
        case: 'Reyes Insurance Claim',
        caseId: 'CASE-0041',
        status: 'Filed',
        author: 'Tom Smith',
        modified: 'June 20, 2026 — 3:00 PM',
        created: 'June 18, 2026',
        type: 'Correspondence',
        description: 'Formal demand letter to Heritage Insurance Co. regarding wrongful denial of coverage for construction site property damage.',
        preview: `VIA CERTIFIED MAIL
June 20, 2026

Heritage Insurance Co.
Claims Department
PO Box 4417

Re: Claim No. HC-8823 — Reyes Construction LLC

To Whom It May Concern:

This firm represents Reyes Construction LLC regarding the wrongful denial of insurance claim...`
    },
    'doc-004': {
        title: 'Summary Judgment Motion',
        case: 'Thompson Property Dispute',
        caseId: 'CASE-0040',
        status: 'Draft',
        author: 'Jane Doe',
        modified: 'June 25, 2026 — 4:22 PM',
        created: 'June 22, 2026',
        type: 'Motion',
        description: 'Motion for summary judgment on the issue of prescriptive easement based on survey evidence and historical use.',
        preview: `MOTION FOR SUMMARY JUDGMENT

NOW COMES Plaintiff Robert Thompson, by and through counsel, and respectfully moves this Court for summary judgment pursuant to Rule 56...`
    },
    'doc-005': {
        title: 'Discovery Request — Plaintiff',
        case: 'Smith v. Jones',
        caseId: 'CASE-0042',
        status: 'Final',
        author: 'Jane Doe',
        modified: 'June 18, 2026 — 9:45 AM',
        created: 'June 15, 2026',
        type: 'Discovery',
        description: 'Plaintiff\'s first set of interrogatories and request for production of documents.',
        preview: `PLAINTIFF'S FIRST SET OF INTERROGATORIES
AND REQUEST FOR PRODUCTION OF DOCUMENTS

TO: Defendant, through counsel of record

Pursuant to Rules 33 and 34 of the Rules of Civil Procedure, Plaintiff requests...`
    }
};

// Open document peek when clicking a document card
document.addEventListener('click', function (e) {
    const docCard = e.target.closest('.case-card[data-doc]');
    if (!docCard) return;

    const docId = docCard.getAttribute('data-doc');
    openDocPeek(docId);
});

// Close document peek when clicking overlay background
document.addEventListener('click', function (e) {
    if (e.target.id === 'doc-peek-overlay') {
        closeDocPeek();
    }
});

// Close document peek with Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const docPeekOverlay = document.getElementById('doc-peek-overlay');
        if (docPeekOverlay && docPeekOverlay.style.display === 'flex') {
            closeDocPeek();
        }
    }
});

function openDocPeek(docId) {
    const data = docData[docId];
    if (!data) return;

    const statusClass = data.status.toLowerCase();

    const docPeekOverlay = document.getElementById('doc-peek-overlay');
    const docPeekPanel = document.getElementById('doc-peek-panel');

    docPeekPanel.innerHTML = `
        <div class="peek-panel-header">
            <div>
                <span class="doc-type-badge ${statusClass}" style="display: inline-block; margin-bottom: 8px;">${data.status}</span>
                <h2 class="peek-case-title">${data.title}</h2>
                <span class="peek-case-id" style="display: block; margin-top: 4px;">${data.case} — ${data.caseId}</span>
            </div>
            <button class="peek-close" onclick="document.getElementById('doc-peek-overlay').style.display='none'">
                <i class="ph ph-x"></i>
            </button>
        </div>

        <div class="peek-field">
            <div class="peek-field-label">Document Type</div>
            <div class="peek-field-value">${data.type}</div>
        </div>

        <div class="peek-field">
            <div class="peek-field-label">Author</div>
            <div class="peek-field-value">${data.author}</div>
        </div>

        <div class="peek-field">
            <div class="peek-field-label">Last Modified</div>
            <div class="peek-field-value">${data.modified}</div>
        </div>

        <div class="peek-field">
            <div class="peek-field-label">Created</div>
            <div class="peek-field-value">${data.created}</div>
        </div>

        <div class="peek-divider"></div>

        <div class="peek-field">
            <div class="peek-field-label">Description</div>
            <div class="peek-notes">${data.description}</div>
        </div>

        <div class="peek-field">
            <div class="peek-field-label">Document Preview</div>
            <div class="peek-preview">${data.preview}</div>
        </div>

        <div class="peek-actions">
            <button class="peek-btn peek-btn-primary">
                <i class="ph ph-pencil-simple"></i> Edit
            </button>
            <button class="peek-btn peek-btn-secondary">
                <i class="ph ph-download-simple"></i> Download
            </button>
            <button class="peek-btn peek-btn-secondary">
                <i class="ph ph-share-network"></i> Share
            </button>
        </div>
    `;

    docPeekOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeDocPeek() {
    document.getElementById('doc-peek-overlay').style.display = 'none';
    document.body.style.overflow = '';
}

});
