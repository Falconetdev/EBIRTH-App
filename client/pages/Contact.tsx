import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, Mail, MessageCircle, Send, Users, Zap, Bell, TrendingUp, BookOpen, Award } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";
import PageLayout from "@/components/layout/PageLayout";

const Contact = () => {

  const locations = [
    {
      id: "kegalle",
      title: "Kegalle Branch",
      address: "No 315, Main Street, Kegalle, Sri Lanka",
      mapLink: "https://www.google.com/maps/place/eBirth+Business+Academy+-+Kegalle+Branch/@7.2535918,80.3455975,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae3175a5a86912d:0x6d864de0ec469045!8m2!3d7.2535918!4d80.3481724!16s%2Fg%2F11s7cjvvy7",
      embedSrc: "https://www.google.com/maps?q=eBirth+Business+Academy+-+Kegalle+Branch&output=embed",
    },
    {
      id: "nugegoda",
      title: "Nugegoda Branch",
      address: "No 705 C, Wijerama Junction, Nugegoda, Sri Lanka",
      mapLink: "https://www.google.com/maps/place/eBirth+Business+Academy+(+Nugegoda+)/@6.8578321,79.9086415,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae25bd8efe36a59:0xeddd58bee299181a!8m2!3d6.8578321!4d79.9086415!16s%2Fg%2F11kqvx4ctp",
      embedSrc: "https://www.google.com/maps?q=eBirth+Business+Academy+(+Nugegoda+)&output=embed",
    },
  ];

  return (
    <PageLayout mainClassName="pt-24">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute -top-20 -left-10 hidden md:block opacity-60">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Floating bitcoin"
            className="h-40 w-40 -rotate-[15deg] object-contain"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-12 hidden md:block opacity-50">
          <img
            src="/Bitcoin-PNG-removebg-preview.png"
            alt="Floating bitcoin"
            className="h-48 w-48 -rotate-[10deg] object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-transparent p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">OUR HOURS</h3>
              <p className="text-white/70">Monday - Friday</p>
              <p className="text-white/70">9:00 AM - 6:00 PM</p>
            </Card>

            <Card className="bg-transparent p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">CONTACT US</h3>
              <a href="tel:0357286586" className="block text-white/70">035 728 6586</a>
              <a href="tel:0114492444" className="block text-white/70">011 449 2444</a>
            </Card>

            <Card className="bg-transparent p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">EMAIL</h3>
              <a href="mailto:contact@ebirth.net" className="text-white/70 break-all">
                contact@ebirth.net
              </a>
            </Card>

            <Card className="bg-transparent p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">LOCATION</h3>
              <p className="text-white/70">Kegalle & Nugegoda</p>
              <p className="text-white/70">Two Branches</p>
            </Card>
          </div>

          {/* Community Section Header */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-4">
                Connect With Us
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join our thriving community and get instant support through WhatsApp or connect with fellow traders on Telegram
              </p>
            </div>
          </ScrollReveal>

          {/* Community Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* WhatsApp Card */}
            <ScrollReveal>
              <Card className="h-full bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-700/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 flex flex-col">
                {/* Header */}
                <div className="p-8 pb-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                    <FaWhatsapp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">WhatsApp Contact</h3>
                  <p className="text-white/70 text-base">Get instant support and quick responses</p>
                </div>

                {/* Content - Features */}
                <div className="px-8 pb-6 space-y-3 flex-grow">
                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/20 hover:border-green-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-6 h-6 flex-shrink-0 text-green-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Direct Message</p>
                        <p className="text-white/70 text-sm">Get personalized assistance for inquiries and enrollment</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/20 hover:border-green-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 flex-shrink-0 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Quick Response</p>
                        <p className="text-white/70 text-sm">Our team responds within minutes during business hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/20 hover:border-green-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Bell className="w-6 h-6 flex-shrink-0 text-blue-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">24/7 Availability</p>
                        <p className="text-white/70 text-sm">Send messages anytime and we'll respond promptly</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-green-700/20 hover:border-green-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Phone className="w-6 h-6 flex-shrink-0 text-green-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-2">Contact Number</p>
                        <div className="space-y-2">
                          <a
                            href="https://wa.me/94742388188"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium text-sm group"
                          >
                            <MessageCircle className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            <span>+94 74 238 8188</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - CTA Button */}
                <div className="p-8 pt-6">
                  <Button
                    onClick={() => window.open('https://wa.me/94742388188', '_blank')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 text-lg rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-green-500/50"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <FaWhatsapp className="w-6 h-6" />
                      Chat on WhatsApp
                    </span>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>

            {/* Telegram Card */}
            <ScrollReveal>
              <Card className="h-full bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-700/30 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                {/* Header */}
                <div className="p-8 pb-6 text-center">
                  <div className="w-20 h-20 bg-[#0088cc] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                    <FaTelegram className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Telegram Community</h3>
                  <p className="text-white/70 text-base">Join our exclusive trading community</p>
                </div>

                {/* Content - Features */}
                <div className="px-8 pb-6 space-y-3 flex-grow">
                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/20 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 flex-shrink-0 text-blue-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Active Community</p>
                        <p className="text-white/70 text-sm">Connect with fellow traders and experienced professionals</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/20 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 flex-shrink-0 text-cyan-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Market Updates</p>
                        <p className="text-white/70 text-sm">Get real-time trading signals and expert market analysis</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/20 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-6 h-6 flex-shrink-0 text-purple-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Exclusive Content</p>
                        <p className="text-white/70 text-sm">Access course materials, webinars, and announcements</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4 border border-blue-700/20 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 flex-shrink-0 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-white font-semibold mb-1">Network & Grow</p>
                        <p className="text-white/70 text-sm">Build connections and improve trading skills together</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - CTA Button */}
                <div className="p-8 pt-6">
                  <Button
                    onClick={() => window.open('https://t.me/innerracers', '_blank')}
                    className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-6 text-lg rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/50"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <FaTelegram className="w-6 h-6" />
                      Join Telegram Community
                    </span>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Why Choose & Visit Campus Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Why Choose eBirth Card */}
            <ScrollReveal>
              <Card className="h-full bg-purple-900/20 border-purple-700/30 backdrop-blur-sm p-8 hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose eBirth?</h3>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFD700] text-xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-base">Expert instructors with industry experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFD700] text-xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-base">Flexible learning schedules for your convenience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFD700] text-xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-base">Hands-on practical training and projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFD700] text-xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-base">Career guidance and placement support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FFD700] text-xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-base">Modern facilities in prime locations</span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>

            {/* Visit Our Campus Card */}
            <ScrollReveal>
              <Card className="h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-700/30 backdrop-blur-sm p-8 hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Visit Our Campus</h3>
                <p className="text-white/70 mb-6 text-base">
                  We welcome you to visit our branches and see our facilities. Our team is ready to answer your questions and help you start your learning journey.
                </p>
                <div className="space-y-3">
                  {locations.map(loc => (
                    <a
                      key={loc.id}
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors border border-purple-700/20 hover:border-[#FFD700]/50 group"
                    >
                      <p className="text-white font-semibold mb-1 group-hover:text-[#FFD700] transition-colors">
                        {loc.title}
                      </p>
                      <p className="text-white/60 text-sm">{loc.address}</p>
                    </a>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Map Section */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="bg-purple-900/20 border border-purple-700/30 rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all duration-300"
                >
                  <div className="aspect-video">
                    <iframe
                      src={location.embedSrc}
                      title={location.title}
                      className="h-full w-full"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="bg-black/60 text-white px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">{location.title}</p>
                      <p className="text-white/60 text-sm">{location.address}</p>
                    </div>
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFD700] hover:text-white transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;