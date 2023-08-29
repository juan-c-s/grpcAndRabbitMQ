# info de la materia: st0263-2023-2 <Tópicos Especiales en Telemática>
#
# Estudiante(s): Juan Camilo Salazar, jcsalazaru@eafit.edu.co
#
# Profesor: Nelson Montoya, emontoya@eafit.edu.co
#


# Reto 2 Tópicos Especiales en Telemática
#
1. Construir un sistema que pueda listar y buscar archivos en almacenamientos remotos. El esquema consiste en una api que recibe llamados a funciones listar y buscar archivos. Esta api deberá comunicarse con un servicio para poder hacer la consulta por los archivos. Si el mensaje por alguna razón no llega al primer microservicio, este mensaje será encolado en un servidor de colas llamado MOM. El MOM enviará el mensaje al microservicio #2 y el mensaje llegará con éxito a este. 
#

Los siguientes requisitos son cumplidos en este reto:
El sistema redirige el mensaje al servidor de colas en caso de fallo
El sistema tiene una comunicación via grpc con el microservicio#1
El sistema almacena archivos en una carpeta .
El sistema responde las consultas sobre los archivos
El sistema utiliza docker para tener el contenedor del MOM en una instancia EC2.
Las instancias en AWS tienen IP's elásticas
El sistema produce mensajes en un exchange predefinido
El sistema escucha mensajes de una cola predefinida 

# 2. información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.
Se hizo una conexión con gRPC del apiGateway hacia el primero microservicio. Este método de comunicación es conocido por su eficiencia puesto que trabaja con binarios. Es mucho más eficiente que el conocido JSON. Se definió la interfaz en protobuf para tener una estructura definida de comunicación. Al fallar la comunicación via rpc, se envía el mensaje al MOM con el producer. El consumer que se ubica en el microservicio#2, recibirá la petición cuando este empiece a escuchar. Preferí utilizar el mismo lenguaje para todo el proyecto, para así reutilizar código en la parte del mom y para tener buenas prácticas. Se utilizó la librería amqp para la parte del mom. 


# 3. Descripción del ambiente de desarrollo y técnico: lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
JavaScript: Se utilizó en la mayoría del proyecto
Protobufs: Se utilizó unicamente para el desarrollo de las interfaces para la comunicación con rpc
ExpressJS: Correr un servidor simple
amqplib:  nos permitió generar el producer y el consumer.
grpc: Una alternativa a JSON para la comunicación con otros servicios vía internet. Es una herramienta muy poderosa ya que funciona con buffers entonces es más rápido que JSON que es con strings.
fs: Utilizamos esta librería para interactuar con el filesystem, ya que los servicios implementados necesitaban acceder a la carpeta files.

En las 3 instancias, se debe correr estas líneas
$ sudo curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs
sudo apt-get update
sudo apt-get upgrade
sudo apt install npm
npm i cors amqplib dotenv @grpc/grpc-js @grpc/proto-loader express

En la instancia del mom
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
sudo apt install git -y

sudo systemctl enable docker
sudo systemctl start docker

docker run -d --hostname my-rabbit -p 15672:15672 -p 5672:5672 --name rabbit-server -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management

Recomiendo revisar si funcionó el paso de replicación del contenedor con : sudo docker ps

Se debe editar las IP's configuradas en el proyecto con las IP's de las instancias que tengan en AWS

En las variables de ambiente del apigw, se debe configurar la dirección que estará recibiendo los mensajes vía grpc.

En el MOM, hay que cambiar las IP's también y asignarle la IP donde corriste el comando previo de docker 



El código está separado en 3 carpetas
apigw => API Gateway donde tenemos el producer del MOM, y el "producer" del grpc

momServer => Tiene el archivo Consumer que hay que correrlo para escuchar los mensajes del producer. Este sería el microservicio #2 secundario en caso de fallos

rpcServer => Es el lugar donde el apigw va a comunicarse. Este sería el microservicio #1 donde estaría la comunicación principal


## opcionalmente - si quiere mostrar resultados o pantallazos 

# 4. Descripción del ambiente de EJECUCIÓN (en producción) lenguaje de programación, librerias, paquetes, etc, con sus numeros de versiones.
Las librerías y paquetes utilizados están en el package.json y tienen la versión correspondiente. De igual manera, lo dejaré en el README
"@grpc/grpc-js": "^1.9.1",
"@grpc/proto-loader": "^0.7.9",
"amqplib": "^0.10.3",
"cors": "^2.8.5",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"fs": "^0.0.1-security"

IP's
API_GATEWAY = 34.205.238.9
MICROSERVICIO#1 = 54.208.65.91
MOM/MICROSERVICIO#2 = 54.165.48.15

## como se lanza el servidor.
Entrar en la carpeta apigw y correr 
sudo node index.js
No olvides descargar las dependencias mencionadas anteriormente.

El usuario utilizará Postman para interactuar con el apiGW y tiene 2 métodos. ListFiles y FindFile

## opcionalmente - si quiere mostrar resultados o pantallazos 


# referencias:
<debemos siempre reconocer los créditos de partes del código que reutilizaremos, así como referencias a youtube, o referencias bibliográficas utilizadas para desarrollar el proyecto o la actividad>
## https://grpc.io/docs/languages/node/basics/
## https://protobuf.dev/
## https://github.com/st0263eafit/st0263-232/tree/main
## https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

#### versión README.md -> 1.0 (2023-agosto)