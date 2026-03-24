import { type FormData } from '@/store/useAppStore';

export interface CitizenshipResult {
  probability: number;
  message: string;
  recommendation: string;
}

export function calculateCitizenship(data: FormData): CitizenshipResult {
  console.log("[CalculateCitizenship] Received form data:", data);

  let score = 0;

  // Base score from years lived
  if (data.yearsLived >= 10) score += 50;
  else if (data.yearsLived >= 5) score += 30;
  else if (data.yearsLived >= 3) score += 15;
  else score += 5;

  // Visa Status weights
  switch (data.visaStatus) {
    case 'Permanent Resident':
      score += 40;
      break;
    case 'Investor Visa':
      score += 35;
      break;
    case 'Work Permit':
      score += 25;
      break;
    case 'Student Visa':
      score += 15;
      break;
    case 'Temporary Protection':
      score += 10;
      break;
    case 'Other':
    default:
      score += 5;
  }

  // Age calculation
  const birthYear = data.dob.getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age >= 18 && age <= 45) {
    score += 10; // Prime demographic scoring logic
  }

  // Cap at 100%
  const probability = Math.min(score, 100);

  let message = '';
  let recommendation = '';

  if (probability >= 80) {
    message = "Your citizenship is virtually guaranteed.";
    recommendation = "Contact your local consulate to submit your naturalization documents immediately.";
  } else if (probability >= 50) {
    message = "You have a solid pathway to naturalization.";
    recommendation = "Maintain your current visa status and re-apply in 1-2 years to increase your score.";
  } else {
    message = "Your current status makes immediate citizenship highly unlikely.";
    recommendation = "Consider upgrading to a permanent resident or work visa before applying.";
  }

  const result = { probability, message, recommendation };
  console.log("[CalculateCitizenship] Generated dynamic result object:", result);
  
  return result;
}
