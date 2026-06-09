import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Clock, Shield, CheckCircle, X } from 'lucide-react';

interface FormData {
  // Step 1: Basic Contact Information
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  currentCountry: string;
  
  // Step 2: Investment Budget & Risk Profile
  investmentBudget: string;
  downPaymentPercentage: number;
  investmentTimeHorizon: string;
  riskTolerance: string;
  liquidityNeeds: string;
  leveragePreference: string;
  
  // Step 3: Property Preferences & Goals
  primaryGoal: string[];
  preferredRegions: string[];
  propertyTypes: string[];
  propertyCondition: string;
  rentalStrategy: string;
  
  // Step 4: Timeline & Tax Situation
  purchaseTimeline: string;
  occupancyPlan: string;
  taxResidency: string;
  consideringPortugueseTaxResidency: string;
  goldenVisaInterest: string;
  taxOptimizationPriority: number;
  needsFinancingAssistance: string;
  legalAssistanceNeeded: string[];
  
  // Step 5: Experience Level & Final Details
  investmentExperience: string;
  portugueseMarketKnowledge: number;
  hasVisitedPortugal: string;
  specificPropertiesInMind: string;
  keyQuestionsOrConcerns: string;
  additionalContext: string;
  consultationPreference: string;
  preferredCallTime: string;
  referralSource: string;
}

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredLanguage: '',
    currentCountry: '',
    investmentBudget: '',
    downPaymentPercentage: 30,
    investmentTimeHorizon: '',
    riskTolerance: '',
    liquidityNeeds: '',
    leveragePreference: '',
    primaryGoal: [],
    preferredRegions: [],
    propertyTypes: [],
    propertyCondition: '',
    rentalStrategy: '',
    purchaseTimeline: '',
    occupancyPlan: '',
    taxResidency: '',
    consideringPortugueseTaxResidency: '',
    goldenVisaInterest: '',
    taxOptimizationPriority: 7,
    needsFinancingAssistance: '',
    legalAssistanceNeeded: [],
    investmentExperience: '',
    portugueseMarketKnowledge: 3,
    hasVisitedPortugal: '',
    specificPropertiesInMind: '',
    keyQuestionsOrConcerns: '',
    additionalContext: '',
    consultationPreference: '',
    preferredCallTime: '',
    referralSource: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);

  const totalSteps = 5;

  // Auto-save progress
  useEffect(() => {
    const autoSave = async () => {
      if (formData.email && currentStep > 1) {
        try {
          await fetch('/api/form-submissions/partial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: localStorage.getItem('assessmentSessionId') || generateUUID(),
              timestamp: new Date().toISOString(),
              step: currentStep,
              data: formData,
              paymentCompleted: false
            })
          });
          setSavedProgress(true);
          setTimeout(() => setSavedProgress(false), 2000);
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    };

    const timer = setTimeout(autoSave, 2000);
    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim() || formData.fullName.length < 2) {
          newErrors.fullName = 'Please enter your full name';
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim() || !/^\+\d{1,4}\s?\d{6,14}$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Include country code (e.g., +351 for Portugal)';
        }
        if (!formData.preferredLanguage) {
          newErrors.preferredLanguage = 'Please select your preferred language';
        }
        if (!formData.currentCountry) {
          newErrors.currentCountry = 'Please select your country of residence';
        }
        break;
      case 2:
        if (!formData.investmentBudget) {
          newErrors.investmentBudget = 'Please select your investment budget';
        }
        if (!formData.investmentTimeHorizon) {
          newErrors.investmentTimeHorizon = 'Please select your investment time horizon';
        }
        if (!formData.riskTolerance) {
          newErrors.riskTolerance = 'Please select your risk tolerance';
        }
        if (!formData.liquidityNeeds) {
          newErrors.liquidityNeeds = 'Please select your liquidity requirements';
        }
        if (!formData.leveragePreference) {
          newErrors.leveragePreference = 'Please select your financing preference';
        }
        break;
      case 3:
        if (formData.primaryGoal.length === 0) {
          newErrors.primaryGoal = 'Please select at least one investment goal';
        }
        if (formData.preferredRegions.length === 0) {
          newErrors.preferredRegions = 'Please select at least one preferred region';
        }
        if (formData.propertyTypes.length === 0) {
          newErrors.propertyTypes = 'Please select at least one property type';
        }
        if (!formData.propertyCondition) {
          newErrors.propertyCondition = 'Please select preferred property condition';
        }
        break;
      case 4:
        if (!formData.purchaseTimeline) {
          newErrors.purchaseTimeline = 'Please select your purchase timeline';
        }
        if (!formData.occupancyPlan) {
          newErrors.occupancyPlan = 'Please select how you plan to use the property';
        }
        if (!formData.taxResidency) {
          newErrors.taxResidency = 'Please select your current tax residency';
        }
        if (!formData.consideringPortugueseTaxResidency) {
          newErrors.consideringPortugueseTaxResidency = 'Please indicate your interest in Portuguese tax residency';
        }
        if (!formData.goldenVisaInterest) {
          newErrors.goldenVisaInterest = 'Please indicate your Golden Visa interest';
        }
        if (!formData.needsFinancingAssistance) {
          newErrors.needsFinancingAssistance = 'Please indicate if you need financing assistance';
        }
        break;
      case 5:
        if (!formData.investmentExperience) {
          newErrors.investmentExperience = 'Please select your investment experience level';
        }
        if (!formData.hasVisitedPortugal) {
          newErrors.hasVisitedPortugal = 'Please indicate if you have visited Portugal';
        }
        if (!formData.consultationPreference) {
          newErrors.consultationPreference = 'Please select your consultation preference';
        }
        if (!formData.preferredCallTime) {
          newErrors.preferredCallTime = 'Please select your preferred call time';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsProcessing(true);
    
    try {
      // Create AI agent data package
      const aiAgentDataPackage = {
        client: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          language: formData.preferredLanguage,
          country: formData.currentCountry,
          timezone: formData.preferredCallTime
        },
        financial: {
          budget: formData.investmentBudget,
          downPayment: formData.downPaymentPercentage,
          timeHorizon: formData.investmentTimeHorizon,
          riskTolerance: formData.riskTolerance,
          liquidityNeeds: formData.liquidityNeeds,
          leverage: formData.leveragePreference,
          needsFinancing: formData.needsFinancingAssistance
        },
        goals: {
          primary: formData.primaryGoal,
          regions: formData.preferredRegions,
          propertyTypes: formData.propertyTypes,
          condition: formData.propertyCondition,
          rentalStrategy: formData.rentalStrategy,
          occupancy: formData.occupancyPlan
        },
        legal: {
          taxResidency: formData.taxResidency,
          portugueseResidency: formData.consideringPortugueseTaxResidency,
          goldenVisa: formData.goldenVisaInterest,
          taxPriority: formData.taxOptimizationPriority,
          servicesNeeded: formData.legalAssistanceNeeded
        },
        timeline: {
          purchase: formData.purchaseTimeline,
          consultationPreference: formData.consultationPreference,
          callWindow: formData.preferredCallTime
        },
        context: {
          experience: formData.investmentExperience,
          marketKnowledge: formData.portugueseMarketKnowledge,
          visitedPortugal: formData.hasVisitedPortugal,
          specificProperties: formData.specificPropertiesInMind,
          questions: formData.keyQuestionsOrConcerns,
          additionalInfo: formData.additionalContext
        },
        metadata: {
          submissionDate: new Date().toISOString(),
          referralSource: formData.referralSource
        }
      };

      // Simulate payment processing and AI trigger
      setTimeout(() => {
        setIsProcessing(false);
        alert('Assessment form completed! This will now trigger AI agent processing and Stripe payment integration.');
        onClose();
      }, 2000);
      
    } catch (error) {
      setIsProcessing(false);
      console.error('Submission failed:', error);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-brown-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-brown-600">8-12 minutes</span>
      </div>
      <div className="w-full bg-brown-200 rounded-full h-2">
        <div 
          className="bg-gold-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      {savedProgress && (
        <div className="flex items-center mt-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          Progress saved ✓
        </div>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-brown-800 mb-2">
          Let's Start With Your Details
        </h2>
        <p className="text-brown-600">
          We'll use this information to personalize your investment assessment
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          placeholder="João Silva"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.fullName ? 'border-red-500' : 'border-brown-300'
          }`}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="joao.silva@email.com"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.email ? 'border-red-500' : 'border-brown-300'
          }`}
        />
        <p className="mt-1 text-sm text-brown-600">Your assessment report will be sent here</p>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Phone Number (with country code) *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          placeholder="+351 912 345 678"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.phone ? 'border-red-500' : 'border-brown-300'
          }`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Preferred Language for Communication *
        </label>
        <select
          value={formData.preferredLanguage}
          onChange={(e) => updateFormData('preferredLanguage', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.preferredLanguage ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Language</option>
          <option value="pt">🇵🇹 Portuguese (Português)</option>
          <option value="en">🇬🇧 English</option>
          <option value="es">🇪🇸 Spanish (Español)</option>
          <option value="fr">🇫🇷 French (Français)</option>
          <option value="de">🇩🇪 German (Deutsch)</option>
          <option value="it">🇮🇹 Italian (Italiano)</option>
          <option value="ru">🇷🇺 Russian (Русский)</option>
          <option value="zh">🇨🇳 Chinese (中文)</option>
        </select>
        <p className="mt-1 text-sm text-brown-600">Your report and consultation will be in this language</p>
        {errors.preferredLanguage && <p className="mt-1 text-sm text-red-600">{errors.preferredLanguage}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Country of Current Residence *
        </label>
        <select
          value={formData.currentCountry}
          onChange={(e) => updateFormData('currentCountry', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.currentCountry ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
          <option value="BR">Brazil</option>
          <option value="CN">China</option>
          <option value="SG">Singapore</option>
          <option value="AE">UAE</option>
        </select>
        <p className="mt-1 text-sm text-brown-600">This helps us provide relevant tax and legal information</p>
        {errors.currentCountry && <p className="mt-1 text-sm text-red-600">{errors.currentCountry}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-brown-800 mb-2">
          Your Investment Parameters
        </h2>
        <p className="text-brown-600">
          Help us understand your financial capacity and risk profile
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Total Investment Budget (EUR) *
        </label>
        <select
          value={formData.investmentBudget}
          onChange={(e) => updateFormData('investmentBudget', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.investmentBudget ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Budget Range</option>
          <option value="under_100k">Under €100,000</option>
          <option value="100k_250k">€100,000 - €250,000</option>
          <option value="250k_500k">€250,000 - €500,000</option>
          <option value="500k_1m">€500,000 - €1,000,000</option>
          <option value="1m_2m">€1,000,000 - €2,000,000</option>
          <option value="over_2m">Over €2,000,000</option>
        </select>
        {errors.investmentBudget && <p className="mt-1 text-sm text-red-600">{errors.investmentBudget}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Down Payment Capability: {formData.downPaymentPercentage}%
        </label>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={formData.downPaymentPercentage}
          onChange={(e) => updateFormData('downPaymentPercentage', parseInt(e.target.value))}
          className="w-full h-2 bg-brown-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-brown-600 mt-1">
          <span>10%</span>
          <span>100% (Cash)</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Investment Time Horizon *
        </label>
        <select
          value={formData.investmentTimeHorizon}
          onChange={(e) => updateFormData('investmentTimeHorizon', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.investmentTimeHorizon ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Time Horizon</option>
          <option value="short_1_3">1-3 years (Short-term)</option>
          <option value="medium_3_7">3-7 years (Medium-term)</option>
          <option value="long_7plus">7+ years (Long-term)</option>
          <option value="indefinite">Indefinite (Generational wealth)</option>
        </select>
        {errors.investmentTimeHorizon && <p className="mt-1 text-sm text-red-600">{errors.investmentTimeHorizon}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Risk Tolerance Level *
        </label>
        <div className="space-y-3">
          {[
            { value: 'conservative', label: 'Conservative', desc: 'Prefer established areas, stable returns, minimal volatility' },
            { value: 'moderate', label: 'Moderate', desc: 'Balance between stability and growth, accept some market fluctuation' },
            { value: 'aggressive', label: 'Aggressive', desc: 'Willing to invest in emerging areas, higher potential returns, accept higher risk' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="riskTolerance"
                value={option.value}
                checked={formData.riskTolerance === option.value}
                onChange={(e) => updateFormData('riskTolerance', e.target.value)}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div>
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.riskTolerance && <p className="mt-1 text-sm text-red-600">{errors.riskTolerance}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Liquidity Requirements *
        </label>
        <div className="space-y-3">
          {[
            { value: 'high', label: 'High - Need to sell within 1-2 years if needed' },
            { value: 'medium', label: 'Medium - Can hold 3-5 years' },
            { value: 'low', label: 'Low - Can hold long-term (10+ years)' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="liquidityNeeds"
                value={option.value}
                checked={formData.liquidityNeeds === option.value}
                onChange={(e) => updateFormData('liquidityNeeds', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.liquidityNeeds && <p className="mt-1 text-sm text-red-600">{errors.liquidityNeeds}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Financing Preference *
        </label>
        <div className="space-y-3">
          {[
            { value: 'cash', label: 'All-cash purchase (no mortgage)' },
            { value: 'moderate', label: 'Moderate leverage (50-70% mortgage)' },
            { value: 'maximum', label: 'Maximum leverage (minimize cash, maximize mortgage)' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="leveragePreference"
                value={option.value}
                checked={formData.leveragePreference === option.value}
                onChange={(e) => updateFormData('leveragePreference', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.leveragePreference && <p className="mt-1 text-sm text-red-600">{errors.leveragePreference}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-brown-800 mb-2">
          What Are You Looking For?
        </h2>
        <p className="text-brown-600">
          Define your property preferences and investment goals
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Investment Goals (Select all that apply) *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'rental_income', label: 'Rental Income Generation', icon: '💰' },
            { value: 'capital_appreciation', label: 'Capital Appreciation', icon: '📈' },
            { value: 'personal_use', label: 'Personal Use (Vacation/Retirement)', icon: '🏖️' },
            { value: 'golden_visa', label: 'Golden Visa / Residency', icon: '🛂' },
            { value: 'portfolio_diversification', label: 'Portfolio Diversification', icon: '📊' },
            { value: 'tax_optimization', label: 'Tax Optimization', icon: '🧾' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-brown-200 rounded-lg hover:bg-cream-50">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.primaryGoal.includes(option.value)}
                onChange={(e) => {
                  const goals = formData.primaryGoal;
                  if (e.target.checked) {
                    updateFormData('primaryGoal', [...goals, option.value]);
                  } else {
                    updateFormData('primaryGoal', goals.filter(g => g !== option.value));
                  }
                }}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-lg">{option.icon}</span>
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.primaryGoal && <p className="mt-1 text-sm text-red-600">{errors.primaryGoal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Preferred Portuguese Regions (Select all that interest you) *
        </label>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { value: 'lisbon_center', label: 'Lisbon Centro (Historic, High-End)', price: '€450k - €1.2M', yield: '3-5%' },
            { value: 'lisbon_surroundings', label: 'Greater Lisbon (Cascais, Sintra)', price: '€350k - €900k', yield: '3-4%' },
            { value: 'porto_center', label: 'Porto Centro (Urban, Tourism)', price: '€280k - €650k', yield: '4-6%' },
            { value: 'algarve_coastal', label: 'Algarve Coast (Lagos, Albufeira)', price: '€300k - €850k', yield: '5-7%' },
            { value: 'central_portugal', label: 'Central Portugal (Coimbra, Aveiro)', price: '€120k - €350k', yield: '5-7%' },
            { value: 'open', label: 'Open to Recommendations', price: 'Varies', yield: 'Optimized' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 border border-brown-200 rounded-lg hover:bg-cream-50">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.preferredRegions.includes(option.value)}
                onChange={(e) => {
                  const regions = formData.preferredRegions;
                  if (e.target.checked) {
                    updateFormData('preferredRegions', [...regions, option.value]);
                  } else {
                    updateFormData('preferredRegions', regions.filter(r => r !== option.value));
                  }
                }}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div className="flex-1">
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.price} • {option.yield} yield</div>
              </div>
            </label>
          ))}
        </div>
        {errors.preferredRegions && <p className="mt-1 text-sm text-red-600">{errors.preferredRegions}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Property Types of Interest (Select all that apply) *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'apartment_city', label: 'City Apartments (T1-T3)', icon: '🏢' },
            { value: 'apartment_luxury', label: 'Luxury Apartments/Penthouses', icon: '✨' },
            { value: 'villa_coastal', label: 'Coastal Villas', icon: '🏖️' },
            { value: 'villa_countryside', label: 'Countryside Villas', icon: '🌳' },
            { value: 'traditional_house', label: 'Traditional Houses (renovation)', icon: '🏚️' },
            { value: 'new_development', label: 'New Developments (off-plan)', icon: '🏗️' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-brown-200 rounded-lg hover:bg-cream-50">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.propertyTypes.includes(option.value)}
                onChange={(e) => {
                  const types = formData.propertyTypes;
                  if (e.target.checked) {
                    updateFormData('propertyTypes', [...types, option.value]);
                  } else {
                    updateFormData('propertyTypes', types.filter(t => t !== option.value));
                  }
                }}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-lg">{option.icon}</span>
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.propertyTypes && <p className="mt-1 text-sm text-red-600">{errors.propertyTypes}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Preferred Property Condition *
        </label>
        <div className="space-y-3">
          {[
            { value: 'turnkey', label: 'Move-in Ready (Turnkey)', desc: 'No renovation needed, immediate rental/occupancy' },
            { value: 'light_renovation', label: 'Light Renovation Needed', desc: 'Cosmetic updates, 1-3 months work' },
            { value: 'full_renovation', label: 'Full Renovation Project', desc: 'Significant work, 6-12 months, value-add opportunity' },
            { value: 'new_construction', label: 'New Construction Only', desc: 'Brand new, warranty included' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="propertyCondition"
                value={option.value}
                checked={formData.propertyCondition === option.value}
                onChange={(e) => updateFormData('propertyCondition', e.target.value)}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div>
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.propertyCondition && <p className="mt-1 text-sm text-red-600">{errors.propertyCondition}</p>}
      </div>

      {formData.primaryGoal.includes('rental_income') && (
        <div>
          <label className="block text-sm font-medium text-brown-800 mb-4">
            Preferred Rental Strategy
          </label>
          <div className="space-y-3">
            {[
              { value: 'long_term', label: 'Long-term Rental (1+ year leases)', yield: '3-5% net' },
              { value: 'short_term', label: 'Short-term/Vacation Rental (Airbnb)', yield: '5-8% net' },
              { value: 'corporate', label: 'Corporate Rental (Expat/Business)', yield: '4-6% net' },
              { value: 'mixed', label: 'Mixed Strategy (Seasonal variation)', yield: '4-7% net' }
            ].map((option) => (
              <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="rentalStrategy"
                  value={option.value}
                  checked={formData.rentalStrategy === option.value}
                  onChange={(e) => updateFormData('rentalStrategy', e.target.value)}
                  className="mt-1 text-gold-600 focus:ring-gold-500"
                />
                <div>
                  <div className="font-medium text-brown-800">{option.label}</div>
                  <div className="text-sm text-brown-600">{option.yield}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-brown-800 mb-2">
          Timeline & Legal Considerations
        </h2>
        <p className="text-brown-600">
          Help us understand your timeline and tax situation
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          When Do You Plan to Purchase? *
        </label>
        <select
          value={formData.purchaseTimeline}
          onChange={(e) => updateFormData('purchaseTimeline', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.purchaseTimeline ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Timeline</option>
          <option value="immediate">Immediately (Within 3 months)</option>
          <option value="short">Short-term (3-6 months)</option>
          <option value="medium">Medium-term (6-12 months)</option>
          <option value="long">Long-term (12+ months)</option>
          <option value="exploring">Just Exploring (No specific timeline)</option>
        </select>
        {errors.purchaseTimeline && <p className="mt-1 text-sm text-red-600">{errors.purchaseTimeline}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          How Will You Use the Property? *
        </label>
        <div className="space-y-3">
          {[
            { value: 'investment_only', label: 'Investment Only (Never personal use)' },
            { value: 'occasional', label: 'Occasional Personal Use (< 30 days/year)' },
            { value: 'seasonal', label: 'Seasonal Use (Summer/Winter residence)' },
            { value: 'primary', label: 'Primary Residence (Move to Portugal)' },
            { value: 'retirement', label: 'Retirement Home (Future relocation)' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="occupancyPlan"
                value={option.value}
                checked={formData.occupancyPlan === option.value}
                onChange={(e) => updateFormData('occupancyPlan', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.occupancyPlan && <p className="mt-1 text-sm text-red-600">{errors.occupancyPlan}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Current Tax Residency *
        </label>
        <select
          value={formData.taxResidency}
          onChange={(e) => updateFormData('taxResidency', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.taxResidency ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Tax Residency</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
          <option value="BR">Brazil</option>
          <option value="CN">China</option>
        </select>
        <p className="mt-1 text-sm text-brown-600">Important for cross-border tax optimization</p>
        {errors.taxResidency && <p className="mt-1 text-sm text-red-600">{errors.taxResidency}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Are You Considering Portuguese Tax Residency? *
        </label>
        <div className="space-y-3">
          {[
            { value: 'yes_definite', label: 'Yes, definitely' },
            { value: 'yes_considering', label: 'Yes, considering it' },
            { value: 'maybe', label: 'Maybe, need more information' },
            { value: 'no', label: 'No, keeping current residency' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="consideringPortugueseTaxResidency"
                value={option.value}
                checked={formData.consideringPortugueseTaxResidency === option.value}
                onChange={(e) => updateFormData('consideringPortugueseTaxResidency', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.consideringPortugueseTaxResidency && <p className="mt-1 text-sm text-red-600">{errors.consideringPortugueseTaxResidency}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Interest in Golden Visa Program *
        </label>
        <div className="space-y-3">
          {[
            { value: 'primary_goal', label: 'Primary Goal (Residency/Citizenship path)', desc: 'Property purchase driven by visa requirements' },
            { value: 'secondary_benefit', label: 'Secondary Benefit (Nice to have)', desc: 'Mainly investment, visa is bonus' },
            { value: 'not_eligible', label: 'Not Eligible (Already EU citizen)', desc: 'Don\'t need visa' },
            { value: 'not_interested', label: 'Not Interested', desc: 'Pure investment focus' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="goldenVisaInterest"
                value={option.value}
                checked={formData.goldenVisaInterest === option.value}
                onChange={(e) => updateFormData('goldenVisaInterest', e.target.value)}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div>
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.goldenVisaInterest && <p className="mt-1 text-sm text-red-600">{errors.goldenVisaInterest}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Tax Optimization Priority: {formData.taxOptimizationPriority}/10
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={formData.taxOptimizationPriority}
          onChange={(e) => updateFormData('taxOptimizationPriority', parseInt(e.target.value))}
          className="w-full h-2 bg-brown-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-brown-600 mt-1">
          <span>Not Important</span>
          <span>Critical Priority</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Do You Need Assistance with Financing? *
        </label>
        <div className="space-y-3">
          {[
            { value: 'yes_required', label: 'Yes, financing required for purchase' },
            { value: 'yes_optional', label: 'Yes, considering mortgage for leverage' },
            { value: 'no_cash', label: 'No, purchasing with cash' },
            { value: 'no_arranged', label: 'No, financing already arranged' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="needsFinancingAssistance"
                value={option.value}
                checked={formData.needsFinancingAssistance === option.value}
                onChange={(e) => updateFormData('needsFinancingAssistance', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.needsFinancingAssistance && <p className="mt-1 text-sm text-red-600">{errors.needsFinancingAssistance}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Legal/Professional Services Needed (Select all)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'lawyer', label: 'Portuguese Property Lawyer' },
            { value: 'tax_advisor', label: 'Cross-Border Tax Advisor' },
            { value: 'immigration', label: 'Immigration Lawyer (Golden Visa)' },
            { value: 'property_manager', label: 'Property Management Company' },
            { value: 'none', label: 'None - I have connections already' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-brown-200 rounded-lg hover:bg-cream-50">
              <input
                type="checkbox"
                value={option.value}
                checked={formData.legalAssistanceNeeded.includes(option.value)}
                onChange={(e) => {
                  const services = formData.legalAssistanceNeeded;
                  if (e.target.checked) {
                    updateFormData('legalAssistanceNeeded', [...services, option.value]);
                  } else {
                    updateFormData('legalAssistanceNeeded', services.filter(s => s !== option.value));
                  }
                }}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-brown-800 mb-2">
          Almost Done - Just a Few More Questions
        </h2>
        <p className="text-brown-600">
          Help us tailor the assessment to your experience level
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Real Estate Investment Experience *
        </label>
        <div className="space-y-3">
          {[
            { value: 'first_time', label: 'First-Time Property Investor', desc: 'This will be my first real estate investment' },
            { value: 'domestic', label: 'Domestic Experience Only', desc: 'Invested in my home country, new to international' },
            { value: 'international', label: 'International Experience', desc: 'Invested in multiple countries' },
            { value: 'professional', label: 'Professional Investor', desc: 'Real estate is primary investment focus' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="investmentExperience"
                value={option.value}
                checked={formData.investmentExperience === option.value}
                onChange={(e) => updateFormData('investmentExperience', e.target.value)}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div>
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.investmentExperience && <p className="mt-1 text-sm text-red-600">{errors.investmentExperience}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Portuguese Real Estate Market Knowledge: {formData.portugueseMarketKnowledge}/10
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={formData.portugueseMarketKnowledge}
          onChange={(e) => updateFormData('portugueseMarketKnowledge', parseInt(e.target.value))}
          className="w-full h-2 bg-brown-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-brown-600 mt-1">
          <span>Complete Beginner</span>
          <span>Expert Level</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          Have You Visited Portugal? *
        </label>
        <div className="space-y-3">
          {[
            { value: 'yes_multiple', label: 'Yes, multiple times - Know areas well' },
            { value: 'yes_once', label: 'Yes, once or twice - Some familiarity' },
            { value: 'no_planning', label: 'No, but planning to visit' },
            { value: 'no_not_planning', label: 'No, and not planning to visit before purchase' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="hasVisitedPortugal"
                value={option.value}
                checked={formData.hasVisitedPortugal === option.value}
                onChange={(e) => updateFormData('hasVisitedPortugal', e.target.value)}
                className="text-gold-600 focus:ring-gold-500"
              />
              <span className="text-brown-800">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.hasVisitedPortugal && <p className="mt-1 text-sm text-red-600">{errors.hasVisitedPortugal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Specific Properties or Addresses You're Considering (Optional)
        </label>
        <textarea
          value={formData.specificPropertiesInMind}
          onChange={(e) => updateFormData('specificPropertiesInMind', e.target.value)}
          placeholder='e.g., "Apartment on Avenida da Liberdade, Lisbon" or "Villa in Quinta da Marinha, Cascais"'
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
        />
        <p className="mt-1 text-sm text-brown-600">{formData.specificPropertiesInMind.length}/500 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Key Questions or Concerns (Optional but Recommended)
        </label>
        <textarea
          value={formData.keyQuestionsOrConcerns}
          onChange={(e) => updateFormData('keyQuestionsOrConcerns', e.target.value)}
          placeholder="What are you most uncertain about? What would you like us to focus on in your assessment?"
          rows={4}
          maxLength={1000}
          className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
        />
        <p className="mt-1 text-sm text-brown-600">{formData.keyQuestionsOrConcerns.length}/1000 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Any Other Relevant Information
        </label>
        <textarea
          value={formData.additionalContext}
          onChange={(e) => updateFormData('additionalContext', e.target.value)}
          placeholder="Family size, special requirements, unique circumstances, etc."
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
        />
        <p className="mt-1 text-sm text-brown-600">{formData.additionalContext.length}/500 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-4">
          30-Minute Consultation Call Preference *
        </label>
        <div className="space-y-3">
          {[
            { value: 'before_report', label: 'Before Receiving Report', desc: 'Discuss goals, then receive customized report' },
            { value: 'after_report', label: 'After Receiving Report', desc: 'Review report first, then discuss questions' },
            { value: 'flexible', label: 'Flexible - You Decide', desc: 'Whatever works best for the process' }
          ].map((option) => (
            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="consultationPreference"
                value={option.value}
                checked={formData.consultationPreference === option.value}
                onChange={(e) => updateFormData('consultationPreference', e.target.value)}
                className="mt-1 text-gold-600 focus:ring-gold-500"
              />
              <div>
                <div className="font-medium text-brown-800">{option.label}</div>
                <div className="text-sm text-brown-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.consultationPreference && <p className="mt-1 text-sm text-red-600">{errors.consultationPreference}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          Preferred Call Time Zone & Window *
        </label>
        <select
          value={formData.preferredCallTime}
          onChange={(e) => updateFormData('preferredCallTime', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors ${
            errors.preferredCallTime ? 'border-red-500' : 'border-brown-300'
          }`}
        >
          <option value="">Select Preferred Time</option>
          <option value="utc+1_morning">CET (Portugal) - Morning (8-12 PM)</option>
          <option value="utc+1_afternoon">CET (Portugal) - Afternoon (12-5 PM)</option>
          <option value="utc+1_evening">CET (Portugal) - Evening (5-9 PM)</option>
          <option value="utc-5_morning">Eastern Time - Morning (8-12 PM)</option>
          <option value="utc-5_afternoon">Eastern Time - Afternoon (12-5 PM)</option>
          <option value="utc-5_evening">Eastern Time - Evening (5-9 PM)</option>
          <option value="utc-8_morning">Pacific Time - Morning (8-12 PM)</option>
          <option value="utc-8_afternoon">Pacific Time - Afternoon (12-5 PM)</option>
          <option value="utc+0_morning">GMT/WET - Morning (8-12 PM)</option>
          <option value="utc+0_afternoon">GMT/WET - Afternoon (12-5 PM)</option>
          <option value="flexible">Completely Flexible</option>
        </select>
        {errors.preferredCallTime && <p className="mt-1 text-sm text-red-600">{errors.preferredCallTime}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-800 mb-2">
          How Did You Hear About Us?
        </label>
        <select
          value={formData.referralSource}
          onChange={(e) => updateFormData('referralSource', e.target.value)}
          className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors"
        >
          <option value="">Select Source</option>
          <option value="google_search">Google Search</option>
          <option value="social_media">Social Media (LinkedIn, Facebook, Instagram)</option>
          <option value="referral">Referral from Friend/Colleague</option>
          <option value="real_estate_website">Real Estate Listing Website</option>
          <option value="news_article">News Article or Blog</option>
          <option value="youtube">YouTube</option>
          <option value="podcast">Podcast</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-brown-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-display font-semibold text-brown-800">
                Portuguese Investment Assessment
              </h1>
              <button
                onClick={onClose}
                className="text-brown-500 hover:text-brown-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {renderProgressBar()}
          </div>

          {/* Content */}
          <div className="p-6">
            {renderCurrentStep()}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-brown-200 p-6 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 border border-brown-300 text-brown-700 rounded-lg hover:bg-brown-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                )}
                
                {formData.email && (
                  <div className="flex items-center space-x-2 text-sm text-brown-600">
                    <Save className="h-4 w-4" />
                    <span>Auto-saving progress</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Security indicators */}
                <div className="flex items-center space-x-4 text-xs text-brown-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>24h delivery</span>
                  </div>
                </div>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 bg-gold-600 hover:bg-gold-700 disabled:bg-brown-300 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Payment - €150</span>
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;