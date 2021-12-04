const al = function(e) {
  return document.querySelector(e)
};

const all = function(e) {
  return document.querySelectorAll(e)
};

var menu = al('.menu');

menu.addEventListener('click', function() {
  al('.mover').classList.toggle("mostrar");
});

var iconBx = all('.iconBx');
var contentBx = all('.contentBx');

for (let i = 0; i < iconBx.length; i++) {
    iconBx[i].addEventListener("click", function() {
        for (let i = 0; i < contentBx.length; i++) {
            contentBx[i].className = 'contentBx';

        }
        document.getElementById(this.dataset.id).className = 'contentBx active';
        console.log('clicou1')
        

    })
}

var carrinhoCompras = [];
var corpoquantidade = 1;
var corpokey = 0;


arrayOb.map((item, index) => {
  let Produtos = al('.clone .produto').cloneNode(true);

  Produtos.setAttribute('data-key', index);
  Produtos.querySelector('.produtoImg img').src = item.img;
  Produtos.querySelector('.produtoPreco').innerHTML = `R$ ${item.preco.toFixed(2)}`;
  Produtos.querySelector('.produtoNome').innerHTML = item.nome;
  Produtos.querySelector('.produtoDescricao').innerHTML = item.descricao;
 

  Produtos.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    let key = e.target.closest('.produto').getAttribute('data-key');
    corpoquantidade = 1;
    corpokey = key;

    al('.produtosG img').src = arrayOb[key].img;
    al('.inforProduto h1').innerHTML = arrayOb[key].nome;
    al('.descricaoProduto').innerHTML = arrayOb[key].descricao;
    al('.valorProdutoLocal').innerHTML = `R$ ${arrayOb[key].preco.toFixed(2)}`;

    al('.valorUpdate').innerHTML = corpoquantidade;

    al('.desktop').style.opacity = 0;
    al('.desktop').style.display = 'flex';
    setTimeout(() => {
      al('.desktop').style.opacity = 1;
    }, 200);
  });

  al('.corpoProduto').append(Produtos);
});


function fecharDesktop() {
  al('.desktop').style.opacity = 0;
  setTimeout(() => {
    al('.desktop').style.display = 'none';
  }, 500);
}
all('.botaoCancelar, .botaoCelular').forEach((item) => {
  item.addEventListener('click', fecharDesktop);
});
al('.valorUpdateMenos').addEventListener('click', () => {
  if (corpoquantidade > 1) {
    corpoquantidade--;
    al('.valorUpdate').innerHTML = corpoquantidade;
  }
});
al('.valorUpdateMais').addEventListener('click', () => {
  corpoquantidade++;
  al('.valorUpdate').innerHTML = corpoquantidade;
});

al('.botaoAdicionar').addEventListener('click', () => {
  let tamanhoIt = parseInt(al('.produtoTamanho').getAttribute('data-key'));
  let indetificacao = arrayOb[corpokey].id + '@' + tamanhoIt;
  let key = carrinhoCompras.findIndex((item) => item.indetificacao == indetificacao);
  if (key > -1) {
    carrinhoCompras[key].qt += corpoquantidade;

  } else {
    carrinhoCompras.push({
      indetificacao,
      id: arrayOb[corpokey].id,
      tamanhoIt,
      qt: corpoquantidade
    });


  }
  updatecarrinhoCompras();
  fecharDesktop();

});

function updatecarrinhoCompras() {
  al('.carrinho').innerHTML = carrinhoCompras.length;

  if (carrinhoCompras.length > 0) {
    al('aside').classList.add('show');


    al('.carrinhoCompras').innerHTML = '';

    let totalProdutos = 0;

    for (let i in carrinhoCompras) {
      let produtoLoja = arrayOb.find((item) => item.id == carrinhoCompras[i].id);
      totalProdutos += produtoLoja.preco * carrinhoCompras[i].qt;


      let produtoCarrinho = al('.clone .carProduto').cloneNode(true);

      let nomeProdutos = `${produtoLoja.nome}`;

      produtoCarrinho.querySelector('img').src = produtoLoja.img;
      produtoCarrinho.querySelector('.nomeProduto').innerHTML = nomeProdutos;
      produtoCarrinho.querySelector('.quantidadeProduto').innerHTML = carrinhoCompras[i].qt;

      produtoCarrinho.querySelector('.produtoMenos').addEventListener('click', () => {
        if (carrinhoCompras[i].qt > 1) {
          carrinhoCompras[i].qt--;
        } else {
          carrinhoCompras.splice(i, 1);
        }
        updatecarrinhoCompras();
      });
      produtoCarrinho.querySelector('.produtoMais').addEventListener('click', () => {
        carrinhoCompras[i].qt++;
        updatecarrinhoCompras();
      });

      al('.carrinhoCompras').append(produtoCarrinho);
    }

    al('.TotPedido P').innerHTML = `${'Valor Total R$:' + totalProdutos.toFixed(2)}`;


  } else {
    al('aside').classList.remove('show');
    al('aside').style.left = '100vw';
  }
}


var car = al(".carrinhoFechar");

car.addEventListener('click', () => {
  al('aside').classList.remove('show');
  al('.carrinhoimg span').innerHTML = `${corpoquantidade}`
});

let imgCar = al('.carrinhoimg');
imgCar.addEventListener('click', function() {
  al('aside').classList.add('show');
});