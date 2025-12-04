import type { City, RoutesData } from "../types";

const cities: City[] = [
  { id: "sao-paulo", name: "São Paulo" },
  { id: "rio-janeiro", name: "Rio de Janeiro" },
  { id: "belo-horizonte", name: "Belo Horizonte" },
  { id: "brasilia", name: "Brasília" },
  { id: "curitiba", name: "Curitiba" },
  { id: "porto-alegre", name: "Porto Alegre" },
  { id: "salvador", name: "Salvador" },
  { id: "fortaleza", name: "Fortaleza" },
  { id: "recife", name: "Recife" },
  { id: "manaus", name: "Manaus" },
  { id: "belem", name: "Belém" },
  { id: "goiania", name: "Goiânia" },
  { id: "campinas", name: "Campinas" },
  { id: "santos", name: "Santos" },
  { id: "florianopolis", name: "Florianópolis" },
];

const routes: { [key: string]: number } = {
  // São Paulo
  "sao-paulo-rio-janeiro": 430,
  "sao-paulo-belo-horizonte": 586,
  "sao-paulo-brasilia": 1015,
  "sao-paulo-curitiba": 408,
  "sao-paulo-porto-alegre": 1120,
  "sao-paulo-salvador": 1962,
  "sao-paulo-fortaleza": 3127,
  "sao-paulo-recife": 2660,
  "sao-paulo-manaus": 3935,
  "sao-paulo-belem": 3250,
  "sao-paulo-goiania": 926,
  "sao-paulo-campinas": 95,
  "sao-paulo-santos": 72,
  "sao-paulo-florianopolis": 705,

  // Rio de Janeiro
  "rio-janeiro-belo-horizonte": 434,
  "rio-janeiro-brasilia": 1148,
  "rio-janeiro-curitiba": 852,
  "rio-janeiro-porto-alegre": 1553,
  "rio-janeiro-salvador": 1649,
  "rio-janeiro-fortaleza": 2808,
  "rio-janeiro-recife": 2338,
  "rio-janeiro-manaus": 4390,
  "rio-janeiro-belem": 2933,
  "rio-janeiro-goiania": 1310,
  "rio-janeiro-campinas": 525,
  "rio-janeiro-santos": 502,
  "rio-janeiro-florianopolis": 1135,

  // Belo Horizonte
  "belo-horizonte-brasilia": 741,
  "belo-horizonte-curitiba": 1004,
  "belo-horizonte-porto-alegre": 1712,
  "belo-horizonte-salvador": 1372,
  "belo-horizonte-fortaleza": 2521,
  "belo-horizonte-recife": 2041,
  "belo-horizonte-manaus": 3718,
  "belo-horizonte-belem": 2824,
  "belo-horizonte-goiania": 906,
  "belo-horizonte-campinas": 491,
  "belo-horizonte-santos": 563,
  "belo-horizonte-florianopolis": 1293,

  // Brasília
  "brasilia-curitiba": 1366,
  "brasilia-porto-alegre": 2027,
  "brasilia-salvador": 1446,
  "brasilia-fortaleza": 2176,
  "brasilia-recife": 2200,
  "brasilia-manaus": 3490,
  "brasilia-belem": 2120,
  "brasilia-goiania": 209,
  "brasilia-campinas": 930,
  "brasilia-santos": 1002,
  "brasilia-florianopolis": 1673,

  // Curitiba
  "curitiba-porto-alegre": 711,
  "curitiba-salvador": 2370,
  "curitiba-fortaleza": 3535,
  "curitiba-recife": 3068,
  "curitiba-manaus": 4343,
  "curitiba-belem": 3658,
  "curitiba-goiania": 1334,
  "curitiba-campinas": 502,
  "curitiba-santos": 480,
  "curitiba-florianopolis": 297,

  // Porto Alegre
  "porto-alegre-salvador": 3080,
  "porto-alegre-fortaleza": 4246,
  "porto-alegre-recife": 3779,
  "porto-alegre-manaus": 5054,
  "porto-alegre-belem": 4369,
  "porto-alegre-goiania": 2045,
  "porto-alegre-campinas": 1213,
  "porto-alegre-santos": 1191,
  "porto-alegre-florianopolis": 476,

  // Salvador
  "salvador-fortaleza": 1389,
  "salvador-recife": 839,
  "salvador-manaus": 4250,
  "salvador-belem": 2280,
  "salvador-goiania": 1559,
  "salvador-campinas": 2055,
  "salvador-santos": 2127,
  "salvador-florianopolis": 2667,

  // Fortaleza
  "fortaleza-recife": 800,
  "fortaleza-manaus": 2861,
  "fortaleza-belem": 1608,
  "fortaleza-goiania": 2789,
  "fortaleza-campinas": 3220,
  "fortaleza-santos": 3292,
  "fortaleza-florianopolis": 3832,

  // Recife
  "recife-manaus": 3661,
  "recife-belem": 2133,
  "recife-goiania": 2273,
  "recife-campinas": 2753,
  "recife-santos": 2825,
  "recife-florianopolis": 3365,

  // Manaus
  "manaus-belem": 1294,
  "manaus-goiania": 4003,
  "manaus-campinas": 4028,
  "manaus-santos": 4100,
  "manaus-florianopolis": 4640,

  // Belém
  "belem-goiania": 2733,
  "belem-campinas": 3343,
  "belem-santos": 3415,
  "belem-florianopolis": 3955,

  // Goiânia
  "goiania-campinas": 835,
  "goiania-santos": 907,
  "goiania-florianopolis": 1614,

  // Campinas
  "campinas-santos": 167,
  "campinas-florianopolis": 610,

  // Santos
  "santos-florianopolis": 633,
};

// Função para obter a distância entre duas cidades
const getDistance = (origin: string, destination: string): number | null => {
  if (origin === destination) return 0;

  // Tenta primeiro na ordem direta
  const key1 = `${origin}-${destination}`;
  if (routes[key1]) return routes[key1];

  // Tenta na ordem inversa
  const key2 = `${destination}-${origin}`;
  if (routes[key2]) return routes[key2];

  return null;
};

// Função para obter o nome da cidade pelo ID
const getCityName = (cityId: string): string | null => {
  const city = cities.find((c) => c.id === cityId);
  return city ? city.name : null;
};

export const ROUTES_DATA: RoutesData = {
  cities,
  routes,
  getDistance,
  getCityName,
};
