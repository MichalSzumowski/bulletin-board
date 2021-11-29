export const randomId = (idLength) => {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsAmount = characters.length;
  
  for(let i = 0; i < idLength; i++) {
    id += characters.charAt(Math.floor(Math.random() * charsAmount));
  }
  
  return id;
};

export const currentDate = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let dateTime = date+' '+time;

  return dateTime;
};
