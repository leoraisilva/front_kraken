import "../body.css";
import { Text  } from "@chakra-ui/react"


function Operacao ({ produtoId, nomeProduto, image, quantidadeIten}) {
    return (
        <>
            <Text textStyle="lg" key={nomeProduto}>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${produtoId}`} >
                    {nomeProduto}
                </button>
                <div className="modal fade" id={produtoId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{nomeProduto}</h1>
                        <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <img className="modal-img" src={`data:image/png;base64,${image}`} />
                        <h3>Quantidade: </h3>
                        <h4>{quantidadeIten}</h4>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
            </Text>
        </>
    )
}

export default Operacao;