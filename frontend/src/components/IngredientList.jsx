import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { CheckCircleFill, Circle } from 'react-bootstrap-icons';

function IngredientCard({ ingredient, isSelected, onToggle, isDisabled }) {
  const cardClasses = `mb-3 text-center ${isSelected ? 'border-success' : ''} ${isDisabled ? 'bg-light opacity-50' : 'cursor-pointer'}`;

  return (
     <Card className={cardClasses} onClick={() => !isDisabled && onToggle(ingredient)} style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
      <Card.Body>
        <div style={{ fontSize: '1.5rem' }}>
          {isSelected ? <CheckCircleFill className="text-success" /> : <Circle color="#ced4da" />}
        </div>
        <Card.Title className="mt-2 fs-6">{ingredient.name}</Card.Title>
        <Card.Text className="text-muted">
          R$ {parseFloat(ingredient.price).toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}


function IngredientList({ ingredients, selected, onToggle, limit }) {
  return (
    <Row>
      {ingredients.map((ingredient) => {
        const isSelected = selected.some(sel => sel.id === ingredient.id);
        const isDisabled = !isSelected && selected.length >= limit;
        
        return (
          <Col xs={6} md={4} key={ingredient.id}>
            <IngredientCard
              ingredient={ingredient}
              isSelected={isSelected}
              onToggle={onToggle}
              isDisabled={isDisabled}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default React.memo(IngredientList);