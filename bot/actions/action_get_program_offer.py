from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionGetProgramOffer(Action):
    def name(self) -> Text:
        self.df = pd.read_csv(os.path.join(os.getcwd(), "./actions/Grupos.csv"), sep=";")

        return "action_get_program_offer"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        # Filtrar por la familia "Informática"
        filtered_df = self.df[self.df['Familia'] == 'INFORMATICA']
        
        to_return: str = "Oferta de informática disponible en CIPFP Mislata: \n"        
        
        offers = filtered_df["Nombre"].unique()
        
        for idx, offer in enumerate(offers, start=1):
            to_return += f"{idx}. {offer}\n"
            
        dispatcher.utter_message(text=to_return)
        
        return []