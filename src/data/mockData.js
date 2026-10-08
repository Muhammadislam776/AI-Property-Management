export const propertiesData = [
  {
    id: "prop-1",
    name: "Skyline Crest Luxury Tower",
    address: "742 Evergreen Blvd, Metro City",
    totalUnits: 124,
    occupiedUnits: 121,
    occupancyRate: 97.6,
    monthlyRevenue: 284500,
    activeTickets: 3,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-2",
    name: "The Silicon Lofts",
    address: "108 Innovation Way, Tech District",
    totalUnits: 88,
    occupiedUnits: 85,
    occupancyRate: 96.6,
    monthlyRevenue: 198000,
    activeTickets: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-3",
    name: "Oakridge Terraces",
    address: "415 Oak Park Lane, Greenfield",
    totalUnits: 65,
    occupiedUnits: 62,
    occupancyRate: 95.4,
    monthlyRevenue: 132000,
    activeTickets: 2,
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "prop-4",
    name: "Pacific Bay Residences",
    address: "880 Ocean Shore Dr, Waterfront",
    totalUnits: 95,
    occupiedUnits: 91,
    occupancyRate: 95.8,
    monthlyRevenue: 215400,
    activeTickets: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  }
];

export const initialMaintenanceTickets = [
  {
    id: "TICK-8092",
    propertyId: "prop-1",
    propertyName: "Skyline Crest Luxury Tower",
    unit: "Unit 408",
    tenantName: "Sarah Jenkins",
    tenantPhone: "(555) 349-8812",
    reportedAt: "Today at 08:42 AM",
    description: "Sudden pipe burst under the master bathroom sink. Water is rapidly pooling on the laminate floor and seeping toward the hallway baseboards. Valve seems stuck.",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      category: "Emergency Plumbing",
      urgency: "CRITICAL",
      urgencyScore: 98,
      riskLevel: "High Risk of Structural & Floor Delamination",
      estimatedCost: "$220 - $310",
      confidence: 99.4,
      diagnosisText: "Computer vision detects pressurized supply line rupture with pooled standing water. High probability of sub-floor moisture ingress if shut-off is delayed.",
      recommendedContractor: {
        id: "CONT-101",
        name: "Apex 24/7 Rapid Response Plumbing",
        rating: 4.95,
        completedJobs: 142,
        eta: "25 - 35 mins",
        phone: "(555) 911-PIPE",
        insuranceVerified: true
      }
    },
    status: "AI Triaged", // Requested, AI Triaged, Assigned, In Progress, Resolved
    stageIndex: 1,
    assignedContractor: "Apex 24/7 Rapid Response Plumbing",
    timeline: [
      { stage: "Requested", time: "08:42 AM", desc: "Submitted by tenant Sarah Jenkins via mobile portal with 1 photo." },
      { stage: "AI Triaged", time: "08:43 AM", desc: "AuraVision AI classified as Critical Plumbing emergency (99.4% confidence). Water shut-off instructions auto-sent to tenant." },
      { stage: "Contractor Assigned", time: "Pending Manager Approval / Auto-dispatch", desc: "Apex 24/7 queued as priority contractor." },
      { stage: "In Progress", time: "--", desc: "Contractor on-site diagnosis and repair." },
      { stage: "Resolved", time: "--", desc: "Post-repair photo verification & tenant sign-off." }
    ]
  },
  {
    id: "TICK-8089",
    propertyId: "prop-2",
    propertyName: "The Silicon Lofts",
    unit: "Unit 214",
    tenantName: "Marcus Vance",
    tenantPhone: "(555) 782-9901",
    reportedAt: "Yesterday at 04:15 PM",
    description: "HVAC central unit is blowing warm air intermittently and making a loud buzzing rattle during compressor startup cycles. Inside temperature is 78°F.",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      category: "HVAC / Climate Control",
      urgency: "MEDIUM",
      urgencyScore: 65,
      riskLevel: "Compressor Capacitor or Relay Degradation",
      estimatedCost: "$175 - $240",
      confidence: 94.2,
      diagnosisText: "Acoustic and thermal description matches run-capacitor failure or low refrigerant pressure. Non-emergency but requires service within 24h.",
      recommendedContractor: {
        id: "CONT-102",
        name: "EcoAir Climate Solutions",
        rating: 4.88,
        completedJobs: 98,
        eta: "Next day 9:00 AM",
        phone: "(555) 321-AIR1",
        insuranceVerified: true
      }
    },
    status: "In Progress",
    stageIndex: 3,
    assignedContractor: "EcoAir Climate Solutions",
    timeline: [
      { stage: "Requested", time: "Oct 7, 04:15 PM", desc: "Tenant reported intermittent warm air and rattling compressor." },
      { stage: "AI Triaged", time: "Oct 7, 04:16 PM", desc: "Triaged as Medium severity HVAC capacitor failure. Recommended EcoAir." },
      { stage: "Contractor Assigned", time: "Oct 7, 05:00 PM", desc: "Assigned to EcoAir Climate Solutions by Operations Desk." },
      { stage: "In Progress", time: "Today at 09:30 AM", desc: "Technician Dave Miller arrived on-site; diagnostic gauges connected." },
      { stage: "Resolved", time: "--", desc: "Awaiting final capacitor swap and amp-draw test." }
    ]
  },
  {
    id: "TICK-8077",
    propertyId: "prop-3",
    propertyName: "Oakridge Terraces",
    unit: "Unit 102",
    tenantName: "Elena Rostova",
    tenantPhone: "(555) 441-2099",
    reportedAt: "Oct 6, 11:30 AM",
    description: "Kitchen GFCI electrical outlet sparked briefly when plugging in toaster oven and tripped breaker panel sub-switch.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      category: "Electrical Safety",
      urgency: "HIGH",
      urgencyScore: 84,
      riskLevel: "Potential Receptacle Arc Fault",
      estimatedCost: "$140 - $190",
      confidence: 96.8,
      diagnosisText: "Arc event inside 20A GFCI receptacle indicates terminal wire loosening or receptacle internal wear. Breaker trip prevented wire insulation thermal event.",
      recommendedContractor: {
        id: "CONT-103",
        name: "VoltMaster Electrical Services",
        rating: 4.92,
        completedJobs: 210,
        eta: "Same day within 2h",
        phone: "(555) 777-VOLT",
        insuranceVerified: true
      }
    },
    status: "Resolved",
    stageIndex: 4,
    assignedContractor: "VoltMaster Electrical Services",
    timeline: [
      { stage: "Requested", time: "Oct 6, 11:30 AM", desc: "Tenant reported GFCI spark and breaker trip." },
      { stage: "AI Triaged", time: "Oct 6, 11:31 AM", desc: "Classified as High Urgency electrical hazard; safety protocol prompt issued." },
      { stage: "Contractor Assigned", time: "Oct 6, 11:45 AM", desc: "VoltMaster dispatched on rapid callout." },
      { stage: "In Progress", time: "Oct 6, 01:15 PM", desc: "Master electrician replaced 20A commercial grade GFCI and checked grounding." },
      { stage: "Resolved", time: "Oct 6, 02:40 PM", desc: "Outlet certified compliant with NFPA 70. Tenant tested and signed off." }
    ]
  }
];

