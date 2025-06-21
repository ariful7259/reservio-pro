
import { AIModel } from './types';

export const AI_MODELS: AIModel[] = [
  { value: 'gpt-4', label: 'GPT-4 (সবচেয়ে বুদ্ধিমান)' },
  { value: 'gpt-3.5', label: 'GPT-3.5 (দ্রুত)' },
  { value: 'claude', label: 'Claude (সৃজনশীল)' },
  { value: 'gemini', label: 'Gemini (বিশ্লেষণধর্মী)' }
];

export const QUICK_SUGGESTIONS = [
  'কিভাবে ভাল প্রোডাক্ট ছবি তুলব?',
  'বিক্রয় বাড়ানোর টিপস দিন',
  'গ্রাহকদের সাথে কিভাবে কথা বলব?',
  'প্রোডাক্ট ডিসক্রিপশন লিখতে সাহায্য করুন'
];

export const INITIAL_MESSAGE = {
  id: 1,
  text: 'হ্যালো! আমি আপনার AI সহায়ক। আপনার অ্যাপ ব্যবহার, প্রোডাক্ট লিস্টিং, বিক্রয় বৃদ্ধি - যেকোনো বিষয়ে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?',
  sender: 'assistant' as const,
  timestamp: new Date()
};
