/**
 * WTI Hub - Application Controller & Three.js 3D Engine
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

            <!-- SCHÉMA 3D INTERACTIF DÉDIÉ AU PLAN DE CONTRÔLE SCAVI -->
            <div class="info-card">
                <h3><i class="fa-solid fa-cubes" aria-hidden="true"></i> Schéma 3D - Procédure d'Inspection Scavi</h3>
                <p>Visualisation interactive du Plan de Contrôle (DPR 02.027.A &amp; DPR 02.009.B)[cite: 2]. Cliquez sur les modes ci-dessous pour modifier la modélisation 3D :</p>
                
                <div class="scavi-3d-box">
                    <div class="scavi-3d-controls">
                        <button class="scavi-3d-btn active" data-action="scavi-3d-points">1. Grille 9 Points Epaisseur (DPR 02.027.A)[cite: 2]</button>
                        <button class="scavi-3d-btn" data-action="scavi-3d-dims">2. Mesures 3x L x 3x l (DPR 02.009.B)[cite: 1, 2]</button>
                        <button class="scavi-3d-btn" data-action="scavi-3d-peel">3. Test Délamination (DS 072)[cite: 1, 2]</button>
                    </div>
                    <div id="scavi-3d-canvas-container" style="width:100%; height:100%;"></div>
                </div>
            </div>

            <div class="info-card">
                <h3><i class="fa-solid fa-list-check" aria-hidden="true"></i> Dépouillement des Étapes de Contrôle Scavi</h3>
                <ul class="alert-list" style="color: var(--text-secondary);">
                    <li><b>1. Couleur &amp; Variations :</b> Contrôle initial de la teinte et des nuances[cite: 1].</li>
                    <li><b>2. Traçabilité :</b> Contrôle des étiquettes de traçabilité des pièces réceptionnées[cite: 1].</li>
                    <li><b>3. Dimensions (3x L / 3x l) :</b> Prise de mesures renforcée sur 3 points en longueur et 3 points en largeur (supérieur au DPR)[cite: 1, 2].</li>
                    <li><b>4. Épaisseur (Grille 9 Points) :</b> Contrôle avec jauge sur 9 points répartis à 5 cm du bord (début, milieu, fin)[cite: 2].</li>
                    <li><b>5. Test Délamination (DS 072) :</b> Test de traction manuelle du textile pour vérifier l'adhérence de l'encollage[cite: 1, 2].</li>
                </ul>

                <div class="alert-box alert-warning" style="margin-top: 16px;">
                    <h4><i class="fa-solid fa-book-open" aria-hidden="true"></i> Visual Defect Library (Axe d'Amélioration)</h4>
                    <p>Scavi possède sa propre bibliothèque de défauts (photos uniquement)[cite: 1]. Volonté exprimée de basculer vers le standard interactif <b>WTI Visual Defect Book</b>[cite: 1].</p>
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

// 2. MOTEUR DE RENDU 3D WEBGL SPÉCIFIQUE POUR SCAVI
const Scavi3DEngine = {
    scene: null,
    camera: null,
    renderer: null,
    sheetMesh: null,
    pinsGroup: null,
    dimLinesGroup: null,
    peelGroup: null,

    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container || typeof THREE === 'undefined') return;

        container.innerHTML = '';
        const width = container.clientWidth || 550;
        const height = container.clientHeight || 300;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x121215);

        this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        this.camera.position.set(0, 12, 18);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        const directional = new THREE.DirectionalLight(0x0a84ff, 1.8);
        directional.position.set(5, 12, 8);
        this.scene.add(ambient, directional);

        const sheetGeo = new THREE.BoxGeometry(10, 0.3, 6);
        const sheetMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2e, roughness: 0.6 });
        this.sheetMesh = new THREE.Mesh(sheetGeo, sheetMat);
        this.scene.add(this.sheetMesh);

        this.pinsGroup = new THREE.Group();
        this.dimLinesGroup = new THREE.Group();
        this.peelGroup = new THREE.Group();

        this.scene.add(this.pinsGroup);
        this.scene.add(this.dimLinesGroup);
        this.scene.add(this.peelGroup);

        this.buildThicknessGrid();
        this.buildDimensionLines();
        this.buildPeelTest();

        this.setMode('points');

        const animate = () => {
            requestAnimationFrame(animate);
            this.sheetMesh.rotation.y += 0.002;
            this.pinsGroup.rotation.y += 0.002;
            this.dimLinesGroup.rotation.y += 0.002;
            this.peelGroup.rotation.y += 0.002;
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    },

    buildThicknessGrid() {
        const pinMat = new THREE.MeshBasicMaterial({ color: 0x30d158 });
        const xPositions = [-4.2, 0, 4.2];
        const zPositions = [-2.2, 0, 2.2];

        xPositions.forEach(x => {
            zPositions.forEach(z => {
                const pinGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
                const pin = new THREE.Mesh(pinGeo, pinMat);
                pin.position.set(x, 0.5, z);
                this.pinsGroup.add(pin);
            });
        });
    },

    buildDimensionLines() {
        const lineMat = new THREE.MeshBasicMaterial({ color: 0x0a84ff });
        [-3.5, 0, 3.5].forEach(x => {
            const lineGeo = new THREE.BoxGeometry(0.08, 0.1, 5.8);
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.position.set(x, 0.2, 0);
            this.dimLinesGroup.add(line);
        });
        [-2, 0, 2].forEach(z => {
            const lineGeo = new THREE.BoxGeometry(9.8, 0.1, 0.08);
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.position.set(0, 0.2, z);
            this.dimLinesGroup.add(line);
        });
    },

    buildPeelTest() {
        const peelGeo = new THREE.BoxGeometry(2.5, 0.1, 2.5);
        const peelMat = new THREE.MeshStandardMaterial({ color: 0xff9f0a, roughness: 0.3 });
        const peelMesh = new THREE.Mesh(peelGeo, peelMat);
        peelMesh.position.set(-3.5, 0.6, -1.8);
        peelMesh.rotation.z = 0.35;
        this.peelGroup.add(peelMesh);
    },

    setMode(mode) {
        this.pinsGroup.visible = (mode === 'points');
        this.dimLinesGroup.visible = (mode === 'dims');
        this.peelGroup.visible = (mode === 'peel');
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
            console.warn('LocalStorage inaccessible:', e);
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
            console.error('Erreur sauvegarde localStorage:', e);
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
                this.handleAction(action, actionBtn);
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

    handleAction(action, btn) {
        switch(action) {
            case 'toggle-light-ok': 
                this.toggleLight('ok'); 
                break;
            case 'toggle-light-nok': 
                this.toggleLight('nok'); 
                break;
            case 'step-marking-1': this.setMarkingStep(1); break;
            case 'step-marking-2': this.setMarkingStep(2); break;
            case 'step-marking-3': this.setMarkingStep(3); break;

            case 'scavi-3d-points':
                this.updateScavi3DBtn(btn);
                Scavi3DEngine.setMode('points');
                break;
            case 'scavi-3d-dims':
                this.updateScavi3DBtn(btn);
                Scavi3DEngine.setMode('dims');
                break;
            case 'scavi-3d-peel':
                this.updateScavi3DBtn(btn);
                Scavi3DEngine.setMode('peel');
                break;
        }
    },

    updateScavi3DBtn(activeBtn) {
        document.querySelectorAll('.scavi-3d-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    },

    toggleLight(state) {
        const scene = document.getElementById('scene-blademarks');
        const badge = document.getElementById('light-status-badge');
        const btnGo = document.getElementById('btn-light-go');
        const btnNogo = document.getElementById('btn-light-nogo');
        
        if(!scene) return;
        
        if(state === 'ok') {
            scene.classList.add('light-ok');
            scene.classList.remove('light-nok');
            
            if(badge) {
                badge.innerHTML = `<span class="badge badge-success"><i class="fa-solid fa-check"></i> GO - Lumière à 45° (Révèle l'ombre)</span>`;
            }
            if(btnGo && btnNogo) {
                btnGo.classList.add('active');
                btnNogo.classList.remove('active');
            }
            this.toast('Mode GO : Lumière à 45° rasante activée');
        } else {
            scene.classList.add('light-nok');
            scene.classList.remove('light-ok');
            
            if(badge) {
                badge.innerHTML = `<span class="badge badge-danger"><i class="fa-solid fa-xmark"></i> NOGO - Lumière Zénithale 90° (Défaut masqué)</span>`;
            }
            if(btnGo && btnNogo) {
                btnNogo.classList.add('active');
                btnGo.classList.remove('active');
            }
            this.toast('Mode NOGO : Lumière 90° zénithale masquant les ombres !');
        }
    },

    setMarkingStep(step) {
        const scene = document.getElementById('scene-marking');
        if (scene) scene.setAttribute('data-step', step);
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

        if (id === 'scavi') {
            setTimeout(() => {
                Scavi3DEngine.init('scavi-3d-canvas-container');
            }, 300);
        }
        
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
