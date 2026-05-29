import {
  TextField,
  Autocomplete as MuiAutocomplete,
  type AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material';
import { useController } from 'react-hook-form';

type AutocompleteProps = {
  label: string;
  name: string;
  control: any;
  rules?: any;
  isRequired?: boolean;
} & Omit<MuiAutocompleteProps<{}, false, false, false>, 'renderInput'>;

export const AutocompleteField = ({
  label,
  control,
  name,
  rules,
  isRequired = false,
  ...rest
}: AutocompleteProps) => {
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
  return (
    <MuiAutocomplete
      value={value ?? null}
      onChange={(_, val: any) => onChange(val)}
      getOptionLabel={(option: any) => option.label}
      onBlur={onBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputRef={ref}
          error={!!error}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};
