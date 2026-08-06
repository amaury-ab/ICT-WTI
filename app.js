/**
 * WTI Hub - Application Controller & 3D WebGL Engine
 */

// 1. BASE DE DONNÉES FOURNISSEURS
const SUPPLIERS = {
    "namchau": {
        id: "namchau", name: "Nam Chau", location: "Dong Nai, Vietnam", coords: [10.95, 106.82], role: "Tranchage & Lamination", status: "warning", badges: ['Slicing', 'Lamination', 'Yulex 100 Dupli'],
        maturity: { expertise: 6, hse: 2, quality_process: 5, innovation: 4, reliability: 6, volume: 80 },
        html: `
            <div class="info-card">
                <h3><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i> Audit Report (29 July 2026)</h3>
                <p>Visite réalisée par Clarisse G., Amaury A-B., Hung face à Mr Jack, Tom et QC Leader.</p>
                <div class="alert-box alert-danger">
                    <h4><i class="fa-solid fa-skull-crossbones" aria-hidden="true"></i> Tolérance Zéro : HSE</h4>
                    <ul class="alert-list">
                        <li><b>EPI Inadéquats :</b> Masques de protection insuffisants pour la zone de lamination (Risque chimique).</li>
                        <li><b>Sécurité Poste :</b> Outils tranchants (règles métal) laissés sur les tables QC.</li>
                        <li><b>Hygiène :</b> Absence de savon (lessive utilisée) dans les sanitaires. Action immédiate exigée.</li>
                    </ul>
                </div>
                <div class="alert-box alert-warning">
                    <h4><i class="fa-solid fa-flask" aria-hidden="true"></i> Process Colle & Viscosité</h4>
                    <p>Contamination visible dans la colle. Absence totale de SOP pour le contrôle de viscosité et le temps d'ouverture. Action exigée via le fournisseur de colle.</p>
                </div>
                <div class="alert-box alert-warning">
                    <h4><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> Inspection Blademarks</h4>
                    <p>Installation exigée de Lightbox à 45° car l'évaluation en l'air par les opérateurs cause de graves divergences.</p>
                </div>
            </div>
        `
    },
    "lehung": {
        id: "lehung", name: "Le Hung", location: "Binh Duong, Vietnam", coords: [11.10, 106.65], role: "Tranchage (Slicing) & Lamination", status: "alert", badges: ['Slicing Claim', 'Wavemarks', 'Blademarks'],
        maturity: { expertise: 5, hse: 4, quality_process: 3, innovation: 4, reliability: 4, volume: 90 },
        html: `
            <div class="info-card">
                <h3><i class="fa-solid fa-scale-unbalanced" aria-hidden="true"></i> Slicing Claim Solving (Jan-Apr 2026)</h3>
                <p>Résolution du litige financier massif concernant les rejets post-tranchage.</p>
                <div class="alert-box alert-danger">
                    <h4>Contexte du Litige avec PI Pattana</h4>
                    <ul class="alert-list">
                        <li><b>Erreurs de Données :</b> Omission des feuilles de 1.8mm défectueuses.</li>
                        <li><b>Erreurs Sémantiques :</b> Défaut "Wave" imputé à tort au Foam, et "Sticky" imputé au Slicing.</li>
                        <li><b>Montants initiaux :</b> Slicing defects ($48,321) et Foam defects ($15,082).</li>
                    </ul>
                </div>
                <div class="alert-box alert-info">
                    <h4>Décision WTI</h4>
                    <p>Application d'un ratio <b>90% Le Hung / 10% PI Pattana</b> pour les défauts Slicing.<br><br>
                    La note de débit de PI Pattana passe ainsi de $63,403 à <b>$19,914</b>, assurant une équité.</p>
                </div>
            </div>
        `
    },
    "pipattana": {
        id: "pipattana", name: "PI Pattana", location: "Bangkok, Thaïlande", coords: [13.75, 100.50], role: "Formulation & Moussage NR", status: "success", badges: ['Yulex 100', 'Slabs Maker', 'FSC'],
        maturity: { expertise: 9, hse: 8, quality_process: 8, innovation: 9, reliability: 8, volume: 60 },
        html: `
            <div class="info-card">
                <h3><i class="fa-solid fa-tree" aria-hidden="true"></i> Partenaire Yulex 100 Exclusif</h3>
                <p>PI Pattana gère la création des Slabs de 30mm en caoutchouc naturel (FSC). C'est la clé de voûte écologique de la stratégie WTI.</p>
            </div>
        `
    },
    "doni": {
        id: "doni", name: "Doni", location: "Yangzhou, Chine", coords: [32.39, 119.41], role: "Intégré (Slicing/Lamin/FG)", status: "alert", badges: ['GBS Holes', 'Passing Machine NOK'],
        maturity: { expertise: 4, hse: 3, quality_process: 2, innovation: 3, reliability: 4, volume: 50 },
        html: `
            <div class="info-card">
                <h3><i class="fa-solid fa-industry" aria-hidden="true"></i> Working Report (July 2026)</h3>
                <div class="alert-box alert-danger">
                    <h4>Faille Inspection Slicing</h4>
                    <p><b>Doni ne réalise aucune inspection visuelle dédiée post-tranchage.</b><br>L'inspection se fait en ligne pendant la lamination. Il est impossible de garantir l'absence de défauts majeurs.</p>
                </div>
            </div>
        `
    },
    "daluen": {
        id: "daluen", name: "Daluen", location: "Vietnam", coords: [10.85, 106.75], role: "Fabrication Textile", status: "success", badges: ['Janvision', 'Soft Anafi', 'Agrios'],
        maturity: { expertise: 8, hse: 7, quality_process: 8, innovation: 7, reliability: 9, volume: 70 },
        html: `<div class="info-card"><h3><i class="fa-solid fa-swatchbook" aria-hidden="true"></i> Visual Defect Book (Textile)</h3><p>Les 4 priorités d'inspection : Vertical Stripes, Horizontal Stripes, Folding marks, Bow & Skew.</p></div>`
    },
    "scavi": {
        id: "scavi", name: "Scavi", location: "Hué, Vietnam", coords: [16.4637, 107.5909], role: "Assemblage Produit Fini", status: "info", badges: ['GBS', 'Flatlock', 'Nesting', 'Gemba Walk OK'],
        maturity: { expertise: 8, hse: 8, quality_process: 9, innovation: 7, reliability: 8, volume: 85 },
        html: `
            <div class="info-card">
                <h3><i class="fa-solid fa-clipboard-check" aria-hidden="true"></i> Gemba Walk Report - Scavi Hué (21 July 2026)[cite: 1]</h3>
                <p>Auditeur : <b>Amaury Asselos (ICT WTI)</b>[cite: 1]. Évaluation du stockage et vérification du plan de contrôle (focalisé sur les 3 premières étapes)[cite: 1].</p>
                
                <div class="alert-box alert-info">
                    <h4><i class="fa-solid fa-warehouse" aria-hidden="true"></i> État Général &amp; Stockage</h4>
                    <ul class="alert-list">
                        <li><b>Stockage :</b> Très bon stockage des feuilles laminées (traçabilité et protection optimales)[cite: 1].</li>
                        <li><b>Poste de Contrôle :</b> Table d'inspection visuelle conforme (bonnes dimensions et éclairage adéquat)[cite: 1].</li>
                        <li><b>Condition Globale :</b> Conforme aux exigences WTI[cite: 1].</li>
                    </ul>
                </div>
            </div>

            <div class="info-card">
                <h3><i class="fa-solid fa-list-check" aria-hidden="true"></i> Plan de Contrôle (Laminated Sheets)</h3>
                <ul class="alert-list" style="color: var(--text-secondary);">
                    <li><b>1. Couleur &amp; Variations :</b> Contrôle initial de la teinte et vérification des nuances de couleur[cite: 1].</li>
                    <li><b>2. Traçabilité :</b> Contrôle systématique des étiquettes de traçabilité[cite: 1].</li>
                    <li><b>3. Dimensions (Renforcé) :</b> Prise de mesures supérieures au DPR (3x en largeur, 3x en longueur)[cite: 1].</li>
                    <li><b>4. Épaisseur :</b> Contrôle conforme au standard DPR[cite: 1].</li>
                    <li><b>5. Délamination :</b> Test de résistance au décollement conforme à la norme DS 072[cite: 1].</li>
                </ul>

                <div class="alert-box alert-warning" style="margin-top: 16px;">
                    <h4><i class="fa-solid fa-book-open" aria-hidden="true"></i> Visual Defect Library (Axe d'Amélioration)</h4>
                    <p>Scavi possède sa propre bibliothèque interne de défauts (photos uniquement)[cite: 1]. Volonté exprimée d'améliorer ce point et de s'aligner sur le standard interactif <b>WTI Visual Defect Book</b>[cite: 1].</p>
                </div>
            </div>

            <div class="info-card">
                <h3><i class="fa-solid fa-scissors" aria-hidden="true"></i> Fin de Chaîne (Finished Goods &amp; Nesting)</h3>
                <p>Réceptionne les complexes de Nam Chau et Le Hung pour la confection Surf.</p>
                <div class="alert-box alert-info">
                    <h4>Gestion Intelligente des Défauts</h4>
                    <p>Les opérateurs repèrent les rubans adhésifs jaunes posés en amont par le fournisseur (défauts mineurs) et décalent les patronages lors de la découpe pour placer ces défauts dans les chutes (scraps).</p>
                </div>
            </div>
        `
    },
    "sheico": {
        id: "sheico", name: "Sheico HQ", location: "Yilan, Taiwan", coords: [24.68, 121.76], role: "Usine Intégrée", status: "success", badges: ['CR', 'Historique'],
        maturity: { expertise: 9, hse: 9, quality_process: 8, innovation: 7, reliability: 9, volume: 100 },
        html: `<div class="info-card"><h3><i class="fa-solid fa-building" aria-hidden="true"></i> Partenaire Historique</h3><p>Maîtrise verticale complète du moussage CR pétrosourcé à l'assemblage.</p></div>`
    },
    "namliong": {
        id: "namliong", name: "Nam Liong", location: "Tainan, Taiwan", coords: [23.02, 120.22], role: "Mousse Hybride", status: "success", badges: ['BIO 08', 'BIO 07'],
        maturity: { expertise: 9, hse: 8, quality_process: 8, innovation: 9, reliability: 8, volume: 65 },
        html: `<div class="info-card"><h3><i class="fa-solid fa-flask" aria-hidden="true"></i> Développement Biosourcé</h3><p>Expertise pointue sur les complexes hybrides BIO 07/08.</p></div>`
    },
    "birong": {
        id: "birong", name: "Birong", location: "Chine", coords: [24.50, 118.00], role: "Prospect Textile", status: "alert", badges: ['Surje', 'NO GO'],
        maturity: { expertise: 3, hse: 5, quality_process: 2, innovation: 4, reliability: 2, volume: 20 },
        html: `<div class="info-card"><h3><i class="fa-solid fa-ban" aria-hidden="true"></i> Échec Test GBS</h3><p>Tissu Surje (100% PA) testé chez Doni : apparition massive de trous d'aiguilles. NO GO définitif.</p></div>`
    },
    "mls": {
        id: "mls", name: "Meilisheng (MLS)", location: "Chine", coords: [22.80, 113.50], role: "Prospect Usine", status: "info", badges: ['Prospect', '4 Points System'],
        maturity: { expertise: 6, hse: 6, quality_process: 7, innovation: 5, reliability: 5, volume: 30 },
        html: `<div class="info-card"><h3><i class="fa-solid fa-star" aria-hidden="true"></i> Évaluation Prospect</h3><p>Application du 4-Points System pour l'inspection tissu.</p></div>`
    }
};

