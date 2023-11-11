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
    }
  ]

  module.exports = {
    functionDictionary
  }