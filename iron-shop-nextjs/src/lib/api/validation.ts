import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'お名前は2文字以上で入力してください')
    .max(50, 'お名前は50文字以内で入力してください')
    .regex(/^[a-zA-Zあ-んア-ン一-龯ー\s]+$/, '有効な名前を入力してください'),
  email: z
    .string()
    .email('有効なメールアドレスを入力してください')
    .max(100, 'メールアドレスは100文字以内で入力してください'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\-\+\(\)\s]+$/.test(val),
      '有効な電話番号を入力してください'
    ),
  subject: z
    .string()
    .min(5, '件名は5文字以上で入力してください')
    .max(100, '件名は100文字以内で入力してください'),
  message: z
    .string()
    .min(10, 'メッセージは10文字以上で入力してください')
    .max(1000, 'メッセージは1000文字以内で入力してください'),
  honeypot: z.string().max(0, 'スパム検出されました'), // Bot detection
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitization functions
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d\-\+\(\)\s]/g, '');
}

// Input validation utilities
export function validateAndSanitizeContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: string[];
} {
  try {
    const result = contactFormSchema.parse(data);
    
    // Sanitize the validated data
    const sanitizedData: ContactFormData = {
      name: sanitizeString(result.name),
      email: sanitizeEmail(result.email),
      phone: result.phone ? sanitizePhoneNumber(result.phone) : undefined,
      subject: sanitizeString(result.subject),
      message: sanitizeString(result.message),
      honeypot: result.honeypot,
    };

    return {
      success: true,
      data: sanitizedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => err.message),
      };
    }
    
    return {
      success: false,
      errors: ['検証エラーが発生しました'],
    };
  }
}

// Content Security Policy validation
export function validateCSPSource(source: string): boolean {
  const allowedSources = [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'data:',
    'blob:',
    'https:',
    'wss:',
  ];
  
  return allowedSources.some(allowed => source.startsWith(allowed)) ||
         /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(source);
}

// File upload validation (for future use)
export const fileUploadSchema = z.object({
  name: z.string().min(1).max(255),
  size: z.number().max(10 * 1024 * 1024), // 10MB limit
  type: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ]),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;