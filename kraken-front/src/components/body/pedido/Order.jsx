import "../body.css";
import React, { useState, useEffect } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { useParams, useNavigate } from "react-router-dom";
import { Card, FormatNumber, Text  } from "@chakra-ui/react"
import Pagamento from './Pagamento';
import Entrega from './Entrega';
import Operacao from './Operacao';

function Order () {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [pedido, setPedido] = useState([]);
  const params = useParams("order/:pedidoId");
  const navigate = useNavigate();

  const steps = [
    { label: 'Pagamento' },
    { label: 'Operação' },
    { label: 'Entrega' },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCancel = async (e) => {
      e.preventDefault();

      const itensMap = pedido.itens.map((index) => index.idItem);
      const newPedido = {
          statusPedido: "cancelado",
          dataRegistro: pedido.dataRegistro,
          valorTotalPedido: pedido.valorTotalPedido,
          itens: itensMap
      };

      try {
          const result = await authFetch(`http://localhost:8084/pedido/${pedido.idPedido}`, {
              method: 'PUT',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newPedido)
          });

          navigate(`/kraken/historic`);
      } catch (error) {
          console.error("Erro no cadastro do pedido ou atualização dos itens", error);
          setError("Erro ao cancelar o pedido. Tente novamente.");
      }
  };

  const handleSend = async (f) => {
    f.preventDefault();

    const itensMap = pedido.itens.map((index) => index.idItem);
    const newPedido = {
        statusPedido: "andamento",
        dataRegistro: pedido.dataRegistro,
        valorTotalPedido: pedido.valorTotalPedido,
        itens: itensMap
    };

    try {
        const result = await authFetch(`http://localhost:8084/pedido/${pedido.idPedido}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPedido)
        });

        navigate(`/kraken/historic`);
    } catch (error) {
        console.log("Erro no cadastro do pedido ou atualização dos itens", error);
        setError("Erro ao enviar o pedido. Tente novamente.");
    }
};


  
useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await authFetch(`http://localhost:8084/pedido/${params.order}`);

      const itensComDetalhes = await Promise.all(
        result.itens.map(async (itemId) => {
          const item = await authFetch(`http://localhost:8085/itens/${itemId}`);
          const produto = await authFetch(`http://localhost:8081/produto/${item.produto}`);
          return {
            ...item,
            produto: produto
          };
        })
      );

      const pedidoCompleto = {
        ...result,
        itens: itensComDetalhes
      };

      setPedido(pedidoCompleto);
    } catch (error) {
      console.error("Erro no carregamento dos dados", error);
      setError(error.message || "Erro inesperado");
    }
  };

  fetchData();
}, [params.order]);

  return (
    <div className='content-step'>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} label={step.label} />
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Pagamento />
        )}
        {activeStep === 1 && (
          <div>
            <h2>Operação</h2>
            <Card.Root className="cart-shopping" maxW="sm" borderColor={'#aaaaaa'} >
              <form>
                <Card.Body>
                  <Card.Title>Pedido</Card.Title>
                  <Card.Description>
                    Id Pedido
                    <Text textStyle="lg">
                      {pedido.idPedido}
                    </Text>
                    Itens
                    {pedido.itens.map((objeto) => (
                      <Operacao produtoId={objeto.produto.produtoId} nomeProduto={objeto.produto.nomeProduto} image={objeto.produto.image} quantidadeIten={objeto.quantidadeIten} />
                    ))}
                    Valor da Compra
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                        R$ <FormatNumber value={pedido.valorTotalPedido} />
                    </Text>
                  </Card.Description>
                </Card.Body>
                </form>
                </Card.Root>
          </div>
        )}
        {activeStep === 2 && (
          <Entrega frete={12} valor={pedido.valorTotalPedido} />
        )}
      </div>

      <div>
        <button className="btn btn-secondary" onClick={handleBack} disabled={activeStep === 0}>
          Voltar
        </button>
        <button className="btn btn-danger" onClick={handleCancel} >Cancelar</button>
        {activeStep === steps.length - 1 ? (
          <button className="btn btn-primary" onClick={handleSend} >Enviar</button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>Próximo</button>
        )}
        
      </div>
    </div>
  );
};

export default Order;