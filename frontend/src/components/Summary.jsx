import React, { useMemo } from 'react';
import logo from '../assets/logo.png';
import { Card, Image, ListGroup } from 'react-bootstrap';

function Summary({ name, bases, extras }) {
  const logoStyle = {
    width: '130px', height: '130px', borderRadius: '50%',
    border: '4px solid #4E342E', objectFit: 'cover',
  };

  // Lógica para calcular o preço total
  const totalPrice = useMemo(() => {
    const basePrice = bases.reduce((sum, ing) => sum + parseFloat(ing.price), 0);
    const extrasPrice = extras.reduce((sum, ing) => sum + parseFloat(ing.price), 0);
    return (basePrice + extrasPrice).toFixed(2);
  }, [bases, extras]);

  return (
    <Card className="p-3 h-100 d-flex flex-column">
      <div className="flex-grow-1">
        <h4 className="text-center mb-3">{name || 'Aguardando Seleção...'}</h4>
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-transparent">
            <strong>Base:</strong> {bases.map(b => b.name).join(', ') || 'Nenhuma'}
          </ListGroup.Item>
          <ListGroup.Item className="bg-transparent">
            <strong>Extras:</strong> {extras.map(e => e.name).join(', ') || 'Nenhum'}
          </ListGroup.Item>
          {/* Exibição do preço */}
          <ListGroup.Item className="bg-transparent mt-3 border-top">
            <h5>Total: R$ {totalPrice}</h5>
          </ListGroup.Item>
        </ListGroup>
      </div>

      <div className="text-center mt-auto pt-3">
        <Image src={logo} alt="Logo CaféScript" style={logoStyle} />
      </div>
    </Card>
  );
}

export default React.memo(Summary);