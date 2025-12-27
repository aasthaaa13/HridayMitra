import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  AlertCircle, 
  CheckCircle, 
  Info,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useHealthData } from '@/contexts/HealthDataContext';

const chestPainTypes = [
  { value: 0, label: 'Typical Angina', description: 'Chest pain related to decreased blood supply to the heart' },
  { value: 1, label: 'Atypical Angina', description: 'Chest pain not related to heart, may be caused by other factors' },
  { value: 2, label: 'Non-Anginal Pain', description: 'Chest pain that is not heart-related' },
  { value: 3, label: 'Asymptomatic', description: 'No chest pain symptoms' },
];

const restingEcgTypes = [
  { value: 0, label: 'Normal', description: 'Normal electrocardiogram results' },
  { value: 1, label: 'ST-T Wave Abnormality', description: 'T wave inversions and/or ST elevation or depression' },
  { value: 2, label: 'Left Ventricular Hypertrophy', description: 'Shows probable or definite left ventricular hypertrophy' },
];

interface FormData {
  age: string;
  gender: 'male' | 'female' | '';
  chestPainType: number;
  restingBP: string;
  cholesterol: string;
  fastingBS: 'yes' | 'no' | '';
  restingECG: number;
  maxHR: string;
  exerciseAngina: 'yes' | 'no' | '';
  oldpeak: string;
}

interface PredictionResult {
  riskLevel: 'Low' | 'Medium' | 'High';
  percentage: number;
  recommendations: string[];
}

