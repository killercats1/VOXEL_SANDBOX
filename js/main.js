// main.js

// To add a client, add an entry to the matching group below.
// path is relative to eagler-files/, size is the rough download in MB.
const GROUPS = [
    { id: '1.12', title: 'Version 1.12', clients: [
        { name: 'Eaglercraft 1.12.2', path: 'wasm/1.12/Main/index.html', desc: 'The 1.12 port. Faster WebAssembly build.', tags: ['WASM'], size: 17 },
        { name: 'Eaglercraft 1.12.2', path: '1.12/Main/index.html', desc: 'Compatibility build for older browsers.', tags: ['JS'], size: 28 },
    ]},
    { id: '1.11', title: 'Version 1.11', clients: [
        { name: 'EaglercraftZ 1.11.2', path: '1.11/eag1_11_2.html', desc: 'Community 1.11 port.', tags: ['JS'], size: 28 },
    ]},
    { id: '1.9', title: 'Version 1.9', clients: [
        { name: 'EaglercraftL 1.9.4', path: '1.9/eag1_9_4.html', desc: 'Community 1.9 port with the combat update.', tags: ['JS'], size: 18 },
    ]},
    { id: '1.8', title: 'Version 1.8', clients: [
        { name: 'EaglercraftX 1.8.8', path: 'wasm/1.8/Main/index.html', desc: 'Latest official build (u53). Recommended.', tags: ['WASM', 'Latest'], size: 11 },
        { name: 'EaglercraftX 1.8.8', path: '1.8/Main/index.html', desc: 'Latest official build (u53) for older browsers.', tags: ['JS', 'Latest'], size: 36 },
        { name: 'Resent 4.0', path: '1.8/resent4.0/index.html', desc: 'PvP client with built-in mods and HUD.', tags: ['JS'], size: 40 },
        { name: 'Astra', path: 'wasm/1.8/AstraClient/index.html', desc: 'PvP client. WebAssembly build.', tags: ['WASM'], size: 22 },
        { name: 'Astra', path: '1.8/AstraClient/index.html', desc: 'PvP client. Compatibility build.', tags: ['JS'], size: 40 },
        { name: 'Shadow', path: '1.8/Shadow_Client_en_US.html', desc: 'PvP client.', tags: ['JS'], size: 69 },
        { name: 'DragonX V4', path: '1.8/DragonX_V4.html', desc: 'PvP client.', tags: ['JS'], size: 22 },
        { name: 'DragonX Lite', path: '1.8/DragonXLite.html', desc: 'Lighter version of DragonX.', tags: ['JS'], size: 22 },
        { name: 'PiClient', path: '1.8/pi-client.html', desc: 'PvP client.', tags: ['JS'], size: 20 },
        { name: 'Eagler Reborn', path: '1.8/Eagler-Reborn.html', desc: 'PvP client.', tags: ['JS'], size: 23 },
    ]},
    { id: 'modded', title: 'Modded 1.8', clients: [
        { name: 'EaglerForge', path: 'modded/1.8/EaglerForge/index.html', desc: 'Mod loader. Add mods from the mod list.', tags: ['JS'], size: 44 },
        { name: 'EaglerForge Injector', path: 'modded/1.8/ef_u48_v2.7_minify.html', desc: 'EFI u48, v2.7 mod loader.', tags: ['JS'], size: 78 },
        { name: 'Starlike', path: 'modded/1.8/Starlike/index.html', desc: 'Adds blocks and items from newer versions.', tags: ['JS'], size: 59 },
        { name: 'Prism', path: 'modded/1.8/prism-client.html', desc: 'Modded client.', tags: ['JS'], size: 39 },
        { name: 'EaglyMC', path: 'modded/wasm/1.8/EaglyMC/index.html', desc: 'Adds content from newer versions. WebAssembly build.', tags: ['WASM'], size: 37 },
        { name: 'EaglyMC', path: 'modded/1.8/EaglyMC/index.html', desc: 'Adds content from newer versions. Compatibility build.', tags: ['JS'], size: 35 },
    ]},
];

function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) node.setAttribute(k, v);
    for (const c of [].concat(children || [])) node.append(c);
    return node;
}

function renderGroups() {
    const root = document.getElementById('groups');
    for (const group of GROUPS) {
        const grid = el('div', { class: 'grid' });
        for (const c of group.clients) {
            const tags = c.tags.map(t => el('span', { class: 'tag tag-' + t.toLowerCase() }, t));
            tags.push(el('span', { class: 'tag tag-size' }, '~' + c.size + ' MB'));
            const card = el('a', { class: 'card', href: './eagler-files/' + c.path }, [
                el('span', { class: 'card-name' }, c.name),
                el('span', { class: 'card-desc' }, c.desc),
                el('span', { class: 'card-tags' }, tags),
            ]);
            card.dataset.search = (c.name + ' ' + c.desc + ' ' + c.tags.join(' ') + ' ' + group.title).toLowerCase();
            grid.append(card);
        }
        const section = el('section', { class: 'group', 'data-group': group.id }, [
            el('h3', { class: 'group-title' }, group.title),
            grid,
        ]);
        root.append(section);
    }
}

function applyFilters() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const active = document.querySelector('.chip[aria-pressed="true"]').dataset.filter;
    let shown = 0;
    for (const section of document.querySelectorAll('.group')) {
        const groupOn = active === 'all' || active === section.dataset.group;
        let visible = 0;
        for (const card of section.querySelectorAll('.card')) {
            const on = groupOn && card.dataset.search.includes(query);
            card.hidden = !on;
            if (on) visible++;
        }
        section.hidden = visible === 0;
        shown += visible;
    }
    document.getElementById('empty').hidden = shown !== 0;
}

function setupTheme() {
    const root = document.documentElement;
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = root.dataset.theme ||
            (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
    });
}

function setupFooter() {
    const dialog = document.getElementById('reset-dialog');
    document.getElementById('reset-open').addEventListener('click', () => dialog.showModal());
    document.getElementById('reset-cancel').addEventListener('click', () => dialog.close());
    document.getElementById('reset-confirm').addEventListener('click', () => {
        try { localStorage.clear(); } catch (e) {}
        location.reload();
    });
    document.getElementById('devtools').addEventListener('click', () => {
        if (window.eruda) return eruda.init();
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/eruda';
        s.onload = () => eruda.init();
        document.head.append(s);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGroups();
    document.getElementById('search').addEventListener('input', applyFilters);
    for (const chip of document.querySelectorAll('.chip')) {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === chip));
            applyFilters();
        });
    }
    setupTheme();
    setupFooter();
});
