/*
  Project content. Texts are taken as-is from the Text-English / Text-Hebrew files
  in each Project-* folder.

  ── Adding a new project ──────────────────────────────────────────────
  1. Put optimized images in assets/img/<slug>/ (see README.md).
  2. Copy one of the objects below, change slug / name / images / text.
  The home grid and the detail page are generated automatically.

  ── Images ────────────────────────────────────────────────────────────
  img(path, width, height, hasMd, ext)
    path   — relative to assets/img, without extension
    hasMd  — true if a "-md" (1200px) version exists, used on small screens
  Order of the cards on the home page = order of this list.

  ── Card (home grid) ──────────────────────────────────────────────────
  cover:  still image. Optional  position: "x% y%"  to choose the crop focus.
          Animated covers: add  video: "assets/video/<file>.mp4"  (plays on hover,
          poster = the image) or point the image path to a .gif (ext "gif").
          Don't reuse the hero close-up images from the home screen here.

  ── Project page ──────────────────────────────────────────────────────
  hero:    the large image at the top (fit: "square" keeps square photos uncropped)
  gallery: blocks shown after Concept & Approach. Layouts:
           "full" (1) · "pair" (2) · "trio" (3) · "wide-narrow" (2) · "narrow-wide" (2)
           "mosaic" (3: one large + two stacked) · "float" (1 cut-out image on soft ground)
*/
(function () {
  const img = (path, w, h, hasMd = false, ext = "jpg") => ({ path, w, h, hasMd, ext });

  window.PORTFOLIO_PROJECTS = [
    {
      slug: "senin",
      name: "Senin",
      cover: { ...img("senin/senin-02", 717, 500), position: "72% 50%" },
      hero: img("senin/senin-04", 2400, 1049, true),
      gallery: [
        {
          layout: "mosaic",
          images: [
            img("senin/senin-01", 729, 508),
            img("senin/senin-03", 717, 500),
            img("senin/senin-02", 717, 500),
          ],
        },
      ],
      text: {
        en: {
          overview:
            "A portable sensory regulation device designed for people with ADHD during moments of emotional overwhelm. The system combines a physical device offering multiple sensory stimuli with a companion app that allows users to track their usage patterns over time.",
          why: "Through user research and market analysis, I identified that most existing solutions for ADHD focus primarily on attention and concentration. Through interviews and conversations with people with ADHD and professionals in the field, I discovered another area that receives less attention: emotional overwhelm.",
          what: "A portable device that combines three types of sensory stimulation: pressure, textures, and vibration at three different intensity levels. It allows users to choose the interaction that best suits their needs at any given moment. A companion app was also developed alongside the device.",
          how: "User research, interviews with professionals, material and texture experiments, and prototyping, alongside the development of an electronic product and an AI-assisted wellness app.",
          concept:
            "The project was born from a personal connection to the world of ADHD. However, it was important to me not to rely solely on my own experience, but to explore the needs of other users through research and repeated testing with a user group. Throughout the process, I explored different sensory stimuli, materials, and forms, recognizing that there is no single solution that works for everyone. I also incorporated principles of acupressure, a traditional Chinese medicine practice based on applying pressure to specific points on the body, which became part of both the development process and the product interaction. Alongside this, I focused on creating an accessible and intuitive product that does not claim to solve ADHD, but rather offers an additional tool for navigating moments of overwhelm.",
        },
        he: {
          overview:
            "מכשיר נייד לוויסות חושי, המיועד לאנשים עם ADHD ברגעים של הצפה רגשית. המערכת משלבת מכשיר פיזי עם מספר גירויים חושיים ואפליקציה משלימה, המאפשרת מעקב אחר דפוסי שימוש לאורך זמן.",
          why: "מתוך מחקר משתמשים וסקירת השוק זיהיתי שרוב הפתרונות הקיימים בתחום ה־ADHD מתמקדים בקשב ובריכוז. דרך ראיונות ושיחות עם אנשים המתמודדים עם ADHD ואנשי מקצוע, נחשפתי לרובד נוסף שפחות מקבל מענה: הצפה רגשית.",
          what: "מכשיר נייד המשלב שלושה סוגי גירוי: לחיצה, טקסטורות ורטט בשלוש עוצמות שונות, ומאפשר למשתמש לבחור את האינטראקציה המתאימה לו בכל רגע. לצד המכשיר פותחה אפליקציה משלימה.",
          how: "מחקר משתמשים, ראיונות עם אנשי מקצוע, ניסויי חומרים, טקסטורות ואבות־טיפוס, לצד פיתוח מוצר אלקטרוני ואפליקציית Wellness באמצעות AI.",
          concept:
            "הפרויקט נולד מתוך חיבור אישי לעולם ה־ADHD, אך היה לי חשוב לא להסתמך רק על החוויה שלי, אלא לבחון את הצרכים דרך משתמשים נוספים והתנסות חוזרת עם קבוצת משתמשים. לאורך התהליך בחנתי גירויים, חומרים וצורות שונות, מתוך ההבנה שאין פתרון אחד שמתאים לכולם. בנוסף, שילבתי עקרונות מעולם האקופרסורה (שיטה מהרפואה הסינית המבוססת על הפעלת לחץ בנקודות מסוימות בגוף), שהפכו לחלק מתהליך הפיתוח ומהאינטראקציה עם המוצר. במקביל, שמתי דגש על פיתוח מוצר נגיש ופשוט לשימוש, שאינו מתיימר לפתור את ה־ADHD, אלא להציע כלי נוסף להתמודדות עם רגעי עומס.",
        },
      },
    },

    {
      slug: "memory-pearls",
      name: "Memory Pearls",
      cover: img("memory-pearls/memory-pearls-01", 1024, 1024),
      hero: img("memory-pearls/memory-pearls-03", 2400, 1447, true),
      gallery: [
        {
          layout: "wide-narrow",
          images: [
            img("memory-pearls/memory-pearls-02", 2400, 1564, true),
            img("memory-pearls/memory-pearls-01", 1024, 1024),
          ],
        },
      ],
      text: {
        en: {
          overview:
            "A personalized kit concept that transforms beloved and nostalgic recipes into scented wax pearls, with fragrances inspired by the original recipes. The kit combines the pearls with a choice of baking-inspired containers, allowing people to preserve a scent connected to a personal memory.",
          why: "Scents are an inseparable part of our memories, yet they are difficult to preserve and turn into something tangible that we can experience again.",
          what: "A service that transforms a family recipe or nostalgic favorite into uniquely scented wax pearls.",
          how: "Developing a physical product alongside a digital customer experience, including a website where customers can submit their personal recipe, which is then used to develop the fragrance of the wax pearls, and choose one of the baking-inspired containers they wish to purchase.",
          concept:
            "The project was born from personal memories of the scents and baked goods associated with my grandmother, and from the desire to give people a way to preserve a scent that reminds them of someone they love and revisit it whenever they wish, without needing a special occasion or date. My approach was to create an experience in which the customer takes part in the process: from choosing the recipe that inspires the fragrance, to selecting one of the baking-inspired containers based on familiar baking molds, and finally receiving a kit that allows them to add a wick, light it, and remember. A QR code included in the kit preserves the original recipe in a digital format, making it possible to share it and pass the memory on to future generations.",
        },
        he: {
          overview:
            "קונספט לערכה אישית המתרגמת מתכונים אהובים ונוסטלגיים לפניני שעווה ריחניות, שהניחוח שלהן מבוסס על המתכון המקורי. הערכה משלבת את הפנינים עם ״כלי אפייה״ לבחירה, ומאפשרת לשמר ריח המזוהה עם זיכרון אישי.",
          why: "ריחות הם חלק בלתי נפרד מהזיכרונות שלנו, אך קשה לשמר אותם ולהפוך אותם למשהו מוחשי שאפשר לחוות מחדש.",
          what: "שירות המאפשר להפוך מתכון משפחתי או נוסטלגי לפניני שעווה בעלות ניחוח ייחודי.",
          how: "פיתוח מוצר לצד חוויית לקוח דיגיטלית, הכוללת אתר להזנת המתכון האישי שממנו מפותח ניחוח פניני השעווה, לצד בחירת אחד מכלי האפייה שהלקוח מעוניין לרכוש.",
          concept:
            "הפרויקט נולד מתוך זיכרון אישי של ריחות ומאפים שהיו מזוהים עם סבתא שלי, ומתוך הרצון לאפשר לכל אדם לשמר ריח שמזכיר לו מישהו אהוב ולחזור אליו בכל רגע, ללא צורך באירוע או מועד מיוחד. הגישה שלי הייתה ליצור חוויה שבה הלקוח שותף בתהליך: מבחירת המתכון שממנו מפותח הניחוח, דרך בחירת אחד מ״כלי האפייה״ בהשראת תבניות מוכרות, ועד לקבלת ערכה המאפשרת להוסיף פתיל, להדליק ולהיזכר. קוד ה־QR המצורף לערכה שומר את המתכון המקורי בפורמט דיגיטלי, ומאפשר לשתף אותו ולהעביר את הזיכרון הלאה, גם לדורות הבאים.",
        },
      },
    },

    {
      slug: "kapro-infraedge",
      name: "KAPRO INFRAEDGE",
      cover: img("kapro-infraedge/kapro-infraedge-01", 2400, 1312, true),
      hero: img("kapro-infraedge/kapro-infraedge-01", 2400, 1312, true),
      gallery: [
        {
          layout: "pair",
          images: [
            img("kapro-infraedge/kapro-infraedge-02", 657, 455),
            img("kapro-infraedge/kapro-infraedge-03", 742, 513),
          ],
        },
        { layout: "float", images: [img("kapro-infraedge/kapro-infraedge-04", 800, 566, false, "png")] },
      ],
      text: {
        en: {
          overview:
            "A collaboration with KAPRO, in which I developed a specialized level for infrastructure pipe installation as a new addition to the company's product collection. The project focused on identifying on-site challenges, improving the installation process, and adapting the level to accommodate a range of pipe diameters measured in inches.",
          why: "Existing levels are not designed to sit securely on round pipes. As a result, measuring pipe slopes requires manual support and sometimes the involvement of two professionals.",
          what: "A specialized level for infrastructure pipes, designed to sit securely on a range of pipe diameters and measure slopes of 0%, 1%, and 2%.",
          how: "Developing a geometric base with a 160° angle, determined through calculations to accommodate a wide range of pipe diameters, from approximately 70 mm to 400 mm.",
          concept:
            "My approach was to combine an understanding of on-site needs and working conditions with manufacturing feasibility. I spoke with professionals and examined existing work practices in the field. At the same time, the design was based on the materials and manufacturing methods already used by KAPRO, including aluminum extrusion profiles, plastic injection molding, and TPR. This allowed me to develop a solution that addresses real on-site needs while fitting the company's manufacturing capabilities.",
        },
        he: {
          overview:
            "פרויקט בשיתוף פעולה עם חברת KAPRO, במסגרתו פיתחתי פלס ייעודי להתקנת צינורות תשתית, כמוצר חדש לקולקציית החברה. בתהליך שמתי דגש על זיהוי בעיות מהשטח, שיפור תהליך העבודה והתאמת הפלס למגוון קטרי צינורות הנמדדים בצול.",
          why: "הפלסים הקיימים אינם מותאמים להנחה יציבה על צינורות עגולים. כתוצאה מכך, תהליך מדידת השיפועים דורש החזקה ידנית ולעיתים גם עבודה של שני אנשי מקצוע.",
          what: "פלס ייעודי לצינורות תשתית, המאפשר הנחה יציבה על מגוון קטרי צינורות ומדידת שיפועים של 0%, 1% ו־2%.",
          how: "פיתוח בסיס גיאומטרי בזווית של 160°, שנבחר באמצעות חישובים במטרה לאפשר התאמה לטווח רחב של קטרי צינורות, מכ־70 ועד כ־400 מ\"מ.",
          concept:
            "הגישה שלי בפרויקט הייתה לשלב בין הבנת הצרכים ותנאי העבודה בשטח לבין היתכנות הייצור. שוחחתי עם אנשי מקצוע ובחנתי את תהליך העבודה הקיים בשטח. במקביל, התכנון התבסס על חומרי הגלם ושיטות הייצור שבהם KAPRO משתמשת, בהם פרופילי אלומיניום באקסטרוזיה, הזרקת פלסטיק ו־TPR. כך פיתחתי פתרון שנותן מענה לצורך בשטח ומתאים ליכולות הייצור של החברה.",
        },
      },
    },

    {
      slug: "tangrid",
      name: "Tangrid",
      cover: img("tangrid/tangrid-01", 1536, 1024, true),
      hero: img("tangrid/tangrid-03", 1536, 1024, true),
      gallery: [
        {
          layout: "narrow-wide",
          images: [
            img("tangrid/tangrid-02", 1024, 1536, true),
            img("tangrid/tangrid-01", 1536, 1024, true),
          ],
        },
      ],
      text: {
        en: {
          overview:
            "Tangram is a familiar and beloved puzzle game that allows players to create countless shapes using a few simple pieces. Tangrid reimagines this classic game in three dimensions, using geometric cubes and an interactive app.",
          why: "Driven by the desire to connect a classic game with today's digital world, I wanted to give it a new dimension and expand the familiar 2D assembly experience into a different kind of spatial thinking game.",
          what: "A construction game made up of geometric cubes arranged in a grid, allowing players to create three-dimensional structures. Alongside the physical game, I developed an app that presents building challenges, sets a time limit for solving them, and allows players to photograph their results for AI-based verification.",
          how: "Developing geometric cubes designed to stack on top of one another through friction, alongside creating challenges that combine spatial thinking, stability, and balance. The development process included material experiments and prototyping to explore friction between materials and the balance required to create stable structures. The app adds a digital layer by presenting shapes and challenges.",
          concept:
            "My approach was to take a familiar and beloved game that evokes nostalgia and bring it back into the spotlight by connecting it to today's digital world. I wanted to create an experience that bridges generations, allowing children growing up in a digital world to discover a classic thinking game in a new way. The combination of three-dimensional cubes and an app creates a meeting point between the old and the new, giving a familiar game a different and challenging experience.",
        },
        he: {
          overview:
            "הטנגרם הוא משחק חשיבה מוכר ואהוב, המאפשר ליצור אינספור צורות באמצעות מספר חלקים פשוטים. Tangrid לוקח את המשחק המוכר ומעניק לו פרשנות תלת־ממדית, באמצעות קוביות גיאומטריות ואפליקציה אינטראקטיבית.",
          why: "מתוך הרצון לחבר בין המשחק הקלאסי לעולם הדיגיטלי העכשווי, הענקתי לו ממד חדש והרחבתי את חוויית המשחק מעבר להרכבה הדו־ממדית המוכרת, למשחק חשיבה מסוג אחר.",
          what: "משחק הרכבה המורכב מקוביות גיאומטריות, המאורגנות בגריד ומאפשרות יצירת מבנים תלת־ממדיים. לצד המשחק פותחה אפליקציה המציגה אתגרי הרכבה, מקצה זמן לפתרון ומאפשרת לצלם את התוצאה ולקבל בדיקה באמצעות AI.",
          how: "פיתוח קוביות גיאומטריות המונחות זו על גבי זו באמצעות חיכוך, לצד יצירת אתגרי הרכבה המשלבים חשיבה מרחבית, יציבות ושיווי משקל. תהליך הפיתוח כלל ניסויים ואבות־טיפוס לבחינת החיכוך בין החומרים והאיזון הנדרש ליצירת מבנים יציבים. האפליקציה מוסיפה רובד דיגיטלי באמצעות הצגת הצורות והאתגרים.",
          concept:
            "הגישה שלי הייתה לקחת משחק מוכר ואהוב שמעורר תחושת נוסטלגיה, ולהחזיר אותו לקדמת הבמה דרך חיבור לעולם הדיגיטלי של היום. רציתי ליצור חוויה שמחברת בין הדורות, ומאפשרת גם לילדים שגדלים בעולם דיגיטלי להכיר משחק חשיבה קלאסי בדרך חדשה. השילוב בין הקוביות התלת־ממדיות לאפליקציה יוצר מפגש בין העולם הישן לחדש, ומעניק למשחק המוכר חוויית משחק שונה ומאתגרת.",
        },
      },
    },

    {
      slug: "scoop-n-sail",
      name: "SCOOP N SAIL",
      // Scoop-N-Sail-03 is used for the home-screen close-up, so the card uses -02
      cover: img("scoop-n-sail/scoop-n-sail-02", 1000, 1000),
      hero: { ...img("scoop-n-sail/scoop-n-sail-02", 1000, 1000), fit: "square" },
      gallery: [
        {
          layout: "pair",
          images: [
            img("scoop-n-sail/scoop-n-sail-01", 1000, 1000),
            img("scoop-n-sail/scoop-n-sail-03", 1000, 1000),
          ],
        },
      ],
      text: {
        en: {
          overview:
            "A beach play set that combines digging tools with a creative building experience. Using the tools, children can create their own private lagoon in the sand, then transform the tools themselves into a small boat that becomes part of the world they've created.",
          why: "I wanted to take familiar digging tools, which usually end up unused inside a bucket, and give them an additional purpose in play. Rather than serving only as tools for building, they become part of the final play experience.",
          what: "A beach play set that allows children to dig and create their own private lagoon, then assemble a small boat from the same tools and set it afloat.",
          how: "Developing two plastic digging tools with a specially designed rim that allows them to fit into one another. When combined, the tools form a composition that resembles a small boat floating on water.",
          concept:
            "My approach was to expand the play experience beyond the functional use of familiar beach tools. I wanted to create a game in which the tools do more than help build the lagoon; they take on an additional role as part of the play experience. This allows children to enjoy the world they've created themselves and sail a small boat assembled from the very same tools they used to build it.",
        },
        he: {
          overview:
            "סט משחק לחוף המשלב כלי חפירה עם חוויית בנייה יצירתית. באמצעות הכלים הילדים יוצרים לגונה פרטית בחול, ובהמשך הופכים את כלי המשחק עצמם לסירה קטנה המשתלבת בעולם שיצרו.",
          why: "רציתי לקחת את כלי החפירה המוכרים, שלרוב מסיימים את השימוש בהם בתוך דלי, ולהעניק להם ערך משחקי נוסף. במקום שהכלים יהיו רק אמצעי לבנייה, הם יהפכו גם לחלק מהתוצר הסופי של המשחק.",
          what: "סט כלי משחק המאפשר לילדים ליצור לגונה פרטית באמצעות חפירה, ובהמשך להרכיב מכלי המשחק סירה קטנה שאפשר להשיט במים.",
          how: "פיתוח שני כלי חפירה מפלסטיק, בעלי שפה ייעודית המאפשרת לשלב אותם זה בתוך זה. חיבור הכלים יוצר קומפוזיציה המדמה סירה קטנה הצפה על פני המים.",
          concept:
            "הגישה שלי הייתה להרחיב את חוויית המשחק מעבר לשימוש הפונקציונלי בכלי החוף המוכרים. רציתי ליצור משחק שבו הכלים לא רק משמשים לבניית הלגונה, אלא מקבלים תפקיד נוסף כחלק מחוויית המשחק. כך הילדים יכולים ליהנות מהעולם שיצרו בעצמם, ולהשיט בתוכו סירה קטנה שהרכיבו מאותם כלים ששימשו אותם לבנייה.",
        },
      },
    },
  ];
})();
