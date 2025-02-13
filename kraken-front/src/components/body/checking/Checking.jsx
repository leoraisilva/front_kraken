import Item from './Item'; 
import "../carousel.css";
import { Button, Card, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";

function Checking() {
    const [item, setItem] = useState([]);
    const [produto, setProduto] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8084/itens/926a3d17-a225-4ee4-8194-cfdd16a2dd2c`, {
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
            setItem(data.produto);
        })
        .catch(error => {
            console.error("erro no carregamento", error);
            setError(error);
        })
    }, []);

    useEffect(() => {
        if(item.length > 0){
            const element = item.map((itemId) =>
                fetch(`http://localhost:8081/produto/${itemId}`, {
                    method: 'GET',
                    mode: 'cors'
                })
                .then(res => {
                    if(!res.ok){
                        throw new Error("erro ao carregar os arquivos");
                    }
                    return res.json();
                })
                .then(data => data)
                .catch(error => {
                    console.error("Erro no carregamento", error);
                    setError(error);
                })
            );
            Promise.all(element)
            .then((produto) => {
                setProduto(produto.filter((prod) => prod != null));
            })
            .catch((error) => {
                console.error('Erro no carregamento dos dados', error);
                setError(error);
            });
        }
    }, [item]);


    return (
        <> 
            <div className="row container-checking">
                <div className="col-6"  >
                    {produto.map((element, index) => (
                        <div key={index}>
                            <Item imagem={'data:image/png;base64,'+element.image} title={element.nomeProduto} unitValue={element.valorUnitario} qntd={5} />
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="cart-shopping">
                    <Card.Root className="cart-shopping" maxW="sm" borderColor={'#696969'}>
                        <Card.Body>
                            <Card.Title>Living room Sofa</Card.Title>
                            <Card.Description>
                            This sofa is perfect for modern tropical spaces, baroque inspired
                            spaces.
                            </Card.Description>
                            <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            
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