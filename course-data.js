/* =========================================================
   COURSE CONTENT — edit this file to change the course page.

   Each lesson can have:
     title        (required)  lesson name
     description  (optional)  short summary shown under the title
     video        (optional)  link to the lesson video (GHL lesson link, Vimeo, YouTube…)
     pdf          (optional)  link to the lesson's PDF / attached document
     thumb        (optional)  thumbnail image path
     comingSoon   (optional)  true = locked, shown with a "Coming soon" badge

   Each module can have:
     title, subtitle (optional), tag (optional, e.g. "Mandatory")
   ========================================================= */

window.COURSE = {
  id: "pest-control-va-accelerator",          // used to save progress, keep unique per course
  title: "Pest Control VA Accelerator",
  subtitle: "An accelerator course for your virtual assistant. The goal is to give your assistant a strong base knowledge of pest control and pest sales, plus the tools and skills to start contributing quickly.",
  cover: "assets/pest-control-va-accelerator.png",
  instructors: "Next Gen Staffing",
  instructorRole: "Instructor",
  instructorAvatar: "",                       // e.g. "assets/logo.png" (initials shown if empty)

  // Optional course-wide downloads card. Set to null to hide it.
  documents: null,

  modules: [
    {
      title: "Introduction",
      subtitle: "For both owners & assistants",
      lessons: [
        {
          title: "Welcome to the Course",
          description: "Welcome to the Pest Control Virtual Assistant Accelerator! Whether you're the owner or the virtual assistant, please watch this video to get an understanding of what to expect from this course.",
          thumb: "assets/thumbs/welcome.jpg",
          video: "", pdf: ""
        },
        {
          title: "About Your Instructor",
          description: "Jake started his entrepreneurial journey at a young age and has always been obsessed with marketing. For the last 10+ years he has dedicated his career to digital marketing and advertising in the pest control space.",
          thumb: "assets/thumbs/about-instructor.jpg",
          video: "", pdf: ""
        },
        {
          title: "How To Onboard A Pest Control Admin",
          description: "Watch the video and use the attached document to properly and effectively onboard a new pest control admin.",
          thumb: "assets/thumbs/onboarding.jpg",
          video: "", pdf: ""
        }
      ]
    },
    {
      title: "Pest Control Basics",
      tag: "Mandatory",
      lessons: [
        {
          title: "Day In The Life Of A Technician",
          description: "Video examples of what the day-to-day life of a pest control technician looks like.",
          thumb: "assets/thumbs/day-in-the-life.jpg",
          video: "", pdf: ""
        },
        {
          title: "General Pest Control vs. Specialty Pest (Intro)",
          description: "The difference between general pest and specialty pest control treatments. Keep in mind every pest control company is different, so learn and understand your company's practices for each treatment.",
          thumb: "assets/thumbs/general-vs-specialty.jpg",
          video: "", pdf: ""
        },
        {
          title: "General Pest Control Training",
          description: "An in-depth guide to everything you need to know about general pest control. Go through the document in detail, then watch the instructional video on common general pest control practices.",
          thumb: "assets/thumbs/general-pest-basics.jpg",
          video: "", pdf: ""
        },
        {
          title: "Specialty Pest Control Training",
          description: "An in-depth guide to all the basics of specialty pest control. Each company likely has variations of these treatments, but the ideas will be similar.",
          thumb: "assets/thumbs/specialty-pest-basics.jpg",
          video: "", pdf: ""
        }
      ]
    },
    {
      title: "How To Sell Pest Control",
      tag: "Mandatory",
      lessons: [
        {
          title: "Sales: How To Set Appointments (Script Walkthrough)",
          description: "Pest control sales is less sales and more education. The people reaching out have a problem and you have the solution: show them how the service is done and how you can get rid of their problem.",
          thumb: "assets/thumbs/script-walkthrough.jpg",
          video: "", pdf: ""
        },
        {
          title: "Objection Handling",
          description: "Objection handling is key in any customer-facing role. Study these responses until you know them by heart, and practise live role-plays over and over.",
          thumb: "assets/thumbs/objection-handling.jpg",
          video: "", pdf: ""
        },
        {
          title: "How To Sell General Pest Control (Live Example)",
          description: "A live example of a real sales call.",
          thumb: "assets/thumbs/how-to-sell.jpg",
          video: "", pdf: ""
        }
      ]
    },
    {
      title: "Common Pest Control Tools",
      lessons: [
        {
          title: "Gorilla Desk Basic Training",
          description: "Scheduling training for Gorilla Desk. Gorilla Desk also has its own YouTube channel for more specific training if needed.",
          thumb: "assets/thumbs/gorilla-desk.jpg",
          video: "", pdf: ""
        },
        {
          title: "FieldRoutes Basic Overview",
          description: "Basic operations training for FieldRoutes. This covers the basics so you learn faster; your team should still show you exactly how they use the software and schedule services.",
          thumb: "assets/thumbs/fieldroutes.jpg",
          video: "", pdf: ""
        },
        {
          title: "GoHighLevel Basic Training",
          description: "GoHighLevel lead management training. Your team should still show you exactly how they use the software. Any other GHL questions can be answered in this channel.",
          thumb: "assets/thumbs/gohighlevel.jpg",
          video: "", pdf: ""
        }
      ]
    },
    {
      title: "Advanced Tips",
      lessons: [
        {
          title: "Customer Service Script",
          description: "Customer service is similar to selling new leads, with slightly different ways to handle the customer. Whether or not you're in a customer service role, going through this will improve your overall skills.",
          thumb: "assets/thumbs/customer-service.jpg",
          video: "", pdf: ""
        },
        {
          title: "Social Media Management & Posting",
          description: "An outline of how to build your pest control company's brand through social media. Each part can be done on its own, or do them all for the best branding results.",
          thumb: "assets/thumbs/social-media.jpg",
          video: "", pdf: ""
        }
      ]
    }
  ]
};
