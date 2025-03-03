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
    const itensMap = pedido.itens.map((index) => index.idItem )
    const newPedido = {
      statusPedido: "cancelado",
      dataRegistro: pedido.dataRegistro,
      valorTotalPedido: pedido.valorTotalPedido,
      itens: itensMap
    }
    console.log(newPedido)
    try{
      const response = await fetch(`http://localhost:8084/pedido/${pedido.idPedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPedido)
      });
      
      if(!response.ok) {
        throw new Error("Erro na atualização do pedido")
      }
      const result = await response.json();
      navigate(`/kraken/historic`);
    } catch (error) {
        console.log("Erro no cadastro do pedido ou atualização dos itens", error);
        setError(error);
    }
  }

  const handleSend = async (f) => {
    f.preventDefault()
    const itensMap = pedido.itens.map((index) => index.idItem )
    const newPedido = {
      statusPedido: "andamento",
      dataRegistro: pedido.dataRegistro,
      valorTotalPedido: pedido.valorTotalPedido,
      itens: itensMap
    }
    try{
      const response = await fetch(`http://localhost:8084/pedido/${pedido.idPedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPedido)
      });
      
      if(!response.ok) {
        throw new Error("Erro na atualização do pedido")
      }
      const result = await response.json();
      navigate(`/kraken/historic`);
    } catch (error) {
        console.log("Erro no cadastro do pedido ou atualização dos itens", error);
        setError(error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8084/pedido/${params.order}`, {
          method: 'GET',
          mode: 'cors'
        });
  
        if (!res.ok) {
          throw new Error("Erro no carregamento de dados");
        }
  
        const result = await res.json();

        const itensComDetalhes = await Promise.all(
          result.itens.map(async (itemId) => {
            const itemResponse = await fetch(`http://localhost:8085/itens/${itemId}`, {
              method: 'GET',
              mode: 'cors'
            });
  
            if (!itemResponse.ok) {
              throw new Error(`Erro na leitura do item ${itemId}`);
            }
  
            const item = await itemResponse.json();

            const produtoResponse = await fetch(`http://localhost:8081/produto/${item.produto}`, {
              method: 'GET',
              mode: 'cors'
            });
  
            if (!produtoResponse.ok) {
              throw new Error(`Erro na leitura do produto ${item.produto}`);
            }
  
            const produto = await produtoResponse.json();
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
        setError(error);
      }
    };
    fetchData();
  }, []);

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