const PACE_CATALOG = [
    { status: "GO PROD", count: 85 },
    { status: "GO INDUS", count: 25 },
    { status: "STOPPED", count: 30 },
    { status: "IN DEV", count: 10 }
];

// 2. MOTEUR DE RENDU 3D WEBGL (THREE.JS)
const Schema3D = {
    scene: null,
    camera: null,
    renderer: null,
    light: null,
    sheetMesh: null,
    cutMesh: null,

    initBlademarks3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof THREE === 'undefined') return;

        container.innerHTML = '';

        const width = container.clientWidth || 380;
        const height = container.clientHeight || 350;

        // Scène & Caméra
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x121214);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 14, 22);
        this.camera.lookAt(0, 0, 0);

        // WebGL Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Modèle : Plaque de Néoprène 3D
        const sheetGeo = new THREE.BoxGeometry(10, 0.5, 10);
        const sheetMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2e, roughness: 0.75, metalness: 0.15 });
        this.sheetMesh = new THREE.Mesh(sheetGeo, sheetMat);
        this.sheetMesh.receiveShadow = true;
        this.scene.add(this.sheetMesh);

        // Modèle : Blademark (Entaille 3D)
        const cutGeo = new THREE.BoxGeometry(6, 0.2, 0.25);
        const cutMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.cutMesh = new THREE.Mesh(cutGeo, cutMat);
        this.cutMesh.position.set(0, 0.22, 0);
        this.scene.add(this.cutMesh);

        // Lumière Ambiante
        const ambient = new THREE.AmbientLight(0xffffff, 0.25);
        this.scene.add(ambient);

        // Lumière Orientée Interactive
        this.light = new THREE.DirectionalLight(0x30d158, 2.5);
        this.light.castShadow = true;
        this.light.shadow.mapSize.width = 1024;
        this.light.shadow.mapSize.height = 1024;
        this.setLightAngle('ok');
        this.scene.add(this.light);

        // Animation Loop (Rotation 3D fluide)
        const animate = () => {
            requestAnimationFrame(animate);
            this.sheetMesh.rotation.y += 0.003;
            this.cutMesh.rotation.y += 0.003;
            this.renderer.render(this.scene, this.camera);
        };
        animate();

        // Auto Resize Handler
        window.addEventListener('resize', () => {
            if (!container || !this.renderer) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        });
    },

    setLightAngle(mode) {
        if (!this.light) return;
        if (mode === 'ok') {
            // Angle 45° rasant -> Révèle l'ombre portée
            this.light.position.set(-8, 8, 8);
            this.light.color.setHex(0x30d158);
        } else {
            // Angle Zénithal 90° -> Ombre masquée
            this.light.position.set(0, 16, 0);
            this.light.color.setHex(0xff453a);
        }
    }
};

