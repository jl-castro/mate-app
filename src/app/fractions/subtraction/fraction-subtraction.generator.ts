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

function compareFractions(a: Fraction, b: Fraction): number {
  return a.numerator * b.denominator - b.numerator * a.denominator;
}

function subtractFractions(a: Fraction, b: Fraction): Fraction {
  const numerator = a.numerator * b.denominator - b.numerator * a.denominator;
  const denominator = a.denominator * b.denominator;
  return simplify({numerator, denominator});
}

function toString(f: Fraction): string {
  if (f.numerator === 0) return '0';
  if (f.denominator === 1) return `${f.numerator}`;
  return `${f.numerator}/${f.denominator}`;
}

function getRangeForLevel(level: number) {
  switch (level) {
    case 1:
      return {minNum: 1, maxNum: 5, minDen: 2, maxDen: 5};
    case 2:
      return {minNum: 1, maxNum: 7, minDen: 2, maxDen: 7};
    case 3:
      return {minNum: 2, maxNum: 9, minDen: 3, maxDen: 9};
    case 4:
      return {minNum: 3, maxNum: 12, minDen: 4, maxDen: 12};
    case 5:
      return {minNum: 4, maxNum: 15, minDen: 5, maxDen: 15};
    default:
      return {minNum: 1, maxNum: 5, minDen: 2, maxDen: 5};
  }
}

function getSafeFraction(minNum: number, maxNum: number, minDen: number, maxDen: number): Fraction {
  return {
    numerator: getRandomInt(minNum, maxNum),
    denominator: getRandomInt(minDen, maxDen),
  };
}

export function generateFractionSubtractionQuiz(level: number = 1): FractionQuiz {
  const range = getRangeForLevel(level);

  let left: Fraction, right: Fraction;
  do {
    left = getSafeFraction(range.minNum, range.maxNum, range.minDen, range.maxDen);
    right = getSafeFraction(range.minNum, range.maxNum, range.minDen, range.maxDen);
  } while (compareFractions(left, right) < 0);

  const result = subtractFractions(left, right);
  const correct = toString(result);

  const optionSet = new Set<string>([correct]);
  while (optionSet.size < 4) {
    const fake = simplify({
      numerator: getRandomInt(1, 20),
      denominator: getRandomInt(2, 15),
    });
    optionSet.add(toString(fake));
  }

  return {
    question: `${toString(left)} - ${toString(right)} = ?`,
    correctAnswer: correct,
    options: shuffle([...optionSet]).map((value, index) => ({
      id: index,
      value,
      label: value
    })),
  };
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
