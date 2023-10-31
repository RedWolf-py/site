function buscarCep() {
  let cep = document.getElementById('cep').value;
 
  if (cep !== "") {
    let url = "https://viacep.com.br/ws/"+cep+"/json/";
    console.log(url)

    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.send();
    ////tratar xml do metodo get////
    req.onload = function() {
      if (req.status === 200) {
        let endereco = JSON.parse(req.response);
        document.getElementById('rua').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('estado').value = endereco.uf;
       
      }else if(req.status === 400){
        alert('cep nao encontrado')
      }else{
        alert('erro na requisição')
      }
    }
  }
}
  window.onload = function(){
    let texCep = document.getElementById('cep');
    texCep.addEventListener('blur',buscarCep);
  }

