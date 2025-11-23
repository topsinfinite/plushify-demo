"use client";

import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "pattern" | "custom";
  value?: string | number | RegExp;
  message: string;
  validator?: (value: string) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateField(value: string, rules: ValidationRule[]): ValidationResult {
  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (!value.trim()) {
          return { isValid: false, message: rule.message };
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          return { isValid: false, message: rule.message };
        }
        break;

      case "minLength":
        if (value.length < (rule.value as number)) {
          return { isValid: false, message: rule.message };
        }
        break;

      case "maxLength":
        if (value.length > (rule.value as number)) {
          return { isValid: false, message: rule.message };
        }
        break;

      case "pattern":
        if (value && !(rule.value as RegExp).test(value)) {
          return { isValid: false, message: rule.message };
        }
        break;

      case "custom":
        if (value && rule.validator && !rule.validator(value)) {
          return { isValid: false, message: rule.message };
        }
        break;
    }
  }

  return { isValid: true };
}

interface ValidatedInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  rules?: ValidationRule[];
  placeholder?: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  disabled?: boolean;
  className?: string;
  showValidation?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

export function ValidatedInput({
  label,
  name,
  value,
  onChange,
  rules = [],
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  className,
  showValidation = true,
  validateOnBlur = true,
  validateOnChange = false,
}: ValidatedInputProps) {
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true });

  const validate = useCallback(() => {
    const result = validateField(value, rules);
    setValidation(result);
    return result;
  }, [value, rules]);

  useEffect(() => {
    if (touched && validateOnChange) {
      validate();
    }
  }, [value, touched, validateOnChange, validate]);

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      validate();
    }
  };

  const showError = touched && showValidation && !validation.isValid;
  const showSuccess = touched && showValidation && validation.isValid && value.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
        {label}
      </Label>

      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            showError && "border-red-500 focus-visible:ring-red-500",
            showSuccess && "border-green-500 focus-visible:ring-green-500",
            "pr-10"
          )}
        />

        {showValidation && touched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {validation.isValid && value.length > 0 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : !validation.isValid ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : null}
          </div>
        )}
      </div>

      {showError && validation.message && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validation.message}
        </p>
      )}
    </div>
  );
}

interface ValidatedTextareaProps extends Omit<ValidatedInputProps, 'type'> {
  rows?: number;
}

export function ValidatedTextarea({
  label,
  name,
  value,
  onChange,
  rules = [],
  placeholder,
  required = false,
  disabled = false,
  className,
  showValidation = true,
  validateOnBlur = true,
  validateOnChange = false,
  rows = 4,
}: ValidatedTextareaProps) {
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true });

  const validate = useCallback(() => {
    const result = validateField(value, rules);
    setValidation(result);
    return result;
  }, [value, rules]);

  useEffect(() => {
    if (touched && validateOnChange) {
      validate();
    }
  }, [value, touched, validateOnChange, validate]);

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      validate();
    }
  };

  const showError = touched && showValidation && !validation.isValid;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(required && "after:content-['*'] after:ml-0.5 after:text-red-500")}>
        {label}
      </Label>

      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={cn(
          showError && "border-red-500 focus-visible:ring-red-500"
        )}
      />

      {showError && validation.message && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {validation.message}
        </p>
      )}
    </div>
  );
}

// Form validation hook
export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRule[]>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const setValue = (field: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const setTouchedField = (field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateSingleField = (field: keyof T): boolean => {
    const rules = validationRules[field] || [];
    const result = validateField(String(values[field] || ""), rules);

    setErrors(prev => ({
      ...prev,
      [field]: result.isValid ? "" : result.message || ""
    }));

    return result.isValid;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;

    for (const field in validationRules) {
      const rules = validationRules[field];
      const result = validateField(String(values[field] || ""), rules);

      if (!result.isValid) {
        newErrors[field] = result.message || "";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouchedField,
    validateField: validateSingleField,
    validateForm,
    reset,
    isValid: Object.values(errors).every(error => !error)
  };
}

// Common validation rules
export const commonRules = {
  required: (message = "This field is required"): ValidationRule => ({
    type: "required",
    message
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    type: "email",
    message
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    type: "minLength",
    value: length,
    message: message || `Must be at least ${length} characters`
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    type: "maxLength",
    value: length,
    message: message || `Must be no more than ${length} characters`
  }),

  password: (message = "Password must be at least 8 characters with uppercase, lowercase, and number"): ValidationRule => ({
    type: "pattern",
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message
  })
};