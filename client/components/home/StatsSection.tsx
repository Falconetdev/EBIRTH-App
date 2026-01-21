import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: "Expert Mentors", value: 305, suffix: "+" },
  { label: "Students Enrolled", value: 3600, suffix: "+" },
  { label: "Premium Courses", value: 220, suffix: "+" },
  { label: "Success Stories", value: 1700, suffix: "+" },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    delay={index * 0.1}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy={false}
                  />
                )}
              </h3>
              <p className="text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
