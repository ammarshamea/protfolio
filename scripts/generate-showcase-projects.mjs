/**
 * Writes bilingual project JSON + branded PNG covers for new showcase /
 * open-source entries. Existing slugs are never overwritten.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contentDir = join(root, "content/projects");
const coverDir = join(root, "public/projects/covers");
mkdirSync(coverDir, { recursive: true });

const FONT_BOLD =
  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";
const FONT =
  "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";

function cover(slug, title, kicker, color) {
  const dest = join(coverDir, `${slug}.png`);
  if (existsSync(dest)) return;
  const safeTitle = title.replace(/[':]/g, "\\'");
  const safeKicker = kicker.replace(/[':]/g, "\\'");
  execFileSync("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `color=c=${color}:s=1600x1000`,
    "-vf",
    [
      `drawbox=x=0:y=0:w=1600:h=1000:color=0x07140f@0.35:t=fill`,
      `drawbox=x=0:y=0:w=18:h=1000:color=0x34d399:t=fill`,
      `drawtext=fontfile=${FONT}:text='${safeKicker}':fontcolor=0x34d399:fontsize=28:x=80:y=390`,
      `drawtext=fontfile=${FONT_BOLD}:text='${safeTitle}':fontcolor=white:fontsize=64:x=80:y=440`,
      `drawtext=fontfile=${FONT}:text='Ammar Shamea':fontcolor=0xd1fae5:fontsize=24:x=80:y=540`,
    ].join(","),
    "-frames:v",
    "1",
    dest,
  ]);
}

function writePair(en, ar) {
  const enPath = join(contentDir, `${en.slug}.json`);
  const arPath = join(contentDir, `${en.slug}.ar.json`);
  if (!existsSync(enPath)) {
    writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);
  }
  if (!existsSync(arPath)) {
    writeFileSync(arPath, `${JSON.stringify(ar, null, 2)}\n`);
  }
}

function project({
  slug,
  title,
  titleAr,
  tagline,
  taglineAr,
  category,
  listing = "showcase",
  featured = false,
  role,
  roleAr,
  duration,
  durationAr,
  year,
  overview,
  overviewAr,
  problem,
  problemAr,
  solution,
  solutionAr,
  architecture,
  architectureAr,
  features,
  featuresAr,
  challenges,
  challengesAr,
  lessonsLearned,
  lessonsLearnedAr,
  futureImprovements,
  futureImprovementsAr,
  results,
  resultsAr,
  stack,
  liveUrl,
  githubUrl,
  color = "0x0b3d2e",
  kicker,
}) {
  const coverImage = `/projects/covers/${slug}.png`;
  cover(slug, title, kicker, color);
  writePair(
    {
      slug,
      title,
      tagline,
      category,
      listing,
      featured,
      favorite: false,
      role,
      duration,
      year,
      overview,
      problem,
      solution,
      architecture,
      features,
      challenges,
      lessonsLearned,
      futureImprovements,
      results,
      stack,
      ...(liveUrl ? { liveUrl } : {}),
      ...(githubUrl ? { githubUrl } : {}),
      coverImage,
      screenshotPending: false,
      gallery: [coverImage],
    },
    {
      slug,
      title: titleAr,
      tagline: taglineAr,
      role: roleAr,
      duration: durationAr,
      overview: overviewAr,
      problem: problemAr,
      solution: solutionAr,
      architecture: architectureAr,
      features: featuresAr,
      challenges: challengesAr,
      lessonsLearned: lessonsLearnedAr,
      futureImprovements: futureImprovementsAr,
      results: resultsAr,
      coverImage,
      screenshotPending: false,
      gallery: [coverImage],
    },
  );
}

const items = [
  {
    slug: "flux-kiddo",
    title: "Flux Kiddo",
    titleAr: "فلاكس كيدو",
    tagline: "Kids-focused Fluxstore storefront customized for a family retail catalog.",
    taglineAr: "واجهة Fluxstore موجّهة للأطفال ومخصَّصة لكتالوج تجزئة عائلي.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    year: "2026",
    kicker: "FLUTTER · COMMERCE",
    color: "0x14532d",
    githubUrl: "https://github.com/ammarshamea/flux-kiddo",
    overview:
      "Flux Kiddo is a client storefront built on Fluxstore Multi Vendor and tailored for a kids/family catalog — navigation, merchandising, and theme work rather than a from-scratch commerce engine.",
    overviewAr:
      "فلاكس كيدو واجهة متجر للعميل مبنية على Fluxstore Multi Vendor ومُعدَّة لكتالوج أطفال/عائلي — تخصيص التنقل والعرض والهوية البصرية لا بناء محرّك تجارة من الصفر.",
    problem:
      "The merchant needed a mobile shop that felt like a kids brand, not a generic Fluxstore demo, without paying for a full custom commerce stack.",
    problemAr:
      "التاجر احتاج متجرًا جوّالًا يبدو كعلامة أطفال لا كعرض Fluxstore عام، دون تكلفة منصة تجارة مخصّصة كاملة.",
    solution:
      "I forked and customized Fluxstore: kids-oriented information architecture, catalog presentation, and vendor/admin flows the merchant actually uses.",
    solutionAr:
      "فرّعت Fluxstore وخصّصته: بنية معلومات مناسبة للأطفال، عرض الكتالوج، ومسارات البائع/الإدارة التي يستخدمها التاجر فعلًا.",
    architecture:
      "Flutter Fluxstore client talking to a WooCommerce/WordPress backend, with theme and module overrides kept in the kiddo repo so upstream updates can still be merged carefully.",
    architectureAr:
      "عميل Flutter (Fluxstore) يتحدث إلى خلفية WooCommerce/WordPress، مع تجاوزات السمة والوحدات داخل مستودع Kiddo حتى تبقى تحديثات المصدر قابلة للدمج بحذر.",
    features: [
      "Kids-oriented catalog browsing and product detail",
      "Checkout and cart flows inherited from Fluxstore, restyled",
      "Vendor/admin customizations for the merchant's catalog",
    ],
    featuresAr: [
      "تصفح كتالوج وعرض منتج بمظهر يناسب الأطفال",
      "سلة ودفع موروثة من Fluxstore بعد إعادة التزيين",
      "تخصيصات البائع/الإدارة لكتالوج التاجر",
    ],
    challenges: [
      "Keeping merchant-specific UI without forking so hard that Fluxstore updates become impossible",
      "Explaining honestly that this is a production customization, not a greenfield commerce platform",
    ],
    challengesAr: [
      "الإبقاء على واجهة خاصة بالتاجر دون تفريع يمنع تحديثات Fluxstore",
      "توضيح أن هذا تخصيص إنتاجي وليس منصة تجارة مبنية من الصفر",
    ],
    lessonsLearned: [
      "Theme and module boundaries matter more than rewriting Fluxstore internals",
    ],
    lessonsLearnedAr: [
      "حدود السمة والوحدات أهم من إعادة كتابة داخل Fluxstore",
    ],
    futureImprovements: [
      "Documented upgrade path for the next Fluxstore release",
    ],
    futureImprovementsAr: [
      "مسار ترقية موثّق لإصدار Fluxstore التالي",
    ],
    results: [
      "Shipped a branded kids storefront the merchant can operate from the existing Fluxstore/Woo stack",
    ],
    resultsAr: [
      "واجهة أطفال بهوية التاجر يمكن تشغيلها على مكدس Fluxstore/Woo الحالي",
    ],
    stack: ["Flutter", "Dart", "WooCommerce"],
  },
  {
    slug: "flex-logistichub",
    title: "Flex LogisticHub",
    titleAr: "فليكس لوجستك هب",
    tagline: "Fluxstore customization for a logistics-oriented catalog and vendor workflow.",
    taglineAr: "تخصيص Fluxstore لكتالوج لوجستي ومسار بائعين.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "5 weeks",
    durationAr: "5 أسابيع",
    year: "2026",
    kicker: "FLUTTER · LOGISTICS",
    color: "0x1e3a5f",
    githubUrl: "https://github.com/ammarshamea/flex-logistichub",
    overview:
      "Flex LogisticHub adapts Fluxstore Multi Vendor for a logistics/wholesale catalog — product grouping, vendor tools, and copy that match freight-style SKUs instead of fashion merchandising.",
    overviewAr:
      "فليكس لوجستك هب يكيّف Fluxstore Multi Vendor لكتالوج لوجستي/جملة — تجميع المنتجات وأدوات البائع ونصوص تناسب وحدات الشحن لا عرض الأزياء.",
    problem:
      "A generic multi-vendor shop UI buried the fields logistics operators actually care about.",
    problemAr:
      "واجهة المتجر متعدد البائعين العامة أخفت الحقول التي يهتم بها عاملو اللوجستيات.",
    solution:
      "Customize Fluxstore navigation, product cards, and vendor admin so catalog and order ops match a logistics hub, not a lifestyle boutique.",
    solutionAr:
      "تخصيص تنقل Fluxstore وبطاقات المنتج وإدارة البائع لتتوافق العمليات مع مركز لوجستي لا مع بوتيك.",
    architecture:
      "Same Fluxstore Flutter + WooCommerce pattern as the other Flex/Flux client apps, isolated in its own repo so brand rules stay separate.",
    architectureAr:
      "نفس نمط Flutter Fluxstore + WooCommerce لبقية تطبيقات Flex/Flux، في مستودع مستقل حتى تبقى قواعد العلامة منفصلة.",
    features: [
      "Logistics-oriented catalog presentation",
      "Vendor tools carried from Fluxstore and trimmed to the hub's flow",
      "Shared checkout backbone with client-specific theming",
    ],
    featuresAr: [
      "عرض كتالوج بطابع لوجستي",
      "أدوات بائع من Fluxstore مشذّبة لمسار المركز",
      "عمود دفع مشترك مع ثيم خاص بالعميل",
    ],
    challenges: [
      "Reskinning a fashion-first template into something operators will trust",
    ],
    challengesAr: [
      "إعادة تزيين قالب موجّه للموضة ليثق به المشغّلون",
    ],
    lessonsLearned: [
      "Information architecture changes beat color-only reskins for B2B catalogs",
    ],
    lessonsLearnedAr: [
      "تغيير بنية المعلومات أهم من تغيير الألوان فقط في كتالوجات الأعمال",
    ],
    futureImprovements: [
      "Deeper shipping-rate surfaces if the merchant's Woo plugins expose them cleanly",
    ],
    futureImprovementsAr: [
      "واجهات أسعار شحن أعمق إن كشفت إضافات Woo عنها بوضوح",
    ],
    results: [
      "A dedicated logistics storefront repo the client can keep evolving",
    ],
    resultsAr: [
      "مستودع واجهة لوجستية يمكن للعميل تطويره باستمرار",
    ],
    stack: ["Flutter", "Dart", "WooCommerce"],
  },
  {
    slug: "flex-sheone",
    title: "Flex Sheone",
    titleAr: "فليكس شيون",
    tagline: "Fashion Fluxstore build for the Sheone catalog — theme, merchandising, and vendor admin.",
    taglineAr: "بناء Fluxstore للأزياء لكتالوج شيون — السمة والعرض وإدارة البائعين.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "5 weeks",
    durationAr: "5 أسابيع",
    year: "2026",
    kicker: "FLUTTER · FASHION",
    color: "0x4a1942",
    githubUrl: "https://github.com/ammarshamea/flex-sheone",
    overview:
      "Flex Sheone is the Sheone fashion storefront on Fluxstore Multi Vendor: look-and-feel, catalog hierarchy, and the vendor-side pieces the brand needed in production.",
    overviewAr:
      "فليكس شيون واجهة أزياء شيون على Fluxstore Multi Vendor: الشكل والتسلسل الكتالوجي وأجزاء البائع التي احتاجتها العلامة في الإنتاج.",
    problem:
      "The brand's Woo catalog existed; the default Fluxstore theme did not look like Sheone.",
    problemAr:
      "كتالوج Woo للعلامة كان موجودًا؛ سمة Fluxstore الافتراضية لم تشبه شيون.",
    solution:
      "A dedicated Fluxstore fork with Sheone theming, category structure, and vendor admin customizations.",
    solutionAr:
      "تفريع Fluxstore مخصّص بسمة شيون وبنية تصنيفات وتخصيصات إدارة البائع.",
    architecture:
      "Flutter Fluxstore client with brand assets and module overrides; commerce data stays on the WooCommerce API.",
    architectureAr:
      "عميل Flutter Fluxstore مع أصول العلامة وتجاوزات الوحدات؛ بيانات التجارة تبقى على واجهة WooCommerce.",
    features: [
      "Sheone-branded home and product surfaces",
      "Fashion-oriented category browsing",
      "Vendor admin customizations for the brand team",
    ],
    featuresAr: [
      "واجهات رئيسية ومنتج بهوية شيون",
      "تصفح تصنيفات يناسب الأزياء",
      "تخصيصات إدارة البائع لفريق العلامة",
    ],
    challenges: [
      "Matching a fashion brand's visual density without breaking Fluxstore's checkout",
    ],
    challengesAr: [
      "مطابقة كثافة هوية الأزياء دون كسر دفع Fluxstore",
    ],
    lessonsLearned: [
      "Keep checkout stock; spend the design budget on catalog and brand moments",
    ],
    lessonsLearnedAr: [
      "أبقِ الدفع قياسيًا؛ أنفق ميزانية التصميم على الكتالوج ولحظات العلامة",
    ],
    futureImprovements: [
      "Lookbook-style landing modules if the catalog grows seasonal drops",
    ],
    futureImprovementsAr: [
      "وحدات هبوط بأسلوب lookbook إذا نمت الإسقاطات الموسمية",
    ],
    results: [
      "Production Sheone mobile storefront separated from the other Flex client repos",
    ],
    resultsAr: [
      "واجهة شيون للإنتاج منفصلة عن بقية مستودعات Flex",
    ],
    stack: ["Flutter", "Dart", "WooCommerce"],
  },
  {
    slug: "nawa-real-estate",
    title: "NAWA Real Estate",
    titleAr: "نوا العقارية",
    tagline: "Next.js listing site for NAWA's real-estate inventory, distinct from the holding-company brochure.",
    taglineAr: "موقع إعلانات Next.js لمخزون نوا العقاري، منفصل عن موقع الشركة القابضة.",
    category: "web",
    role: "Frontend Developer",
    roleAr: "مطوّر واجهات",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    year: "2026",
    kicker: "NEXT.JS · PROPERTY",
    color: "0x1c1917",
    githubUrl: "https://github.com/ammarshamea/nawarealestate",
    overview:
      "NAWA Real Estate is the property-listing sibling of the NAWA Holding site: filters, property cards, and a catalog structure instead of a corporate story.",
    overviewAr:
      "نوا العقارية الشقيق العقاري لموقع نوا القابضة: فلاتر وبطاقات عقارات وبنية كتالوج بدل القصة المؤسسية.",
    problem:
      "The holding-company site could not carry a searchable inventory without turning into a cluttered brochure.",
    problemAr:
      "موقع الشركة القابضة لا يحتمل مخزونًا قابلًا للبحث دون أن يتحول إلى كتيّب مزدحم.",
    solution:
      "A dedicated Next.js app for listings so the holding site stays institutional and this one stays operational.",
    solutionAr:
      "تطبيق Next.js مخصّص للإعلانات حتى يبقى موقع القابضة مؤسسيًا وهذا تشغيليًا.",
    architecture:
      "Next.js App Router front-end with structured listing data and card/filter UI. Kept in its own repo from nawa-holding and nawa_production.",
    architectureAr:
      "واجهة Next.js App Router مع بيانات إعلانات منظّمة وواجهة بطاقات/فلاتر. مستودع مستقل عن nawa-holding وnawa_production.",
    features: [
      "Property cards with key facts",
      "Filterable listing index",
      "Brand-aligned layout shared conceptually with the holding site",
    ],
    featuresAr: [
      "بطاقات عقارات بالحقائق الأساسية",
      "فهرس إعلانات قابل للفلترة",
      "تخطيط متوافق مع هوية موقع القابضة",
    ],
    challenges: [
      "Deciding what belongs on the holding site versus the inventory app",
    ],
    challengesAr: [
      "تقرير ما يخص موقع القابضة مقابل تطبيق المخزون",
    ],
    lessonsLearned: [
      "Two focused sites beat one page that tries to sell the company and every unit at once",
    ],
    lessonsLearnedAr: [
      "موقعان مركّزان أفضل من صفحة تحاول بيع الشركة وكل وحدة معًا",
    ],
    futureImprovements: [
      "CMS-backed listing ingest so agents can update inventory without a deploy",
    ],
    futureImprovementsAr: [
      "إدخال إعلانات عبر CMS حتى يحدّث الوكلاء المخزون دون نشر",
    ],
    results: [
      "A dedicated listings surface next to the live NAWA production site",
    ],
    resultsAr: [
      "واجهة إعلانات مستقلة بجانب موقع نوا الإنتاجي",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "censuspro",
    title: "CensusPro",
    titleAr: "سينسس برو",
    tagline: "Census operations stack: JavaScript front-end, Laravel API, and a Python processing lane.",
    taglineAr: "مكدس عمليات إحصاء: واجهة JavaScript وواجهة Laravel ومسار معالجة بايثون.",
    category: "web",
    role: "Full Stack Developer",
    roleAr: "مطوّر متكامل",
    duration: "8 weeks",
    durationAr: "8 أسابيع",
    year: "2026",
    kicker: "FULL STACK · DATA",
    color: "0x134e4a",
    githubUrl: "https://github.com/ammarshamea/censuspro-frontend",
    overview:
      "CensusPro splits a census-style workflow across three public repos: a JavaScript front-end, a Laravel API, and a Python service for heavier processing — one product, three deployable pieces.",
    overviewAr:
      "سينسس برو يقسم مسار عمل إحصائيًا على ثلاثة مستودعات عامة: واجهة JavaScript وواجهة Laravel وخدمة بايثون للمعالجة الأثقل — منتج واحد وثلاثة أجزاء قابلة للنشر.",
    problem:
      "Field/census data collection needed a browser UI, a boring reliable API, and a place to run Python jobs without stuffing everything into one repo.",
    problemAr:
      "جمع بيانات ميدانية/إحصائية احتاج واجهة متصفح وواجهة برمجية موثوقة ومكانًا لمهام بايثون دون حشر كل شيء في مستودع واحد.",
    solution:
      "censuspro-frontend for operators, censuspro-backend (Laravel/PHP) for records and auth, censuspro-python for batch/analysis work.",
    solutionAr:
      "censuspro-frontend للمشغّلين، وcensuspro-backend (Laravel/PHP) للسجلات والمصادقة، وcensuspro-python للدفعات/التحليل.",
    architecture:
      "Browser client → Laravel REST API → MySQL (typical Laravel stack) with a sibling Python repo for jobs that do not belong in PHP request time.",
    architectureAr:
      "عميل متصفح → واجهة Laravel REST → MySQL مع مستودع بايثون شقيق للمهام التي لا تنتمي لزمن طلب PHP.",
    features: [
      "Operator-facing census UI",
      "Laravel API for records and access control",
      "Python companion for processing pipelines",
    ],
    featuresAr: [
      "واجهة إحصاء للمشغّلين",
      "واجهة Laravel للسجلات والتحكم بالوصول",
      "رفيق بايثون لخطوط المعالجة",
    ],
    challenges: [
      "Keeping three repos in contract with each other without a monorepo",
    ],
    challengesAr: [
      "إبقاء ثلاثة مستودعات متوافقة دون مونوريبو",
    ],
    lessonsLearned: [
      "Language boundaries are fine if the API contract is the only shared surface",
    ],
    lessonsLearnedAr: [
      "حدود اللغات مقبولة إذا كانت عقد الواجهة هو السطح المشترك الوحيد",
    ],
    futureImprovements: [
      "Shared OpenAPI spec checked in both the Laravel and front-end repos",
    ],
    futureImprovementsAr: [
      "مواصفة OpenAPI مشتركة في مستودعي Laravel والواجهة",
    ],
    results: [
      "Public, inspectable three-repo census stack instead of a private monolith",
    ],
    resultsAr: [
      "مكدس إحصاء بثلاثة مستودعات عامة بدل كتلة خاصة واحدة",
    ],
    stack: ["JavaScript", "Laravel", "PHP", "Python"],
  },
  {
    slug: "hrsystem",
    title: "HR System",
    titleAr: "نظام الموارد البشرية",
    tagline: "Early Flutter HR client — employee records and internal workflows, kept public as a learning-to-product artifact.",
    taglineAr: "عميل موارد بشرية مبكر بـ Flutter — سجلات موظفين ومسارات داخلية، بقي عامًا كأثر تعلّم إلى منتج.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    year: "2025",
    kicker: "FLUTTER · HR",
    color: "0x3f3f46",
    githubUrl: "https://github.com/ammarshamea/hrsystem",
    overview:
      "HR System is an early Flutter application for internal people-ops screens. The public repo is still the default Flutter starter in places — the value is the domain shape, not polished product marketing.",
    overviewAr:
      "نظام الموارد البشرية تطبيق Flutter مبكر لشاشات عمليات الأفراد. المستودع العام ما زال في مواضع قالب Flutter الافتراضي — القيمة في شكل المجال لا في تسويق منتج مصقول.",
    problem:
      "I needed a non-commerce Flutter project to practice forms, lists, and role-specific screens around employees rather than products.",
    problemAr:
      "احتجت مشروع Flutter خارج التجارة لأتمرّن على النماذج والقوائم والشاشات حسب الدور حول الموظفين لا المنتجات.",
    solution:
      "A Flutter HR shell covering employee-oriented navigation and records. Honest about its starter roots.",
    solutionAr:
      "هيكل Flutter للموارد البشرية يغطي تنقلًا وسجلات موجّهة للموظفين، مع صدق حول جذوره كقالب.",
    architecture:
      "Standard Flutter app structure (screens, widgets, default project layout) aimed at HR entities instead of a store.",
    architectureAr:
      "بنية تطبيق Flutter قياسية (شاشات، ودجات، تخطيط المشروع الافتراضي) موجّهة لكيانات الموارد البشرية لا لمتجر.",
    features: [
      "Employee-oriented screen structure",
      "Form-heavy internal UI practice",
    ],
    featuresAr: [
      "بنية شاشات موجّهة للموظفين",
      "تمرين واجهة داخلية كثيفة النماذج",
    ],
    challenges: [
      "Not overselling a learning repo as a finished HRIS",
    ],
    challengesAr: [
      "عدم المبالغة في تقديم مستودع تعلّم كنظام موارد بشرية مكتمل",
    ],
    lessonsLearned: [
      "Domain models (employee vs product) change the UI more than the framework does",
    ],
    lessonsLearnedAr: [
      "نماذج المجال (موظف مقابل منتج) تغيّر الواجهة أكثر مما يفعله الإطار",
    ],
    futureImprovements: [
      "Replace leftover starter copy with a real design system if this is ever reused",
    ],
    futureImprovementsAr: [
      "استبدال نصوص القالب بنظام تصميم حقيقي إن أُعيد استخدامه",
    ],
    results: [
      "Public Flutter HR experiment that sits beside later production apps",
    ],
    resultsAr: [
      "تجربة Flutter عامة للموارد البشرية بجانب تطبيقات الإنتاج اللاحقة",
    ],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "cardbot",
    title: "Cardbot",
    titleAr: "كاردبوت",
    tagline: "Telegram bot for digital gift-card sales — catalog, wallet, orders, and an admin panel.",
    taglineAr: "بوت تيليجرام لبيع بطاقات الهدايا الرقمية — كتالوج ومحفظة وطلبات ولوحة إدارة.",
    category: "automation",
    role: "Backend Developer",
    roleAr: "مطوّر خلفية",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    year: "2025",
    kicker: "PYTHON · TELEGRAM",
    color: "0x1d4ed8",
    githubUrl: "https://github.com/ammarshamea/cardbot",
    overview:
      "Cardbot (StyleCard) is a production-shaped Telegram commerce bot: bilingual catalog, balances, code delivery, referrals, and a multi-level admin. PostgreSQL plus optional Redis.",
    overviewAr:
      "كاردبوت (StyleCard) بوت تجارة تيليجرام بشكل إنتاجي: كتالوج ثنائي اللغة، أرصدة، تسليم أكواد، إحالات، وإدارة متعددة المستويات. PostgreSQL مع Redis اختياري.",
    problem:
      "Selling digital codes over Telegram without a structured catalog, wallet, and admin meant chaos in chats and spreadsheets.",
    problemAr:
      "بيع الأكواد الرقمية عبر تيليجرام بلا كتالوج ومحفظة وإدارة منظّمة يعني فوضى في الدردشات والجداول.",
    solution:
      "A Python bot with typed handlers, a SQL schema for users/products/codes/orders, and admin commands for stock and broadcasts.",
    solutionAr:
      "بوت بايثون بمعالجات مكتوبة ومخطط SQL للمستخدمين والمنتجات والأكواد والطلبات، وأوامر إدارة للمخزون والإذاعة.",
    architecture:
      "main.py entry, handler modules, PostgreSQL schema in db/init.sql, Redis-optional cache, rate limiting and parameterized queries.",
    architectureAr:
      "مدخل main.py، وحدات معالجات، مخطط PostgreSQL في db/init.sql، تخزين Redis اختياري، حد للمعدل واستعلامات مُعلَّمة.",
    features: [
      "EN/AR user flows with inline keyboards",
      "Balance, purchase, and order history",
      "Admin product/code/user management and broadcasts",
    ],
    featuresAr: [
      "مسارات مستخدم إنجليزي/عربي بلوحات مضمنة",
      "رصيد وشراء وسجل طلبات",
      "إدارة منتجات/أكواد/مستخدمين وإذاعات للمشرف",
    ],
    challenges: [
      "Safe digital-code inventory so a code cannot be sold twice",
      "Admin sessions that span multiple Telegram messages",
    ],
    challengesAr: [
      "مخزون أكواد آمن حتى لا يُباع الرمز مرتين",
      "جلسات مشرف تمتد على عدة رسائل تيليجرام",
    ],
    lessonsLearned: [
      "A real schema beats stuffing catalog state into chat memory",
    ],
    lessonsLearnedAr: [
      "مخطط حقيقي أفضل من حشو حالة الكتالوج في ذاكرة الدردشة",
    ],
    futureImprovements: [
      "Payment-provider webhooks if a live merchant asks for them",
    ],
    futureImprovementsAr: [
      "ويب هوك لبوابات الدفع إن طلبها تاجر حي",
    ],
    results: [
      "A documented, deployable gift-card bot with admin and user sides",
    ],
    resultsAr: [
      "بوت بطاقات هدايا موثّق وقابل للنشر بجانبي إدارة ومستخدم",
    ],
    stack: ["Python", "PostgreSQL", "Redis"],
  },
  {
    slug: "bmm",
    title: "BMM",
    titleAr: "بي إم إم",
    tagline: "Static HTML site for a BMM brief — public, small, and honest about its scope.",
    taglineAr: "موقع HTML ثابت لواجب BMM — عام وصغير وصادق في نطاقه.",
    category: "web",
    role: "Frontend Developer",
    roleAr: "مطوّر واجهات",
    duration: "1 week",
    durationAr: "أسبوع واحد",
    year: "2025",
    kicker: "HTML · WEB",
    color: "0x44403c",
    githubUrl: "https://github.com/ammarshamea/BMM",
    overview:
      "BMM is a small public HTML site (with a related BMM_HW homework repo). It is a web-fundamentals artifact, not a product platform.",
    overviewAr:
      "بي إم إم موقع HTML عام صغير (مع مستودع واجب BMM_HW). أثر لأساسيات الويب لا منصة منتج.",
    problem:
      "Needed a shareable static page for a course/homework brief without a JS framework.",
    problemAr:
      "الحاجة لصفحة ثابتة قابلة للمشاركة لواجب بلا إطار جافاسكربت.",
    solution:
      "Hand-authored HTML/CSS in a public repo, plus the homework companion.",
    solutionAr:
      "HTML/CSS مكتوب يدويًا في مستودع عام مع رفيق الواجب.",
    architecture:
      "Static HTML documents. No build step.",
    architectureAr:
      "وثائق HTML ثابتة. بلا خطوة بناء.",
    features: ["Static semantic markup", "Simple multi-page homework structure"],
    featuresAr: ["ترميز دلالي ثابت", "بنية واجب متعددة الصفحات بسيطة"],
    challenges: ["Keeping the portfolio listing honest about scale"],
    challengesAr: ["الإبقاء على قائمة الأعمال صادقة بشأن الحجم"],
    lessonsLearned: ["Not every public repo needs a twelve-section case study"],
    lessonsLearnedAr: ["ليس كل مستودع عام يحتاج دراسة حالة من اثني عشر قسمًا"],
    futureImprovements: ["Leave it as a fundamentals snapshot"],
    futureImprovementsAr: ["إبقاؤه لقطة لأساسيات الويب"],
    results: ["Public static site still available on GitHub"],
    resultsAr: ["موقع ثابت عام ما زال على GitHub"],
    stack: ["HTML", "CSS"],
  },
  {
    slug: "ather-app",
    title: "Ather",
    titleAr: "أثير",
    tagline: "Flutter client on Codeberg — a product-shaped mobile app kept outside GitHub.",
    taglineAr: "عميل Flutter على Codeberg — تطبيق جوّال بشكل منتج خارج GitHub.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "2 months",
    durationAr: "شهران",
    year: "2026",
    kicker: "FLUTTER · CODEBERG",
    color: "0x365314",
    githubUrl: "https://codeberg.org/ammarshamea123/ather_app",
    overview:
      "Ather is a Dart/Flutter app published on Codeberg. It sits with Safar and Mahdi as product clients I keep in the public Codeberg account.",
    overviewAr:
      "أثير تطبيق Dart/Flutter منشور على Codeberg. يجلس مع سفار ومهدي كعملاء منتج أحتفظ بها في حساب Codeberg العام.",
    problem:
      "Needed a public home for a Flutter product client that was not going on GitHub.",
    problemAr:
      "الحاجة لموطن عام لعميل Flutter منتج لن يُرفع على GitHub.",
    solution:
      "Ship the Flutter app on Codeberg under ammarshamea123 and treat it as a first-class portfolio entry.",
    solutionAr:
      "نشر تطبيق Flutter على Codeberg تحت ammarshamea123 ومعاملته كمدخل أعمال أساسي.",
    architecture:
      "Flutter/Dart mobile client. Source of truth is the Codeberg repository.",
    architectureAr:
      "عميل جوّال Flutter/Dart. مصدر الحقيقة هو مستودع Codeberg.",
    features: [
      "Flutter product client structure",
      "Public source on Codeberg",
    ],
    featuresAr: [
      "بنية عميل منتج Flutter",
      "مصدر عام على Codeberg",
    ],
    challenges: [
      "Keeping Codeberg and GitHub stories aligned without duplicating every repo",
    ],
    challengesAr: [
      "مواءمة قصتي Codeberg وGitHub دون تكرار كل مستودع",
    ],
    lessonsLearned: [
      "A second forge is useful if you actually publish finished clients there",
    ],
    lessonsLearnedAr: [
      "منصة ثانية مفيدة إن نشرت عليها عملاء مكتملين فعلًا",
    ],
    futureImprovements: [
      "README with screenshots in the Codeberg repo",
    ],
    futureImprovementsAr: [
      "ملف README بلقطات في مستودع Codeberg",
    ],
    results: [
      "Public Flutter product client available at codeberg.org/ammarshamea123/ather_app",
    ],
    resultsAr: [
      "عميل Flutter عام على codeberg.org/ammarshamea123/ather_app",
    ],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "fluxstore",
    title: "FluxStore",
    titleAr: "فلاكس ستور",
    tagline: "Base Fluxstore Multi Vendor checkout plus the manager-fluxstore vendor-admin customizations.",
    taglineAr: "أساس Fluxstore Multi Vendor مع تخصيصات manager-fluxstore لإدارة البائعين.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "2 months",
    durationAr: "شهران",
    year: "2026",
    kicker: "FLUTTER · COMMERCE BASE",
    color: "0x166534",
    githubUrl: "https://codeberg.org/ammarshamea123/FluxStore",
    overview:
      "FluxStore on Codeberg is the shared Multi Vendor baseline I customize for Kiddo, LogisticHub, and Sheone. The GitHub manager-fluxstore repo holds vendor-admin work on top of that line.",
    overviewAr:
      "فلاكس ستور على Codeberg هو الأساس المشترك لـ Multi Vendor الذي أخصّصه لكيدو ولوجستك هب وشيون. مستودع manager-fluxstore على GitHub يحمل عمل إدارة البائعين فوق ذلك الخط.",
    problem:
      "Three client brands needed the same commerce engine without three unrelated forks of checkout.",
    problemAr:
      "ثلاث علامات احتاجت نفس محرّك التجارة دون ثلاثة تفريعات غير مرتبطة للدفع.",
    solution:
      "Keep a baseline FluxStore tree, then layer brand repos and a manager customization.",
    solutionAr:
      "الإبقاء على شجرة FluxStore أساسًا ثم طبقات مستودعات العلامة وتخصيص المدير.",
    architecture:
      "Fluxstore Flutter commerce client + optional manager app. Brand repos (flux-kiddo, flex-*) overlay theme and IA.",
    architectureAr:
      "عميل تجارة Flutter Fluxstore + تطبيق مدير اختياري. مستودعات العلامة (flux-kiddo وflex-*) تغطي السمة وبنية المعلومات.",
    features: [
      "Shared multi-vendor checkout baseline",
      "Vendor manager customizations",
      "Brand overlays in sibling repos",
    ],
    featuresAr: [
      "أساس دفع متعدد البائعين مشترك",
      "تخصيصات مدير البائع",
      "طبقات علامة في مستودعات شقيقة",
    ],
    challenges: [
      "Not letting brand forks diverge past the point of merging Fluxstore updates",
    ],
    challengesAr: [
      "منع تفريعات العلامة من الابتعاد عن إمكانية دمج تحديثات Fluxstore",
    ],
    lessonsLearned: [
      "A named baseline repo makes client forks explainable",
    ],
    lessonsLearnedAr: [
      "مستودع أساس مسمّى يجعل تفريعات العملاء قابلة للتفسير",
    ],
    futureImprovements: [
      "A short upgrade checklist shared across Kiddo / LogisticHub / Sheone",
    ],
    futureImprovementsAr: [
      "قائمة ترقية قصيرة مشتركة بين كيدو ولوجستك هب وشيون",
    ],
    results: [
      "One baseline plus three brand storefronts instead of undocumented copies",
    ],
    resultsAr: [
      "أساس واحد وثلاث واجهات علامة بدل نسخ غير موثّقة",
    ],
    stack: ["Flutter", "Dart", "WooCommerce"],
  },
  {
    slug: "ehasan",
    title: "Ehasan",
    titleAr: "إحسان",
    tagline: "Flutter app on Codeberg for a charitable / community product client.",
    taglineAr: "تطبيق Flutter على Codeberg لعميل منتج خيري/مجتمعي.",
    category: "mobile",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "6 weeks",
    durationAr: "6 أسابيع",
    year: "2025",
    kicker: "FLUTTER · COMMUNITY",
    color: "0x365314",
    githubUrl: "https://codeberg.org/ammarshamea123/ehasan",
    overview:
      "Ehasan is a Flutter product client published on Codeberg in late 2025. Named for ihsan / charitable work; the public tree is the Dart app itself.",
    overviewAr:
      "إحسان عميل منتج Flutter نُشر على Codeberg أواخر 2025. الاسم من الإحسان/العمل الخيري؛ الشجرة العامة هي تطبيق Dart نفسه.",
    problem:
      "A community/charity-shaped mobile client needed a public repository that was not mixed into GitHub client work.",
    problemAr:
      "عميل جوّال بطابع مجتمعي/خيري احتاج مستودعًا عامًا غير مخلوط بعمل عملاء GitHub.",
    solution:
      "Publish the Flutter app on Codeberg and list it as its own case study.",
    solutionAr:
      "نشر تطبيق Flutter على Codeberg وإدراجه كدراسة حالة مستقلة.",
    architecture:
      "Flutter/Dart application. Details live in the Codeberg tree.",
    architectureAr:
      "تطبيق Flutter/Dart. التفاصيل في شجرة Codeberg.",
    features: ["Flutter product client", "Public Codeberg source"],
    featuresAr: ["عميل منتج Flutter", "مصدر عام على Codeberg"],
    challenges: ["Sparse README — the repo is the source of truth"],
    challengesAr: ["README مقتضب — المستودع هو مصدر الحقيقة"],
    lessonsLearned: ["Name and forge location are part of how a product is found"],
    lessonsLearnedAr: ["الاسم ومكان الاستضافة جزء من كيفية إيجاد المنتج"],
    futureImprovements: ["Add a short Arabic/English README in-repo"],
    futureImprovementsAr: ["إضافة README قصير عربي/إنجليزي في المستودع"],
    results: ["Public Flutter client at codeberg.org/ammarshamea123/ehasan"],
    resultsAr: ["عميل Flutter عام على codeberg.org/ammarshamea123/ehasan"],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "notely",
    title: "Notely",
    titleAr: "نوتلي",
    tagline: "Android notes app (Java) — the product face of a larger organizer-app series.",
    taglineAr: "تطبيق ملاحظات أندرويد (جافا) — الوجه المنتج لسلسلة تطبيقات تنظيم.",
    category: "mobile",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "3 weeks",
    durationAr: "3 أسابيع",
    year: "2025",
    kicker: "ANDROID · NOTES",
    color: "0x713f12",
    githubUrl: "https://codeberg.org/ammarshamea123/Notely",
    overview:
      "Notely is a Java Android notes app. Related organizers (FlowNote, TaskMate, and others) are grouped as an open-source lab so this page stays a real product entry instead of ten thin clones.",
    overviewAr:
      "نوتلي تطبيق ملاحظات أندرويد بجافا. المنظِّمات الشقيقة (FlowNote وTaskMate وغيرها) مجمّعة كمختبر مفتوح المصدر حتى تبقى هذه الصفحة منتجًا حقيقيًا لا عشر نسخ رقيقة.",
    problem:
      "I needed a notes client that was more than a tutorial list, while a swarm of near-identical task apps did not each deserve a case study.",
    problemAr:
      "احتجت عميل ملاحظات أكثر من قائمة درس، بينما سرب تطبيقات مهام شبه متطابقة لا يستحق كل منها دراسة حالة.",
    solution:
      "Ship Notely as the notes product; park the rest under the Android organizer lab.",
    solutionAr:
      "إطلاق نوتلي كمنتج ملاحظات ووضع البقية تحت مختبر منظِّمات أندرويد.",
    architecture:
      "Java Android application. Sibling repos share the same era and forge.",
    architectureAr:
      "تطبيق أندرويد بجافا. المستودعات الشقيقة من الحقبة والمنصة نفسها.",
    features: ["Note-taking Android client", "Public Java source on Codeberg"],
    featuresAr: ["عميل ملاحظات أندرويد", "مصدر جافا عام على Codeberg"],
    challenges: ["Choosing one notes app to represent a family of experiments"],
    challengesAr: ["اختيار تطبيق ملاحظات واحد لتمثيل عائلة تجارب"],
    lessonsLearned: ["Portfolio density is a design problem, not a git problem"],
    lessonsLearnedAr: ["كثافة المعرض مشكلة تصميم لا مشكلة Git"],
    futureImprovements: ["Deep link the organizer-lab case study from this page"],
    futureImprovementsAr: ["ربط دراسة مختبر المنظِّمات من هذه الصفحة"],
    results: ["A single notes product plus a grouped lab instead of a wall of twins"],
    resultsAr: ["منتج ملاحظات واحد ومختبر مجمّع بدل جدار توائم"],
    stack: ["Java", "Android"],
  },
  {
    slug: "king-chess",
    title: "King Chess",
    titleAr: "كينغ تشس",
    tagline: "C# chess client — a complete game loop rather than a tutorial sprite demo.",
    taglineAr: "عميل شطرنج بـ C# — حلقة لعب مكتملة لا عرض رسوم تعليمي.",
    category: "web",
    role: "Software Engineer",
    roleAr: "مهندس برمجيات",
    duration: "3 weeks",
    durationAr: "3 أسابيع",
    year: "2025",
    kicker: "C# · GAME",
    color: "0x1c1917",
    githubUrl: "https://codeberg.org/ammarshamea123/kingChess",
    overview:
      "King Chess is a C# chess project on Codeberg. It is listed as a product because it is a full game, not a Dart utility package.",
    overviewAr:
      "كينغ تشس مشروع شطرنج بـ C# على Codeberg. يُدرج كمنتج لأنه لعبة كاملة لا حزمة أدوات Dart.",
    problem:
      "Wanted a rules-heavy desktop/game client outside the Flutter/Laravel lane.",
    problemAr:
      "الرغبة في عميل لعبة كثيف القواعد خارج مسار Flutter/Laravel.",
    solution:
      "A C# chess codebase published on Codeberg.",
    solutionAr:
      "قاعدة شطرنج بـ C# منشورة على Codeberg.",
    architecture:
      "C# game project. Rules and UI live in the kingChess repository.",
    architectureAr:
      "مشروع لعبة C#. القواعد والواجهة في مستودع kingChess.",
    features: ["Chess game loop", "Public C# source"],
    featuresAr: ["حلقة لعب شطرنج", "مصدر C# عام"],
    challenges: ["Encoding legal moves without a huge engine dependency"],
    challengesAr: ["ترميز النقلات القانونية دون اعتماد محرّك ضخم"],
    lessonsLearned: ["Rule systems are a different discipline from CRUD apps"],
    lessonsLearnedAr: ["أنظمة القواعد تخصّص مختلف عن تطبيقات CRUD"],
    futureImprovements: ["PGN export if the project is revisited"],
    futureImprovementsAr: ["تصدير PGN إن أُعيد فتح المشروع"],
    results: ["Playable chess client source on Codeberg"],
    resultsAr: ["مصدر عميل شطرنج قابل للعب على Codeberg"],
    stack: ["C#"],
  },
  {
    slug: "daleel",
    title: "Daleel",
    titleAr: "دليل",
    tagline: "TypeScript backend for a directory-style product — API first, mobile clients later.",
    taglineAr: "خلفية TypeScript لمنتج دليل — الواجهة أولًا ثم عملاء الجوّال.",
    category: "web",
    role: "Backend Developer",
    roleAr: "مطوّر خلفية",
    duration: "5 weeks",
    durationAr: "5 أسابيع",
    year: "2026",
    kicker: "TYPESCRIPT · API",
    color: "0x1e3a5f",
    githubUrl: "https://codeberg.org/ammarshamea123/daleel_backend",
    overview:
      "Daleel is the TypeScript API for a directory (daleel) product. The public Codeberg repo is the backend; clients can sit on top without copying business rules.",
    overviewAr:
      "دليل واجهة TypeScript لمنتج دليل. مستودع Codeberg العام هو الخلفية؛ يمكن للعملاء الجلوس فوقها دون نسخ قواعد العمل.",
    problem:
      "Directory apps fail when every client reimplements search, listing, and auth.",
    problemAr:
      "تطبيقات الدليل تفشل عندما يعيد كل عميل تنفيذ البحث والإدراج والمصادقة.",
    solution:
      "A dedicated TypeScript backend that owns those rules.",
    solutionAr:
      "خلفية TypeScript مخصّصة تملك تلك القواعد.",
    architecture:
      "TypeScript service on Codeberg (daleel_backend). HTTP API consumed by future or sibling clients.",
    architectureAr:
      "خدمة TypeScript على Codeberg (daleel_backend). واجهة HTTP يستهلكها عملاء لاحقون أو أشقاء.",
    features: ["Directory API surface", "TypeScript service layout"],
    featuresAr: ["سطح واجهة دليل", "تخطيط خدمة TypeScript"],
    challenges: ["Designing listings without a public front-end yet"],
    challengesAr: ["تصميم الإدراجات دون واجهة عامة بعد"],
    lessonsLearned: ["An API-only repo is still a product if something real will call it"],
    lessonsLearnedAr: ["مستودع واجهة فقط ما زال منتجًا إن كان شيء حقيقي سيستدعيه"],
    futureImprovements: ["Pair a thin Next.js or Flutter client when the directory content is ready"],
    futureImprovementsAr: ["إقران عميل Next.js أو Flutter رقيق عندما يصبح محتوى الدليل جاهزًا"],
    results: ["Public TypeScript backend for the Daleel directory line"],
    resultsAr: ["خلفية TypeScript عامة لخط دليل"],
    stack: ["TypeScript"],
  },
  {
    slug: "listarf",
    title: "Listarf",
    titleAr: "ليستارف",
    tagline: "Java Android listing client — classifieds-style lists, not a Dart package.",
    taglineAr: "عميل قوائم أندرويد بجافا — قوائم مبوبة لا حزمة Dart.",
    category: "mobile",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    year: "2026",
    kicker: "ANDROID · LISTINGS",
    color: "0x3f3f46",
    githubUrl: "https://codeberg.org/ammarshamea123/listarf",
    overview:
      "Listarf is a Java Android app for list/classified-style content, published on Codeberg in 2026 alongside ma9rufi and the shopping clients.",
    overviewAr:
      "ليستارف تطبيق أندرويد بجافا لمحتوى القوائم/المبوبات، نُشر على Codeberg عام 2026 إلى جانب معروفي وعملاء التسوق.",
    problem:
      "Needed an Android client whose primary object is a listing, not a task or a note.",
    problemAr:
      "الحاجة لعميل أندرويد كائنه الأساسي إعلان لا مهمة أو ملاحظة.",
    solution:
      "A dedicated Listarf app rather than stretching Notely or a to-do clone.",
    solutionAr:
      "تطبيق ليستارف مخصّص بدل تمديد نوتلي أو نسخة مهام.",
    architecture:
      "Java Android project on Codeberg.",
    architectureAr:
      "مشروع أندرويد بجافا على Codeberg.",
    features: ["Listing-oriented Android UI", "Public Java source"],
    featuresAr: ["واجهة أندرويد موجّهة للإعلانات", "مصدر جافا عام"],
    challenges: ["Keeping list UX distinct from the organizer-lab apps"],
    challengesAr: ["إبقاء تجربة القوائم مختلفة عن تطبيقات مختبر المنظِّمات"],
    lessonsLearned: ["Listings and tasks look similar in a file tree and nothing alike in use"],
    lessonsLearnedAr: ["الإعلانات والمهام تبدوان متشابهتين في الشجرة ومختلفتين تمامًا في الاستخدام"],
    futureImprovements: ["Wire to Daleel if the directory API matches"],
    futureImprovementsAr: ["الربط مع دليل إن طابقت واجهة الدليل"],
    results: ["Public Android listings client on Codeberg"],
    resultsAr: ["عميل قوائم أندرويد عام على Codeberg"],
    stack: ["Java", "Android"],
  },
  {
    slug: "ma9rufi",
    title: "Ma9rufi",
    titleAr: "معروفي",
    tagline: "Java Android client for a local-services / ma'ruf style product.",
    taglineAr: "عميل أندرويد بجافا لمنتج خدمات محلية بطابع معروف.",
    category: "mobile",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    year: "2026",
    kicker: "ANDROID · SERVICES",
    color: "0x365314",
    githubUrl: "https://codeberg.org/ammarshamea123/ma9rufi",
    overview:
      "Ma9rufi (معروفي) is a Java Android app on Codeberg aimed at local-good / services discovery — a different domain from Listarf's generic listings.",
    overviewAr:
      "معروفي تطبيق أندرويد بجافا على Codeberg لاكتشاف الخدمات/المعروف المحلي — مجال مختلف عن قوائم ليستارف العامة.",
    problem:
      "Local services need trust and categories that a generic classifieds list does not provide.",
    problemAr:
      "الخدمات المحلية تحتاج ثقة وتصنيفات لا يوفّرها قائمة مبوبات عامة.",
    solution:
      "A dedicated Android client named and structured for that domain.",
    solutionAr:
      "عميل أندرويد مسمّى ومنظَّم لهذا المجال.",
    architecture:
      "Java Android application. Published 2026-05 on Codeberg.",
    architectureAr:
      "تطبيق أندرويد بجافا. نُشر في مايو 2026 على Codeberg.",
    features: ["Services-oriented Android client", "Public source on Codeberg"],
    featuresAr: ["عميل أندرويد موجّه للخدمات", "مصدر عام على Codeberg"],
    challenges: ["Arabic product naming vs Latin repo slug (ma9rufi)"],
    challengesAr: ["تسمية المنتج بالعربية مقابل slug لاتيني (ma9rufi)"],
    lessonsLearned: ["The slug is part of the brand; 9-for-ع is a regional convention"],
    lessonsLearnedAr: ["الـ slug جزء من العلامة؛ 9 مقابل ع عرف إقليمي"],
    futureImprovements: ["Align copy with Circle/Qareeb marketplace language where it truly overlaps"],
    futureImprovementsAr: ["مواءمة النصوص مع لغة سوق سيركل/قريب حيث يتداخل المجال حقًا"],
    results: ["Public Android services client on Codeberg"],
    resultsAr: ["عميل خدمات أندرويد عام على Codeberg"],
    stack: ["Java", "Android"],
  },
  {
    slug: "homecart",
    title: "HomeCart",
    titleAr: "هوم كارت",
    tagline: "Android home-shopping client; MyBasket and MyPurchases live as sibling repos.",
    taglineAr: "عميل تسوق منزلي لأندرويد؛ ماي باسكت وماي بيرتشيس مستودعات شقيقة.",
    category: "mobile",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "5 weeks",
    durationAr: "5 أسابيع",
    year: "2026",
    kicker: "ANDROID · COMMERCE",
    color: "0x9a3412",
    githubUrl: "https://codeberg.org/ammarshamea123/HOMECART",
    overview:
      "HomeCart is the lead Android shopping client in a 2026 Codeberg cluster (HOMECART, MyBasket, MyPurchases). Those siblings are called out here instead of three near-duplicate case studies.",
    overviewAr:
      "هوم كارت عميل التسوق الأندرويد الرئيسي في مجموعة Codeberg لعام 2026 (HOMECART وMyBasket وMyPurchases). تُذكر الشقيقات هنا بدل ثلاث دراسات شبه مكررة.",
    problem:
      "Household shopping lists and carts needed a native Android client, and splitting every screen into its own 'product' would lie to visitors.",
    problemAr:
      "قوائم التسوق المنزلية احتاجت عميل أندرويد أصليًا، وتقسيم كل شاشة إلى «منتج» مستقل يكذب على الزائر.",
    solution:
      "HomeCart as the product entry; MyBasket and MyPurchases as named companion repos.",
    solutionAr:
      "هوم كارت كمدخل المنتج؛ ماي باسكت وماي بيرتشيس مستودعات رفيقة مسمّاة.",
    architecture:
      "Java Android apps on Codeberg. HomeCart is the gallery cover; the others share the same week of work.",
    architectureAr:
      "تطبيقات أندرويد بجافا على Codeberg. هوم كارت غلاف المعرض؛ البقية من أسبوع العمل نفسه.",
    features: [
      "Home shopping Android client",
      "Companion basket and purchases repos",
    ],
    featuresAr: [
      "عميل تسوق منزلي لأندرويد",
      "مستودعا سلة ومشتريات رفيقان",
    ],
    challenges: ["Deciding which repo is the product vs a screen"],
    challengesAr: ["تقرير أي مستودع هو المنتج وأيّه شاشة"],
    lessonsLearned: ["Group by user job, not by repository birthday"],
    lessonsLearnedAr: ["التجميع حسب مهمة المستخدم لا حسب تاريخ المستودع"],
    futureImprovements: ["Deep links between the three apps if they stay separate APKs"],
    futureImprovementsAr: ["روابط عميقة بين التطبيقات الثلاثة إن بقيت حزمًا منفصلة"],
    results: [
      "One shopping product with two named companion repos instead of three thin case studies",
    ],
    resultsAr: [
      "منتج تسوق واحد ومستودعين رفيقين بدل ثلاث دراسات رقيقة",
    ],
    stack: ["Java", "Android"],
  },
  {
    slug: "spendlycare",
    title: "SpendlyCare",
    titleAr: "سبندلي كير",
    tagline: "Android spending / care tracker — money and household care in one Java client.",
    taglineAr: "متتبّع إنفاق ورعاية لأندرويد — المال ورعاية المنزل في عميل جافا واحد.",
    category: "mobile",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "4 weeks",
    durationAr: "4 أسابيع",
    year: "2026",
    kicker: "ANDROID · FINANCE",
    color: "0x1e3a5f",
    githubUrl: "https://codeberg.org/ammarshamea123/SpendlyCare",
    overview:
      "SpendlyCare is a Java Android app for spending and care tracking, shipped the same week as HomeCart but aimed at money/care rather than a cart.",
    overviewAr:
      "سبندلي كير تطبيق أندرويد بجافا لتتبع الإنفاق والرعاية، أُطلق في أسبوع هوم كارت نفسه لكنه يستهدف المال/الرعاية لا السلة.",
    problem:
      "A shopping cart app is the wrong place to track recurring care costs and spend.",
    problemAr:
      "تطبيق السلة مكان خاطئ لتتبع تكاليف الرعاية والإنفاق المتكرر.",
    solution:
      "A separate SpendlyCare client with that job in the name.",
    solutionAr:
      "عميل سبندلي كير منفصل يحمل المهمة في الاسم.",
    architecture:
      "Java Android application on Codeberg.",
    architectureAr:
      "تطبيق أندرويد بجافا على Codeberg.",
    features: ["Spend/care tracking client", "Public Java source"],
    featuresAr: ["عميل تتبع إنفاق/رعاية", "مصدر جافا عام"],
    challenges: ["Not collapsing it into HomeCart just because both launched in May 2026"],
    challengesAr: ["عدم دمجه في هوم كارت لمجرد إطلاقهما في مايو 2026"],
    lessonsLearned: ["Job-to-be-done is a better grouping key than git timestamp"],
    lessonsLearnedAr: ["المهمة المطلوبة مفتاح تجميع أفضل من ختم Git"],
    futureImprovements: ["Export a simple CSV if anyone actually budgets with it"],
    futureImprovementsAr: ["تصدير CSV بسيط إن استخدمه أحد للميزانية فعلًا"],
    results: ["Public Android finance/care client on Codeberg"],
    resultsAr: ["عميل مالية/رعاية أندرويد عام على Codeberg"],
    stack: ["Java", "Android"],
  },
  {
    slug: "qareeb-packages",
    title: "Qareeb Flutter packages",
    titleAr: "حزم فلاتر لقريب",
    tagline: "Shared Dart packages from the Qareeb ecosystem: models, map helpers, drawable text, multi-type images.",
    taglineAr: "حزم Dart مشتركة من منظومة قريب: نماذج، مساعدات خرائط، نص قابل للرسم، صور متعددة الأنواع.",
    category: "package",
    listing: "open-source",
    role: "Package Author",
    roleAr: "مؤلف حزم",
    duration: "Ongoing",
    durationAr: "مستمر",
    year: "2025",
    kicker: "DART · PACKAGES",
    color: "0x0f766e",
    githubUrl: "https://github.com/ammarshamea/qareeb_models",
    overview:
      "Tiny Dart libraries extracted from Qareeb so the rider/driver apps do not each own a copy of models, map widgets, drawable text, and multi-type images. Grouped here instead of four weak case studies.",
    overviewAr:
      "مكتبات Dart صغيرة استُخرجت من قريب حتى لا يملك كل من تطبيقي الراكب/السائق نسخة من النماذج وودجات الخريطة والنص القابل للرسم والصور متعددة الأنواع. مجمّعة هنا بدل أربع دراسات ضعيفة.",
    problem:
      "Copy-pasted models and image/text widgets across Qareeb apps drifted out of sync.",
    problemAr:
      "نماذج وودجات صور/نص منسوخة عبر تطبيقات قريب انحرفت عن التزامن.",
    solution:
      "Publish qareeb_models, map_qareeb, qarreb-drawable_text, and qarreb-image-multi-type as their own repos.",
    solutionAr:
      "نشر qareeb_models وmap_qareeb وqarreb-drawable_text وqarreb-image-multi-type كمستودعات مستقلة.",
    architecture:
      "Four small Dart packages on GitHub under ammarshamea. Consumed by the Qareeb Flutter clients.",
    architectureAr:
      "أربع حزم Dart صغيرة على GitHub تحت ammarshamea. تستهلكها عملاء قريب Flutter.",
    features: [
      "qareeb_models — shared domain models",
      "map_qareeb — map helpers",
      "qarreb-drawable_text — text drawing utilities",
      "qarreb-image-multi-type — multi-type image widget",
    ],
    featuresAr: [
      "qareeb_models — نماذج مجال مشتركة",
      "map_qareeb — مساعدات خرائط",
      "qarreb-drawable_text — أدوات رسم النص",
      "qarreb-image-multi-type — ودجة صور متعددة الأنواع",
    ],
    challenges: [
      "Naming drift (qareeb vs qarreb) across early package repos",
    ],
    challengesAr: [
      "انحراف التسمية (qareeb مقابل qarreb) عبر حزم مبكرة",
    ],
    lessonsLearned: [
      "Extract packages when a second app needs the same widget, not before",
    ],
    lessonsLearnedAr: [
      "استخرج الحزم عندما يحتاج تطبيق ثانٍ نفس الودجة لا قبل ذلك",
    ],
    futureImprovements: [
      "pub.dev-style versioning and a single qareeb_* naming prefix",
    ],
    futureImprovementsAr: [
      "إصدارات بأسلوب pub.dev وبادئة qareeb_* موحّدة",
    ],
    results: [
      "Four public Dart packages instead of four padded case studies",
    ],
    resultsAr: [
      "أربع حزم Dart عامة بدل أربع دراسات محشوة",
    ],
    stack: ["Dart", "Flutter"],
  },
  {
    slug: "flutter-smart-image",
    title: "flutter_smart_image",
    titleAr: "flutter_smart_image",
    tagline: "Small Flutter/web helper for smarter image loading — kept as an open-source package, not a case study.",
    taglineAr: "مساعد Flutter/ويب صغير لتحميل صور أذكى — حزمة مفتوحة لا دراسة حالة.",
    category: "package",
    listing: "open-source",
    role: "Package Author",
    roleAr: "مؤلف حزم",
    duration: "2 weeks",
    durationAr: "أسبوعان",
    year: "2025",
    kicker: "FLUTTER · PACKAGE",
    color: "0x334155",
    githubUrl: "https://codeberg.org/ammarshamea123/flutter_smart_image",
    overview:
      "flutter_smart_image is a small helper published on Codeberg. It belongs with other Dart utilities, not next to Clyx Order.",
    overviewAr:
      "flutter_smart_image مساعد صغير على Codeberg. مكانه مع أدوات Dart لا بجانب كليكس أوردر.",
    problem:
      "Repeated image-loading glue across Flutter screens.",
    problemAr:
      "لصق متكرر لتحميل الصور عبر شاشات Flutter.",
    solution:
      "A dedicated helper repo.",
    solutionAr:
      "مستودع مساعد مخصّص.",
    architecture:
      "Small library on Codeberg (HTML/Dart mix in the tree).",
    architectureAr:
      "مكتبة صغيرة على Codeberg (خليط HTML/Dart في الشجرة).",
    features: ["Reusable image helper", "Public Codeberg source"],
    featuresAr: ["مساعد صور قابل لإعادة الاستخدام", "مصدر عام على Codeberg"],
    challenges: ["Resisting the urge to write a full case study for a helper"],
    challengesAr: ["مقاومة كتابة دراسة حالة كاملة لمساعد"],
    lessonsLearned: ["Open-source listing is the right shelf for utilities"],
    lessonsLearnedAr: ["قائمة المصدر المفتوح الرف الصحيح للأدوات"],
    futureImprovements: ["Add a one-page usage example"],
    futureImprovementsAr: ["إضافة مثال استخدام من صفحة واحدة"],
    results: ["Public helper package grouped with other Dart utilities"],
    resultsAr: ["حزمة مساعدة عامة مع بقية أدوات Dart"],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "android-organizer-lab",
    title: "Android organizer lab",
    titleAr: "مختبر منظِّمات أندرويد",
    tagline: "TaskMate, Taskora, TaskZen, Priorio, PlanFlow, MyAgenda, SmartDay, SmartDailyOrganizer, FlowNote — one shelf, not nine case studies.",
    taglineAr: "TaskMate وTaskora وTaskZen وPriorio وPlanFlow وMyAgenda وSmartDay وSmartDailyOrganizer وFlowNote — رف واحد لا تسع دراسات.",
    category: "package",
    listing: "open-source",
    role: "Android Developer",
    roleAr: "مطوّر أندرويد",
    duration: "Lab series",
    durationAr: "سلسلة مختبر",
    year: "2025",
    kicker: "ANDROID · LAB",
    color: "0x44403c",
    githubUrl: "https://codeberg.org/ammarshamea123/TaskMate",
    overview:
      "A cluster of Java Android organizer experiments published the same day on Codeberg. Grouped so the portfolio does not pretend each to-do clone is a flagship product. Notely and King Chess stay separate because they are different jobs.",
    overviewAr:
      "مجموعة تجارب منظِّمات أندرويد بجافا نُشرت في اليوم نفسه على Codeberg. مجمّعة حتى لا يدّعي المعرض أن كل نسخة مهام منتج رائد. نوتلي وكينغ تشس منفصلان لأن مهمتيهما مختلفتان.",
    problem:
      "Nine near-identical productivity apps would dilute real shipped work.",
    problemAr:
      "تسعة تطبيقات إنتاجية شبه متطابقة تُضعف العمل المُسلَّم فعلًا.",
    solution:
      "One open-source lab entry linking the family, with TaskMate as the representative URL.",
    solutionAr:
      "مدخل مختبر مفتوح واحد يربط العائلة، وTaskMate كرابط ممثل.",
    architecture:
      "Independent Java Android repos on Codeberg under ammarshamea123.",
    architectureAr:
      "مستودعات أندرويد بجافا مستقلة على Codeberg تحت ammarshamea123.",
    features: [
      "Nine public organizer experiments",
      "Honest grouping instead of inflated case studies",
    ],
    featuresAr: [
      "تسع تجارب منظِّمات عامة",
      "تجميع صادق بدل دراسات منفوخة",
    ],
    challenges: ["Naming a dozen apps in one week without a shared design system"],
    challengesAr: ["تسمية عشرة تطبيقات في أسبوع بلا نظام تصميم مشترك"],
    lessonsLearned: ["Lab pages exist so product pages can stay sharp"],
    lessonsLearnedAr: ["صفحات المختبر موجودة حتى تبقى صفحات المنتج حادة"],
    futureImprovements: ["Pick one organizer and finish it; archive the rest"],
    futureImprovementsAr: ["اختيار منظِّم واحد وإكماله وأرشفة البقية"],
    results: ["Visitors see a lab, not a fake 9-product streak"],
    resultsAr: ["الزائر يرى مختبرًا لا سلسلة تسعة منتجات زائفة"],
    stack: ["Java", "Android"],
  },
  {
    slug: "web-motion-lab",
    title: "Web motion & media lab",
    titleAr: "مختبر الحركة والوسائط",
    tagline: "VisualLearningHub, SoundSense, SmartWebMedia, MotionMaster, EduMotion — HTML experiments on one card.",
    taglineAr: "VisualLearningHub وSoundSense وSmartWebMedia وMotionMaster وEduMotion — تجارب HTML على بطاقة واحدة.",
    category: "package",
    listing: "open-source",
    role: "Frontend Developer",
    roleAr: "مطوّر واجهات",
    duration: "Lab series",
    durationAr: "سلسلة مختبر",
    year: "2025",
    kicker: "HTML · LAB",
    color: "0x4c1d95",
    githubUrl: "https://codeberg.org/ammarshamea123/VisualLearningHub",
    overview:
      "Five HTML experiments from the same Codeberg day: visual learning, sound, media, motion, and education motion. Grouped as a lab so they do not crowd the shipped Flutter/Laravel work.",
    overviewAr:
      "خمس تجارب HTML من يوم Codeberg نفسه: تعلّم بصري وصوت ووسائط وحركة وتعليم حركي. مجمّعة كمختبر حتى لا تزاحم عمل Flutter/Laravel المُسلَّم.",
    problem:
      "HTML studies are real practice and a bad fit for flagship case studies.",
    problemAr:
      "دراسات HTML تمرين حقيقي وملاءمة سيئة لدراسات الحالة الرائدة.",
    solution:
      "One open-source card with VisualLearningHub as the door.",
    solutionAr:
      "بطاقة مصدر مفتوح واحدة ومدخلها VisualLearningHub.",
    architecture:
      "Static HTML repos on Codeberg.",
    architectureAr:
      "مستودعات HTML ثابتة على Codeberg.",
    features: ["Five public HTML experiments", "Single portfolio shelf"],
    featuresAr: ["خمس تجارب HTML عامة", "رف معرض واحد"],
    challenges: ["Titles that sound like products but are studies"],
    challengesAr: ["عناوين تبدو كمنتجات وهي دراسات"],
    lessonsLearned: ["Naming is not a shipping certificate"],
    lessonsLearnedAr: ["التسمية ليست شهادة إطلاق"],
    futureImprovements: ["Pick one experiment to promote if it ever ships"],
    futureImprovementsAr: ["اختيار تجربة واحدة للترقية إن أُطلقت يومًا"],
    results: ["Lab shelf instead of five empty galleries"],
    resultsAr: ["رف مختبر بدل خمس معارض فارغة"],
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "flutter-ui-studies",
    title: "Flutter UI studies",
    titleAr: "دراسات واجهات فلاتر",
    tagline: "Starbucks clone, Marvel UI, and Auctions — early Flutter screens kept public on purpose.",
    taglineAr: "استنساخ ستاربكس وواجهة مارفل والمزادات — شاشات Flutter مبكرة بقيت عامة عمدًا.",
    category: "package",
    listing: "open-source",
    role: "Flutter Developer",
    roleAr: "مطوّر Flutter",
    duration: "Studies",
    durationAr: "دراسات",
    year: "2025",
    kicker: "FLUTTER · STUDIES",
    color: "0x1c1917",
    githubUrl: "https://github.com/ammarshamea/starbucks",
    overview:
      "The Starbucks UI clone (still mentioned in fun facts), plus marvel and Auctions. Learning screens, not client products — grouped so they stay visible without pretending they are Clyx.",
    overviewAr:
      "استنساخ واجهة ستاربكس (ما زال في الحقائق الطريفة) مع marvel وAuctions. شاشات تعلّم لا منتجات عملاء — مجمّعة لتبقى مرئية دون التظاهر بأنها كليكس.",
    problem:
      "Early clones are embarrassing to hide and dishonest to feature as case studies.",
    problemAr:
      "الاستنساخات المبكرة محرجة للإخفاء وغير صادقة كدراسات حالة بارزة.",
    solution:
      "One open-source studies card with three public GitHub repos.",
    solutionAr:
      "بطاقة دراسات مفتوحة بثلاثة مستودعات GitHub عامة.",
    architecture:
      "Independent Flutter apps: starbucks, marvel, Auctions.",
    architectureAr:
      "تطبيقات Flutter مستقلة: starbucks وmarvel وAuctions.",
    features: [
      "starbucks — first serious Flutter UI",
      "marvel — catalog-style UI study",
      "Auctions — bidding UI study",
    ],
    featuresAr: [
      "starbucks — أول واجهة Flutter جدية",
      "marvel — دراسة واجهة كتالوج",
      "Auctions — دراسة واجهة مزايدة",
    ],
    challenges: ["Leaving warts public"],
    challengesAr: ["ترك العيوب عامة"],
    lessonsLearned: ["The first clone is part of the resume if you say what it is"],
    lessonsLearnedAr: ["الاستنساخ الأول جزء من السيرة إن قلت ما هو"],
    futureImprovements: ["Do not rewrite them; date-stamp and leave them"],
    futureImprovementsAr: ["لا تُعد كتابتها؛ أرِّخها واتركها"],
    results: ["Three public study repos, one honest shelf"],
    resultsAr: ["ثلاثة مستودعات دراسة عامة ورف صادق واحد"],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "techpeak",
    title: "Techpeak",
    titleAr: "تيك بيك",
    tagline: "Small C++ public repo — systems practice, not a Flutter case study.",
    taglineAr: "مستودع C++ عام صغير — تمرين أنظمة لا دراسة Flutter.",
    category: "package",
    listing: "open-source",
    role: "Software Engineer",
    roleAr: "مهندس برمجيات",
    duration: "Study",
    durationAr: "دراسة",
    year: "2025",
    kicker: "C++ · SYSTEMS",
    color: "0x292524",
    githubUrl: "https://github.com/ammarshamea/techpeak",
    overview:
      "Techpeak is a public C++ repository from the same week as the early Flutter clones. It lives on the open-source shelf.",
    overviewAr:
      "تيك بيك مستودع C++ عام من أسبوع استنساخات Flutter المبكرة. مكانه رف المصدر المفتوح.",
    problem:
      "Needed a non-Dart public artifact without inflating the projects grid.",
    problemAr:
      "الحاجة لأثر عام خارج Dart دون نفخ شبكة المشاريع.",
    solution:
      "List Techpeak as a package/lab item with a repo link.",
    solutionAr:
      "إدراج تيك بيك كعنصر حزمة/مختبر مع رابط المستودع.",
    architecture:
      "C++ project on GitHub (ammarshamea/techpeak).",
    architectureAr:
      "مشروع C++ على GitHub (ammarshamea/techpeak).",
    features: ["Public C++ source"],
    featuresAr: ["مصدر C++ عام"],
    challenges: ["Almost no README"],
    challengesAr: ["شبه غياب لـ README"],
    lessonsLearned: ["Empty READMEs still beat invented metrics"],
    lessonsLearnedAr: ["ملفات README الفارغة أفضل من أرقام مخترعة"],
    futureImprovements: ["Add a three-line description in the repo"],
    futureImprovementsAr: ["إضافة وصف من ثلاثة أسطر في المستودع"],
    results: ["Public C++ practice repo linked from the open-source page"],
    resultsAr: ["مستودع تمرين C++ عام مربوط من صفحة المصدر المفتوح"],
    stack: ["C++"],
  },
];

for (const item of items) {
  project(item);
}

console.log(`wrote ${items.length} project pairs`);
