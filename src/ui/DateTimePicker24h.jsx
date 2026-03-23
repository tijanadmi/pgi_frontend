import { useMemo } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import srLocale from 'date-fns/locale/sr-Latn'; // latinica, ako hoćeš ćirilicu → 'sr'
import { styled } from '@mui/material/styles';
import Input from './Input'; // tvoj styled Input


function DateTimePicker24h({ value, onChange, disabled, ...props }) {
  // Parsiranje stringa "dd.mm.yyyy hh:mm" → Date objekat
  const parsedValue = useMemo(() => {
    if (!value) return null;
    try {
      const [datePart, timePart] = value.split(' ');
      const [dd, mm, yyyy] = datePart.split('.');
      // yyyy-mm-ddTHH:mm format za Date konstruktor
      return new Date(`${yyyy}-${mm}-${dd}T${timePart}`);
    } catch (e) {
      console.warn('Nevalidan datum format:', value);
      return null;
    }
  }, [value]);

  const handleChange = (newDate) => {
    if (!newDate || isNaN(newDate.getTime())) {
      onChange('');
      return;
    }

     if (newDate > new Date()) return; // blokira budućnost

    const dd = String(newDate.getDate()).padStart(2, '0');
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const yyyy = newDate.getFullYear();
    const hh = String(newDate.getHours()).padStart(2, '0');
    const min = String(newDate.getMinutes()).padStart(2, '0');

    onChange(`${dd}.${mm}.${yyyy} ${hh}:${min}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={srLocale}>
     <DateTimePicker
  value={parsedValue}
  onChange={handleChange}
  disabled={disabled}
  format="dd.MM.yyyy HH:mm"
  ampm={false}
  disableFuture
  // disablePast={false}
  slotProps={{
  textField: {
    fullWidth: true,
    variant: 'outlined',
    placeholder: 'dd.mm.yyyy hh:mm',
    size: 'medium',  // ostavi ovo

    sx: {
  backgroundColor: 'var(--color-grey-0)',
  borderColor: 'var(--color-grey-300)',
  borderRadius: 'var(--border-radius-sm)',
  boxShadow: 'var(--shadow-sm)',

  '& .MuiPickersInputBase-root': {
    padding: '0 !important',
    minHeight: 'unset !important',
    height: 'auto !important',
  },

  // Sections container (ovde je visina)
        '& .MuiPickersInputBase-sectionsContainer': {
          padding: '10px 12px !important', // smanji sa default 16.5px
          minHeight: 'unset !important',
          display: 'flex',
          alignItems: 'center',
        },

 

  // Font za brojeve i placeholder
  '& .MuiPickersSectionList-root': {
    fontSize: '1.5rem !important',
  },
  '& .MuiPickersSectionList-placeholder': {
    fontSize: '1.5rem !important',
    opacity: 0.7,
  },

  // Jedinstveni blok za sekcije
  '& .MuiPickersSectionList-section': {
    fontSize: '1.5rem !important',
    padding: '0 1px !important', // bilo je 0 2px
    // letterSpacing: '0 !important', // ovo skuplja brojeve
    minHeight: 'unset !important',
  },

  // Ikonica kalendara
  '& .MuiInputAdornment-root': {
    height: '100%',
    alignItems: 'center',
    marginRight: '0.8rem',
  },

  // Kalendar popup – veći font za dane u mesecu
'& .MuiDateCalendar-root': {
  fontSize: '1.4rem !important',          // ili 1.5rem ako želiš još veće
},

// Brojevi dana u kalendaru
'& .MuiPickersDay-root': {
  fontSize: '1.4rem !important',
  width: '36px !important',
  height: '36px !important',
  margin: '0 2px !important',
},

// Trenutno selektovani dan
'& .MuiPickersDay-root.Mui-selected': {
  fontSize: '1.4rem !important',
},

// Sat (ako koristiš time picker deo)
'& .MuiClockNumber-root': {
  fontSize: '1.3rem !important',          // sat brojevi
},
},
 },
 
 // Dodaj stilove za popup kalendar i sat
    popper: {
      sx: {
        '& .MuiDateCalendar-root': {
          fontSize: '1.4rem !important',
        },
        '& .MuiPickersDay-root': {
          fontSize: '1.4rem !important',
          width: '36px !important',
          height: '36px !important',
          margin: '0 4px !important',
        },
        '& .MuiPickersDay-root.Mui-selected': {
          fontSize: '1.4rem !important',
        },
        '& .MuiClock-root': {
          margin: '20px 0',
        },
        '& .MuiClockNumber-root': {
          fontSize: '1.4rem !important',
        },
      },
    },

  openPickerButton: {
    sx: { color: 'var(--color-primary)' },
  },
}}
  {...props}
/>
    </LocalizationProvider>
  );
}

export default DateTimePicker24h;