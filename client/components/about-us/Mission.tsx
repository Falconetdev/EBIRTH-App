export default function MissionComponent() {
  return (
    <div className="bg-inherit flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col md:flex-row justify-around items-center gap-6 md:gap-10 w-full bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Our <span className="text-yellow-400">Mission</span>
            </h2>
          </div>
          
          <div className="w-full md:w-2/3">
            <p className="text-white/90 text-sm sm:text-base lg:text-md leading-relaxed text-center md:text-left">
              Our mission goes beyond conventional education; we provide the{' '}
              <span className="text-yellow-400 font-semibold">nurturing ground</span>{' '}
              for individuals to cultivate innovative ideas and turn them into prosperous ventures,
              we act as an{' '}
              <span className="text-yellow-400 font-semibold">incubation journey</span>{' '}
              where entrepreneurs are not just made, they are born. Together, we shape your dreams
              into a thriving reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}