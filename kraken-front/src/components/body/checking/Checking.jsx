import Item from './Item'; 
import "../carousel.css";
import { Button, Card, FormatNumber, Text  } from "@chakra-ui/react"
import { useEffect, useState } from "react";

function Checking() {
    const [item, setItem] = useState([]);
    const [produto, setProduto] = useState([]);
    const [error, setError] = useState('');
    const [quantidades, setQuantidades] = useState([]);

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
            setItem(data);
            if (data && data.length > 0) {
                setQuantidades(prevQuantidades => [
                    ...prevQuantidades,  
                    { idItem: prevQuantidades.idItem, quantidade: prevQuantidades.quantidadeIten } 
                ]);
            }
            const produtoItem = data.map(valor =>
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

    const atualizarQuantidade = (idItem, quantidade) => {
        setQuantidades(prev => ({
            ...prev,
            [idItem]: quantidade,
        }));
    };

    return (
        <> 
            <div className="row container-checking">
                {console.log(quantidades)}
                <div className="col-6"  >
                {produto.map((entidade, index) =>  (
                    <Item key={index} imagem={`data:image/png;base64,${entidade.prodValor.image}`} title={entidade.prodValor.nomeProduto} unitValue={entidade.prodValor.valorUnitario} qntd={entidade.idItem === quantidades.idItem ? quantidades.quantidade : entidade.quantidadeIten } onQntdChange={(quantidade) => atualizarQuantidade(entidade.idItem, quantidade)} total={quantidades.quantidade*entidade.prodValor.valorUnitario} />
                ))}
                </div>
                <div className="col-6">
                    <div className="cart-shopping">
                    <Card.Root className="cart-shopping" maxW="sm" borderColor={'#696969'}>
                        <Card.Body>
                            <Card.Title>Valor total do Pedido</Card.Title>
                            <Card.Description>
                                Valor Pedido:
                                <Text textStyle="lg">
                                    R$ <FormatNumber value={1} />
                                </Text>
                                Desconto:
                                <Text textStyle="lg">
                                    R$ <FormatNumber value={0} />
                                </Text>
                            </Card.Description>
                            <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                                R$ <FormatNumber value={0} />
                            </Text>
                        </Card.Body>
                        <Card.Footer gap="2">
                            <Button variant="solid">Buy now</Button>
                            <Button variant="ghost">Add to cart</Button>
                        </Card.Footer>
                    </Card.Root>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Checking;