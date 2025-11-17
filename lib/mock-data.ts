import { TestResult } from '@/types/device';

const testTypes = [
  'Hemoglobin',
  'Glucose',
  'Cholesterol',
  'White Blood Cell Count',
  'Platelet Count',
  'Creatinine',
  'ALT',
  'AST',
];

const units = ['g/dL', 'mg/dL', 'mg/dL', 'cells/µL', 'cells/µL', 'mg/dL', 'U/L', 'U/L'];

export function generateMockTestResults(count: number = 7): TestResult[] {
  const results: TestResult[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const testTypeIndex = Math.floor(Math.random() * testTypes.length);
    const testType = testTypes[testTypeIndex];
    const unit = units[testTypeIndex];
    
    // Generate realistic values based on test type
    let value: number;
    let status: 'normal' | 'abnormal';
    
    switch (testType) {
      case 'Hemoglobin':
        value = Number((12 + Math.random() * 6).toFixed(1));
        status = value >= 12 && value <= 17 ? 'normal' : 'abnormal';
        break;
      case 'Glucose':
        value = Number((70 + Math.random() * 50).toFixed(1));
        status = value >= 70 && value <= 100 ? 'normal' : 'abnormal';
        break;
      case 'Cholesterol':
        value = Number((150 + Math.random() * 100).toFixed(1));
        status = value < 200 ? 'normal' : 'abnormal';
        break;
      case 'White Blood Cell Count':
        value = Number((4000 + Math.random() * 6000).toFixed(0));
        status = value >= 4000 && value <= 11000 ? 'normal' : 'abnormal';
        break;
      case 'Platelet Count':
        value = Number((150000 + Math.random() * 200000).toFixed(0));
        status = value >= 150000 && value <= 450000 ? 'normal' : 'abnormal';
        break;
      case 'Creatinine':
        value = Number((0.6 + Math.random() * 1.2).toFixed(2));
        status = value <= 1.2 ? 'normal' : 'abnormal';
        break;
      case 'ALT':
        value = Number((7 + Math.random() * 40).toFixed(1));
        status = value <= 40 ? 'normal' : 'abnormal';
        break;
      case 'AST':
        value = Number((10 + Math.random() * 35).toFixed(1));
        status = value <= 40 ? 'normal' : 'abnormal';
        break;
      default:
        value = Number((10 + Math.random() * 50).toFixed(1));
        status = Math.random() > 0.2 ? 'normal' : 'abnormal';
    }

    // Create timestamp going back in time
    const timestamp = new Date(now - i * 24 * 60 * 60 * 1000).toISOString();

    results.push({
      timestamp,
      testType,
      value,
      unit,
      status,
    });
  }

  return results.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

