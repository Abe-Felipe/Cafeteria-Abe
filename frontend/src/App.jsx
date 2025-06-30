import React, { useState, useEffect, useMemo } from 'react';
import logo from './assets/logo.png'; 
import { Button, Alert, Modal, Form, InputGroup } from 'react-bootstrap';
import { getIngredients } from './services/api';
import IngredientList from './components/IngredientList';
import Summary from './components/Summary';
import Stepper from './components/Stepper';

const styles = {
  appBackground: { backgroundColor: '#4E342E', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' },
  mainCard: { width: '100%', maxWidth: '1100px', minHeight: '80vh', backgroundColor: '#FFF7E6', borderRadius: '15px', display: 'flex', padding: '2.5rem' },
  leftColumn: { flex: 2, display: 'flex', flexDirection: 'column', paddingRight: '2.5rem' },
  contentArea: { flexGrow: 1 },
  footerArea: { marginTop: 'auto', paddingTop: '1.5rem' },
  rightColumn: { flex: 1, borderLeft: '1px solid #ddd', paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column' },
  welcomeContainer: { width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
  primaryButton: { backgroundColor: '#4E342E', borderColor: '#4E342E', color: '#FFFFFF', fontWeight: '500' },
  welcomeLogo: { width: '150px', height: '150px', borderRadius: '50%', border: '5px solid #4E342E', objectFit: 'cover', marginBottom: '2rem' },
};

const coffeeNameMap = {
  'Espresso': 'Espresso Tradicional', 'Espresso,Leite': 'Latte',
  'Espresso,Espuma': 'Espresso Macchiato', 'Espresso,Espuma,Leite': 'Cappuccino Clássico',
  'Chocolate,Espresso,Leite': 'Mocha', 'Chocolate,Espresso,Espuma': 'Vienense (variação)',
  'Espresso,Sorvete': 'Affogato',
};

// Agora recebe um array de OBJETOS
const getCoffeeName = (baseIngredients, userName) => {
  const baseNames = baseIngredients.map(ing => ing.name);
  if (baseNames.length === 0) return '';
  const key = [...baseNames].sort().join(',');
  const classicName = coffeeNameMap[key];
  if (classicName) return classicName;
  return `Café Personalizado de ${userName || 'Você'}`;
};

function App() {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [allIngredients, setAllIngredients] = useState([]);
  const [baseSelected, setBaseSelected] = useState([]);
  const [extrasSelected, setExtrasSelected] = useState([]);
  const [cafeName, setCafeName] = useState('');
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getIngredients()
      .then(response => setAllIngredients(response.data))
      .catch(() => setError('Erro ao carregar ingredientes.'));
  }, []);

  useEffect(() => {
    if(step > 0) setCafeName(getCoffeeName(baseSelected, userName));
  }, [baseSelected, userName, step]);

  const baseIngredients = useMemo(() => allIngredients.filter(i => i.type === 'base'), [allIngredients]);
  const extraIngredients = useMemo(() => allIngredients.filter(i => i.type === 'extra'), [allIngredients]);

  const isBaseValid = useMemo(() => {
    const baseNames = baseSelected.map(ing => ing.name);
    return baseNames.includes('Espresso') || baseNames.includes('Leite');
  }, [baseSelected]);

  const handleToggle = (ingredient, selection, setSelection) => {
    const isSelected = selection.some(sel => sel.id === ingredient.id);
    if (isSelected) {
      setSelection(prev => prev.filter(sel => sel.id !== ingredient.id));
    } else {
      setSelection(prev => [...prev, ingredient]);
    }
  };

  const resetOrder = () => {
    setUserName(''); setBaseSelected([]); setExtrasSelected([]);
    setCafeName(''); setShowConfirmModal(false); setStep(0);
  };

  const clearBaseSelection = () => setBaseSelected([]);
  const clearExtrasSelection = () => setExtrasSelected([]);
  
  return (
    <div style={styles.appBackground}>
      <div style={styles.mainCard}>
        {step === 0 ? (
          <div style={styles.welcomeContainer}>
            <img src={logo} alt="Logo CaféScript" style={styles.welcomeLogo} />
            <h2>Bem-vindo à Cafeteria</h2>
            <p className="text-muted mb-4">Para começar, digite seu nome.</p>
            <Form className="w-75" onSubmit={(e) => { e.preventDefault(); if (userName) setStep(1); }}>
              <InputGroup>
                <Form.Control placeholder="Seu nome" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus />
                <Button type="submit" style={styles.primaryButton} disabled={!userName}>Montar meu Café</Button>
              </InputGroup>
            </Form>
          </div>
        ) : (
          <>
            <div style={styles.leftColumn}>
              <Stepper currentStep={step} />
              <div style={styles.contentArea}>
                {step === 1 && <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>1. Escolha a Base, {userName}</h3>
                    <Button variant="link" size="sm" onClick={clearBaseSelection}>Limpar Seleção</Button>
                  </div>
                  <IngredientList ingredients={baseIngredients} selected={baseSelected} onToggle={(ingredient) => handleToggle(ingredient, baseSelected, setBaseSelected)} limit={3} />
                  {!isBaseValid && baseSelected.length > 0 && <p className="text-danger text-center mt-3">Para um café, é obrigatório "Espresso" ou "Leite".</p>}
                </>}
                {step === 2 && <>
                   <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>2. Adicione os Extras</h3>
                    <Button variant="link" size="sm" onClick={clearExtrasSelection}>Limpar Seleção</Button>
                  </div>
                  <IngredientList ingredients={extraIngredients} selected={extrasSelected} onToggle={(ingredient) => handleToggle(ingredient, extrasSelected, setExtrasSelected)} limit={2} />
                </>}
              </div>
              <div style={styles.footerArea}>
                {step === 1 && <div className="d-flex justify-content-center">
                  <Button onClick={() => setStep(2)} style={styles.primaryButton} disabled={!isBaseValid}>Próximo</Button>
                </div>}
                {step === 2 && <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setStep(1)}>Voltar</Button>
                  <Button style={styles.primaryButton} onClick={() => setShowConfirmModal(true)}>Finalizar Pedido</Button>
                </div>}
              </div>
            </div>
            <div style={styles.rightColumn} data-testid="summary-column">
              <Summary name={cafeName} bases={baseSelected} extras={extrasSelected} />
            </div>
          </>
        )}
      </div>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Pedido?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você está prestes a pedir um <strong>{cafeName}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
          <Button style={styles.primaryButton} onClick={resetOrder}>Confirmar e Fazer Outro</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;