import { useState, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   SKILL DATABASE — 1,500+ skills across 18 industries
═══════════════════════════════════════════════════════════════ */
const SKILL_CATS = {
  "Information Technology": [
    "JavaScript","TypeScript","Python","Java","C++","C#","Go","Rust","Swift","Kotlin","PHP","Ruby","Scala","R","MATLAB","Dart","Elixir","Haskell","Lua","Perl","C","Objective-C","Shell Scripting","PowerShell","SQL","PL/SQL","T-SQL","Assembly","COBOL","Fortran","F#","Groovy","Julia","Zig",
    "HTML5","CSS3","Sass/SCSS","LESS","React","Vue.js","Angular","Next.js","Nuxt.js","Svelte","Remix","Astro","Gatsby","Tailwind CSS","Bootstrap","Material-UI","Ant Design","jQuery","Alpine.js","Ember.js","WebAssembly","Web Components","PWA Development",
    "Node.js","Express.js","Fastify","NestJS","Django","Flask","FastAPI","Spring Boot","Laravel","Ruby on Rails","ASP.NET Core","Symfony","CakePHP","Gin","Phoenix Framework","Actix Web",
    "PostgreSQL","MySQL","SQLite","MongoDB","Redis","Elasticsearch","Cassandra","DynamoDB","Firebase","Supabase","CockroachDB","MariaDB","Oracle Database","Microsoft SQL Server","Neo4j","InfluxDB","Snowflake","BigQuery","Redshift","Databricks","Prisma","Sequelize","TypeORM","SQLAlchemy","Hibernate","ActiveRecord",
    "Docker","Kubernetes","AWS","Microsoft Azure","Google Cloud Platform","Terraform","Ansible","Jenkins","GitHub Actions","GitLab CI","CircleCI","Vercel","Netlify","Heroku","DigitalOcean","Cloudflare","AWS Lambda","Azure Functions","Google Cloud Functions","Helm","Istio","Prometheus","Grafana","Datadog","New Relic","Splunk","ELK Stack","OpenTelemetry",
    "Git","GitHub","GitLab","Bitbucket","Linux","Nginx","Apache","Webpack","Vite","Babel","Jest","Cypress","Playwright","Selenium","Postman","Swagger","OpenAPI","JWT","OAuth 2.0","SAML","Auth0","Keycloak","Firebase Auth",
    "TensorFlow","PyTorch","scikit-learn","Keras","XGBoost","Pandas","NumPy","Matplotlib","OpenCV","NLTK","spaCy","Hugging Face","LangChain","OpenAI API","Anthropic API","Stable Diffusion","Apache Spark","Hadoop","Kafka","RabbitMQ","Airflow","Prefect","dbt","Tableau","Power BI","Looker","Metabase","Superset",
    "Machine Learning","Deep Learning","Computer Vision","NLP","Large Language Models","RAG","Fine-Tuning","MLflow","Feature Engineering","Data Wrangling","Model Deployment",
    "Penetration Testing","Ethical Hacking","OWASP","Network Security","Cryptography","Firewall Management","SIEM","Incident Response","Vulnerability Assessment","Burp Suite","Metasploit","Nmap","Wireshark","Kali Linux","Zero Trust Security","ISO 27001","SOC 2","PCI DSS","HIPAA Security",
    "TCP/IP","DNS","DHCP","HTTP/HTTPS","VPN","SD-WAN","BGP","Cisco IOS","Juniper","Palo Alto","Load Balancing","CDN Management",
    "Salesforce","SAP","Oracle ERP","ServiceNow","Workday","SharePoint","Microsoft 365","Xcode","Android Studio","Flutter","React Native","Ionic","Unity","Unreal Engine","Blockchain","Solidity","Web3.js","Ethereum","Smart Contracts",
    "Agile","Scrum","Kanban","SAFe","XP","TDD","BDD","DDD","Microservices Architecture","CQRS","Event Sourcing","Clean Architecture","CI/CD","DevSecOps","SRE","Platform Engineering","Jira","Confluence","Notion","Linear","Asana",
  ],
  "Design & Creative": [
    "Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Adobe XD","Adobe After Effects","Adobe Premiere Pro","Adobe Lightroom","Adobe Animate","Adobe Audition","Adobe Substance 3D","Adobe Fresco","Adobe Firefly","Adobe Dimension",
    "Figma","Sketch","InVision","Zeplin","Marvel App","Framer","Principle","Proto.io","ProtoPie","Balsamiq","Axure RP","Mockplus",
    "Canva","Crello","Visme","GIMP","Inkscape","Affinity Designer","Affinity Photo","Affinity Publisher","CorelDRAW","QuarkXPress","Pixelmator Pro","Procreate","Clip Studio Paint","Krita",
    "User Experience Design (UX)","User Interface Design (UI)","Interaction Design","Information Architecture","User Research","Usability Testing","A/B Testing","Wireframing","Prototyping","Design Systems","Component Libraries","Design Tokens","Accessibility (WCAG 2.1)","Responsive Design","Mobile-First Design","Dark Mode Design","Design Ops",
    "Persona Development","Journey Mapping","Card Sorting","Heuristic Evaluation","Guerrilla Testing","Eye Tracking","Contextual Inquiry","Cognitive Walkthrough","Service Design","Design Sprint","Design Thinking","Double Diamond","Jobs To Be Done",
    "Brand Identity","Brand Strategy","Brand Guidelines","Logo Design","Typography","Colour Theory","Visual Communication","Editorial Design","Publication Design","Packaging Design","Print Design","Signage Design","Environmental Design","Exhibition Design","Wayfinding Design",
    "Motion Graphics","Animation","2D Animation","3D Animation","Character Design","Storyboarding","Motion Design","Kinetic Typography","Video Editing","Colour Grading","Compositing","Green Screen Keying","VFX","Title Sequence Design",
    "Blender","Cinema 4D","Autodesk Maya","3ds Max","ZBrush","Rhino 3D","SketchUp","Houdini","KeyShot","V-Ray","Arnold Renderer","Corona Renderer","Unreal Engine (Visualization)","Twinmotion","Lumion","Fusion 360 (Design)",
    "3D Modelling","Hard Surface Modelling","Organic Modelling","Texturing","PBR Texturing","Lighting Design (3D)","Rigging","Sculpting","UV Mapping","Rendering","Architectural Visualization","Product Visualization","Jewellery Rendering",
    "Photography","Portrait Photography","Product Photography","Architectural Photography","Event Photography","Food Photography","Fashion Photography","Street Photography","Macro Photography","Landscape Photography","Photo Editing","Photo Retouching","Frequency Separation","Studio Lighting","Drone Photography","Aerial Photography",
    "Video Production","Videography","Cinematography","DaVinci Resolve","Final Cut Pro X","Avid Media Composer","Adobe Premiere Pro","After Effects","Podcast Production","Podcast Editing","Audio Production","Sound Design","Foley","Music Production","FL Studio","Ableton Live","Logic Pro X",
    "Fashion Design","Pattern Making","Garment Construction","Textile Design","Fashion Illustration","Technical Fashion Drawing","Costume Design","Jewellery Design","Accessories Design","Shoe Design","Lingerie Design","Knitwear Design",
    "Interior Design","Space Planning","Interior Styling","Furniture Design","Lighting Design (Interior)","FF&E Specification","Mood Boarding","AutoCAD (Interior)","Revit (Interior)","SketchUp (Interior)","BIM (Interior)","Sustainable Interior Design","Universal Design",
    "Illustration","Digital Illustration","Concept Art","Comic Book Art","Manga & Anime Art","Pixel Art","Vector Art","Icon Design","Infographic Design","Data Visualisation Design","Social Media Design","Presentation Design","Email Template Design","Web Design","Landing Page Design","E-commerce Design","App UI Design",
    "Creative Direction","Art Direction","Creative Strategy","Campaign Design","Advertising Design","Visual Storytelling","Content Design","Editorial Photography Direction",
  ],
  "Marketing & Sales": [
    "Digital Marketing Strategy","Search Engine Optimisation (SEO)","Search Engine Marketing (SEM)","Pay-Per-Click (PPC)","Google Ads","Meta Ads (Facebook/Instagram)","LinkedIn Ads","TikTok Ads","Pinterest Ads","Snapchat Ads","Display Advertising","Retargeting","Programmatic Advertising","DSP Management",
    "Social Media Marketing","Content Marketing","Email Marketing","Influencer Marketing","Affiliate Marketing","Referral Marketing","Viral Marketing","Growth Hacking","Performance Marketing","Mobile Marketing","SMS Marketing","WhatsApp Business Marketing","Push Notification Marketing",
    "Google Analytics 4 (GA4)","Google Tag Manager","Google Search Console","Looker Studio","Adobe Analytics","Mixpanel","Amplitude","Heap Analytics","Hotjar","Crazy Egg","FullStory","Optimizely","VWO","Segment","Braze","Iterable",
    "HubSpot","Salesforce Marketing Cloud","ActiveCampaign","Mailchimp","Klaviyo","Marketo","Pardot","Eloqua","Customer.io","Drip","Omnisend","SendGrid","Mailjet",
    "Content Strategy","Content Creation","SEO Copywriting","Technical SEO","On-Page SEO","Off-Page SEO","Link Building","Keyword Research","Competitor Analysis","SEMrush","Ahrefs","Moz Pro","Screaming Frog","SurferSEO","Yoast SEO","RankMath","Schema Markup","Core Web Vitals","Local SEO","E-commerce SEO","International SEO",
    "Community Management","Instagram Marketing","Facebook Marketing","LinkedIn Marketing","Twitter/X Marketing","TikTok Marketing","YouTube Marketing","Pinterest Marketing","Hootsuite","Buffer","Sprout Social","Later","Planoly","Iconosquare","SocialBee",
    "Brand Management","Brand Positioning","Market Research","Consumer Insights","Campaign Planning","Integrated Marketing Communications (IMC)","Above-the-Line (ATL)","Below-the-Line (BTL)","Event Marketing","Experiential Marketing","Trade Show Marketing","Sponsorship Management","Sports Marketing","Cause Marketing",
    "Public Relations","Media Relations","Press Office","Crisis Communications","Reputation Management","Internal Communications","Corporate Communications","Change Communications","Executive Communications","Investor Relations","Analyst Relations",
    "B2B Sales","B2C Sales","Enterprise Sales","SaaS Sales","Inside Sales","Outside Sales","Field Sales","Channel Sales","Partner Sales","Account Management","Key Account Management (KAM)","Business Development","Sales Operations","Revenue Operations (RevOps)",
    "Lead Generation","Lead Qualification","Lead Nurturing","Cold Calling","Cold Emailing","Social Selling","LinkedIn Sales Navigator","Consultative Selling","Solution Selling","SPIN Selling","Challenger Sales","Value-Based Selling","MEDDIC","BANT","Command of the Message",
    "Salesforce CRM","HubSpot CRM","Pipedrive","Zoho CRM","Microsoft Dynamics 365","Monday CRM","Outreach","Salesloft","ZoomInfo","Lusha","Apollo.io","Sales Forecasting","Territory Planning","Quota Management","Customer Success","Customer Retention","Upselling","Cross-selling",
    "E-commerce Strategy","Shopify","WooCommerce","Magento","BigCommerce","Amazon Seller Central","Amazon FBA","Dropshipping","D2C (Direct-to-Consumer)","Conversion Rate Optimisation (CRO)","Amazon SEO","Marketplace Management","Etsy","eBay","Lazada","Shopee","TikTok Shop",
    "Proposal Writing","RFP Response","Contract Negotiation","Pitch Deck Creation","Objection Handling","Demo Delivery","Proof of Concept (POC) Management",
  ],
  "Finance & Accounting": [
    "Financial Accounting","Management Accounting","Cost Accounting","Tax Accounting","Auditing (Internal)","Auditing (External)","Forensic Accounting","Fund Accounting","Bookkeeping","Accounts Payable","Accounts Receivable","General Ledger","Bank Reconciliation","Month-End Close","Year-End Close","Intercompany Accounting","Fixed Asset Accounting","Revenue Recognition (IFRS 15/ASC 606)",
    "Financial Reporting","IFRS","US GAAP","Financial Analysis","Financial Modelling","Budgeting","Forecasting","Rolling Forecast","Variance Analysis","Cash Flow Management","Working Capital Management","Capital Budgeting","DCF Valuation","Business Valuation","LBO Modelling","Three-Statement Modelling","Comparable Company Analysis","Precedent Transaction Analysis",
    "Mergers & Acquisitions (M&A)","Financial Due Diligence","Corporate Finance","Treasury Management","FX Risk Management","Hedging","Derivatives","Interest Rate Swap","Letters of Credit","Trade Finance","Supply Chain Finance","Project Finance","Structured Finance",
    "Investment Banking","Private Equity","Venture Capital (Finance)","Asset Management","Portfolio Management","Equity Research","Fixed Income","Commodities Trading","Foreign Exchange (FX)","Algorithmic Trading","Quantitative Finance","Bloomberg Terminal","Reuters Eikon","FactSet","Capital IQ","PitchBook",
    "Advanced Microsoft Excel","Excel VBA & Macros","Power Query","Power Pivot","Power BI (Finance)","SAP FI/CO","SAP S/4HANA Finance","Oracle Financials","QuickBooks","Xero","MYOB","Sage","NetSuite","Anaplan","Adaptive Insights","Workday Financials","Hyperion Financial Management","IBM TM1","Cognos Controller",
    "Corporate Tax","VAT/GST","Transfer Pricing","International Tax","Tax Compliance","Deferred Tax","FATCA","CRS","AML/KYC","Regulatory Compliance","SOX Compliance (Section 404)","Basel III/IV","Solvency II","IFRS 9","IFRS 16","IFRS 17","IFRS 3","US GAAP ASC 842",
    "Actuarial Analysis","Life Insurance Actuarial","General Insurance Actuarial","Reinsurance","Underwriting","Claims Management","Risk Assessment (Actuarial)","Prophet (Actuarial Software)","FP&A","Strategic Finance","Investor Relations (Finance)",
    "FinTech","Cryptocurrency","Blockchain (Finance)","DeFi","Tokenomics","Open Banking","Payment Systems","SWIFT","ISO 20022","PSD2","BNPL","Neobanking","Insurtech",
  ],
  "Healthcare & Medical": [
    "Patient Care","Clinical Assessment","Medical History Taking","Physical Examination","Diagnosis","Differential Diagnosis","Treatment Planning","Evidence-Based Medicine","Emergency Medicine","Critical Care","Intensive Care (ICU)","Surgical Assistance","Post-Op Care","Anaesthesia","Radiology Reporting","Pathology","Pharmacology","Prescription Management","IV Therapy","Central Line Management","Arterial Line","Tracheostomy Care",
    "Nursing Assessment","Patient Education","Wound Care","Medication Administration","Vital Signs Monitoring","Care Planning","Palliative Care","Paediatric Nursing","Geriatric Nursing","Mental Health Nursing","Community Nursing","Midwifery","Neonatal Care","Theatre Nursing","ICU Nursing","HDU Nursing","Oncology Nursing","Cardiac Nursing","Renal Nursing","Dialysis Nursing",
    "Physiotherapy","Occupational Therapy","Speech-Language Therapy","Respiratory Therapy","Dietetics","Clinical Nutrition","Radiography","Sonography","MRI Operation","CT Scanning","Nuclear Medicine","Medical Laboratory Technology","Phlebotomy","ECG Interpretation","EEG","Audiometry","Optical Dispensing","Prosthetics & Orthotics",
    "Cognitive Behavioural Therapy (CBT)","Dialectical Behaviour Therapy (DBT)","EMDR","Motivational Interviewing","Psychotherapy","Mental Health Assessment","Crisis Intervention","Substance Abuse Counselling","Group Therapy","Trauma-Informed Care","Suicide Risk Assessment","Child & Adolescent Psychiatry","Neuropsychological Assessment",
    "Healthcare Management","Hospital Administration","Medical Coding (ICD-10)","Medical Billing (CPT)","Electronic Health Records (EHR)","Epic Systems","Cerner","Meditech","HealthEngine","Healthcare Quality Improvement","JCAHO Standards","HIPAA Compliance","Healthcare Analytics","Population Health Management","Clinical Trial Management","GCP Compliance","Regulatory Affairs (Pharma/Medical)","Health Technology Assessment (HTA)",
    "Dentistry","Dental Examination","Dental Radiography","Tooth Extraction","Restorative Dentistry","Root Canal Treatment","Orthodontics","Periodontics","Prosthodontics","Dental Implants","Oral Surgery","Endodontics","Paediatric Dentistry","Dental Software (Dentrix/Eaglesoft)",
    "Epidemiology","Biostatistics","Public Health Research","Vaccination Programmes","Disease Surveillance","Contact Tracing","Health Promotion","Environmental Health","Occupational Health","Health Economics","QALY Analysis",
    "Drug Discovery","Clinical Research","Pharmaceutical Sciences","GMP (Pharma)","FDA Regulations","TGA Regulations","EMA Regulations","ISO 13485","Medical Device Regulations","MDR/IVDR","Bioinformatics","Genomics","Proteomics","PCR","qPCR","CRISPR","Next-Gen Sequencing","ELISA","Flow Cytometry","Western Blot","Cell Culture","HPLC (Pharma)","GC-MS (Pharma)",
  ],
  "Engineering": [
    "Mechanical Design","SOLIDWORKS","AutoCAD","CATIA V5/V6","PTC Creo","Siemens NX","Fusion 360","GD&T (ASME Y14.5)","Tolerance Stack-Up Analysis","FEA (Finite Element Analysis)","CFD (Computational Fluid Dynamics)","Ansys Mechanical","Ansys Fluent","ABAQUS","COMSOL Multiphysics","Thermodynamics","Fluid Mechanics","Heat Transfer","Vibration Analysis","Fatigue & Fracture Analysis","Failure Mode Analysis",
    "CNC Machining","CNC Programming (G-Code)","3D Printing / Additive Manufacturing (FDM/SLA/SLS)","Injection Moulding Design (DFM)","Sheet Metal Design","Welding Design","HVAC Systems Design","Piping Design (ASME B31.3)","Pump & Compressor Selection","Turbine Engineering","Automotive Engineering","Aerospace Engineering (AS9100)","Defence Engineering","Robotics Design","Mechatronics",
    "Electrical Design","Circuit Design","Schematic Capture","PCB Design","Altium Designer","Cadence Allegro","Mentor PADS","OrCAD","KiCad","Embedded Systems","C/C++ (Embedded)","RTOS","Arduino","Raspberry Pi","FPGA Design","VHDL","Verilog","SystemVerilog","PLC Programming (IEC 61131)","SCADA","DCS","HMI Design","Industrial Automation","Robotics (ROS)","Motion Control","Servo Systems","VFDs","Power Electronics",
    "Power Systems Engineering","High Voltage Engineering","Transformer Design","Switchgear Design","Protection Relay","Electrical Installation Design","Load Flow Analysis","Fault Analysis","AutoCAD Electrical","ETAP","DIgSILENT PowerFactory","Electrical Cable Management","IEC 60364","AS/NZS 3000","IEEE 1547",
    "Structural Design","Structural Analysis","SAP2000","ETABS","STAAD.Pro","RAM Structural System","Tekla Structures","Robot Structural Analysis","Reinforced Concrete Design","Steel Connection Design","Foundation Design","Geotechnical Investigation","Soil Mechanics","Traffic Engineering","Highway Design (AASHTO)","Bridge Design","Retaining Wall Design","Water Resources Engineering","Hydraulic Modelling","Hydrology","Stormwater Management","Sewerage Design","AutoCAD Civil 3D","12d Model",
    "Chemical Process Design","Process Flow Diagram (PFD)","P&ID","Process Simulation (Aspen HYSYS)","Process Simulation (Aspen Plus)","Reaction Engineering","Distillation Column Design","Heat Exchanger Design (TEMA)","Pressure Vessel Design (ASME VIII)","Piping Stress Analysis (CAESAR II)","HAZOP","LOPA","SIL Assessment","Process Safety Management","ATEX Zone Classification","Oil & Gas Engineering","Offshore Engineering","LNG Engineering","Refinery Process","Petrochemicals","Water Treatment Design","Effluent Treatment","Air Pollution Control Design",
    "Lean Manufacturing","Six Sigma (Black Belt)","Six Sigma (Green Belt)","5S Workplace Organisation","Kaizen","Total Productive Maintenance (TPM)","Value Stream Mapping","Time & Motion Study","Ergonomics Engineering","Facilities Layout Planning","Production Planning","MRP II","ERP Implementation (SAP PP)","Quality Engineering","Statistical Process Control (SPC)","FMEA","Control Plan","PPAP","MSA","ISO 9001:2015","IATF 16949","AS9100 Rev D","ISO 13485","GMP Engineering","BioProcess Engineering","Biomedical Engineering","Mining Engineering","Geomechanics","Blast Design","Systems Engineering (MBSE)","Requirements Engineering","Reliability Engineering","RAM Analysis","FRACAS","Technical Writing (Engineering)","Drawing Review","Standards Compliance",
  ],
  "Education & Training": [
    "Curriculum Development","Lesson Planning","Classroom Management","Differentiated Instruction","Inclusive Education","Special Education Needs (SEN)","Early Childhood Education","Primary Education","Secondary Education","Higher Education Teaching","Adult Education","Vocational Education & Training (VET)","E-Learning Development","Distance Learning Design","Blended Learning Design",
    "Instructional Design","ADDIE Model","SAM Model","Agile Instructional Design","Bloom's Taxonomy","Learning Objectives Writing","Storyboarding (eLearning)","Rapid eLearning Development","LMS Administration","Moodle","Canvas LMS","Blackboard","Articulate Storyline 360","Articulate Rise","Adobe Captivate","iSpring Suite","Lectora Inspire","H5P","Camtasia","Vyond","Powtoon",
    "Assessment Design","Formative Assessment","Summative Assessment","Rubric Development","Standardised Testing","Portfolio Assessment","Competency-Based Assessment","Recognition of Prior Learning (RPL)","Learning Analytics","Student Data Analysis",
    "Student Counselling","Career Counselling","Academic Advising","Educational Psychology","Behavioural Management","Positive Behaviour Support (PBS)","Restorative Practices","Student Welfare","Child Protection","Mandatory Reporting",
    "Google Classroom","Microsoft Teams for Education","Zoom (Education)","Kahoot","Nearpod","Padlet","Mentimeter","Jamboard","Flipgrid","Canva for Education","Turnitin",
    "TESOL/TEFL Certification","ESL Instruction","Academic English Teaching","English for Specific Purposes (ESP)","Literacy Development","Phonics Instruction","Reading Recovery","Numeracy Development","Maths Intervention","Dyslexia Support","Dyscalculia Support","Autism Spectrum Support","ADHD Support",
    "STEM Education","STEAM Education","Coding for Education","Robotics in Education","Project-Based Learning (PBL)","Inquiry-Based Learning","Flipped Classroom","Gamification in Education","Microlearning","Montessori Method","Reggio Emilia Approach","Waldorf Education","International Baccalaureate (IB)","Cambridge IGCSE","NAPLAN Preparation","VCE Teaching","HSC Teaching",
    "Corporate Training","Leadership Development Training","Onboarding Programme Design","Compliance Training","Safety Training","Sales Training","Customer Service Training","Training Needs Analysis (TNA)","Kirkpatrick Evaluation Model","Training ROI","Facilitation Skills","Webinar Facilitation","Train the Trainer","Coaching (Executive)","Mentoring Programme Design",
  ],
  "Human Resources": [
    "Talent Acquisition","Recruitment (Volume)","Recruitment (Specialist)","Headhunting","Executive Search","Campus & Graduate Recruitment","Job Description Writing","Job Architecture","ATS Management","Workday Recruiting","iCIMS","Lever","Greenhouse","Jobvite","SmartRecruiters","LinkedIn Recruiter","Boolean Search","Sourcing Strategy",
    "Candidate Assessment","Competency-Based Interviewing","Structured Interviewing","Behavioural Interviewing","Strengths-Based Interviewing","Assessment Centre Design","Psychometric Testing","SHL","Hogan","Korn Ferry Assessment","Thomas International","Predictive Index",
    "Onboarding Design","Employee Induction","Probation Management","Employee Engagement","Culture Building","Employer Branding","Employee Value Proposition (EVP)","eNPS Measurement","Gallup Q12 Surveys","Employee Experience Design","Pulse Surveys",
    "Employee Relations","HR Business Partnering","Strategic HR","Workforce Planning","Headcount Planning","Organisational Design","Restructuring","TUPE/TAFE","Redundancy Management","Grievance Management","Disciplinary Process","Workplace Investigation","Employment Law Advice","Industrial Relations","Enterprise Bargaining","Collective Bargaining","EBA Negotiation","Unfair Dismissal","Fair Work Act","Employment Standards",
    "Performance Management","Performance Appraisal Design","KPI Setting","OKR Framework","360-Degree Feedback","Succession Planning","Talent Review","9-Box Grid","Leadership Pipeline","High Potential (HIPO) Programmes","Career Development Frameworks","Learning & Development (L&D) Strategy","Training Budget Management","Coaching (HR)","Leadership Development",
    "Compensation & Benefits","Job Evaluation (Hay Method)","Salary Benchmarking","Pay Equity Analysis","Payroll Management","Benefits Administration","Superannuation/Pension","Equity Compensation (ESOP)","Incentive Design","Total Rewards Strategy","Mercer Benchmarking","Korn Ferry Pay","Willis Towers Watson","Radford Survey",
    "HR Analytics","People Analytics","Predictive Attrition Modelling","Workforce Planning Analytics","HR Dashboard Design","Workday HRIS","SAP SuccessFactors","Oracle HCM Cloud","BambooHR","ADP Workforce Now","Dayforce","ELMO","Employment Hero","Microsoft Viva",
    "Diversity, Equity & Inclusion (DEI)","DEI Strategy","Unconscious Bias Training","Pay Gap Reporting","Organisational Development (OD)","Change Management (HR)","Culture Transformation","Wellbeing Strategy","EAP Management","Mental Health First Aid","GDPR Compliance (HR)","Right to Work Compliance","VEVO Checks","Working With Children Checks",
  ],
  "Legal & Compliance": [
    "Legal Research","Legal Writing","Contract Drafting","Contract Review","Contract Negotiation","Corporate Law","Commercial Law","Employment Law","Workplace Health & Safety Law","Intellectual Property Law","Trademark Law","Patent Prosecution","Copyright Law","Privacy Law","GDPR Compliance","Data Protection Law","Cybersecurity Law","Consumer Law","Competition Law","Antitrust Law",
    "Mergers & Acquisitions (Legal)","Legal Due Diligence","Share Purchase Agreement","Business Sale Agreement","Corporate Governance","Company Secretarial","Board Management","ASX Listing Rules","Corporations Act","Disclosure Obligations","Shareholders Agreement",
    "Litigation Management","Civil Litigation","Commercial Litigation","Class Action","Mediation","Arbitration","International Arbitration (ICC/LCIA/SIAC)","Adjudication","Expert Determination","Alternative Dispute Resolution",
    "Real Estate Law","Conveyancing","Property Development Law","Planning Law","Strata Law","Commercial Leasing","Retail Leasing","Construction Contracts","Building & Construction Law","Infrastructure Law",
    "Banking & Finance Law","Secured Transactions","Project Finance Law","Debt Capital Markets","Equity Capital Markets","Securities Law","ASIC Regulations","FSG","PDS","AFS Licence",
    "Family Law","Divorce","Child Custody","Property Settlement","Wills & Estates","Probate Administration","Trust Law","Superannuation Law","Tax Law","International Tax (Legal)",
    "Immigration Law","Visa Applications","Sponsorship Law","Migration Advice","MARA Registration","Refugee Law","Asylum Seeker Representation","Human Rights Law","International Law","Public International Law","Maritime Law","Aviation Law",
    "AML/CTF Compliance","KYC Procedures","AUSTRAC Compliance","Financial Crime Compliance","Regulatory Affairs (Legal)","Internal Investigation","Whistleblower Framework","Anti-Bribery & Corruption","FCPA","UK Bribery Act","Speak-Up Programmes",
    "LexisNexis","Westlaw","PracticalLaw","Relativity (eDiscovery)","iManage","NetDocuments","LEAP Legal Software","Clio Manage","MyCase","Affinity (Legal)",
    "Legal Project Management","Legal Technology (LegalTech)","Document Automation","Contract Lifecycle Management (CLM)","eDiscovery","Legal Process Outsourcing (LPO)","Matter Management",
  ],
  "Operations & Supply Chain": [
    "Supply Chain Strategy","Procurement","Strategic Sourcing","Supplier Relationship Management (SRM)","Vendor Management","Category Management","Spend Analysis","RFQ/RFP Management","Purchase Order Management","Supplier Auditing","Supplier Development","Supplier Diversity","ESG Procurement","Sustainable Sourcing",
    "Inventory Management","Inventory Optimisation","ABC/XYZ Analysis","Cycle Counting","VMI (Vendor-Managed Inventory)","Safety Stock Calculation","EOQ","Warehouse Management","WMS Implementation","SAP WM","SAP EWM","Manhattan WMS","JDA WMS","Pick & Pack Operations","Cross-Docking","Slotting Optimisation","Returns Management (Reverse Logistics)",
    "Logistics Management","Freight Forwarding","3PL Management","4PL Coordination","Last-Mile Delivery Optimisation","Route Planning","Fleet Management","Cold Chain Logistics","Dangerous Goods Handling","Import/Export","Customs Clearance","Incoterms 2020","Trade Compliance","Letters of Credit","Shipping Documentation","Free Trade Agreements (FTA)",
    "Demand Planning","Demand Sensing","Supply Planning","Master Production Schedule (MPS)","Rough Cut Capacity Planning (RCCP)","S&OP Process","Integrated Business Planning (IBP)","CPFR","DDMRP","SAP APO/IBP","Oracle SCM Cloud","Blue Yonder (JDA)","Kinaxis RapidResponse","E2open","Infor Nexus","Microsoft Dynamics 365 SCM",
    "Process Improvement","Lean Operations","Six Sigma (Operations)","8D Problem Solving","Kaizen Events","Root Cause Analysis","5 Whys","Fishbone Diagram","Control Charts (SPC)","PDCA","Process Mapping","Value Stream Mapping (VSM)","Business Process Reengineering","Business Process Management (BPM)","Workflow Automation","RPA (UiPath/Automation Anywhere)",
    "Customer Operations","Order Management","Order-to-Cash (O2C)","Customer Service Operations","Contact Centre Management","SLA Management","Net Promoter Score (NPS)","Customer Satisfaction (CSAT)","First Call Resolution (FCR)","Salesforce Service Cloud","Zendesk","Freshdesk","ServiceNow (ITSM)",
    "Quality Management Systems (QMS)","ISO 9001:2015","ISO 14001:2015","ISO 45001:2018","GMP (Operations)","GDP (Good Distribution Practice)","HACCP Implementation","BRC Global Standard","SQF Certification","Food Safety Auditing","Quality Auditing","Corrective & Preventive Action (CAPA)","Non-Conformance Management","Customer Complaint Management","Product Recall Management",
  ],
  "Construction & Real Estate": [
    "Construction Project Management","Site Management","Site Supervision","Construction Programme Development","Construction Planning (Primavera P6)","Construction Planning (MS Project)","Critical Path Method (CPM)","Earned Value Management (EVM)","Milestone Tracking","Look-Ahead Planning","Lookahead Scheduling",
    "Quantity Surveying","Cost Planning","Cost Estimation","Bills of Quantities (BOQ)","Tender Analysis","Value Engineering","Cost Reporting","Final Account Settlement","Variation Management","Claims Preparation","Delay Analysis","Expert Witness",
    "Contract Administration","NEC3/NEC4 Contract","JCT Contract","FIDIC Red/Yellow/Silver Book","PAM Contract (Malaysia)","AS 4000/4300","AS 4902","GC21","Head Contract","Subcontract Management",
    "Building Information Modelling (BIM)","Revit (Architecture)","Revit (Structure)","Revit (MEP)","BIM 360","ACC (Autodesk Construction Cloud)","Navisworks Manage","4D BIM Sequencing","5D BIM Cost Integration","Clash Detection","Point Cloud Scanning","Tekla Structures","Vectorworks","ArchiCAD",
    "Architecture Design","Architectural Documentation","Design Development","Schematic Design","Planning Permission","Development Approval (DA)","Building Approval (BA)","Building Regulations Compliance","NCC Compliance","SEPP Planning","Environmental Planning & Assessment Act",
    "Structural Engineering (Construction)","Civil Engineering (Construction)","MEP Engineering","Mechanical Services Design","Hydraulic Services Design","Electrical Services Design (Construction)","Fire Engineering","Facade Engineering","Acoustic Engineering",
    "Work Health & Safety (WHS)","HSE Management","SafeWork NSW / WorkSafe VIC","Method Statement","Safe Work Method Statement (SWMS)","Risk Assessment (Construction)","JSEA","HSEQ Management","CPCCOHS1001A","White Card","High Risk Work Licence","EWP Licence","Forklift Licence","Rigging Licence","Dogging Licence","Scaffolding Licence",
    "Real Estate Development","Property Development","Property Investment Analysis","Asset Management (Real Estate)","Commercial Real Estate","Residential Real Estate","Retail Real Estate","Industrial & Logistics Real Estate","Property Valuation","RICS Valuation Standards","API Membership","JLL Research","CBRE Research","Knight Frank","Ray White","McGrath","LJ Hooker","RE/MAX","Century 21",
    "Leasing (Commercial)","Leasing (Retail)","Leasing (Industrial)","Lease Negotiation","Property Management","Strata Management","Facilities Management","NABERS Rating","Green Star Rating","ESD Consulting","Sustainable Development","Mixed-Use Development","Land Subdivision","Due Diligence (Real Estate)","Development Finance","Construction Finance",
  ],
  "Hospitality & F&B": [
    "Hotel Management","Front Office Operations","Housekeeping Management","F&B Operations Management","Banqueting & Events Operations","Revenue Management","Channel Management","OTA Management (Booking.com/Expedia)","Opera Cloud PMS","Mews PMS","Clock PMS","RMS Cloud","Fidelio","Protel","RoomRaccoon",
    "Guest Relations","Guest Experience Management","Luxury Service Standards","Complaint Resolution","Concierge Services","Butler Service","Mystery Auditing","Forbes Travel Guide Standards","LQA Standards","Preferred Hotels Standards",
    "Restaurant Management","Kitchen Management","Kitchen Brigade","Menu Engineering","Menu Development","Recipe Costing","Food Cost Control","Labour Cost Control","COGS Management","Restaurant P&L Management","Catering Management","Events Catering","Banquet Operations","Wedding Catering","Corporate Catering",
    "Barista Skills (Level 1-3)","Coffee Cupping","Latte Art","Espresso Extraction","Filter Coffee Brewing","Cold Brew Production","Bartending","Classic Cocktails","Modern Mixology","Flair Bartending","Cocktail Menu Development","Spirits Knowledge","WSET Level 1-4","CMS Certified Sommelier","Court of Master Sommeliers","Wine Service","Decanting","Cellar Management","Beer Sommelier (Cicerone)","Craft Beer Knowledge",
    "Tourism Management","Destination Management Organisation (DMO)","Tour Operations","Inbound Tourism","Outbound Tourism","Travel Agency Management","GDS (Amadeus)","GDS (Sabre)","GDS (Galileo)","Online Travel Agency (OTA)","Eco-Tourism","Heritage Tourism","Medical Tourism","Adventure Tourism","Cruise Ship Operations","Airline Customer Service","Airport Operations",
    "HACCP (Food Safety)","ISO 22000","SQF (Food Safety)","BRC Food Safety","Allergen Management","Menu Labelling (Allergens)","Responsible Service of Alcohol (RSA)","Liquor Licensing","Food Handler Certificate","Food Supervisor Certificate","SITXFSA005","SITXFSA006",
    "Spa Management","Massage Therapy","Beauty Therapy","Wellness Management","Yoga Retreat Management","Wellness Programme Design","Revenue Management (Spa)","Spa Software (Book4Time/SpaSoft)",
  ],
  "Media & Communications": [
    "Journalism","Investigative Journalism","News Writing","Feature Writing","Long-Form Writing","Editorial Management","Commissioning","Sub-Editing","Fact-Checking","Broadcast Journalism","Television Presenting","Radio Presenting","Podcast Presenting","Online Journalism","Data Journalism","Solutions Journalism","Multimedia Journalism",
    "Copywriting","Content Writing","UX Writing","Technical Writing","Grant Writing","Report Writing (Corporate)","Script Writing","Screenplay Writing","Speechwriting","Creative Non-Fiction","Blog Writing","White Paper Writing","Case Study Writing","Annual Report Writing","Ghostwriting","Proofreading","Developmental Editing","Copy Editing","Substantive Editing","Book Editing","Academic Editing",
    "Public Relations","Media Relations","Press Office Management","Media Training","Crisis Communications","Reputation Management","Thought Leadership","Issues Management","Stakeholder Communications","Government Relations","Community Relations","Investor Relations","Internal Communications","Change Communications","CEO Communications","Executive Profiling",
    "Social Media Management","Content Calendar Management","Community Management","Digital PR","Influencer Relations","Media Monitoring","Meltwater","Mention","Brandwatch","Sprinklr","Talkwalker","Hootsuite Insights","Cision","PR Newswire","Business Wire",
    "Video Production","Documentary Production","Broadcast TV Production","Film Production","Commercial Production","Corporate Video Production","YouTube Content Strategy","Short-Form Video (TikTok/Instagram Reels)","Live Event Production","Livestreaming (OBS/Restream)","Drone Operation (CASA Part 101)","Podcast Production","Audio Engineering","Sound Design","Foley Art","Music Supervision","Voice-Over Direction",
    "Publishing","Book Publishing","Magazine Publishing","Digital Publishing","E-book Production","Self-Publishing (KDP)","ISBN Management","Rights Management","Literary Agent","Editorial Acquisition","Permissions Management",
    "Media Planning","Media Buying","Advertising Operations (AdOps)","Trafficking (Google Campaign Manager)","DV360 (Display & Video 360)","The Trade Desk","Xandr","AdSense Optimisation","Publisher Revenue Management","Header Bidding","Programmatic Guaranteed","Private Marketplace (PMP)",
    "Translation","Interpretation (Simultaneous)","Interpretation (Consecutive)","Localisation","Transcreation","Subtitling","Closed Captioning","Transcription","NAATI Certification",
  ],
  "Manufacturing & Production": [
    "Production Planning","Production Scheduling","Master Production Schedule (MPS)","Capacity Planning","Manufacturing Execution System (MES)","SAP PP","Oracle Manufacturing","Infor CloudSuite Industrial","Epicor","Microsoft Dynamics 365 Manufacturing",
    "CNC Operation (Machining Centre)","CNC Programming (Fanuc)","CNC Programming (Siemens)","CNC Programming (Heidenhain)","CNC Programming (Mastercam)","CNC Programming (Fusion 360 CAM)","Lathe Operation","Milling Operation","Grinding Operation","EDM (Electrical Discharge Machining)","VMC Operation","HMC Operation","Turn-Mill Centre","Swiss Lathe",
    "MIG Welding (GMAW)","TIG Welding (GTAW)","Stick Welding (SMAW)","Flux Core Welding (FCAW)","Submerged Arc Welding (SAW)","Plasma Cutting","Oxy-Fuel Cutting","Laser Cutting","Waterjet Cutting","Welding Inspection (CWI)","AWS D1.1","AS/NZS 1665","EN ISO 3834","NDT (Non-Destructive Testing)","UT Testing","PT Testing","MT Testing","RT Testing","VT Testing",
    "Sheet Metal Fabrication","Press Brake Operation","Punch Press Operation","Stamping","Deep Drawing","Hydroforming","Roll Forming","Die Design","Tooling Design","Jig & Fixture Design","Mould Design","Blow Mould Design","Extrusion Die Design",
    "Injection Moulding (Operations)","Extrusion Operations","Blow Moulding","Thermoforming","Rotational Moulding","Rubber Moulding","Die Casting","Sand Casting","Investment Casting","Powder Metallurgy","Additive Manufacturing (FDM)","Additive Manufacturing (SLA)","Additive Manufacturing (SLS)","Additive Manufacturing (DMLS)","Additive Manufacturing (Binder Jetting)",
    "Assembly Operations","Lean Assembly","Sub-Assembly","Wiring Harness Assembly","PCB Assembly (SMT)","PCB Assembly (Through-Hole)","Reflow Soldering","Wave Soldering","Hand Soldering","IPC-A-610 Standard","IPC-A-620 Standard",
    "Quality Control (Manufacturing)","Dimensional Inspection","CMM Operation","Gauge R&R Study","AQL Sampling (ANSI/ASQ Z1.4)","SPC Charts","Control Plan","PPAP Submission","MSA (Measurement System Analysis)","APQP","DFMEA","PFMEA","ISO 9001","IATF 16949","AS9100","AS9102 (FAI)","ISO 13485","GMP Manufacturing",
    "Maintenance (Manufacturing)","Planned Maintenance","Preventive Maintenance","Predictive Maintenance","Condition Monitoring","Vibration Analysis","Thermography","Oil Analysis","CMMS (Maximo/SAP PM)","TPM Pillar Implementation","MTBF Analysis","MTTR Analysis","Reliability-Centred Maintenance (RCM)",
    "Materials Handling","Forklift Operation (LF)","Reach Truck Operation","Order Picker","Overhead Crane Operation","Rigging","LOTO / LOCS","Machine Guarding","COSHH Assessment","Permit-to-Work System","Chemical Safety","EHS (Manufacturing)","Incident Investigation","Root Cause Analysis (Manufacturing)","5S Implementation",
  ],
  "Agriculture & Environment": [
    "Crop Production","Agronomy","Soil Science","Soil Testing","Fertiliser Management","Irrigation Design","Irrigation Management","Drip Irrigation","Centre Pivot Irrigation","Spray Irrigation","Pest Management (IPM)","Weed Management","Disease Management","Crop Protection","Fungicide Application","Herbicide Application","Insecticide Application","Chemical Handling (ChemCert)","AEST Accreditation",
    "Greenhouse Management","Controlled Environment Agriculture (CEA)","Hydroponics","Aeroponics","Aquaponics","Vertical Farming","Indoor Farming","LED Grow Light Management","Climate Control (Greenhouse)","Organic Farming","Biodynamic Farming","Permaculture","Regenerative Agriculture","Precision Agriculture","GPS Guidance Systems","Variable Rate Technology (VRT)","NDVI Mapping","Drone Agriculture (Agri-Drone)","Farm Management Software","AgriWebb","Figured","FarmBiz",
    "Livestock Management","Animal Husbandry","Cattle Management","Sheep Management","Pig Management","Poultry Management","Dairy Farming","Dairy Herd Management","Milking Systems","Animal Nutrition","Animal Health","Veterinary Nursing","Pregnancy Testing","Artificial Insemination (AI)","Embryo Transfer","Livestock Recording","NLIS (National Livestock Identification System)","EID Tagging",
    "Aquaculture","Fish Farming","Prawn Farming","Salmon Farming","Oyster Farming","Marine Biology","Fisheries Management","Oceanography","Water Quality Testing (Aquaculture)",
    "Forestry Management","Timber Harvesting","Plantation Management","Silviculture","Tree Surgery","Arborist (Level 3/5 AQF)","Aerial Tree Work","Tree Risk Assessment","Urban Forestry","Horticulture","Turf Management","Landscape Construction","Nursery Production","Amenity Horticulture","Viticulture","Winemaking",
    "Environmental Management","Environmental Impact Assessment (EIA)","Biodiversity Assessment","Flora & Fauna Survey","Ecological Assessment","Environmental Auditing","ISO 14001:2015","Environmental Monitoring","Air Quality Monitoring","Water Quality Monitoring (Field)","Groundwater Monitoring","Noise Assessment","Light Spill Assessment","Contaminated Land Assessment","Remediation Design",
    "Waste Management","Waste Auditing","Landfill Management","Recycling Programme Management","Circular Economy Strategy","Waste to Energy","Composting","Hazardous Waste Management","EPA Compliance",
    "Renewable Energy","Solar PV Design","Solar PV Installation (EWP)","CEC Accredited Installer","Wind Farm Operations","Battery Energy Storage Systems (BESS)","Hydropower","Biomass Energy","Energy Auditing","NABERS Rating","Greenstar Rating","LEED Rating","Energy Modelling (EnergyPlus/IES)","Carbon Footprint Calculation","Life Cycle Assessment (LCA)","GHG Inventory Reporting","Net Zero Roadmap Development","Carbon Credit Trading","Voluntary Carbon Market",
    "GIS (Geographic Information Systems)","QGIS","ArcGIS Pro","Esri","Remote Sensing","LiDAR Processing","Photogrammetry","UAV/Drone Survey","Environmental Modelling","Hydrological Modelling","MIKE FLOOD","TUFLOW","HEC-RAS","SWMM","Species Distribution Modelling","MaxEnt","Biodiversity Offsetting","Conservation Management Plan","Native Vegetation Management","Weed Mapping","Invasive Species Management","Wildlife Monitoring","Camera Trapping","Acoustic Bat Survey","Bird Survey","Vegetation Survey","Ecological Burning","Cultural Heritage Survey",
  ],
  "Sports, Fitness & Wellness": [
    "Personal Training (Cert III/IV)","Strength & Conditioning (ASCA)","Athletic Training (NATA)","Sports Coaching","Team Coaching","High Performance Coaching","Performance Analysis","Sports Science","Exercise Physiology","Clinical Exercise Physiology","Biomechanics","Kinesiology","Sports Nutrition (Accredited)","Dietary Assessment","Weight Management Coaching","Sports Supplementation Advice",
    "Group Fitness Instruction","Yoga Teaching (200 hr RYT)","Yoga Teaching (500 hr RYT)","Yin Yoga","Hot Yoga / Bikram","Kundalini Yoga","Ashtanga Yoga","Vinyasa Yoga","Pilates (Mat)","Pilates (Reformer)","Pilates (Studio)","STOTT Pilates","Barre","Indoor Cycling / Spin","Zumba","Dance Fitness","BODYPUMP","RPM (Les Mills)","HIIT","CrossFit (L1 Trainer)","Functional Training","Kettlebell Training","Boxing Fitness","Martial Arts Instruction","Swimming Coaching (Level 1-3)","Athletics Coaching","Gymnastics Coaching","Cheerleading Coaching","Dance Teaching","Cheer / Acrobatics",
    "Sports Rehabilitation","Exercise Rehabilitation","Physiotherapy (Sports)","Dry Needling","Sports Massage (Cert IV)","Remedial Massage","Deep Tissue Massage","Swedish Massage","Hot Stone Massage","Pregnancy Massage","Lymphatic Drainage Massage","Myofascial Release","Trigger Point Therapy","Kinesio Taping","RockTape","Sports Taping","Cupping Therapy","IASTM","Foam Rolling Protocol","Return-to-Play Protocols","Concussion Management","ACL Rehabilitation","Shoulder Rehabilitation",
    "Sports Psychology","Mental Performance Coaching","Mindfulness-Based Stress Reduction (MBSR)","Mindfulness Coaching","Meditation Instruction","Breathwork Facilitation","Wim Hof Method","Behaviour Change Coaching","Motivational Interviewing (Fitness)","Health Coaching","Wellbeing Coaching","Life Coaching (ICF Accredited)",
    "Gym Management","Fitness Centre Operations","Member Retention","Membership Sales","PT Business Development","Studio Business Management","Mindbody Software","Clubready","PT Distinction","TrueCoach","Trainerize","My PT Hub",
    "Spa & Beauty Management","Beauty Therapy (Cert III/IV)","Aromatherapy","Reflexology","Ayurveda","Traditional Chinese Medicine (TCM)","Acupuncture","Aesthetics (Cosmetic)","Skin Analysis","Dermapen / Microneedling","LED Light Therapy","Chemical Peels","Laser Therapy","IPL Hair Removal","Waxing","Nail Technology","Nail Art","Gel Extensions","Makeup Artistry","Bridal Makeup","Airbrush Makeup",
    "Outdoor Education","Bushwalking / Hiking Guide","Rock Climbing (Instruction)","Abseiling Instruction","Kayaking / Canoe Instruction","Stand-Up Paddleboard (SUP) Instruction","Surfing Instruction","Kitesurfing Instruction","Freediving Instruction","Scuba Diving (PADI/SSI)","Scuba Diving Instruction (PADI OWI)","Mountain Biking Instruction","Snow Sports Instruction","Ski Instructor (Level 1-3)","Snowboard Instructor",
    "First Aid (HLTAID011)","CPR","Wilderness First Aid","Advanced First Aid","Working With Children Check","Blue Card","Working With Vulnerable People Check",
    "Sports Event Management","Race Management","Triathlon Organisation","Marathon Organisation","Sporting Event Logistics","Tournament Management","Sports Sponsorship Management","Sports Media Management","Sports Analytics","Performance Data Analysis (Catapult/GPSports)","Video Analysis (Hudl/SportsCode/Veo)",
  ],
  "Social Work & Non-Profit": [
    "Social Work (BSW/MSW)","Case Management","Strengths-Based Practice","Trauma-Informed Practice","Child Protection","Child Safety Investigation","Family Support","Out-of-Home Care","Foster Care","Kinship Care","Adoption Services","Family Group Conferencing","Signs of Safety","Triple P Parenting","Circle of Security","Minding the Baby","Domestic Violence Response","Family Violence Safety Planning","MARAM Framework","Orange Door (Victoria)",
    "Community Development","Asset-Based Community Development (ABCD)","Community Engagement","Participatory Action Research","Community Capacity Building","Needs Assessment","Stakeholder Consultation","Community Consultation","Social Impact Assessment",
    "Youth Work","Youth Case Management","Youth Development","Positive Youth Development","Youth Justice","Diversion Programmes","Youth Outreach","Drop-In Programmes","After-School Programmes","School Holiday Programmes","Youth Mental Health First Aid","headspace Framework",
    "Disability Support Worker","Disability Case Manager","NDIS Support Coordinator","NDIS Plan Manager","NDIS Support Planner","Positive Behaviour Support (PBS) Practitioner","Autism Support","Acquired Brain Injury (ABI) Support","Physical Disability Support","Intellectual Disability Support","Assistive Technology Assessment","Daily Living Skills Training",
    "Aged Care","Residential Aged Care","Community Aged Care","Home Care Package (HCP) Coordinator","ACAT Assessment","ACAS Assessment","Dementia Care","Palliative Care Support","Respite Care","Aged Care Quality Standards","AN-ACC Assessment",
    "Mental Health Support (Community)","Harm Reduction","Drug & Alcohol Counselling","SMART Recovery Facilitation","Narcotics Anonymous Support","Alcoholics Anonymous Support","Peer Support Work","Peer Support Specialist (Lived Experience)","Mental Health First Aid (MHFA)","QPR Suicide Prevention","Safe Messaging Guidelines","Crisis Support","Lifeline Training","OzHelp Framework",
    "Homelessness Services","Street Outreach","Transitional Housing Support","Rapid Rehousing","Housing First Model","Common Ground Approach","SAAP Reporting","SHS Reporting","Homeless Connect Events",
    "Volunteer Management","Volunteer Recruitment","Volunteer Screening","Volunteer Training & Induction","Volunteer Recognition","SEEK Volunteer","GoVolunteer","Volaby (Volunteer Management Software)",
    "Fundraising","Individual Giving","Major Gifts","Bequest Programme","Foundation Grants","Government Grants","Corporate Partnerships","Community Events Fundraising","Peer-to-Peer Fundraising","Digital Fundraising","Raisely","GiveNow","Every1","Blackbaud Raiser's Edge","Salesforce Nonprofit (NPSP)",
    "NGO / Non-Profit Management","Strategic Planning (Non-Profit)","Board Governance","Treasury Management (Non-Profit)","ACNC Compliance","DGR Status","Grant Writing","Grant Acquittal","Programme Management","Theory of Change","Logical Framework (Logframe)","Social Return on Investment (SROI)","Monitoring & Evaluation (M&E)","Impact Measurement","Social Procurement","B Corp Certification",
    "International Development","Humanitarian Response","UNHCR Standards","Sphere Handbook","IASC Cluster System","INGO Operations","Field Operations","Refugee Services","Asylum Seeker Support","WASH (Water Sanitation Hygiene)","Food Security & Livelihoods","Emergency Education","Gender-Based Violence (GBV) Programming","Protection Monitoring","Inter-Agency Coordination","OCHA Coordination","Rapid Needs Assessment","PDM Surveys","MEAL (Monitoring Evaluation Accountability Learning)",
  ],
};

// Flatten all skills, deduplicate
const ALL_TECH = [...new Set(Object.values(SKILL_CATS).flat())];

/* ═══════════════════════════════════════════════════════════════
   SOFT SKILLS & LANGUAGES
═══════════════════════════════════════════════════════════════ */
const SOFT_OPS = [
  "Leadership","Communication","Problem-Solving","Critical Thinking","Teamwork","Adaptability","Time Management",
  "Project Management","Strategic Planning","Decision-Making","Conflict Resolution","Emotional Intelligence",
  "Mentoring","Coaching","Negotiation","Presentation Skills","Stakeholder Management","Customer Service",
  "Creative Thinking","Attention to Detail","Multitasking","Self-Motivation","Initiative",
  "Cross-functional Collaboration","Change Management","Risk Management","Process Improvement",
  "Analytical Thinking","Research Skills","Report Writing","Public Speaking","Active Listening","Empathy",
  "Accountability","Integrity","Resilience","Innovation","Networking","Budgeting & Forecasting",
  "Team Building","Talent Development","Design Thinking","Business Development","Client Relations",
  "Data-Driven Decision Making","Product Strategy","UX Mindset","Agile Methodology","Kanban",
  "Business Strategy","Growth Mindset","Cultural Intelligence","Executive Communication",
  "Relationship Building","Prioritisation","Delegation","Meeting Facilitation","Vendor Management",
  "Contract Negotiation","Performance Management","OKR Planning","Persuasion","Diplomatic Communication",
  "Organisational Awareness","Results Orientation","Self-Awareness","Stress Management","Conflict Mediation",
  "Strategic Thinking","Systems Thinking","Entrepreneurial Mindset","Curiosity","Continuous Learning",
  "Cross-Cultural Communication","Inclusive Leadership","People Management","Servant Leadership",
  "Transformational Leadership","Facilitation","Workshop Design","Collaborative Problem Solving",
  "Commercial Acumen","Customer Empathy","Solution-Oriented Mindset","Big Picture Thinking",
];

const LANG_OPS = [
  "English (Native)","English (Fluent)","English (Professional)","English (Conversational)",
  "Mandarin Chinese (Native)","Mandarin Chinese (Fluent)","Mandarin Chinese (Conversational)",
  "Malay (Native)","Malay (Fluent)","Malay (Conversational)",
  "Bahasa Indonesia (Native)","Bahasa Indonesia (Fluent)","Bahasa Indonesia (Conversational)",
  "Tamil (Native)","Tamil (Fluent)","Hindi (Native)","Hindi (Fluent)","Hindi (Conversational)",
  "Spanish (Native)","Spanish (Fluent)","Spanish (Conversational)",
  "French (Native)","French (Fluent)","French (Conversational)",
  "German (Native)","German (Fluent)","German (Conversational)",
  "Japanese (Native)","Japanese (Fluent)","Japanese (Conversational)","JLPT N1","JLPT N2","JLPT N3",
  "Korean (Native)","Korean (Fluent)","Korean (Conversational)","TOPIK Level 5/6","TOPIK Level 3/4",
  "Arabic (Native)","Arabic (Fluent)","Arabic (Conversational)","Arabic (Modern Standard)",
  "Portuguese (Fluent)","Portuguese (Conversational)","Russian (Fluent)","Russian (Conversational)",
  "Italian (Fluent)","Italian (Conversational)","Dutch (Fluent)","Dutch (Conversational)",
  "Swedish (Fluent)","Norwegian (Fluent)","Danish (Fluent)","Finnish (Conversational)",
  "Vietnamese (Native)","Vietnamese (Fluent)","Thai (Native)","Thai (Fluent)",
  "Tagalog / Filipino (Native)","Tagalog / Filipino (Fluent)",
  "Cantonese (Native)","Cantonese (Fluent)","Cantonese (Conversational)",
  "Bengali (Native)","Bengali (Fluent)","Urdu (Native)","Urdu (Fluent)","Punjabi (Native)",
  "Swahili (Fluent)","Hebrew (Fluent)","Persian / Farsi (Fluent)","Turkish (Fluent)",
  "Greek (Fluent)","Polish (Fluent)","Ukrainian (Native)","Ukrainian (Fluent)",
  "Serbian (Fluent)","Croatian (Fluent)","Czech (Fluent)","Hungarian (Fluent)",
  "Nepali (Native)","Sinhalese (Native)","Burmese (Native)","Khmer (Native)","Lao (Native)",
  "Afrikaans (Native)","Afrikaans (Fluent)","Zulu (Fluent)","Amharic (Native)","Hausa (Native)","Yoruba (Native)",
  "Cantonese (Business Level)","Hokkien (Fluent)","Teochew (Fluent)","Hakka (Conversational)",
  "Sign Language (Auslan)","Sign Language (ASL)","Sign Language (BSL)","Braille (Literacy)",
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const MM={"1":"Jan","01":"Jan","jan":"Jan","january":"Jan","2":"Feb","02":"Feb","feb":"Feb","february":"Feb","3":"Mar","03":"Mar","mar":"Mar","march":"Mar","4":"Apr","04":"Apr","apr":"Apr","april":"Apr","5":"May","05":"May","may":"May","6":"Jun","06":"Jun","jun":"Jun","june":"Jun","7":"Jul","07":"Jul","jul":"Jul","july":"Jul","8":"Aug","08":"Aug","aug":"Aug","august":"Aug","9":"Sep","09":"Sep","sep":"Sep","sept":"Sep","september":"Sep","10":"Oct","oct":"Oct","october":"Oct","11":"Nov","nov":"Nov","november":"Nov","12":"Dec","dec":"Dec","december":"Dec"};
function fmtD(str){if(!str)return"";const t=str.trim(),low=t.toLowerCase().replace(/\s+/g," ").trim();if(["present","current","now","ongoing"].includes(low))return"Present";const m1=low.match(/^([a-z]+)\s*(\d{4})$/);if(m1&&MM[m1[1]])return MM[m1[1]]+" "+m1[2];const m2=low.match(/^(\d{1,2})[\/\-](\d{4})$/);if(m2&&MM[m2[1]])return MM[m2[1]]+" "+m2[2];const m3=low.match(/^(\d{4})[\/\-](\d{1,2})$/);if(m3&&MM[m3[2]])return MM[m3[2]]+" "+m3[1];if(/^\d{4}$/.test(low))return t;return t.charAt(0).toUpperCase()+t.slice(1);}
function fmtR(s,e,cur){const a=fmtD(s),b=cur?"Present":fmtD(e);if(!a&&!b)return"";if(!a)return b;if(!b)return a;return`${a} \u2013 ${b}`;}
const LW=new Set(["of","the","a","an","in","at","on","and","or","for","with","to","by","from","&"]);
function toTC(str){if(!str)return str;return str.split(" ").map((w,i)=>{if(!w)return w;const lw=w.toLowerCase();if(i>0&&LW.has(lw))return lw;return w.charAt(0).toUpperCase()+w.slice(1);}).join(" ");}
const mkExp=()=>({id:Date.now()+Math.random(),company:"",title:"",start:"",end:"",current:false,desc:""});
const mkEdu=()=>({id:Date.now()+Math.random(),school:"",degree:"",field:"",start:"",end:"",gpa:""});

/* ═══════════════════════════════════════════════════════════════
   TAG SELECT — with industry category filter
═══════════════════════════════════════════════════════════════ */
function TagSelect({selected,onChange,options,cats,placeholder,chipBg="#1e3a5f",chipColor="#93c5fd",accent="#2563eb"}){
  const [q,setQ]=useState(""),[ open,setOpen]=useState(false),[hov,setHov]=useState(-1),[cat,setCat]=useState("All");
  const ref=useRef(null);
  const catOps=cat==="All"?options:(cats?cats[cat]||[]:options);
  const filt=catOps.filter(o=>o.toLowerCase().includes(q.toLowerCase())&&!selected.includes(o)).slice(0,10);
  const canAdd=q.trim().length>0&&!options.some(o=>o.toLowerCase()===q.trim().toLowerCase())&&!selected.includes(q.trim());
  const total=filt.length+(canAdd?1:0);
  const add=v=>{const t=v.trim();if(t&&!selected.includes(t))onChange([...selected,t]);setQ("");setHov(-1);if(ref.current)ref.current.focus();};
  const rm=v=>onChange(selected.filter(s=>s!==v));
  const onKD=e=>{if(e.key==="Enter"||e.key===","){e.preventDefault();if(hov>=0&&hov<filt.length)add(filt[hov]);else if(hov===filt.length&&canAdd)add(q);else if(q.trim())add(q);}else if(e.key==="Backspace"&&!q&&selected.length>0)rm(selected[selected.length-1]);else if(e.key==="ArrowDown"){e.preventDefault();setHov(h=>Math.min(h+1,total-1));}else if(e.key==="ArrowUp"){e.preventDefault();setHov(h=>Math.max(h-1,-1));}else if(e.key==="Escape")setOpen(false);};
  const catNames=cats?Object.keys(cats):[];
  return(
    <div style={{position:"relative"}}>
      {/* Category filter pills */}
      {cats&&(
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
          {["All",...catNames].map(c=>(
            <button key={c} onClick={()=>{setCat(c);setQ("");}} style={{padding:"3px 10px",borderRadius:20,border:"1px solid "+(cat===c?accent:"#1e293b"),background:cat===c?accent+"22":"transparent",color:cat===c?accent:"#475569",fontSize:10,cursor:"pointer",fontFamily:"system-ui",fontWeight:cat===c?700:400,whiteSpace:"nowrap",transition:"all .12s"}}>
              {c==="All"?"🌐 All Industries":c}
            </button>))}
        </div>)}
      <div onClick={()=>{setOpen(true);if(ref.current)ref.current.focus();}} style={{minHeight:46,padding:"6px 10px 4px",background:"#0f172a",border:"1px solid "+(open?"#f59e0b":"#1e293b"),borderRadius:8,cursor:"text",display:"flex",flexWrap:"wrap",gap:6,alignItems:"center",transition:"border-color .15s"}}>
        {selected.map(s=><span key={s} style={{background:chipBg,color:chipColor,borderRadius:6,padding:"3px 7px 3px 10px",fontSize:12,fontFamily:"system-ui",display:"flex",alignItems:"center",gap:3,fontWeight:500}}>{s}<span onMouseDown={e=>{e.preventDefault();e.stopPropagation();rm(s);}} style={{cursor:"pointer",fontSize:15,lineHeight:1,opacity:.72,marginLeft:1}}>×</span></span>)}
        <input ref={ref} value={q} onChange={e=>{setQ(e.target.value);setOpen(true);setHov(-1);}} onKeyDown={onKD} onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>{setOpen(false);setHov(-1);},180)} placeholder={selected.length===0?placeholder:"Type to search or add more\u2026"} style={{background:"transparent",border:"none",outline:"none",color:"#e2e8f0",fontSize:13,fontFamily:"system-ui",flex:1,minWidth:140,padding:"3px 4px"}}/>
      </div>
      {open&&(filt.length>0||canAdd)&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#1e293b",border:"1px solid #334155",borderRadius:10,maxHeight:240,overflowY:"auto",zIndex:300,boxShadow:"0 12px 32px rgba(0,0,0,.55)"}}>
          {filt.length===0&&<div style={{padding:"10px 14px",fontSize:12,color:"#475569",fontFamily:"system-ui"}}>No matches — press Enter to add custom</div>}
          {filt.map((o,i)=><div key={o} onMouseDown={()=>add(o)} onMouseEnter={()=>setHov(i)} style={{padding:"9px 14px",fontSize:13,fontFamily:"system-ui",color:hov===i?"#fff":"#cbd5e1",cursor:"pointer",background:hov===i?accent:"transparent",borderBottom:"1px solid rgba(255,255,255,.04)",transition:"background .08s"}}>{o}</div>)}
          {canAdd&&<div onMouseDown={()=>add(q)} onMouseEnter={()=>setHov(filt.length)} style={{padding:"9px 14px",fontSize:13,fontFamily:"system-ui",color:hov===filt.length?"#fff":"#f59e0b",cursor:"pointer",background:hov===filt.length?"#92400e":"rgba(245,158,11,.08)",fontStyle:"italic",borderTop:"1px solid rgba(255,255,255,.06)"}}>+ Add "{q.trim()}"</div>}
        </div>)}
      {selected.length>0&&<div style={{marginTop:5,fontSize:11,color:"#334155",fontFamily:"system-ui"}}>{selected.length} selected · Backspace removes last</div>}
    </div>);
}

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const INP={width:"100%",padding:"10px 14px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,color:"#e2e8f0",fontSize:14,outline:"none",fontFamily:"system-ui,sans-serif",transition:"border-color .15s"};
const LBL={display:"block",fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6,fontFamily:"system-ui",textTransform:"uppercase",letterSpacing:1};
const FLD={marginBottom:20};
const G2={display:"grid",gridTemplateColumns:"1fr 1fr",gap:16};

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [step,setStep]=useState(0);
  const [loading,setLoading]=useState(false);
  const [aiData,setAiData]=useState(null);
  const [error,setError]=useState("");
  const [photo,setPhoto]=useState(null);
  const [drag,setDrag]=useState(false);
  const [portfolio,setPortfolio]=useState([]);
  const [portDrag,setPortDrag]=useState(false);
  const resumeRef=useRef(null);
  const fRef=useRef(null);
  const portRef=useRef(null);

  const [P,setP]=useState({name:"",email:"",phone:"",location:"",linkedin:"",website:"",role:""});
  const [exps,setExps]=useState([mkExp()]);
  const [edus,setEdus]=useState([mkEdu()]);
  const [skills,setSkills]=useState({tech:[],soft:[],langs:[],certs:""});

  const updP=(k,v)=>setP(p=>({...p,[k]:v}));
  const updE=(id,k,v)=>setExps(e=>e.map(x=>x.id===id?{...x,[k]:v}:x));
  const updEd=(id,k,v)=>setEdus(e=>e.map(x=>x.id===id?{...x,[k]:v}:x));

  const applyPhoto=f=>{if(!f||!f.type.startsWith("image/"))return;const r=new FileReader();r.onload=e=>setPhoto(e.target.result);r.readAsDataURL(f);};

  // Portfolio file handler
  const addPortFiles=files=>{
    Array.from(files).forEach(f=>{
      if(portfolio.length>=10)return;
      const isImg=f.type.startsWith("image/");
      const isPdf=f.type==="application/pdf";
      if(!isImg&&!isPdf)return;
      const r=new FileReader();
      r.onload=e=>setPortfolio(prev=>[...prev,{id:Date.now()+Math.random(),name:f.name,type:f.type,isImage:isImg,data:e.target.result}]);
      r.readAsDataURL(f);
    });
  };

  // ── GENERATE (FIXED) ────────────────────────────────────────────────────
  const generate=async()=>{
    setLoading(true);setError("");
    try{
      const payload={
        personal:P,
        experiences:exps.map(e=>({title:e.title,company:e.company,start:e.start,end:e.end,current:e.current,description:e.desc})),
        education:edus.map(e=>({school:e.school,degree:e.degree,field:e.field,start:e.start,end:e.end,gpa:e.gpa})),
        skills:{tech:Array.isArray(skills.tech)?skills.tech.join(", "):"",soft:Array.isArray(skills.soft)?skills.soft.join(", "):"",langs:Array.isArray(skills.langs)?skills.langs.join(", "):"",certs:skills.certs||""}
      };
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:2000,   // ✅ FIXED: was 1000 — caused truncated JSON → parse error
          messages:[{role:"user",content:`You are a world-class resume writer for Fortune 500 companies. Return ONLY valid JSON, no markdown, no code fences:\n{"summary":"3-4 sentence professional summary","experience":[{"bullets":["4-5 achievement bullets per job"]}]}\n\nRules: Action verbs on every bullet. Quantify with % $ headcount timeframes. 15-22 words per bullet. Target role: ${P.role||"Professional"}.\n\nCandidate:\n${JSON.stringify(payload)}`}]
        })
      });
      // ✅ FIXED: check HTTP status before calling .json()
      if(!res.ok){
        const errTxt=await res.text().catch(()=>"Unknown error");
        throw new Error(`API error ${res.status}: ${errTxt.slice(0,150)}`);
      }
      const data=await res.json();
      // ✅ FIXED: guard against missing content array
      if(!data.content||!Array.isArray(data.content))throw new Error("Unexpected API response format — please retry.");
      const txt=data.content.filter(c=>c.type==="text").map(c=>c.text).join("");
      const match=txt.match(/\{[\s\S]*\}/);
      if(!match)throw new Error("AI did not return valid JSON content — please retry.");
      let parsed;
      try{parsed=JSON.parse(match[0]);}
      catch(pe){throw new Error("Failed to parse AI response. Please try again.");}  // ✅ FIXED: was uncaught SyntaxError "string did not match"
      if(!parsed.summary)parsed.summary="Experienced professional delivering strong results.";
      if(!Array.isArray(parsed.experience))parsed.experience=[];
      setAiData(parsed);setStep(5);
    }catch(err){
      setError(err.message||"Generation failed. Please try again."); // ✅ FIXED: was `catch {}` — error was swallowed
    }
    setLoading(false);
  };

  const printResume=()=>{
    const html=resumeRef.current?.innerHTML;if(!html)return;
    const w=window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${P.name} \u2014 Resume<\/title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Calibri,'Segoe UI',Arial,sans-serif;color:#111;background:#fff;padding:.55in .72in;max-width:820px;margin:0 auto;font-size:10.5pt;line-height:1.4}ul{padding-left:17px}li{margin-bottom:2pt;line-height:1.58}table{border-collapse:collapse;width:100%}img{max-width:100%;display:block}<\/style><\/head><body>${html}<\/body><\/html>`);
    w.document.close();setTimeout(()=>w.print(),400);
  };

  // ── Shared UI helpers ───────────────────────────────────────────────────
  const SC=(id,lbl,body,onRm)=>(
    <div key={id} style={{background:"#0a1628",borderRadius:12,padding:20,marginBottom:16,border:"1px solid #1e293b"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <span style={{fontFamily:"system-ui",fontSize:12,fontWeight:700,color:"#f59e0b",textTransform:"uppercase",letterSpacing:1}}>{lbl}</span>
        {onRm&&<button onClick={onRm} style={{background:"none",border:"1px solid #3f1010",color:"#f87171",borderRadius:6,padding:"3px 12px",cursor:"pointer",fontSize:12,fontFamily:"system-ui"}}>Remove</button>}
      </div>
      {body}
    </div>);
  const addBtn=(lbl,fn)=><button onClick={fn} style={{width:"100%",padding:11,background:"transparent",border:"1.5px dashed #1e293b",borderRadius:10,color:"#475569",cursor:"pointer",fontSize:13,fontFamily:"system-ui",display:"block",marginBottom:4}}>+ {lbl}</button>;
  const DP=v=>v?<span style={{fontSize:11,color:"#f59e0b",fontFamily:"system-ui",marginTop:4,display:"block"}}>{"\u2192"} {fmtD(v)}</span>:null;

  // ── Steps ───────────────────────────────────────────────────────────────
  const renderStep=()=>{
    // STEP 0: Personal
    if(step===0)return(
      <div>
        <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);applyPhoto(e.dataTransfer.files[0]);}} style={{display:"flex",alignItems:"center",gap:20,marginBottom:26,padding:"18px 22px",background:"#0a1628",borderRadius:12,border:"1.5px dashed "+(drag?"#f59e0b":"#1e293b"),transition:"border-color .2s"}}>
          <div onClick={()=>fRef.current?.click()} style={{width:80,height:80,borderRadius:"50%",border:"2.5px solid "+(photo?"#f59e0b":drag?"#f59e0b":"#1e293b"),display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",overflow:"hidden",flexShrink:0,background:photo?"transparent":"#0f172a",transition:"all .2s"}}>
            {photo?<img src={photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>:<div style={{textAlign:"center"}}><div style={{fontSize:26,color:"#334155",lineHeight:1}}>+</div><div style={{fontSize:10,color:"#475569",fontFamily:"system-ui",marginTop:2}}>Photo</div></div>}
          </div>
          <input ref={fRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>applyPhoto(e.target.files[0])}/>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"#e2e8f0",fontFamily:"system-ui",marginBottom:5}}>Profile Photo <span style={{color:"#475569",fontWeight:400,fontSize:12}}>(Optional)</span></div>
            <div style={{fontSize:12,color:"#475569",fontFamily:"system-ui",lineHeight:1.75}}>Drag & drop or click the circle to upload.<br/><span style={{fontSize:11,color:"#334155"}}>JPG or PNG · Recommended for Asia-Pacific markets</span></div>
            {photo&&<button onClick={e=>{e.stopPropagation();setPhoto(null);}} style={{marginTop:8,fontSize:11,color:"#f87171",background:"none",border:"none",cursor:"pointer",fontFamily:"system-ui",padding:0}}>{"\u2715"} Remove</button>}
          </div>
        </div>
        <div style={FLD}><label style={LBL}>Full Name</label><input style={INP} value={P.name} onChange={e=>updP("name",e.target.value)} placeholder="e.g. Sarah Chen"/></div>
        <div style={G2}>
          <div style={FLD}><label style={LBL}>Email</label><input style={INP} value={P.email} onChange={e=>updP("email",e.target.value)} placeholder="sarah@example.com"/></div>
          <div style={FLD}><label style={LBL}>Phone</label><input style={INP} value={P.phone} onChange={e=>updP("phone",e.target.value)} placeholder="+60 12-345 6789"/></div>
        </div>
        <div style={G2}>
          <div style={FLD}><label style={LBL}>Location</label><input style={INP} value={P.location} onChange={e=>updP("location",e.target.value)} placeholder="Kuala Lumpur, Malaysia"/></div>
          <div style={FLD}><label style={LBL}>Position Applying For</label><input style={INP} value={P.role} onChange={e=>updP("role",e.target.value)} placeholder="e.g. UX Designer / Software Engineer"/></div>
        </div>
        <div style={G2}>
          <div style={FLD}><label style={LBL}>LinkedIn URL</label><input style={INP} value={P.linkedin} onChange={e=>updP("linkedin",e.target.value)} placeholder="linkedin.com/in/sarahchen"/></div>
          <div style={FLD}><label style={LBL}>Portfolio / Website</label><input style={INP} value={P.website} onChange={e=>updP("website",e.target.value)} placeholder="sarahchen.design"/></div>
        </div>
      </div>);

    // STEP 1: Experience
    if(step===1)return(
      <div>
        {exps.map((exp,i)=>SC(exp.id,`Work Experience ${i+1}`,(
          <div>
            <div style={G2}>
              <div style={FLD}><label style={LBL}>Job Title</label><input style={INP} value={exp.title} onChange={e=>updE(exp.id,"title",e.target.value)} placeholder="senior graphic designer"/></div>
              <div style={FLD}><label style={LBL}>Company</label><input style={INP} value={exp.company} onChange={e=>updE(exp.id,"company",e.target.value)} placeholder="ogilvy"/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:16,alignItems:"start"}}>
              <div style={FLD}><label style={LBL}>Start Date</label><input style={INP} value={exp.start} onChange={e=>updE(exp.id,"start",e.target.value)} placeholder="jan2022"/>{DP(exp.start)}</div>
              <div style={FLD}><label style={LBL}>End Date</label><input style={{...INP,opacity:exp.current?.35:1}} disabled={exp.current} value={exp.end} onChange={e=>updE(exp.id,"end",e.target.value)} placeholder="apr2026"/>{!exp.current&&DP(exp.end)}</div>
              <div style={{paddingTop:26,display:"flex",alignItems:"center",gap:8}}><input type="checkbox" id={"c"+exp.id} checked={exp.current} onChange={e=>updE(exp.id,"current",e.target.checked)} style={{width:16,height:16,accentColor:"#f59e0b",cursor:"pointer"}}/><label htmlFor={"c"+exp.id} style={{...LBL,margin:0,textTransform:"none",fontSize:12,cursor:"pointer",color:"#94a3b8"}}>Present</label></div>
            </div>
            <div style={FLD}><label style={LBL}>Responsibilities & Achievements</label><textarea style={{...INP,height:96,resize:"vertical",lineHeight:1.6}} value={exp.desc} onChange={e=>updE(exp.id,"desc",e.target.value)} placeholder="Describe your role, key projects, team size, tools, and measurable results. The AI will transform this into strong bullet points."/><span style={{fontSize:11,color:"#334155",fontFamily:"system-ui"}}>Tip: include numbers, team size, revenue — AI uses these for metrics</span></div>
          </div>),exps.length>1?()=>setExps(e=>e.filter(x=>x.id!==exp.id)):null))}
        {addBtn("Add Another Experience",()=>setExps(e=>[...e,mkExp()]))}
      </div>);

    // STEP 2: Education
    if(step===2)return(
      <div>
        {edus.map((edu,i)=>SC(edu.id,`Education ${i+1}`,(
          <div>
            <div style={FLD}><label style={LBL}>Institution</label><input style={INP} value={edu.school} onChange={e=>updEd(edu.id,"school",e.target.value)} placeholder="universiti malaya"/></div>
            <div style={G2}>
              <div style={FLD}><label style={LBL}>Degree</label><input style={INP} value={edu.degree} onChange={e=>updEd(edu.id,"degree",e.target.value)} placeholder="bachelor of design"/></div>
              <div style={FLD}><label style={LBL}>Field of Study</label><input style={INP} value={edu.field} onChange={e=>updEd(edu.id,"field",e.target.value)} placeholder="visual communication"/></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
              <div style={FLD}><label style={LBL}>Start Year</label><input style={INP} value={edu.start} onChange={e=>updEd(edu.id,"start",e.target.value)} placeholder="2019"/>{DP(edu.start)}</div>
              <div style={FLD}><label style={LBL}>End Year</label><input style={INP} value={edu.end} onChange={e=>updEd(edu.id,"end",e.target.value)} placeholder="2023"/>{DP(edu.end)}</div>
              <div style={FLD}><label style={LBL}>GPA (Optional)</label><input style={INP} value={edu.gpa} onChange={e=>updEd(edu.id,"gpa",e.target.value)} placeholder="3.85 / 4.0"/></div>
            </div>
          </div>),edus.length>1?()=>setEdus(e=>e.filter(x=>x.id!==edu.id)):null))}
        {addBtn("Add Another Education",()=>setEdus(e=>[...e,mkEdu()]))}
      </div>);

    // STEP 3: Skills
    if(step===3)return(
      <div>
        <div style={FLD}>
          <label style={LBL}>Technical Skills <span style={{color:"#334155",fontWeight:400,fontSize:10,textTransform:"none",letterSpacing:0}}>— select by industry or type any skill</span></label>
          <TagSelect selected={skills.tech} onChange={v=>setSkills(s=>({...s,tech:v}))} options={ALL_TECH} cats={SKILL_CATS} placeholder="Filter by industry above, or type any skill\u2026" chipBg="#0f2d1a" chipColor="#4ade80" accent="#16a34a"/>
        </div>
        <div style={FLD}>
          <label style={LBL}>Soft Skills</label>
          <TagSelect selected={skills.soft} onChange={v=>setSkills(s=>({...s,soft:v}))} options={SOFT_OPS} placeholder="Search soft skills (e.g. Leadership, Agile)\u2026" chipBg="#1e1a0f" chipColor="#fbbf24" accent="#b45309"/>
        </div>
        <div style={FLD}>
          <label style={LBL}>Languages</label>
          <TagSelect selected={skills.langs} onChange={v=>setSkills(s=>({...s,langs:v}))} options={LANG_OPS} placeholder="Search by language with proficiency\u2026" chipBg="#1a0f2e" chipColor="#c4b5fd" accent="#7c3aed"/>
          <span style={{fontSize:11,color:"#334155",fontFamily:"system-ui",marginTop:4,display:"block"}}>Select with proficiency (e.g. Mandarin Chinese (Fluent)), or type custom</span>
        </div>
        <div style={FLD}>
          <label style={LBL}>Certifications <span style={{color:"#334155",fontWeight:400,textTransform:"none",letterSpacing:0}}>(one per line)</span></label>
          <textarea style={{...INP,height:90,resize:"vertical",lineHeight:1.7}} value={skills.certs} onChange={e=>setSkills(s=>({...s,certs:e.target.value}))} placeholder={"AWS Certified Solutions Architect\nAdobe Certified Professional\nPMP \u2014 Project Management Professional\nCert IV in Graphic Design"}/>
        </div>
      </div>);

    // STEP 4: Portfolio (for designers, photographers, artists, etc.)
    if(step===4)return(
      <div>
        <div style={{background:"#0a1628",borderRadius:12,padding:20,border:"1px solid #1e293b",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:"#e2e8f0",fontFamily:"system-ui",marginBottom:4}}>Portfolio / Work Samples <span style={{color:"#475569",fontWeight:400,fontSize:12}}>(Optional)</span></div>
          <div style={{fontSize:12,color:"#475569",fontFamily:"system-ui",marginBottom:14,lineHeight:1.7}}>Upload images or PDFs of your work. They will appear as thumbnails in your resume.<br/><span style={{color:"#334155"}}>Ideal for designers, photographers, architects, artists, and creative professionals.</span></div>
          <div
            onDragOver={e=>{e.preventDefault();setPortDrag(true);}}
            onDragLeave={()=>setPortDrag(false)}
            onDrop={e=>{e.preventDefault();setPortDrag(false);addPortFiles(e.dataTransfer.files);}}
            onClick={()=>portRef.current?.click()}
            style={{border:"2px dashed "+(portDrag?"#f59e0b":"#1e293b"),borderRadius:10,padding:"28px 16px",textAlign:"center",cursor:"pointer",background:portDrag?"rgba(245,158,11,.05)":"transparent",transition:"all .2s"}}
          >
            <div style={{fontSize:32,marginBottom:8}}>🖼️</div>
            <div style={{fontSize:14,fontWeight:700,color:"#94a3b8",fontFamily:"system-ui",marginBottom:4}}>Drag & drop your work here</div>
            <div style={{fontSize:12,color:"#475569",fontFamily:"system-ui"}}>or click to browse files</div>
            <div style={{fontSize:11,color:"#334155",fontFamily:"system-ui",marginTop:6}}>JPG · PNG · GIF · WebP · PDF · SVG · up to 10 files</div>
          </div>
          <input ref={portRef} type="file" multiple accept="image/*,.pdf,.svg" style={{display:"none"}} onChange={e=>addPortFiles(e.target.files)}/>
          {portfolio.length>0&&(
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,color:"#475569",fontFamily:"system-ui",marginBottom:10}}>{portfolio.length}/10 files uploaded · Images will appear in your resume as thumbnails</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {portfolio.map(p=>(
                  <div key={p.id} style={{position:"relative",background:"#0f172a",borderRadius:8,overflow:"hidden",border:"1px solid #1e293b"}}>
                    {p.isImage
                      ?<img src={p.data} style={{width:"100%",height:80,objectFit:"cover",display:"block"}} alt={p.name}/>
                      :<div style={{height:80,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}><span style={{fontSize:28}}>📄</span><span style={{fontSize:9,color:"#64748b",fontFamily:"system-ui",textAlign:"center",padding:"0 4px",wordBreak:"break-all"}}>{p.name.slice(0,20)}</span></div>}
                    <button onClick={()=>setPortfolio(p2=>p2.filter(x=>x.id!==p.id))} style={{position:"absolute",top:4,right:4,width:20,height:20,borderRadius:"50%",background:"rgba(0,0,0,.7)",border:"none",color:"#fff",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
                    <div style={{padding:"4px 6px",fontSize:9,color:"#64748b",fontFamily:"system-ui",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{p.name}</div>
                  </div>))}
              </div>
            </div>)}
        </div>
        <div style={{background:"#0a1a0a",border:"1px solid #052e16",borderRadius:10,padding:"12px 16px"}}>
          <div style={{fontSize:12,color:"#4ade80",fontFamily:"system-ui",fontWeight:700,marginBottom:6}}>✓ Who should use this section?</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px"}}>
            {["Graphic & UX Designers","Photographers & Videographers","Architects & Interior Designers","Fashion & Textile Designers","Illustrators & Artists","Web & App Designers","Creative Directors","Motion Graphics Designers"].map(t=><div key={t} style={{fontSize:12,color:"#86efac",fontFamily:"system-ui"}}>→ {t}</div>)}
          </div>
        </div>
      </div>);
  };

  // ── Resume Document ────────────────────────────────────────────────────
  const ResumeDoc=()=>{
    if(!aiData)return null;
    const F="Calibri,'Segoe UI',Arial,sans-serif";
    const sh=txt=>(
      <div style={{fontSize:"8.5pt",fontWeight:700,textTransform:"uppercase",letterSpacing:"2.5px",color:"#0b1e4d",borderBottom:"1.8px solid #0b1e4d",paddingBottom:3,marginBottom:10,marginTop:16}}>{txt}</div>);
    const tStr=Array.isArray(skills.tech)?skills.tech.join("  \u00b7  "):"";
    const soStr=Array.isArray(skills.soft)?skills.soft.join("  \u00b7  "):"";
    const laStr=Array.isArray(skills.langs)?skills.langs.join("  \u00b7  "):"";
    return(
      <div style={{fontFamily:F,color:"#111",lineHeight:1.4}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div style={{flex:1}}>
            <div style={{fontSize:"24pt",fontWeight:700,color:"#0b1e4d",letterSpacing:"1.5px",lineHeight:1.1,marginBottom:4}}>{P.name?P.name.toUpperCase():"YOUR NAME"}</div>
            {P.role&&<div style={{fontSize:"11pt",color:"#1e4080",fontWeight:600,letterSpacing:".5px",marginBottom:6,fontFamily:F}}>{toTC(P.role)}</div>}
            <div style={{fontSize:"9pt",color:"#555",display:"flex",flexWrap:"wrap",gap:"0 13px",lineHeight:2,fontFamily:F}}>
              {P.email&&<span>{P.email}</span>}
              {P.phone&&<span>{P.phone}</span>}
              {P.location&&<span>{P.location}</span>}
              {P.linkedin&&<span style={{color:"#1e3a8a"}}>{P.linkedin}</span>}
              {P.website&&<span style={{color:"#1e3a8a"}}>{P.website}</span>}
            </div>
          </div>
          {photo&&<img src={photo} alt={P.name} style={{width:72,height:72,borderRadius:"50%",objectFit:"cover",border:"2.5px solid #0b1e4d",marginLeft:16,flexShrink:0}}/>}
        </div>
        <hr style={{border:"none",borderTop:"2.5px solid #0b1e4d",margin:"6px 0 0"}}/>
        {/* Summary */}
        {aiData.summary&&<>{sh("Professional Summary")}<p style={{fontSize:"10.5pt",lineHeight:1.7,color:"#222",margin:0,fontFamily:F}}>{aiData.summary}</p></>}
        {/* Experience */}
        {exps.some(e=>e.company||e.title)&&<>{sh("Professional Experience")}{exps.map((exp,i)=>!(exp.company||exp.title)?null:(
          <div key={exp.id} style={{marginBottom:12}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}><tbody><tr>
              <td style={{fontWeight:700,fontSize:"11pt",color:"#0b1e4d",fontFamily:F}}>{toTC(exp.title)}</td>
              <td style={{textAlign:"right",fontSize:"9.5pt",color:"#666",whiteSpace:"nowrap",paddingLeft:8,fontStyle:"italic",fontFamily:F}}>{fmtR(exp.start,exp.end,exp.current)}</td>
            </tr></tbody></table>
            {exp.company&&<div style={{fontSize:"10.5pt",color:"#1e4080",fontWeight:600,fontStyle:"italic",marginBottom:3,fontFamily:F}}>{toTC(exp.company)}</div>}
            <ul style={{margin:0,paddingLeft:17}}>{(aiData.experience?.[i]?.bullets||[]).map((b,j)=><li key={j} style={{fontSize:"10.5pt",lineHeight:1.62,marginBottom:2,color:"#1a1a1a",fontFamily:F}}>{b}</li>)}</ul>
          </div>))}</>}
        {/* Education */}
        {edus.some(e=>e.school)&&<>{sh("Education")}{edus.map(edu=>!edu.school?null:(
          <div key={edu.id} style={{marginBottom:8}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}><tbody><tr>
              <td style={{fontWeight:700,fontSize:"11pt",color:"#0b1e4d",fontFamily:F}}>{toTC(edu.school)}</td>
              <td style={{textAlign:"right",fontSize:"9.5pt",color:"#666",whiteSpace:"nowrap",paddingLeft:8,fontStyle:"italic",fontFamily:F}}>{fmtR(edu.start,edu.end,false)}</td>
            </tr></tbody></table>
            <div style={{fontSize:"10.5pt",color:"#333",marginTop:1,fontFamily:F}}>{[toTC(edu.degree),toTC(edu.field)].filter(Boolean).join(", ")}{edu.gpa&&<span style={{color:"#666"}}> · GPA: {edu.gpa}</span>}</div>
          </div>))}
        </>}
        {/* Skills */}
        {(tStr||soStr||skills.certs||laStr)&&<>{sh("Skills & Qualifications")}
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"10.5pt"}}>
            {tStr&&<tr><td style={{fontWeight:700,width:105,paddingBottom:4,verticalAlign:"top",color:"#0b1e4d",paddingRight:8,fontFamily:F}}>Technical</td><td style={{paddingBottom:4,color:"#333",lineHeight:1.65,fontFamily:F}}>{tStr}</td></tr>}
            {soStr&&<tr><td style={{fontWeight:700,paddingBottom:4,verticalAlign:"top",color:"#0b1e4d",paddingRight:8,fontFamily:F}}>Soft Skills</td><td style={{paddingBottom:4,color:"#333",lineHeight:1.65,fontFamily:F}}>{soStr}</td></tr>}
            {laStr&&<tr><td style={{fontWeight:700,paddingBottom:4,verticalAlign:"top",color:"#0b1e4d",paddingRight:8,fontFamily:F}}>Languages</td><td style={{paddingBottom:4,color:"#333",lineHeight:1.65,fontFamily:F}}>{laStr}</td></tr>}
            {skills.certs&&<tr><td style={{fontWeight:700,paddingBottom:4,verticalAlign:"top",color:"#0b1e4d",paddingRight:8,fontFamily:F}}>Certifications</td><td style={{paddingBottom:4,color:"#333",lineHeight:1.75,whiteSpace:"pre-line",fontFamily:F}}>{skills.certs}</td></tr>}
          </table>
        </>}
        {/* Portfolio */}
        {portfolio.length>0&&<>
          {sh("Portfolio Highlights")}
          {portfolio.some(p=>p.isImage)&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:portfolio.some(p=>!p.isImage)?8:0}}>
              {portfolio.filter(p=>p.isImage).slice(0,6).map(p=>(
                <div key={p.id} style={{borderRadius:4,overflow:"hidden",border:"1px solid #dde6f0"}}>
                  <img src={p.data} style={{width:"100%",height:80,objectFit:"cover",display:"block"}} alt={p.name}/>
                  <div style={{fontSize:"7.5pt",color:"#888",padding:"2px 5px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontFamily:F}}>{p.name}</div>
                </div>))}
            </div>)}
          {portfolio.filter(p=>!p.isImage).length>0&&(
            <div>{portfolio.filter(p=>!p.isImage).map(p=><div key={p.id} style={{fontSize:"10pt",color:"#1e3a8a",fontFamily:F,marginBottom:2}}>📎 {p.name}</div>)}</div>)}
        </>}
      </div>);
  };

  // ── Layout ─────────────────────────────────────────────────────────────
  const STEP_LABELS=["Personal","Experience","Education","Skills","Portfolio","Resume"];
  const STEP_ICONS=["✦","◈","◎","◇","⊕","★"];
  const STEP_TITLES=["Tell us about yourself","Your work experience","Education background","Skills & qualifications","Portfolio & work samples"];
  const STEP_SUBS=[
    "Fill in your details and optionally add a profile photo.",
    "Add your work history — more detail produces stronger AI bullets.",
    "Your academic credentials and qualifications.",
    "Search 1,500+ skills across 18 industries, or type any skill.",
    "Upload images or PDFs of your work (ideal for creative professionals).",
  ];

  return(
    <div style={{minHeight:"100vh",background:"#060c1a"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}input:focus,textarea:focus{border-color:#f59e0b!important;box-shadow:0 0 0 3px rgba(245,158,11,.09)!important;outline:none}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0f172a}::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}`}</style>
      {/* Header */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,.04)",padding:"14px 28px",display:"flex",alignItems:"center",gap:12,background:"rgba(0,0,0,.28)",backdropFilter:"blur(12px)"}}>
        <div style={{width:36,height:36,background:"#f59e0b",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:900,color:"#0a0700",flexShrink:0}}>✦</div>
        <div><div style={{fontSize:15,fontWeight:800,color:"#f8fafc",fontFamily:"system-ui"}}>ResumeAI</div><div style={{fontSize:11,color:"#475569",fontFamily:"system-ui"}}>AI-Powered Professional Resume Builder</div></div>
        <div style={{marginLeft:"auto",fontSize:11,color:"#475569",fontFamily:"system-ui"}}><span style={{color:"#22c55e",marginRight:5}}>●</span>1,500+ Skills · 18 Industries</div>
      </div>
      {/* Steps */}
      <div style={{display:"flex",justifyContent:"center",padding:"24px 16px 18px",gap:0,overflowX:"auto"}}>
        {STEP_LABELS.map((label,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
              <div onClick={()=>(aiData||i<=step)&&setStep(i)} style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:i===step?"#f59e0b":i<step?"#0f3d21":"#0f172a",border:"2px solid "+(i===step?"#f59e0b":i<step?"#16a34a":"#1e293b"),fontSize:13,cursor:(aiData||i<=step)?"pointer":"default",color:i<step?"#4ade80":"#fff",transition:"all .2s",fontWeight:i<step?700:400,userSelect:"none"}}>
                {i<step?"✓":STEP_ICONS[i]}
              </div>
              <span style={{fontSize:10,color:i===step?"#f59e0b":i<step?"#4ade80":"#334155",fontFamily:"system-ui",fontWeight:i===step?700:500,whiteSpace:"nowrap"}}>{label}</span>
            </div>
            {i<STEP_LABELS.length-1&&<div style={{width:40,height:1.5,background:i<step?"#16a34a":"#1e293b",margin:"0 3px",marginBottom:18,flexShrink:0}}/>}
          </div>))}
      </div>
      {/* Content */}
      <div style={{maxWidth:740,margin:"0 auto",padding:"0 20px 60px"}}>
        {step<5?(
          <div style={{background:"#111827",borderRadius:16,border:"1px solid rgba(255,255,255,.06)",padding:"30px 34px"}}>
            <div style={{marginBottom:24,paddingBottom:20,borderBottom:"1px solid #0f172a"}}>
              <h2 style={{fontSize:19,fontWeight:700,color:"#f1f5f9",margin:"0 0 5px",fontFamily:"system-ui"}}>{STEP_TITLES[step]}</h2>
              <p style={{fontSize:13,color:"#475569",margin:0,fontFamily:"system-ui"}}>{STEP_SUBS[step]}</p>
            </div>
            {renderStep()}
            {error&&<div style={{background:"#160606",border:"1px solid #450a0a",borderRadius:8,padding:"12px 16px",color:"#f87171",fontSize:13,fontFamily:"system-ui",marginBottom:12}}>{"\u26a0"} {error}</div>}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:20,borderTop:"1px solid #0f172a"}}>
              <button onClick={()=>step>0&&setStep(s=>s-1)} disabled={step===0} style={{padding:"10px 22px",background:"transparent",border:"1px solid "+(step===0?"#0f172a":"#1e293b"),borderRadius:8,color:step===0?"#1e293b":"#64748b",cursor:step===0?"not-allowed":"pointer",fontSize:14,fontFamily:"system-ui"}}>← Back</button>
              {step<4
                ?<button onClick={()=>setStep(s=>s+1)} style={{padding:"10px 28px",background:"#f59e0b",border:"none",borderRadius:8,color:"#0a0700",fontWeight:700,cursor:"pointer",fontSize:14,fontFamily:"system-ui"}}>Continue →</button>
                :<button onClick={generate} disabled={loading} style={{padding:"10px 28px",background:loading?"#1e293b":"#f59e0b",border:"none",borderRadius:8,color:loading?"#475569":"#0a0700",fontWeight:700,cursor:loading?"not-allowed":"pointer",fontSize:14,fontFamily:"system-ui",display:"flex",alignItems:"center",gap:10,minWidth:220,justifyContent:"center"}}>
                  {loading?<><span style={{display:"inline-block",width:14,height:14,border:"2px solid #475569",borderTop:"2px solid #94a3b8",borderRadius:"50%",animation:"spin .8s linear infinite"}}></span>AI generating\u2026</>:"\u2728 Generate My Resume"}
                </button>}
            </div>
          </div>
        ):(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <div><h2 style={{fontSize:19,fontWeight:700,color:"#f1f5f9",margin:"0 0 3px",fontFamily:"system-ui"}}>🎉 Your Resume is Ready!</h2><p style={{fontSize:12,color:"#475569",margin:0,fontFamily:"system-ui"}}>AI-optimised · ATS-friendly · Professional</p></div>
              <div style={{display:"flex",gap:10,flexShrink:0}}>
                <button onClick={()=>{setAiData(null);setStep(0);}} style={{padding:"8px 16px",background:"transparent",border:"1px solid #1e293b",borderRadius:8,color:"#64748b",cursor:"pointer",fontSize:12,fontFamily:"system-ui"}}>✎ Edit</button>
                <button onClick={printResume} style={{padding:"8px 18px",background:"#f59e0b",border:"none",borderRadius:8,color:"#0a0700",fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"system-ui"}}>{"\u2193"} Download PDF</button>
              </div>
            </div>
            <div style={{background:"#fff",borderRadius:12,padding:"52px 60px",boxShadow:"0 20px 60px rgba(0,0,0,.6)",marginBottom:18}}>
              <div ref={resumeRef}><ResumeDoc/></div>
            </div>
            <div style={{background:"#05140b",border:"1px solid #052e16",borderRadius:10,padding:"14px 18px"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#4ade80",marginBottom:8,fontFamily:"system-ui"}}>✓ What's been optimised</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px 20px"}}>
                {["Dates auto-formatted → Dec 2024 – Apr 2026","Titles & company names in Title Case","Achievement bullets with action verbs & metrics","Professional summary tailored to your target role","ATS-optimised — passes Fortune 500 screening","Portfolio images embedded as thumbnails (if uploaded)"].map((t,i)=>(
                  <div key={i} style={{fontSize:11,color:"#86efac",fontFamily:"system-ui",lineHeight:1.7,display:"flex",gap:7}}><span style={{color:"#4ade80",flexShrink:0}}>{"\u2192"}</span>{t}</div>))}
              </div>
            </div>
          </div>)}
      </div>
    </div>);
}
