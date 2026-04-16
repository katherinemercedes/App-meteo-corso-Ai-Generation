export function sanitizeCityName(cityName) {
  return cityName.trim().replace(/\s+/g, ' ');
}

export function weatherCodeToText(code) {
  const weatherMap = {
    0: 'Sereno',
    1: 'Prevalentemente sereno',
    2: 'Parzialmente nuvoloso',
    3: 'Coperto',
    45: 'Nebbia',
    48: 'Nebbia con brina',
    51: 'Pioviggine leggera',
    53: 'Pioviggine moderata',
    55: 'Pioviggine intensa',
    61: 'Pioggia leggera',
    63: 'Pioggia moderata',
    65: 'Pioggia intensa',
    71: 'Neve leggera',
    73: 'Neve moderata',
    75: 'Neve intensa',
    80: 'Rovesci leggeri',
    81: 'Rovesci moderati',
    82: 'Rovesci intensi',
    95: 'Temporale'
  };

  return weatherMap[code] ?? 'Condizione non disponibile';
}

export function formatTemperature(value) {
  return `${value} °C`;
}

export function formatWindSpeed(value) {
  return `${value} km/h`;
}
