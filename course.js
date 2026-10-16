/* =========================================================
   NextGen — Course page logic
   Renders the course from course-data.js and saves each
   student's progress in their browser (localStorage).
   ========================================================= */
(function () {
  'use strict';

  var C = window.COURSE;
  if (!C) return;

  var STORE_KEY = 'nextgen-progress-' + C.id;
  var CIRC = 2 * Math.PI * 50; // ring circumference (r = 50)

  /* ---------- Helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveDone() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(done)); } catch (e) { /* storage unavailable */ }
  }
  function initials(name) {
    return name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  var done = loadDone();
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-visible'); }, 2200);
  }

  /* ---------- Build lesson ids ---------- */
  var allLessons = [];
  C.modules.forEach(function (m, mi) {
    m.lessons.forEach(function (l, li) {
      l.id = 'm' + (mi + 1) + 'l' + (li + 1);
      l.module = mi;
      l.index = li;
      allLessons.push(l);
    });
  });

  /* ---------- Static course info ---------- */
  document.title = C.title + ' | NextGen';
  $('courseTitle').textContent = C.title;
  $('courseSubtitle').textContent = C.subtitle;
  $('courseCover').src = C.cover;
  $('courseCover').alt = C.title + ' course cover';
  var HAS_DOCS = !!(C.documents && C.documents.url);
  if (HAS_DOCS) {
    $('docsTitle').textContent = C.documents.title;
    $('docsDesc').textContent = C.documents.description;
    $('docsLink').href = C.documents.url;
  } else {
    $('docsCard').remove();
  }
  $('instructorName').textContent = C.instructors;
  $('instructorRole').textContent = C.instructorRole;
  $('instructorAvatar').innerHTML = C.instructorAvatar
    ? '<img src="' + esc(C.instructorAvatar) + '" alt="">'
    : esc(initials(C.instructors));

  var soonCount = allLessons.filter(function (l) { return l.comingSoon; }).length;
  $('statModules').textContent = C.modules.length;
  $('statLessons').textContent = allLessons.length + (HAS_DOCS ? 1 : 0);
  $('statSoon').textContent = soonCount;
  if (!soonCount) $('statSoon').closest('.stat').remove();

  /* ---------- Icons ---------- */
  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M7 4l13 8-13 8z"/></svg>';
  var ICON_VIDEO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/></svg>';
  var ICON_PDF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>';
  var ICON_CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  /* ---------- Render modules ---------- */
  function renderModules() {
    var html = C.modules.map(function (m, mi) {
      var n = mi + 1;
      var lessons = m.lessons.map(function (l) {
        var soon = !!l.comingSoon;
        var isDone = !!done[l.id];
        var thumb = soon
          ? '<span class="thumb thumb--soon">Coming soon</span>'
          : '<span class="thumb">' +
              (l.thumb ? '<img src="' + esc(l.thumb) + '" alt="" loading="lazy">' : esc(l.title)) +
              '<span class="thumb__play">' + ICON_PLAY + '</span>' +
            '</span>';
        var tags = '';
        if (l.tag) tags += '<span class="pill">' + esc(l.tag) + '</span>';
        if (soon) tags += '<span class="pill pill--soon">Coming soon</span>';

        var video = l.video || l.url || '';
        var ext = ' target="_blank" rel="noopener"';
        var openHref = soon ? '' : (video || '#');

        var thumbHtml = soon
          ? '<div class="lesson__thumb" aria-hidden="true">' + thumb + '</div>'
          : '<a class="lesson__thumb" href="' + esc(openHref) + '"' + (video ? ext : '') +
              ' data-open="' + l.id + '" tabindex="-1" aria-hidden="true">' + thumb + '</a>';

        var titleHtml = soon
          ? '<span class="lesson__title">' + esc(l.title) + '</span>'
          : '<a class="lesson__title" href="' + esc(openHref) + '"' + (video ? ext : '') + ' data-open="' + l.id + '">' + esc(l.title) + '</a>';

        var actions = '';
        if (!soon) {
          actions =
            '<span class="lesson__actions">' +
              '<a class="res-btn' + (video ? '' : ' is-missing') + '" href="' + esc(video || '#') + '"' + (video ? ext : '') + ' data-open="' + l.id + '">' +
                ICON_VIDEO + 'Watch video</a>' +
              (l.pdf !== undefined
                ? '<a class="res-btn' + (l.pdf ? '' : ' is-missing') + '" href="' + esc(l.pdf || '#') + '"' + (l.pdf ? ext : '') + ' data-pdf="1">' +
                    ICON_PDF + 'PDF</a>'
                : '') +
            '</span>';
        }

        var inner =
          thumbHtml +
          '<div class="lesson__text">' +
            '<span class="lesson__num">Lesson ' + (l.index + 1) + '</span>' +
            titleHtml +
            (l.description ? '<p class="lesson__desc">' + esc(l.description) + '</p>' : '') +
            (tags ? '<span class="lesson__tags">' + tags + '</span>' : '') +
            actions +
          '</div>';

        var link = '<div class="lesson__main">' + inner + '</div>';

        var control = soon
          ? '<span class="lock" title="Coming soon">' + ICON_LOCK + '<span class="sr-only">Locked</span></span>'
          : '<label class="check" title="Mark as complete">' +
              '<input type="checkbox" data-lesson="' + l.id + '"' + (isDone ? ' checked' : '') + '>' +
              '<span class="check__box" aria-hidden="true">' + ICON_CHECK + '</span>' +
              '<span class="sr-only">Mark "' + esc(l.title) + '" as complete</span>' +
            '</label>';

        return '<li class="lesson' + (isDone ? ' is-done' : '') + (soon ? ' is-soon' : '') + '" data-id="' + l.id +
               '" data-title="' + esc((l.title + ' ' + (l.description || '')).toLowerCase()) + '">' + link + control + '</li>';
      }).join('');

      return '' +
        '<article class="module glass is-open" id="module-' + n + '" data-module="' + mi + '">' +
          '<button type="button" class="module__header" aria-expanded="true" aria-controls="panel-' + n + '">' +
            '<span class="module__num">' + (n < 10 ? '0' + n : n) + '</span>' +
            '<span class="module__info">' +
              '<span class="module__kicker">Module ' + n +
                (m.tag ? ' <span class="module__tag">' + esc(m.tag) + '</span>' : '') + '</span>' +
              '<span class="module__title" style="display:block">' + esc(m.title) + '</span>' +
              (m.subtitle ? '<span class="module__subtitle">' + esc(m.subtitle) + '</span>' : '') +
              '<span class="module__meta">' +
                '<span class="bar bar--sm"><span class="bar__fill" style="display:block"></span></span>' +
                '<span class="module__count"></span>' +
              '</span>' +
            '</span>' +
            '<span class="module__chevron" aria-hidden="true">' + ICON_CHEVRON + '</span>' +
          '</button>' +
          '<div class="module__panel" id="panel-' + n + '">' +
            '<ul class="lessons">' + lessons + '</ul>' +
          '</div>' +
        '</article>';
    }).join('');
    $('modules').innerHTML = html;

    // Sidebar module nav
    $('moduleNav').innerHTML = C.modules.map(function (m, mi) {
      var n = mi + 1;
      return '<li><a href="#module-' + n + '" data-nav="' + mi + '">' +
               '<span class="module-nav__dot">' + n + '</span>' +
               '<span class="module-nav__label">' + esc(m.title) + '</span>' +
               '<span class="module-nav__count"></span>' +
             '</a></li>';
    }).join('');
  }

  /* ---------- Progress ---------- */
  function updateProgress() {
    var available = allLessons.filter(function (l) { return !l.comingSoon; });
    var total = available.length + (HAS_DOCS ? 1 : 0);
    var completed = available.filter(function (l) { return done[l.id]; }).length + (HAS_DOCS && done.docs ? 1 : 0);
    var pct = total ? Math.round((completed / total) * 100) : 0;

    var text = completed + ' of ' + total + ' lessons completed';
    $('heroProgressText').textContent = text;
    $('sideProgressText').textContent = text;
    $('heroProgressPct').textContent = pct + '%';
    $('ringPct').textContent = pct + '%';
    $('heroBarFill').style.width = pct + '%';
    $('heroBar').setAttribute('aria-valuenow', pct);
    $('ringFill').style.strokeDashoffset = CIRC - (CIRC * pct) / 100;
    if (HAS_DOCS) $('docsCheck').checked = !!done.docs;

    // Per-module
    C.modules.forEach(function (m, mi) {
      var avail = m.lessons.filter(function (l) { return !l.comingSoon; });
      var c = avail.filter(function (l) { return done[l.id]; }).length;
      var p = avail.length ? Math.round((c / avail.length) * 100) : 0;
      var el = document.querySelector('.module[data-module="' + mi + '"]');
      el.querySelector('.bar__fill').style.width = p + '%';
      el.querySelector('.module__count').textContent = c + ' / ' + avail.length + ' lessons' +
        (m.lessons.length > avail.length ? ' · ' + (m.lessons.length - avail.length) + ' coming soon' : '');
      var complete = avail.length > 0 && c === avail.length;
      el.classList.toggle('is-complete', complete);

      var nav = document.querySelector('[data-nav="' + mi + '"]');
      nav.querySelector('.module-nav__count').textContent = c + '/' + avail.length;
      nav.querySelector('.module-nav__dot').classList.toggle('is-done', complete);
    });

    // Resume button → first incomplete available lesson
    var next = available.filter(function (l) { return !done[l.id]; })[0];
    var btn = $('resumeBtn');
    if (completed === 0) {
      $('resumeLabel').textContent = 'Start course';
    } else if (next) {
      $('resumeLabel').textContent = 'Resume course';
    } else {
      $('resumeLabel').textContent = 'Course complete — review';
    }
    if (next) {
      var nextVideo = next.video || next.url;
      btn.href = nextVideo || '#module-' + (next.module + 1);
      if (nextVideo) { btn.target = '_blank'; btn.rel = 'noopener'; } else { btn.removeAttribute('target'); }
      btn.dataset.target = next.id;
      $('nextUp').innerHTML = 'Next up: <strong>' + esc(next.title) + '</strong>';
    } else {
      btn.href = '#module-1';
      btn.dataset.target = '';
      $('nextUp').textContent = available.length ? 'You’ve completed every available lesson.' : '';
    }
  }

  /* ---------- Search & filters ---------- */
  var currentFilter = 'all';
  function applyFilters() {
    var q = $('lessonSearch').value.trim().toLowerCase();
    var anyVisible = false;

    document.querySelectorAll('.module').forEach(function (mod) {
      var visibleInModule = 0;
      mod.querySelectorAll('.lesson').forEach(function (li) {
        var id = li.dataset.id;
        var matchText = !q || li.dataset.title.indexOf(q) !== -1;
        var isDone = !!done[id];
        var isSoon = li.classList.contains('is-soon');
        var matchFilter =
          currentFilter === 'all' ||
          (currentFilter === 'done' && isDone) ||
          (currentFilter === 'todo' && !isDone && !isSoon);
        var show = matchText && matchFilter;
        li.hidden = !show;
        if (show) visibleInModule++;
      });
      var filtering = q || currentFilter !== 'all';
      mod.hidden = filtering && visibleInModule === 0;
      if (filtering && visibleInModule > 0) setOpen(mod, true);
      if (!mod.hidden) anyVisible = true;
    });

    if (HAS_DOCS) $('docsCard').hidden = !!q && 'class documents download templates'.indexOf(q) === -1;
    $('noResults').hidden = anyVisible;
  }

  /* ---------- Accordion ---------- */
  function setOpen(mod, open) {
    mod.classList.toggle('is-open', open);
    mod.querySelector('.module__header').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function updateToggleAllLabel() {
    var anyOpen = document.querySelector('.module.is-open');
    $('toggleAll').textContent = anyOpen ? 'Collapse all' : 'Expand all';
  }

  /* ---------- Events ---------- */
  function bind() {
    // Checkboxes (lessons + documents)
    document.addEventListener('change', function (e) {
      var input = e.target;
      if (!input.matches('input[data-lesson]')) return;
      var id = input.dataset.lesson;
      if (input.checked) { done[id] = true; } else { delete done[id]; }
      saveDone();
      var li = document.querySelector('.lesson[data-id="' + id + '"]');
      if (li) li.classList.toggle('is-done', input.checked);
      updateProgress();
      if (currentFilter !== 'all') applyFilters();
      if (input.checked) {
        var all = allLessons.filter(function (l) { return !l.comingSoon; }).every(function (l) { return done[l.id]; }) && (!HAS_DOCS || done.docs);
        toast(all ? 'Course complete — amazing work!' : 'Lesson marked as complete');
      }
    });

    // Accordion headers
    $('modules').addEventListener('click', function (e) {
      var head = e.target.closest('.module__header');
      if (!head) return;
      var mod = head.closest('.module');
      setOpen(mod, !mod.classList.contains('is-open'));
      updateToggleAllLabel();
    });

    // Lesson links: if a video/PDF link hasn't been added yet, say so instead of jumping to the top
    $('modules').addEventListener('click', function (e) {
      var a = e.target.closest('a[data-open], a[data-pdf]');
      if (!a) return;
      if (a.getAttribute('href') === '#') {
        e.preventDefault();
        toast(a.hasAttribute('data-pdf') ? 'PDF not added yet' : 'Video link not added yet');
      }
    });

    // Expand / collapse all
    $('toggleAll').addEventListener('click', function () {
      var anyOpen = document.querySelector('.module.is-open');
      document.querySelectorAll('.module').forEach(function (m) { setOpen(m, !anyOpen); });
      updateToggleAllLabel();
    });

    // Filters
    document.querySelectorAll('.filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        currentFilter = btn.dataset.filter;
        applyFilters();
      });
    });

    // Search
    $('lessonSearch').addEventListener('input', applyFilters);

    // Sidebar nav opens the module it jumps to
    $('moduleNav').addEventListener('click', function (e) {
      var a = e.target.closest('a[data-nav]');
      if (!a) return;
      var mod = document.querySelector('.module[data-module="' + a.dataset.nav + '"]');
      setOpen(mod, true);
      updateToggleAllLabel();
    });

    // Resume: if the next lesson has no URL yet, scroll to it
    $('resumeBtn').addEventListener('click', function (e) {
      var id = this.dataset.target;
      var href = this.getAttribute('href');
      if (!id || (href && href !== '#' && href.charAt(0) !== '#')) return;
      e.preventDefault();
      var li = document.querySelector('.lesson[data-id="' + id + '"]');
      if (!li) return;
      setOpen(li.closest('.module'), true);
      li.scrollIntoView({ behavior: 'smooth', block: 'center' });
      li.style.background = 'rgba(167,139,250,.14)';
      setTimeout(function () { li.style.background = ''; }, 1600);
    });

    // Reset
    $('resetProgress').addEventListener('click', function () {
      if (!confirm('Reset all progress for this course?')) return;
      done = {};
      saveDone();
      document.querySelectorAll('input[data-lesson]').forEach(function (i) { i.checked = false; });
      document.querySelectorAll('.lesson.is-done').forEach(function (l) { l.classList.remove('is-done'); });
      updateProgress();
      applyFilters();
      toast('Progress reset');
    });

    $('year').textContent = new Date().getFullYear();
  }

  renderModules();
  updateProgress();
  bind();
})();
