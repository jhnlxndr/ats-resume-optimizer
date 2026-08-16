# Análisis de dominio

## ¿Cuál es el problema que resuelve la aplicación?
Un candidato quiere postularse como aspirante a cierto cargo.
El candidato registra su hoja de vida.
El candidato registra la oferta de trabajo.
Y el sistema analiza y construye una hoja de vida a la medida de la oferta para que esta pueda ser evaluada una vez generada con la nueva forma.


## ¿Quiénes son los actores?
El candidato y la oferta de trabajo.

## ¿Cuál es el objetivo principal del candidato?
Registrar sus datos personales, su perfil profesional, sus competencias, sus proyectos, sus experiencias, sus formaciones académicas, sus certificaciones, sus idiomas, sus contactos o referencias personales.

## ¿Cuáles son las entidades del dominio?
El candidato con sus datos, la oferta de trabajo, la hoja de vida para dicho oferta de trabajo.

## ¿Cuáles son los objetos de valor (Value Objects)?
Cargo, competencias (agrupados por categoría priorizando las competencias que aparecen en la oferta), proyectos (para proyectos se puede aplicar una fórmula: nombre + solución + problema resuelto + 2 o 3 logros + enlace o evidencia), experiencia laboral (orden cronológico inverso, incluyendo el soporte o evidencia), formación académica (con el estado real: en proceso o finalizado), certificaciones (vigentes y verificables), idiomas (con el nivel real).

## ¿Cuál crees que es el Aggregate Root?
Es el candidato porque antes de optimizar la hoja de vida, deberá tener todos los datos necesarios para generar la hoja de vida optimizada. Una vez generada su propia hoja de vida, el sistema se encarga de ordenar los datos más relevantes de acuerdo a la oferta de trabajo y finalmente entregará una hoja de vida optimizada y descargable para presentar con el score de compatibilidad.

## ¿Qué información es permanente, evolutiva y contextual?
Es permanente todos los datos básicos del candidato, aunque configurable por si llegase a cambiar alguno de ellos.
Es evolutivo su perfil profesional, sus competencias, sus proyectos, sus experiencias, sus certificaciones, sus idiomas.
Es contextual la oferta de trabajo, las competencias que aparecen en la oferta, los años de experiencia requeridos por la oferta, el puesto que exige la oferta, y las referencias personales que podrían dar testimonio de la experiencia laboral del candidato.


## ¿Qué información se almacena y qué información se calcula?
Se almacena solo lo que respecta al candidato. La información de la oferta es temporal y sirve para analizar la compatibilidad de la hoja de vida con la oferta, comparar y optimizar la hoja de vida. O tal vez sí podría almacenarse para tener un historial de hojas de vida generadas.