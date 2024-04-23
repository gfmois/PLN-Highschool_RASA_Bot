from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionGetFamilias(Action):
    def name(self) -> Text:
        self.df = pd.read_csv(os.path.join(os.getcwd(), "./actions/Grupos.csv"), sep=";")

        return "action_get_familias"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        to_return: str = "Familias profesionales existentes en CIPFP Mislata: \n"        
        
        familias = self.df["Familia"].unique()
        
        for idx, familia in enumerate(familias, start=1):
            to_return += f"{idx}. {familia}\n"
            
        dispatcher.utter_message(text=to_return)
        
        return []