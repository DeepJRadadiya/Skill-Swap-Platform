import React from 'react';
import { cn } from '../../utils/cn';

function FormField({ 
  label, 
  error, 
  children, 
  required, 
  className,
  ...props 
}) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}

function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}

FormField.Input = Input;
FormField.Select = Select;
FormField.Textarea = Textarea;

export default FormField;