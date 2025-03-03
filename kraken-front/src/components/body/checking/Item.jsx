import "../body.css";
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Box, Button, Card, HStack, Image, FormatNumber, Text } from "@chakra-ui/react"
function Item ({idItem, title, imagem, unitValue, qntd, onQntdChange, handleDelete, max, total}) {
    const handleIncrement = () => {
        const newQntd = qntd + 1;
        if (onQntdChange) {
            onQntdChange(newQntd);
        }
    };

    const handleDecrement = () => {
        const newQntd = qntd - 1;
        if (newQntd >= 1 && onQntdChange) {
            onQntdChange(newQntd);
        }
    };

    return (
        <>
            <div className="card mb-3 container-item" id={idItem} >
                <Card.Root flexDirection="row" width={600} height={275}>
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
                            <NumberInputRoot width="50px" value={qntd} onIncrement={handleIncrement} onDecrement={handleDecrement} marginLeft="2rem" min={0} max={max}>
                                <NumberInputField marginLeft="-7" value={qntd} readOnly />
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
                        <Button padding={2} borderRadius={8} onClick={handleDelete}>Deletar</Button>
                    </Card.Footer>
                    </Box>
                </Card.Root>
            </div>
        </>
    )
}

export default Item;