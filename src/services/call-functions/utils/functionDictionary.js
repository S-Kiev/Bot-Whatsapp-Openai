const functionDictionary = [
    {
        "name": "getTimeOfDay",
        "description": "Brindar al usuario la hora",
        "parameters": {
            "type": "object",
            "properties": {
            },
            "require": [],
        }
    },
    {
      "name": "findCustomerByNameAndLastname",
      "description": "Encontrar a un cliente por su nombre y apellido",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del cliente"
          },
          "lastname": {
            "type": "string",
            "description": "Es el apellido del cliente"
          }
        },
        "required": ["name", "lastname"]
      }
    },
    {
      "name": "findConsultationByCustomerNameAndLastname",
      "description": "El ususario te pedira que encuentres una consulta por el nombre y apellido de un cliente",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del cliente"
          },
          "lastname": {
            "type": "string",
            "description": "Es el apellido del cliente"
          }
        },
        "required": ["name", "lastname"]
      }
    },
    {
      "name": "findConsultationByResponsibleUserName",
      "description": "El ususario te pedira que encuentres una consulta por el nombre del usuario responsable",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del usuario responsable"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "findEquitmentByName",
      "description": "El usuario te pedira que encuentres un equipo (maquinas e implementos usados en tratamientos cosmetologicos-salud) por el nombre del equipo. Ejemplo Melashade",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del equipo"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "findByStatusEquitmentByName",
      "description": "El usuario te consultara por el nombre de un equipo (maquinas e implementos usados en tratamientos cosmetologicos-salud) su estado. Los estados son enums con valores en ingles (ejemplo availible para disponible), tu siempre dale el estado en español",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del equipo"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "findTreatmentsByName",
      "description": "El usuario te consultara por un tratamiento a travez del nombre del mismo. Ejemplo Masajes, liposupcion, etc",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del tratamineto"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "findConsultingRoomsByName",
      "description": "El usuario te consultara por un consultorio a travez del nombre del mismo. Ejemplo: Sala de Masajes",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del consultorio"
          }
        },
        "required": ["name"]
      }
    },
    {
      "name": "findStatusOfConsultingRoomsByName",
      "description": "El usuario te consultara por el estado de un consultorio a travez del nombre del mismo. Los estados son enums con valores en ingles (ejemplo availible para disponible), tu siempre dale el estado en español",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Es el nombre del consultorio"
          }
        },
        "required": ["name"]
      }
    }
  ]

  module.exports = {
    functionDictionary
  }