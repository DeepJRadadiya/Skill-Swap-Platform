import React, { useState } from 'react';
import { Star, Send, User, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';

function Feedback({ currentUser }) {
  const [selectedSwap, setSelectedSwap] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock completed swaps for feedback
  const [completedSwaps] = useState([
    {
      id: 1,
      partner: 'Sarah Johnson',
      skill: 'Photography',
      completedDate: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      partner: 'Mike Chen',
      skill: 'Python Programming',
      completedDate: '2024-01-10',
      status: 'completed'
    },
    {
      id: 3,
      partner: 'David Brown',
      skill: 'Digital Marketing',
      completedDate: '2024-01-08',
      status: 'completed'
    }
  ]);

  // Mock previous feedback
  const [previousFeedback] = useState([
    {
      id: 1,
      partner: 'Emma Wilson',
      skill: 'Graphic Design',
      rating: 5,
      feedback: 'Emma was an excellent teacher! Her design skills are outstanding and she explained concepts very clearly.',
      date: '2024-01-05'
    },
    {
      id: 2,
      partner: 'Alex Thompson',
      skill: 'Guitar Lessons',
      rating: 4,
      feedback: 'Great guitar instructor. Very patient and knowledgeable about music theory.',
      date: '2023-12-28'
    }
  ]);

  const handleRatingClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Feedback submitted:', {
      swapId: selectedSwap,
      rating,
      feedback: feedbackText
    });

    // Reset form
    setSelectedSwap('');
    setRating(0);
    setFeedbackText('');
    setIsSubmitting(false);

    alert('Thank you for your feedback!');
  };

  const renderStars = (currentRating, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${
          index < currentRating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => handleRatingClick(index) : undefined}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leave Feedback</h1>
          <p className="text-gray-600">
            Share your experience and help other members by leaving honest feedback about your skill swaps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div>
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900">Submit Feedback</h2>
              </Card.Header>
              <Card.Content className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormField label="Select Completed Swap" required>
                    <FormField.Select
                      value={selectedSwap}
                      onChange={(e) => setSelectedSwap(e.target.value)}
                      required
                    >
                      <option value="">Choose a completed swap...</option>
                      {completedSwaps.map(swap => (
                        <option key={swap.id} value={swap.id}>
                          {swap.partner} - {swap.skill} ({new Date(swap.completedDate).toLocaleDateString()})
                        </option>
                      ))}
                    </FormField.Select>
                  </FormField>

                  <FormField label="Rating" required>
                    <div className="flex items-center space-x-1">
                      {renderStars(rating, true)}
                      <span className="ml-3 text-sm text-gray-600">
                        {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
                      </span>
                    </div>
                  </FormField>

                  <FormField label="Your Feedback" required>
                    <FormField.Textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Share your experience with this skill swap. What did you learn? How was the teaching quality? Would you recommend this person to others?"
                      rows={6}
                      required
                    />
                  </FormField>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting || !selectedSwap || rating === 0 || !feedbackText.trim()}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </Card.Content>
            </Card>

            {/* Guidelines */}
            <Card className="mt-6">
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Feedback Guidelines</h3>
              </Card.Header>
              <Card.Content className="p-6">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Be honest and constructive in your feedback
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Focus on the teaching quality and skill exchange experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Mention specific things you learned or appreciated
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Keep feedback professional and respectful
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Your feedback helps others make informed decisions
                  </li>
                </ul>
              </Card.Content>
            </Card>
          </div>

          {/* Previous Feedback */}
          <div>
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900">Your Previous Feedback</h2>
              </Card.Header>
              <Card.Content className="p-6">
                {previousFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {previousFeedback.map(feedback => (
                      <div key={feedback.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {feedback.partner.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{feedback.partner}</p>
                              <p className="text-sm text-gray-500">{feedback.skill}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{feedback.feedback}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(feedback.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No previous feedback yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Complete some skill swaps to start leaving feedback
                    </p>
                  </div>
                )}
              </Card.Content>
            </Card>

            {/* Feedback Stats */}
            <Card className="mt-6">
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Your Feedback Stats</h3>
              </Card.Header>
              <Card.Content className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{previousFeedback.length}</div>
                    <div className="text-sm text-gray-600">Reviews Given</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {previousFeedback.length > 0 
                        ? (previousFeedback.reduce((sum, f) => sum + f.rating, 0) / previousFeedback.length).toFixed(1)
                        : '0'
                      }
                    </div>
                    <div className="text-sm text-gray-600">Avg Rating Given</div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;