#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Defina as constantes de acordo com seu projeto no Firebase
#define FIREBASE_HOST "authDomain"
#define FIREBASE_AUTH "databaseURL"
#define WIFI_SSID "nome_da_rede_wifi"
#define WIFI_PASSWORD "senha_da_rede_wifi"

// Defina o pino que o led está conectado 
#define LED D3
// Defina o pino que o botão está conectado 
#define BTN D0

// Função para definir os pinos (caso a aplicação fique mais complexa)
void setupPins() { 
    pinMode(LED, OUTPUT);
    pinMode(BTN, INPUT);
} 

// Função para conectar na rede wifi
void setupWifi() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Conectando");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.print("Conectado: ");
    Serial.println(WiFi.localIP());
}

// Função para se conectar ao firebase
void setupFirebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setBool("led", false);
}

void setup() {
    // Inicia a comunicação serial
    Serial.begin(9600);

    // Executa a função de definição de pinos
    setupPins();
    // Executa a função de coneção na rede wifi
    setupWifi();    
    // Executa a função de coneção no firebase
    setupFirebase();

    // Registra o ticker para publicar no intvalo definido 
    ticker.attach_ms(PUBLISH_INTERVAL, publish);
}

void loop() {
    bool led_state = digitalRead(BTN);

    if (led_state) {
        digitalWrite(LED, HIGH);
        Firebase.setBool("led", led_state);
    }else {
        digitalWrite(LED, LOW);
        Firebase.setBool("led", led_state);
    }

    // Verifica o valor do led no firebase 
    led_state = Firebase.getBool("led");
    digitalWrite(LED, led_state ? HIGH : LOW);

    delay(200);
}