export const sampleLeaseDocument = {
  id: "LEASE-2026-081",
  property: "Skyline Crest Luxury Tower",
  unit: "Apartment 4B (1,240 sq ft, 2 Bed / 2 Bath)",
  tenant: "Sarah Jenkins",
  leaseTerm: "12 Months (Nov 1, 2025 – Oct 31, 2026)",
  monthlyRent: "$2,850.00 USD",
  securityDeposit: "$2,850.00 USD",
  status: "Active & Verified",
  clauses: [
    {
      id: "clause-1",
      number: "1. PARTIES & PREMISES",
      title: "Parties, Premises & Occupancy Limits",
      text: "This Residential Lease Agreement is entered into between Skyline Crest Real Estate Holdings LLC ('Landlord') and Sarah Jenkins ('Tenant'). The premises shall be occupied strictly as a private residential dwelling by the named Tenant and no more than two (2) approved occupants without prior written consent."
    },
    {
      id: "clause-4",
      number: "4. RENT & LATE FEES",
      title: "Monthly Rent Schedule, Grace Period & Late Penalty",
      text: "Rent of $2,850.00 USD is due on or before the first (1st) day of each calendar month. A grace period is extended through 11:59 PM on the fifth (5th) calendar day. If rent is not received by the Landlord by the expiration of the grace period on the 5th day, an initial late assessment fee of $75.00 shall immediately apply, plus a daily supplemental charge of $10.00 per day until unpaid balances are satisfied in full."
    },
    {
      id: "clause-7",
      number: "7. SECURITY DEPOSIT",
      title: "Security Deposit Terms & Return Timeline",
      text: "Tenant has deposited $2,850.00 as security for full performance. The deposit is held in an FDIC-insured escrow account at Chase Bank. Within twenty-one (21) days following lawful surrender of the premises, Landlord shall return the deposit minus allowable itemized deductions for damages beyond reasonable wear and tear."
    },
    {
      id: "clause-9",
      number: "9. PET POLICY & ANIMAL REGULATIONS",
      title: "Domestic Pet Allowances, Weight Restrictions & Fees",
      text: "Tenant is permitted to keep a maximum of two (2) domestic pets (cats or dogs) weighing under forty-five (45) pounds each, subject to registration and veterinary vaccination records. A non-refundable pet sanitation deposit of $300.00 and an ongoing monthly pet rent of $35.00 per approved animal applies. Commercial breeding, unregistered exotic animals, or aggressive breeds listed in Addendum B are strictly prohibited."
    },
    {
      id: "clause-14",
      number: "14. MAINTENANCE & REPAIRS",
      title: "Tenant Obligations, Emergency Triage & Notice",
      text: "Tenant agrees to promptly report any water leaks, electrical anomalies, or equipment malfunctions through the AuraProp digital portal within 12 hours of discovery. Landlord provides 24/7 on-call dispatch for plumbing emergencies and structural hazards. Tenant shall not perform unauthorized self-repairs, pipe modifications, or wall perforations exceeding standard picture frame fasteners."
    },
    {
      id: "clause-18",
      number: "18. SUBLETTING & SHORT-TERM RENTALS",
      title: "Prohibition on Subletting, Airbnb & Commercial Use",
      text: "Tenant shall NOT assign this Lease, sublet all or any portion of the premises, or list the unit on short-term rental platforms including Airbnb, VRBO, or corporate stay networks under any circumstances. Violation constitutes a material and non-curable lease breach warranting immediate 3-day notice of eviction and forfeiture of security deposit."
    },
    {
      id: "clause-22",
      number: "22. LEASE RENEWAL & TERMINATION NOTICE",
      title: "Termination Notice Window & Renewal Mechanics",
      text: "Either party must deliver a written notice of intent to terminate or non-renew at least sixty (60) days prior to the expiration of the lease term. In the absence of timely 60-day notice, the lease automatically transitions into a month-to-month tenancy at prevailing market rate plus an administrative 10% premium."
    }
  ]
};

