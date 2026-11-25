let activeAnimation = null;

function easeOutCubicBezier(t) {
  // Approximation of cubic-bezier(0.25, 1, 0.5, 1)
  return 1 - Math.pow(1 - t, 3.2);
}

function smoothScrollSlider(direction) {
  const slider = document.getElementById("projects-slider");
  if (!slider) return;

  if (activeAnimation) {
    cancelAnimationFrame(activeAnimation);
  }

  const cards = slider.querySelectorAll(".project-card");
  let stepDistance = 424; // fallback (400px card + 24px gap)
  if (cards.length > 0) {
    const cardWidth = cards[0].offsetWidth;
    stepDistance = cardWidth + 24;
  }

  const startX = slider.scrollLeft;
  const targetX = Math.max(
    0,
    Math.min(
      slider.scrollWidth - slider.clientWidth,
      startX + direction * stepDistance,
    ),
  );
  const distance = targetX - startX;

  if (Math.abs(distance) < 2) return;

  const duration = 550; // luxury smooth ~550ms
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubicBezier(progress);

    slider.scrollLeft = startX + distance * easeProgress;

    if (progress < 1) {
      activeAnimation = requestAnimationFrame(step);
    } else {
      slider.scrollLeft = targetX;
      activeAnimation = null;
    }
  }

  activeAnimation = requestAnimationFrame(step);
}

