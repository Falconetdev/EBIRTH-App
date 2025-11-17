import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  CalendarDays,
  Clock3,
  Quote,
} from "lucide-react";

export default function Index() {
  const images = [
    "/students/s1.svg",
    "/students/s2.svg",
    "/students/s3.svg",
    "/students/s4.svg",
    "/students/s5.svg",
  ];
  const pillars = [
    "Practical Learnings",
    "Expert Instructors",
    "Flexible Courses",
    "Career Support",
  ];
  const lessons = [
    {
      id: 1,
      title: "Business Startup Masterclass",
      description:
        "business එකක් scratch එකෙන් build කරන්න සහ scale කිරීමේ සරලම උපදෙස් ලබාගන්න.",
      lessonTag: "Lesson 01",
      platform: "Watch on YouTube",
    },
    {
      id: 2,
      title: "Business Startup Masterclass",
      description:
        "business growth road map එකක් සහ actionable trading frameworks එකටම ලබාගන්න.",
      lessonTag: "Lesson 02",
      platform: "Watch on YouTube",
    },
  ];
  const memberships = [
    {
      id: "online",
      title: "Foundations + Advanced Trading Membership - Online",
      price: "රු. 38,000",
      oldPrice: "රු. 48,000",
      image:
        "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=900&q=80",
      description:
        "Online membership package එක තුළින් trading fundamentals සිට pro level strategies දක්වා පියවරෙන් පියවර ඉගෙන ගන්න.",
    },
    {
      id: "lifetime",
      title: "Foundations + Advanced Trading Membership - Online",
      price: "රු. 38,000",
      oldPrice: "රු. 48,000",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      description:
        "Real-time coaching sessions, signal breakdowns සහ lifetime community access එකත් සමඟ consistency එක ගොඩන්න.",
    },
  ];
  const events = [
    {
      id: "event-1",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "ඔබත් \"INNER RACERS\" YouTube එකට සම්බන්ධ වෙලා අපේ LIVE TRADING sessions වලින් real-time දැනුම ලබාගන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "YouTube Live",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "event-2",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "අපගේ LIVE TRADING sessions join වෙලා strategy breakdowns, Q&A සහ mentorship එකක් එක්වරටම ලබාගන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "Hybrid Studio",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "event-3",
      title: "INNER RACERS YOUTUBE LIVE LESSONS & LIVE TRADING",
      description:
        "Trading community එකක් වෙලා එකට ඉගෙන ගන්න අපේ mentorship crew එකත් සමඟ hands-on market reviews එකට connect වෙන්න.",
      schedule: "Every Saturday",
      time: "8.00 PM",
      location: "eBirth HQ",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  const testimonials = [
    {
      id: "student-1",
      sinhala:
        "eBirth Academy එකේ practical approach එක සහ real-world examples හරහා මගේම business එකක් නිවැරදිව start කරන්න confident feel වුණා.",
      english:
        "The practical guidance and relatable case studies helped me launch my own business successfully.",
      name: "Dinuka Herath Hulugalla",
      role: "Business Student",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "student-2",
      sinhala:
        "Trading එකක් දැනට start කරනවානම් හෝ dream එකක් තියෙනවානම් eBirth Academy එකෙන් ලැබෙන mentorship එකෙන් real confidence එකක් හදාගන්න පුළුවන්.",
      english:
        "Practical sessions and knowledge-packed tools gave me the courage to take my business idea live.",
      name: "Dinuka Herath Hulugalla",
      role: "Business Student",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "student-3",
      sinhala:
        "eBirth ටෙ mentorship එකෙන් daily guide එකක් ලැබුවා. Advanced strategies explain කරලා trading journey එකත් power up වෙලා.",
      english:
        "Big thanks to the eBirth team for showing the roadmap to scale my journey with confidence.",
      name: "Dinuka Herath Hulugalla",
      role: "Business Student",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    },
  ];
  return (
    <div className="min-h-screen bg-[#1a0b2e] font-sora">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent"></div>
        <div className="pointer-events-none absolute left-1/2 top-[45%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.55),_rgba(26,11,46,0))] blur-2xl sm:h-[420px] sm:w-[420px] sm:blur-3xl lg:h-[520px] lg:w-[520px]"></div>

        {/* Decorative Coins */}
        <div className="absolute top-10 left-4 hidden w-24 h-24 opacity-30 sm:block lg:top-20 lg:left-10 lg:h-32 lg:w-32">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 right-4 hidden w-24 h-24 opacity-20 sm:block lg:bottom-20 lg:right-10 lg:h-40 lg:w-40">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse delay-150"></div>
        </div>

        {/* Static Bitcoin Images */}
        <div className="absolute top-16 right-8 hidden opacity-20 sm:block lg:top-20 lg:right-20 lg:opacity-17" style={{ transform: 'rotate(-15deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-16 h-22" />
        </div>
        <div className="absolute top-32 left-8 hidden opacity-20 sm:block lg:left-20 lg:opacity-18" style={{ transform: 'rotate(25deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-16 h-16" />
        </div>
        {/* <div className="absolute bottom-20 left-1/4 opacity-50" style={{ transform: 'rotate(-45deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-15 h-15" />
        </div> */}

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid gap-12 items-center lg:grid-cols-2">
            {/* Left Content */}
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="text-[#FFD700]">eBirth</span>
                <br />
                Business Academy
              </h1>
              <p className="text-white/80 font-bold text-xl sm:text-2xl mb-8 max-w-xl">
                Where Dreams Take Flight
                <br />
                and Entrepreneurs Are Born
              </p>
              <p className="text-[#FFD700] text-lg font-semibold mb-6">
                Trading ගනා සාරථි සංඛලනයේ මුල ඉදන් ඉගෙනගමු
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-6 text-lg rounded-lg">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 py-6 lg:justify-start">
                <div className="flex -space-x-3">
                  {images.map((img, index) => (
                    <img
                      key={`${img}-${index}`}
                      src={img}
                      alt="Student profile"
                      className="h-14 w-14 rounded-full border-2 border-purple-500/40 object-cover shadow-lg shadow-purple-900/30"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center text-white/70 md:flex-row md:items-center md:gap-3">
                  <span className="text-xs uppercase tracking-[0.35em]">Trusted by</span>
                  <div className="flex items-baseline gap-2 text-[#FFD700]">
                    <span className="text-2xl font-extrabold leading-none">3,600+</span>
                    <span className="text-xs uppercase tracking-[0.35em] text-white/60">Learners</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right - Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative h-[360px] w-full max-w-sm sm:h-[420px] sm:max-w-md lg:h-[600px] lg:max-w-none">
                <div className="absolute inset-0 rounded-3xl w-full h-full ">
                  <img
                    src="/Ebirth-hero.webp"
                    alt="eBirth Business Academy - Hero Image"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      if (e.currentTarget.src.includes("placeholder.svg")) return;
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 hidden rounded-[56px] bg-[radial-gradient(circle,_rgba(255,215,0,0.18),_rgba(26,11,46,0))] blur-3xl lg:block"></div>
            </div>
          </div>
        </div>

      </section>
     

      

      {/* Who We Are Section */}
      <section id="who-we-are" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2c1150] via-[#1a0d33] to-[#0b0418] opacity-95"></div>
        <div className="pointer-events-none absolute -top-20 -left-10 hidden md:block opacity-60">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Floating bitcoin"
            className="h-40 w-40 -rotate-[15deg] object-contain"
          />
        </div>
        <div className="pointer-events-none absolute bottom-[-10%] right-[-15%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_rgba(128,78,235,0.25),_rgba(12,5,26,0))] blur-3xl sm:h-80 sm:w-80"></div>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr,0.95fr]">
          {/* Left - Text Content */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
           
            <h2 className="text-4xl font-bold text-[#FFD700] md:text-5xl opacity-70 ">Who We Are</h2>
            <h3 className="mt-4 text-3xl font-extrabold text-white md:text-4xl opacity-70">
              <span>Empowering Dreams, </span>
              <span className="text-[#FFD700]">Building Futures</span>
            </h3>
            <p className="mt-6 text-md leading-relaxed text-white/80 ">
              eBirth Business Academy is Sri Lanka's leading trading education hub. At eBirth Business Academy - Where Entrepreneurs Are Born - we connect ambition with the strategies, mentorship, and community needed to grow sustainable ventures.
            </p>
            <p className="mt-4 text-md leading-relaxed text-white/70">
              eBirth Business Academy ඔබේ trading හීන සරු රටාවකට පත් කරන්න සත්‍ය අත්දැකීම්, industry expert प्रशिक्षकයන් සහ flexible learning journeys එකතු කරලා උචිත දැනුම ලබාදෙයි. Real-world skills සහ data-driven insights සමඟ ඔබේ trading journey එකට විශ්වාසය එකතු කරමු.
            </p>
            <p className="mt-4 text-md leading-relaxed text-white/70 ">
              Innovative ideas හඳුනාගෙන thriving entrepreneur community එකක් සමඟ එකතුවී ඔබේ entrepreneurial dreams reality බවට පත්කරන්න අපි ඔබට අත්වැලක්. Let's design the future you imagine.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button className="group flex items-center gap-3 rounded-full bg-[#FFD700] px-8 py-3 text-base font-semibold text-black shadow-lg shadow-yellow-400/30 transition hover:bg-[#FFC700]">
                Learn More
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-2 lg:order-1 flex items-start h-full ">
            <div className="relative overflow-hidden  p-2  ">
              <div className="absolute inset-0 -z-10  "></div>
              <div className="relative aspect-[4/3] overflow-hidden ">
                <img
                  src="/who-we-are.webp"
                  alt="Collaborative trading session at eBirth Business Academy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

         {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">305+</h3>
              <p className="text-white/70">Expert Mentors</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">3,600+</h3>
              <p className="text-white/70">Students Enrolled</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">220+</h3>
              <p className="text-white/70">Premium Courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">1,700+</h3>
              <p className="text-white/70">Success Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our New Lessons Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="pointer-events-none absolute -top-6 left-4 hidden sm:block">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Floating coin"
            className="h-24 w-24 rotate-[12deg] object-contain opacity-70"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-10 right-6 hidden lg:block">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Floating coin"
            className="h-28 w-28 rotate-[-18deg] object-contain opacity-60"
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-[#FFD700] drop-shadow md:text-5xl">
              Our New Lessons
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/80 sm:text-base md:text-lg">
              මූලිකයෙන් ඉගෙන | Crypto trading basics දැනගන්න | advanced techniques එකටම සපයන
              <br className="hidden sm:block" />
              actionable programmes සමඟ ඔබේ trading journey එක upgrade කරමු
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#2b0e4c]/70 p-6 shadow-[0_0_40px_rgba(123,97,255,0.25)]"
              >
                <div className="relative rounded-[26px] border border-[#ffd700]/30 bg-gradient-to-br from-[#3a1565] via-[#2b0f4e] to-[#1a082f] p-2">
                  <div className="relative overflow-hidden rounded-[22px] bg-black/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff3636]/70 via-[#6004d9]/70 to-[#0b021a]/90 opacity-80"></div>
                    <div className="relative flex h-[220px] flex-col justify-between p-6 text-white">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                        <span>{lesson.lessonTag}</span>
                        <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4 text-[#FF2D20]"
                          >
                            <path d="M10 15L15 12L10 9V15ZM22 12C22 6.48 17.52 2 12 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 12 22C17.52 22 22 17.52 22 12ZM4 12C4 7.59 7.58 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.58 20 4 16.41 4 12Z" />
                          </svg>
                          {lesson.platform}
                        </span>
                      </div>
                      <div className="space-y-2 text-center text-3xl font-black uppercase leading-tight sm:text-4xl">
                        <p>Trade කෙසේද?</p>
                        <p className="text-[#FFD700]">TradingView</p>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                        <span>Lesson</span>
                        <span>01</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-center">
                  <h3 className="text-2xl font-semibold text-white">{lesson.title}</h3>
                  <p className="text-sm text-white/70">{lesson.description}</p>
                  <Button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700]">
                    Watch Now
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFD700] bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black"
            >
              View All Courses
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto ">
          <div className="bg-black rounded-2xl p-6 flex items-center justify-center flex-wrap gap-8 w-full py-10">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12  rounded-full flex items-center justify-center">
                <svg className="w-[128px] h-[128px] text-white " fill="green" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="font-bold text-2xl">WhatsApp us & Unlock Exclusive Discounts   🚀</span>
            </div>
           
          </div>
        </div>
      </section>

      {/* Explore Learning Opportunities Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 via-[#36126b]/50 to-transparent">
        <div className="pointer-events-none absolute left-[-4%] top-[-6%] hidden md:block">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Gold coin"
            className="h-28 w-28 rotate-[24deg] opacity-70"
          />
        </div>

        <div className="pointer-events-none absolute right-[-6%] top-[-12%] hidden lg:block">
          <img
            src="/Home-removebg-preview.png"
            alt="Parachute coin"
            className="h-44 w-44 object-contain"
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center px-8 space-y-10">
            <h2 className="text-4xl font-extrabold text-[#FFD700] drop-shadow md:text-5xl ">
              Explore Our Learning Opportunities
            </h2>
            <p className="mt-5 text-base font-semibold leading-relaxed text-white/80 sm:text-lg md:text-xl px-10">
              Beginner කෙනෙක්ද? හොඳයි ✅ Expert levelවත් ඔබට අවශ්‍යද? No worries,
              අපේ course catalog එක definitely ඔයාට match වෙන එකක් sure වෙලාම තියෙනවා!
              Join වෙලා skills level up කරමු!!
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="rounded-full bg-white/10 p-1">
              <div className="flex items-center gap-2 rounded-full bg-black/40 p-1">
                <button className="rounded-full bg-[#8C52FF] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_20px_rgba(140,82,255,0.4)] sm:text-sm">
                  Online Membership
                </button>
                <button className="rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white sm:text-sm">
                  Physical Membership
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
            Online Mentorship & Life-Time Memberships
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {memberships.map((plan) => (
              <div
                key={plan.id}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#311063]/80 shadow-[0_0_35px_rgba(88,28,135,0.35)]"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#000]/30 via-[#17043a]/40 to-[#4c1d95]/60"></div>
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-5 px-8 py-8 text-center">
                  <h3 className="text-2xl font-semibold text-white">{plan.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{plan.description}</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl font-bold text-green-500">{plan.price}</span>
                    <span className="text-base font-medium text-white/50 line-through">{plan.oldPrice}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD700] px-6 py-3 text-base font-semibold text-black transition hover:bg-[#FFC700]">
                      Enroll Now
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      variant="outline"
                      className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                    >
                      Learn More
                      <ArrowRight className="h-5 w-5 text-[#FFD700] transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events & Competitions */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#220943] via-[#341067] to-[#1b0635]">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.14),_rgba(34,9,67,0))]"></div>
        <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(140,82,255,0.28),_rgba(27,6,53,0))] blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold uppercase text-[#FFD700] md:text-5xl">
              Upcoming Events & Competitions
            </h2>
            <p className="text-white/70 text-base md:text-lg">
              අපේ trading community එක සමඟ real-time lessons, competitions සහ live trading experience එකක් ලැබෙයි.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-[#2b0f4e]/70 shadow-[0_0_45px_rgba(110,63,190,0.35)]"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      if (e.currentTarget.src.includes("placeholder.svg")) return;
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2b0f4e]/30 to-[#2b0f4e]"></div>
                </div>

                <div className="space-y-6 px-8 py-10 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                    Featured Community Event
                  </p>
                  <h3 className="text-xl font-bold leading-8 text-[#FFD700]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 text-sm font-medium text-white">
                      <CalendarDays className="h-5 w-5 text-[#FFD700]" />
                      <span>{event.schedule}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm font-medium text-white">
                      <Clock3 className="h-5 w-5 text-[#FFD700]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                      <MapPin className="h-4 w-4 text-[#FFD700]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              className="group inline-flex items-center gap-3 rounded-full border-2 border-[#FFD700] bg-transparent px-10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD700] transition hover:bg-[#FFD700] hover:text-black"
            >
              See All Events
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Student's Feedback Section */}
      <section
        id="feedback"
        className="relative w-full overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f1e7ff] via-[#d8c6ff] to-[#bb9bff]"
      >
        <div className="pointer-events-none absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.45),_rgba(217,193,255,0))]"></div>
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-black md:text-5xl">Student's Feedback</h2>
            <p className="text-base font-medium text-black/70 md:text-lg">
              eBirth Academy එකේ විශිෂ්ට journey එක start කරන අපේ students ලගේ learning experience එක ගැන කියන feedbacks ?
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-black/50">
              Based on 1000+ Feedbacks
            </p>
          </div>

          <div className="mt-14 grid w-full gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="overflow-hidden rounded-[32px] text-white"
              >
                <div className="flex h-full flex-col">
                  <div className="relative rounded-t-[32px] bg-[#5c1fca] px-8 pt-10 pb-24 text-left text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <Quote className="h-6 w-6" />
                    </div>
                    <p className="mt-6 text-lg leading-relaxed font-medium text-white">
                      {testimonial.sinhala}
                    </p>
                   
                  </div>

                  <div className="relative flex   rounded-b-[32px] bg-black px-8 pb-10 pt-16 ">
                    <div className=" border border-4 border-white absolute left-1/4 top-0  h-24 w-24 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-full shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover "
                        onError={(e) => {
                          if (e.currentTarget.src.includes("placeholder.svg")) return;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="mt-5">
                      <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            {testimonials.map((testimonial, index) => (
              <span
                key={`${testimonial.id}-dot`}
                className={`h-2.5 rounded-full transition-all ${
                  index === 1 ? "w-9 bg-[#FFD700]" : "w-2.5 bg-black/20"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact
            </h2>
            <p className="text-white/70">
              Reach out our services to excel your journey with tech
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Hours */}
            <Card className=" bg-transparentp-6 text-center">
              <div className="w-16 h-16 ] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">OUR HOURS</h3>
              <p className="text-white/70">Monday - Friday</p>
              <p className="text-white/70">9:00 AM - 6:00 PM</p>
            </Card>

            {/* Location */}
            <Card className=" bg-transparent p-6 text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">LOCATION</h3>
              <p className="text-white/70">No 315, Main Street Kegalle, Sri Lanka</p>
              <p className="text-white/70">No 705 C, Wijerama Junction, Nugegoda Sri Lanka</p>
            </Card>

            {/* Contact */}
            <Card className=" bg-transparent p-6 text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">CONTACT US</h3>
              <p className="text-white/70">0357 286 586</p>
              <p className="text-white/70">0114 492 444</p>
            </Card>
          </div>

          {/* Maps */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video bg-purple-900/40 border border-purple-700/30 rounded-lg overflow-hidden">
              <img src="/placeholder.svg" alt="Map Location" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="aspect-video bg-purple-900/40 border border-purple-700/30 rounded-lg overflow-hidden">
              <img src="/placeholder.svg" alt="Map Location" className="w-full h-full object-cover opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/94123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
      >
        <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Footer />
    </div>
  );
}