export const leaseQAPresets = [
  {
    query: "What is the late fee policy and grace period?",
    clauseId: "clause-4",
    shortAnswer: "Rent is due on the 1st. There is a 5-day grace period until the 5th at 11:59 PM. After the 5th, a $75 initial late fee is assessed, plus $10/day until paid in full.",
    highlightText: "A grace period is extended through 11:59 PM on the fifth (5th) calendar day. If rent is not received by the Landlord by the expiration of the grace period on the 5th day, an initial late assessment fee of $75.00 shall immediately apply, plus a daily supplemental charge of $10.00 per day"
  },
  {
    query: "Can I bring a pet dog or cat into the apartment?",
    clauseId: "clause-9",
    shortAnswer: "Yes, up to two (2) domestic pets under 45 lbs are permitted with vet records. Requires a $300 one-time sanitation deposit and $35/month pet rent per animal.",
    highlightText: "Tenant is permitted to keep a maximum of two (2) domestic pets (cats or dogs) weighing under forty-five (45) pounds each, subject to registration and veterinary vaccination records. A non-refundable pet sanitation deposit of $300.00 and an ongoing monthly pet rent of $35.00 per approved animal applies."
  },
  {
    query: "Can I sublet my unit or list it on Airbnb during vacation?",
    clauseId: "clause-18",
    shortAnswer: "No, subletting and short-term rentals (Airbnb/VRBO) are strictly prohibited and constitute immediate material breach with 3-day notice of termination.",
    highlightText: "Tenant shall NOT assign this Lease, sublet all or any portion of the premises, or list the unit on short-term rental platforms including Airbnb, VRBO, or corporate stay networks under any circumstances."
  },
  {
    query: "How much notice must I provide before moving out?",
    clauseId: "clause-22",
    shortAnswer: "A minimum of sixty (60) days written notice is required prior to lease expiration to prevent automatic month-to-month rollover.",
    highlightText: "Either party must deliver a written notice of intent to terminate or non-renew at least sixty (60) days prior to the expiration of the lease term."
  }
];

