import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Connect with Experts",
      description: "Find skilled individuals in your area ready to share their knowledge"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "Mutual Learning",
      description: "Exchange skills in a fair and balanced way - everyone teaches and learns"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Safe & Secure",
      description: "Verified profiles and rating system ensure quality interactions"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Quick Matching",
      description: "Smart algorithms match you with compatible skill partners instantly"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Swap Skills,<br />
            <span className="text-blue-200">Grow Together</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with others to exchange knowledge and skills. Learn something new while teaching what you know best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/signup" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button as={Link} to="/browse" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Browse Skills
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our community of learners and teachers. It's simple, safe, and rewarding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of people already exchanging skills and knowledge.
          </p>
          <Button as={Link} to="/signup" size="lg" className="bg-blue-600 hover:bg-blue-700">
            Join SkillSwap Today <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;