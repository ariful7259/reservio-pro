import React, { useState } from 'react';
import { Plus, Trash, Edit, Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'long-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  allowRetakes: boolean;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
}

interface QuizBuilderProps {
  quiz?: Quiz;
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

export const QuizBuilder: React.FC<QuizBuilderProps> = ({
  quiz,
  onSave,
  onCancel
}) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(
    quiz || {
      id: `quiz-${Date.now()}`,
      title: 'নতুন কুইজ',
      description: '',
      questions: [],
      passingScore: 70,
      allowRetakes: true,
      shuffleQuestions: false,
      showCorrectAnswers: true
    }
  );

  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);

  const questionTypes = [
    { value: 'multiple-choice', label: 'বহুনির্বাচনী' },
    { value: 'true-false', label: 'সত্য/মিথ্যা' },
    { value: 'short-answer', label: 'সংক্ষিপ্ত উত্তর' },
    { value: 'long-answer', label: 'বিস্তারিত উত্তর' }
  ];

  const createNewQuestion = (): QuizQuestion => ({
    id: `question-${Date.now()}`,
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    points: 1,
    timeLimit: 60
  });

  const handleAddQuestion = () => {
    setEditingQuestion(createNewQuestion());
    setShowQuestionDialog(true);
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion({ ...question });
    setShowQuestionDialog(true);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion) return;

    const updatedQuestions = currentQuiz.questions.find(q => q.id === editingQuestion.id)
      ? currentQuiz.questions.map(q => q.id === editingQuestion.id ? editingQuestion : q)
      : [...currentQuiz.questions, editingQuestion];

    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions });
    setEditingQuestion(null);
    setShowQuestionDialog(false);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.filter(q => q.id !== questionId)
    });
  };

  const handleQuestionTypeChange = (type: QuizQuestion['type']) => {
    if (!editingQuestion) return;

    let updatedQuestion = { ...editingQuestion, type };

    // Reset options based on question type
    if (type === 'multiple-choice') {
      updatedQuestion.options = ['', '', '', ''];
      updatedQuestion.correctAnswer = 0;
    } else if (type === 'true-false') {
      updatedQuestion.options = ['সত্য', 'মিথ্যা'];
      updatedQuestion.correctAnswer = 0;
    } else {
      updatedQuestion.options = undefined;
      updatedQuestion.correctAnswer = '';
    }

    setEditingQuestion(updatedQuestion);
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!editingQuestion?.options) return;
    
    const newOptions = [...editingQuestion.options];
    newOptions[index] = value;
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const addOption = () => {
    if (!editingQuestion?.options) return;
    
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, '']
    });
  };

  const removeOption = (index: number) => {
    if (!editingQuestion?.options || editingQuestion.options.length <= 2) return;
    
    const newOptions = editingQuestion.options.filter((_, i) => i !== index);
    setEditingQuestion({ 
      ...editingQuestion, 
      options: newOptions,
      correctAnswer: typeof editingQuestion.correctAnswer === 'number' && editingQuestion.correctAnswer >= index 
        ? Math.max(0, editingQuestion.correctAnswer - 1)
        : editingQuestion.correctAnswer
    });
  };

  const getTotalPoints = () => {
    return currentQuiz.questions.reduce((total, question) => total + question.points, 0);
  };

  const getQuestionTypeLabel = (type: QuizQuestion['type']) => {
    return questionTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <Card>
        <CardHeader>
          <CardTitle>কুইজ সেটিংস</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="quiz-title">কুইজ শিরোনাম</Label>
              <Input
                id="quiz-title"
                value={currentQuiz.title}
                onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
                placeholder="কুইজের নাম লিখুন"
              />
            </div>
            <div>
              <Label htmlFor="passing-score">পাশের স্কোর (%)</Label>
              <Input
                id="passing-score"
                type="number"
                min="0"
                max="100"
                value={currentQuiz.passingScore}
                onChange={(e) => setCurrentQuiz({ ...currentQuiz, passingScore: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="quiz-description">কুইজ বর্ণনা</Label>
            <Textarea
              id="quiz-description"
              value={currentQuiz.description}
              onChange={(e) => setCurrentQuiz({ ...currentQuiz, description: e.target.value })}
              placeholder="কুইজ সম্পর্কে বর্ণনা লিখুন"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="allow-retakes"
                checked={currentQuiz.allowRetakes}
                onCheckedChange={(checked) => setCurrentQuiz({ ...currentQuiz, allowRetakes: checked })}
              />
              <Label htmlFor="allow-retakes">পুনরায় চেষ্টার অনুমতি</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="shuffle-questions"
                checked={currentQuiz.shuffleQuestions}
                onCheckedChange={(checked) => setCurrentQuiz({ ...currentQuiz, shuffleQuestions: checked })}
              />
              <Label htmlFor="shuffle-questions">প্রশ্ন এলোমেলো করুন</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="show-answers"
                checked={currentQuiz.showCorrectAnswers}
                onCheckedChange={(checked) => setCurrentQuiz({ ...currentQuiz, showCorrectAnswers: checked })}
              />
              <Label htmlFor="show-answers">সঠিক উত্তর দেখান</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>প্রশ্ন সমূহ ({currentQuiz.questions.length})</CardTitle>
            <p className="text-sm text-muted-foreground">
              মোট পয়েন্ট: {getTotalPoints()}
            </p>
          </div>
          <Button onClick={handleAddQuestion}>
            <Plus className="h-4 w-4 mr-2" />
            প্রশ্ন যোগ করুন
          </Button>
        </CardHeader>
        <CardContent>
          {currentQuiz.questions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>এখনো কোন প্রশ্ন যোগ করা হয়নি</p>
              <p className="text-sm">প্রশ্ন যোগ করুন বাটনে ক্লিক করে শুরু করুন</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuiz.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">প্রশ্ন {index + 1}</span>
                        <Badge variant="secondary">
                          {getQuestionTypeLabel(question.type)}
                        </Badge>
                        <Badge variant="outline">
                          {question.points} পয়েন্ট
                        </Badge>
                      </div>
                      <p className="font-medium mb-2">{question.question || 'প্রশ্ন লিখুন'}</p>
                      
                      {question.options && (
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className={`text-sm p-2 rounded ${
                                question.correctAnswer === optionIndex 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-50'
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}. {option || 'অপশন লিখুন'}
                              {question.correctAnswer === optionIndex && (
                                <Check className="h-4 w-4 inline ml-2 text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>ব্যাখ্যা:</strong> {question.explanation}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Editor Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion?.id.includes('question-') ? 'প্রশ্ন যোগ করুন' : 'প্রশ্ন এডিট করুন'}
            </DialogTitle>
          </DialogHeader>
          
          {editingQuestion && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>প্রশ্নের ধরন</Label>
                  <Select
                    value={editingQuestion.type}
                    onValueChange={handleQuestionTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="points">পয়েন্ট</Label>
                  <Input
                    id="points"
                    type="number"
                    min="1"
                    value={editingQuestion.points}
                    onChange={(e) => setEditingQuestion({
                      ...editingQuestion,
                      points: parseInt(e.target.value) || 1
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="question">প্রশ্ন</Label>
                <Textarea
                  id="question"
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({
                    ...editingQuestion,
                    question: e.target.value
                  })}
                  placeholder="আপনার প্রশ্ন লিখুন"
                  rows={3}
                />
              </div>

              {/* Options for multiple choice and true/false */}
              {editingQuestion.options && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>অপশন সমূহ</Label>
                    {editingQuestion.type === 'multiple-choice' && (
                      <Button variant="outline" size="sm" onClick={addOption}>
                        <Plus className="h-4 w-4 mr-1" />
                        অপশন যোগ করুন
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editingQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="correct-answer"
                            checked={editingQuestion.correctAnswer === index}
                            onChange={() => setEditingQuestion({
                              ...editingQuestion,
                              correctAnswer: index
                            })}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium">
                            {String.fromCharCode(65 + index)}.
                          </span>
                        </div>
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`অপশন ${String.fromCharCode(65 + index)}`}
                          className="flex-1"
                        />
                        {editingQuestion.type === 'multiple-choice' && editingQuestion.options!.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Correct answer for text questions */}
              {!editingQuestion.options && (
                <div>
                  <Label htmlFor="correct-answer">সঠিক উত্তর</Label>
                  <Textarea
                    id="correct-answer"
                    value={editingQuestion.correctAnswer as string}
                    onChange={(e) => setEditingQuestion({
                      ...editingQuestion,
                      correctAnswer: e.target.value
                    })}
                    placeholder="সঠিক উত্তর লিখুন"
                    rows={2}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="explanation">ব্যাখ্যা (ঐচ্ছিক)</Label>
                <Textarea
                  id="explanation"
                  value={editingQuestion.explanation || ''}
                  onChange={(e) => setEditingQuestion({
                    ...editingQuestion,
                    explanation: e.target.value
                  })}
                  placeholder="উত্তরের ব্যাখ্যা লিখুন"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSaveQuestion}>
                  সেভ করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          বাতিল
        </Button>
        <Button onClick={() => onSave(currentQuiz)}>
          কুইজ সেভ করুন
        </Button>
      </div>
    </div>
  );
};