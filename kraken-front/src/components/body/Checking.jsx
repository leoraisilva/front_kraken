import Item from "./Item";
import "./carousel.css";
import { Button, Card, Text } from "@chakra-ui/react"

function Checking() {
    return (
        <> 
            
            <div className="row container-checking">
                <div className="col-6">
                    <Item />
                    <Item />
                    <Item />
                </div>
                <div className="col-6">
                    <div className="cart-shopping">
                    <Card.Root className="cart-shopping" maxW="sm" overflow="hidden">
                    
                    <Card.Body>
                        <Card.Title>Living room Sofa</Card.Title>
                        <Card.Description>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces.
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                        $450
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