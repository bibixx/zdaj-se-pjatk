interface DonationOption {
  label: string;
  value: string;
  link?: string;
}

export const donationOptions: DonationOption[] = [
  {
    label: 'BTC',
    value: '1BtKrBDStoR6C6HVQdZXUA8qznSFy7yrwp',
  },
  {
    label: 'ETH',
    value: '0xF0De3960b4B82dbDAD8980F0cf247a91b73F7Df2',
  },
  {
    label: 'LTC',
    value: 'LUKHbSzzyxWxUJgrBwWcfvA77fR4M1SudD',
  },
  {
    label: 'DASH',
    value: 'Xf5dhistKvKvDemtPUyohWK2VqZRWcGAXY',
  },
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
  {
    label: 'Brave Rewards',
    value: 'Brave Support',
    link: 'https://support.brave.com/hc/en-us/articles/360021123971-How-do-I-tip-websites-and-Content-Creators-in-Brave-Rewards-',
  },
];
