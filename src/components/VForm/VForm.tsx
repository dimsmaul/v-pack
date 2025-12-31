// src/components/VForm/VForm.tsx
import React, { createContext, useContext } from 'react';
import { View, Text, type ViewProps } from 'react-native';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import tw from '../../utils/tw';

// Form Context
interface FormContextValue<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
}

const FormContext = createContext<FormContextValue<any> | null>(null);

const useFormContext = <TFieldValues extends FieldValues>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within VForm');
  }
  return context as FormContextValue<TFieldValues>;
};

// Form Root
interface VFormProps<TFieldValues extends FieldValues> extends ViewProps {
  form: UseFormReturn<TFieldValues>;
  children: React.ReactNode;
}

export function VForm<TFieldValues extends FieldValues>({
  form,
  children,
  style,
  ...props
}: VFormProps<TFieldValues>) {
  return (
    <FormContext.Provider value={{ form }}>
      <View style={style} {...props}>
        {children}
      </View>
    </FormContext.Provider>
  );
}

// Form Field Context
interface FormFieldContextValue {
  name: string;
  error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('FormField components must be used within FormField');
  }
  return context;
};

// Form Field
interface VFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, 'control'> {
  control?: ControllerProps<TFieldValues, TName>['control'];
}

export function VFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name, render, ...props }: VFormFieldProps<TFieldValues, TName>) {
  const { form } = useFormContext<TFieldValues>();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <FormFieldContext.Provider value={{ name, error }}>
      <Controller
        control={control || form.control}
        name={name}
        render={render}
        {...props}
      />
    </FormFieldContext.Provider>
  );
}

// Form Item
interface VFormItemProps extends ViewProps {
  children: React.ReactNode;
}

export function VFormItem({ children, style, ...props }: VFormItemProps) {
  return (
    <View style={[tw.style('mb-4'), style]} {...props}>
      {children}
    </View>
  );
}

// Form Label
interface VFormLabelProps {
  children: React.ReactNode;
  style?: any;
}

export function VFormLabel({ children, style }: VFormLabelProps) {
  return (
    <Text style={[tw.style('text-sm font-medium text-gray-700 mb-1'), style]}>
      {children}
    </Text>
  );
}

// Form Control
interface VFormControlProps {
  children: React.ReactElement;
}

export function VFormControl({ children }: VFormControlProps) {
  const { error } = useFormFieldContext();

  return React.cloneElement(children, {
    error: !!error,
  } as any);
}

// Form Description
interface VFormDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

export function VFormDescription({ children, style }: VFormDescriptionProps) {
  return (
    <Text style={[tw.style('text-xs text-gray-500 mt-1'), style]}>
      {children}
    </Text>
  );
}

// Form Message
interface VFormMessageProps {
  style?: any;
}

export function VFormMessage({ style }: VFormMessageProps) {
  const { error } = useFormFieldContext();

  if (!error) return null;

  return (
    <Text style={[tw.style('text-xs text-danger-600 mt-1'), style]}>
      {error}
    </Text>
  );
}