export default function HealthAssessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addHealthRecord } = useHealthData();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    chestPainType: 0,
    restingBP: '',
    cholesterol: '',
    fastingBS: '',
    restingECG: 0,
    maxHR: '',
    exerciseAngina: '',
    oldpeak: '',
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const predictHeartDisease = (): PredictionResult => {
    // Simulated ML prediction logic
    let riskScore = 0;
    
    // Age factor
    const age = parseInt(formData.age);
    if (age > 60) riskScore += 20;
    else if (age > 45) riskScore += 10;
    
    // Gender factor
    if (formData.gender === 'male') riskScore += 10;
    
    // Chest pain type
    if (formData.chestPainType <= 1) riskScore += 15;
    
    // Blood pressure
    const bp = parseInt(formData.restingBP);
    if (bp > 140) riskScore += 15;
    else if (bp > 120) riskScore += 5;
    
    // Cholesterol
    const chol = parseInt(formData.cholesterol);
    if (chol > 240) riskScore += 15;
    else if (chol > 200) riskScore += 8;
    
    // Fasting blood sugar
    if (formData.fastingBS === 'yes') riskScore += 10;
    
    // ECG results
    if (formData.restingECG === 2) riskScore += 10;
    else if (formData.restingECG === 1) riskScore += 5;
    
    // Max heart rate (lower is worse for older patients)
    const maxHR = parseInt(formData.maxHR);
    if (maxHR < 120 && age > 40) riskScore += 10;
    
    // Exercise induced angina
    if (formData.exerciseAngina === 'yes') riskScore += 15;
    
    // ST depression
    const oldpeak = parseFloat(formData.oldpeak);
    if (oldpeak > 2) riskScore += 15;
    else if (oldpeak > 1) riskScore += 8;

    // Normalize to percentage
    const percentage = Math.min(Math.max(riskScore, 5), 95);
    
    let riskLevel: 'Low' | 'Medium' | 'High';
    let recommendations: string[];
    
    if (percentage < 30) {
      riskLevel = 'Low';
      recommendations = [
        'Maintain your healthy lifestyle habits',
        'Continue regular exercise (150 min/week)',
        'Annual heart health checkups recommended',
        'Keep a balanced diet rich in vegetables and fruits',
      ];
    } else if (percentage < 60) {
      riskLevel = 'Medium';
      recommendations = [
        'Schedule a consultation with a cardiologist',
        'Monitor blood pressure and cholesterol regularly',
        'Increase physical activity gradually',
        'Reduce sodium and saturated fat intake',
        'Consider stress management techniques',
      ];
    } else {
      riskLevel = 'High';
      recommendations = [
        'Seek immediate consultation with a cardiologist',
        'Get comprehensive cardiac evaluation',
        'Follow prescribed medication strictly',
        'Major lifestyle modifications needed',
        'Regular monitoring of all vital signs',
        'Consider cardiac rehabilitation program',
      ];
    }

    return { riskLevel, percentage, recommendations };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prediction = predictHeartDisease();
    setResult(prediction);
    
    // Save to health records
    addHealthRecord({
      date: new Date().toISOString().split('T')[0],
      bloodPressureSystolic: parseInt(formData.restingBP),
      bloodPressureDiastolic: Math.round(parseInt(formData.restingBP) * 0.6),
      cholesterol: parseInt(formData.cholesterol),
      bloodSugar: formData.fastingBS === 'yes' ? 130 : 95,
      riskLevel: prediction.riskLevel,
      riskPercentage: prediction.percentage,
    });
    
    setIsLoading(false);
    setStep(3);
    
    toast({
      title: 'Assessment Complete',
      description: 'Your heart health assessment has been analyzed.',
    });
  };

  const validateStep1 = () => {
    if (!formData.age || !formData.gender || !formData.restingBP || !formData.cholesterol) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.fastingBS || !formData.maxHR || !formData.exerciseAngina || !formData.oldpeak) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const InfoPopup = ({ id, title, description }: { id: string; title: string; description: string }) => (
    <div className="relative inline-block ml-2">
      <button
        onClick={() => setShowInfo(showInfo === id ? null : id)}
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {showInfo === id && (
        <div className="absolute left-0 top-full mt-2 w-64 glass-card p-3 z-10 animate-fade-in">
          <p className="font-medium text-sm text-foreground mb-1">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      )}
    </div>
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-health-green';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-health-green';
      case 'Medium': return 'bg-warning';
      case 'High': return 'bg-destructive';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Heart className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Heart Disease Assessment</h1>
            <p className="text-muted-foreground">AI-powered prediction based on your health parameters</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                ${step >= s 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 md:w-24 h-1 mx-2 rounded ${step > s ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Basic Info</span>
          <span>Health Metrics</span>
          <span>Results</span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="glass-card p-6 animate-fade-in">
          <h2 className="text-lg font-heading font-semibold mb-6">Basic Information</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Age
                <InfoPopup id="age" title="Age" description="Your current age in years. Age is a significant factor in heart disease risk." />
              </label>
              <Input
                type="number"
                placeholder="Enter your age (e.g., 45)"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                min={18}
                max={120}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Gender</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    onClick={() => handleInputChange('gender', g)}
                    className={`
                      p-4 rounded-xl border-2 transition-all capitalize font-medium
                      ${formData.gender === g 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Chest Pain Type
                <InfoPopup id="chestPain" title="Chest Pain Type" description="The type of chest discomfort you experience. Different types indicate different heart conditions." />
              </label>
              <div className="space-y-2 mt-2">
                {chestPainTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('chestPainType', type.value)}
                    className={`
                      w-full p-4 rounded-xl border-2 text-left transition-all
                      ${formData.chestPainType === type.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <p className="font-medium text-foreground">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Resting Blood Pressure (mm Hg)
                <InfoPopup id="bp" title="Resting Blood Pressure" description="Your blood pressure measured at rest. Normal range is 90-120 mm Hg systolic." />
              </label>
              <Input
                type="number"
                placeholder="e.g., 120"
                value={formData.restingBP}
                onChange={(e) => handleInputChange('restingBP', e.target.value)}
                min={80}
                max={200}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Cholesterol Level (mg/dL)
                <InfoPopup id="cholesterol" title="Cholesterol Level" description="Total serum cholesterol. Desirable level is below 200 mg/dL. Get this from your blood test report." />
              </label>
              <Input
                type="number"
                placeholder="e.g., 200"
                value={formData.cholesterol}
                onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                min={100}
                max={400}
                className="mt-2"
              />
            </div>
          </div>

          <Button
            variant="hero"
            className="w-full mt-8"
            onClick={() => validateStep1() && setStep(2)}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Health Metrics */}
      {step === 2 && (
        <div className="glass-card p-6 animate-fade-in">
          <h2 className="text-lg font-heading font-semibold mb-6">Health Metrics</h2>
          
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Fasting Blood Sugar {'>'}  120 mg/dL
                <InfoPopup id="fbs" title="Fasting Blood Sugar" description="Blood glucose level after fasting for at least 8 hours. Above 120 mg/dL may indicate diabetes risk." />
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[{ value: 'yes', label: 'Yes (> 120)' }, { value: 'no', label: 'No (≤ 120)' }].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleInputChange('fastingBS', opt.value)}
                    className={`
                      p-4 rounded-xl border-2 transition-all font-medium
                      ${formData.fastingBS === opt.value 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Resting ECG Results
                <InfoPopup id="ecg" title="Resting ECG" description="Electrocardiogram results measuring electrical activity of your heart. Get this from your medical records." />
              </label>
              <div className="space-y-2 mt-2">
                {restingEcgTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('restingECG', type.value)}
                    className={`
                      w-full p-4 rounded-xl border-2 text-left transition-all
                      ${formData.restingECG === type.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <p className="font-medium text-foreground">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Maximum Heart Rate Achieved
                <InfoPopup id="maxhr" title="Maximum Heart Rate" description="The highest heart rate achieved during exercise testing. Typically 220 minus your age for healthy individuals." />
              </label>
              <Input
                type="number"
                placeholder="e.g., 150"
                value={formData.maxHR}
                onChange={(e) => handleInputChange('maxHR', e.target.value)}
                min={60}
                max={220}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                Exercise Induced Angina
                <InfoPopup id="angina" title="Exercise Induced Angina" description="Chest pain or discomfort that occurs during physical activity or exercise." />
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleInputChange('exerciseAngina', opt.value)}
                    className={`
                      p-4 rounded-xl border-2 transition-all font-medium
                      ${formData.exerciseAngina === opt.value 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground flex items-center">
                ST Depression (Oldpeak)
                <InfoPopup id="oldpeak" title="ST Depression" description="ST segment depression induced by exercise relative to rest. Measured in millimeters. Typical range is 0-6." />
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 1.5"
                value={formData.oldpeak}
                onChange={(e) => handleInputChange('oldpeak', e.target.value)}
                min={0}
                max={10}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={() => validateStep2() && handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Predict My Heart Health
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && result && (
        <div className="space-y-6 animate-fade-in">
          {/* Risk Level Card */}
          <div className="glass-card p-6 text-center">
            <h2 className="text-lg font-heading font-semibold mb-6">Your Heart Health Assessment</h2>
            
            {/* Circular Progress */}
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={result.riskLevel === 'Low' ? 'hsl(var(--success))' : result.riskLevel === 'Medium' ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(result.percentage / 100) * 553} 553`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-heading font-bold">{result.percentage}%</span>
                <span className={`text-lg font-semibold ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel} Risk
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              Based on your health parameters, your heart disease risk has been assessed.
            </p>

            {/* Risk Level Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getRiskBgColor(result.riskLevel)}/20`}>
              {result.riskLevel === 'Low' ? (
                <CheckCircle className={`h-5 w-5 ${getRiskColor(result.riskLevel)}`} />
              ) : (
                <AlertCircle className={`h-5 w-5 ${getRiskColor(result.riskLevel)}`} />
              )}
              <span className={`font-semibold ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel} Risk Level
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              AI Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setStep(1);
                setResult(null);
                setFormData({
                  age: '',
                  gender: '',
                  chestPainType: 0,
                  restingBP: '',
                  cholesterol: '',
                  fastingBS: '',
                  restingECG: 0,
                  maxHR: '',
                  exerciseAngina: '',
                  oldpeak: '',
                });
              }}
            >
              New Assessment
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={() => navigate('/dashboard/find-doctors')}
            >
              Find Doctors
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="glass-card p-4 border-l-4 border-warning">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> This AI prediction is for 
                informational purposes only and should not replace professional medical advice. 
                Please consult a qualified healthcare provider for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
