export const employeeList: string[] = [
  'Willow Hackett',
  'Spike Fuentes',
  'Rizwan England',
  ' Tyler - Jay Wall',
  '  Jayden Head',
  ' Dewey Fuller',
  '  Nazim Reid',
  '  Nicky North',
  '  Gruffydd Singh',
  ' Rickie Arellano',
  ' Dorian Stone',
  '  Kian Hayden',
  ' Hughie Hays',
  '  Elvis Glover',
  ' Ahmad Bender',
  ' Barnaby Vargas',
  '  Jeevan Mills',
  ' Kyle Wade',
  ' Jaye Bell',
  ' Tasha Vinson',
  ' Kaison Galindo',
  ' David Mathews',
  'Simon Rios',
  ' Shelley Ventura',
  'Derrick Liu',
  ' Kaleem Kendall',
  ' Kameron Hamilton',
  ' Garry Davenport',
  ' Ieuan Lester',
  'Rikki Christensen',
  'Austin Stacey',
  ' Adrian Bowler',
  ' Jaidan Bryant',
  'Willem Swift',
  ' Nial Langley',
  'Aaron Chester',
  'Yahya Herrera',
  'Ronan Fountain',
  ' Hunter Steadman',
];

export const pickRandomEmployee = (list: string[]): string[] => {
  let names: string[] = [];

  while (names.length < 5) {
    const randomNames = list[Math.floor(Math.random() * list.length)];
    names.push(randomNames);
    const checkDublicate = [...new Set(names)];
    names = checkDublicate;
  }

  return names;
};

export default employeeList;
