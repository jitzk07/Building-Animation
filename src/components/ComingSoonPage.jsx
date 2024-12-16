import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import CityBackground from './city/CityBackground';
import AnimationOrchestrator from './animations/AnimationOrchestrator';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwPuuPy8Ks2SeSsJS6IaN5gySWv6rKSh3axLi7kPTK4HkK4Aqo3V6As9kMqOhtbdWvgSg/exec';

const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [textWidth, setTextWidth] = useState(0);
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      setTextWidth(titleRef.current.offsetWidth);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setStatus('');
    setErrorMessage('');
  
    // Basic client-side validation
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
  
    try {
      // Get user's IP address from a service like ipify
      let ipResponse;
      try {
        ipResponse = await fetch('https://api.ipify.org?format=json');
        ipResponse = await ipResponse.json();
      } catch (error) {
        console.error('IP fetch error:', error);
      }
  
      const submissionData = {
        email: email,
        timestamp: new Date().toISOString(),
        source: window.location.hostname,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        ip: ipResponse?.ip || 'Unknown',
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
  
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
  
      // Since we're using no-cors, assume success if no error thrown
      setStatus('success');
      setEmail('');
      
      if (formRef.current) {
        formRef.current.reset();
      }
  
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
      setErrorMessage('Failed to submit. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildingsLoad = (buildingConfigs) => {
    setBuildings(buildingConfigs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden ">
      <CityBackground onBuildingsLoad={handleBuildingsLoad} />
      
      {buildings.length > 0 && textWidth > 0 && (
        <AnimationOrchestrator 
          buildings={buildings}
          textWidth={textWidth}
        />
      )}
      
      <div className="w-full mt-20 text-center relative" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          ref={titleRef}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-white mt-8 sm:mt-12 tracking-tight">
            <span className="text-blue-200">Your </span> Conversations, Your Insights,
            <br />
            <span className="text-white">Your Growth.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-p sm:text-2xl text-blue-200 mt-2 sm:mt-4 tracking-wide">
            Chatslytics analyze chats and emails, delivering tailored insights that make productivity effortless and business decisions smarter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-400/20 mt-5 px-4 py-2 rounded-full text-green-400 text-sm">
              Coming Soon
            </div>

            <div className="w-full max-w-md mt-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-3">
                  <p className="text-blue-200 text-lg sm:text-xl font-medium mb-2">Join the Beta List</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 text-white border-blue-300/20 placeholder-blue-200/50 flex-1 h-12 text-lg"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12 text-lg min-w-[120px] mt-3 sm:mt-0"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⟳
                        </motion.div>
                      ) : (
                        'Join'
                      )}
                    </Button>
                  </div>
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center text-emerald-400 gap-2 bg-emerald-950/30 p-4 rounded-lg text-lg"
                  >
                    <CheckCircle2 size={24} />
                    <span>You're on the list! We'll be in touch soon.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center text-red-400 gap-2 bg-red-950/30 p-4 rounded-lg text-lg"
                  >
                    <AlertCircle size={24} />
                    <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonPage;