import "../carousel.css";
import { Button, Card, FormatNumber, Text  } from "@chakra-ui/react"

function Pedido({valor, desconto}) {
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
                            <Text textStyle="lg">
                                <FormatNumber value={desconto} /> %
                            </Text>
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            R$ <FormatNumber value={valor + valor*(desconto/100)} />
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Buy now</Button>
                        <Button variant="ghost">Add to cart</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    )
}

export default Pedido;