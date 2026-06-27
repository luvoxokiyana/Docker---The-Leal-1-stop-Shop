document.addEventListener('DOMContentLoaded', function () {

    // ========================
    // Elements
    // ========================
    const navItems = document.querySelectorAll('.nav-item');
    const mainContent = document.getElementById('main-content');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchTrigger = document.getElementById('search-trigger');
    const filterChips = document.querySelectorAll('.filter-chip');

    // ========================
    // Page Templates
    // ========================
    const pages = {
        dashboard: `
            <h1>Dashboard</h1>
            <p class="welcome-text">Good morning, Jane. Here's your overview for today.</p>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-label">Active Cases</span>
                    <span class="stat-value">12</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Hearings This Week</span>
                    <span class="stat-value">3</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Pending Tasks</span>
                    <span class="stat-value">5</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Unread Messages</span>
                    <span class="stat-value">3</span>
                </div>
            </div>
            <div class="card">
                <h2>Recent Cases</h2>
                <div class="case-item">
                    <span class="case-id">CASE-0042</span>
                    <span class="case-client">Johnson Divorce Settlement</span>
                    <span class="case-status status-active">Active</span>
                    <span class="case-date">Updated Jun 25</span>
                </div>
                <div class="case-item">
                    <span class="case-id">CASE-0041</span>
                    <span class="case-client">Reyes Insurance Claim</span>
                    <span class="case-status status-pending">Pending</span>
                    <span class="case-date">Updated Jun 24</span>
                </div>
                <div class="case-item">
                    <span class="case-id">CASE-0040</span>
                    <span class="case-client">Thompson Property Dispute</span>
                    <span class="case-status status-active">Active</span>
                    <span class="case-date">Updated Jun 23</span>
                </div>
            </div>
        `,
        cases: '<h1>Cases</h1><p class="welcome-text">View and manage all your active cases.</p>',
        calendar: '<h1>Calendar</h1><p class="welcome-text">Schedule and manage court dates, meetings, and deadlines.</p>',
        documents: '<h1>Documents</h1><p class="welcome-text">Store and manage case files and legal documents.</p>',
        messages: '<h1>Messages</h1><p class="welcome-text">Team communication and case discussions.</p>',
        drafts: '<h1>My Drafts</h1><p class="welcome-text">Continue working on your saved legal drafts.</p>',
        templates: '<h1>Templates</h1><p class="welcome-text">Legal document templates and forms.</p>',
        'my-notes': '<h1>My Notes</h1><p class="welcome-text">Personal notes and case observations.</p>',
        'quick-capture': '<h1>Quick Capture</h1><p class="welcome-text">Quickly jot down thoughts, tasks, or reminders.</p>',
        'team-general': '<h1>General Teamspace</h1><p class="welcome-text">Shared resources and firm-wide announcements.</p>',
        'team-litigation': '<h1>Litigation Department</h1><p class="welcome-text">Shared case files and team chat for litigation.</p>',
        'team-corporate': '<h1>Corporate Department</h1><p class="welcome-text">Shared case files and team chat for corporate law.</p>',
        'team-family': '<h1>Family Law Department</h1><p class="welcome-text">Shared case files and team chat for family law.</p>',
        settings: '<h1>Settings</h1><p class="welcome-text">Manage your account and preferences.</p>'
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
            }
        });
    });

    // ========================
    // Search Overlay
    // ========================

    // Open search
    function openSearch() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 50);
    }

    // Close search
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
    }

    // Trigger: click search icon in sidebar
    if (searchTrigger) {
        searchTrigger.addEventListener('click', openSearch);
    }

    // Keyboard shortcut: Ctrl+K / Cmd+K
    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        // Escape to close
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    // Click outside panel to close
    searchOverlay.addEventListener('click', function (e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    // Filter chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', function () {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

});