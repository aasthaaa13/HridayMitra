import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Heart Rate Variability',
    excerpt: 'Learn how HRV can be a powerful indicator of your overall cardiovascular health and stress levels.',
    content: `Heart Rate Variability (HRV) is the variation in time between consecutive heartbeats. Unlike heart rate, which measures the average beats per minute, HRV captures the subtle changes in timing between each beat.

**Why HRV Matters**

A higher HRV generally indicates better cardiovascular fitness and a more adaptable nervous system. Low HRV has been associated with increased risk of cardiovascular disease, chronic stress, and poor recovery from exercise.

**How to Improve Your HRV**

1. **Regular Exercise**: Consistent aerobic exercise can significantly improve HRV over time
2. **Quality Sleep**: Aim for 7-9 hours of uninterrupted sleep
3. **Stress Management**: Practice meditation, deep breathing, or yoga
4. **Balanced Nutrition**: Avoid excessive alcohol and maintain a heart-healthy diet
5. **Hydration**: Proper hydration supports optimal cardiovascular function

**Monitoring Your HRV**

Modern wearables and our app can track your HRV throughout the day. Pay attention to trends over weeks rather than daily fluctuations.`,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop',
    category: 'Heart Health',
    readTime: '5 min read',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: '10 Foods That Boost Heart Health',
    excerpt: 'Discover the top heart-healthy foods that can reduce cholesterol and improve cardiovascular function.',
    content: `Eating the right foods is one of the most powerful ways to protect your heart. Here are 10 scientifically-backed foods that support cardiovascular health.

**1. Fatty Fish (Salmon, Mackerel)**
Rich in omega-3 fatty acids, which reduce inflammation and lower triglycerides.

**2. Berries**
Packed with antioxidants that reduce oxidative stress and inflammation.

**3. Leafy Greens (Spinach, Kale)**
High in nitrates, which help lower blood pressure and improve arterial function.

**4. Whole Grains (Oats, Quinoa)**
Fiber-rich foods that help reduce cholesterol levels.

**5. Avocados**
Excellent source of monounsaturated fats and potassium.

**6. Nuts (Almonds, Walnuts)**
Contain healthy fats, fiber, and plant sterols.

**7. Olive Oil**
Rich in oleic acid and polyphenols that protect heart health.

**8. Legumes (Beans, Lentils)**
High in fiber and plant-based protein.

**9. Dark Chocolate (70%+ Cacao)**
Contains flavonoids that improve blood flow.

**10. Tomatoes**
Rich in lycopene, which reduces cardiovascular risk.`,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    category: 'Nutrition',
    readTime: '6 min read',
    author: 'Dr. Michael Chen',
    date: '2024-01-12'
  },
  {
    id: '3',
    title: 'The Connection Between Sleep and Heart Health',
    excerpt: 'Poor sleep can significantly impact your cardiovascular system. Learn how to optimize your sleep for a healthier heart.',
    content: `Sleep and heart health are intimately connected. During sleep, your heart rate and blood pressure naturally decrease, giving your cardiovascular system time to recover.

**How Poor Sleep Affects Your Heart**

- Increases inflammation markers
- Raises blood pressure
- Disrupts glucose metabolism
- Elevates stress hormones

**Optimal Sleep for Heart Health**

The American Heart Association recommends 7-9 hours of quality sleep per night. Here's how to achieve it:

**Create a Sleep-Friendly Environment**
- Keep your bedroom cool (65-68°F)
- Block out light with blackout curtains
- Use white noise if needed

**Establish a Routine**
- Go to bed at the same time daily
- Avoid screens 1 hour before bed
- Create a relaxing pre-sleep ritual

**Watch What You Consume**
- Limit caffeine after 2 PM
- Avoid heavy meals before bed
- Reduce alcohol consumption

**Address Sleep Disorders**
Conditions like sleep apnea significantly increase cardiovascular risk. If you snore loudly or feel tired despite sleeping, consult a doctor.`,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
    category: 'Lifestyle',
    readTime: '7 min read',
    author: 'Dr. Emily Watson',
    date: '2024-01-10'
  },
  {
    id: '4',
    title: 'Exercise Guidelines for Heart Patients',
    excerpt: 'Safe and effective exercise strategies for those with heart conditions or recovering from cardiac events.',
    content: `Exercise is essential for heart health, but if you have a heart condition, it's important to exercise safely and effectively.

**Benefits of Exercise for Heart Patients**

- Strengthens the heart muscle
- Improves blood circulation
- Lowers blood pressure
- Reduces cholesterol
- Helps maintain healthy weight

**Getting Started Safely**

Always consult your cardiologist before starting any exercise program. They may recommend a cardiac rehabilitation program.

**Recommended Activities**

1. **Walking**: Start with 10-15 minutes and gradually increase
2. **Swimming**: Low-impact and excellent for cardiovascular health
3. **Cycling**: Stationary bikes are safe and effective
4. **Light Strength Training**: Use light weights with higher repetitions

**Warning Signs to Stop Exercise**

- Chest pain or pressure
- Severe shortness of breath
- Dizziness or lightheadedness
- Irregular heartbeat
- Unusual fatigue

**Heart Rate Monitoring**

Use our app to monitor your heart rate during exercise. Stay within your target heart rate zone as recommended by your doctor.`,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=600&fit=crop',
    category: 'Exercise',
    readTime: '6 min read',
    author: 'Dr. James Miller',
    date: '2024-01-08'
  },
  {
    id: '5',
    title: 'Understanding Blood Pressure Readings',
    excerpt: 'A comprehensive guide to interpreting your blood pressure numbers and what they mean for your health.',
    content: `Blood pressure is one of the most important indicators of cardiovascular health. Understanding your numbers can help you take control of your heart health.

**What Blood Pressure Numbers Mean**

Blood pressure is measured in millimeters of mercury (mm Hg) and recorded as two numbers:

- **Systolic (top number)**: Pressure when the heart beats
- **Diastolic (bottom number)**: Pressure when the heart rests

**Blood Pressure Categories**

| Category | Systolic | Diastolic |
|----------|----------|-----------|
| Normal | Less than 120 | Less than 80 |
| Elevated | 120-129 | Less than 80 |
| High Stage 1 | 130-139 | 80-89 |
| High Stage 2 | 140+ | 90+ |
| Crisis | 180+ | 120+ |

**How to Get Accurate Readings**

1. Sit quietly for 5 minutes before measuring
2. Keep feet flat on the floor
3. Support your arm at heart level
4. Don't talk during measurement
5. Take multiple readings and average them

**Managing High Blood Pressure**

- Reduce sodium intake
- Exercise regularly
- Maintain healthy weight
- Limit alcohol
- Manage stress
- Take medications as prescribed`,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    category: 'Heart Health',
    readTime: '5 min read',
    author: 'Dr. Lisa Park',
    date: '2024-01-05'
  },
  {
    id: '6',
    title: 'Stress and Your Heart: The Hidden Connection',
    excerpt: 'Chronic stress can silently damage your heart. Discover effective strategies to protect your cardiovascular health.',
    content: `Stress is more than just a mental burden—it has profound effects on your cardiovascular system.

**How Stress Affects Your Heart**

When stressed, your body releases cortisol and adrenaline, which:
- Increase heart rate
- Raise blood pressure
- Promote inflammation
- Encourage unhealthy behaviors

**Long-Term Consequences**

Chronic stress is linked to:
- Higher risk of heart attack
- Increased blood pressure
- Arterial damage
- Heart rhythm problems

**Stress Management Techniques**

**Mindfulness Meditation**
Just 10 minutes daily can significantly reduce stress hormones.

**Deep Breathing Exercises**
Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7, exhale for 8.

**Physical Activity**
Regular exercise is one of the most effective stress relievers.

**Social Connections**
Strong relationships buffer against stress effects.

**Time in Nature**
Spending time outdoors lowers cortisol levels.

**Professional Help**
Don't hesitate to seek therapy if stress feels overwhelming.`,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    category: 'Mental Health',
    readTime: '6 min read',
    author: 'Dr. Robert Kim',
    date: '2024-01-03'
  },
  {
    id: '7',
    title: 'Cholesterol: The Complete Guide',
    excerpt: 'Everything you need to know about cholesterol, from understanding your numbers to natural management strategies.',
    content: `Cholesterol is essential for your body, but too much of the wrong type can harm your heart.

**Types of Cholesterol**

**LDL (Low-Density Lipoprotein)**
Often called "bad" cholesterol. High levels lead to plaque buildup in arteries.

**HDL (High-Density Lipoprotein)**
"Good" cholesterol that helps remove LDL from your bloodstream.

**Triglycerides**
A type of fat in your blood that can increase heart disease risk when elevated.

**Healthy Cholesterol Levels**

- Total Cholesterol: Less than 200 mg/dL
- LDL: Less than 100 mg/dL
- HDL: 60 mg/dL or higher
- Triglycerides: Less than 150 mg/dL

**Natural Ways to Improve Cholesterol**

1. **Eat heart-healthy fats**: Choose olive oil, nuts, and fatty fish
2. **Increase fiber intake**: Oatmeal, beans, and fruits
3. **Exercise regularly**: Raises HDL levels
4. **Lose excess weight**: Even 5-10% weight loss helps
5. **Quit smoking**: Improves HDL levels
6. **Limit alcohol**: Moderate consumption only

**When Medication is Needed**

If lifestyle changes aren't enough, statins or other medications may be prescribed.`,
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop',
    category: 'Heart Health',
    readTime: '7 min read',
    author: 'Dr. Amanda Foster',
    date: '2024-01-01'
  },
  {
    id: '8',
    title: 'Warning Signs of Heart Attack',
    excerpt: 'Recognize the symptoms early—knowing these signs could save your life or someone you love.',
    content: `Every 40 seconds, someone in the United States has a heart attack. Knowing the warning signs can save lives.

**Classic Heart Attack Symptoms**

- **Chest Discomfort**: Pressure, squeezing, or pain lasting more than a few minutes
- **Upper Body Pain**: Discomfort in arms, back, neck, jaw, or stomach
- **Shortness of Breath**: With or without chest discomfort
- **Cold Sweat**: Breaking out in a cold sweat
- **Nausea**: Feeling sick to your stomach
- **Lightheadedness**: Feeling dizzy or faint

**Symptoms in Women**

Women may experience different symptoms:
- Unusual fatigue
- Sleep disturbances
- Anxiety
- Indigestion
- Jaw or back pain

**What to Do During a Heart Attack**

1. **Call 911 immediately**—don't drive yourself
2. **Chew aspirin** if not allergic (325 mg)
3. **Sit or lie down** and try to stay calm
4. **Loosen tight clothing**
5. **Be ready to perform CPR** if needed

**Time is Critical**

Heart muscle begins to die within minutes of a heart attack. The faster you get treatment, the better the outcome.

**Prevention is Key**

Regular health assessments, like those offered in our app, can help identify your risk before a heart attack occurs.`,
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop',
    category: 'Emergency',
    readTime: '5 min read',
    author: 'Dr. David Brown',
    date: '2023-12-28'
  },
  {
    id: '9',
    title: 'The Mediterranean Diet for Heart Health',
    excerpt: 'Discover why the Mediterranean diet is consistently ranked as the best for cardiovascular wellness.',
    content: `The Mediterranean diet has been proven in numerous studies to significantly reduce heart disease risk.

**Core Components**

**Abundant Plant Foods**
- Fruits, vegetables, whole grains
- Legumes, nuts, seeds
- Olive oil as primary fat

**Moderate Protein**
- Fish and seafood twice weekly
- Poultry and eggs in moderation
- Limited red meat

**Dairy**
- Small amounts of cheese and yogurt

**Wine**
- Optional, in moderation with meals

**Health Benefits**

Research shows the Mediterranean diet:
- Reduces heart attack risk by 30%
- Lowers stroke risk
- Decreases inflammation
- Improves cholesterol profile
- Helps maintain healthy weight

**Getting Started**

**Week 1**: Replace butter with olive oil
**Week 2**: Add a serving of vegetables to each meal
**Week 3**: Include fish twice a week
**Week 4**: Snack on nuts instead of chips
**Week 5**: Try a meatless day

**Sample Daily Menu**

Breakfast: Greek yogurt with berries and walnuts
Lunch: Chickpea salad with olive oil dressing
Dinner: Grilled salmon with roasted vegetables
Snack: Hummus with vegetable sticks`,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop',
    category: 'Nutrition',
    readTime: '6 min read',
    author: 'Dr. Maria Santos',
    date: '2023-12-25'
  },
  {
    id: '10',
    title: 'Cardiac Rehabilitation: What to Expect',
    excerpt: 'A complete guide to cardiac rehab programs and how they can help you recover stronger.',
    content: `Cardiac rehabilitation is a medically supervised program designed to help you recover after a heart event and prevent future problems.

**Who Benefits from Cardiac Rehab?**

- Heart attack survivors
- After heart surgery
- Heart failure patients
- Those with coronary artery disease
- After stent placement

**Components of Cardiac Rehab**

**Phase 1: Hospital**
Begins during your hospital stay with gentle movements and education.

**Phase 2: Outpatient**
- Supervised exercise sessions (typically 3x/week for 12 weeks)
- Heart monitoring during exercise
- Nutrition counseling
- Stress management
- Medication management

**Phase 3: Maintenance**
Continuing healthy habits independently with periodic check-ins.

**Benefits of Completing Cardiac Rehab**

Studies show participants experience:
- 25% reduction in mortality
- Improved exercise capacity
- Better quality of life
- Reduced symptoms
- Lower hospital readmission rates

**Overcoming Barriers**

Many patients don't complete cardiac rehab. Common barriers include:
- Transportation issues
- Work conflicts
- Depression or anxiety
- Lack of motivation

Our app can help bridge gaps with home-based monitoring and exercise guidance.`,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    category: 'Recovery',
    readTime: '7 min read',
    author: 'Dr. Thomas Wright',
    date: '2023-12-22'
  },
  {
    id: '11',
    title: 'Managing Diabetes for Heart Health',
    excerpt: 'Diabetes significantly increases heart disease risk. Learn how to protect your heart while managing blood sugar.',
    content: `People with diabetes are 2-4 times more likely to develop heart disease. Managing both conditions together is crucial.

**The Diabetes-Heart Disease Connection**

High blood sugar damages blood vessels and nerves that control the heart. Additionally:
- Diabetes often occurs with high blood pressure
- Many diabetics have unhealthy cholesterol levels
- Obesity is common in both conditions

**Key Management Strategies**

**Blood Sugar Control**
- Monitor glucose regularly
- Take medications as prescribed
- Keep A1C below 7%

**Blood Pressure Management**
- Target: Less than 130/80 mm Hg
- Limit sodium intake
- Exercise regularly

**Cholesterol Control**
- LDL goal: Less than 100 mg/dL
- Statins may be recommended

**Lifestyle Modifications**

1. **Diet**: Focus on low-glycemic, heart-healthy foods
2. **Exercise**: 150 minutes moderate activity weekly
3. **Weight**: Maintain healthy BMI
4. **Quit Smoking**: Essential for both conditions
5. **Limit Alcohol**: Affects blood sugar and heart

**Regular Monitoring**

Use our app to track:
- Blood sugar levels
- Blood pressure
- Weight trends
- Heart rate patterns

Early detection of problems allows for timely intervention.`,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop',
    category: 'Lifestyle',
    readTime: '6 min read',
    author: 'Dr. Jennifer Lee',
    date: '2023-12-20'
  },
  {
    id: '12',
    title: 'Heart-Healthy Habits for Every Age',
    excerpt: 'Cardiovascular wellness looks different at every life stage. Find age-appropriate strategies for lifelong heart health.',
    content: `It's never too early or too late to start protecting your heart. Here's what matters at every age.

**In Your 20s**

- Establish healthy eating habits
- Build regular exercise into your routine
- Don't start smoking (or quit now)
- Know your baseline numbers
- Manage stress healthily

**In Your 30s**

- Balance career and health
- Maintain healthy weight
- Get annual check-ups
- Manage work stress
- Build healthy family habits

**In Your 40s**

- More frequent health screenings
- Watch for metabolic changes
- Prioritize sleep quality
- Strength training becomes crucial
- Consider family heart history

**In Your 50s**

- Know your heart disease risk
- Understand hormonal changes
- Increase cardiovascular monitoring
- Focus on flexibility and balance
- Social connections matter more

**In Your 60s and Beyond**

- Stay physically active within limits
- Monitor for irregular heart rhythms
- Maintain social engagement
- Cognitive health supports heart health
- Regular medication reviews

**Key Takeaways for All Ages**

1. Move daily
2. Eat mostly plants
3. Maintain connections
4. Manage stress
5. Know your numbers
6. Get quality sleep`,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    category: 'Lifestyle',
    readTime: '7 min read',
    author: 'Dr. Patricia Moore',
    date: '2023-12-18'
  },
  {
    id: '13',
    title: 'Understanding Arrhythmias and Irregular Heartbeats',
    excerpt: 'Not all irregular heartbeats are dangerous. Learn when to worry and when it\'s normal.',
    content: `An arrhythmia is an irregular heartbeat—your heart may beat too fast, too slow, or with an irregular pattern.

**Types of Arrhythmias**

**Atrial Fibrillation (AFib)**
The most common serious arrhythmia. The upper chambers beat irregularly.

**Supraventricular Tachycardia (SVT)**
Rapid heartbeat originating above the ventricles.

**Bradycardia**
Heart rate slower than 60 BPM.

**Ventricular Tachycardia**
Rapid rhythm from the lower chambers—can be serious.

**Common Symptoms**

- Fluttering in the chest
- Racing heartbeat
- Slow heartbeat
- Chest pain
- Shortness of breath
- Dizziness or lightheadedness
- Fainting

**When Arrhythmias Are Normal**

Some irregular beats are harmless:
- Occasional skipped beats
- Brief racing during stress
- Slightly irregular rhythm

**When to Seek Help**

Get immediate care if you experience:
- Prolonged rapid heartbeat
- Fainting
- Chest pain with arrhythmia
- Severe shortness of breath

**Monitoring at Home**

Our app's heart rate feature can help you:
- Detect irregular patterns
- Track frequency of episodes
- Share data with your doctor
- Monitor treatment effectiveness`,
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=800&h=600&fit=crop',
    category: 'Heart Health',
    readTime: '6 min read',
    author: 'Dr. Richard Adams',
    date: '2023-12-15'
  },
  {
    id: '14',
    title: 'Supplements for Heart Health: What Works?',
    excerpt: 'Separate fact from fiction when it comes to heart health supplements.',
    content: `The supplement industry is full of heart health claims. Here's what science actually supports.

**Supplements with Good Evidence**

**Omega-3 Fatty Acids (Fish Oil)**
- May lower triglycerides
- Prescription-strength versions proven effective
- Over-the-counter benefits less clear

**Fiber Supplements (Psyllium)**
- Can lower LDL cholesterol
- Best combined with dietary fiber

**Plant Sterols/Stanols**
- Block cholesterol absorption
- Can lower LDL by 5-15%

**CoQ10**
- May help statin side effects
- Possible benefits for heart failure

**Supplements with Mixed Evidence**

- **Vitamin D**: Important for overall health, heart benefits unclear
- **Magnesium**: May help blood pressure if deficient
- **Garlic**: Small effect on cholesterol

**Supplements to Avoid**

- **Vitamin E**: High doses may increase heart risk
- **Beta-carotene**: May be harmful for some

**Important Considerations**

1. **Supplements aren't regulated** like medications
2. **Quality varies** significantly between brands
3. **Interactions possible** with heart medications
4. **Food first**: Get nutrients from diet when possible
5. **Talk to your doctor** before starting any supplement

**The Bottom Line**

No supplement replaces a healthy lifestyle. Focus on diet, exercise, and proven medical treatments first.`,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=800&h=600&fit=crop',
    category: 'Nutrition',
    readTime: '6 min read',
    author: 'Dr. Susan Clark',
    date: '2023-12-12'
  },
  {
    id: '15',
    title: 'Building a Heart-Healthy Exercise Routine',
    excerpt: 'A step-by-step guide to creating an effective and sustainable cardiovascular exercise program.',
    content: `Regular exercise is one of the most powerful ways to protect your heart. Here's how to build a routine that works.

**How Much Exercise Do You Need?**

The American Heart Association recommends:
- **150 minutes** moderate activity weekly, OR
- **75 minutes** vigorous activity weekly
- **Plus** strength training 2 days/week

**Types of Heart-Healthy Exercise**

**Aerobic Exercise**
- Walking, jogging, cycling
- Swimming, dancing
- Increases heart efficiency

**Strength Training**
- Weights, resistance bands
- Body weight exercises
- Improves metabolism

**Flexibility and Balance**
- Yoga, stretching
- Important for injury prevention

**Building Your Routine**

**Week 1-2: Foundation**
- Start with 10-15 minute walks
- Focus on consistency over intensity
- Listen to your body

**Week 3-4: Building**
- Increase to 20-30 minutes
- Add variety
- Track your progress

**Week 5-6: Progressing**
- Increase intensity gradually
- Add strength training
- Challenge yourself

**Staying Motivated**

1. Set realistic goals
2. Find activities you enjoy
3. Exercise with friends
4. Use our app to track progress
5. Celebrate milestones
6. Mix up your routine

**Safety Tips**

- Warm up before exercise
- Cool down afterward
- Stay hydrated
- Don't ignore pain
- Progress gradually`,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    category: 'Exercise',
    readTime: '7 min read',
    author: 'Dr. Mark Johnson',
    date: '2023-12-10'
  }
];

const categories = ['All', 'Heart Health', 'Nutrition', 'Lifestyle', 'Exercise', 'Mental Health', 'Emergency', 'Recovery'];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedArticle(null)}
          className="mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>

        <article className="glass-card overflow-hidden">
          <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {selectedArticle.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {selectedArticle.readTime}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
              <span>{selectedArticle.author}</span>
              <span>•</span>
              <span>{new Date(selectedArticle.date).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</span>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {selectedArticle.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h2 key={i} className="text-xl font-heading font-semibold mt-6 mb-3 text-foreground">
                      {paragraph.replace(/\*\*/g, '')}
                    </h2>
                  );
                }
                if (paragraph.includes('**')) {
                  return (
                    <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                      )}
                    </p>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={i} className="list-disc pl-5 mb-4 space-y-2">
                      {items.map((item, j) => (
                        <li key={j} className="text-muted-foreground">
                          {item.replace(/^[-\d.]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Health Articles</h1>
            <p className="text-muted-foreground">Expert insights for your heart health journey</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${
                selectedCategory === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <article 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="glass-card overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
          >
            <div className="relative overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs rounded-full font-medium">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
              
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.author}</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
