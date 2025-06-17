import "../body.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Button, Card, FormatNumber, Text  } from "@chakra-ui/react"
import { authFetch } from "../../login/AuthFetch"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Comprar(){
    const params = useParams("produto/:produtoId");
    const [nome, setNome] = useState('');
    const [image, setImage] = useState('');
    const [valor, setValor] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [item, setItem] = useState(0);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const data = await authFetch(`http://localhost:8081/produto/${params.produto}`, {
                    method: 'GET',
                    mode: 'cors',
                });

                setNome(data.nomeProduto);
                setImage(data.image);
                setDescricao(data.descricao);
                setValor(data.valorUnitario);
                setQuantidade(data.quantidadeProduto);
            } catch (error) {
                console.error("erro ao carregar os dados", error);
                setError("Erro no carregamento, tente novamente mais tarde");
            }
        };

        fetchProduto();
    }, [params]);

    const handleSubmitCompra = async (ev) => {
        ev.preventDefault();

        const itemForm = {
            quantidadeIten: item,
            statusItem: 'pendente',
            valorItem: valor,
            produto: params.produto
        };

        try {
            const result = await authFetch(`http://localhost:8085/itens`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemForm),
            });

        } catch (error) {
            setError('Erro no cadastro do Item');
            console.error(error);
        }

        navigate('/kraken/checking');
    };

    const handleIncrementCompra = () => {
        const newQntd = item + 1;
        if (newQntd) {
            setItem(newQntd)
        }
    };

    const handleDecrementCompra = () => {
        const newQntd = item - 1;
        if (newQntd) {
            setItem(newQntd)
        }
    };

    return (
        <>
            <Card.Root>
                <Card.Body>
                    <Card.Title>{nome}</Card.Title>
                    <div className="produto-comprar row">
                        <div className="col-8">
                            <div className="compra-value" contextMenulass="list-group">
                                <img className="bd-placeholder-img card-img-top" src={`data:image/png;base64,${image}`}/>
                            </div>
                        </div>
                        <div className="col-4">
                            <form onSubmit={handleSubmitCompra} >
                                <h3>Descrição:</h3>
                                <Text textStyle="lg">
                                    <p>{descricao}</p>
                                </Text>
                                <h3>Valor Produto:</h3>
                                <Text textStyle="lg">
                                    R$ <FormatNumber value={valor} />
                                </Text>
                                <h3>Quantidade</h3>
                                <NumberInputRoot width="50px" value={item} onIncrement={handleIncrementCompra} onDecrement={handleDecrementCompra} marginLeft="2rem" min={0} max={quantidade}>
                                    <NumberInputField marginLeft="-7" value={item} readOnly />
                                </NumberInputRoot>
                                <Button type="submit" variant="solid" borderRadius={8} padding={2} backgroundColor="#191970">Comprar</Button>
                            </form>
                        </div>
                    </div>
                </Card.Body>
            </Card.Root>
        </>
    )
}

export default Comprar;