// Project Database for Modal Dialog
const projectDatabase = {
  synapse: {
    title: "SYNAPSE AI WORKFLOWS",
    category: "LLM Agent Platform & Distributed Backend",
    status: "2024 • PRODUCTION SYSTEM",
    description:
      "Synapse is an enterprise-grade agent orchestration framework designed to orchestrate autonomous multi-agent pipelines with deterministic human-in-the-loop validation. Constructed on top of an asynchronous event-driven architecture using FastAPI microservices and vector indices, it achieves high model inference throughput while preserving low latency and zero memory leaks.",
    mockupHtml: `
  <div class="w-full max-w-sm border border-[#cfc4b2] bg-[#fdfbf7] rounded-lg p-3 shadow-md flex flex-col gap-2">
    <div class="flex items-center justify-between border-b border-[#ece6da] pb-1.5">
      <span class="text-[9px] font-mono text-[#7b8374]">Agent Cluster: us-east-1a</span>
      <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
    </div>
    <div class="flex gap-2">
      <div class="w-1/3 bg-[#ece6da] p-2 rounded text-[8px] text-[#4d5648] font-mono flex flex-col justify-between">
        <span>LangChain Orchestrator</span>
        <div class="w-full h-1.5 bg-[#4c5847] rounded-full mt-2"></div>
      </div>
      <div class="w-2/3 bg-[#3f4a3c] text-[#f7f4ed] p-2 rounded text-[8px] flex flex-col justify-between font-mono">
        <span class="text-[#d8c39e]">Streaming Embeddings Vector DB</span>
        <span class="text-[7px] text-[#cbd5c7]">pgvector query latency: 14ms</span>
      </div>
    </div>
  </div>
`,
    metrics: [
      { label: "Latency Drop", val: "-62%" },
      { label: "Daily LLM Tokens", val: "48M+" },
      { label: "Service Uptime", val: "99.98%" },
    ],
    stack: [
      "Next.js 14",
      "FastAPI",
      "Python",
      "LangChain",
      "PostgreSQL",
      "pgvector",
      "Docker",
      "AWS ECS",
    ],
  },
  neuralops: {
    title: "NEURALOPS CLOUD",
    category: "Full-Stack MLOps & Real-Time Analytics",
    status: "2024 • PRODUCTION PLATFORM",
    description:
      "An automated cloud harness for model versioning, continuous evaluation, and telemetry tracking across multi-cluster Kubernetes nodes. Includes custom Grafana metrics exporter, dynamic hardware allocation, and reactive React analytics dashboards designed for high-concurrency engineering teams.",
    mockupHtml: `
  <div class="w-full max-w-sm bg-[#283124] border border-[#596952] rounded-lg p-3 shadow-md flex items-center justify-between">
    <div class="w-24 h-24 bg-[#1b2118] rounded border border-[#6b7d62] p-2 flex flex-col justify-between">
      <span class="text-[8px] font-mono text-[#d8c39e]">GPU Cluster #04</span>
      <div class="w-full h-8 bg-[#374432] rounded flex items-center justify-center text-[7px] text-[#b6c2b1]">98.4% Load</div>
    </div>
    <div class="flex-1 ml-3 space-y-1.5">
      <div class="h-2 bg-[#44543f] rounded w-full"></div>
      <div class="h-2 bg-[#596952] rounded w-4/5"></div>
      <div class="h-2 bg-[#6b7d62] rounded w-2/3"></div>
      <div class="text-[8px] font-mono text-[#cfd7cb] pt-1">Auto-scaling: 12 nodes active</div>
    </div>
  </div>
`,
    metrics: [
      { label: "Deployment Speed", val: "4.5x" },
      { label: "Hardware Cost", val: "-35%" },
      { label: "Clusters Active", val: "16 Nodes" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "Kubernetes",
      "Redis",
      "Prometheus",
      "Terraform",
      "GCP",
    ],
  },
  aura: {
    title: "AURA HEALTH AI",
    category: "Intelligent Diagnostic API & Web System",
    status: "2023 • HIPAA COMPLIANT",
    description:
      "A secure, HIPAA-compliant diagnostic assist suite incorporating deep vision analysis and encrypted tokenized pipelines. Built with rigorous audit trails, asynchronous processing queues with Celery, and an accessible luxury editorial interface designed for clinical practitioners.",
    mockupHtml: `
  <div class="w-full max-w-sm border border-[#cfc4b2] bg-[#f9f8f4] rounded-lg p-3 shadow-md flex justify-between items-center">
    <div class="w-32 border border-[#cbbeab] bg-white rounded p-2 shadow-sm space-y-1">
      <div class="text-[8px] font-serif uppercase tracking-widest text-[#9b7b4f]">Diagnostic Assist</div>
      <div class="w-full h-2 bg-[#ece7db] rounded"></div>
      <div class="w-3/4 h-2 bg-[#ded7c8] rounded"></div>
    </div>
    <div class="w-20 h-20 rounded-full border-2 border-dashed border-[#b89b72] flex flex-col items-center justify-center bg-[#f4f0e6]">
      <span class="text-xs font-serif text-[#3f4a3c] font-semibold">99.4%</span>
      <span class="text-[6px] tracking-wider text-[#7d8677] uppercase">Accuracy</span>
    </div>
  </div>
`,
    metrics: [
      { label: "Model Accuracy", val: "99.4%" },
      { label: "Audit Conformance", val: "100%" },
      { label: "P99 Response", val: "120ms" },
    ],
    stack: [
      "Next.js",
      "PyTorch",
      "FastAPI",
      "Celery",
      "PostgreSQL",
      "Tailwind CSS",
      "AWS KMS",
    ],
  },
  vortex: {
    title: "VORTEX ENGINE",
    category: "High-Throughput Event Streaming & Next.js Dashboard",
    status: "2023 • ENTERPRISE CORE",
    description:
      "Distributed messaging pipeline handling sustained loads over 10 million events daily. Integrates Kafka message brokers with a resilient Go and Node.js ingestion gateway, rendering live WebSocket telemetry via a low-overhead Next.js command panel.",
    mockupHtml: `
  <div class="w-full max-w-sm bg-[#222a1f] border border-[#52634d] rounded-lg p-3 shadow-md flex flex-col gap-2">
    <div class="flex justify-between items-center text-[8px] font-mono text-[#d8c39e]">
      <span>INGESTION PIPELINE</span>
      <span>12.4K ops/sec</span>
    </div>
    <div class="w-full h-12 bg-[#192017] rounded flex items-end gap-1 p-1.5 border border-[#374432]">
      <div class="flex-1 bg-[#44543f] h-4"></div>
      <div class="flex-1 bg-[#53604f] h-7"></div>
      <div class="flex-1 bg-[#b89b72] h-10"></div>
      <div class="flex-1 bg-[#53604f] h-6"></div>
      <div class="flex-1 bg-[#677562] h-8"></div>
      <div class="flex-1 bg-[#44543f] h-5"></div>
    </div>
  </div>
`,
    metrics: [
      { label: "Daily Events", val: "10M+" },
      { label: "Ingestion Latency", val: "<8ms" },
      { label: "System Availability", val: "99.99%" },
    ],
    stack: [
      "Go",
      "Apache Kafka",
      "Next.js",
      "Node.js",
      "Redis Streams",
      "ClickHouse",
      "Docker",
    ],
  },
  cognitive: {
    title: "COGNITIVE SEARCH",
    category: "RAG Vector Search & React Frontend",
    status: "2024 • ENTERPRISE INTEGRATION",
    description:
      "Contextual semantic search engine connecting vast internal corporate knowledge bases to real-time generative summaries. Features re-ranking algorithms, cross-encoder scoring, and responsive multi-tenant authentication.",
    mockupHtml: `
  <div class="w-full max-w-sm border border-[#cfc4b2] bg-[#f9f8f5] rounded-lg p-3 shadow-md space-y-2">
    <div class="flex items-center space-x-2 border border-[#d8d0c0] bg-white rounded-full px-3 py-1">
      <span class="text-[#b89b72] text-[10px]">🔍</span>
      <span class="text-[8px] text-[#787f73] font-mono">Semantic query: multi-cloud disaster recovery...</span>
    </div>
    <div class="bg-[#eee9de] rounded p-2 text-[8px] text-[#4d5648] flex justify-between items-center">
      <span>Re-ranked Relevance Score</span>
      <span class="font-bold text-[#3f4a3c]">0.982</span>
    </div>
  </div>
`,
    metrics: [
      { label: "Indexed Records", val: "2.4M" },
      { label: "Query Time", val: "45ms" },
      { label: "User CTR", val: "+74%" },
    ],
    stack: [
      "React",
      "FastAPI",
      "Pinecone",
      "OpenAI APIs",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
  },
};

function openProjectModal(key) {
  const data = projectDatabase[key];
  if (!data) return;

  const modal = document.getElementById("project-modal");
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-category").textContent = data.category;
  document.getElementById("modal-status").textContent = data.status;
  document.getElementById("modal-description").textContent =
    data.description;
  document.getElementById("modal-mockup").innerHTML = data.mockupHtml;

  // Populate Metrics
  const metricsContainer = document.getElementById("modal-metrics");
  metricsContainer.innerHTML = "";
  data.metrics.forEach((m) => {
    const col = document.createElement("div");
    col.className =
      "text-center p-2 rounded bg-[#f6f2e9] border border-[#ded5c5]";
    col.innerHTML = `
  <div class="font-serif text-lg sm:text-xl font-normal text-[#2c3328]">${m.val}</div>
  <div class="text-[8px] uppercase tracking-wider text-[#737c6e] mt-0.5">${m.label}</div>
`;
    metricsContainer.appendChild(col);
  });

  // Populate Stack Chips
  const stackContainer = document.getElementById("modal-stack");
  stackContainer.innerHTML = "";
  data.stack.forEach((tech) => {
    const chip = document.createElement("span");
    chip.className =
      "px-3 py-1 text-[10px] font-medium tracking-wide uppercase rounded-full border border-[#cbbeab] bg-[#eee9df] text-[#44503f]";
    chip.textContent = tech;
    stackContainer.appendChild(chip);
  });

  // Show modal with animation
  modal.classList.remove("modal-hidden", "pointer-events-none");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;
  modal.classList.add("modal-hidden", "pointer-events-none");
  document.body.style.overflow = "";
}

// Keyboard accessibility (ESC key)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

// Card keyboard accessibility (Enter key)
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// Horizontal Scroll-driven Micro-transitions using IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("projects-slider");
  const cards = document.querySelectorAll(".project-card");

  if (!slider || !cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
        } else {
          entry.target.style.opacity = "0.78";
          entry.target.style.transform = "scale(0.97)";
        }
      });
    },
    {
      root: slider,
      threshold: 0.25,
    },
  );

  cards.forEach((card) => observer.observe(card));
});
