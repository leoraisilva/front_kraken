import "../carousel.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Button, Card, FormatNumber, Text  } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from 'react-router-dom';

function Pedido({valor}) {
    const [desconto, setDesconto] = useState(0);

    const handleIncrement = () => {
        const newQntd = desconto + 1;
        if (newQntd) {
            setDesconto(newQntd)
        }
    };

    const handleDecrement = () => {
        const newQntd = desconto - 1;
        if (newQntd) {
            setDesconto(newQntd)
        }
    };

    return (
        <>
            <div className="cart-shopping">
                <Card.Root className="cart-shopping" maxW="sm" borderColor={'#696969'}>
                    <Card.Body>
                        <Card.Title>Valor total do Pedido</Card.Title>
                        <Card.Description>
                            Valor Pedido:
                            <Text textStyle="lg">
                                R$ <FormatNumber value={valor} />
                            </Text>
                            Desconto:
                            <NumberInputRoot width="50px" value={desconto} onIncrement={handleIncrement} onDecrement={handleDecrement} marginLeft="2rem" min={0} max={100}>
                                <NumberInputField marginLeft="-7" value={desconto} readOnly />
                            </NumberInputRoot>
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            R$ <FormatNumber value={valor - valor*(desconto/100)} />
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Buy now</Button>
                        <Button variant="ghost"><Link to="/kraken/list" className="nav-link">Add to cart</Link></Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    )
}

export default Pedido;