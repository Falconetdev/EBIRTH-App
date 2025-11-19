import { ArrowRight } from "lucide-react";

type CourseCardProps = {
  price: number;
  originalPrice: number;
  discount: number;
};

const CourseCard = ({ price, originalPrice, discount }: CourseCardProps) => (
  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50">
    <div className="flex">
      <div className="mb-4 flex gap-4">
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop"
          alt="Trading course"
          className="h-50 w-50 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="mb-1 text-sm font-semibold text-white">
            Foundations | Advanced Trading
          </h3>
          <p className="text-xs text-purple-300">Membership · Online</p>
          <div className="mb-4">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-500">₨ {price.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through">₨ {originalPrice.toLocaleString()}</span>
            </div>
            <span className="inline-block rounded bg-purple-600/40 px-2 py-1 text-xs text-purple-200">
              {discount}% OFF
            </span>
            <button className="mb-3 mt-8 flex max-w-[290px] items-center justify-center gap-2 rounded-3xl bg-yellow-400 px-4 py-1 text-center text-base font-bold text-purple-900 transition-all duration-300 hover:bg-yellow-500">
              Watch Now
              <ArrowRight size={16} />
            </button>

            <div className="flex gap-2 text-xs text-purple-200">
              <span className="rounded-full bg-purple-700/50 px-3 py-1">Sinhala</span>
              <span className="rounded-full bg-purple-700/50 px-3 py-1">Tamil</span>
              <span className="rounded-full bg-purple-700/50 px-3 py-1">English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseCard;
