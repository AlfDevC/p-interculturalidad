/**
 * MEMORIAS QUE NOS UNEN - JAVASCRIPT PRINCIPAL
 * Proyecto de Interculturalidad - Universidad Nacional de Ingeniería (UNI)
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initFamilyFilters();
  initGenogramUploads();
  initInteractiveMap();
  initParticipaForm();
  initBackToTop();
});

/* ==========================================================================
   1. GESTIÓN DE TEMA (MODO OSCURO / CLARO)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("uni_interculturalidad_theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    updateThemeIcon(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("uni_interculturalidad_theme", isDark ? "dark" : "light");
      updateThemeIcon(isDark);
    });
  }
}

function updateThemeIcon(isDark) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  if (isDark) {
    // Icono de Sol
    icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  } else {
    // Icono de Luna
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  }
}

/* ==========================================================================
   2. NAVEGACIÓN Y MENÚ MÓVIL
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggleBtn = document.getElementById("navToggleBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Sombra en scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
    highlightActiveSection(sections, navLinks);
  });

  // Toggle menú móvil
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      navToggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          navMenu.classList.remove("open");
        }
      });
    });
  }
}

function highlightActiveSection(sections, navLinks) {
  const scrollY = window.pageYOffset;
  const headerOffset = 120;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerOffset;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}

/* ==========================================================================
   3. FILTROS DE TARJETAS DE FAMILIAS
   ========================================================================== */
function initFamilyFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const familyCards = document.querySelectorAll(".family-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedFamily = btn.getAttribute("data-family");

      familyCards.forEach((card) => {
        const cardFamily = card.getAttribute("data-family");
        if (selectedFamily === "todas" || cardFamily === selectedFamily) {
          card.style.display = "flex";
          setTimeout(() => (card.style.opacity = "1"), 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. VISOR Y PREVISUALIZADOR DE GENOGRAMAS
   ========================================================================== */
function initGenogramUploads() {
  const uploadInputs = document.querySelectorAll(".genogram-file-input");

  uploadInputs.forEach((input) => {
    input.addEventListener("change", function (e) {
      const file = this.files[0];
      const slotId = this.getAttribute("data-slot");
      const previewImg = document.getElementById(`preview-${slotId}`);

      if (file && previewImg) {
        const reader = new FileReader();
        reader.onload = function (event) {
          previewImg.src = event.target.result;
          previewImg.classList.add("active");
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

// Modal para ver genogramas detallados
window.openGenogramModal = function (familyId) {
  const modal = document.getElementById("genogramModal");
  const modalTitle = document.getElementById("modalGenogramTitle");
  const modalBody = document.getElementById("modalGenogramContent");

  const familyData = {
    centeno: {
      title: "Genograma Etnográfico: Familia Centeno Jarquín",
      image: "resources/centeno.jpeg",
      student: "Jared Emanuel Centeno Jarquín",
      desc: "Documenta antecedentes familiares vinculados a Chinandega, Managua y Canadá (Sabina Martínez). Idiomas: Español e Inglés. Ocupaciones: Agricultura, administración y actividades profesionales.",
      missing: "Ficha con datos incompletos en algunas líneas generacionales. Requiere verificación con informantes familiares.",
    },
    maradiaga: {
      title: "Genograma Etnográfico: Familia Maradiaga Flores",
      image: "resources/maradiaga.png",
      student: "Hamilton Daniel Maradiaga Flores",
      desc: "Conecta Carazo (Diriamba) con Bluefields (RACCS). Identidad Creole/Miskita en abuelo paterno Oscar Daniel Maradiaga Salomón. Idiomas: Kriol, Miskito, Español, Inglés. Ocupaciones: Agricultura, costura artesanal, carpintería, comercio y docencia.",
      missing: "Verificar trayectorias migratorias específicas interdepartamentales con la familia.",
    },
    martinez: {
      title: "Genograma Etnográfico: Familia Martínez Meza",
      image: "resources/martinez.png",
      student: "Alfredo Gilberto Martínez Meza",
      desc: "Localidades: Masachapa y San Rafael del Sur. Autoidentificación mestiza, idioma español. Ocupaciones: Agricultura, conducción, sastrería, contabilidad, trabajo administrativo, psicología.",
      missing: "Campos pendientes por corroborar sobre fechas exactas de desplazamiento.",
    },
    delcastillo: {
      title: "Genograma Etnográfico: Familia Del Castillo Cajina",
      image: "resources/del_castillo.png",
      student: "Jeremy Antonio Del Castillo Cajina",
      desc: "Red geográfica amplia: Managua, León, Chinandega, Granada, Matagalpa, Jinotega y Masaya. Autoidentificación mestiza, español. Ocupaciones: Comercio, agricultura, caficultura, docencia, artesanía, enfermería, ingeniería.",
      missing: "Validar si todas las referencias corresponden a lugares de origen o migración confirmada.",
    },
  };

  const current = familyData[familyId];
  if (!current || !modal) return;

  modalTitle.textContent = current.title;
  modalBody.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="section-badge">${current.student}</span>
      <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.6; margin-top: 10px;">${current.desc}</p>
    </div>

        <div style="text-align:center; margin-bottom:20px;">
      <img src="${current.image}" alt="${current.title}"
           style="max-width:100%; height:auto; border-radius:12px; border:1px solid var(--border-color);">
    </div>



    <div class="methodology-warning-box" style="margin-top: 0;">
      <svg class="warning-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <div class="warning-content">
        <strong>Nota de Rigor Metodológico:</strong> ${current.missing} No sustituir datos ausentes con suposiciones.
      </div>
    </div>
  `;

  modal.classList.add("active");
};

window.closeGenogramModal = function () {
  const modal = document.getElementById("genogramModal");
  if (modal) modal.classList.remove("active");
};

/* ==========================================================================
   5. MAPA INTERACTIVO Y EXPLORADOR DE LOCALIDADES
   ========================================================================== */
const locationsData = {
  chinandega: {
    name: "Chinandega",
    zone: "Pacífico Noroccidente",
    families: ["Familia Centeno Jarquín", "Familia Del Castillo Cajina"],
    desc: "Aparece documentada en la historia familiar de Jared Emanuel Centeno Jarquín como lugar de origen familiar, y en la red de parentescos de Jeremy Antonio Del Castillo Cajina. Asimismo, la ficha registra a Sabina Martínez como originaria de Chinandega antes de su residencia en Canadá.",
    status: "Referencia territorial y origen consignado en fichas.",
  },
  leon: {
    name: "León",
    zone: "Pacífico Occidental",
    families: ["Familia Del Castillo Cajina"],
    desc: "Aparece registrada en la red de parentesco y antecedentes de la familia Del Castillo Cajina, vinculada a las dinámicas históricas y económicas del occidente del país.",
    status: "Referencia consignada en ficha etnográfica.",
  },
  managua: {
    name: "Managua",
    zone: "Pacífico Central (Capital)",
    families: ["Familia Centeno Jarquín", "Familia Del Castillo Cajina"],
    desc: "Ciudad capital vinculada a las trayectorias de residencia, estudios universitarios en la UNI y actividades de administración y comercio en las historias familiares.",
    status: "Residencia y actividad documentada.",
  },
  sanrafael: {
    name: "San Rafael del Sur",
    zone: "Departamento de Managua",
    families: ["Familia Martínez Meza"],
    desc: "Municipio clave en la historia de la familia de Alfredo Gilberto Martínez Meza. Relacionada con labores comunitarias, agrícolas y de transporte a través de generaciones.",
    status: "Municipio de origen y residencia familiar.",
  },
  masachapa: {
    name: "Masachapa",
    zone: "Litoral Pacífico de Managua",
    families: ["Familia Martínez Meza"],
    desc: "Localidad costera documentada en el genograma de Alfredo Gilberto Martínez Meza. Representa el arraigo comunitario y la relación histórica con oficios locales.",
    status: "Localidad documentada en genograma.",
  },
  diriamba: {
    name: "Diriamba (Carazo)",
    zone: "Meseta de los Pueblos / Pacífico Sur",
    families: ["Familia Maradiaga Flores"],
    desc: "Localidad central en la historia de Hamilton Daniel Maradiaga Flores, punto de encuentro territorial que conecta la región del Pacífico con la Costa Caribe Sur.",
    status: "Localidad familiar documentada.",
  },
  masaya: {
    name: "Masaya",
    zone: "Oriente / Meseta",
    families: ["Familia Del Castillo Cajina"],
    desc: "Consignada en la red de parentesco de Jeremy Antonio Del Castillo Cajina, asociada a la tradición cultural y artesanal del departamento.",
    status: "Referencia geográfica en ficha.",
  },
  granada: {
    name: "Granada",
    zone: "Pacífico Sur / Lago Cocibolca",
    families: ["Familia Del Castillo Cajina"],
    desc: "Ciudad histórica vinculada a los antecedentes comerciales y de parentesco en la historia familiar de Del Castillo Cajina.",
    status: "Referencia en red familiar.",
  },
  matagalpa: {
    name: "Matagalpa",
    zone: "Tierras Altas del Norte",
    families: ["Familia Del Castillo Cajina"],
    desc: "Departamento del norte nicaragüense que vincula la historia familiar con actividades agrícolas, producción cafetalera y relaciones interregionales.",
    status: "Referencia a actividad agropecuaria y parentesco.",
  },
  jinotega: {
    name: "Jinotega",
    zone: "Tierras Altas del Norte",
    families: ["Familia Del Castillo Cajina"],
    desc: "Consignada en la ficha de Del Castillo Cajina, reflejando la extensión de los vínculos familiares hacia las zonas montañosas y cafetaleras del país.",
    status: "Referencia consignada en ficha etnográfica.",
  },
  bluefields: {
    name: "Bluefields",
    zone: "Región Autónoma de la Costa Caribe Sur (RACCS)",
    families: ["Familia Maradiaga Flores"],
    desc: "Conexión trascendental con la Costa Caribe Sur. En la ficha de Hamilton Maradiaga se documenta la identidad Creole/Miskita de su abuelo paterno Oscar Daniel Maradiaga Salomón, hablante de Kriol (inglés criollo), miskito y español.",
    status: "Punto clave de diversidad étnica y lingüística.",
  },
  canada: {
    name: "Canadá (Internacional)",
    zone: "América del Norte",
    families: ["Familia Centeno Jarquín"],
    desc: "Experiencia documentada de migración internacional en la ficha de Jared Emanuel Centeno Jarquín. Sabina Martínez, originaria de Chinandega, reside en Canadá y habla español e inglés. Muestra cómo los lazos familiares cruzan fronteras.",
    status: "Migración internacional verificada en ficha.",
  },
};

function initInteractiveMap() {
  const mapPins = document.querySelectorAll(".map-pin");
  const quickLocBtns = document.querySelectorAll(".loc-btn");
  const familyMapSelect = document.getElementById("familyMapSelect");

  function selectLocation(locKey) {
    const loc = locationsData[locKey];
    if (!loc) return;

    // Actualizar pines
    mapPins.forEach((pin) => {
      if (pin.getAttribute("data-location") === locKey) {
        pin.classList.add("active");
      } else {
        pin.classList.remove("active");
      }
    });

    // Actualizar botones rápidos
    quickLocBtns.forEach((btn) => {
      if (btn.getAttribute("data-loc") === locKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Actualizar panel de información
    const nameEl = document.getElementById("locPanelName");
    const zoneEl = document.getElementById("locPanelZone");
    const familiesEl = document.getElementById("locPanelFamilies");
    const descEl = document.getElementById("locPanelDesc");
    const statusEl = document.getElementById("locPanelStatus");

    if (nameEl) nameEl.textContent = loc.name;
    if (zoneEl) zoneEl.textContent = loc.zone;
    if (familiesEl) familiesEl.textContent = loc.families.join(" · ");
    if (descEl) descEl.textContent = loc.desc;
    if (statusEl) statusEl.textContent = loc.status;
  }

  // Clics en pines
  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      const locKey = pin.getAttribute("data-location");
      selectLocation(locKey);
    });
  });

  // Clics en botones rápidos
  quickLocBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const locKey = btn.getAttribute("data-loc");
      selectLocation(locKey);
    });
  });

  // Filtro por familia en el mapa
  if (familyMapSelect) {
    familyMapSelect.addEventListener("change", (e) => {
      const selectedFam = e.target.value;

      mapPins.forEach((pin) => {
        const pinLoc = pin.getAttribute("data-location");
        const data = locationsData[pinLoc];

        if (!data) return;

        if (selectedFam === "todas") {
          pin.classList.remove("dimmed");
        } else {
          const match = data.families.some((f) =>
            f.toLowerCase().includes(selectedFam.toLowerCase())
          );
          if (match) {
            pin.classList.remove("dimmed");
          } else {
            pin.classList.add("dimmed");
          }
        }
      });
    });
  }

  // Seleccionar Managua por defecto
  selectLocation("managua");
}

/* ==========================================================================
   6. FORMULARIO "PARTICIPA" Y GENERADOR DE FICHA LOCAL
   ========================================================================== */
function initParticipaForm() {
  const form = document.getElementById("memoryForm");
  const resetBtn = document.getElementById("resetFormBtn");
  const printBtn = document.getElementById("printCardBtn");
  const copyBtn = document.getElementById("copyCardBtn");

  const fields = [
    "userRoots",
    "userLanguages",
    "userTraditions",
    "userMigration",
    "userLearned",
    "userRespect",
  ];

  // Cargar datos previos de localStorage
  fields.forEach((fieldId) => {
    const saved = localStorage.getItem(`uni_participa_${fieldId}`);
    const input = document.getElementById(fieldId);
    if (saved && input) {
      input.value = saved;
      updatePreviewField(fieldId, saved);
    }

    if (input) {
      input.addEventListener("input", (e) => {
        const val = e.target.value;
        localStorage.setItem(`uni_participa_${fieldId}`, val);
        updatePreviewField(fieldId, val);
      });
    }
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validación simple
      let valid = true;
      fields.forEach((fieldId) => {
        const el = document.getElementById(fieldId);
        if (el && !el.value.trim()) {
          valid = false;
        }
      });

      const alertBox = document.getElementById("formFeedbackAlert");

      if (alertBox) {
        alertBox.style.display = "block";
        if (valid) {
          alertBox.style.background = "var(--color-nature-light)";
          alertBox.style.color = "var(--color-nature)";
          alertBox.style.borderColor = "var(--color-nature)";
          alertBox.innerHTML = `<strong>¡Ficha de Memoria completada con éxito!</strong> Tu registro ha sido procesado de forma estrictamente local y educativa. Puedes imprimirla o guardarla.`;
        } else {
          alertBox.style.background = "var(--color-gold-light)";
          alertBox.style.color = "#92400e";
          alertBox.style.borderColor = "var(--color-gold)";
          alertBox.innerHTML = `<strong>Nota:</strong> Tu ficha se ha guardado parcialmente. Te recomendamos completar todas las preguntas reflexivas para una memoria más completa.`;
        }
      }
    });
  }

  // Botón reset
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("¿Deseas reiniciar tu formulario de memoria familiar?")) {
        fields.forEach((fieldId) => {
          localStorage.removeItem(`uni_participa_${fieldId}`);
          const input = document.getElementById(fieldId);
          if (input) input.value = "";
          updatePreviewField(fieldId, "");
        });
        const alertBox = document.getElementById("formFeedbackAlert");
        if (alertBox) alertBox.style.display = "none";
      }
    });
  }

  // Botón imprimir
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Botón copiar texto
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const previewCard = document.getElementById("memoryCardPreview");
      if (!previewCard) return;

      let textToCopy = "FICHA DE MEMORIA FAMILIAR E INTERCULTURALIDAD - UNI\n\n";
      fields.forEach((fId) => {
        const lbl = document.querySelector(`label[for="${fId}"]`)?.textContent || fId;
        const val = document.getElementById(fId)?.value || "(Sin respuesta)";
        textToCopy += `${lbl}\nRespuesta: ${val}\n\n`;
      });
      textToCopy += "Memorias que nos unen: Proyecto de Interculturalidad UNI.";

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "¡Copiado!";
        setTimeout(() => (copyBtn.textContent = originalText), 2000);
      });
    });
  }
}

function updatePreviewField(fieldId, value) {
  const targetEl = document.getElementById(`preview_${fieldId}`);
  if (targetEl) {
    targetEl.textContent = value.trim() ? value : "—";
  }
}

/* ==========================================================================
   7. BOTÓN VOLVER ARRIBA
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.pointerEvents = "auto";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.pointerEvents = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
