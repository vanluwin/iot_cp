# Manual do Maker: IOT :fire:

## Firebase
O Firebase hoje, após a aquisição do Google, virou uma plataforma muito completa para se desenvolver aplicações. Podendo ser integrado em vários pontos partes da sua aplicação.

![alt text](https://raw.githubusercontent.com/vanluwin/iot_cp/master/readme_imgs/firebase.png)

Uma característica interessante dessa plataforma para o desenvolvimento de aplicações IOT é o **Firebase Realtime Database** que armazena dados na forma de árvores ou documentos JSON é os distribui em tempo real para todos os dispositivos conectados.

![alt text](https://raw.githubusercontent.com/vanluwin/iot_cp/master/readme_imgs/rtdb.png)

Para prosseguir com o tutorial crie uma conta no firebase ('https://firebase.google.com/') e um inicie um projeto no console do firebase com o nome que desejar.

**Umavez no console do projeto:**
Precisaremos de algumas informações do console para a configuração do dispositivo IOT e da aplicação Web:

1. Clique em 'Adicionar o Firebase ao seu aplicativo da Web', será mostrado as informações de seu projeto precisaremos de 'authDomain' e 'databaseURL' futuramente.
2. Vá para a seção Database.
3. Clique em primeiros passos com o Realtime Database.
4. Inicie no modo de teste ( não será necessário estar autenticado para ler e escrever no bando de dados).

## Conectando o ESP ao Firebase 

### Componentes
* Algum modelo de ESP (No caso do esquemático um NodeMCU).
* LED
* Botão
* Resistores de 150 ohms e 100 ohms; 
* Jumpers

### Ferramentas 

1. Arduino IDE - Configurar a IDE para programar o ESP8266:
    * Entre na IDE do Arduino e clique em **Arquivo** -> **Preferências**
    * Na tela seguinte, digite o link no campo **URLs adicionais de Gerenciadores de Placas**: http://arduino.esp8266.com/stable/package_esp8266com_index.json
    * Clique em OK para retornar à tela principal da IDE
    * Agora clique em **Ferramentas** -> **Placa** -> **Gerenciador de Placas**
    * Utilize a barra de rolagem para encontrar o **esp8266 by ESP8266 Community** e clique em **INSTALAR**
    * Para mais informações sobre esse processo: [Tutorial da FilipeFlop](https://www.filipeflop.com/blog/programar-nodemcu-com-ide-arduino/)

2. Biblioteca firebase-arduino:
    * [Fazer o download da biblioteca](https://github.com/googlesamples/firebase-arduino/archive/master.zip)
    * Inicie a IDE do Arduino
    * Adicione a biblioteca indo no menu **Sketch** -> **Incluir Biblioteca** -> **Adicionar biblioteca .ZIP…**
    * Escolha o arquivo firebase-arduino-master.zip que você baixou anteriormente.

### Código do ESP8266

O código pode ser encontrado do diretorio 'esp/' deste repositório. É necessário trocar as seguintes variáveis para usar com o seu projeto no Firebase (referir ao passo 1 da secção Firebase para obtenção das suas variáveis):

* FIREBASE_HOST: Preencha com o 'authDomain' do seu banco no Firebase.
* FIREBASE_AUTH: Preencha com o 'databaseURL' do seu banco no Firebase.
* WIFI_SSID e WIFI_PASSWORD: Dados da rede na qual o ESP deve se conectar.

Basicamente o que a aplicação faz é publicar em um intervalo de tempo fixo estado do LED.

## Criando a aplicação Web

Agora falta a parte de controle na Web do nosso dispositivo. Vamos fazer um site simples, utilizando tecnologias web padrão, HTML5, CSS3 e Javacript, sendo hospedado diretamente no Firebase Hosting.

### Ferramentas e IDE

* NodeJS:

    Baixe o NodeJS do site site oficial (https://nodejs.org/en/download/) e instale em seu sistema operacional. Junto com sua instalação do NodeJS o gerenciador de pacotes NPM será instalado em paralelo.

    Para verificar a instalação, abra o terminal e execute o comando: 
    ```bash
        node -v && npm -v
    ```

* Com o Node e NPM instalados, abra o terminal e execute o comando: 

    ```bash
        npm install -g firebase-tools
    ```

* Execute o seguinte comando no terminal e entre com suas credenciais do Firebase:

    ```bash
        firebase login
    ```

* Para desenvolvimento dos códigos existem diversas IDEs e editores de texto fica a seu critério escolher uma. ALgumas que recomendo são:
    * Visual Studio Code 
    * Atom
    * Sublime Text
    * Webstorm Jetbrains

## Aplicação Web

Processo para criar um diretório e inicar seu projeto:
 
     ```bash
        mkdir iot # Nome do diretório fica a seu critério
        cd iot
        firebase init
    ```
    
Com isso você vai vincular a pasta com o projeto criado no console do Firebase, então escolha corretamente o projeto que foi criado anteriormente. Ele vai criar a pasta public, onde vão os arquivos que podem ser hospedados no Firebase e serem acessados na web e também alguns arquivos de configuração do projeto.

O firebase-tools possui também um servidor embutido, então estando na pasta você pode rodar firebase serve, para iniciar um servidor web na pasta public na porta 5000 por padrão.

**O codigo da aplicação web pode ser encontrado no diretório web/public**, basicamente foi utilizado o Javascript, o framework CSS Material Design Lite.

Para adequar a aplicação a seu projeto é necessario alterar as credenciais do firebase no incio do seu script JS:

1. Clique em Overview no menu lateral.
2. Depois em “Adicionar o Firebase ao seu aplicativo da Web”.
3. Copie e cole o snippet em seu scipt JS.

Para teste sua aplicação localmente inicie o servidor local com o comando:

    ```bash
        firebase serve
    ```

Para fazer o deploy de sua aplicação no firebase execute: 

    ```bash
        firebase deploy
    ```

:fire: :fire: :fire:**Sua primeira aplicação está pronta e hospedada no Firebase**:fire: :fire: :fire:

### Conclusão 

Agora meu jovem padawan, você possui o conhecimento necessário para criar suas aplicações utilizando mais está incrivel ferramenta, que possui tantos outros recursos interessantes para auxiliá-lo em seus projetos.

Boa sorte em seus projetos, qualquer duvida podem entrar em contato.

Vida Longa e Próspera :spock-hand:  
