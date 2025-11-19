import React from 'react'

const VideoSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#1d063d] via-[#3d0c63] to-[#1d063d] py-16 px-4">
      {/* Heading */}
      <h2 className="text-center text-white text-2xl md:text-3xl font-semibold mb-10">
        Learn the fundamentals of crypto trading with <br />
        guided sessions – 100% free.
      </h2>

      {/* Responsive YouTube Video */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Info Card */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg text-white p-8 rounded-2xl shadow-xl">
        <p className="text-base leading-7 mb-6">
          Want to live trade with our experts? Join our exclusive trading club and get real-time
          guidance.
        </p>

        <ul className="list-disc list-inside space-y-3 text-base leading-7">
          <li>50 videos. Life-Time Free සම්පූර්ණ පාඨමාලාව.</li>
          <li>24×7 Live Trading Club (Discord) එකට ඇතුල් වීම.</li>
          <li>ඔබගේ mistakes Rapid ලෙස Screen Share ಮೂಲಕ Trading අතරතුරදී straight එකෙන් platform එකෙන් fixed.</li>
          <li>Inner Racer’s VIP Signals & Market Updates (Discord).</li>
          <li>Beginner to Advanced Level Online Revisions.</li>
          <li>සිංහල medium support + strategies breakdown real-time Trade updates.</li>
          <li>24×7 Call Center Support (Trading related inquiries).</li>
        </ul>

        {/* CTA */}
      <div 
  className="pt-4 pb-4 mt-8 rounded-xl text-center max-w-7xl mx-auto shadow-2xl 
             bg-gradient-to-t from-[#7d6b45] to-[#383329]"
>
  
  {/* First Line: The Question */}
  {/* Added: tracking-wider for increased character/word spacing */}
  <div className="text-lg text-amber-200 leading-relaxed tracking-wider px-4 py-1">
    කොහොමද ඉතින් මේ 
    <span className="text-white font-semibold">Membership</span> එකට ලොකුම ලොකු 
    <span className="text-white font-semibold">Discount</span> එකක් ගන්නේ?
  </div>
  
  {/* Second Line: The Action */}
  {/* Added: tracking-wider for increased character/word spacing */}
  <div className="text-lg text-amber-200 leading-relaxed tracking-wider px-4 py-1">
    දැන්ම 
    <span className="text-white font-semibold">"Membership Discount"</span> යනුවෙන් 
    <span className="text-white font-bold">0114492444</span> අංකයට WhatsApp පණිවිඩයක් එවන්න
  </div>
</div>
</div>
    </section>
  );
};

export default VideoSection