export const initialMessages = [
  {
    id: "MSG-301",
    tenantId: "TEN-408",
    tenantName: "Sarah Jenkins",
    unit: "Unit 408 - Skyline Crest",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    unread: true,
    timestamp: "10:14 AM",
    subject: "Emergency Plumbing Status & Hallway Carpet Dampness",
    body: "Hi team, I reported the master bathroom pipe rupture earlier this morning. The water shutoff valve is holding for now, but there is some dampness reaching the threshold carpet. Do we know exactly what time Apex Plumbing will arrive? Also will the building cover the industrial blowers to dry the floor?",
    thread: [
      {
        sender: "tenant",
        time: "08:42 AM",
        text: "I submitted the emergency ticket for the bathroom pipe rupture. Please dispatch someone right away!"
      },
      {
        sender: "system",
        time: "08:43 AM",
        text: "AuraProp AI: Critical priority ticket TICK-8092 created. Shut-off guidance dispatched to tenant."
      },
      {
        sender: "tenant",
        time: "10:14 AM",
        text: "Hi team, I reported the master bathroom pipe rupture earlier this morning. The water shutoff valve is holding for now, but there is some dampness reaching the threshold carpet. Do we know exactly what time Apex Plumbing will arrive? Also will the building cover the industrial blowers to dry the floor?"
      }
    ]
  },
  {
    id: "MSG-302",
    tenantId: "TEN-214",
    tenantName: "Marcus Vance",
    unit: "Unit 214 - Silicon Lofts",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    unread: false,
    timestamp: "Yesterday",
    subject: "HVAC noise inquiry & parking spot EV charger",
    body: "Hey, thanks for assigning EcoAir. Just wanted to also check if there is an open EV charging parking stall available in B2 level next month?",
    thread: [
      {
        sender: "tenant",
        time: "Oct 7, 04:30 PM",
        text: "Hey, thanks for assigning EcoAir. Just wanted to also check if there is an open EV charging parking stall available in B2 level next month?"
      }
    ]
  },
  {
    id: "MSG-303",
    tenantId: "TEN-102",
    tenantName: "Elena Rostova",
    unit: "Unit 102 - Oakridge Terraces",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    unread: false,
    timestamp: "Oct 6",
    subject: "GFCI outlet fix sign-off",
    body: "VoltMaster did a fantastic job. The technician was on time and tested all the circuit breakers. Thank you!",
    thread: [
      {
        sender: "tenant",
        time: "Oct 6, 02:45 PM",
        text: "VoltMaster did a fantastic job. The technician was on time and tested all the circuit breakers. Thank you!"
      }
    ]
  }
];

export const rentLedgerData = [
  {
    id: "LEDGER-101",
    unit: "Apt 4B - Skyline Crest",
    tenant: "Sarah Jenkins",
    rentAmount: 2850,
    dueDate: "Nov 1, 2026",
    status: "Upcoming", // Paid, Upcoming, Overdue
    paymentMethod: "ACH Direct Debit (Chase ****4109)",
    autoPayEnabled: true,
    lastPaidDate: "Oct 1, 2026"
  },
  {
    id: "LEDGER-102",
    unit: "Unit 214 - Silicon Lofts",
    tenant: "Marcus Vance",
    rentAmount: 2450,
    dueDate: "Oct 1, 2026",
    status: "Paid",
    paymentMethod: "Visa Signature (****8831)",
    autoPayEnabled: true,
    lastPaidDate: "Oct 1, 2026"
  },
  {
    id: "LEDGER-103",
    unit: "Unit 102 - Oakridge Terraces",
    tenant: "Elena Rostova",
    rentAmount: 2100,
    dueDate: "Oct 1, 2026",
    status: "Paid",
    paymentMethod: "ACH Direct Debit (BoA ****6712)",
    autoPayEnabled: true,
    lastPaidDate: "Sep 30, 2026"
  },
  {
    id: "LEDGER-104",
    unit: "Unit 512 - Pacific Bay",
    tenant: "David Miller",
    rentAmount: 3100,
    dueDate: "Oct 1, 2026",
    status: "Overdue (7 Days)",
    paymentMethod: "Manual Credit Card",
    autoPayEnabled: false,
    lastPaidDate: "Sep 2, 2026"
  },
  {
    id: "LEDGER-105",
    unit: "Unit 301 - Skyline Crest",
    tenant: "Aria Montgomery",
    rentAmount: 2950,
    dueDate: "Oct 1, 2026",
    status: "Paid",
    paymentMethod: "Mastercard (****2311)",
    autoPayEnabled: true,
    lastPaidDate: "Oct 2, 2026"
  }
];

