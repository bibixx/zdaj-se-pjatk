interface DonationOption {
  label: string;
  value: string;
  link?: string;
}

export const donationOptions: DonationOption[] = [
  {
    label: 'EUR (Bez prowizji)',
    value: 'https://ko-fi.com/bibixx',
    link: 'https://ko-fi.com/bibixx',
  },
  {
    label: 'PayPal (Prowizja 2,90%)',
    value: 'https://www.paypal.com/donate',
    link: 'https://www.paypal.com/donate?business=JUCPM53522SZY&item_name=Utrzymanie+pjatk.zdaj.se&currency_code=PLN',
  },
];
