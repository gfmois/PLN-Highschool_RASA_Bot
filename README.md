# Procesamiento del Lenguaje Natural
## Reto 5: Desarrollo de un asistente para la secretaría de centros de FP

### Contexto
Los institutos de FP y ESO aumentan exponencialmente su actividad administrativa cuando se acerca el final de curso. A diferencia de otros momentos durante el centro, la Secretaría se ve obligada a redoblar esfuerzos para atender a las consultas de futuros estudiantes interesados/as en matricularse en los institutos. Las consultas abarcan innumerables aspectos, desde conocer la oferta con la que cuenta el instituto, a las notas de corte que facilitan el acceso a los diferentes estudios, los períodos en que se abre la matrícula, etc.

En estos momentos se haría necesario contar con algún asistente virtual que pueda descargara la secretaría de las tareas de atención a preguntas recurrentes, que por lo general no implican un proceso de interacción demasiado complejo.

### Objetivo

El objetivo de esta práctica será desarrollar una versión simplificada de lo que podría ser un asistente conversacional que complemente la actividad diaria de la secretaría del `CIPFP Mislata`, para lo que nos apoyaremos en la plataform `RASA`.

Desarrollar un chatbot con una funcionalidad amplia podría comportar una inversión de tiempo considerable, así que limitaremos su margen de respuesta a cierto tipo de consultas que abarcarán los siguientes apartados:
- *_Matrícula_*: Supone comunicar los plazos de matriculación para el curso `2024-25`, junto con la documentación necesaria.
- *_Becas_*: # Procesamiento del Lenguaje Natural
## Reto 5: Desarrollo de un asistente para la secretaría de centros de FP

### Contexto
Los institutos de FP y ESO aumentan exponencialmente su actividad administrativa cuando se acerca el final de curso. A diferencia de otros momentos durante el centro, la Secretaría se ve obligada a redoblar esfuerzos para atender a las consultas de futuros estudiantes interesados/as en matricularse en los institutos. Las consultas abarcan innumerables aspectos, desde conocer la oferta con la que cuenta el instituto, a las notas de corte que facilitan el acceso a los diferentes estudios, los períodos en que se abre la matrícula, etc.

En estos momentos se haría necesario contar con algún asistente virtual que pueda descargara la secretaría de las tareas de atención a preguntas recurrentes, que por lo general no implican un proceso de interacción demasiado complejo.

### Objetivo

El objetivo de esta práctica será desarrollar una versión simplificada de lo que podría ser un asistente conversacional que complemente la actividad diaria de la secretaría del `CIPFP Mislata`, para lo que nos apoyaremos en la plataform `RASA`.

Desarrollar un chatbot con una funcionalidad amplia podría comportar una inversión de tiempo considerable, así que limitaremos su margen de respuesta a cierto tipo de consultas que abarcarán los siguientes apartados:
- *_Matrícula_*: Supone comunicar los plazos de matriculación para el curso `2024-25`, junto con la documentación necesaria.
- *_Becas_*: Supone comunicar los plazos para solicitar las becas, junto con la documentación necesaria.
- *_Anulación_*: Informar de los plazos en los que es posible renunciar a una convocatoria.
- *_Certificados_*: Informar de los plazos en los que es posible recoger certificados que acrediten la realización de estudios.
- *_Horario Clases (Mañana y Tarde)_*: Informar del horario que sigue el instituto en sus diferentes turnos a lo largo de la jornada.
- *_Requisitos de Acceso_*: Informar de toda aquella documentación que es necesario aportar para matricularse en un ciclo formativo tanto de grado medio como de grado superior.

> La  información  anterior  podrá  obtenerse  de  la  web  del  CIPFP  Mislata  o  de  las  oficiales  del  Ministerio  de Educación y FP o de la Conselleria d’Educació.

Además, el asistente proporcionará información de un fichero Excel facilitado por el profesorado, en base a la cual el asistente podrá dar respuesta a consultas relacionadas con:
- Las `familias profesionales` existentes en el CIPFP Mislata
- La `oferta de estudios` que puede cursarse en la `familia de informática`, junto con las *asignaturas* que lo integran y su *carga lectiva*, además de la modalidad _(presencial / semipresencial)_ en la que se puede cursar dichos estudios.

### Funcionalidad del Asistente
El diseño de un asistente mediante `RASA` require de un detenido estudio previo de su funcionalidad, que contemple todas las variables de conversación que puede darse en su operativa. Como soporte a la secretaría de un instituto de FP, el asistente deberá `diferenciar el tipo de respuesta` que ofrecerá según el motivo que origina la consulta, contemplarlo desde casos en los que el diálogo consiste en un turno simple de interacción, hasta aquellos en los que el intercambio puede implicar varios turnos de `pregunta - resupuesta`.

Diferenciaremos 3 casos:
1) *__Respuesta única__*: son aquellos casos en los que el asistente ofrecerá una `respuesta sin posibilidad de prolongar la conversación` en ninguna dirección o sentido. Dentro de esta categoría estarían los casos de:
    - *__Anulación__*
    - *__Certificados__*
    - *__Horario de Clases__*
    - *__Familias Profesionales__*

2) *__Respuesta ampliada__*: Son aquellos casos en los que la respuesta dada a la pregunta inicial podría suponer una segunda respuesta. Dentro de esta categoría estarían los casos de:
    - *_Matrícula_*
    - *_Becas_*
    - *_Requisitos de Acceso_*
3) *__Respuesta extensa__*: Son aquellos casos que permiten una interacción prolongada a través de varios turnos de `pregunta - respuesta`. Dentro de esta categoría estaría el caso de `oferta de informática`.

### Puesta en Producción
El chatbot podrá desplegarse tanto en un entorno en `local` como `remoto` (por ejemplo en `AWS`). Al margen del entorno elegido, el chatbot tendrña que tener algún tipo de interfaz más amigable que la consola (`WEB`).

### Investigación 
Al margen de los aspectos funcionales del chatbot, el proyecto deberá dar respuesta a la siguiente pregunta: `¿Cómo podríamos saber qué tipo de consultas han sido más recurrentes durante un tiempo determinado (en vuestro caso, durante la fase de pruebas)?`

Dar respuesta a esta pregunta requerirá de un proceso de investigación. Como orientación, será necesario que se elabore un script que se ejecutará fuera de `RASA`, es decir, no formará parte de la interacción que el chatbot va a proporcionar, en la que debéis recurrir a lo aprendido sobre modelos lingüísticos a lo largo del bloque de `PLN`.
