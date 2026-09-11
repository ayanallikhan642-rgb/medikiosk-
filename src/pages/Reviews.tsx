import { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim() && rating === 0) return;
    setIsSubmitted(true);
    setFeedback('');
    setRating(0);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Reviews & Feedback</h1>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#004d40]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Thank you for your feedback!</h2>
            <p className="text-gray-500">Your response helps us improve the MediKiosk experience.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Share your experience</h2>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={cn(
                    "w-8 h-8 cursor-pointer transition-colors",
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
                  )} 
                />
              ))}
            </div>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-[#004d40] focus:border-[#004d40] outline-none transition-colors"
              rows={4}
              placeholder="Tell us how we can improve the MediKiosk experience..."
            />
            <button 
              onClick={handleSubmit}
              disabled={!feedback.trim() && rating === 0}
              className="mt-4 px-6 py-2 bg-[#004d40] text-white rounded-xl text-sm font-medium hover:bg-[#065f50] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
}
