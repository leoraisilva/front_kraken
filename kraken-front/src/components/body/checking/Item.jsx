import "../carousel.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Box, Button, Card, HStack, Image, FormatNumber, Text  } from "@chakra-ui/react"
function Item ({idItem, title, imagem, unitValue, qntd, onQntdChange, handleDelete, total}) {
    const handleChange = (event) => {
        const newQntd = parseInt(event.target.value, 10); 
        console.log(newQntd);
        if (!isNaN(newQntd) && onQntdChange) {
            onQntdChange(newQntd); 
        }
    };
    return (
        <>
            <div className="card mb-3 container-item" id={idItem} >
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
                        <NumberInputRoot width="50px" marginLeft="2rem"min={1} max={10}>
                            <NumberInputField value={qntd} onChange={handleChange} marginLeft="-7"  />
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
                    <Button borderRadius={8} onClick={handleDelete}>Deletar</Button>
                </Card.Footer>
                </Box>
            </Card.Root>
            </div>
        </>
    )
}

export default Item;