import { z } from 'zod'

// Helper for optional URL fields - allows empty strings
const optionalUrl = z.string().url().optional().or(z.literal(''))

// Auth Schemas
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Event Schemas
export const CreateEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleTa: z.string().optional().default(''),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  descriptionTa: z.string().optional().default(''),
  date: z.string().datetime('Invalid date format'),
  time: z.string().optional().default(''),
  location: z.string().min(1, 'Location is required'),
  imageUrl: optionalUrl,
  capacity: z.number().positive().optional(),
  isPublic: z.boolean().default(true),
})

// Announcement Schemas
export const CreateAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleTa: z.string().optional().default(''),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  contentTa: z.string().optional().default(''),
  imageUrl: optionalUrl,
  isPublic: z.boolean().default(true),
  isPinned: z.boolean().default(false),
  allowComments: z.boolean().default(true),
})

// User Profile Schema
export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  profilePhotoUrl: optionalUrl,
  isProfilePublic: z.boolean().optional(),
  preferredLanguage: z.enum(['en', 'ta']).optional(),
})

// Donation Schema
export const CreateDonationSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('INR'),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.enum(['monthly', 'yearly']).optional(),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type CreateAnnouncementInput = z.infer<typeof CreateAnnouncementSchema>
export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>
export type CreateDonationInput = z.infer<typeof CreateDonationSchema>
