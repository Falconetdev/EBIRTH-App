import React from 'react';

// --- Lesson Card Component ---
interface LessonCardProps {
  imageSrc: string;     // URL for the lesson thumbnail
  title: string;        // Main title (e.g., "Beginner's Trading Course")
  lessonCount: number;  // Number of videos in the course
  lessonNumber: number; // For the 'Lesson 01' badge
}

const LessonCard: React.FC<LessonCardProps> = ({ imageSrc, title, lessonCount, lessonNumber }) => {
  return (
    <div className="bg-[#2a0847] rounded-lg shadow-xl overflow-hidden flex flex-col h-full transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Lesson Thumbnail/Image */}
      <div className="relative w-full h-48 sm:h-56 bg-gray-900">
        <img 
          // The placeholder image URL is used here
          src={imageSrc} 
          alt="Lesson Thumbnail" 
          className="w-full h-full object-cover" 
        />
        {/* "Lesson 01" Overlay - positioned absolutely */}
        <span className="absolute top-3 right-3 bg-yellow-400 text-purple-900 text-sm font-bold px-3 py-1 rounded">
          Lesson {String(lessonNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        
        {/* Watch on YouTube & Video Count */}
        <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
          <div className="flex items-center">
            {/* YouTube Icon */}
            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            Watch on YouTube
          </div>
          <div className="flex items-center">
            {/* Video Icon */}
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 8a2 2 0 100 4h1a2 2 0 100-4h-1z"></path></svg>
            <span className="font-semibold">{lessonCount}</span> Videos
          </div>
        </div>

        {/* Watch Now Button */}
        <a 
          href="#"
          className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out flex items-center justify-center text-base"
        >
          Watch Now <span className="ml-2">→</span>
        </a>
      </div>
    </div>
  );
};

// --- Main Lessons Component ---
const OurNewLessons: React.FC = () => {
  // Diverse placeholder images are used here
  const lessons = [
    { id: 1, title: "Crypto Trading Essentials", imageSrc: 'https://picsum.photos/seed/trading1/600/350', lessonCount: 16, lessonNumber: 1 },
    { id: 2, title: "Advanced Technical Analysis", imageSrc: 'https://picsum.photos/seed/crypto2/600/350', lessonCount: 12, lessonNumber: 2 },
    { id: 3, title: "Risk Management Strategies", imageSrc: 'https://picsum.photos/seed/finance3/600/350', lessonCount: 8, lessonNumber: 3 },
    { id: 4, title: "Understanding Market Cycles", imageSrc: 'https://picsum.photos/seed/market4/600/350', lessonCount: 10, lessonNumber: 4 },
    { id: 5, title: "The Psychology of Trading", imageSrc: 'https://picsum.photos/seed/course5/600/350', lessonCount: 7, lessonNumber: 5 },
    { id: 6, title: "Introduction to DeFi & NFTs", imageSrc: 'https://picsum.photos/seed/stock6/600/350', lessonCount: 9, lessonNumber: 6 },
  ];

  return (
    // Main Container with the new gradient
    <div 
      className="min-h-screen text-white py-16 px-4 sm:px-6 lg:px-8" 
      style={{ 
        background: 'linear-gradient(180deg, #1d063d 0%, #3d0c63 50%, #1d063d 100%)' 
      }}
    >
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Our New Lessons</h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          සම්පූර්ණයෙන්ම නොමිලේ! <span className="text-yellow-400 font-semibold">Crypto trading basics</span> වල ඉඳලා <span className="text-yellow-400 font-semibold">advanced techniques</span> වෙනකම්ම ඉගෙනගන්න
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map(lesson => (
          <LessonCard 
            key={lesson.id}
            imageSrc={lesson.imageSrc}
            title={lesson.title}
            lessonCount={lesson.lessonCount}
            lessonNumber={lesson.lessonNumber}
          />
        ))}
      </div>

      {/* Pagination (Simplified) */}
      <div className="flex justify-center mt-20">
        <nav className="relative z-0 inline-flex rounded-lg shadow-md" aria-label="Pagination">
          <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-700 bg-[#2a0847] text-sm font-medium text-gray-300 hover:bg-gray-700 transition duration-150">
            Previous
          </button>
          {[1, 2, 3, 4, 5].map(page => (
            <button 
              key={page}
              aria-current={page === 3 ? 'page' : undefined}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium transition duration-150
                          ${page === 3 ? 'text-yellow-400 bg-purple-800' : 'text-gray-300 bg-[#2a0847] hover:bg-gray-700'}`}
            >
              {page}
            </button>
          ))}
          <button className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-700 bg-[#2a0847] text-sm font-medium text-gray-300 hover:bg-gray-700 transition duration-150">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OurNewLessons;