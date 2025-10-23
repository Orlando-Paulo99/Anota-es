const info = document.getElementById("inp")
const receber= document.getElementById("inserir")

receber.addEventListener("keydown" , (e) =>{

    if(e.key === "Enter"){

        e.preventDefault(); //“Ei navegador, não faça sua ação padrão, eu vou cuidar disso!”  
        
        //Nesse codigo insere o valor o input e é adicionado abaixo dos que já estão
        info.innerHTML += receber.value +" "+ Date() +"<br><br>";
        
        //Nesse codigo informa que apos é adicionado o campo do input fica vazio
        receber.value=""
    

    }

    
});