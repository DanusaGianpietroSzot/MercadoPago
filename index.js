const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

//Conectando com o Mercado Pago
MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-1558006868123041-082318-645d6c530cd79bd068402f1d9c31f4b0-36587522"
});                 

//Rota principal da aplicação
app.get("/", (req, res) =>{
    res.send("Olá, mundo!" + Date.now());
});

//Rotas de pagamento
app.get("/pagar", async (req, res) => {
    var id = "" + Date.now();
   var emailDoPagador = "people@hotmail.com"

    var dados = {
        items: [
            item = {
                id: id,
                title: "Boneca Anabelle, Bolo de Aniversário",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(5)
            }
        ],
        
        payer: {
            email: emailDoPagador
        },
        external_reference: id
    }

    try{

        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);

    }catch(err){
        return res.send(err.message);
    }

    

})

//Minha porta
app.listen(3000, (req, res) =>{
    console.log("Servidor rodando!")
});
