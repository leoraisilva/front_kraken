import '../category.css';

function Store (){
    return (
        <>
        <div className="container-setting">
            <h2>Cadastro Estoque</h2>
        <form class="row g-3">
            <div class="col-12">
                    <label for="inputAddress" class="form-label">Titulo Categoria</label>
                    <input type="text" class="form-control" id="inputAddress" />
                </div>
                <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">Imagem</label>
                    <input class="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição do Categoria</label>
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