// 3. GESTIONNAIRE DE NOTES LOCALSTORAGE
class NotesManager {
    constructor() {
        this.key = 'wti_notes_apple_v1';
        this.notes = this.load();
    }
    load() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.warn('LocalStorage inacessible:', e);
            return {};
        }
    }
    add(supId, text) {
        if(!this.notes[supId]) this.notes[supId] = [];
        const now = new Date();
        const timeString = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
        const dateString = now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'});
        
        this.notes[supId].unshift({ 
            id: Date.now(), 
            text: text, 
            author: "Amaury A-B.",
            time: `${dateString} à ${timeString}`
        });
        this.save();
    }
    remove(supId, noteId) {
        if(this.notes[supId]) { 
            this.notes[supId] = this.notes[supId].filter(n => n.id !== noteId); 
            this.save(); 
        }
    }
    save() { 
        try {
            localStorage.setItem(this.key, JSON.stringify(this.notes)); 
        } catch (e) {
            console.error('Erreur de sauvegarde localStorage:', e);
        }
    }
    get(supId) { return this.notes[supId] || []; }
}

// 4. MAIN APP CONTROLLER
const app = {
    map: null,
    individualRadarChart: null,
    notesManager: new NotesManager(),
    currentSupId: null,

    init() {
        this.setupEventListeners();
        this.buildSidebar();
        this.initMap();
        this.initDashboardCharts();
        
        // Initialisation de la scène 3D WebGL
        setTimeout(() => {
            Schema3D.initBlademarks3D('three-blademarks-canvas');
        }, 400);
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const targetBtn = e.target.closest('[data-router]');
            if (targetBtn) {
                const viewId = targetBtn.getAttribute('data-router');
                this.router(viewId, targetBtn);
                this.closeMobileSidebar();
                return;
            }

            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.getAttribute('data-action');
                this.handleAction(action);
                return;
            }

            const tabBtn = e.target.closest('[data-tab]');
            if (tabBtn) {
                const tabId = tabBtn.getAttribute('data-tab');
                this.switchTab(tabId, tabBtn);
                return;
            }
        });

        const mobileBtn = document.getElementById('mobile-toggle-btn');
        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('open');
            });
        }

        document.getElementById('panel-close-btn').addEventListener('click', () => this.closePanel());
        document.getElementById('slide-overlay').addEventListener('click', () => {
            this.closePanel();
            this.closeMobileSidebar();
        });

        document.getElementById('btn-save-note').addEventListener('click', () => this.saveNote());

        document.getElementById('view-map').addEventListener('transitionend', () => {
            if (this.map) this.map.invalidateSize();
        });
    },

    handleAction(action) {
        switch(action) {
            case 'toggle-light-ok': 
                Schema3D.setLightAngle('ok');
                this.toast('Lumière 45° : Blademark détectable');
                break;
            case 'toggle-light-nok': 
                Schema3D.setLightAngle('nok');
                this.toast('Lumière Zénithale : Blademark invaginer !');
                break;
            case 'step-marking-1': this.setMarkingStep(1); break;
            case 'step-marking-2': this.setMarkingStep(2); break;
            case 'step-marking-3': this.setMarkingStep(3); break;
        }
    },

    router(viewId, btn) {
        document.querySelectorAll('.view-layer').forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');

        this.closePanel();
        if (viewId === 'view-map' && this.map) {
            setTimeout(() => this.map.invalidateSize(), 300);
        }
    },

    buildSidebar() {
        const container = document.getElementById('sidebar-suppliers-list');
        container.innerHTML = '';
        Object.values(SUPPLIERS).forEach(sup => {
            let color = 'var(--text-secondary)';
            if(sup.status === 'alert') color = 'var(--system-red)';
            if(sup.status === 'warning') color = 'var(--system-orange)';
            if(sup.status === 'success') color = 'var(--system-green)';
            if(sup.status === 'info') color = 'var(--system-blue)';

            const btn = document.createElement('button');
            btn.className = 'sup-nav-item';
            btn.innerHTML = `<div class="status-indicator" style="color:${color}; background:currentColor;"></div> <span>${sup.name}</span>`;
            btn.addEventListener('click', () => {
                const mapNavBtn = document.querySelector('[data-router="view-map"]');
                this.router('view-map', mapNavBtn);
                this.openPanel(sup.id);
                this.closeMobileSidebar();
            });
            container.appendChild(btn);
        });
    },

    closeMobileSidebar() {
        document.getElementById('sidebar').classList.remove('open');
    },

    initMap() {
        this.map = L.map('leaflet-map-container', { zoomControl: false }).setView([18.0, 110.0], 5);
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CartoDB', maxZoom: 18
        }).addTo(this.map);

        Object.values(SUPPLIERS).forEach(sup => {
            let mClass = 'marker-pulse ';
            if(sup.status === 'alert') mClass += 'marker-danger';
            else if(sup.status === 'warning') mClass += 'marker-warning';
            else if(sup.status === 'success') mClass += 'marker-success';
            else mClass += 'marker-info';

            const icon = L.divIcon({
                className: '',
                html: `<div class="${mClass}" style="width:20px; height:20px;"></div>`,
                iconSize: [20, 20], iconAnchor: [10, 10]
            });

            const marker = L.marker(sup.coords, {icon}).addTo(this.map);
            marker.bindPopup(`
                <div>
                    <strong style="font-size:1rem; color:white; display:block;">${sup.name}</strong>
                    <span style="color:var(--text-secondary); font-size:0.78rem; text-transform:uppercase;">${sup.role}</span>
                </div>
            `);
            marker.on('click', () => this.openPanel(sup.id));
        });
    },

    openPanel(id) {
        const sup = SUPPLIERS[id];
        if(!sup) return;
        this.currentSupId = id;
        
        document.getElementById('sp-title').innerText = sup.name;
        document.getElementById('sp-subtitle').innerHTML = `<i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${sup.location}`;
        document.getElementById('sp-badges').innerHTML = sup.badges.map(b => `<span class="badge badge-outline">${b}</span>`).join('');
        document.getElementById('sp-dynamic-content').innerHTML = sup.html;
        
        const firstTab = document.querySelectorAll('.tab-btn')[0];
        if (firstTab) this.switchTab('tab-overview', firstTab);
        
        this.renderNotes();
        this.renderIndividualRadar(sup);
        
        document.querySelectorAll('.sup-nav-item').forEach(b => {
            b.classList.toggle('active', b.innerText.includes(sup.name));
        });

        document.getElementById('slide-panel').classList.add('open');
        document.getElementById('slide-overlay').classList.add('open');
    },

    closePanel() {
        document.getElementById('slide-panel').classList.remove('open');
        document.getElementById('slide-overlay').classList.remove('open');
        document.querySelectorAll('.sup-nav-item').forEach(b => b.classList.remove('active'));
        this.currentSupId = null;
    },

    switchTab(tabId, btn) {
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.classList.add('active');
    },

    setMarkingStep(step) {
        const scene = document.getElementById('scene-marking');
        if (scene) scene.setAttribute('data-step', step);
    },

    renderNotes() {
        const notes = this.notesManager.get(this.currentSupId);
        document.getElementById('note-count').innerText = notes.length;
        const container = document.getElementById('notes-list');
        
        if(notes.length === 0) {
            container.innerHTML = `<div class="empty-notes"><i class="fa-regular fa-comment-dots" style="font-size:1.8rem; margin-bottom:8px; opacity:0.5;" aria-hidden="true"></i><br>Aucune note enregistrée. Centralisez ici vos comptes-rendus d'audit.</div>`;
            return;
        }
        
        container.innerHTML = '';
        notes.forEach(n => {
            const item = document.createElement('div');
            item.className = 'note-item';
            
            const header = document.createElement('div');
            header.className = 'note-header';
            header.innerHTML = `
                <div class="note-meta">
                    <div class="note-author-pic">AB</div>
                    <div class="note-author-info">
                        <span class="note-author-name">${n.author}</span>
                        <span class="note-date">${n.time}</span>
                    </div>
                </div>
            `;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'note-delete';
            delBtn.setAttribute('aria-label', 'Supprimer la note');
            delBtn.innerHTML = `<i class="fa-solid fa-trash" aria-hidden="true"></i>`;
            delBtn.addEventListener('click', () => this.deleteNote(n.id));
            header.appendChild(delBtn);

            const body = document.createElement('div');
            body.className = 'note-body';
            body.textContent = n.text;

            item.appendChild(header);
            item.appendChild(body);
            container.appendChild(item);
        });
    },

    saveNote() {
        const input = document.getElementById('note-input');
        const text = input.value.trim();
        if(!text || !this.currentSupId) return;
        this.notesManager.add(this.currentSupId, text);
        input.value = '';
        this.renderNotes();
        this.toast('Note sauvegardée.');
    },

    deleteNote(id) {
        this.notesManager.remove(this.currentSupId, id);
        this.renderNotes();
        this.toast('Note supprimée.');
    },

    toast(msg) {
        const c = document.getElementById('toast-container');
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = `<i class="fa-solid fa-check-circle" style="color:var(--system-green);" aria-hidden="true"></i> <span>${msg}</span>`;
        c.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    },

    initDashboardCharts() {
        Chart.defaults.color = '#ebebf599';
        Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';
        
        const ctxMaturity = document.getElementById('maturityBubbleChart');
        if(ctxMaturity) {
            const bubbleData = Object.values(SUPPLIERS).map(s => {
                let color = 'rgba(10, 132, 255, 0.6)';
                if(s.status === 'alert') color = 'rgba(255, 69, 58, 0.6)';
                if(s.status === 'warning') color = 'rgba(255, 159, 10, 0.6)';
                if(s.status === 'success') color = 'rgba(48, 209, 88, 0.6)';
                
                return {
                    x: s.maturity.quality_process,
                    y: s.maturity.hse,
                    r: s.maturity.expertise * 2.5,
                    supplierName: s.name,
                    backgroundColor: color
                };
            });

            new Chart(ctxMaturity, {
                type: 'bubble',
                data: {
                    datasets: bubbleData.map(d => ({
                        label: d.supplierName,
                        data: [d],
                        backgroundColor: d.backgroundColor,
                        borderColor: d.backgroundColor.replace('0.6', '1'),
                        borderWidth: 1
                    }))
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (ctx) => `${ctx.raw.supplierName} - Process: ${ctx.raw.x}/10 | HSE: ${ctx.raw.y}/10`
                            }
                        }
                    },
                    scales: {
                        x: { title: { display: true, text: 'Qualité & Process (/10)' }, min: 0, max: 10 },
                        y: { title: { display: true, text: 'Maturité HSE (/10)' }, min: 0, max: 10 }
                    }
                }
            });
        }

        const ctxClaim = document.getElementById('claimBarChart');
        if(ctxClaim) {
            new Chart(ctxClaim, {
                type: 'bar',
                data: {
                    labels: ['Le Hung (Slicing)', 'PI Pattana (Slicing)', 'PI Pattana (Foam)'],
                    datasets: [{
                        label: 'USD ($)',
                        data: [43488, 4832, 15082],
                        backgroundColor: ['#ff453a', '#0a84ff', 'rgba(10,132,255,0.4)'],
                        borderRadius: 6
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: {display:false} } }
            });
        }

        const ctxPace = document.getElementById('paceDoughnutChart');
        if(ctxPace) {
            new Chart(ctxPace, {
                type: 'doughnut',
                data: {
                    labels: PACE_CATALOG.map(item => item.status),
                    datasets: [{
                        data: PACE_CATALOG.map(item => item.count),
                        backgroundColor: ['#30d158', '#ff9f0a', '#ff453a', '#0a84ff'],
                        borderWidth: 0, hoverOffset: 8
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right' } } }
            });
        }
    },

    renderIndividualRadar(supplier) {
        const ctx = document.getElementById('individualRadarChart');
        if(!ctx) return;
        
        if(this.individualRadarChart) {
            this.individualRadarChart.destroy();
        }

        let borderColor = '#0a84ff';
        let bgColor = 'rgba(10, 132, 255, 0.2)';
        if(supplier.status === 'alert') { borderColor = '#ff453a'; bgColor = 'rgba(255, 69, 58, 0.2)'; }
        if(supplier.status === 'warning') { borderColor = '#ff9f0a'; bgColor = 'rgba(255, 159, 10, 0.2)'; }
        if(supplier.status === 'success') { borderColor = '#30d158'; bgColor = 'rgba(48, 209, 88, 0.2)'; }

        this.individualRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Expertise Tech.', 'Conformité HSE', 'Qualité Process', 'Innovation', 'Fiabilité LeadTime'],
                datasets: [{
                    label: supplier.name,
                    data: [
                        supplier.maturity.expertise,
                        supplier.maturity.hse,
                        supplier.maturity.quality_process,
                        supplier.maturity.innovation,
                        supplier.maturity.reliability
                    ],
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    pointBackgroundColor: borderColor,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { 
                    r: { 
                        angleLines: { color: 'rgba(255,255,255,0.1)' }, 
                        grid: { color: 'rgba(255,255,255,0.1)' }, 
                        pointLabels: { color: '#ebebf599', font: { size: 11 } }, 
                        ticks: { display: false, min: 0, max: 10 } 
                    } 
                },
                plugins: { legend: { display: false } }
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', () => app.init());
