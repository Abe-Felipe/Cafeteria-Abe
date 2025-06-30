const getCoffeeName = (baseIngredients) => {
    if (!baseIngredients || baseIngredients.length === 0) return '';
    const key = [...baseIngredients].sort().join(',');
    const coffeeNameMap = {
      'Espresso': 'Espresso Tradicional', 'Espresso,Leite': 'Latte',
      'Espresso,Espuma': 'Espresso Macchiato', 'Espresso,Espuma,Leite': 'Cappuccino Clássico',
      'Chocolate,Espresso,Leite': 'Mocha', 'Chocolate,Espresso,Espuma': 'Vienense (variação)',
      'Espresso,Sorvete': 'Affogato',
    };
    return coffeeNameMap[key] || 'Café Personalizado';
};

describe('Regra de Negócio - Edge Cases', () => {
  it('[UNIT-06] Deve retornar uma string vazia se os ingredientes forem nulos ou vazios', () => {
    expect(getCoffeeName(null)).toBe('');
    expect(getCoffeeName(undefined)).toBe('');
    expect(getCoffeeName([])).toBe('');
  });

  it('[UNIT-07] Deve identificar corretamente todas as receitas clássicas', () => {
    expect(getCoffeeName(['Espresso'])).toBe('Espresso Tradicional');
    expect(getCoffeeName(['Leite', 'Espresso'])).toBe('Latte');
    expect(getCoffeeName(['Espuma', 'Espresso'])).toBe('Espresso Macchiato');
    expect(getCoffeeName(['Leite', 'Espuma', 'Espresso'])).toBe('Cappuccino Clássico');
    expect(getCoffeeName(['Leite', 'Chocolate', 'Espresso'])).toBe('Mocha');
    expect(getCoffeeName(['Espuma', 'Chocolate', 'Espresso'])).toBe('Vienense (variação)');
    expect(getCoffeeName(['Sorvete', 'Espresso'])).toBe('Affogato');
  });
});