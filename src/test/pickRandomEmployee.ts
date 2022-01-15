const pickRandomEmployee = (list: string[]): string[] => {
  let names: string[] = [];

  while (names.length < 5) {
    const randomNames = list[Math.floor(Math.random() * list.length)];
    names.push(randomNames);
    const checkDublicate = [...new Set(names)];
    names = checkDublicate;
  }

  return names;
};

export default pickRandomEmployee;
