const createMenu = require('../src/restaurant');

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  //1.
  const menu = {
    food: { coxinha: 3.90, sanduiche: 9.90 },
    drinks: { agua: 3.90, cerveja: 6.90 },
  };
  const menuObject = createMenu(menu);
  //2.
  const menuArray = createMenu({ food: {}, drinks: {} }).fetchMenu();
  const menuKeys = Object.keys(menuArray);
  //3.
  const menuObject2 = createMenu(menu).fetchMenu();
  //4.
  const menuArray2 = createMenu({ food: {}, drinks: {} });
  //6.
  const menuObject4 = createMenu({
    food: { coxinha: 3.90, sanduiche: 9.90 },
    drinks: { agua: 3.90, cerveja: 6.90 },
  });
  //7.
  const menuObject3 = createMenu({
    food: { coxinha: 3.90, sanduiche: 9.90 },
    drinks: { agua: 3.90, cerveja: 6.90 },
  });
  //8.
  const menuObject5 = createMenu({
    food: { coxinha: 3.90, sanduiche: 9.90 },
    drinks: { agua: 3.90, cerveja: 6.90 },
  });
  //9.
  const menuObject6 = createMenu({
      food: { coxinha: 3.90, sanduiche: 9.90 },
      drinks: { agua: 3.90, cerveja: 6.90 },
    });

  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    // fail('Teste vazio!');
    // Escreva todos os testes aqui.

    // 1.Escreva dois testes, um que verifica se a função createMenu() retorna um objeto que possui a chave fetchMenu e outro verificando se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função.
    expect(menuObject).toHaveProperty('fetchMenu');
    expect(typeof menuObject.fetchMenu).toBe('function');
    // 2.Verificando se o objeto retornado pela função createMenu({ food: {}, drinks: {} }).fetchMenu() retorna um objeto cujas chaves são somente food e drinks.
    expect(menuKeys).toEqual(['food', 'drinks']);
    // 3.Vericando se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função createMenu({ food: {}, drinks: {} }).fetchMenu().
    expect(menuObject2).toBe(menu);
    // 4.Testando se a propriedade consumption do objeto retornado pela função createMenu({ food: {}, drinks: {} }), após a criação do menu, retorna um array vazio.
    expect(menuArray2.consumption).toEqual([]);
    // 5.Escrevendo um teste para a situação proposta:
    menuObject.order('coxinha');
    expect(menuObject.consumption).toEqual(['coxinha']);
    const itemInexistente = menuObject.order('picanha');
    expect(itemInexistente).toBe('Item indisponível');
    expect(menuObject.consumption).toEqual(['coxinha']);
    // 6.Verificando se ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array consumption contém os itens pedidos.
    menuObject4.order('coxinha');
    menuObject4.order('agua');
    menuObject4.order('sanduiche');
    expect(menuObject4.consumption).toEqual(['coxinha', 'agua', 'sanduiche']);
    // 7.Escrevendo um teste que verifica se a função order aceita que pedidos repetidos sejam acrescidos a consumption.
    menuObject3.order('coxinha');
    menuObject3.order('coxinha');
    menuObject3.order('coxinha');
    expect(menuObject3.consumption).toEqual(['coxinha', 'coxinha', 'coxinha']);
    // 8.Escrevendo um teste para verificar se, ao chamar a função pay(), que será uma propriedade do objeto retornado pela função createMenu, ela retorna a soma dos preços de todos os itens pedidos
    menuObject5.order('coxinha');
    menuObject5.order('sanduiche');
    menuObject5.order('cerveja');
    const totalPrice = menuObject5.pay();
    expect(totalPrice).toBeCloseTo(20.7, 2);
    // 9.Adicionando ao objeto retornado por createMenu() uma chave pay com uma função que percorre por todos os itens de consumption, soma o preço deles e retorna o valor somado acrescido de 10%
    
    menuObject6.order('coxinha');
    menuObject6.order('sanduiche');
    menuObject6.order('agua');
    menuObject6.order('cerveja');
    const totalPriceWithTip = menuObject6.pay();
    expect(totalPriceWithTip).toBeCloseTo(24.6, 2);

})});
