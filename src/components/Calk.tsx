import { type SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteField } from './inputs/AutocompleteField.tsx';
import { materialInsulation, spans, typeHome, typeRoof } from '../constans.ts';
import { Box, Button, Grid } from '@mui/material';
import { NumberField } from './inputs/NumberField.tsx';
import { useState } from 'react';

type Inputs = {
  spans: string;
  exampleRequired: string;
};

export const Calk = () => {
  const [price, setPrice] = useState<number>();
  const { control, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    const price =
      (data.lengthHome +
        data.materialInsulation.value +
        data.typeHome.value +
        data.typeRoof.value +
        data.typeRoof.value +
        data.widthHome) *
      data.spans.value *
      data.typeRoof.value;
    setPrice(price);
    console.log(data);
  };

  return (
    <Box
      sx={{
        marginTop: 32,
        maxWidth: 1400,
        width: '100%',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <AutocompleteField
              isRequired
              label="Число пролетов в поперечном разрезе"
              options={spans}
              name="spans"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <AutocompleteField
              isRequired
              label="Тип здания"
              options={typeHome}
              name="typeHome"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <NumberField
              isRequired
              label="Ширина здания, м"
              name="widthHome"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <AutocompleteField
              isRequired
              label="Тип кровли"
              options={typeRoof}
              name="typeRoof"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <NumberField
              isRequired
              label="Длина здания, м"
              name="lengthHome"
              control={control}
            />
          </Grid>
          <Grid size={6}>
            <AutocompleteField
              isRequired
              label="Материал утеплителя"
              options={materialInsulation}
              name="materialInsulation"
              control={control}
            />
          </Grid>
        </Grid>

        <Button
          sx={{
            marginTop: 16,
            backgroundColor: '#ed1c24',
            color: 'white',
            padding: '12px 24px',
          }}
          type="submit"
        >
          Рассчитать
        </Button>
      </form>

      {price && (
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          {price} BUN
        </Box>
      )}
    </Box>
  );
};
