'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { CodeQuizType } from '@/types/quiz.type';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

export function CodeQuiz({
  codeQuizzes,
  category,
}: {
  codeQuizzes: CodeQuizType[];
  category: string;
}) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userCode, setUserCode] = useState(codeQuizzes[0].code);
  const { theme } = useTheme();

  const currentQuiz = codeQuizzes[currentQuizIndex];

  const handleNextQuiz = () => {
    if (currentQuizIndex < codeQuizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setUserCode(codeQuizzes[currentQuizIndex + 1].code);
      setShowAnswer(false);
    }
  };

  const handlePrevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex((prev) => prev - 1);
      setUserCode(codeQuizzes[currentQuizIndex - 1].code);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen w-full sm:mx-auto sm:max-w-6xl sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="capitalize">{category}</span> 코드 퀴즈
        </h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{currentQuiz.title}</CardTitle>
          <CardDescription>{currentQuiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-[400px]">
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              value={userCode}
              onChange={(value) => setUserCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                readOnly: false,
                wordWrap: 'on',
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <Button onClick={handlePrevQuiz} disabled={currentQuizIndex === 0}>
          이전 문제
        </Button>
        <Button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? '해답 숨기기' : '해답 보기'}
        </Button>
        <Button
          onClick={handleNextQuiz}
          disabled={currentQuizIndex === codeQuizzes.length - 1}
        >
          다음 문제
        </Button>
      </div>

      {showAnswer && (
        <Alert>
          <AlertDescription className="whitespace-pre-line">
            {currentQuiz.answer}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
