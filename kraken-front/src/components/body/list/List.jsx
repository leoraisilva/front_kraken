import "../category.css";
import Product from "./Product";

function List () {
    return (
        <>
            <div className="container-list">
                <div className="row content-list">
                    <div className="col-4 list-product">
                        <div id="list-example" className="list-group">
                        <a className="list-group-item list-group-item-action" href="#list-item-1">Produto de Limpeza</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-2">Produto Alimenticio</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-3">Eletrodomestico</a>
                        <a className="list-group-item list-group-item-action" href="#list-item-4">Produto de serviço</a>
                        </div>
                    </div>
                    <div className="col-8 list-content">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example list-content" tabindex="0">
                            <h4 id="list-item-1">Produto de Limpeza</h4>
                            <div className="value-product">
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                            </div>
                            <h4 id="list-item-2">Produto Alimenticio</h4>
                            <div className="value-product">
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                            </div>
                            <h4 id="list-item-3">Eletrodomestico</h4>
                            <div className="value-product">
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                            </div>
                            <h4 id="list-item-4">Produto de serviço</h4>
                            <div className="value-product">
                                <Product />
                                <Product />
                                <Product />
                                <Product />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;