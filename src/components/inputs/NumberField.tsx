import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

type NumberFieldProps = {
  name: string;
  control: any;
  label: string;
  rules?: any;
  textFieldProps?: any;
  step?: number | string;
  min?: number;
  max?: number;
  isRequired: boolean;
};

export const NumberField = ({
  name,
  control,
  label,
  rules = {},
  textFieldProps = {},
  step = 'any',
  min,
  max,
  isRequired = false,
}: NumberFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...(isRequired ? { required: 'Поле обязательно' } : {}),
      ...rules,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const parsed = rawValue === '' ? undefined : Number(rawValue);
    onChange(parsed);
  };

  const displayValue =
    value !== null && value !== undefined ? String(value) : '';

  return (
    <TextField
      {...textFieldProps}
      sx={{
        width: '100%',
      }}
      inputRef={ref}
      label={label}
      type="number"
      value={displayValue}
      onChange={handleChange}
      onBlur={onBlur}
      error={!!error}
      helperText={error?.message}
      inputProps={{
        ...textFieldProps.inputProps,
        step,
        min,
        max,
        // Убираем нативные стрелки в некоторых браузерах при необходимости:
        // sx: { '& input[type=number]': { MozAppearance: 'textfield' } }
      }}
    />
  );
};
