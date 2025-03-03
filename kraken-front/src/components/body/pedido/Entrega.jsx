import "../body.css";
import { FormatNumber, Text  } from "@chakra-ui/react"


function Entrega ({frete, valor}) {
    return (
        <>
        <div>
            <h2>Entrega</h2>
            <div class="row g-3 container-pay">
                <div class="col-md-10">
                    <label for="inputCity" class="form-label">Endereço</label>
                    <input type="text" placeholder='Rua São Bento' class="form-control"  />
                </div>
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">Número</label>
                    <input type="number" placeholder='399' class="form-control"  />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Cidade</label>
                    <input type="text" placeholder='São Paulo' class="form-control"  />
                </div>
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">UF</label>
                    <input type="text" placeholder='SP' class="form-control"  />
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">Estado</label>
                    <input type="text" placeholder='São Paulo' class="form-control" />
                </div>
                <div class="col-md-8">
                    <label for="inputCity" class="form-label">Bairro</label>
                    <input type="text" placeholder='Jd. Santa Efigenia' class="form-control"  />
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">CEP</label>
                    <input type="text" placeholder='01000100' class="form-control" />
                    <br/>
                </div>
                Valor do Frete
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                  R$ <FormatNumber value={frete} />
                </Text>
                Valor final da compra
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                  R$ <FormatNumber value={valor + frete} />
                </Text>
            </div>
          </div>
        </>
    )
}

export default Entrega;