# Aplicación de Gestión de Tareas

## Descripción

La **Aplicación de Gestión de Tareas** es una solución web pensada para administrar tareas y asignar personas con habilidades específicas. El objetivo principal de la aplicación es simplificar la gestión de proyectos mediante la creación de tareas y la asignación de personas a dichas tareas de manera eficiente y organizada. Además, el diseño está optimizado para una experiencia **mobile-first**, lo que asegura que la aplicación funcione de manera efectiva en dispositivos móviles.

La información es almacenada y gestionada en **Strapi**, un CMS que permite organizar los datos de manera estructurada y escalable. Strapi se encarga de las colecciones tanto de tareas como de personas, permitiendo relaciones **muchos a muchos** entre las tareas y las personas asignadas.

## Funcionalidades Implementadas

- **Gestión de Tareas**:
  - Crear y editar tareas.
  - Asignación de personas a las tareas.
  - Posibilidad de editar las tareas con los datos pre-cargados en un modal.
  
- **Personas**:
  - Vista de las personas asignadas a las tareas en formato de tarjetas.
  - Autocompletado para seleccionar personas al crear o editar una tarea.
  - Posibilidad de eliminar personas de una tarea y que vuelvan a estar disponibles en el autocompletado.
  
- **Diseño Responsivo**:
  - El diseño está basado en un enfoque **mobile-first**.
  - Visualización en formato de **tabla** para dispositivos de escritorio y **cards** para dispositivos móviles.

- **Filtrado**:
  - Filtro de tareas por estado a través de peticiones al backend.
  
- **Componentes Independientes**:
  - La mayoría de los componentes, como los formularios y los modales, han sido creados como componentes standalone para mejorar la modularidad y el rendimiento.

- **Notificaciones**:
  - Uso de **Angular Material SnackBar** para mostrar notificaciones al usuario cuando se crea o edita una tarea.

## Tecnologías Utilizadas

- **Frontend**: 
  - Angular 16
  - Angular Material
  - RxJS
  - SCSS
- **Backend**: 
  - Strapi (CMS basado en Node.js)
- **Control de Versiones**: 
  - Git, GitHub

## Mejoras Futuras

- Implementar un **slider de cards** que permita a los usuarios modificar el estado de las tareas arrastrando las tarjetas a diferentes columnas, facilitando así el cambio de estado de manera visual.
  
- **Mejoras en los estilos**: Ajustes en los estilos visuales para una mejor experiencia de usuario, incluyendo animaciones más fluidas y una interfaz más intuitiva.

## Despliegue

Puedes acceder a la aplicación desplegada en el siguiente enlace:

[Enlace a la aplicación](https://taskmasnager.netlify.app)

## Video sustentacion

Puedes acceder a la carpeta con dos videos, uno haciendo un recorrido general por la aplicacion y otro analizando el codigo:

[Enlace a la carpeta de drive](https://drive.google.com/drive/folders/1aauyVZUoN6WBnJOihwqXPTmFzhX5-o2A?usp=sharing)
