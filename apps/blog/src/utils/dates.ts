const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

export const formatDateLong = (value?: string | null) => {
  return value ? longDateFormatter.format(new Date(value)) : '';
};

export const formatDateShort = (value?: string | null) => {
  return value ? shortDateFormatter.format(new Date(value)) : '';
};
