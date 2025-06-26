import "../body.css";
import { FormatNumber, Text  } from "@chakra-ui/react"
import { useEffect, useState } from "react";


function Entrega ({frete, valor}) {
    const id_cliente = localStorage.getItem('userId');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({});

    useEffect(() => {
            if (id_cliente) {
                const fetchCliente = async () => {
                    try {
                        const token = localStorage.getItem('token');
                        if (!token) throw new Error('Token JWT não encontrado');
    
                        const res = await fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
    
                        if (!res.ok) {
                            throw new Error('Falha na busca de dados');
                        }
    
                        const data = await res.json();

                        setCep(data.cep || '');
                    } catch (error) {
                        console.error('Erro ao carregar os dados', error);
                        setError('Erro tente novamente mais tarde');
                    }
                };
    
                fetchCliente();
            } else {
                setError('Id não localizado');
            }
        }, [id_cliente]);

    useEffect(() => {
            if (cep) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                    method: 'GET',
                    mode: 'cors'
                })
                .then(res=>{
                    if(!res.ok) {
                        throw new Error('Falha na busca de dados');
                    }
                    return res.json();
                })
                .then(data => {
                    setAddress(data);
                })
                .catch(error => {
                    console.error('Erro ao carregar dados de endereço:', error);
                    setError('Erro tente novamente mais tarde');
                })
            }
        });
    
    return (
        <>
        <div>
            <h2>Entrega</h2>
            <div class="row g-3 container-pay">
                <div class="col-md-10">
                    <label for="inputCity" class="form-label">Endereço</label>
                    <input type="text" placeholder='Rua São Bento' class="form-control" value={address.logradouro}  />
                </div>
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">Número</label>
                    <input type="number" placeholder='399' class="form-control"  />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Cidade</label>
                    <input type="text" placeholder='São Paulo' class="form-control" value={address.localidade} />
                </div>
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">UF</label>
                    <input type="text" placeholder='SP' class="form-control"  />
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">Estado</label>
                    <input type="text" placeholder='São Paulo' class="form-control"  value={address.estado}/>
                </div>
                <div class="col-md-8">
                    <label for="inputCity" class="form-label">Bairro</label>
                    <input type="text" placeholder='Jd. Santa Efigenia' class="form-control" value={address.bairro} />
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">CEP</label>
                    <input type="text" placeholder='01000100' class="form-control" value={cep}/>
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