
const url = "http://tablebase.lichess.ovh/standard?fen=4k3/pp6/8/5Q2/4R3/8/8/8_w_-_-_0_1";
fetch(url)
 .then(response => {
   
    return response;
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
