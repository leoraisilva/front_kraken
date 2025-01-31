import "../carousel.css";
import { useState } from "react"
import { NumberInputField, NumberInputRoot } from "../../ui/number-input"
import { Badge, Box, Button, Card, HStack, Image, FormatNumber, Text  } from "@chakra-ui/react"
function Item ({title, unitValue, qntd}) {
    return (
        <>
            <div className="card mb-3 container-item" >
            <Card.Root flexDirection="row" overflow="hidden" width={600}>
                <Image
                objectFit="cover"
                width={220}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
                />
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
                <Card.Footer>
                    <Button>Deletar</Button>
                </Card.Footer>
                </Box>
            </Card.Root>
            </div>
        </>
    )
}

export default Item;