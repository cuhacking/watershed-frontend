type theme = 'light' | 'dark';

const timeToTheme = (): theme => {
  // const time = new Date().getHours();
  // if (time > 18 || time < 7) {
  //   return 'dark';
  // } else {
  //   return 'light';
  // }

  return 'dark';
};

export let globalTheme: theme = timeToTheme();

export const themeElement = (darkColor: string, lightColor: string) =>
  globalTheme === 'dark' ? darkColor : lightColor;
