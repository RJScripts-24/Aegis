import { useState, useRef, useEffect } from 'react';
import { AlertCircle, Upload, MapPin, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';

const disasters = [
  {
    id: 'cyclone' as const,
    label: 'Cyclone',
    image: 'https://images.unsplash.com/photo-1601596376497-e66fa5936da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwc3Rvcm0lMjBzYXRlbGxpdGV8ZW58MXx8fHwxNzYxMzM2MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'flood' as const,
    label: 'Flood',
    image: 'https://images.unsplash.com/photo-1760500959972-27f751e094b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMHdhdGVyJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzYxMzI3NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'heatwave' as const,
    label: 'Heatwave',
    image: 'https://images.unsplash.com/photo-1624833420629-dae78b54238e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGhvdCUyMHN1bnxlbnwxfHx8fDE3NjEzMzU5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'landslide' as const,
    label: 'Landslide',
    image: 'https://images.unsplash.com/photo-1621315898086-0e940d7a221e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2xpZGUlMjBtb3VudGFpbiUyMGRpc2FzdGVyfGVufDF8fHx8MTc2MTMxNTc5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'earthquake' as const,
    label: 'Earthquake',
    image: 'https://images.unsplash.com/photo-1661520754901-bb5d6b374fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwY3JhY2slMjBncm91bmR8ZW58MXx8fHwxNzYxMzI3NjI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'tsunami' as const,
    label: 'Tsunami',
    image: 'https://images.unsplash.com/photo-1603805980694-834a24817355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwd2F2ZSUyMG9jZWFufGVufDF8fHx8MTc2MTMzNjQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// Animation component wrapper
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['example-photo-1.jpg', 'example-photo-2.jpg']);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleDisasterSelect = (id: string) => {
    setSelectedDisaster(id);
  };

  const handleContinueToUpload = () => {
    if (selectedDisaster) {
      setCurrentStep(2);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContinueToLocation = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveFile = (filename: string) => {
    setUploadedFiles(files => files.filter(f => f !== filename));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted', {
      disaster: selectedDisaster,
      files: uploadedFiles,
      notes: additionalNotes
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Header - Always visible with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="bg-gradient-to-r from-[#FF1B5E] via-[#FF3366] to-[#FF6B35] rounded-lg p-6 flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white tracking-wide text-[28px] font-semibold">Report an Incident</h1>
          </div>
        </motion.div>

        {/* Progress Steps - Animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                animate={{
                  scale: currentStep === 1 ? [1, 1.1, 1] : 1,
                  backgroundColor: currentStep >= 1 ? '#FF1B5E' : '#2C2C2C'
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                1
              </motion.div>
              <span className={`text-sm transition-colors duration-300 ${
                currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                Disaster Type
              </span>
            </div>
            <ChevronRight className="text-muted-foreground -mt-6" />
          </div>

          <div className="flex items-center gap-4 flex-1">
            <div className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                animate={{
                  scale: currentStep === 2 ? [1, 1.1, 1] : 1,
                  backgroundColor: currentStep >= 2 ? '#FF1B5E' : '#2C2C2C'
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                2
              </motion.div>
              <span className={`text-sm transition-colors duration-300 ${
                currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                Upload Photos
              </span>
            </div>
            <ChevronRight className="text-muted-foreground -mt-6" />
          </div>

          <div className="flex items-center gap-4 flex-1">
            <div className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                animate={{
                  scale: currentStep === 3 ? [1, 1.1, 1] : 1,
                  backgroundColor: currentStep >= 3 ? '#FF1B5E' : '#2C2C2C'
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                3
              </motion.div>
              <span className={`text-sm transition-colors duration-300 ${
                currentStep >= 3 ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                Location & Submit
              </span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Choose Type of Disaster */}
        {currentStep === 1 && (
          <AnimatedSection>
            <div className="bg-card rounded-lg p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#FF1B5E] flex items-center justify-center text-white font-semibold">
                    1
                  </div>
                  <h2 className="text-card-foreground text-[32px] font-semibold">Choose Type of Disaster</h2>
                </div>

                <motion.div 
                  className="grid grid-cols-3 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.08
                      }
                    }
                  }}
                >
                  {disasters.slice(0, 6).map((disaster, index) => (
                    <motion.button
                      key={disaster.id}
                      onClick={() => handleDisasterSelect(disaster.id)}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative overflow-hidden rounded-lg ring-2 transition-all ${
                        selectedDisaster === disaster.id
                          ? 'ring-[#FF1B5E]'
                          : 'ring-transparent hover:ring-1 hover:ring-muted-foreground/30'
                      }`}
                    >
                      <div className="aspect-[4/3] relative">
                        {disaster.image && (
                          <ImageWithFallback
                            src={disaster.image}
                            alt={disaster.label}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        {selectedDisaster === disaster.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FF1B5E] flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-medium">{disaster.label}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                <motion.button
                  onClick={() => handleDisasterSelect('other')}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedDisaster === 'other'
                      ? 'border-[#FF1B5E] bg-secondary/50'
                      : 'border-border bg-secondary/30 hover:bg-secondary/40'
                  }`}
                >
                  <span className="text-foreground font-medium">Other</span>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={handleContinueToUpload}
                    disabled={!selectedDisaster}
                    className="w-full bg-[#5B5B7A] hover:bg-[#6B6B8A] text-white rounded-lg py-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
                  >
                    Continue to Upload Photos
                  </Button>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Step 2: Upload Photos */}
        {currentStep === 2 && (
          <AnimatedSection>
            <div className="bg-card rounded-lg p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#FF1B5E] flex items-center justify-center text-white font-semibold">
                    2
                  </div>
                  <h2 className="text-card-foreground text-[32px] font-semibold">Upload Photos</h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                  className="border-2 border-dashed border-border bg-secondary/20 rounded-lg p-12 text-center transition-all hover:border-muted-foreground/30 cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center"
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <p className="text-foreground mb-1 font-medium">Click to upload or drag and drop</p>
                      <p className="text-muted-foreground text-sm">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <motion.div 
                      className="cursor-pointer text-[#FF1B5E] transition-colors hover:text-[#FF3366] font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse files
                    </motion.div>
                  </div>
                </motion.div>

                {uploadedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <p className="text-foreground text-sm font-medium">Uploaded files:</p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <motion.div
                          key={file}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/40 transition-colors"
                        >
                          <span className="text-foreground text-sm">{file}</span>
                          <motion.button
                            onClick={() => handleRemoveFile(file)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                          >
                            Remove
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3"
                >
                  <Button 
                    onClick={handleBack}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg py-6 transition-all font-medium"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleContinueToLocation}
                    className="flex-1 bg-[#5B5B7A] hover:bg-[#6B6B8A] text-white rounded-lg py-6 transition-all font-medium"
                  >
                    Continue to Location
                  </Button>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Step 3: Location & Submit */}
        {currentStep === 3 && (
          <AnimatedSection>
            <div className="bg-card rounded-lg p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#FF1B5E] flex items-center justify-center text-white font-semibold">
                    3
                  </div>
                  <h2 className="text-card-foreground text-[32px] font-semibold">Location & Submit</h2>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#FFF5F0]/5 border border-[#FF1B5E]/20 rounded-lg p-4 flex items-center gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MapPin className="w-5 h-5 text-[#FF1B5E]" />
                  </motion.div>
                  <p className="text-foreground font-medium">Using your current location...</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <label className="text-foreground text-sm font-medium">Additional Notes (Optional)</label>
                  <motion.textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Provide any additional details about the incident..."
                    rows={4}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-secondary/30 border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5B5B7A] transition-all resize-none"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3"
                >
                  <Button 
                    onClick={handleBack}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg py-6 transition-all font-medium"
                  >
                    Back
                  </Button>
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleSubmit}
                      className="w-full bg-[#5B5B7A] hover:bg-[#6B6B8A] text-white rounded-lg py-6 transition-all font-medium"
                    >
                      Submit Report
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
