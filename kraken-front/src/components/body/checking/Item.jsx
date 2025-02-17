import "../carousel.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Badge, Box, Button, Card, HStack, Image, FormatNumber, Text  } from "@chakra-ui/react"
function Item ({title, imagem, unitValue, qntd, onQntdChange, idItem, total}) {
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
                        <NumberInputRoot width="50px" marginLeft="2rem">
                            <NumberInputField value={qntd} marginLeft="-7" onChange={(valueString) => onQntdChange(idItem, Number(valueString))} />
                        </NumberInputRoot>
                        Valor Total:
			            <Text textStyle="lg">
                            R$ <FormatNumber value={total} />
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