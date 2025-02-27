import '../category.css';
import React, { useState, useEffect } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import { Button, Card, FormatNumber, Text  } from "@chakra-ui/react"

function Order () {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [pedido, setPedido] = useState([]);

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await fetch(`http://localhost:8084/pedido`, {
          method: 'GET',
          mode: 'cors'
        });
  
        if (!res.ok) {
          throw new Error("Erro no carregamento de dados");
        }
  
        const data = await res.json();
        
        const order = data.find(obj => obj.idPedido === '847038ff-7a10-4919-8d0f-3c1b1f8813eb');
  
        if (!order) {
          throw new Error("Pedido não encontrado");
        }
        
        const itensComDetalhes = await Promise.all(
          order.itens.map(async (itemId) => {
            
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
          ...order,
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
          <div>
            <h2>Pagamento</h2>
            <form class="row g-3 container-pay">
                <div class="col-md-12">
                    <label for="inputCity" class="form-label">Numero do Cartão</label>
                    <input type="text" class="form-control"  />
                </div>
                <div class="col-md-3">
                    <label for="inputCity"  class="form-label">Data</label>
                    <input type="month" placeholder='MM/AA' class="form-control"  />
                </div>
                <div class="col-md-3">
                    <label for="inputZip" class="form-label">Codigo de Seguranca</label>
                    <input type="text" placeholder='***' class="form-control" />
                    <br/>
                </div>
            </form>
          </div>
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
                      <Text textStyle="lg" key={objeto.produto.nomeProduto}>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${objeto.produto.nomeProduto}`} >
                          {objeto.produto.nomeProduto}
                        </button>
                        <div className="modal fade" id={objeto.produto.nomeProduto} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{objeto.produto.nomeProduto}</h1>
                                <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <img className="modal-img" src={`data:image/png;base64,${objeto.produto.image}`} />
                                <h3>Quantidade: </h3>
                                <h4>{objeto.quantidadeIten}</h4>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Text>
                    ))}
                    Valor
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
          <div>
            <h2>Entrega</h2>
            {/* referente ao pagamento */}
          </div>
        )}
      </div>

      <div>
        <button class="btn btn-secondary" onClick={handleBack} disabled={activeStep === 0}>
          Voltar
        </button>
        {activeStep === steps.length - 1 ? (
          <button class="btn btn-primary" >Enviar</button>
        ) : (
          <button class="btn btn-primary" onClick={handleNext}>Próximo</button>
        )}
      </div>
    </div>
  );
};

export default Order;