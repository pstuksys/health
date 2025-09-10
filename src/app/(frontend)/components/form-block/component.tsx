'use client'

import React, { useState } from 'react'
import type { Page, Form as FormType } from '@/payload-types'
import { cn } from '@/lib/utils'
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Select,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RichText,
  isLexicalEditorState,
} from '@/app/(frontend)/components/ui'

type FormBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'formBlock' }>

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full',
}

const backgroundColorClasses = {
  transparent: 'bg-transparent',
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-ds-dark-blue text-white',
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12',
  xl: 'p-16',
}

export function FormBlock({
  form: formRelation,
  title,
  description,
  layout = 'default',
  maxWidth = 'md',
  backgroundColor = 'transparent',
  padding = 'md',
  buttonWidth = 'full',
}: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // Handle form relation - could be ID or full form object
  const form = typeof formRelation === 'object' ? formRelation : null

  if (!form) {
    return (
      <div className="">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Form not found or not configured.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (name: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: form.id,
          submissionData: Object.entries(formData).map(([field, value]) => ({
            field,
            value: String(value),
          })),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your form has been submitted successfully.')
        setFormData({}) // Reset form

        // Handle confirmation type
        if (form.confirmationType === 'redirect' && form.redirect?.url) {
          window.location.href = form.redirect.url
        }
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: NonNullable<FormType['fields']>[number]) => {
    // Use any to simplify type handling for now
    const fieldData = field as any
    const fieldKey = fieldData.name || fieldData.id || Math.random().toString()
    const isRequired = fieldData.required || false

    const fieldWrapper = (content: React.ReactNode) => (
      <div
        key={fieldKey}
        style={{ width: fieldData.width ? `${fieldData.width}%` : '100%' }}
        className={cn(
          'min-w-0',
          // On mobile, force full width unless explicitly set to smaller percentage
          fieldData.width && fieldData.width < 100 ? '' : 'sm:w-auto w-full',
        )}
      >
        {content}
      </div>
    )

    switch (field.blockType) {
      case 'text':
        return fieldWrapper(
          <div className="space-y-2">
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldKey}
              name={fieldData.name}
              type="text"
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className="w-full"
            />
          </div>,
        )

      case 'email':
        return fieldWrapper(
          <div className="space-y-2">
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldKey}
              name={fieldData.name}
              type="email"
              required={isRequired}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className="w-full"
            />
          </div>,
        )

      case 'number':
        return fieldWrapper(
          <div className="space-y-2">
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldKey}
              name={fieldData.name}
              type="number"
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className="w-full"
            />
          </div>,
        )

      case 'textarea':
        return fieldWrapper(
          <div className="space-y-2">
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className="w-full min-h-[100px]"
            />
          </div>,
        )

      case 'checkbox':
        return fieldWrapper(
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultChecked={fieldData.defaultValue || false}
              onCheckedChange={(checked: boolean) => handleInputChange(fieldData.name, checked)}
            />
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
          </div>,
        )

      case 'select':
        return fieldWrapper(
          <div className="space-y-2">
            <Label htmlFor={fieldKey} className="text-sm font-medium">
              {fieldData.label || fieldData.name}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onValueChange={(value: string) => handleInputChange(fieldData.name, value)}
              className="w-full"
            >
              <option value="" disabled>
                {fieldData.placeholder || 'Select an option'}
              </option>
              {fieldData.options?.map((option: any) => (
                <option key={option.id || option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>,
        )

      case 'message':
        return fieldWrapper(
          <div className="py-2">
            {fieldData.message && isLexicalEditorState(fieldData.message) && (
              <RichText data={fieldData.message} className="prose prose-sm max-w-none" />
            )}
          </div>,
        )

      default:
        return fieldWrapper(
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              {fieldData.label || fieldData.name || 'Unknown field'}
            </Label>
            <p className="text-sm text-gray-500">Unsupported field type: {field.blockType}</p>
          </div>,
        )
    }
  }

  const containerClasses = cn(
    'mx-auto',
    maxWidthClasses[(maxWidth as keyof typeof maxWidthClasses) || 'md'],
  )

  const formClasses = cn(
    'space-y-6',
    backgroundColorClasses[
      (backgroundColor as keyof typeof backgroundColorClasses) || 'transparent'
    ],
    paddingClasses[(padding as keyof typeof paddingClasses) || 'md'],
    backgroundColor !== 'transparent' && 'rounded-lg',
  )

  const sectionClasses = cn(
    '',
    layout === 'centered' && 'flex items-center justify-center min-h-[400px]',
  )

  const formContent = (
    <div className={formClasses}>
      {title && (
        <div className="mb-6">
          <h2
            className={cn(
              'text-2xl font-semibold ',
              backgroundColor === 'primary' ? 'text-white' : 'text-ds-dark-blue',
            )}
          >
            {title}
          </h2>
        </div>
      )}

      {description && isLexicalEditorState(description) && (
        <div className="mb-2">
          <RichText
            data={description}
            className={cn(
              'prose prose-sm max-w-none text-ds-pastille-green',
              backgroundColor === 'primary' && 'prose-invert',
            )}
          />
        </div>
      )}

      {submitStatus === 'success' && form.confirmationType === 'message' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm text-green-800">
                {form.confirmationMessage && isLexicalEditorState(form.confirmationMessage) ? (
                  <RichText data={form.confirmationMessage} className="prose prose-sm max-w-none" />
                ) : (
                  submitMessage
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <div className="text-sm text-red-800">{submitMessage}</div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-4">{form.fields?.map(renderField)}</div>

        <div className={cn('pt-4', buttonWidth === 'auto' && 'flex justify-center')}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'bg-ds-dark-blue hover:bg-[#2d3255] text-white transition-all duration-200 hover:scale-105 active:scale-95 align-center justify-center',
              buttonWidth === 'full' ? 'w-full' : 'px-8 py-3',
            )}
          >
            {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )

  return (
    <section className={sectionClasses}>
      <div className="container mx-auto px-4">
        <div className={containerClasses}>
          {layout === 'card' ? (
            <Card className="shadow-lg">
              <CardHeader className="pb-6">
                {title && <CardTitle className="text-2xl">{title}</CardTitle>}
                {description && isLexicalEditorState(description) && (
                  <CardDescription>
                    <RichText
                      data={description}
                      className="prose prose-sm max-w-none text-ds-pastille-green pt-4"
                    />
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-wrap gap-4">{form.fields?.map(renderField)}</div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'bg-ds-dark-blue hover:bg-[#2d3255] text-white align-center justify-center',
                        buttonWidth === 'full' ? 'w-full' : 'w-auto',
                      )}
                    >
                      {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            formContent
          )}
        </div>
      </div>
    </section>
  )
}
