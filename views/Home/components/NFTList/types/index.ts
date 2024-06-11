export interface NFTBase {
  uri: string;
}

export interface NFTMeta {
  name: string;
  symbol: string;
  description: string;
  image: string;
  animation_url: string;
  external_url: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    },
  ];
  properties: {
    creators: [
      {
        address: string;
        share: 100;
      },
    ];
  };
}
