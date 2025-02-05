import '../category.css';

function Store (){
    return (
        <>
        <div className="container-setting">
            <h2>Cadastro Estoque</h2>
            <form class="row g-3">
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome do Estoque</label>
                    <input type="text" class="form-control" id="inputAddress" />
                </div>
                <div class="col-md-6">
                    <label for="inputMax" class="form-label">Valor mínimo</label>
                    <input type="number" class="form-control" id="inputMax" />
                </div>
                <div class="col-md-6">
                    <label for="inputMin" class="form-label">Valor máximo</label>
                    <input type="number" class="form-control" id="inputMin"/>
                </div>
                <div class="col-12">
                    <label for="qntItem" class="form-label">Quantidade Maxima de item</label>
                    <input type="number" class="form-control" id="qntItem" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição do Estoque</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Store;