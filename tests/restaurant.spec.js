const createMenu = require('../src/restaurant');

  const menus = createMenu({
    food: {coxinha: 3.90, sanduiche: 9.90},
    drinks: {agua: 3.90, cerveja: 6.90}
  });
    menus.order = function(object) {
      if (Object.keys(this.fetchMenu().food).includes(object) || Object.keys(this.fetchMenu().drinks).includes(object)) {
        this.consumption.push(object);
      } else {
        return "Item indisponível";
      }
    }
    

 menus.pay = function () {
  return this.consumption.reduce((total, item) => {
   const menuItems = this.fetchMenu();
   const itemPrice = menuItems.food[item] || menuItems.drinks[item] || 0;
   return total + itemPrice 
  }, 0);
};


describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    // fail('Teste vazio!');
    // Escreva todos os testes aqui.
    // Testando se a função createMenu retorna um objeto que possui a chave fetchMenu.
    expect(createMenu()).toHaveProperty('fetchMenu');
    // Verificando se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função.
    const menu = createMenu();
    expect(typeof menu.fetchMenu).toBe('function');
    // Verificando se o objeto retornado pela função createMenu({ food: {}, drinks: {} }).fetchMenu() retorna um objeto cujas chaves são somente food e drinks.
    const menu2 = createMenu({ food: {}, drinks: {} }).fetchMenu();
    expect(Object.keys(menu2)).toEqual(['food', 'drinks']);
    // Vericando se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função createMenu({ food: {}, drinks: {} }).fetchMenu().
    const recoveredMenu = createMenu({ food: {}, drinks: {} }).fetchMenu();
    expect(createMenu({ food: {}, drinks: {} }).fetchMenu()).toEqual(recoveredMenu);
    // Testando se a propriedade consumption do objeto retornado pela função createMenu({ food: {}, drinks: {} }), após a criação do menu, retorna um array vazio.
    const littleMenu = createMenu({ food: {}, drinks: {} })
    expect(littleMenu.consumption).toEqual([]);
    // Escrevendo um teste para a situação proposta:
    menus.order('coxinha');
    expect(menus.consumption).toEqual(['coxinha']);
    expect(menus.order('picanha')).toBe("Item indisponível");
    expect(menus.consumption).toEqual(['coxinha']);
    // Verificando se ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array consumption contém os itens pedidos.
    menus.order('sanduiche');
    menus.order('agua');
    expect(menus.consumption).toStrictEqual(['coxinha', 'sanduiche', 'agua']);
    // Escrevendo um teste para verificar se, ao chamar a função pay(), que será uma propriedade do objeto retornado pela função createMenu, ela retorna a soma dos preços de todos os itens pedidos
    menus.order('cerveja');
    const totalPrice1 = menus.pay();
    const expectedTotalPrice1 = (3.90 + 9.90 + 3.90 + 6.90);
    expect(totalPrice1).toBe(expectedTotalPrice1);
    //Adicionando ao objeto retornado por createMenu() uma chave pay com uma função que percorre por todos os itens de consumption, soma o preço deles e retorna o valor somado acrescido de 10%
    const totalPrice = menus.pay();
    const expectedTotalPrice = (3.90 + 9.90 + 3.90 + 6.90) * 1.1;
    expect(totalPrice).toBe(expectedTotalPrice);

})});
