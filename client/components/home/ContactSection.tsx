import { Card } from "@/components/ui/card";
import { Clock, Phone } from "lucide-react";

const ContactSection = () => {

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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
            <div className="flex flex-col">
              <a className="text-white/70" href="tel:0357286586">0357 286 586</a>
              <a className="text-white/70" href="tel:0114492444">0114 492 444</a>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
