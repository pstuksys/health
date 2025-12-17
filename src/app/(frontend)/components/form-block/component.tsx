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
  CardHeader,
  CardTitle,
  RichText,
  isLexicalEditorState,
} from '@/app/(frontend)/components/ui'

type FormBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'formBlock' }>

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-none',
}

const backgroundColorClasses = {
  transparent:
    'bg-white/80 text-ds-dark-blue backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 ring-1 ring-white/60',
  white: 'bg-white text-ds-dark-blue ring-1 ring-ds-dark-blue/5',
  gray: 'bg-[#f5f6fb] text-ds-dark-blue ring-1 ring-ds-dark-blue/5',
  primary:
    'bg-gradient-to-br from-[#1f2340] via-[#2a2f4f] to-ds-dark-blue text-white ring-1 ring-white/15 border border-white/10',
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

  const isDarkSurface = backgroundColor === 'primary' && layout !== 'card'
  const labelClasses = cn(
    'text-sm font-semibold tracking-[0.06em]',
    isDarkSurface ? 'text-white/80' : 'text-ds-dark-blue/70',
  )
  const helperTextClasses = isDarkSurface ? 'text-white/65' : 'text-ds-dark-blue/60'
  const controlBaseClasses =
    'w-full rounded-2xl border px-4 py-3 text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2'
  const inputClasses = cn(
    controlBaseClasses,
    isDarkSurface
      ? 'bg-white/5 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-ds-accent-yellow/40 focus-visible:border-ds-accent-yellow/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
      : 'bg-white border-ds-dark-blue/15 text-ds-dark-blue placeholder:text-ds-dark-blue/50 focus-visible:ring-ds-pastille-green/30 focus-visible:border-ds-pastille-green/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]',
  )
  const textareaClasses = cn(inputClasses, 'min-h-[130px]')
  const selectClasses = cn(inputClasses, 'appearance-none')
  const buttonClasses = cn(
    'relative inline-flex items-center justify-center rounded-2xl px-10 py-4 text-base font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'bg-gradient-to-r from-ds-accent-yellow via-[#ffd67f] to-[#ffbb55] text-[#2b2f4a] focus-visible:ring-ds-accent-yellow/40',
    'hover:scale-[1.01] active:scale-[0.99] shadow-[0_15px_35px_rgba(250,166,54,0.35)] disabled:opacity-60 disabled:pointer-events-none',
  )

  if (!form) {
    return (
      <section className="relative isolate overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#f4f6fb] via-white to-ds-light-neutral"
        />
        <div
          aria-hidden
          className="absolute -top-10 right-6 h-64 w-64 rounded-full bg-ds-pastille-green/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-6 h-72 w-72 rounded-full bg-ds-accent-yellow/20 blur-[90px]"
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-3xl bg-white/90 p-10 text-center shadow-[0_35px_120px_rgba(61,66,106,0.15)]">
            <h2 className="text-2xl font-light text-ds-dark-blue">Form unavailable</h2>
            <p className="mt-3 text-ds-dark-blue/70">
              We couldn&apos;t find the selected form. Please ensure it is published in Payload CMS.
            </p>
          </div>
        </div>
      </section>
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
        const formElement = e.target as HTMLFormElement
        formElement.reset()

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

  const renderField = (field: NonNullable<FormType['fields']>[number], index: number) => {
    const fieldData = field as any
    const fieldKey = `field-${fieldData.name || 'unnamed'}-${index}`
    const isRequired = fieldData.required || false

    const fieldWrapper = (content: React.ReactNode) => (
      <div
        key={fieldKey}
        style={{ width: fieldData.width ? `${fieldData.width}%` : '100%' }}
        className={cn(
          'min-w-0',
          fieldData.width && fieldData.width < 100 ? '' : 'w-full sm:w-auto',
        )}
      >
        {content}
      </div>
    )

    const requiredBadge = isRequired ? <span className="text-ds-accent-yellow ml-1">*</span> : null

    switch (field.blockType) {
      case 'text':
        return fieldWrapper(
          <div className="space-y-3">
            <Label htmlFor={fieldKey} className={labelClasses}>
              {fieldData.label || fieldData.name}
              {requiredBadge}
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
              className={inputClasses}
            />
          </div>,
        )

      case 'email':
        return fieldWrapper(
          <div className="space-y-3">
            <Label htmlFor={fieldKey} className={labelClasses}>
              {fieldData.label || fieldData.name}
              {requiredBadge}
            </Label>
            <Input
              id={fieldKey}
              name={fieldData.name}
              type="email"
              required={isRequired}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className={inputClasses}
            />
          </div>,
        )

      case 'number':
        return fieldWrapper(
          <div className="space-y-3">
            <Label htmlFor={fieldKey} className={labelClasses}>
              {fieldData.label || fieldData.name}
              {requiredBadge}
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
              className={inputClasses}
            />
          </div>,
        )

      case 'textarea':
        return fieldWrapper(
          <div className="space-y-3">
            <Label htmlFor={fieldKey} className={labelClasses}>
              {fieldData.label || fieldData.name}
              {requiredBadge}
            </Label>
            <Textarea
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange(fieldData.name, e.target.value)
              }
              className={textareaClasses}
            />
          </div>,
        )

      case 'checkbox':
        return fieldWrapper(
          <div className="flex items-center gap-3">
            <Checkbox
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultChecked={fieldData.defaultValue || false}
              onCheckedChange={(checked: boolean) => handleInputChange(fieldData.name, checked)}
            />
            <Label
              htmlFor={fieldKey}
              className={cn(labelClasses, 'tracking-normal font-medium text-sm')}
            >
              {fieldData.label || fieldData.name}
              {requiredBadge}
            </Label>
          </div>,
        )

      case 'select':
        return fieldWrapper(
          <div className="space-y-3">
            <Label htmlFor={fieldKey} className={labelClasses}>
              {fieldData.label || fieldData.name}
              {requiredBadge}
            </Label>
            <Select
              id={fieldKey}
              name={fieldData.name}
              required={isRequired}
              defaultValue={fieldData.defaultValue || ''}
              onValueChange={(value: string) => handleInputChange(fieldData.name, value)}
              className={selectClasses}
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
              <RichText
                data={fieldData.message}
                className={cn(
                  'prose prose-sm max-w-none',
                  isDarkSurface ? 'prose-invert text-white/80' : 'text-ds-dark-blue/70',
                )}
              />
            )}
          </div>,
        )

      default:
        return fieldWrapper(
          <div className="space-y-2">
            <Label className={labelClasses}>
              {fieldData.label || fieldData.name || 'Unknown field'}
            </Label>
            <p className={cn('text-sm', helperTextClasses)}>
              Unsupported field type: {field.blockType}
            </p>
          </div>,
        )
    }
  }

  const renderStatusBanner = () => (
    <>
      {submitStatus === 'success' && form.confirmationType === 'message' && (
        <div
          className={cn(
            'mb-8 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5',
            isDarkSurface
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-ds-pastille-green/10 border-ds-pastille-green/30 text-ds-dark-blue',
          )}
        >
          <div className="flex items-start gap-3">
            <svg
              className={cn(
                'h-5 w-5 flex-shrink-0',
                isDarkSurface ? 'text-ds-accent-yellow' : 'text-ds-pastille-green',
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm leading-relaxed">
              {form.confirmationMessage && isLexicalEditorState(form.confirmationMessage) ? (
                <RichText
                  data={form.confirmationMessage}
                  className={cn(
                    'prose prose-sm max-w-none',
                    isDarkSurface ? 'prose-invert text-white' : 'text-ds-dark-blue',
                  )}
                />
              ) : (
                submitMessage
              )}
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className={cn(
            'mb-8 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5',
            isDarkSurface
              ? 'bg-[#ff5f5f]/10 border-[#ff8c8c]/30 text-white'
              : 'bg-red-50 border-red-200 text-red-900',
          )}
        >
          <div className="flex items-start gap-3">
            <svg
              className={cn(
                'h-5 w-5 flex-shrink-0',
                isDarkSurface ? 'text-[#ff8080]' : 'text-red-500',
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm leading-relaxed">{submitMessage}</div>
          </div>
        </div>
      )}
    </>
  )

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {form.fields?.map((field, index) => renderField(field, index))}
      </div>
      <div className={cn('pt-4', buttonWidth === 'auto' && 'flex justify-center')}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            buttonClasses,
            buttonWidth === 'full' ? 'w-full' : 'w-auto',
            isSubmitting && 'opacity-80',
          )}
        >
          {isSubmitting ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
        </Button>
      </div>
    </form>
  )

  const containerClasses = cn(
    'mx-auto w-full',
    maxWidthClasses[(maxWidth as keyof typeof maxWidthClasses) || 'md'],
  )

  const formClasses = cn(
    'space-y-8 rounded-3xl shadow-[0_35px_120px_rgba(61,66,106,0.18)] transition-all duration-500',
    isDarkSurface && 'shadow-[0_45px_180px_rgba(5,7,31,0.55)]',
    backgroundColorClasses[
      (backgroundColor as keyof typeof backgroundColorClasses) || 'transparent'
    ],
    paddingClasses[(padding as keyof typeof paddingClasses) || 'md'],
  )

  const sectionClasses = cn(
    'relative isolate overflow-hidden py-16 sm:py-24',
    layout === 'centered' && 'flex items-center justify-center min-h-[400px]',
  )

  const formContent = (
    <div className={formClasses}>
      {title && (
        <div className="mb-6">
          <h2
            className={cn(
              'text-3xl font-light tracking-tight text-pretty',
              isDarkSurface ? 'text-white' : 'text-ds-dark-blue',
            )}
          >
            {title}
          </h2>
        </div>
      )}

      {description && isLexicalEditorState(description) && (
        <div className="mb-4">
          <RichText
            data={description}
            className={cn(
              'prose prose-sm max-w-none',
              isDarkSurface ? 'prose-invert text-white/80' : 'text-ds-pastille-green',
            )}
          />
        </div>
      )}

      {renderStatusBanner()}

      {renderForm()}
    </div>
  )

  return (
    <section className={sectionClasses}>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#f4f6fb] via-white to-ds-light-neutral"
      />
      <div
        aria-hidden
        className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-ds-pastille-green/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-[-3rem] left-6 h-80 w-80 rounded-full bg-ds-accent-yellow/15 blur-[120px]"
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className={containerClasses}>
          {layout === 'card' ? (
            <Card className="rounded-3xl border-none bg-white/90 shadow-[0_35px_120px_rgba(61,66,106,0.15)] backdrop-blur-xl">
              <CardHeader className="pb-8">
                {title && (
                  <CardTitle className="text-3xl font-light tracking-tight text-ds-dark-blue">
                    {title}
                  </CardTitle>
                )}
                {description && isLexicalEditorState(description) && (
                  <div className="pt-4">
                    <RichText
                      data={description}
                      className="prose prose-sm max-w-none text-ds-pastille-green"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                {renderStatusBanner()}
                {renderForm()}
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
