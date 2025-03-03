import "../body.css";


function Pagamento () {
    return (
        <>
        <div>
            <h2>Pagamento</h2>
            <div class="row g-3 container-pay">
                <div class="col-md-12">
                    <label for="inputCity" class="form-label">Numero do Cartão</label>
                    <input type="text" class="form-control"  />
                </div>
                <div class="col-md-3">
                    <label for="inputCity"  class="form-label">Data</label>
                    <input type="month" placeholder='MM/AA' class="form-control"  />
                </div>
                <div class="col-md-3">
                    <label for="inputZip" class="form-label">Codigo de Seguranca</label>
                    <input type="text" placeholder='***' class="form-control" />
                    <br/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Pagamento;