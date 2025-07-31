import { Fraction, FractionQuiz } from '../../shared/models/quiz-data.interface';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simplify({numerator, denominator}: Fraction): Fraction {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
}

function addFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.denominator + b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;
  return simplify({numerator, denominator});
}

function toString(f: Fraction): string {
  if (f.numerator === 0) return '0';
  if (f.denominator === 1) return `${f.numerator}`;
  return `${f.numerator}/${f.denominator}`;
}

export function generateFractionAdditionQuiz(level: number = 1): FractionQuiz {
  const range = getRangeForLevel(level);

  const left = getSafeFraction(range.minNum, range.maxNum, range.minDen, range.maxDen, level === 1);
  const right = getSafeFraction(range.minNum, range.maxNum, range.minDen, range.maxDen, level === 1);

  const result = addFractions(left, right);
  const correct = toString(result);

  const options = new Set<string>([correct]);
  while (options.size < 4) {
    const fake: Fraction = simplify({
      numerator: getRandomInt(1, 12),
      denominator: getRandomInt(2, 12),
    });
    options.add(toString(fake));
  }

  return {
    question: `${toString(left)} + ${toString(right)} = ?`,
    correctAnswer: correct,
    options: shuffle([...options]).map((value, index) => ({
      id: index,
      value,
      label: value
    }))
  };
}

function getSafeFraction(minNum: number, maxNum: number, minDen: number, maxDen: number, avoidEqual = true): Fraction {
  let numerator, denominator;
  do {
    numerator = getRandomInt(minNum, maxNum);
    denominator = getRandomInt(minDen, maxDen);
  } while (avoidEqual && numerator === denominator);
  return { numerator, denominator };
}

function getRangeForLevel(level: number) {
  switch (level) {
    case 1: return { minNum: 1, maxNum: 5, minDen: 2, maxDen: 5 };
    case 2: return { minNum: 1, maxNum: 7, minDen: 2, maxDen: 7 };
    case 3: return { minNum: 2, maxNum: 9, minDen: 3, maxDen: 9 };
    case 4: return { minNum: 3, maxNum: 12, minDen: 4, maxDen: 12 };
    case 5: return { minNum: 5, maxNum: 20, minDen: 6, maxDen: 20 };
    default: return { minNum: 1, maxNum: 5, minDen: 2, maxDen: 5 };
  }
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
