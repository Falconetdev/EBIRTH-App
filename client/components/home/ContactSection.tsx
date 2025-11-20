import { Card } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const locations = [
  {
    id: "kegalle",
    title: "Kegalle Campus",
    mapLink: "https://www.google.com/maps/place/Kegalle,+Sri+Lanka/@7.2523,80.3436,15z",  
    embedSrc:
      "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Kegalle,+Sri+Lanka&center=7.2523,80.3436&zoom=14",
  },
  {
    id: "nugegoda",
    title: "Nugegoda Studio",
    mapLink: "https://www.google.com/maps/place/Nugegoda,+Sri+Lanka/@6.8739,79.9020,15z",  
    embedSrc:
      "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Nugegoda,+Sri+Lanka&center=6.8739,79.9020&zoom=14",
  },
];


  return (
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
          <Card className=" bg-transparentp-6 text-center">
            <div className="w-16 h-16 ] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">OUR HOURS</h3>
            <p className="text-white/70">Monday - Friday</p>
            <p className="text-white/70">9:00 AM - 6:00 PM</p>
          </Card>

          <Card className=" bg-transparent p-6 text-center">
            <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">LOCATION</h3>
            <p className="text-white/70">No 315, Main Street Kegalle, Sri Lanka</p>
            <p className="text-white/70">No 705 C, Wijerama Junction, Nugegoda Sri Lanka</p>
          </Card>

          <Card className=" bg-transparent p-6 text-center">
            <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">CONTACT US</h3>
            <div className="flex flex-col">
              <a className="text-white/70" href="tel:0357286586">0357 286 586</a>
            <a className="text-white/70" href="tel:0114492444">0114 492 444</a>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-purple-900/40 border border-purple-700/30 rounded-lg overflow-hidden"
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
              <div className="bg-black/60 text-white text-sm font-medium px-4 py-3 flex items-center justify-between">
                <span>{location.title}</span>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#FFD700] hover:text-white"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
