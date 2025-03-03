import Item from './Item'; 
import "../body.css";
import { useEffect, useState } from "react";
import Pedido from './Pedido';
import { useNavigate } from 'react-router-dom';

function Checking() {
    const [valor, setValor] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [listaOrder, setListaOrder] = useState([]);
    const [produto, setProduto] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8085/itens`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Erro ao carregar os dados");
            }
            return res.json()
        })
        .then(data => {
            const produtoItem = data.filter((valor) => valor.statusItem === "pendente").map(valor =>
                fetch(`http://localhost:8081/produto/${valor.produto}`, {
                    method: 'GET',
                    mode: 'cors'
                })
                .then(response => {
                    if(!response.ok)
                        throw new Error("valor não encontrado");
                    return response.json();
                })
                .then(product => ({ ...valor, prodValor: product}))
                .catch(error => {
                    console.error("erro no carregamento do produto", error);
                    setError(error);
                })
            );
            Promise.all(produtoItem)
            .then(product => {
                const validoProduto = product.filter(entidade => entidade !== null);
                setProduto(validoProduto);
            })
            .catch(error => {
                console.error("erro no carregamento validação do produto", error);
                setError(error);
            })
        })
        .catch(error => {
            console.error("erro no carregamento item", error);
            setError(error);
        })
    }, []);

    useEffect(() => {
        const ids = produto.map(entidade => entidade.idItem);
        setListaOrder(ids);
    }, [produto]);
    

    useEffect(() => {
        const total = produto.reduce((acc, entidade) => {
            return acc + (Number(entidade.quantidadeIten) * Number(entidade.prodValor.valorUnitario));
        }, 0);
        setValor(total);
    }, [produto]);

    const handleDeleteItem = async (idItem) => {
        try {
            const response = await fetch(`http://localhost:8085/itens/${idItem}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok) {
                throw new Error("erro ao deletar a entidade");
            }
        } catch (error) {
            console.log("Erro na tentativa deletar", error);
            setError(error)
        }
        window.location.reload();
    }

    const handleQntdChange = async (idItem, newQntd) => {
        const updatedProdutos = produto.map((prod) => {
            if (prod.idItem === idItem) {
                return { ...prod, quantidadeIten: newQntd };
            }
            return prod;
        });
        setProduto(updatedProdutos);
    };

    const handleSubmitOrder = async (evo) => {
        evo.preventDefault();
        const order = {
            statusPedido: 'aguardando',
            valorTotalPedido: valor,
            itens: listaOrder
        }
    
        try {
            const response = await fetch(`http://localhost:8084/pedido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
    
            if (!response.ok) {
                throw new Error('Erro ao cadastrar Pedido');
            }
            
            const result = await response.json();
            const pedidoId = result.idPedido; 
    
            const updateItemsPromises = listaOrder.map(async (itemId) => {
                const item = produto.find((obj) => obj.idItem === itemId);
                
                if (!item) {
                    throw new Error(`Item com ID ${itemId} não encontrado`);
                }
    
                const itemFormat = {
                    quantidadeIten: item.quantidadeIten,
                    statusItem: 'alocado',
                    valorItem: item.prodValor.valorUnitario * item.quantidadeIten,
                    produto: item.prodValor.produtoId
                };
                console.log(itemFormat)
                const updateResponse = await fetch(`http://localhost:8085/itens/${item.idItem}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemFormat)
                });
    
                if (!updateResponse.ok) {
                    throw new Error(`Erro na atualização do item com ID ${item.idItem}`);
                }
    
                return updateResponse.json(); 
            });
            await Promise.all(updateItemsPromises);
    
            navigate(`/kraken/order/${pedidoId}`);
            
        } catch (error) {
            console.log("Erro no cadastro do pedido ou atualização dos itens", error);
            setError(error);
        }
    };
    

    return (
        <> 
            <div className="row container-checking">
                
                <div className="col-6" >
                {produto.map((entidade, index) =>  (
                    <Item key={index}
                        idItem={entidade.idItem} 
                        imagem={`data:image/png;base64,${entidade.prodValor.image}`} 
                        title={entidade.prodValor.nomeProduto}
                        unitValue={entidade.prodValor.valorUnitario} 
                        qntd={entidade.quantidadeIten } 
                        max={entidade.prodValor.quantidadeProduto}
                        total={entidade.quantidadeIten*entidade.prodValor.valorUnitario} 
                        onQntdChange={(newQntd) => handleQntdChange(entidade.idItem, newQntd)}
                        handleDelete={() => handleDeleteItem(entidade.idItem)}
                    />
                ))}
                </div>
                <div className="col-6">
                    <Pedido valor={valor} desconto={0} submitOrder={handleSubmitOrder} />
                </div>
            </div>
            
        </>
    )
}

export default Checking;