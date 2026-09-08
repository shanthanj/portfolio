/*
 * ============================================================
 *  EDIT THIS FILE to update the site. Nothing else to touch.
 *
 *  Recommended layout: give each event its own folder under media/,
 *  with photos/ videos/ audio/ subfolders, e.g.:
 *      media/deborah/photos/...   media/deborah/videos/...   media/deborah/audio/...
 *  Then point the paths below into that folder.
 *
 *  - Add an event: copy a { } block inside events: [ ... ]
 *  - Add a photo:  drop the image in the event's photos/ folder, list its path in photos: [ ... ]
 *  - Add a video:  external -> { type: "youtube"|"vimeo"|"facebook", ... }
 *                  self-hosted file -> { type: "file", src: "media/<event>/videos/clip.mp4" }
 *  - Add audio:    drop the .mp3 in a folder, then add { title, file } either to an
 *                  event's audio: [ ... ] (event-specific) or the top-level audio: [ ... ] (voice reel).
 *  Lines marked TODO are placeholders for you to replace.
 * ============================================================
 */
const CONTENT = {
  profile: {
    name: "S.J. Prashanth",
    tagline: "A voice for every occasion", // TODO: replace with your own tagline
    heroPhoto: "" // optional, e.g. "media/photos/hero.jpg" — leave "" for a plain hero
  },

  about:
    "S.J. Prashanth is a dynamic and versatile artist who seamlessly blends his professional expertise as a software engineer with his lifelong passion for the performing arts. With over 15 years of experience in the broadcasting world—including radio hosting, voiceovers, and stage compering—Prashanth has interviewed numerous prominent figures across music, politics, cinema, and other industries. His engaging presence and eloquent delivery have made him a familiar voice in a variety of cultural platforms and events.\n\n" +
    "A trained Mridangam artist, Prashanth is also a dedicated teacher, nurturing the next generation of percussionists across the Greater Toronto Area (GTA). His deep-rooted connection to the arts and culture reflects in every event he hosts, bringing both professionalism and heartfelt expression to the stage.",

  // Horizontal banner image shown in the About section. Set to "" to hide it.
  aboutBanner: "media/jhca_gala/photos/IYA01865-X3_banner.jpg",

  // Events are split into tabs. Each tab has a { label, events: [ ... ] }.
  // To add an event, copy a whole { title... } block into the right tab's events array.
  // Newest events first (they render top to bottom). To rename a tab, change its label.
  eventTabs: [
    {
      label: "Emcee",
      events: [
        {
          title: "சலங்கை பூஜை — ஆய்ஷா, அக்ஸரா & கவிஸ்னா (நாட்டிய லக்ஷ்மி கலைக்கூடம்)",
          date: "September 6, 2026",
          venue: "Whitby Courthouse Theatre",
          description: "Natya Luxmi Kalaikoodam குமாரி. பிரவீனா குணராஜாவின் சிஷ்யைகள் ஆய்ஷா கிஷான், அக்ஸரா விநோதன், கவிஸ்னா அமிர்தாஸ் ஆகியோரின் சலங்கை பூஜை, செப்ரம்பர் 06, 2026 அன்று Whitby Courthouse Theatre இல் விமரிசையாக நடைபெற்றது. மூன்று செல்விகளும், மிகக் குறுகியகால நடனப் பயிற்சியுடன், சலங்கை பூஜையை அரங்கேற்றியிருந்தனர். இத்துடன், 9 சலங்கை பூஜைகளை அரங்கேற்றியிருக்கும் நாட்டியலக்ஷ்மி கலைக்கூட அதிபர், Piraveenaa Kunarajah இற்கு வாழ்த்துகள்! சலங்கை பூஜைக்கு என்னைத் தொகுப்பாளராக (MC) அழைத்தமைக்கு குரு குமாரி. பிரவீனாவுக்கும், செல்விகளின் குடும்பத்தாருக்கும் நன்றி!",
          photos: [
            "media/Kavisna_trio_Salangai/photos/surean-78-X3.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-79-X3.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-144-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-145-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-146-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-185-X3.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-403-X3.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-752-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-754-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-755-X2.jpg",
            "media/Kavisna_trio_Salangai/photos/surean-756-X2.jpg"
          ],
          videos: [],
          audio: []
        },
        {
          title: "சலங்கை பூஜை — நேஹா உதயனன் (நாட்டிய லக்ஷ்மி கலைக்கூடம்)",
          date: "September 6, 2026",
          venue: "Whitby Courthouse Theatre",
          description: "நாட்டிய லக்ஷ்மி கலைக்கூடம், குமாரி. பிரவீனா குணராஜாவின் சிஷ்யை செல்வி. நேஹா உதயனனின் சலங்கை பூஜை, செப்ரம்பர் 06, 2026 அன்று Whitby Courthouse Theatre இல் விமரிசையாக நடைபெற்றது. ஆறு வயது மட்டுமே ஆகும் செல்வி. நேஹா மிகச்சிறப்பான முறையில் பல பாடல்களுக்கான நடனத்தை நேர்த்தியாக வழங்கியிருந்தார். சலங்கை பூஜைக்கு என்னைத் தொகுப்பாளராக (MC) அழைத்தமைக்கு குரு குமாரி. பிரவீனாவுக்கும், நேஹா குடும்பத்தாருக்கும் நன்றி!",
          photos: [
            "media/Naiha_Salangai/photos/A93-X3.jpg",
            "media/Naiha_Salangai/photos/A259-X3.jpg",
            "media/Naiha_Salangai/photos/A274-X3.jpg",
            "media/Naiha_Salangai/photos/A306-X3.jpg",
            "media/Naiha_Salangai/photos/A309-X3.jpg",
            "media/Naiha_Salangai/photos/A310-X3.jpg",
            "media/Naiha_Salangai/photos/A311-X3.jpg"
          ],
          videos: [],
          audio: []
        },
        {
          title: "சாய்ஸ்வராலயா அகடமி — 23வது வருடாந்த நிகழ்ச்சி",
          date: "August 30, 2026",
          venue: "Fairview Library Theatre",
          description: "சாய்ஸ்வராலயா அக்கடமியின் 23வது வருடாந்த நிகழ்ச்சி ஓகஸ்ட் 30, 2026 அன்று Fairview Library Theatre இல் சிறப்பாக நடைபெற்றது. சாய்ஸ்வராலயாவின் மாணவர்கள் வாய்ப்பாட்டு, வீணை நிகழ்ச்சிகளை மிகச் சிறப்பாக நடத்தினார்கள். ஆசிரியை ஸ்ரீமதி. பிரஷாந்தி நிரஞ்சன் அவர்களின் சிறப்பு இசைக் கச்சேரியும் நிகழ்ச்சியை மெருகேற்றியது. நிகழ்ச்சித் தொகுப்பாளராக என்னை அழைத்தமைக்கு, சாய்ஸ்வராலயாவிற்கும், பிரஷாந்தி நிரஞ்சன் அவர்களுக்கும் நன்றி!",
          photos: [
            "media/Sai_Swaralaya_2026/photos/surean-14-X2.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-23-X3.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-24-X3.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-188-X3.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-207-X4.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-367-X3.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-368-5K.jpg",
            "media/Sai_Swaralaya_2026/photos/surean-465-X4.jpg"
          ],
          videos: [],
          audio: []
        },
        {
          title: "CTC Tamil Fest 2026",
          date: "August 22, 2026",
          venue: "Markham (Birchmount/14th)",
          description: "",
          photos: [
            "media/ctc_2026/photos/IYA04623-4K.jpg",
            "media/ctc_2026/photos/IYA04722-4K.jpg",
            "media/ctc_2026/photos/PXL_20260823_001735724.jpg",
            "media/ctc_2026/photos/imgdownloader-2d470806.jpeg"
          ],
          videos: [],
          audio: []
        },
        {
          title: "Nilsha's Dance Arangetram",
          date: "August 2, 2026",
          venue: "Rose Theatre, Brampton",
          description: "",
          photos: [
            "media/nilsha/photos/1BK07891.JPG",
            "media/nilsha/photos/1BK07892.JPG",
            "media/nilsha/photos/2BK00416.JPG",
            "media/nilsha/photos/2BK09751.JPG",
            "media/nilsha/photos/2BK09919.JPG",
            "media/nilsha/photos/TML01992.JPG",
            "media/nilsha/photos/TML02506.JPG",
            "media/nilsha/photos/LUplQYA8.jpeg",
            "media/nilsha/photos/FB_IMG_1787664617806.jpg"
          ],
          videos: [
            { type: "vimeo", id: "1215371267" }
          ],
          audio: []
        },
        {
          title: "Violin & Vocal Arangetram of Yashwini Lepagaran",
          date: "May 23, 2026",
          venue: "J. Clarke Richardson Collegiate",
          description: "Violin & Vocal Arangetram of Miss Yashwini Lepagaran, disciple of Sangeetha Vidwan Dr. Thanathevy Mithradeva. Saturday, 3:30 PM.",
          photos: [
            "media/yashwini/photos/FB_IMG_1779635264246.jpg",
            "media/yashwini/photos/FB_IMG_1779656106814.jpg",
            "media/yashwini/photos/FB_IMG_1779656127460.jpg",
            "media/yashwini/photos/FB_IMG_1779656152079.jpg"
          ],
          videos: [
            { type: "vimeo", id: "1194977526" }
          ],
          audio: []
        },
        {
          title: "Sid Sriram — Carnatic Live in Concert",
          date: "May 3, 2026",
          venue: "Sir John A. Macdonald Collegiate Auditorium",
          description: "Sid Sriram Carnatic Live in Concert.",
          photos: [
            "media/sid/photos/682659617_17859564657687934_3044221118463579906_n.jpg",
            "media/sid/photos/SidSriram-16.jpg",
            "media/sid/photos/SidSriram-19.jpg",
            "media/sid/photos/SidSriram-43.jpg",
            "media/sid/photos/SidSriram-186.jpg",
            "media/sid/photos/WhatsApp Image 2026-05-04 at 1.19.22 PM.jpeg",
            "media/sid/photos/WhatsApp Image 2026-05-04 at 1.19.22 PM (1).jpeg",
            "media/sid/photos/WhatsApp Image 2026-05-04 at 1.20.21 PM.jpeg",
            "media/sid/photos/WhatsApp Image 2026-05-04 at 1.20.22 PM (2).jpeg"
          ],
          videos: [
            { type: "youtube", id: "HOpYXXRv__Y" },
            { type: "youtube", id: "4t5ogAY4Db4" },
            { type: "youtube", id: "P9d-dui95Rw" },
            { type: "youtube", id: "5q-m9tOyZd0" }
          ],
          audio: []
        },
        {
          title: "யாழ் இந்துக் கல்லூரிச் சங்கம் கனடா — இளவேனில் பொழுது (Gala Night 2026)",
          date: "April 25, 2026",
          venue: "Scarborough Convention Centre",
          description: "நூற்றுக்கணக்கான யாழ் இந்துவின் மைந்தர்கள் கலந்துகொண்ட இந்த நிகழ்ச்சியை யாழ் இந்துவின் ஒரு பழைய மாணவனாக நான் தொகுத்து வழங்கியதில் மகிழ்ச்சி. சிறப்பான முன்னேற்பாட்டுடன் நிகழ்ச்சி வெற்றிகரமாக நடந்தேறியது. Jhca Canada இற்கு வாழ்த்து!",
          photos: [
            "media/jhca_gala/photos/IYA01353-X2.jpg",
            "media/jhca_gala/photos/IYA01574-X3.jpg",
            "media/jhca_gala/photos/IYA01587-X2.jpg",
            "media/jhca_gala/photos/IYA01595-X3.jpg",
            "media/jhca_gala/photos/IYA01644-X2.jpg",
            "media/jhca_gala/photos/IYA01648-X3.jpg",
            "media/jhca_gala/photos/IYA01801-X3.jpg",
            "media/jhca_gala/photos/IYA01803-X3.jpg",
            "media/jhca_gala/photos/IYA01865-X3.jpg",
            "media/jhca_gala/photos/IYA01912-X3.jpg",
            "media/jhca_gala/photos/IYA01914-X3.jpg",
            "media/jhca_gala/photos/IYA02084-X3.jpg"
          ],
          videos: [
            { type: "youtube", id: "STZb-rkSz5c" }
          ],
          audio: []
        },
        {
          title: "யாழ் இந்துக் கல்லூரிச் சங்கம் கனடா — கலையரசி 2025",
          date: "October 12, 2025",
          venue: "",
          description: "யாழ் இந்துக் கல்லூரிச் சங்கம் கனடா நடத்திய “கலையரசி 2025” இல் நிகழ்ச்சித் தொகுப்பாளராகக் கலந்துகொண்டேன். யாழ் இந்துக் கல்லூரிப் பழைய மாணவனாக முதல் தடவையாகக் கலையரசி மேடையில் நிகழ்ச்சியைத் தொகுத்து வழங்கியதில் மகிழ்ச்சி. உள்ளுர்ப் படைப்புகளுடன் அனைத்து நிகழ்ச்சிகளும் சிறப்புற அமைந்திருந்தன. கலையரசி 2025 ஐச் சிறப்புற ஒழுங்கமைத்த குழுவினருக்கு நன்றியும், பாராட்டுக்களும்.",
          photos: [
            "media/jhca_kalaiarasi_2025/photos/559562983_10173275802810045_7284358463003618155_n.jpg",
            "media/jhca_kalaiarasi_2025/photos/561339315_10173275794375045_6994844830341992071_n.jpg",
            "media/jhca_kalaiarasi_2025/photos/562010352_10173275791790045_6591934756548665451_n.jpg",
            "media/jhca_kalaiarasi_2025/photos/566203305_10173275802700045_1496750591364817830_n.jpg"
          ],
          videos: [],
          audio: []
        },
        {
          title: "Deborah Swarnakumar's Dance Arangetram",
          date: "July 12, 2025",
          venue: "Yorkwoods Library Theatre",
          description: "Kalai Natyala presents the Dance Arangetram of Kumari Deborah Swarnakumar.",
          photos: [
            "media/deborah/photos/518090343_1218113827026533_2024013928080457454_n.jpg",
            "media/deborah/photos/518301944_1218115753693007_7488608937446292545_n.jpg",
            "media/deborah/photos/518396566_1218115270359722_9045102881022835515_n.jpg"
          ],
          videos: [
            { type: "file", src: "media/deborah/videos/Debora_Invite.mp4" }
          ],
          audio: [
            // event-specific audio: drop mp3s in media/deborah/audio/ then add { title, file } here
          ]
        }
      ]
    },
    {
      label: "Layatharangam (Mridangam)",
      events: [
        {
          title: "108 Mridanga Laya Vinyasam",
          date: "May 24, 2026",
          venue: "Sri Varasiththi Vinayagar Temple",
          description: "Glad to be part of this wonderful culmination of Mridangam artists in Toronto, for Sri Varasiththi Vinaayagar Mahaa Kumbabishekam.",
          photos: [
            "media/108_mridangam/photos/706758923_1727774264898164_885084548815690439_n.jpg",
            "media/108_mridangam/photos/707647142_1727774208231503_1486573311193202613_n.jpg",
            "media/108_mridangam/photos/708333731_1727768511565406_5721830383430796421_n.jpg",
            "media/108_mridangam/photos/f2d0a600-7c9e-4de4-85e7-262b84168b79.jpeg"
          ],
          videos: [],
          audio: []
        }
      ]
    }
  ],

  // Voice recordings. Drop the mp3 in media/audio/ then add a line here.
  audio: [
    // { title: "Radio promo — 2024", file: "media/audio/promo.mp3" }
  ],

  contact: {
    email: "info@sjprashanth.com",
    phone: "",                // optional, e.g. "+1 (416) 555-0123"

    // WhatsApp: digits only, country code first (no +, spaces, or dashes). Set "" to hide the button.
    whatsapp: "16477466934",
    whatsappText: "Hi Prashanth, I'd like to enquire about hosting an event.",

    social: [
      // { label: "Instagram", url: "https://instagram.com/yourhandle" },
      // { label: "YouTube",   url: "https://youtube.com/@yourchannel" }
    ],

    // Contact form (emails you via Formspree).
    // 1) Create a form at https://formspree.io and paste its endpoint below.
    // 2) Captcha: create Google reCAPTCHA v2 ("I'm not a robot" Checkbox) keys at
    //    https://www.google.com/recaptcha/admin , put the SITE key below (public/safe),
    //    and paste the SECRET key into your Formspree form's reCAPTCHA setting.
    //    NEVER put the secret key in this file. Leave recaptchaSiteKey "" to show the form
    //    without a captcha until you have the key.
    form: {
      formspreeEndpoint: "https://formspree.io/f/mdavonay",
      recaptchaSiteKey: "6Lf3AwstAAAAAP3Jh7roj7XTIlA07BhMes2wIfo1"
    }
  }
};
