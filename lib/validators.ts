import { z } from 'zod'

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
  titleTa: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  descriptionTa: z.string().optional(),
  date: z.string().datetime('Invalid date format'),
  time: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  imageUrl: z.string().url().optional(),
  capacity: z.number().positive().optional(),
  isPublic: z.boolean().default(true),
})

// Announcement Schemas
export const CreateAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleTa: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  contentTa: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isPublic: z.boolean().default(true),
  allowComments: z.boolean().default(true),
})

// User Profile Schema
export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  profilePhotoUrl: z.string().url().optional(),
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
