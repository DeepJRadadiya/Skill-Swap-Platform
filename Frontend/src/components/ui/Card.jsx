import React from 'react';
import { cn } from '../../utils/cn';

function Card({ children, className, ...props }) {
  return (
    <div 
      className={cn("bg-white rounded-lg shadow-md border border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className, ...props }) {
  return (
    <div 
      className={cn("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className, ...props }) {
  return (
    <div 
      className={cn("px-6 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className, ...props }) {
  return (
    <div 
      className={cn("px-6 py-4 bg-gray-50 rounded-b-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;