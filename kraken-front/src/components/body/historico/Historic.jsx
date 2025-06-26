import { useEffect, useState } from 'react';
import '../body.css';
import { authFetch } from '../../login/AuthFetch';

function Historic () {
    const [pedido, setPedido] = useState([]);
    const [error, setError] = useState('');
    const [collapseState, setCollapseState] = useState({});

    const toggleCollapse = (index) => {
        setCollapseState((prevState) => ({
            ...prevState,
            [index]: !prevState[index] 
        }));
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await authFetch('http://localhost:8084/pedido', {
                method: 'GET',
                mode: 'cors',
            });

            const productPromises = data.map(async (valor) => {
                const itemPromises = valor.itens.map(async (item) => {
                    try {
                        const prod = await authFetch(`http://localhost:8085/itens/${item}`, {
                            method: 'GET',
                            mode: 'cors',
                        });

                        const result = await authFetch(`http://localhost:8081/produto/${prod.produto}`, {
                            method: 'GET',
                            mode: 'cors',
                        });

                        return { prod, prodValue: result };
                    } catch (error) {
                        console.error("Erro no carregamento ou validação do produto", error);
                        return null;
                    }
                });

                const itemContent = await Promise.all(itemPromises);
                return {
                    ...valor,
                    itemContent: itemContent.filter(item => item !== null),
                };
            });

            const valuePedido = await Promise.all(productPromises);
            const valid = valuePedido.filter(entidade => entidade !== null);
            setPedido(valid);
        } catch (error) {
            console.error('Erro ao acessar os dados do pedido', error);
            setError(error);
        }
    };

    fetchData();
}, []);

    const handleOrderUpdate = async (idPedido, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token JWT não encontrado');
            }

            const result = await fetch(`http://localhost:8084/pedido/${idPedido}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if(!result.ok){
                throw new Error('Erro carregar dados do Pedido');
            }

            const value = await result.json();
            console.log('Dados recebidos do pedido:', value);

            value.statusPedido =  newStatus;

            try {
                const response = await fetch(`http://localhost:8084/pedido/${idPedido}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(value),
                });

                if(!response.ok){
                    throw new Error('Erro na atualização');
                }
                
                window.location.reload(); 

            } catch (error) {
                console.error('Erro ao acessar os dados atualizados', error);
                setError(error);
            }

        } catch (error) {
            console.error('Erro ao acessar os dados', error);
            setError(error);
        }
    }

    

    return (
        <>
            <div className='container-historic'>
            {pedido.map((item, index) => (
                <div key={index}>
                    <div className={item.statusPedido === 'concluido'? 'alert-primary alert grid text-center' : item.statusPedido === 'pendente' ? 'alert-warning alert grid text-center' : item.statusPedido === 'cancelado' ? 'alert-danger alert grid text-center' : 'alert-dark alert grid text-center'} role="alert">
                        <div className="g-col-3">Id Pedido: {item.idPedido}</div>
                        <div className="g-col-3">
                            <p className="d-inline-flex gap-1">
                                <button className="btn btn-primary" type="button" onClick={() => toggleCollapse(index)} >Itens</button>
                                <button type="button" class="btn btn-primary" onClick={() => handleOrderUpdate(item.idPedido, 'concluido')} disabled={item.statusPedido === 'cancelado'} >Concluir</button>
                                <button type="button" class="btn btn-danger" onClick={() => handleOrderUpdate(item.idPedido, 'cancelado')} disabled={item.statusPedido === 'concluido'}  >Cancelar</button>
                            </p>
                        </div>
                        <div className="g-col-3">Valor da Compra: R$ {item.valorTotalPedido.toFixed(2)}</div>
                        <div className="g-col-3">{`Data da Compra: ${item.dataRegistro.substr(0, 10)} ${item.dataRegistro.substr(11, 5)}`}</div>
                        <div className={`collapse g-col-12 ${collapseState[index] ? 'show' : ''}`}>
                            <div className="card card-body">
                                <div className="accordion" id="accordionExample">
                                    {item.itemContent.map((produto, i) => (
                                        
                                        <div key={i} className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`collapse${i}`} >
                                                    {produto.prodValue.nomeProduto}
                                                </button>
                                            </h2>
                                            <div id={`collapse${i}`} className="accordion-collapse collapse show" data-bs-parent="#accordionExample" >
                                                <div className="grid text-center accordion-body">
                                                    <div class="g-col-6 g-col-md-4"><img src={`data:image/png;base64,${produto.prodValue.image}`} /></div>
                                                    <div class="g-col-6 g-col-md-4">{produto.prodValue.descricao}</div>
                                                    <div class="g-col-6 g-col-md-4">R$ {produto.prod.valorTotal}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Historic;