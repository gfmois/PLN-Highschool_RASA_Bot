from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionGetProgramHorario(Action):
    def name(self) -> Text:
        self.df = pd.read_csv(os.path.join(os.getcwd(), "./actions/Grupos.csv"), sep=";")
        return "action_get_program_horario"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        program_service = tracker.get_slot("program_service_selected")
        
        if not program_service:
            # Filtrar por la familia "Informática"
            filtered_df = self.df[self.df['Familia'] == 'INFORMATICA']
            
            to_return: str = "Opción no existente, ciclos formativos disponibles: \n"        
            
            offers = filtered_df["Nombre"].unique()
            
            for idx, offer in enumerate(offers, start=1):
                to_return += f"{idx}. {offer}\n"
                
            dispatcher.utter_message(text=to_return)
        else:
            # Filtrar por el ciclo
            filtered_df = self.df[self.df['Nombre'] == program_service]
            
            turnos = filtered_df["Turno"].unique()

            if len(turnos) == 1:
                dispatcher.utter_message(text=f"Solo disponemos del turno {'presencial' if turnos[0] == 'D' else 'semipresencial'} para el ciclo {program_service}")
            elif len(turnos) > 1:
                dispatcher.utter_message(text=f"Disponemos tanto del turno presencial como semipresencial para el ciclo {program_service}")
            else:
                dispatcher.utter_message(text=f"No existe oferta formativa para el ciclo {program_service}")
        return []