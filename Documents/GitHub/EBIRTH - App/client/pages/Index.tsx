import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#1a0b2e]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-transparent"></div>

        {/* Decorative Coins */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-30">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse"></div>
        </div>
        <div className="absolute bottom-20 right-10 w-40 h-40 opacity-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse delay-150"></div>
        </div>

        {/* Static Bitcoin Images */}
        <div className="absolute top-20 right-20 opacity-17" style={{ transform: 'rotate(-15deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-16 h-22" />
        </div>
        <div className="absolute top-40 left-20 opacity-18" style={{ transform: 'rotate(25deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-16 h-16" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-50" style={{ transform: 'rotate(-45deg)' }}>
          <img src="/Bitcoin-PNG-removebg-preview.png" alt="Bitcoin" className="w-15 h-15" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="text-[#FFD700]">eBirth</span>
                <br />
                Business Academy
              </h1>
              <p className="text-white/80 font-bold text-2xl mb-8 max-w-xl">
                Where Dreams Take Flight <br />
                and Entrepreneurs Are Born
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-6 text-lg rounded-lg">
                  Get Started
                </Button>
                {/* <Button variant="outline" className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold px-8 py-6 text-lg rounded-lg bg-transparent">
                  Know More
                </Button> */}
              </div>

              {/* Stats Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-700/30 rounded-lg p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xs uppercase">Practical</p>
                  <p className="text-white text-xs">Resources</p>
                </div>
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-700/30 rounded-lg p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xs uppercase">Expert</p>
                  <p className="text-white text-xs">Instructors</p>
                </div>
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-700/30 rounded-lg p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xs uppercase">Flexible</p>
                  <p className="text-white text-xs">Courses</p>
                </div>
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-700/30 rounded-lg p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xs uppercase">Career</p>
                  <p className="text-white text-xs">Support</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative hidden lg:block">
              <div className="w-full h-[500px] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-900/40 rounded-3xl backdrop-blur-sm border border-purple-500/30 overflow-hidden">
                  <img
                    src="/Home-removebg-preview.png"
                    alt="eBirth Business Academy - Hero Image"
                    className="w-full h-full object-cover"
                  />
                </div>
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

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-800/20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-600/30 to-purple-900/50 rounded-3xl backdrop-blur-sm border border-purple-500/30 overflow-hidden">
                <img
                  src="/who we are.png"
                  alt="Who We Are - eBirth Business Academy Team"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Who We Are
              </h2>
              <h3 className="text-2xl md:text-3xl text-[#FFD700] mb-6">
                BUILDING BRIDGES, DISCOVERING SKILLS
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Register money mind. Expert level and any money. No worries, we can do anything. You can do and get anything. It's all done professionally, and your data secure with us. It is something you seek, and your journey starts here.
              </p>
              <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold px-8 py-6 text-lg rounded-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our New Lessons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our New Lessons
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Exclusively Crypto related trading for you. We prepared advanced techniques made possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Course Card 1 */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-red-600/30 via-red-500/20 to-red-700/40 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-red-400/20 to-red-600/30 relative">
                    {/* Bullish Flag Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Flag pole */}
                      <line x1="50" y1="40" x2="50" y2="160" stroke="#DC2626" strokeWidth="3" />

                      {/* Flag */}
                      <rect x="50" y="40" width="60" height="30" fill="#EF4444" opacity="0.8" />
                      <rect x="50" y="40" width="60" height="30" fill="#F87171" opacity="0.6" />

                      {/* Flag pattern lines */}
                      <line x1="60" y1="45" x2="100" y2="45" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                      <line x1="60" y1="52" x2="95" y2="52" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                      <line x1="60" y1="59" x2="105" y2="59" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
                      <line x1="60" y1="66" x2="90" y2="66" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />

                      {/* Price movement leading to flag */}
                      <polyline
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        points="20,160 30,140 40,130 50,120"
                      />

                      {/* Breakout */}
                      <polyline
                        fill="none"
                        stroke="#059669"
                        strokeWidth="3"
                        points="110,60 130,50 150,45 170,40 190,35 210,30 230,25 250,20"
                      />
                    </svg>
                  </div>
                </div>
                {/* Course Badge Overlay */}
                <div className="absolute top-4 right-4 bg-red-600/90 px-4 py-2 rounded-lg text-white font-bold text-lg">
                  ට්‍රේඩින්ග් 17
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4">Advanced Trading Strategies</h3>
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold w-full rounded-lg">
                  Get Started
                </Button>
              </div>
            </Card>

            {/* Course Card 2 */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-indigo-600/30 via-indigo-500/20 to-indigo-700/40 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-400/20 to-indigo-600/30 relative">
                    {/* Head & Shoulders Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Left shoulder */}
                      <path
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="3"
                        d="M20,140 Q40,120 60,140 Q80,160 100,140"
                      />

                      {/* Head */}
                      <path
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3"
                        d="M100,140 Q130,100 160,140 Q190,160 220,140"
                      />

                      {/* Right shoulder */}
                      <path
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="3"
                        d="M220,140 Q240,120 260,140 Q280,160 300,140"
                      />

                      {/* Neckline */}
                      <line x1="60" y1="140" x2="260" y2="140" stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" />

                      {/* Breakout line */}
                      <line x1="260" y1="140" x2="320" y2="100" stroke="#059669" strokeWidth="3" />
                      <line x1="320" y1="100" x2="380" y2="80" stroke="#059669" strokeWidth="3" />

                      {/* Technical indicators */}
                      <circle cx="160" cy="140" r="3" fill="#4F46E5" />
                      <text x="165" y="155" fill="#4F46E5" fontSize="10">Head</text>

                      <circle cx="100" cy="140" r="2" fill="#6366F1" />
                      <text x="85" y="155" fill="#6366F1" fontSize="8">L.Shoulder</text>

                      <circle cx="260" cy="140" r="2" fill="#6366F1" />
                      <text x="270" y="155" fill="#6366F1" fontSize="8">R.Shoulder</text>
                    </svg>
                  </div>
                </div>
                {/* Course Badge Overlay */}
                <div className="absolute top-4 right-4 bg-red-600/90 px-4 py-2 rounded-lg text-white font-bold text-lg">
                  ට්‍රේඩින්ග් 28
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4">Master Crypto Analysis</h3>
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold w-full rounded-lg">
                  Get Started
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="font-bold text-lg">WhatsApp us & Unlock Exclusive Discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-white/30 rounded animate-pulse delay-75"></div>
              <div className="w-6 h-6 bg-white/40 rounded animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Learning Opportunities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our Learning Opportunities
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Register money mind. Expert level and any money. No worries, we can do anything. You can do and get anything. It's all done professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Online Webinars Card */}
            <Card className="bg-gradient-to-br from-purple-800/50 to-purple-900/60 border-purple-600/40 backdrop-blur-sm p-8">
              <div className="mb-6">
                <div className="aspect-video bg-gradient-to-br from-orange-600/30 via-orange-500/20 to-orange-700/40 rounded-lg mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400/20 to-orange-600/30 relative">
                      {/* Trend Analysis Chart */}
                      <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        {/* Area fill under curve */}
                        <path
                          fill="url(#orangeGradient)"
                          d="M20,160 L60,140 L100,120 L140,100 L180,90 L220,85 L260,80 L300,75 L340,70 L380,65 L380,200 L20,200 Z"
                        />

                        {/* Trend line */}
                        <polyline
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="4"
                          points="20,160 60,140 100,120 140,100 180,90 220,85 260,80 300,75 340,70 380,65"
                        />

                        {/* Data points */}
                        <circle cx="60" cy="140" r="4" fill="#EA580C" />
                        <circle cx="140" cy="100" r="4" fill="#EA580C" />
                        <circle cx="220" cy="85" r="4" fill="#EA580C" />
                        <circle cx="300" cy="75" r="4" fill="#EA580C" />

                        <defs>
                          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#F97316" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">Online Webinars</h3>
              <p className="text-white/60 mb-6">Access our expert-led online training</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[#FFD700] text-4xl font-bold">Rs.35,000</span>
                <span className="text-white/50 line-through">Rs.50,000</span>
              </div>
              <div className="flex gap-3">
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold flex-1 rounded-lg">
                  Get Started
                </Button>
                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-lg">
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Online Resources Card */}
            <Card className="bg-gradient-to-br from-purple-800/50 to-purple-900/60 border-purple-600/40 backdrop-blur-sm p-8">
              <div className="mb-6">
                <div className="aspect-video bg-gradient-to-br from-teal-600/30 via-teal-500/20 to-teal-700/40 rounded-lg mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-teal-400/20 to-teal-600/30 relative">
                      {/* Portfolio Pie Chart */}
                      <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                        {/* Pie chart slices */}
                        <circle cx="150" cy="100" r="60" fill="#14B8A6" opacity="0.9" />
                        <circle cx="150" cy="100" r="60" fill="#0F766E" opacity="0.8" />
                        <circle cx="150" cy="100" r="60" fill="#0D9488" opacity="0.7" />
                        <circle cx="150" cy="100" r="60" fill="#0F766E" opacity="0.9" />

                        {/* Pie slice paths */}
                        <path d="M150,100 L150,40 A60,60 0 0,1 200,100 Z" fill="#14B8A6" opacity="0.8" />
                        <path d="M150,100 L200,100 A60,60 0 0,1 180,150 Z" fill="#0F766E" opacity="0.9" />
                        <path d="M150,100 L180,150 A60,60 0 0,1 100,130 Z" fill="#0D9488" opacity="0.7" />
                        <path d="M150,100 L100,130 A60,60 0 1,1 150,40 Z" fill="#0F766E" opacity="0.8" />

                        {/* Center circle */}
                        <circle cx="150" cy="100" r="20" fill="#0F766E" opacity="0.9" />

                        {/* Portfolio labels */}
                        <text x="250" y="60" fill="#14B8A6" fontSize="12" fontWeight="bold">BTC 45%</text>
                        <text x="280" y="90" fill="#0F766E" fontSize="12" fontWeight="bold">ETH 30%</text>
                        <text x="260" y="120" fill="#0D9488" fontSize="12" fontWeight="bold">ADA 15%</text>
                        <text x="220" y="140" fill="#0F766E" fontSize="12" fontWeight="bold">DOT 10%</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">Online Resources</h3>
              <p className="text-white/60 mb-6">Comprehensive learning materials</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[#FFD700] text-4xl font-bold">Rs.5,000</span>
                <span className="text-white/50 line-through">Rs.8,000</span>
              </div>
              <div className="flex gap-3">
                <Button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-semibold flex-1 rounded-lg">
                  Get Started
                </Button>
                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-lg">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events & Competitions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#FFD700]">UPCOMING EVENTS &</span>
              <br />
              <span className="text-white">COMPETITIONS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-600/30 via-green-500/20 to-green-700/40 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-green-600/30 relative">
                    {/* Trading Chart Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      <polyline
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        points="20,150 60,120 100,140 140,100 180,110 220,80 260,90 300,70 340,60 380,80"
                      />
                      <polyline
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                        points="20,160 60,140 100,150 140,120 180,130 220,100 260,110 300,90 340,80 380,100"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-white/70 text-sm">2024/10/19 at 9:00 am</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">BEST CRYPTO TRADER 2024 1st STAGE</h3>
                <p className="text-white/60 text-sm mb-4">Join our premier trading competition</p>
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black w-full rounded-lg">
                  Register Now
                </Button>
              </div>
            </Card>

            {/* Event Card 2 */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-blue-700/40 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-blue-600/30 relative">
                    {/* Candlestick Chart Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Candlestick bodies */}
                      <rect x="30" y="80" width="8" height="40" fill="#3B82F6" opacity="0.8" />
                      <rect x="50" y="60" width="8" height="60" fill="#1D4ED8" opacity="0.9" />
                      <rect x="70" y="90" width="8" height="30" fill="#3B82F6" opacity="0.8" />
                      <rect x="90" y="70" width="8" height="50" fill="#1D4ED8" opacity="0.9" />
                      <rect x="110" y="100" width="8" height="20" fill="#3B82F6" opacity="0.8" />
                      <rect x="130" y="85" width="8" height="35" fill="#1D4ED8" opacity="0.9" />
                      <rect x="150" y="75" width="8" height="45" fill="#3B82F6" opacity="0.8" />
                      <rect x="170" y="95" width="8" height="25" fill="#1D4ED8" opacity="0.9" />
                      <rect x="190" y="110" width="8" height="10" fill="#3B82F6" opacity="0.8" />
                      <rect x="210" y="105" width="8" height="15" fill="#1D4ED8" opacity="0.9" />
                      <rect x="230" y="115" width="8" height="5" fill="#3B82F6" opacity="0.8" />
                      <rect x="250" y="120" width="8" height="10" fill="#1D4ED8" opacity="0.9" />
                      <rect x="270" y="125" width="8" height="15" fill="#3B82F6" opacity="0.8" />
                      <rect x="290" y="130" width="8" height="20" fill="#1D4ED8" opacity="0.9" />
                      <rect x="310" y="135" width="8" height="25" fill="#3B82F6" opacity="0.8" />
                      <rect x="330" y="140" width="8" height="30" fill="#1D4ED8" opacity="0.9" />
                      <rect x="350" y="145" width="8" height="35" fill="#3B82F6" opacity="0.8" />

                      {/* Wicks */}
                      <line x1="34" y1="60" x2="34" y2="80" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="54" y1="40" x2="54" y2="60" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="74" y1="70" x2="74" y2="90" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="94" y1="50" x2="94" y2="70" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="114" y1="90" x2="114" y2="100" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="134" y1="65" x2="134" y2="85" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="154" y1="55" x2="154" y2="75" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="174" y1="85" x2="174" y2="95" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="194" y1="100" x2="194" y2="110" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="214" y1="95" x2="214" y2="105" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="234" y1="110" x2="234" y2="115" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="254" y1="110" x2="254" y2="120" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="274" y1="115" x2="274" y2="125" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="294" y1="120" x2="294" y2="130" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="314" y1="125" x2="314" y2="135" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="334" y1="130" x2="334" y2="140" stroke="#1D4ED8" strokeWidth="1" />
                      <line x1="354" y1="135" x2="354" y2="145" stroke="#3B82F6" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-white/70 text-sm">2024/10/25 at 2:00 pm</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">WEBINAR CRYPTO MARKET ANALYSIS</h3>
                <p className="text-white/60 text-sm mb-4">Expert insights on market trends</p>
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black w-full rounded-lg">
                  Register Now
                </Button>
              </div>
            </Card>

            {/* Event Card 3 */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-purple-700/40 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-purple-600/30 relative">
                    {/* Volume Bars Chart Pattern */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Volume bars */}
                      <rect x="20" y="120" width="12" height="60" fill="#8B5CF6" opacity="0.8" />
                      <rect x="40" y="80" width="12" height="100" fill="#7C3AED" opacity="0.9" />
                      <rect x="60" y="100" width="12" height="80" fill="#8B5CF6" opacity="0.8" />
                      <rect x="80" y="60" width="12" height="120" fill="#7C3AED" opacity="0.9" />
                      <rect x="100" y="90" width="12" height="90" fill="#8B5CF6" opacity="0.8" />
                      <rect x="120" y="70" width="12" height="110" fill="#7C3AED" opacity="0.9" />
                      <rect x="140" y="110" width="12" height="70" fill="#8B5CF6" opacity="0.8" />
                      <rect x="160" y="50" width="12" height="130" fill="#7C3AED" opacity="0.9" />
                      <rect x="180" y="85" width="12" height="95" fill="#8B5CF6" opacity="0.8" />
                      <rect x="200" y="75" width="12" height="105" fill="#7C3AED" opacity="0.9" />
                      <rect x="220" y="95" width="12" height="85" fill="#8B5CF6" opacity="0.8" />
                      <rect x="240" y="65" width="12" height="115" fill="#7C3AED" opacity="0.9" />
                      <rect x="260" y="105" width="12" height="75" fill="#8B5CF6" opacity="0.8" />
                      <rect x="280" y="55" width="12" height="125" fill="#7C3AED" opacity="0.9" />
                      <rect x="300" y="115" width="12" height="65" fill="#8B5CF6" opacity="0.8" />
                      <rect x="320" y="45" width="12" height="135" fill="#7C3AED" opacity="0.9" />
                      <rect x="340" y="125" width="12" height="55" fill="#8B5CF6" opacity="0.8" />
                      <rect x="360" y="135" width="12" height="45" fill="#7C3AED" opacity="0.9" />

                      {/* Volume line overlay */}
                      <polyline
                        fill="none"
                        stroke="#A855F7"
                        strokeWidth="2"
                        points="26,120 46,80 66,100 86,60 106,90 126,70 146,110 166,50 186,85 206,75 226,95 246,65 266,105 286,55 306,115 326,45 346,125 366,135"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                  <span className="text-white/70 text-sm">2024/11/05 at 10:00 am</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">MEET EXPERT ONLINE AT 10AM</h3>
                <p className="text-white/60 text-sm mb-4">Q&A session with industry experts</p>
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black w-full rounded-lg">
                  Register Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Student's Feedback Section */}
      <section id="feedback" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Student's Feedback
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              What are our customers say about their learning experience with us. Here some feedback.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-gradient-to-br from-purple-800/60 to-purple-900/70 border-purple-600/40 backdrop-blur-sm p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">
                "Amazing experience! The instructors are knowledgeable and the course content is very practical. I've learned so much about crypto trading."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden">
                  <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold">Kasun Perera</p>
                  <p className="text-white/60 text-sm">Crypto Trader</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-gradient-to-br from-purple-800/60 to-purple-900/70 border-purple-600/40 backdrop-blur-sm p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">
                "The best investment I made was in this course. The strategies taught here have helped me become a successful trader."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden">
                  <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold">Nimali Silva</p>
                  <p className="text-white/60 text-sm">Business Owner</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="bg-gradient-to-br from-purple-800/60 to-purple-900/70 border-purple-600/40 backdrop-blur-sm p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">
                "Excellent platform with great support. The community is very helpful and the resources are top-notch."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden">
                  <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold">Ravindu Fernando</p>
                  <p className="text-white/60 text-sm">Investor</p>
                </div>
              </div>
            </Card>
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
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">OUR HOURS</h3>
              <p className="text-white/70">Monday - Friday</p>
              <p className="text-white/70">9:00 AM - 6:00 PM</p>
            </Card>

            {/* Location */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">LOCATION</h3>
              <p className="text-white/70">No 315, Main Street Kegalle, Sri Lanka</p>
              <p className="text-white/70">No 705 C, Wijerama Junction, Nugegoda Sri Lanka</p>
            </Card>

            {/* Contact */}
            <Card className="bg-purple-900/40 border-purple-700/30 backdrop-blur-sm p-6 text-center">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-black" />
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
