import "../carousel.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Badge, Box, Button, Card, HStack, Image, FormatNumber, Text  } from "@chakra-ui/react"
function Item ({title, imagem, unitValue, qntd}) {
    return (
        <>
            <div className="card mb-3 container-item" >
            <Card.Root flexDirection="row" borderColor={'#696969'}  width={600} height={275}>
                <Image width={200} height={200} src={imagem} />
                <Box>
                <Card.Body>
                    <Card.Title mb="2">{title}</Card.Title>
                    <Card.Description>
                        Valor Unitário:
			            <Text textStyle="lg">
                            R$ <FormatNumber value={unitValue} />
                        </Text>
                        Quantidade:
                        <NumberInputRoot defaultValue={qntd} width="50px" marginLeft="2rem" >
                            <NumberInputField marginLeft="-7" />
                        </NumberInputRoot>
                        Valor Total:
			            <Text textStyle="lg">
                            R$ <FormatNumber value={unitValue*qntd} />
                        </Text>
                    </Card.Description>
                    <HStack mt="2">
                    </HStack>
                </Card.Body>
                <Card.Footer marginTop={-10}>
                    <Button borderRadius={8}>Deletar</Button>
                </Card.Footer>
                </Box>
            </Card.Root>
            </div>
        </>
    )
}

export default Item;