# Modelo del dominio

## Objetivos

¿Qué objetos existen y cómo se relacionan?

## Modelación

### Candidate

Un candidato tiene una hoja maestra de todo su perfil.
Un candidato tiene varias hojas de vida.

#### MasterProfile

MasterProfile depende del candidato
MasterProfile lo crea el candidato
MasterProfile puede crear, eliminar, actualizar o ver experiencias, competencias, proyectos, formaciones académicas,
certificaciones, idiomas y referencias.
Tiene varias experiencias
Tiene varias competencias
Tiene varios proyectos
Tiene varias formaciones académicas
Tiene varias certificaciones
Tiene varios idiomas
Tiene varias referencias o contactos

### Resume

Resume depende de la oferta de trabajo.
Representa

### JobOffer

### ATSAnlysis
