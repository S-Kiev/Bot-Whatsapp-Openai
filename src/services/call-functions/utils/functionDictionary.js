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
      "description": "Identificar a un cliente por su nombre y apellido",
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
    },
    {
      "name": "findStatusOfPaymentsOfCustomerByNameAndLastname",
      "description": "El usuario te consultara por el estado de los pagos de un cliente. Puede preguntarte cuanto debe pagar, cuanto ha pagado o cual es el estado de ese pago",
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
      "name": "findMedicalInformationOfCustomerByNameAndLastname",
      "description": "El usuario te consultara por la informacion medica de un cliente. Puede preguntarte por el Telefono de emergencia, si el paciente tiene cancer, problemas de columna o de corazon, etc.",
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
      "name": "findMeasurementsOfCustomerByNameAndLastname",
      "description": "El usuario te consultara por la las medidas de un cliente.",
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
      "name": "updateCustomerPersonalInformation",
      "description": "El usuario te pedira que modifiques la información personal de un cliente",
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
          },
          "document": {
            "type": "string",
            "description": "Es el documanto de identificacion del cliente. Ejemplo 46581259"
          },
          "birthdate": {
            "type": "datetime",
            "description": "Es el cumpleaños del cliente."
          },
          "cellphone": {
            "type": "string",
            "description": "Es el celular del cliente. recuerda que el usuario te brindara un numero como 098454550, pero debes guardarlo como 59898454550. Elimina el primer 0 y agregale al inicio 598"
          },
          "email": {
            "type": "string",
            "description": "Es el correo electronico del cliente."
          },
          "address": {
            "type": "string",
            "description": "Es la dirección del cliente. Donde vive, calle y numero"
          },
          "howDidYouKnow": {
            "type": "string",
            "description": "Es el medio por el cual el cliente conocio la clinica. Por ejemplo redes sociales, boca a boca (recomendacion de alguien), publicidad, etc."
          },
          "profession": {
            "type": "string",
            "description": "Es la profesion del cliente, es decir a que se dedica. ejemplo doctor, albañil, enfermero, etc."
          },
          "reasonFirstVisit": {
            "type": "string",
            "description": "Es la razon por la cual el cliente visito la clinica por primera vez."
          }
        },
        "required": ["name", "lastname"]
      }
    },
    {
      "name": "updatePaymentInformationCustomer",
      "description": "El usuario te pedira que modifiques la información de pagos de un cliente",
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
          },
          "totalCost": {
            "type": "integer",
            "description": "Es el costo totoal por la consumicion del cliente"
          },
          "paid": {
            "type": "decimal",
            "description": "Es lo que ha pagado el cliente"
          },
          "paymentStatus": {
            "type": "string",
            "enum": ["total", "partial", "pending"],
            "description": "Es el estado de pagos del cliente. es un enum con valores posibles: total (cuando se ha pagado el total de la cuenta), partial (cuando es pacial y no se ha abonado el 100%) y pending (cuando esta pendiente porque el cliente ha abonado 0)"
          }
        },
        "required": ["name", "lastname"]
      }
    },
    {
      "name": "updateMedicalInformationCustomer",
      "description": "El usuario te pedira que modifiques la información medica de un cliente",
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
          },
          "medication": {
            "type": "string",
            "description": "Son los medicamentos que consume el cliente"
          },
          "doctor": {
            "type": "string",
            "description": "Es el doctor que atinede al cliente"
          },
          "emergencyPhone": {
            "type": "string",
            "description": "Es el telefono de emergencia del cliente. Si el usuario te brindara un numero como 098454550, es un numero de celular pero debes guardarlo como 59898454550. Elimina el primer 0 y agregale al inicio 598"
          },
          "suffersIllness": {
            "type": "string",
            "description": "Son las enefermedades particulares que sufre el cliente"
          },
          "columnProblem": {
            "type": "bool",
            "description": "Si el usuario padece o no de problemas de columna"
          },
          "operation": {
            "type": "string",
            "description": "Son las operaciones que ha tenido el paciente"
          },
          "heartProblem": {
            "type": "bool",
            "description": "Si el usuario padece o no de problemas de corazon"
          },
          "cancer": {
            "type": "string",
            "description": "Es un detalle sobre el tipo de cancer que padece el paciente"
          },
          "diu": {
            "type": "bool",
            "description": "DIU es la sigle de Dispositivo intrauterino, en este campo hay que determinar si el paciente tiene o no DIU"
          },
          "metalImplants": {
            "type": "bool",
            "description": "En este campo hay que determinar si el paciente tiene o no Implantes Metalicos"
          },
          "hypertensive": {
            "type": "bool",
            "description": "En este campo hay que determinar si el paciente tiene o no Hipertencion"
          },
          "varicoseVeins": {
            "type": "bool",
            "description": "En este campo hay que determinar si el paciente tiene o no Varices"
          },
          "coagulationProblems": {
            "type": "bool",
            "description": "En este campo hay que determinar si el paciente tiene o no problemas de coagulación de sangre"
          },
          "comments": {
            "type": "string",
            "description": "Son comentarios u observaciones adicionales"
          }
        },
        "required": ["name", "lastname"]
      }
    },    
    {
      "name": "updateMeasurementsCustomer",
      "description": "El usuario te pedira que modifiques información relacionada a las medidas de un cliente",
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
          },
          "highWaist": {
            "type": "decimal",
            "description": "es el ato de la ciuntura de el cliente"
          },
          "mean": {
            "type": "decimal",
            "description": "Es la media del cliente"
          },
          "navelLine": {
            "type": "decimal",
            "description": "Es la linea del ombligo del cliente."
          },
          "lowerBelly": {
            "type": "decimal",
            "description": "Es la medida del vientre bajo del cliente"
          }
        },
        "required": ["name", "lastname"]
      }
    }
  ]

  module.exports = {
    functionDictionary
  }