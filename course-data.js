/* =========================================================
   COURSE CONTENT — edit this file to change the course page.

   Each lesson can have:
     title      (required)  lesson name
     url        (optional)  link to the lesson/video page
     thumb      (optional)  path to a thumbnail image, e.g. "assets/thumbs/start-here.jpg"
                            (if left out, a styled title tile is shown instead)
     comingSoon (optional)  true = locked, shown with a "Coming soon" badge
     tag        (optional)  short label, e.g. "Templates" or "Script"
   ========================================================= */

window.COURSE = {
  id: "pest-control-va-accelerator",          // used to save progress — keep unique per course
  title: "Pest Control VA Accelerator",
  subtitle: "The complete system to win more customers, automate your follow-up and grow a pest control business that runs without you.",
  cover: "assets/pest-control-va-accelerator.png",
  instructors: "Jonas Olson & Jake Sheldon",
  instructorRole: "Instructors",
  instructorAvatar: "",                       // e.g. "assets/instructors.jpg" — initials shown if empty

  documents: {
    title: "Class Documents",
    description: "Templates, scripts and guides used throughout the course.",
    url: "#"                                   // TODO: link to your downloadable documents
  },

  modules: [
    {
      title: "30 Sales In 30 Days",
      lessons: [
        { title: "Start Here", url: "#" },
        { title: "4 Steps To Dominating Your Local Market", url: "#" },
        { title: "How To Generate Free Leads On Nextdoor", tag: "Templates", url: "#" },
        { title: "How To Get 1000's Of Free Leads With Strategic Partnerships", url: "#" },
        { title: "How To Reactivate Old Customers", tag: "Templates", url: "#" },
        { title: "Mosquito Upsell Campaigns", comingSoon: true },
        { title: "30 Sales In 30 Days", tag: "Free guide", url: "#" }
      ]
    },
    {
      title: "Mastering Facebook Ads",
      lessons: [
        { title: "Getting Started With Facebook Ads", url: "#" },
        { title: "How To Choose The Right Targeting (Part 1)", url: "#" },
        { title: "How To Choose The Right Targeting (Part 2)", url: "#" },
        { title: "The Do's and Don'ts Of Facebook Ads", tag: "Examples", url: "#" },
        { title: "How To Write Winning Advertisements", url: "#" },
        { title: "How To Create A Lead Form That Converts", url: "#" },
        { title: "How To Effectively Run Retargeting Ads", url: "#" },
        { title: "How To Ethically Spy On Your Competitors", url: "#" },
        { title: "How To Split Test Like A Pro", url: "#" },
        { title: "How To Target Lookalike Customers", comingSoon: true }
      ]
    },
    {
      title: "Automation Mastery",
      lessons: [
        { title: "How To Set Up NextGenofLeads.com", url: "#" },
        { title: "How To Connect Your Facebook Page & Your Lead Form", url: "#" },
        { title: "How To Track & Follow Up With Your Leads In NextGenofLeads.com", url: "#" },
        { title: "How To Automate Your Follow Up In NextGenofLeads.com", url: "#" },
        { title: "How To Build An AI Agent", comingSoon: true }
      ]
    },
    {
      title: "How To Sell Like The Top 1%",
      lessons: [
        { title: "Mastering Sales Part 1", tag: "Script", url: "#" },
        { title: "Mastering Sales Part 2", url: "#" },
        { title: "Door To Door Sales Script", comingSoon: true },
        { title: "How Jackson Sold 1000 Sales By Himself In 1 Year", comingSoon: true }
      ]
    },
    {
      title: "How To Work Less & Get Paid More",
      lessons: [
        { title: "How To Master Goal Setting & Delegation", url: "#" },
        { title: "How To Save 60% Or More On Office Wages Every Year", url: "#" },
        { title: "How To Hire Virtual Assistants", url: "#" },
        { title: "How To Onboard Office Staff", url: "#" },
        { title: "How To Delegate With Standard Operating Procedures (SOPs)", url: "#" },
        { title: "Strategic Partnership Set Up", url: "#" },
        { title: "What Our Virtual Assistants Do", comingSoon: true }
      ]
    },
    {
      title: "How To Go Viral",
      lessons: [
        { title: "10 Myths Of YouTube", url: "#" },
        { title: "YouTube & Social Media Archetypes", url: "#" },
        { title: "How To Track YouTube KPIs", url: "#" },
        { title: "How To Hire Video Editors", url: "#" },
        { title: "Viral Video Examples", comingSoon: true }
      ]
    },
    {
      title: "Generate Revenue ASAP",
      lessons: [
        { title: "Generate 1000's Of Free Leads This Month (Strategic Partnerships)", url: "#" }
      ]
    },
    {
      title: "Master SEO",
      lessons: [
        { title: "Introduction & Overview Of SEO", url: "#" },
        { title: "Understanding SEO", url: "#" },
        { title: "Understanding Google", url: "#" },
        { title: "Understanding The Customer Journey", url: "#" },
        { title: "How To Win Your Google Business Profile", url: "#" },
        { title: "How To Win Website SEO", url: "#" },
        { title: "What To Set Up For SEO", url: "#" },
        { title: "What To Keep Doing For SEO", url: "#" },
        { title: "Summary & Conclusion", url: "#" }
      ]
    },
    {
      title: "How To Generate Leads With Google LSA Ads",
      lessons: [
        { title: "How To Win Local Service Ads", url: "#" }
      ]
    },
    {
      title: "Email Marketing",
      lessons: [
        { title: "1 Year Email Sequence For Current Pest Control Customers", url: "#" }
      ]
    }
  ]
};
