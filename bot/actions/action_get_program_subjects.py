from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionGetProgramSubjects(Action):
    def name(self) -> Text:
        self.df_grupos = pd.read_csv(os.path.join(os.getcwd(), "./actions/Grupos.csv"), sep=";")
        self.df_modulos = pd.read_csv(os.path.join(os.getcwd(), "./actions/Modulos.csv"), sep=";")
        return "action_get_program_subjects"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        program_service = tracker.get_slot("program_service_selected")
        
        if not program_service:
            # Filtrar por la familia "Informática"
            filtered_df = self.df[self.df['Familia'] == 'INFORMATICA']
            
            to_return: str = "Opción no existente, ciclos formativos disponibles 📚: \n"        
            
            offers = filtered_df["Nombre"].unique()
            
            for idx, offer in enumerate(offers, start=1):
                to_return += f"{idx}. {offer}\n"
                
            dispatcher.utter_message(text=to_return)
        else:
            # Juntar los dos CSV
            df_merged = pd.merge(self.df_grupos, self.df_modulos, on="Grupo", how="inner")

            # Filtrar por el ciclo
            filtered_df = df_merged[df_merged['Nombre'] == program_service]
            
            to_return: str = f"Módulos que contiene el ciclo {program_service}: \n"

            modulos = filtered_df["Nom_Cas_Modulo"].unique()
            if len(modulos) > 0:
                for idx, modulo in enumerate(modulos, start=1):
                    to_return += f"{idx}. {modulo}\n"
                
                dispatcher.utter_message(text=to_return)
            else:
                dispatcher.utter_message(text=f"No existe oferta formativa para el ciclo {program_service}")

        return []