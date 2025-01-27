import "./category.css";

function Register () {
    return (
        <>
        <div className="container-setting">
            <h2>Cadastrar</h2>
            <form class="row g-3">
                
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome do Produto</label>
                    <input type="text" class="form-control" id="inputAddress" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição do Produto</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">Imagem</label>
                    <input class="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Valor Unitário</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-6">
                    <label for="inputZip" class="form-label">Unidade Utilizada</label>
                    <input type="text" class="form-control" id="inputZip"/>
                </div>
                <div class="col-md-12">
                    <label for="inputCity" class="form-label">Categoria</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register;