export const auditLogsData = [
  {
    id: "AUDIT-9921",
    timestamp: "2026-10-08 10:14:22",
    actor: "Sarah Jenkins (Tenant)",
    role: "Tenant",
    action: "MESSAGE_POSTED",
    target: "Thread #MSG-301",
    ipAddress: "192.168.1.104",
    hash: "0x7f4b82...9e21",
    status: "Verified",
    details: "Tenant posted follow-up regarding carpet dry-out on ticket TICK-8092"
  },
  {
    id: "AUDIT-9920",
    timestamp: "2026-10-08 08:43:05",
    actor: "AuraProp AI Autonomous Core",
    role: "System AI Agent",
    action: "TRIAGE_AUTO_DIAGNOSED",
    target: "Ticket #TICK-8092",
    ipAddress: "internal-cluster-az2",
    hash: "0x3e11a9...8d04",
    status: "Verified",
    details: "Classified emergency plumbing (99.4% confidence), matched contractor Apex 24/7"
  },
  {
    id: "AUDIT-9919",
    timestamp: "2026-10-08 08:42:18",
    actor: "Sarah Jenkins (Tenant)",
    role: "Tenant",
    action: "TICKET_SUBMITTED",
    target: "Ticket #TICK-8092",
    ipAddress: "192.168.1.104",
    hash: "0xfa4910...bb22",
    status: "Verified",
    details: "Created maintenance ticket with 1 image upload for master bathroom sink"
  },
  {
    id: "AUDIT-9918",
    timestamp: "2026-10-07 17:00:12",
    actor: "Alexander Hayes (Property Manager)",
    role: "Property Manager",
    action: "CONTRACTOR_DISPATCHED",
    target: "Ticket #TICK-8089",
    ipAddress: "10.0.4.18",
    hash: "0x66ca14...a901",
    status: "Verified",
    details: "Approved work-order dispatch to EcoAir Climate Solutions ($240 budget cap)"
  },
  {
    id: "AUDIT-9917",
    timestamp: "2026-10-06 14:40:55",
    actor: "Dave Miller (VoltMaster Contractor)",
    role: "Contractor",
    action: "WORKORDER_RESOLVED",
    target: "Ticket #TICK-8077",
    ipAddress: "172.56.21.99",
    hash: "0x9812df...330a",
    status: "Verified",
    details: "Uploaded GFCI replacement certification and closed work ticket"
  },
  {
    id: "AUDIT-9916",
    timestamp: "2026-10-02 09:15:00",
    actor: "AuraProp Automated Billing",
    role: "System AI Agent",
    action: "ACH_BATCH_PROCESSED",
    target: "Ledger Batch #OCT-02",
    ipAddress: "internal-stripe-webhook",
    hash: "0x8922c1...fe43",
    status: "Verified",
    details: "Processed 84 ACH autopay recurring transfers totaling $214,200.00"
  }
];

export const expiringLeasesData = [
  {
    id: "EXP-1",
    unit: "Unit 310",
    property: "Skyline Crest",
    tenant: "Jonathan Reed",
    daysLeft: 24,
    currentRent: "$2,700/mo",
    marketRate: "$2,950/mo",
    suggestedIncrease: "+9.2%",
    status: "Offer Ready"
  },
  {
    id: "EXP-2",
    unit: "Unit 108",
    property: "Silicon Lofts",
    tenant: "Claire Zhao",
    daysLeft: 31,
    currentRent: "$2,400/mo",
    marketRate: "$2,550/mo",
    suggestedIncrease: "+6.2%",
    status: "Under Review"
  },
  {
    id: "EXP-3",
    unit: "Unit 402",
    property: "Oakridge Terraces",
    tenant: "Liam & Maya Patel",
    daysLeft: 45,
    currentRent: "$2,150/mo",
    marketRate: "$2,280/mo",
    suggestedIncrease: "+6.0%",
    status: "Notice Sent"
  }
];
