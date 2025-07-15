import { useState, useRef } from 'react';
import { ChevronDown, Play, Pause, SkipForward, Check, X, CheckCircle, Undo2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 22,
    experience: '2 years fast food',
    questions: [
      'Tell me about yourself',
      'Why do you want to work here?',
      'How do you handle stress?',
      'Describe your availability'
    ],
    currentQuestion: 0,
    status: 'offered'
  },
  {
    id: 2,
    name: 'Marcus Williams',
    age: 19,
    experience: '1 year retail',
    questions: [
      'Tell me about yourself',
      'Why do you want to work here?',
      'How do you handle stress?',
      'Describe your availability'
    ],
    currentQuestion: 0,
    status: 'pending'
  }
];

export const SwipePage = () => {
  console.log('SwipePage component rendering');
  
  const [selectedJob, setSelectedJob] = useState('');
  const [candidates, setCandidates] = useState(mockCandidates);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCandidate = candidates[currentCandidateIndex];
  
  console.log('Current candidate:', currentCandidate);
  console.log('Current candidate index:', currentCandidateIndex);

  const handleNextQuestion = () => {
    if (currentCandidate && currentCandidate.currentQuestion < currentCandidate.questions.length - 1) {
      setCandidates(prev => 
        prev.map((candidate, index) => 
          index === currentCandidateIndex 
            ? { ...candidate, currentQuestion: candidate.currentQuestion + 1 }
            : candidate
        )
      );
    }
  };

  const handleUndoOffer = () => {
    if (currentCandidate && currentCandidate.status === 'offered') {
      setCandidates(prev => 
        prev.map((candidate, index) => 
          index === currentCandidateIndex 
            ? { ...candidate, status: 'pending' }
            : candidate
        )
      );
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log('Swiping:', direction);
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(prev => prev + 1);
      setCandidates(prev => 
        prev.map((candidate, index) => 
          index === currentCandidateIndex + 1 
            ? { ...candidate, currentQuestion: 0 }
            : candidate
        )
      );
    }
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setDragOffset({ x: x * 0.3, y: y * 0.1 });
    }
  };

  const handleDragEnd = () => {
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  const getSwipeIndicator = () => {
    if (!isDragging) return null;
    if (dragOffset.x > 50) return 'right';
    if (dragOffset.x < -50) return 'left';
    return null;
  };

  if (!currentCandidate) {
    console.log('No current candidate, showing completion screen');
    return (
      <div className="flex items-center justify-center h-full p-8 bg-white min-h-screen">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">All done!</h2>
          <p className="text-gray-600">You've reviewed all candidates for this position.</p>
        </div>
      </div>
    );
  }

  console.log('Rendering main SwipePage interface');

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white min-h-screen">
      {/* Job Selection */}
      <div className="p-4 bg-gray-50 border-b">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Job Position
        </label>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-full bg-white border border-gray-300">
            <SelectValue placeholder="Choose a position" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 z-50">
            <SelectItem value="cashier">Cashier</SelectItem>
            <SelectItem value="crew-member">Crew Member</SelectItem>
            <SelectItem value="shift-leader">Shift Leader</SelectItem>
            <SelectItem value="kitchen-staff">Kitchen Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex flex-col p-4">
        {/* Undo Offer Button */}
        {currentCandidate.status === 'offered' && (
          <div className="mb-4 text-center">
            <Button
              onClick={handleUndoOffer}
              variant="outline"
              className="bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100"
            >
              <Undo2 size={16} className="mr-2" />
              Undo Job Offer
            </Button>
          </div>
        )}

        {/* Video Card */}
        <div className="flex-1 flex items-center justify-center">
          <Card 
            ref={cardRef}
            className="relative w-full max-w-sm aspect-[9/16] bg-gradient-to-b from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing transform transition-transform duration-200 border border-gray-200"
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
            }}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
          >
            {/* Swipe Indicators */}
            {getSwipeIndicator() === 'right' && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center z-10">
                <div className="bg-green-500 rounded-full p-4">
                  <Check size={48} className="text-white" />
                </div>
              </div>
            )}
            {getSwipeIndicator() === 'left' && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center z-10">
                <div className="bg-red-500 rounded-full p-4">
                  <X size={48} className="text-white" />
                </div>
              </div>
            )}

            {/* Video Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="h-full flex flex-col justify-between p-6 text-white">
                {/* Progress Bar */}
                <div className="flex space-x-1 mb-4">
                  {currentCandidate.questions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-1 rounded-full ${
                        index <= currentCandidate.currentQuestion ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="text-center mb-4">
                  <p className="text-lg font-medium">
                    {currentCandidate.questions[currentCandidate.currentQuestion]}
                  </p>
                </div>

                {/* Candidate Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-1">{currentCandidate.name}</h3>
                  <p className="text-sm opacity-90 mb-1">Age: {currentCandidate.age}</p>
                  <p className="text-sm opacity-90">{currentCandidate.experience}</p>
                </div>
              </div>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white ml-1" />}
            </button>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 mt-6 mb-4">
          <button
            onClick={() => handleSwipe('left')}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={handleNextQuestion}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all"
          >
            <SkipForward size={24} />
          </button>
          
          <button
            onClick={() => handleSwipe('right')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-all"
          >
            <Check size={24} />
          </button>
        </div>

        {/* Progress Info */}
        <div className="text-center text-sm text-gray-600">
          Candidate {currentCandidateIndex + 1} of {candidates.length}
        </div>
      </div>
    </div>
  );
};
